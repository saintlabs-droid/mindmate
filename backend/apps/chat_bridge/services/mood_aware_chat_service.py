"""
Mood-Aware Chat Service

Extends the existing ChatService to handle mood-based conversation generation
with specialized prompts and context management.
"""

from typing import Optional, Dict, Any
from apps.ai_service.services import ChatService
from apps.ai_service.ai_config import ChatResponseResult
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.models import Conversation, ChatMessage
from ..schemas import ConversationStarterResult
import logging

logger = logging.getLogger(__name__)


class MoodAwareChatService(ChatService):
    """
    Extended chat service that handles mood-based conversation generation.
    
    This service builds on the existing ChatService to provide specialized
    handling for conversations initiated from mood entries.
    """
    
    MOOD_CONVERSATION_PROMPT = """
[Persona] You are MindMate, a warm AI companion specializing in mood-based support.

[Action] Create a conversation starter based on the user's mood entry.

[Context] User submitted: Mood {mood_level}/5, Stress: {stress_factors}

[Format] Return JSON with ConversationStarterResult schema.

[Constraints]
- 50-150 words for starter_text
- Reference specific stress factors
- End with engaging question
- Match tone to mood level (empathetic for 1-2, exploratory for 3, growth-focused for 4-5)
"""
    
    def create_mood_based_conversation(
        self, 
        mood_entry: MoodEntry,
        conversation: Conversation
    ) -> ChatMessage:
        """
        Create conversation starter from mood context.
        
        Args:
            mood_entry: MoodEntry that triggered the conversation
            conversation: Conversation to add the starter to
            
        Returns:
            Created ChatMessage with the conversation starter
        """
        # Build mood-specific prompt
        prompt = self.MOOD_CONVERSATION_PROMPT.format(
            mood_level=mood_entry.mood_level,
            stress_factors=mood_entry.stress_category
        )
        
        # Generate response using parent class method
        result, interaction_id = self.send_message(
            user_id=str(mood_entry.user.id),
            message=prompt,
            conversation_history=[],  # Fresh conversation
            previous_interaction_id=None
        )
        
        # Create the chat message
        message = ChatMessage.objects.create(
            user=mood_entry.user,
            conversation=conversation,
            sender='ai',
            content=result.response_text,
            detected_mood=result.detected_mood,
            suggested_activities=result.suggested_activities,
            follow_up_questions=result.follow_up_questions,
            crisis_flag=result.crisis_flag,
            resource_suggestions=result.resource_suggestions,
            interaction_id=interaction_id
        )
        
        logger.info(f"Created mood-based conversation starter {message.id}")
        return message