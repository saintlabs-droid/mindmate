"""
Chat Bridge URL Configuration

URL patterns for chat bridge monitoring and health check endpoints.
"""

from django.urls import path
from .monitoring import health_check_view

app_name = 'chat_bridge'

urlpatterns = [
    path('health/', health_check_view, name='health_check'),
]