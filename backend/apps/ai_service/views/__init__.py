"""
AI Service Views Module

This module provides Django REST Framework API views for all AI-related
endpoints. Views handle HTTP request/response lifecycle, authentication,
rate limiting, and delegate business logic to the service layer.

Views:
    - VoiceAnalysisView: POST /api/v1/ai/voice-analysis/
    - SpaceAnalysisView: POST /api/v1/ai/space-analysis/
    - WeeklyInsightsView: GET /api/v1/ai/insights/weekly/
    - ChatView: POST /api/v1/ai/chat/
    - ChatHistoryView: GET /api/v1/ai/chat/history/

Usage:
    from mindmate.backend.apps.ai_service.views import (
        VoiceAnalysisView,
        SpaceAnalysisView,
    )
"""

from .voice import VoiceAnalysisView
# from .space import SpaceAnalysisView
# from .insights import WeeklyInsightsView
# from .chat import ChatView, ChatHistoryView

__all__ = [
    'VoiceAnalysisView',
    # 'SpaceAnalysisView',
    # 'WeeklyInsightsView',
    # 'ChatView',
    # 'ChatHistoryView',
]
