"""
Pytest configuration for unit tests
"""
import pytest
from unittest.mock import Mock, patch
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def mock_user():
    """Create a mock user for testing"""
    user = Mock(spec=User)
    user.id = 1
    user.email = "test@example.com"
    user.username = "testuser"
    return user


@pytest.fixture
def mock_gemini_response():
    """Create a mock Gemini API response"""
    response = Mock()
    response.text = '{"result": "test"}'
    return response


@pytest.fixture
def mock_gemini_service():
    """Create a mock GeminiService"""
    with patch('apps.ai_service.services.base.GeminiService') as mock:
        yield mock
