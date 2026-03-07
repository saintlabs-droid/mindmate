"""
Voice Analysis Serializers

Serializers for voice tone analysis endpoints including:
- VoiceAnalysisSerializer: Output serializer for analysis results
- VoiceAnalysisInputSerializer: Input validation for audio file uploads
"""

from rest_framework import serializers
from apps.ai_service.models import VoiceAnalysis
from .base import FileUploadValidatorMixin, TimestampedSerializer


class VoiceAnalysisSerializer(TimestampedSerializer):
    """
    Serializer for VoiceAnalysis model output.
    
    Returns all voice analysis fields including energy level,
    detected emotions, speech pace, and supportive message.
    """
    
    id = serializers.UUIDField(read_only=True)
    
    class Meta:
        model = VoiceAnalysis
        fields = [
            'id',
            'energy_level',
            'detected_emotions',
            'fatigue_indicator',
            'speech_pace',
            'confidence_score',
            'supportive_message',
            'audio_duration_seconds',
            'created_at',
        ]
        read_only_fields = fields


class VoiceAnalysisInputSerializer(serializers.Serializer, FileUploadValidatorMixin):
    """
    Input serializer for voice analysis requests.
    
    Validates audio file uploads with format and duration constraints.
    """
    
    ALLOWED_AUDIO_FORMATS = {
        'audio/wav',
        'audio/mpeg',  # MP3
        'audio/mp3',
        'audio/webm',
    }
    MAX_DURATION_SECONDS = 300  # 5 minutes
    MAX_FILE_SIZE_MB = 50  # Reasonable limit for audio files
    
    audio_file = serializers.FileField(required=True)
    
    def validate_audio_file(self, file):
        """
        Validate audio file format and size.
        
        Args:
            file: The uploaded audio file
            
        Returns:
            The validated file
            
        Raises:
            serializers.ValidationError: If validation fails
        """
        # Validate format
        self.validate_file_format(
            file,
            self.ALLOWED_AUDIO_FORMATS,
            field_name='audio_file'
        )
        
        # Validate size
        self.validate_file_size(
            file,
            self.MAX_FILE_SIZE_MB,
            field_name='audio_file'
        )
        
        return file
    
    def validate(self, attrs):
        """
        Additional validation for audio duration.
        
        Note: Duration validation happens at service layer since we need
        to process the audio file to determine its actual duration.
        """
        return attrs

