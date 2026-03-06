"""
AI Service Custom Exceptions

This module defines custom exceptions for the AI service layer to handle
different error scenarios gracefully. These exceptions provide structured
error information that can be caught and handled appropriately in API views.
"""


class GeminiServiceError(Exception):
    """
    Base exception for all Gemini service errors.
    
    This is the parent class for all AI service-related exceptions,
    providing a consistent interface with message and error code attributes.
    
    Attributes:
        message (str): Human-readable error message
        code (str): Machine-readable error code for API responses
    """
    
    def __init__(self, message: str, code: str = "AI_SERVICE_ERROR"):
        """
        Initialize the GeminiServiceError.
        
        Args:
            message: Human-readable error message
            code: Machine-readable error code (default: "AI_SERVICE_ERROR")
        """
        self.message = message
        self.code = code
        super().__init__(message)


class GeminiTimeoutError(GeminiServiceError):
    """
    Exception raised when Gemini API times out.
    
    This exception is raised when the Gemini API takes longer than expected
    to respond, indicating a timeout condition. It provides a user-friendly
    message suggesting retry.
    """
    
    def __init__(self):
        """Initialize the GeminiTimeoutError with a predefined message."""
        super().__init__(
            message="The AI service is taking longer than expected. Please try again.",
            code="AI_SERVICE_TIMEOUT"
        )


class GeminiRateLimitError(GeminiServiceError):
    """
    Exception raised when Gemini API rate limit is exceeded.
    
    This exception is raised when too many requests have been made to the
    Gemini API within a given time period. It includes a retry_after
    attribute to indicate when the client can retry.
    
    Attributes:
        retry_after (int): Number of seconds to wait before retrying
    """
    
    def __init__(self, retry_after: int = 60):
        """
        Initialize the GeminiRateLimitError.
        
        Args:
            retry_after: Number of seconds to wait before retrying (default: 60)
        """
        self.retry_after = retry_after
        super().__init__(
            message="AI service is temporarily busy. Please wait a moment.",
            code="AI_RATE_LIMIT_EXCEEDED"
        )


class ValidationError(Exception):
    """
    Exception raised for input validation failures.
    
    This exception is used when user input fails validation checks,
    such as invalid file formats, size limits, or missing required fields.
    
    Attributes:
        message (str): Human-readable error message
        field (str): Optional field name that failed validation
    """
    
    def __init__(self, message: str, field: str = None):
        """
        Initialize the ValidationError.
        
        Args:
            message: Human-readable error message
            field: Optional field name that failed validation
        """
        self.message = message
        self.field = field
        super().__init__(message)
