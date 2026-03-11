"""
Chat Bridge Service

This service orchestrates the mood-to-chat integration workflow, managing
conversation creation, mood entry processing, and error handling.
"""

from typing import Optional
from django.utils import timezone
from django.contrib.auth import get_user_model
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.models import Conversation, ChatMessage
from .mood_context_generator import MoodContextGenerator
from ..models import MoodConversationLink
from ..exceptions import (
    MoodDataValidationError, 
    ConversationGenerationError,
    AIServiceIntegrationError
)
import logging

User = get_user_model()
logger = logging.getLogger(__name__)


class ChatBridgeService:
    """
    Orchestrates the mood-to-chat integration workflow.
    
    This service manages the complete process from mood entry detection
    to conversation creation, including error handling and fallback mechanisms.
    """
    
    def __init__(self):
        """Initialize the service with required components."""
        self.context_generator = MoodContextGenerator()
    
    def should_generate_conversation(self, mood_entry: MoodEntry) -> bool:
        """
        Determine if a mood entry should trigger conversation generation.
        
        Args:
            mood_entry: MoodEntry instance to evaluate
            
        Returns:
            True if conversation should be generated, False otherwise
        """
        # Check if entry has no note (or only whitespace)
        if mood_entry.note and mood_entry.note.strip():
            logger.debug(f"Skipping mood entry {mood_entry.id} - has note")
            return False
        
        # Check if entry has valid mood level and stress category
        if not (1 <= mood_entry.mood_level <= 5):
            logger.warning(f"Invalid mood level {mood_entry.mood_level} for entry {mood_entry.id}")
            return False
            
        if not mood_entry.stress_category:
            logger.warning(f"Missing stress category for entry {mood_entry.id}")
            return False
        
        # Check if conversation already exists for this mood entry
        if hasattr(mood_entry, 'conversation_link'):
            logger.debug(f"Conversation already exists for mood entry {mood_entry.id}")
            return False
        
        return True
    
    def validate_mood_entry(self, mood_entry: MoodEntry) -> bool:
        """
        Validate mood entry data for processing.
        
        Args:
            mood_entry: MoodEntry to validate
            
        Returns:
            True if valid, False otherwise
            
        Raises:
            MoodDataValidationError: If data is invalid
        """
        if not mood_entry:
            raise MoodDataValidationError("Mood entry is None")
        
        if not mood_entry.user_id:
            raise MoodDataValidationError("Mood entry missing user")
        
        if not (1 <= mood_entry.mood_level <= 5):
            raise MoodDataValidationError(f"Invalid mood level: {mood_entry.mood_level}")
        
        if not mood_entry.stress_category:
            raise MoodDataValidationError("Missing stress category")
        
        # Validate stress category is in allowed choices
        valid_categories = [choice[0] for choice in MoodEntry.STRESS_CATEGORIES]
        if mood_entry.stress_category not in valid_categories:
            raise MoodDataValidationError(f"Invalid stress category: {mood_entry.stress_category}")
        
        return True
    
    def get_or_create_daily_conversation(self, user: User) -> Conversation:
        """
        Get existing daily conversation or create a new one.
        
        Args:
            user: User instance
            
        Returns:
            Conversation instance for today
        """
        today = timezone.now().date()
        
        # Try to find existing conversation for today
        existing_conversation = Conversation.objects.filter(
            user=user,
            created_at__date=today,
            is_active=True
        ).first()
        
        if existing_conversation:
            logger.debug(f"Found existing daily conversation {existing_conversation.id} for user {user.id}")
            return existing_conversation
        
        # Create new conversation for today
        conversation = Conversation.objects.create(
            user=user,
            title=f"Daily Check-in - {today.strftime('%B %d, %Y')}",
            is_active=True
        )
        
        logger.info(f"Created new daily conversation {conversation.id} for user {user.id}")
        return conversation
    
    def create_conversation_starter_message(
        self, 
        conversation: Conversation, 
        starter_result, 
        mood_entry: MoodEntry
    ) -> ChatMessage:
        """
        Create a chat message from the conversation starter result.
        
        Args:
            conversation: Conversation to add message to
            starter_result: ConversationStarterResult from context generator
            mood_entry: Original mood entry
            
        Returns:
            Created ChatMessage instance
        """
        message = ChatMessage.objects.create(
            user=mood_entry.user,
            conversation=conversation,
            sender='ai',
            content=starter_result.starter_text,
            detected_mood=starter_result.mood_interpretation,
            suggested_activities=[],  # Could be enhanced later
            follow_up_questions=[starter_result.engagement_question],
            crisis_flag=False,  # Mood-based starters are generally supportive
            resource_suggestions=[]  # Could be enhanced based on stress factors
        )
        
        logger.info(f"Created starter message {message.id} for conversation {conversation.id}")
        return message
    
    def handle_generation_failure(self, mood_entry: MoodEntry, error: Exception) -> None:
        """
        Handle conversation generation failures gracefully.
        
        Args:
            mood_entry: MoodEntry that failed processing
            error: Exception that occurred
        """
        logger.error(f"Conversation generation failed for mood entry {mood_entry.id}: {error}")
        
        # Try to create a link with failed status for tracking
        try:
            # Get or create a basic conversation
            conversation = self.get_or_create_daily_conversation(mood_entry.user)
            
            MoodConversationLink.objects.create(
                mood_entry=mood_entry,
                conversation=conversation,
                generation_status='failed'
            )
            
            logger.info(f"Created failed link for mood entry {mood_entry.id}")
            
        except Exception as link_error:
            logger.error(f"Failed to create error tracking link: {link_error}")
    
    def process_mood_entry(self, mood_entry: MoodEntry) -> Optional[str]:
        """
        Process a mood entry for conversation generation.
        
        This is the main entry point for the mood-to-chat bridge workflow.
        
        Args:
            mood_entry: MoodEntry instance to process
            
        Returns:
            Conversation ID if successful, None if skipped or failed
            
        Raises:
            MoodDataValidationError: If mood data is invalid
            ConversationGenerationError: If generation fails
        """
        try:
            # Check if we should process this entry
            if not self.should_generate_conversation(mood_entry):
                logger.debug(f"Skipping mood entry {mood_entry.id} - does not meet criteria")
                return None
            
            # Validate mood entry data
            self.validate_mood_entry(mood_entry)
            
            # Get or create daily conversation
            conversation = self.get_or_create_daily_conversation(mood_entry.user)
            
            # Create pending link
            link = MoodConversationLink.objects.create(
                mood_entry=mood_entry,
                conversation=conversation,
                generation_status='pending'
            )
            
            try:
                # Generate conversation starter
                starter_result = self.context_generator.generate_conversation_starter(mood_entry)
                
                # Create chat message
                starter_message = self.create_conversation_starter_message(
                    conversation, 
                    starter_result, 
                    mood_entry
                )
                
                # Update link with success
                link.starter_message = starter_message
                link.generation_status = 'generated'
                link.save()
                
                logger.info(f"Successfully processed mood entry {mood_entry.id} -> conversation {conversation.id}")
                return str(conversation.id)
                
            except Exception as generation_error:
                # Try fallback generation
                logger.warning(f"Primary generation failed, trying fallback: {generation_error}")
                
                try:
                    fallback_result = self.context_generator.get_fallback_starter(mood_entry)
                    
                    starter_message = self.create_conversation_starter_message(
                        conversation,
                        fallback_result,
                        mood_entry
                    )
                    
                    # Update link with fallback success
                    link.starter_message = starter_message
                    link.generation_status = 'generated'
                    link.save()
                    
                    logger.info(f"Fallback generation successful for mood entry {mood_entry.id}")
                    return str(conversation.id)
                    
                except Exception as fallback_error:
                    # Mark as failed
                    link.generation_status = 'failed'
                    link.save()
                    
                    logger.error(f"Both primary and fallback generation failed: {fallback_error}")
                    raise ConversationGenerationError(f"All generation methods failed: {fallback_error}")
            
        except MoodDataValidationError:
            # Re-raise validation errors
            raise
        except Exception as e:
            # Handle unexpected errors gracefully
            self.handle_generation_failure(mood_entry, e)
            raise ConversationGenerationError(f"Unexpected error processing mood entry: {e}")