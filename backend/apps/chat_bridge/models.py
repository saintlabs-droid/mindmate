"""
Chat Bridge Models

This module contains models for linking mood entries to generated conversations
and tracking the conversation generation process.
"""

from django.db import models
from django.conf import settings
import uuid


class MoodConversationLink(models.Model):
    """
    Links mood entries to generated conversations.
    
    Tracks the relationship between mood entries and the conversations
    generated from them, including generation status and metadata.
    """
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('generated', 'Generated'),
        ('failed', 'Failed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mood_entry = models.OneToOneField(
        'mood_tracking.MoodEntry',
        on_delete=models.CASCADE,
        related_name='conversation_link'
    )
    conversation = models.ForeignKey(
        'ai_service.Conversation',
        on_delete=models.CASCADE,
        related_name='mood_links'
    )
    starter_message = models.ForeignKey(
        'ai_service.ChatMessage',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='mood_starter_links'
    )
    generation_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['mood_entry']),
            models.Index(fields=['conversation']),
            models.Index(fields=['generation_status']),
        ]
        verbose_name = 'Mood Conversation Link'
        verbose_name_plural = 'Mood Conversation Links'
    
    def __str__(self):
        return f"Link: {self.mood_entry} -> {self.conversation}"