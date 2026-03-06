"""
AI Service Reusable View Mixins

This module provides reusable mixins for AI service API views. Mixins
encapsulate common functionality like response formatting, error handling,
and processing time tracking.

Mixins:
    - AIResponseMixin: Consistent success/error response formatting
    - ProcessingTimeMixin: Track and report AI processing duration

Response Format:
    Success:
        {
            "success": true,
            "data": {...},
            "meta": {
                "timestamp": "2025-02-25T10:30:00Z",
                "processing_time_ms": 1200
            }
        }
    
    Error:
        {
            "success": false,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Audio recording must be under 5 minutes"
            }
        }

Usage:
    from mindmate.backend.apps.ai_service.mixins import AIResponseMixin
    
    class VoiceAnalysisView(AIResponseMixin, APIView):
        def post(self, request):
            result = self.process_voice(request)
            return self.success_response(data=result)
"""

# Mixins will be implemented in Task 11
# from rest_framework.response import Response
# from django.utils import timezone
#
# class AIResponseMixin:
#     """
#     Mixin providing consistent response formatting for AI endpoints.
#     """
#     
#     def success_response(self, data, meta=None, status=200):
#         """Format successful API response."""
#         response_data = {
#             "success": True,
#             "data": data,
#             "meta": meta or {"timestamp": timezone.now().isoformat()}
#         }
#         return Response(response_data, status=status)
#     
#     def error_response(self, code, message, status=400, field=None):
#         """Format error API response."""
#         error_data = {"code": code, "message": message}
#         if field:
#             error_data["field"] = field
#         return Response({"success": False, "error": error_data}, status=status)

__all__ = [
    # 'AIResponseMixin',
    # 'ProcessingTimeMixin',
]
