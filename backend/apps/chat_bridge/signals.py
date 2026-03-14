"""
Chat Bridge Signal Handlers

This module contains Django signal handlers that detect mood entry creation
and trigger conversation generation for note-less entries.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.mood_tracking.models import MoodEntry
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=MoodEntry)
def handle_mood_entry_created(sender, instance, created, **kwargs):
    """
    Handle mood entry creation and trigger conversation generation.
    
    This signal handler detects when new mood entries are created and
    triggers asynchronous conversation generation for eligible entries.
    
    Args:
        sender: MoodEntry model class
        instance: The created MoodEntry instance
        created: Boolean indicating if this is a new instance
        **kwargs: Additional signal arguments
    """
    if not created:
        # Only process newly created entries
        return
    
    logger.debug(f"Processing new mood entry {instance.id} for user {instance.user.id}")
    
    try:
        # Import here to avoid circular imports
        from .services.chat_bridge_service import ChatBridgeService
        
        service = ChatBridgeService()
        
        # Check if this entry should trigger conversation generation
        if service.should_generate_conversation(instance):
            logger.info(f"Triggering conversation generation for mood entry {instance.id}")
            
            # For now, process synchronously
            # In production, this would trigger an async task
            try:
                conversation_id = service.process_mood_entry(instance)
                if conversation_id:
                    logger.info(f"Successfully generated conversation {conversation_id} for mood entry {instance.id}")
                else:
                    logger.debug(f"Conversation generation skipped for mood entry {instance.id}")
            except Exception as e:
                logger.error(f"Failed to process mood entry {instance.id}: {e}")
                # Don't re-raise - we don't want to break mood entry creation
        else:
            logger.debug(f"Mood entry {instance.id} does not meet conversation generation criteria")
            
    except Exception as e:
        logger.error(f"Error in mood entry signal handler: {e}")
        # Don't re-raise - signal handlers should not break the original operation