"""
AI Service Serializers Module

This module provides Django REST Framework serializers for all AI-related
API endpoints. Serializers handle request validation, response formatting,
and data transformation between API and service layers.

Serializers:
    - VoiceAnalysisSerializer: Voice analysis result serialization
    - VoiceAnalysisInputSerializer: Audio file upload validation
    - SpaceAnalysisSerializer: Space analysis result serialization
    - SpaceAnalysisInputSerializer: Image file upload validation
    - WeeklyInsightsSerializer: Weekly insights result serialization
    - ChatMessageSerializer: Chat message serialization
    - ChatInputSerializer: Chat message input validation
    - ConversationSerializer: Conversation metadata serialization

Usage:
    from mindmate.backend.apps.ai_service.serializers import (
        VoiceAnalysisSerializer,
        SpaceAnalysisSerializer,
    )
"""

from .voice import VoiceAnalysisSerializer, VoiceAnalysisInputSerializer
from .space import SpaceAnalysisSerializer, SpaceAnalysisInputSerializer
from .insights import WeeklyInsightsSerializer
from .chat import ChatMessageSerializer, ChatInputSerializer, ConversationSerializer

__all__ = [
    'VoiceAnalysisSerializer',
    'VoiceAnalysisInputSerializer',
    'SpaceAnalysisSerializer',
    'SpaceAnalysisInputSerializer',
    'WeeklyInsightsSerializer',
    'ChatMessageSerializer',
    'ChatInputSerializer',
    'ConversationSerializer',
]
