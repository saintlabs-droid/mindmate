"""
Space Analysis API View

Handles environment/space photo uploads and returns wellness analysis.
Validates image format and size before processing.
"""

import logging
from PIL import Image
from io import BytesIO
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.ai_service.models import SpaceAnalysis
from apps.ai_service.serializers.space import (
    SpaceAnalysisSerializer,
    SpaceAnalysisInputSerializer,
)
from apps.ai_service.services import SpaceAnalysisService
from apps.ai_service.mixins import AIResponseMixin, ProcessingTimeMixin
from apps.ai_service.throttles import AIRateThrottle, AIBurstThrottle
from apps.ai_service.exceptions import GeminiServiceError

logger = logging.getLogger(__name__)


class SpaceAnalysisView(ProcessingTimeMixin, AIResponseMixin, APIView):
    """
    API endpoint for environment/space wellness analysis.
    
    Accepts image uploads (JPEG, PNG, WebP), validates format and size,
    analyzes relaxation potential using Gemini AI, and persists results.
    
    Endpoint: POST /api/v1/ai/space-analysis/
    
    Request:
        - image_file: Image file (JPEG, PNG, or WebP format)
        - Max size: 10MB
    
    Response:
        {
            "success": true,
            "data": {
                "id": "uuid",
                "lighting_quality": "good",
                "lighting_type": "natural",
                "clutter_level": "minimal",
                "calming_elements": ["plants", "soft colors"],
                "relaxation_score": 8,
                "environment_tips": ["Add more natural light", "..."],
                "personalized_comment": "Your space has great natural lighting...",
                "created_at": "2025-02-25T10:30:00Z"
            },
            "meta": {
                "timestamp": "2025-02-25T10:30:00Z",
                "processing_time_ms": 1500
            }
        }
    
    Error Responses:
        - 400: Invalid image format or size exceeded
        - 401: Authentication required
        - 429: Rate limit exceeded
        - 503: AI service unavailable
    """
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [AIRateThrottle, AIBurstThrottle]
    parser_classes = [MultiPartParser, FormParser]
    
    # Allowed image formats
    ALLOWED_FORMATS = {'image/jpeg', 'image/png', 'image/webp'}
    MAX_SIZE_MB = 10
    MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024  # 10MB in bytes
    
    def validate_image_format(self, image_file) -> str:
        """
        Validate that the image file is in an allowed format.
        
        Uses both content_type and PIL to verify the image is valid.
        
        Args:
            image_file: The uploaded image file
            
        Returns:
            str: The validated MIME type
            
        Raises:
            Returns error response if format is invalid
        """
        content_type = image_file.content_type
        
        # Check content type
        if content_type not in self.ALLOWED_FORMATS:
            logger.warning(
                f"Invalid image format attempted: {content_type} "
                f"by user {self.request.user.id}"
            )
            return None, self.error_response(
                code="INVALID_IMAGE_FORMAT",
                message="Image must be in JPEG, PNG, or WebP format",
                status=400,
                field="image_file"
            )
        
        # Verify image is actually valid using PIL
        try:
            image_file.seek(0)
            img = Image.open(image_file)
            img.verify()  # Verify it's a valid image
            image_file.seek(0)  # Reset for later use
            
        except Exception as e:
            logger.error(
                f"Corrupted image file from user {self.request.user.id}: {e}"
            )
            return None, self.error_response(
                code="INVALID_IMAGE_FORMAT",
                message="Image file is corrupted or unreadable",
                status=400,
                field="image_file"
            )
        
        return content_type, None
    
    def validate_image_size(self, image_file) -> bool:
        """
        Validate that the image size is under the maximum limit.
        
        Args:
            image_file: The uploaded image file
            
        Returns:
            bool: True if valid
            
        Raises:
            Returns error response if size exceeds limit
        """
        # Get file size
        image_file.seek(0, 2)  # Seek to end
        file_size = image_file.tell()
        image_file.seek(0)  # Reset to beginning
        
        if file_size > self.MAX_SIZE_BYTES:
            size_mb = file_size / (1024 * 1024)
            logger.warning(
                f"Image size {size_mb:.2f}MB exceeds limit "
                f"for user {self.request.user.id}"
            )
            return False, self.error_response(
                code="VALIDATION_ERROR",
                message=f"Image must be under {self.MAX_SIZE_MB}MB",
                status=400,
                field="image_file"
            )
        
        return True, None
    
    def check_indoor_environment(self, analysis_result) -> tuple:
        """
        Check if the analyzed space appears to be an indoor environment.
        
        This is a heuristic check based on the analysis results.
        If the AI detects very poor lighting and no calming elements,
        it might not be an indoor space optimized for relaxation.
        
        Args:
            analysis_result: The SpaceAnalysisResult from Gemini
            
        Returns:
            tuple: (is_indoor: bool, modified_result or None)
        """
        # Heuristic: If lighting is poor and no calming elements detected,
        # might not be an indoor relaxation space
        if (analysis_result.lighting_quality == 'poor' and 
            len(analysis_result.calming_elements) == 0):
            
            logger.info(
                f"Possible non-indoor environment detected for user {self.request.user.id}"
            )
            
            # Add a note to the personalized comment
            modified_comment = (
                "Note: This analysis is optimized for indoor relaxation spaces. "
                "If this is an outdoor area, the recommendations may not fully apply. "
                f"{analysis_result.personalized_comment}"
            )
            
            # Create modified result with updated comment
            from dataclasses import replace
            modified_result = replace(
                analysis_result,
                personalized_comment=modified_comment
            )
            
            return False, modified_result
        
        return True, None
    
    def post(self, request):
        """
        Handle space analysis POST request.
        
        Validates input, analyzes image using Gemini AI, persists results,
        and returns formatted response.
        
        Args:
            request: DRF Request object with image_file
            
        Returns:
            Response: Standardized success or error response
        """
        self.start_timer()
        
        # Validate input serializer
        input_serializer = SpaceAnalysisInputSerializer(data=request.data)
        if not input_serializer.is_valid():
            return self.error_response(
                code="VALIDATION_ERROR",
                message=str(input_serializer.errors),
                status=400
            )
        
        image_file = input_serializer.validated_data['image_file']
        
        # Validate image format
        mime_type, error_response = self.validate_image_format(image_file)
        if error_response:
            return error_response
        
        # Validate image size
        is_valid_size, error_response = self.validate_image_size(image_file)
        if error_response:
            return error_response
        
        try:
            # Analyze image using Gemini service
            logger.info(
                f"Starting space analysis for user {request.user.id}"
            )
            
            service = SpaceAnalysisService()
            image_file.seek(0)
            image_bytes = image_file.read()
            
            analysis_result = service.analyze_image_bytes(
                image_bytes,
                mime_type=mime_type
            )
            
            # Check if it's an indoor environment
            is_indoor, modified_result = self.check_indoor_environment(analysis_result)
            if modified_result:
                analysis_result = modified_result
            
            # Persist analysis result
            space_analysis = SpaceAnalysis.objects.create(
                user=request.user,
                image_file=image_file,
                mime_type=mime_type,
                lighting_quality=analysis_result.lighting_quality,
                lighting_type=analysis_result.lighting_type,
                clutter_level=analysis_result.clutter_level,
                calming_elements=analysis_result.calming_elements,
                relaxation_score=analysis_result.relaxation_score,
                environment_tips=analysis_result.environment_tips,
                personalized_comment=analysis_result.personalized_comment,
                interaction_id="",  # Will be populated when we have interaction tracking
            )
            
            logger.info(
                f"Space analysis completed successfully for user {request.user.id}, "
                f"analysis_id: {space_analysis.id}, "
                f"relaxation_score: {analysis_result.relaxation_score}"
            )
            
            # Serialize and return response
            output_serializer = SpaceAnalysisSerializer(space_analysis)
            processing_time = self.get_processing_time()
            
            return self.success_response(
                data=output_serializer.data,
                meta={
                    "processing_time_ms": processing_time,
                    "analysis_id": str(space_analysis.id),
                    "is_indoor_optimized": is_indoor
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
                f"Unexpected error during space analysis for user {request.user.id}: {e}",
                exc_info=True
            )
            return self.error_response(
                code="SERVER_ERROR",
                message="An unexpected error occurred. Please try again.",
                status=500
            )


__all__ = ['SpaceAnalysisView']
