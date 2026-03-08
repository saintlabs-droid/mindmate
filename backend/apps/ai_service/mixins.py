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

from rest_framework.response import Response
from django.utils import timezone
from typing import Any, Dict, Optional
import time


class AIResponseMixin:
    """
    Mixin providing consistent response formatting for AI endpoints.
    
    This mixin ensures all AI service endpoints return responses in a
    standardized format, making frontend integration predictable and
    reducing error-prone response handling.
    
    Response Format:
        Success: {"success": true, "data": {...}, "meta": {...}}
        Error: {"success": false, "error": {"code": "...", "message": "..."}}
    
    Usage:
        class MyAIView(AIResponseMixin, APIView):
            def post(self, request):
                result = self.process_data(request.data)
                return self.success_response(data=result)
    
    Benefits:
        - Consistent API contract across all AI endpoints
        - Automatic timestamp injection
        - Simplified error response creation
        - Type hints for better IDE support
    """
    
    def success_response(
        self, 
        data: Any, 
        meta: Optional[Dict[str, Any]] = None, 
        status: int = 200
    ) -> Response:
        """
        Format successful API response with consistent structure.
        
        Args:
            data: The response payload (analysis results, insights, etc.)
            meta: Optional metadata (timestamp auto-added if not provided)
            status: HTTP status code (default: 200)
        
        Returns:
            Response: DRF Response object with standardized success format
        
        Example:
            return self.success_response(
                data={"energy_level": 7, "emotions": ["calm", "happy"]},
                meta={"processing_time_ms": 1200}
            )
        """
        # Ensure meta always includes timestamp
        if meta is None:
            meta = {}
        
        if "timestamp" not in meta:
            meta["timestamp"] = timezone.now().isoformat()
        
        response_data = {
            "success": True,
            "data": data,
            "meta": meta
        }
        
        return Response(response_data, status=status)
    
    def error_response(
        self, 
        code: str, 
        message: str, 
        status: int = 400, 
        field: Optional[str] = None
    ) -> Response:
        """
        Format error API response with consistent structure.
        
        Args:
            code: Error code for programmatic handling (e.g., "INVALID_AUDIO_FORMAT")
            message: User-friendly error message
            status: HTTP status code (default: 400)
            field: Optional field name for validation errors
        
        Returns:
            Response: DRF Response object with standardized error format
        
        Example:
            return self.error_response(
                code="VALIDATION_ERROR",
                message="Audio recording must be under 5 minutes",
                status=400,
                field="audio_file"
            )
        """
        error_data = {
            "code": code,
            "message": message
        }
        
        if field:
            error_data["field"] = field
        
        return Response(
            {"success": False, "error": error_data}, 
            status=status
        )


class ProcessingTimeMixin:
    """
    Mixin for tracking and reporting AI processing duration.
    
    This mixin automatically measures the time taken for AI operations
    and includes it in response metadata. Useful for monitoring
    performance and identifying slow operations.
    
    Usage:
        class MyAIView(ProcessingTimeMixin, AIResponseMixin, APIView):
            def post(self, request):
                self.start_timer()
                result = self.process_data(request.data)
                processing_time = self.get_processing_time()
                return self.success_response(
                    data=result,
                    meta={"processing_time_ms": processing_time}
                )
    
    Benefits:
        - Automatic performance tracking
        - Helps identify bottlenecks
        - Provides transparency to frontend
    """
    
    def start_timer(self) -> None:
        """
        Start the processing timer.
        
        Call this at the beginning of your processing logic.
        """
        self._start_time = time.time()
    
    def get_processing_time(self) -> int:
        """
        Get elapsed processing time in milliseconds.
        
        Returns:
            int: Processing time in milliseconds
        
        Raises:
            AttributeError: If start_timer() was not called first
        """
        if not hasattr(self, '_start_time'):
            raise AttributeError(
                "start_timer() must be called before get_processing_time()"
            )
        
        elapsed = time.time() - self._start_time
        return int(elapsed * 1000)  # Convert to milliseconds


__all__ = [
    'AIResponseMixin',
    'ProcessingTimeMixin',
]
