"""
Chat Bridge Custom Exceptions

This module defines exceptions specific to the chat bridge functionality,
extending the base AI service exceptions for mood-to-chat integration errors.
"""

from apps.ai_service.exceptions import GeminiServiceError


class ChatBridgeError(Exception):
    """Base exception for Chat Bridge operations."""
    pass


class MoodDataValidationError(ChatBridgeError):
    """Raised when mood entry data is invalid or incomplete."""
    
    def __init__(self, message: str = "Invalid or incomplete mood entry data"):
        self.message = message
        super().__init__(message)


class ConversationGenerationError(ChatBridgeError):
    """Raised when conversation starter generation fails."""
    
    def __init__(self, message: str = "Failed to generate conversation starter"):
        self.message = message
        super().__init__(message)


class AIServiceIntegrationError(ChatBridgeError):
    """Raised when AI service integration fails."""
    
    def __init__(self, message: str = "Failed to integrate with AI service"):
        self.message = message
        super().__init__(message)