"""
Chat Bridge Django App Configuration

This app creates an intelligent integration between the mood tracking system
and AI conversation service, automatically generating contextual conversation
starters for note-less mood entries.
"""

from django.apps import AppConfig


class ChatBridgeConfig(AppConfig):
    """Configuration for the Chat Bridge app."""
    
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.chat_bridge'
    verbose_name = 'Chat Bridge'
    
    def ready(self):
        """Import signal handlers when the app is ready."""
        import apps.chat_bridge.signals  # noqa: F401