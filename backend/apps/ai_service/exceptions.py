"""
AI Service Custom Exceptions

This module defines a hierarchy of custom exceptions for the AI service layer.
All exceptions inherit from GeminiServiceError and include error codes for
consistent API error responses.

Exception Hierarchy:
    GeminiServiceError (base)
    ├── GeminiTimeoutError
    ├── GeminiRateLimitError
    ├── GeminiUnavailableError
    └── ValidationError

Error Codes:
    - AI_SERVICE_ERROR: Generic AI service failure
    - AI_SERVICE_TIMEOUT: Gemini API timeout
    - AI_RATE_LIMIT_EXCEEDED: Rate limit exceeded
    - AI_SERVICE_UNAVAILABLE: Gemini API unavailable
    - VALIDATION_ERROR: Input validation failure
    - INVALID_AUDIO_FORMAT: Audio file format/corruption error
    - INVALID_IMAGE_FORMAT: Image file format/corruption error
"""

from typing import Optional


class GeminiServiceError(Exception):
    """
    Base exception for all Gemini AI service errors.
    
    Provides a consistent interface for error handling with message and
    error code attributes for API response formatting.
    
    Attributes:
        message: Human-readable error description
        code: Machine-readable error code for API responses
    
    Example:
        raise GeminiServiceError(
            message="Failed to process audio",
            code="AI_SERVICE_ERROR"
        )
    """
    
    def __init__(
        self,
        message: str,
        code: str = "AI_SERVICE_ERROR"
    ) -> None:
        self.message = message
        self.code = code
        super().__init__(message)
    
    def __str__(self) -> str:
        return f"[{self.code}] {self.message}"
    
    def to_dict(self) -> dict:
        """
        Convert exception to dictionary for API response formatting.
        
        Returns:
            Dictionary with code and message keys
        """
        return {
            "code": self.code,
            "message": self.message,
        }


class GeminiTimeoutError(GeminiServiceError):
    """
    Raised when the Gemini API request times out.
    
    This exception indicates a transient failure that may succeed on retry.
    The default message provides user-friendly guidance.
    """
    
    def __init__(
        self,
        message: str = "The AI service is taking longer than expected. Please try again.",
        code: str = "AI_SERVICE_TIMEOUT"
    ) -> None:
        super().__init__(message=message, code=code)


class GeminiRateLimitError(GeminiServiceError):
    """
    Raised when the Gemini API rate limit is exceeded.
    
    Includes retry_after attribute to inform clients when they can retry.
    
    Attributes:
        retry_after: Seconds until the rate limit resets
    """
    
    def __init__(
        self,
        message: str = "AI service is temporarily busy. Please wait a moment.",
        code: str = "AI_RATE_LIMIT_EXCEEDED",
        retry_after: int = 60
    ) -> None:
        self.retry_after = retry_after
        super().__init__(message=message, code=code)
    
    def to_dict(self) -> dict:
        """Include retry_after in the response dictionary."""
        result = super().to_dict()
        result["retry_after"] = self.retry_after
        return result


class GeminiUnavailableError(GeminiServiceError):
    """
    Raised when the Gemini API is unavailable or returns a server error.
    
    This exception indicates a service-level failure that requires
    user notification and potential retry.
    """
    
    def __init__(
        self,
        message: str = "AI service is temporarily unavailable. Please try again later.",
        code: str = "AI_SERVICE_UNAVAILABLE"
    ) -> None:
        super().__init__(message=message, code=code)


class AIValidationError(GeminiServiceError):
    """
    Raised for input validation failures in AI service requests.
    
    Extends GeminiServiceError with an optional field attribute to
    identify which input field caused the validation failure.
    
    Attributes:
        field: Optional name of the field that failed validation
    """
    
    def __init__(
        self,
        message: str,
        code: str = "VALIDATION_ERROR",
        field: Optional[str] = None
    ) -> None:
        self.field = field
        super().__init__(message=message, code=code)
    
    def to_dict(self) -> dict:
        """Include field in the response dictionary if present."""
        result = super().to_dict()
        if self.field:
            result["field"] = self.field
        return result


class InvalidAudioFormatError(AIValidationError):
    """
    Raised when an audio file is corrupted or in an unsupported format.
    
    Supported formats: WAV, MP3, WebM
    """
    
    def __init__(
        self,
        message: str = "Audio file is corrupted or in an unsupported format. Supported formats: WAV, MP3, WebM.",
        field: str = "audio_file"
    ) -> None:
        super().__init__(
            message=message,
            code="INVALID_AUDIO_FORMAT",
            field=field
        )


class InvalidImageFormatError(AIValidationError):
    """
    Raised when an image file is corrupted or in an unsupported format.
    
    Supported formats: JPEG, PNG, WebP
    """
    
    def __init__(
        self,
        message: str = "Image file is corrupted or in an unsupported format. Supported formats: JPEG, PNG, WebP.",
        field: str = "image_file"
    ) -> None:
        super().__init__(
            message=message,
            code="INVALID_IMAGE_FORMAT",
            field=field
        )


class AudioDurationExceededError(AIValidationError):
    """
    Raised when an audio recording exceeds the maximum allowed duration.
    
    Default maximum duration is 5 minutes (300 seconds).
    """
    
    def __init__(
        self,
        message: str = "Audio recording must be under 5 minutes.",
        field: str = "audio_file"
    ) -> None:
        super().__init__(
            message=message,
            code="VALIDATION_ERROR",
            field=field
        )


class ImageSizeExceededError(AIValidationError):
    """
    Raised when an image file exceeds the maximum allowed size.
    
    Default maximum size is 10MB.
    """
    
    def __init__(
        self,
        message: str = "Image must be under 10MB.",
        field: str = "image_file"
    ) -> None:
        super().__init__(
            message=message,
            code="VALIDATION_ERROR",
            field=field
        )
