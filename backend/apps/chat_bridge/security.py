"""
Chat Bridge Security and Privacy

This module implements security measures and data privacy compliance
for the mood-to-chat bridge functionality.
"""

from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from apps.mood_tracking.models import MoodEntry
import logging

User = get_user_model()
logger = logging.getLogger(__name__)


class ChatBridgeSecurityMixin:
    """
    Security mixin for chat bridge operations.
    
    Provides authentication validation and data access controls
    following existing Django patterns.
    """
    
    def validate_user_authentication(self, user: User) -> bool:
        """
        Validate user authentication for mood data access.
        
        Args:
            user: User instance to validate
            
        Returns:
            True if authenticated, raises PermissionDenied otherwise
            
        Raises:
            PermissionDenied: If user is not authenticated
        """
        if not user or not user.is_authenticated:
            logger.warning(f"Unauthenticated access attempt for user: {user}")
            raise PermissionDenied("User not authenticated")
        
        return True
    
    def validate_mood_entry_access(self, mood_entry: MoodEntry, user: User) -> bool:
        """
        Validate that user can access the mood entry.
        
        Args:
            mood_entry: MoodEntry to validate access for
            user: User requesting access
            
        Returns:
            True if access allowed
            
        Raises:
            PermissionDenied: If user cannot access the mood entry
        """
        self.validate_user_authentication(user)
        
        if mood_entry.user != user:
            logger.warning(f"User {user.id} attempted to access mood entry {mood_entry.id} owned by {mood_entry.user.id}")
            raise PermissionDenied("Cannot access another user's mood data")
        
        return True
    
    def log_data_access(self, operation: str, user_id: str, mood_entry_id: str = None) -> None:
        """
        Log data access events for debugging without storing sensitive details.
        
        Args:
            operation: Type of operation (e.g., 'conversation_generation')
            user_id: User ID (not sensitive)
            mood_entry_id: Mood entry ID (not sensitive)
        """
        log_data = {
            'operation': operation,
            'user_id': user_id,
            'mood_entry_id': mood_entry_id
        }
        
        # Log without sensitive mood details
        logger.info(f"Chat bridge operation: {log_data}")


class DataMinimizationMixin:
    """
    Mixin for data minimization practices.
    
    Ensures mood data is not stored beyond the conversation generation process
    and implements secure data handling patterns.
    """
    
    def process_mood_data_securely(self, mood_entry: MoodEntry) -> dict:
        """
        Process mood data with minimal exposure.
        
        Args:
            mood_entry: MoodEntry to process
            
        Returns:
            Minimal data dict for processing
        """
        # Return only necessary data for processing
        return {
            'mood_level': mood_entry.mood_level,
            'stress_category': mood_entry.stress_category,
            'user_id': str(mood_entry.user.id),
            'timestamp': mood_entry.timestamp.isoformat()
        }
    
    def clear_temporary_data(self, data: dict) -> None:
        """
        Clear temporary data after processing.
        
        Args:
            data: Temporary data dict to clear
        """
        # Clear sensitive data from memory
        if data:
            data.clear()
        
        logger.debug("Temporary mood data cleared from memory")