"""
Voice Analysis API View

Handles voice recording uploads and returns emotional tone analysis.
Validates audio format and duration before processing.
"""

import logging
from mutagen import File as MutagenFile
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.ai_service.models import VoiceAnalysis
from apps.ai_service.serializers.voice import (
    VoiceAnalysisSerializer,
    VoiceAnalysisInputSerializer,
)
from apps.ai_service.services import VoiceAnalysisService
from apps.ai_service.mixins import AIResponseMixin, ProcessingTimeMixin
from apps.ai_service.throttles import AIRateThrottle, AIBurstThrottle
from apps.ai_service.exceptions import GeminiServiceError

logger = logging.getLogger(__name__)


class VoiceAnalysisView(ProcessingTimeMixin, AIResponseMixin, APIView):
    """
    API endpoint for voice tone analysis.
    
    Accepts audio file uploads (WAV, MP3, WebM), validates format and duration,
    analyzes emotional tone using Gemini AI, and persists results.
    
    Endpoint: POST /api/v1/ai/voice-analysis/
    
    Request:
        - audio_file: Audio file (WAV, MP3, or WebM format)
        - Max duration: 5 minutes
        - Max size: 50MB
    
    Response:
        {
            "success": true,
            "data": {
                "id": "uuid",
                "energy_level": 7,
                "detected_emotions": ["calm", "happy"],
                "fatigue_indicator": false,
                "speech_pace": "normal",
                "confidence_score": 0.85,
                "supportive_message": "Your voice sounds calm and positive...",
                "audio_duration_seconds": 45,
                "created_at": "2025-02-25T10:30:00Z"
            },
            "meta": {
                "timestamp": "2025-02-25T10:30:00Z",
                "processing_time_ms": 1200
            }
        }
    
    Error Responses:
        - 400: Invalid audio format or duration exceeded
        - 401: Authentication required
        - 429: Rate limit exceeded
        - 503: AI service unavailable
    """
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [AIRateThrottle, AIBurstThrottle]
    parser_classes = [MultiPartParser, FormParser]
    
    # Allowed audio formats
    ALLOWED_FORMATS = {'audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/webm'}
    MAX_DURATION_SECONDS = 300  # 5 minutes
    
    def validate_audio_format(self, audio_file) -> str:
        """
        Validate that the audio file is in an allowed format.
        
        Args:
            audio_file: The uploaded audio file
            
        Returns:
            str: The validated MIME type
            
        Raises:
            Returns error response if format is invalid
        """
        content_type = audio_file.content_type
        
        if content_type not in self.ALLOWED_FORMATS:
            logger.warning(
                f"Invalid audio format attempted: {content_type} "
                f"by user {self.request.user.id}"
            )
            return None, self.error_response(
                code="INVALID_AUDIO_FORMAT",
                message="Audio must be in WAV, MP3, or WebM format",
                status=400,
                field="audio_file"
            )
        
        return content_type, None
    
    def validate_audio_duration(self, audio_file) -> int:
        """
        Validate that the audio duration is under the maximum limit.
        
        Uses mutagen library to extract audio duration without
        fully loading the file into memory.
        
        Args:
            audio_file: The uploaded audio file
            
        Returns:
            int: Duration in seconds
            
        Raises:
            Returns error response if duration exceeds limit or file is corrupted
        """
        try:
            # Save to temporary location for mutagen to read
            audio_file.seek(0)
            audio = MutagenFile(audio_file, easy=True)
            
            if audio is None or not hasattr(audio.info, 'length'):
                logger.error(
                    f"Corrupted audio file from user {self.request.user.id}"
                )
                return None, self.error_response(
                    code="INVALID_AUDIO_FORMAT",
                    message="Audio file is corrupted or unreadable",
                    status=400,
                    field="audio_file"
                )
            
            duration_seconds = int(audio.info.length)
            
            if duration_seconds > self.MAX_DURATION_SECONDS:
                logger.warning(
                    f"Audio duration {duration_seconds}s exceeds limit "
                    f"for user {self.request.user.id}"
                )
                return None, self.error_response(
                    code="VALIDATION_ERROR",
                    message="Audio recording must be under 5 minutes",
                    status=400,
                    field="audio_file"
                )
            
            # Reset file pointer for later use
            audio_file.seek(0)
            return duration_seconds, None
            
        except Exception as e:
            logger.error(
                f"Error reading audio file from user {self.request.user.id}: {e}",
                exc_info=True
            )
            return None, self.error_response(
                code="INVALID_AUDIO_FORMAT",
                message="Audio file is corrupted or unreadable",
                status=400,
                field="audio_file"
            )
    
    def post(self, request):
        """
        Handle voice analysis POST request.
        
        Validates input, analyzes audio using Gemini AI, persists results,
        and returns formatted response.
        
        Args:
            request: DRF Request object with audio_file
            
        Returns:
            Response: Standardized success or error response
        """
        self.start_timer()
        
        # Validate input serializer
        input_serializer = VoiceAnalysisInputSerializer(data=request.data)
        if not input_serializer.is_valid():
            return self.error_response(
                code="VALIDATION_ERROR",
                message=str(input_serializer.errors),
                status=400
            )
        
        audio_file = input_serializer.validated_data['audio_file']
        
        # Validate audio format
        mime_type, error_response = self.validate_audio_format(audio_file)
        if error_response:
            return error_response
        
        # Validate audio duration
        duration_seconds, error_response = self.validate_audio_duration(audio_file)
        if error_response:
            return error_response
        
        try:
            # Analyze audio using Gemini service
            logger.info(
                f"Starting voice analysis for user {request.user.id}, "
                f"duration: {duration_seconds}s"
            )
            
            service = VoiceAnalysisService()
            audio_file.seek(0)
            audio_bytes = audio_file.read()
            
            analysis_result = service.analyze_audio_bytes(
                audio_bytes,
                mime_type=mime_type
            )
            
            # Persist analysis result
            voice_analysis = VoiceAnalysis.objects.create(
                user=request.user,
                audio_file=audio_file,
                audio_duration_seconds=duration_seconds,
                mime_type=mime_type,
                energy_level=analysis_result.energy_level,
                detected_emotions=analysis_result.detected_emotions,
                fatigue_indicator=analysis_result.fatigue_indicator,
                speech_pace=analysis_result.speech_pace,
                confidence_score=analysis_result.confidence_score,
                supportive_message=analysis_result.supportive_message,
                interaction_id="",  # Will be populated when we have interaction tracking
            )
            
            logger.info(
                f"Voice analysis completed successfully for user {request.user.id}, "
                f"analysis_id: {voice_analysis.id}"
            )
            
            # Serialize and return response
            output_serializer = VoiceAnalysisSerializer(voice_analysis)
            processing_time = self.get_processing_time()
            
            return self.success_response(
                data=output_serializer.data,
                meta={
                    "processing_time_ms": processing_time,
                    "analysis_id": str(voice_analysis.id)
                },
                status=201
            )
            
        except GeminiServiceError as e:
            logger.error(
                f"Gemini service error for user {request.user.id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="AI_SERVICE_UNAVAILABLE",
                message="AI analysis service is temporarily unavailable. Please try again later.",
                status=503
            )
        
        except Exception as e:
            logger.error(
                f"Unexpected error during voice analysis for user {request.user.id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="SERVER_ERROR",
                message="An unexpected error occurred. Please try again.",
                status=500
            )


__all__ = ['VoiceAnalysisView']
