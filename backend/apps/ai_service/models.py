"""
AI Service Models

This module contains Django models for AI-powered features including:
- Voice tone analysis
- Space/environment analysis
- Weekly insights generation
- Stateful AI chatbot conversations
"""

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.mood_tracking.models import MoodEntry
import uuid


class ReflectionPrompt(models.Model):
    """Model for AI-generated reflection prompts based on mood entries."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='prompts'
    )
    mood_entry = models.ForeignKey(
        MoodEntry,
        on_delete=models.CASCADE,
        related_name='prompts',
        null=True
    )
    prompt_text = models.TextField()
    is_answered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Prompt for {self.user} at {self.created_at}"


class VoiceAnalysis(models.Model):
    """
    Model for storing voice tone analysis results.
    
    Stores audio recordings and their AI-analyzed emotional characteristics
    including energy level, detected emotions, fatigue indicators, and
    supportive feedback messages.
    """
    
    SPEECH_PACE_CHOICES = [
        ('slow', 'Slow'),
        ('normal', 'Normal'),
        ('fast', 'Fast'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='voice_analyses'
    )
    
    # Audio file reference
    audio_file = models.FileField(upload_to='voice_analyses/%Y/%m/')
    audio_duration_seconds = models.PositiveIntegerField()
    mime_type = models.CharField(max_length=50)

    # Analysis results
    energy_level = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    detected_emotions = models.JSONField(
        help_text="List of detected emotions (happy, sad, anxious, calm, stressed, energetic, fatigued, neutral)"
    )
    fatigue_indicator = models.BooleanField()
    speech_pace = models.CharField(max_length=10, choices=SPEECH_PACE_CHOICES)
    confidence_score = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(1)]
    )
    supportive_message = models.TextField()
    
    # Gemini interaction tracking
    interaction_id = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
        ]
        verbose_name = 'Voice Analysis'
        verbose_name_plural = 'Voice Analyses'

    def __str__(self):
        return f"Voice Analysis for {self.user} at {self.created_at}"


class SpaceAnalysis(models.Model):
    """
    Model for storing environment/space analysis results.
    
    Stores images of user environments and their AI-analyzed characteristics
    including lighting quality, clutter level, calming elements, and
    personalized improvement tips.
    """
    
    LIGHTING_QUALITY_CHOICES = [
        ('poor', 'Poor'),
        ('moderate', 'Moderate'),
        ('good', 'Good'),
        ('excellent', 'Excellent'),
    ]
    
    LIGHTING_TYPE_CHOICES = [
        ('natural', 'Natural'),
        ('artificial', 'Artificial'),
        ('mixed', 'Mixed'),
        ('dim', 'Dim'),
    ]
    
    CLUTTER_LEVEL_CHOICES = [
        ('minimal', 'Minimal'),
        ('moderate', 'Moderate'),
        ('cluttered', 'Cluttered'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='space_analyses'
    )
    
    # Image file reference
    image_file = models.ImageField(upload_to='space_analyses/%Y/%m/')
    mime_type = models.CharField(max_length=50)
    
    # Analysis results
    lighting_quality = models.CharField(max_length=20, choices=LIGHTING_QUALITY_CHOICES)
    lighting_type = models.CharField(max_length=20, choices=LIGHTING_TYPE_CHOICES)
    clutter_level = models.CharField(max_length=20, choices=CLUTTER_LEVEL_CHOICES)
    calming_elements = models.JSONField(
        help_text="List of calming elements (plants, soft colors, natural materials, artwork)"
    )
    relaxation_score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    environment_tips = models.JSONField(
        help_text="List of actionable environment improvement tips"
    )
    personalized_comment = models.TextField()
    
    # Gemini interaction tracking
    interaction_id = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
        ]
        verbose_name = 'Space Analysis'
        verbose_name_plural = 'Space Analyses'

    def __str__(self):
        return f"Space Analysis for {self.user} at {self.created_at}"


class WeeklyInsights(models.Model):
    """
    Model for storing AI-generated weekly mood insights.
    
    Aggregates mood data over a 7-day period and stores AI-analyzed
    patterns, trends, achievements, and focus areas for improvement.
    """
    
    MOOD_TREND_CHOICES = [
        ('improving', 'Improving'),
        ('stable', 'Stable'),
        ('declining', 'Declining'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='weekly_insights'
    )
    
    # Period covered
    period_start = models.DateField()
    period_end = models.DateField()
    entries_analyzed = models.PositiveIntegerField()

    # Analysis fields
    average_mood = models.FloatField()
    mood_trend = models.CharField(max_length=20, choices=MOOD_TREND_CHOICES)
    dominant_emotions = models.JSONField(
        help_text="List of top 3 dominant emotions for the week"
    )
    energy_pattern = models.TextField(
        help_text="Natural language description of energy patterns"
    )
    peak_days = models.JSONField(
        help_text="List of day names when mood scores were highest"
    )
    low_days = models.JSONField(
        help_text="List of day names requiring attention"
    )
    
    # Summary fields
    weekly_summary = models.TextField(
        help_text="Natural language weekly summary"
    )
    focus_areas = models.JSONField(
        help_text="List of focus areas for improvement"
    )
    achievements = models.JSONField(
        help_text="List of positive achievements from the week"
    )
    chart_data = models.JSONField(
        help_text="Formatted data for frontend chart components"
    )
    
    # Gemini interaction tracking
    interaction_id = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['user', 'period_start', 'period_end']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'period_start', 'period_end'],
                name='unique_user_weekly_period'
            )
        ]
        verbose_name = 'Weekly Insights'
        verbose_name_plural = 'Weekly Insights'

    def __str__(self):
        return f"Weekly Insights for {self.user} ({self.period_start} to {self.period_end})"


class Conversation(models.Model):
    """
    Model for grouping chat messages into conversations.
    
    Enables context management for stateful AI chatbot interactions
    by grouping related messages together.
    """
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='conversations'
    )
    
    # Conversation metadata
    title = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"Conversation {self.id} for {self.user}"


class ChatMessage(models.Model):
    """
    Model for storing chat messages with AI response metadata.
    
    Stores both user and AI messages with additional metadata for AI
    responses including detected mood, suggested activities, crisis
    indicators, and resource suggestions.
    """
    
    SENDER_CHOICES = [
        ('user', 'User'),
        ('ai', 'AI'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='chat_messages'
    )
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages',
        null=True,
        blank=True
    )
    
    # Message content
    sender = models.CharField(max_length=4, choices=SENDER_CHOICES)
    content = models.TextField()
    sentiment_score = models.FloatField(null=True, blank=True)
    
    # AI response metadata (null for user messages)
    detected_mood = models.CharField(max_length=50, blank=True)
    suggested_activities = models.JSONField(
        null=True,
        blank=True,
        help_text="List of suggested activities based on detected mood"
    )
    follow_up_questions = models.JSONField(
        null=True,
        blank=True,
        help_text="List of follow-up questions to encourage engagement"
    )
    crisis_flag = models.BooleanField(default=False)
    resource_suggestions = models.JSONField(
        null=True,
        blank=True,
        help_text="List of resource suggestions relevant to conversation"
    )
    
    # Gemini interaction tracking (for AI messages)
    interaction_id = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['conversation', 'timestamp']),
            models.Index(fields=['user', '-timestamp']),
        ]

    def __str__(self):
        return f"{self.sender} message in conversation {self.conversation_id} at {self.timestamp}"
