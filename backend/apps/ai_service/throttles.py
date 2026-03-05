"""
AI Service Rate Limiting

This module defines custom throttle classes for AI service endpoints.
Rate limiting protects the Gemini API from abuse and ensures fair usage
across all users.

Throttle Classes:
    - AIRateThrottle: Standard rate limit for AI endpoints (30 req/min)
    - AIBurstThrottle: Burst rate limit for short-term spikes

Configuration:
    Rate limits can be configured in Django settings:
    
    REST_FRAMEWORK = {
        'DEFAULT_THROTTLE_RATES': {
            'ai_standard': '30/minute',
            'ai_burst': '5/second',
        }
    }

Usage:
    from mindmate.backend.apps.ai_service.throttles import AIRateThrottle
    
    class VoiceAnalysisView(APIView):
        throttle_classes = [AIRateThrottle]
"""

# Throttle classes will be implemented in Task 11
# from rest_framework.throttling import UserRateThrottle
#
# class AIRateThrottle(UserRateThrottle):
#     """
#     Rate throttle for AI endpoints.
#     Limits users to 30 requests per minute.
#     """
#     scope = 'ai_standard'
#     rate = '30/minute'

__all__ = [
    # 'AIRateThrottle',
    # 'AIBurstThrottle',
]
