"""
Chat Bridge Monitoring and Metrics

This module implements metrics collection and health monitoring
for the mood-to-chat bridge functionality.
"""

from django.utils import timezone
from django.db.models import Count, Avg
from django.http import JsonResponse
from apps.mood_tracking.models import MoodEntry
from .models import MoodConversationLink
import logging
from datetime import timedelta

logger = logging.getLogger(__name__)


class ChatBridgeMetrics:
    """
    Metrics collection for chat bridge operations.
    
    Tracks success rates, performance metrics, and error rates
    for monitoring and alerting purposes.
    """
    
    def get_success_rate(self, hours: int = 24) -> float:
        """
        Calculate conversation generation success rate.
        
        Args:
            hours: Time window in hours to calculate rate for
            
        Returns:
            Success rate as percentage (0.0-100.0)
        """
        since = timezone.now() - timedelta(hours=hours)
        
        total_attempts = MoodConversationLink.objects.filter(
            created_at__gte=since
        ).count()
        
        if total_attempts == 0:
            return 100.0  # No attempts = 100% success
        
        successful_attempts = MoodConversationLink.objects.filter(
            created_at__gte=since,
            generation_status='generated'
        ).count()
        
        success_rate = (successful_attempts / total_attempts) * 100
        logger.info(f"Success rate (last {hours}h): {success_rate:.2f}%")
        
        return success_rate
    
    def get_error_rate_by_type(self, hours: int = 24) -> dict:
        """
        Get error rates broken down by error type.
        
        Args:
            hours: Time window in hours
            
        Returns:
            Dictionary with error type counts
        """
        since = timezone.now() - timedelta(hours=hours)
        
        error_counts = MoodConversationLink.objects.filter(
            created_at__gte=since,
            generation_status='failed'
        ).count()
        
        total_attempts = MoodConversationLink.objects.filter(
            created_at__gte=since
        ).count()
        
        error_rate = (error_counts / total_attempts * 100) if total_attempts > 0 else 0
        
        return {
            'total_errors': error_counts,
            'total_attempts': total_attempts,
            'error_rate_percent': error_rate
        }
    
    def get_fallback_usage_rate(self, hours: int = 24) -> float:
        """
        Calculate fallback conversation starter usage rate.
        
        Args:
            hours: Time window in hours
            
        Returns:
            Fallback usage rate as percentage
        """
        # This would require additional tracking in production
        # For now, return a placeholder
        return 0.0
    
    def get_performance_metrics(self, hours: int = 24) -> dict:
        """
        Get performance metrics for conversation generation.
        
        Args:
            hours: Time window in hours
            
        Returns:
            Dictionary with performance metrics
        """
        since = timezone.now() - timedelta(hours=hours)
        
        # Calculate average time between mood entry and conversation creation
        links = MoodConversationLink.objects.filter(
            created_at__gte=since,
            generation_status='generated'
        ).select_related('mood_entry')
        
        if not links.exists():
            return {
                'average_generation_time_seconds': 0,
                'total_conversations_generated': 0
            }
        
        total_time = 0
        count = 0
        
        for link in links:
            time_diff = (link.created_at - link.mood_entry.timestamp).total_seconds()
            total_time += time_diff
            count += 1
        
        avg_time = total_time / count if count > 0 else 0
        
        return {
            'average_generation_time_seconds': avg_time,
            'total_conversations_generated': count
        }


def health_check_view(request):
    """
    Health check endpoint for Chat Bridge service status.
    
    Returns:
        JsonResponse with health status and key metrics
    """
    try:
        metrics = ChatBridgeMetrics()
        
        # Check recent success rate
        success_rate = metrics.get_success_rate(hours=1)  # Last hour
        error_metrics = metrics.get_error_rate_by_type(hours=1)
        performance = metrics.get_performance_metrics(hours=1)
        
        # Determine health status
        is_healthy = (
            success_rate >= 95.0 and  # 95% success rate threshold
            performance['average_generation_time_seconds'] <= 5.0  # 5 second threshold
        )
        
        health_data = {
            'status': 'healthy' if is_healthy else 'degraded',
            'timestamp': timezone.now().isoformat(),
            'metrics': {
                'success_rate_percent': success_rate,
                'error_rate_percent': error_metrics['error_rate_percent'],
                'average_generation_time_seconds': performance['average_generation_time_seconds'],
                'conversations_generated_last_hour': performance['total_conversations_generated']
            },
            'thresholds': {
                'min_success_rate': 95.0,
                'max_generation_time': 5.0
            }
        }
        
        status_code = 200 if is_healthy else 503
        return JsonResponse(health_data, status=status_code)
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JsonResponse({
            'status': 'error',
            'error': str(e),
            'timestamp': timezone.now().isoformat()
        }, status=500)