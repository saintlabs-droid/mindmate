"""
AI Service Layer Module

Re-exports services from base.py.
Handles missing google-genai package gracefully for testing.
"""

try:
    from .base import (
        GeminiService,
        GeminiServiceError,
        VoiceAnalysisService,
        SpaceAnalysisService,
        InsightsGeneratorService,
        ChatService,
    )
    
    __all__ = [
        'GeminiService',
        'GeminiServiceError',
        'VoiceAnalysisService',
        'SpaceAnalysisService',
        'InsightsGeneratorService',
        'ChatService',
    ]
except ImportError as e:
    # google-genai package not installed - services unavailable
    # This allows tests to run without the package
    import warnings
    warnings.warn(f"AI services unavailable: {e}. Install google-genai package.")
    
    __all__ = []
