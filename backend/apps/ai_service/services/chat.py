"""
Chat Service for MindMate AI Chatbot

Provides stateful conversational AI using Gemini Interactions API.
Maintains conversation context using previous_interaction_id.
"""
import logging
from typing import Optional
from uuid import UUID

from apps.ai_service.ai_config import ChatResponseResult
from apps.ai_service.services.base import GeminiService

logger = logging.getLogger(__name__)


class ChatService(GeminiService):
    """Service for stateful AI chatbot conversations."""
    
    SYSTEM_PROMPT = """
[Persona] You are MindMate, a warm, empathetic AI companion for mental wellness support. You are NOT a therapist, but a supportive friend who listens without judgment.

[Action] Respond to the user's message with empathy and helpful suggestions when appropriate.

[Context] You are having an ongoing conversation with a user about their mental wellbeing.

[Format] Return a JSON object with exactly these fields:
{
    "response_text": "<string: your empathetic response>",
    "detected_mood": "<string: the mood you detect>",
    "suggested_activities": [<list of 1-3 relevant activities>],
    "follow_up_questions": [<list of 1-2 gentle follow-up questions>],
    "crisis_flag": <boolean>,
    "resource_suggestions": [<list of relevant resources if needed>]
}

[Constraints]
- response_text: 2-5 sentences, warm and conversational tone
- detected_mood: Single word or short phrase
- suggested_activities: Array of 1-3 brief, actionable suggestions
- follow_up_questions: Array of 1-2 open-ended questions
- crisis_flag: true ONLY if message contains self-harm/suicide indicators
- resource_suggestions: MUST include "National Suicide Prevention Lifeline: 988" if crisis_flag is true

[Crisis Detection]
Set crisis_flag to true if message contains:
- Mentions of self-harm or suicide
- Expressions of hopelessness about living
- Plans to hurt oneself or others

[Tone Guidelines]
- Be warm, not clinical
- Validate feelings before offering suggestions
- Avoid toxic positivity
- Never diagnose or prescribe
"""
    
    def _build_context_prompt(self, message: str) -> str:
        """
        Build a context-aware prompt from user message.
        
        Combines the system prompt with the user's message to create
        a complete prompt for the Gemini API.
        
        Args:
            message: The user's message text
            
        Returns:
            Complete prompt string with system instructions and user message
        """
        return f"{self.SYSTEM_PROMPT}\n\n[Current User Message]\n{message}"
    
    def send_message(
        self,
        user_id: UUID,
        message: str,
        previous_interaction_id: Optional[str] = None
    ) -> tuple[ChatResponseResult, str]:
        """
        Send a message and get an AI response with conversation context.
        
        Args:
            user_id: UUID of the user sending the message
            message: The user's message text
            previous_interaction_id: Optional ID from previous interaction for context
            
        Returns:
            Tuple of (ChatResponseResult, new_interaction_id)
            
        Raises:
            GeminiServiceError: If the AI service fails
        """
        logger.info(f"Processing chat message for user {user_id}")
        
        # Build the full prompt with context
        full_prompt = self._build_context_prompt(message)
        
        # Create interaction with optional conversation context
        interaction = self._create_interaction(
            full_prompt,
            ChatResponseResult,
            previous_interaction_id
        )
        
        # Parse the response
        result = self._parse_response(interaction, ChatResponseResult)
        
        # Ensure crisis resources are included if crisis detected
        if result.crisis_flag and not any(
            "988" in resource or "suicide" in resource.lower()
            for resource in result.resource_suggestions
        ):
            # Add crisis resources if not already present
            result.resource_suggestions.insert(
                0,
                "National Suicide Prevention Lifeline: 988"
            )
        
        logger.info(
            f"Chat response generated for user {user_id}, "
            f"crisis_flag={result.crisis_flag}"
        )
        
        return result, interaction.id
