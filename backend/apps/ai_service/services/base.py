"""
Gemini AI Services for MindMate

Reusable service layer for all AI interactions using the Gemini Interactions API.
Each service follows the professional prompting framework:
[Persona] + [Action] + [Context] + [Format] + [Constraints]
"""
import base64
import logging
from typing import Optional, Type, TypeVar
from pydantic import BaseModel
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)

from apps.ai_service.ai_config import (
    get_gemini_client,
    GeminiModels,
    VoiceAnalysisResult,
    SpaceAnalysisResult,
    MoodAnalysisResult,
    WeeklyInsightsResult,
    ChatResponseResult,
)

logger = logging.getLogger(__name__)

T = TypeVar('T', bound=BaseModel)


class GeminiServiceError(Exception):
    """Custom exception for Gemini service errors."""
    pass


class GeminiService:
    """
    Reusable Gemini AI service using the Interactions API.
    All multimodal analysis methods use this base service.
    """
    
    def __init__(self, model: str = GeminiModels.FLASH):
        self.client = get_gemini_client()
        self.model = model
        self._conversation_id: Optional[str] = None
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
        reraise=True,
    )
    def _create_interaction(
        self,
        input_data: list | str,
        response_schema: Optional[Type[T]] = None,
        previous_id: Optional[str] = None,
    ) -> dict:
        """
        Base method for creating Gemini interactions with retry logic.
        Retries up to 3 times with exponential backoff for transient failures.
        
        Args:
            input_data: Text prompt or list of multimodal inputs
            response_schema: Optional Pydantic schema for structured output
            previous_id: Optional previous interaction ID for conversation context
            
        Returns:
            Gemini interaction response object
            
        Raises:
            GeminiServiceError: If all retry attempts fail
        """
        try:
            kwargs = {
                "model": self.model,
                "input": input_data,
            }
            
            if response_schema:
                kwargs["response_format"] = response_schema.model_json_schema()
            
            if previous_id:
                kwargs["previous_interaction_id"] = previous_id
            
            logger.info(f"Creating Gemini interaction with model {self.model}")
            interaction = self.client.interactions.create(**kwargs)
            logger.info(f"Gemini interaction created successfully: {interaction.id}")
            return interaction
            
        except Exception as e:
            logger.error(f"Gemini interaction failed: {e}", exc_info=True)
            raise GeminiServiceError(f"AI service unavailable: {str(e)}")
    
    def _parse_response(self, interaction, schema: Type[T]) -> T:
        """Parse and validate response against Pydantic schema."""
        try:
            text_output = next(
                (o for o in interaction.outputs if o.type == "text"),
                None
            )
            if not text_output:
                raise GeminiServiceError("No text response from AI")
            
            return schema.model_validate_json(text_output.text)
        except Exception as e:
            logger.error(f"Response parsing failed: {e}")
            raise GeminiServiceError(f"Failed to parse AI response: {str(e)}")


class VoiceAnalysisService(GeminiService):
    """Service for analyzing voice recordings for emotional tone."""
    
    ANALYSIS_PROMPT = """
[Persona] You are an empathetic voice analysis specialist for a mental wellness application.

[Action] Analyze the emotional characteristics of this voice recording.

[Context] The user has submitted a voice recording to understand their emotional state.

[Format] Return a JSON object with exactly these fields:
{
    "energy_level": <integer 1-10>,
    "detected_emotions": [<list of strings from valid emotions>],
    "fatigue_indicator": <boolean>,
    "speech_pace": "<string: exactly 'slow', 'normal', or 'fast'>",
    "confidence_score": <float 0.0-1.0>,
    "supportive_message": "<string: warm, encouraging message>"
}

[Constraints]
- energy_level: Integer from 1 (very low) to 10 (very high)
- detected_emotions: Array containing ONLY: "happy", "sad", "anxious", "calm", "stressed", "energetic", "fatigued", "neutral", "frustrated", "hopeful", "overwhelmed", "content"
- fatigue_indicator: true if voice shows signs of tiredness, false otherwise
- speech_pace: MUST be exactly one of: "slow", "normal", "fast"
- confidence_score: Float between 0.0 and 1.0
- supportive_message: 1-3 sentences, warm and encouraging tone
"""
    
    def analyze_audio_url(self, audio_url: str, mime_type: str = "audio/wav") -> VoiceAnalysisResult:
        """Analyze audio from a URL."""
        input_data = [
            {"type": "text", "text": self.ANALYSIS_PROMPT},
            {"type": "audio", "uri": audio_url, "mime_type": mime_type}
        ]
        interaction = self._create_interaction(input_data, VoiceAnalysisResult)
        return self._parse_response(interaction, VoiceAnalysisResult)
    
    def analyze_audio_bytes(self, audio_data: bytes, mime_type: str = "audio/wav") -> VoiceAnalysisResult:
        """Analyze audio from raw bytes (base64 encoded)."""
        encoded = base64.b64encode(audio_data).decode("utf-8")
        input_data = [
            {"type": "text", "text": self.ANALYSIS_PROMPT},
            {"type": "audio", "data": encoded, "mime_type": mime_type}
        ]
        interaction = self._create_interaction(input_data, VoiceAnalysisResult)
        return self._parse_response(interaction, VoiceAnalysisResult)


class SpaceAnalysisService(GeminiService):
    """Service for analyzing user's environment/calm space."""
    
    ANALYSIS_PROMPT = """
[Persona] You are a supportive environment wellness consultant for a mental health application.

[Action] Analyze this photo of the user's personal space for relaxation potential.

[Context] The user wants to understand how their environment affects their mental wellbeing.

[Format] Return a JSON object with exactly these fields:
{
    "lighting_quality": "<string: exactly 'poor', 'moderate', 'good', or 'excellent'>",
    "lighting_type": "<string: exactly 'natural', 'artificial', 'mixed', or 'dim'>",
    "clutter_level": "<string: exactly 'minimal', 'moderate', or 'cluttered'>",
    "calming_elements": [<list of identified calming elements>],
    "relaxation_score": <integer 1-10>,
    "environment_tips": [<list of 2-4 actionable improvement tips>],
    "personalized_comment": "<string: friendly observation about something positive>"
}

[Constraints]
- lighting_quality: MUST be exactly one of: "poor", "moderate", "good", "excellent"
- lighting_type: MUST be exactly one of: "natural", "artificial", "mixed", "dim"
- clutter_level: MUST be exactly one of: "minimal", "moderate", "cluttered"
- calming_elements: Array of strings like "plants", "soft colors", "natural materials"
- relaxation_score: Integer from 1 (not relaxing) to 10 (very relaxing)
- environment_tips: Array of 2-4 specific, actionable suggestions
- personalized_comment: 1-2 sentences highlighting something positive
"""
    
    def analyze_image_url(self, image_url: str, mime_type: str = "image/jpeg") -> SpaceAnalysisResult:
        """Analyze space image from URL."""
        input_data = [
            {"type": "text", "text": self.ANALYSIS_PROMPT},
            {"type": "image", "uri": image_url, "mime_type": mime_type}
        ]
        interaction = self._create_interaction(input_data, SpaceAnalysisResult)
        return self._parse_response(interaction, SpaceAnalysisResult)
    
    def analyze_image_bytes(self, image_data: bytes, mime_type: str = "image/jpeg") -> SpaceAnalysisResult:
        """Analyze space image from raw bytes."""
        encoded = base64.b64encode(image_data).decode("utf-8")
        input_data = [
            {"type": "text", "text": self.ANALYSIS_PROMPT},
            {"type": "image", "data": encoded, "mime_type": mime_type}
        ]
        interaction = self._create_interaction(input_data, SpaceAnalysisResult)
        return self._parse_response(interaction, SpaceAnalysisResult)





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
    
    def _build_context_prompt(
        self,
        user_message: str,
        conversation_history: Optional[list] = None
    ) -> str:
        """Build a context-aware prompt including conversation history."""
        context_parts = [self.SYSTEM_PROMPT]
        
        if conversation_history:
            history_str = "\n[Previous Conversation]\n"
            for msg in conversation_history[-5:]:
                sender = "User" if msg.get('sender') == 'user' else "MindMate"
                history_str += f"{sender}: {msg.get('content', '')}\n"
            context_parts.append(history_str)
        
        context_parts.append(f"\n[Current User Message]\n{user_message}")
        
        return "\n".join(context_parts)
    
    def send_message(
        self,
        user_id: str,
        message: str,
        conversation_history: Optional[list] = None,
        previous_interaction_id: Optional[str] = None
    ) -> tuple[ChatResponseResult, str]:
        """Send a message and get an AI response."""
        full_prompt = self._build_context_prompt(message, conversation_history)
        
        interaction = self._create_interaction(
            full_prompt,
            ChatResponseResult,
            previous_interaction_id
        )
        
        result = self._parse_response(interaction, ChatResponseResult)
        return result, interaction.id
