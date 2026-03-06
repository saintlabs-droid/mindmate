"""
AI Service Pydantic Response Schemas

This module defines Pydantic models for structured JSON responses from the
Gemini AI API. These schemas ensure type safety and validation for all AI
analysis results.

The core schemas are imported from ai_config.py and re-exported here for
centralized access. This module serves as the primary interface for all
Pydantic schemas used in the AI service.

Schemas:
    - VoiceAnalysisResult: Voice tone analysis response schema
    - SpaceAnalysisResult: Environment/space analysis response schema
    - WeeklyInsightsResult: Weekly mood insights response schema
    - ChatResponseResult: AI chatbot response schema

Usage:
    from mindmate.backend.apps.ai_service.schemas import (
        VoiceAnalysisResult,
        SpaceAnalysisResult,
        WeeklyInsightsResult,
        ChatResponseResult,
    )

See Also:
    - ai_config.py: Core Pydantic schema definitions
    - serializers/: DRF serializers for API request/response handling
"""

from .ai_config import (
    VoiceAnalysisResult,
    SpaceAnalysisResult,
    WeeklyInsightsResult,
    ChatResponseResult,
    EmotionType,
)

__all__ = [
    'VoiceAnalysisResult',
    'SpaceAnalysisResult',
    'WeeklyInsightsResult',
    'ChatResponseResult',
    'EmotionType',
]
