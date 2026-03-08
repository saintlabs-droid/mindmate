"""
AI Service URL Configuration

RESTful API endpoints for AI-powered features:
- Voice tone analysis
- Space/environment analysis
- Weekly mood insights
- AI chatbot with stateful conversations

URL Pattern Convention:
- POST endpoints for data submission and processing
- GET endpoints for data retrieval
- Versioned API paths (/api/v1/) for future compatibility
- Descriptive, resource-based naming

Authentication:
All endpoints require JWT authentication via Authorization header.

Rate Limiting:
All endpoints are rate-limited to prevent abuse:
- AIRateThrottle: 30 requests/minute
- AIBurstThrottle: 5 requests/second
"""

from django.urls import path
from apps.ai_service.views import (
    VoiceAnalysisView,
    SpaceAnalysisView,
    WeeklyInsightsView,
    ChatView,
    ChatHistoryView,
)

# App namespace for URL reversing
app_name = 'ai_service'

urlpatterns = [
    # Voice Analysis Endpoint
    # POST /api/v1/ai/voice-analysis/
    # Accepts: audio file (WAV, MP3, WebM, max 5 minutes)
    # Returns: energy level, emotions, fatigue indicator, supportive message
    path(
        'voice-analysis/',
        VoiceAnalysisView.as_view(),
        name='voice-analysis'
    ),
    
    # Space Analysis Endpoint
    # POST /api/v1/ai/space-analysis/
    # Accepts: image file (JPEG, PNG, WebP, max 10MB)
    # Returns: lighting quality, clutter level, calming elements, improvement tips
    path(
        'space-analysis/',
        SpaceAnalysisView.as_view(),
        name='space-analysis'
    ),
    
    # Weekly Insights Endpoint
    # GET /api/v1/ai/insights/weekly/
    # Query params: force_refresh (optional, boolean)
    # Returns: mood trends, patterns, achievements, focus areas for past 7 days
    path(
        'insights/weekly/',
        WeeklyInsightsView.as_view(),
        name='weekly-insights'
    ),
    
    # Chat Message Endpoint
    # POST /api/v1/ai/chat/
    # Accepts: message (string), conversation_id (optional, UUID)
    # Returns: user message, AI response with mood detection and suggestions
    path(
        'chat/',
        ChatView.as_view(),
        name='chat'
    ),
    
    # Chat History Endpoint
    # GET /api/v1/ai/chat/history/
    # Query params: conversation_id (required, UUID), page (optional), page_size (optional)
    # Returns: paginated list of messages for the conversation
    path(
        'chat/history/',
        ChatHistoryView.as_view(),
        name='chat-history'
    ),
]
