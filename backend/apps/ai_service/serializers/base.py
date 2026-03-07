"""
Base Serializers and Reusable Validation Logic

This module provides base serializers and common validation methods
to maximize code reusability across all AI service serializers.
"""

from rest_framework import serializers


class FileUploadValidatorMixin:
    """Reusable mixin for file upload validation."""
    
    @staticmethod
    def validate_file_size(file, max_size_mb: int, field_name: str = 'file'):
        """
        Validate file size against maximum allowed size.
        
        Args:
            file: The uploaded file object
            max_size_mb: Maximum allowed size in megabytes
            field_name: Name of the field for error messages
            
        Raises:
            serializers.ValidationError: If file exceeds max size
        """
        max_size_bytes = max_size_mb * 1024 * 1024
        if file.size > max_size_bytes:
            raise serializers.ValidationError(
                f"{field_name.replace('_', ' ').title()} must be under {max_size_mb}MB"
            )
    
    @staticmethod
    def validate_file_format(file, allowed_formats: set, field_name: str = 'file'):
        """
        Validate file MIME type against allowed formats.
        
        Args:
            file: The uploaded file object
            allowed_formats: Set of allowed MIME types
            field_name: Name of the field for error messages
            
        Raises:
            serializers.ValidationError: If file format not allowed
        """
        if file.content_type not in allowed_formats:
            formats_display = ', '.join(f.split('/')[-1].upper() for f in allowed_formats)
            raise serializers.ValidationError(
                f"{field_name.replace('_', ' ').title()} must be in {formats_display} format"
            )


class TimestampedSerializer(serializers.ModelSerializer):
    """Base serializer for models with timestamp fields."""
    
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        abstract = True


class UserAssociatedSerializer(serializers.ModelSerializer):
    """Base serializer for models associated with users."""
    
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        abstract = True

