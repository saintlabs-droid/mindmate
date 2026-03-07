"""
Space Analysis Serializers

Serializers for environment/space analysis endpoints including:
- SpaceAnalysisSerializer: Output serializer for analysis results
- SpaceAnalysisInputSerializer: Input validation for image file uploads
"""

from rest_framework import serializers
from apps.ai_service.models import SpaceAnalysis
from .base import FileUploadValidatorMixin, TimestampedSerializer


class SpaceAnalysisSerializer(TimestampedSerializer):
    """
    Serializer for SpaceAnalysis model output.
    
    Returns all space analysis fields including lighting assessment,
    clutter level, calming elements, and improvement tips.
    """
    
    id = serializers.UUIDField(read_only=True)
    
    class Meta:
        model = SpaceAnalysis
        fields = [
            'id',
            'lighting_quality',
            'lighting_type',
            'clutter_level',
            'calming_elements',
            'relaxation_score',
            'environment_tips',
            'personalized_comment',
            'created_at',
        ]
        read_only_fields = fields


class SpaceAnalysisInputSerializer(serializers.Serializer, FileUploadValidatorMixin):
    """
    Input serializer for space analysis requests.
    
    Validates image file uploads with format and size constraints.
    """
    
    ALLOWED_IMAGE_FORMATS = {
        'image/jpeg',
        'image/png',
        'image/webp',
    }
    MAX_FILE_SIZE_MB = 10
    
    image_file = serializers.ImageField(required=True)
    
    def validate_image_file(self, file):
        """
        Validate image file format and size.
        
        Args:
            file: The uploaded image file
            
        Returns:
            The validated file
            
        Raises:
            serializers.ValidationError: If validation fails
        """
        # Validate format
        self.validate_file_format(
            file,
            self.ALLOWED_IMAGE_FORMATS,
            field_name='image_file'
        )
        
        # Validate size
        self.validate_file_size(
            file,
            self.MAX_FILE_SIZE_MB,
            field_name='image_file'
        )
        
        return file

