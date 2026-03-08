"""
AI Service Rate Limiting

This module defines custom throttle classes for AI service endpoints.
Rate limiting protects the Gemini API from abuse and ensures fair usage
across all users.

Throttle Classes:
    - AIRateThrottle: Standard rate limit for AI endpoints (30 req/min)
    - AIBurstThrottle: Burst rate limit for short-term spikes

Configuration:
    Rate limits can be configured in Django settings:
    
    REST_FRAMEWORK = {
        'DEFAULT_THROTTLE_RATES': {
            'ai_standard': '30/minute',
            'ai_burst': '5/second',
        }
    }

Usage:
    from mindmate.backend.apps.ai_service.throttles import AIRateThrottle
    
    class VoiceAnalysisView(APIView):
        throttle_classes = [AIRateThrottle]
"""

from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from typing import Optional


class AIRateThrottle(UserRateThrottle):
    """
    Rate throttle for AI endpoints.
    
    Limits authenticated users to 30 requests per minute to protect
    the Gemini API from abuse and ensure fair usage across all users.
    
    This throttle is applied to all AI service endpoints including:
    - Voice analysis
    - Space analysis
    - Weekly insights
    - Chat messages
    
    Configuration:
        The rate can be overridden in Django settings:
        
        REST_FRAMEWORK = {
            'DEFAULT_THROTTLE_RATES': {
                'ai_standard': '30/minute',
            }
        }
    
    Usage:
        class VoiceAnalysisView(APIView):
            throttle_classes = [AIRateThrottle]
            
            def post(self, request):
                # Process voice analysis
                pass
    
    Benefits:
        - Prevents API abuse
        - Ensures fair resource allocation
        - Protects against accidental infinite loops
        - Reduces costs from excessive API calls
    """
    
    scope = 'ai_standard'
    rate = '30/minute'
    
    def get_cache_key(self, request, view) -> Optional[str]:
        """
        Generate cache key for rate limiting.
        
        Uses user ID for authenticated users to track their request count.
        
        Args:
            request: The HTTP request object
            view: The view being accessed
        
        Returns:
            str: Cache key for this user's rate limit tracking
            None: If user is not authenticated (no throttling applied)
        """
        if request.user and request.user.is_authenticated:
            ident = request.user.pk
        else:
            # Don't throttle unauthenticated requests
            # (they should be blocked by authentication anyway)
            return None
        
        return self.cache_format % {
            'scope': self.scope,
            'ident': ident
        }


class AIBurstThrottle(UserRateThrottle):
    """
    Burst rate throttle for AI endpoints.
    
    Limits users to 5 requests per second to prevent rapid-fire
    submissions that could overwhelm the system or indicate
    automated abuse.
    
    This throttle works in conjunction with AIRateThrottle to
    provide both short-term and long-term rate limiting.
    
    Configuration:
        The rate can be overridden in Django settings:
        
        REST_FRAMEWORK = {
            'DEFAULT_THROTTLE_RATES': {
                'ai_burst': '5/second',
            }
        }
    
    Usage:
        class VoiceAnalysisView(APIView):
            throttle_classes = [AIRateThrottle, AIBurstThrottle]
            
            def post(self, request):
                # Process voice analysis
                pass
    
    Benefits:
        - Prevents rapid-fire abuse
        - Protects against accidental button mashing
        - Reduces server load spikes
        - Complements long-term rate limiting
    """
    
    scope = 'ai_burst'
    rate = '5/second'


class AIAnonThrottle(AnonRateThrottle):
    """
    Rate throttle for unauthenticated AI endpoint access.
    
    Limits anonymous users to 10 requests per hour. This is more
    restrictive than authenticated user limits to encourage
    registration and prevent abuse.
    
    Note: Most AI endpoints require authentication, so this throttle
    is primarily used for public-facing endpoints like health checks
    or documentation.
    
    Configuration:
        The rate can be overridden in Django settings:
        
        REST_FRAMEWORK = {
            'DEFAULT_THROTTLE_RATES': {
                'ai_anon': '10/hour',
            }
        }
    
    Usage:
        class PublicAIInfoView(APIView):
            throttle_classes = [AIAnonThrottle]
            permission_classes = [AllowAny]
            
            def get(self, request):
                # Return public AI info
                pass
    
    Benefits:
        - Prevents anonymous abuse
        - Encourages user registration
        - Protects public endpoints
    """
    
    scope = 'ai_anon'
    rate = '10/hour'


__all__ = [
    'AIRateThrottle',
    'AIBurstThrottle',
    'AIAnonThrottle',
]
