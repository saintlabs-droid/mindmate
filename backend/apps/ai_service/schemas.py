"""
AI Service Pydantic Response Schemas

This module defines Pydantic models for structured JSON responses from the
Gemini AI API. These schemas ensure type safety and validation for all AI
analysis results.

Note:
    Base schemas (VoiceAnalysisResult, SpaceAnalysisResult, etc.) are defined
    in ai_config.py. This module will contain additional response schemas
    and API-specific data structures as the feature evolves.

Schemas:
    - API response wrappers
    - Extended result schemas with metadata
    - Chart data structures for frontend consumption

Usage:
    from mindmate.backend.apps.ai_service.schemas import (
        # Import schemas as they are added
    )

See Also:
    - ai_config.py: Core Pydantic schemas for Gemini responses
    - serializers/: DRF serializers for API request/response handling
"""

# Additional Pydantic schemas will be added here as needed
# The core schemas (VoiceAnalysisResult, SpaceAnalysisResult, etc.)
# are already defined in ai_config.py

__all__ = [
    # Schema exports will be added as schemas are implemented
]
