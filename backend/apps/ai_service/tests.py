"""
AI Service Tests

Comprehensive test suite for AI service models, services, and exceptions.
Tests cover model creation, validation, constraints, and relationships.
"""
from datetime import date, timedelta
from decimal import Decimal
from unittest.mock import Mock, patch, MagicMock
import uuid

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db import IntegrityError
from django.db.utils import DataError

from .models import (
    ReflectionPrompt,
    ChatMessage,
    VoiceAnalysis,
    SpaceAnalysis,
    WeeklyInsights,
    Conversation,
)
from .exceptions import (
    GeminiServiceError,
    GeminiTimeoutError,
    GeminiRateLimitError,
    GeminiUnavailableError,
    AIValidationError,
    InvalidAudioFormatError,
    InvalidImageFormatError,
    AudioDurationExceededError,
    ImageSizeExceededError,
)

User = get_user_model()


class ReflectionPromptModelTests(TestCase):
    """Tests for the ReflectionPrompt model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )

    def test_reflection_prompt_creation(self):
        """Test basic ReflectionPrompt creation."""
        prompt = ReflectionPrompt.objects.create(
            user=self.user,
            prompt_text='How did you manage stress today?'
        )
        self.assertEqual(prompt.prompt_text, 'How did you manage stress today?')
        self.assertFalse(prompt.is_answered)
        self.assertIsNotNone(prompt.id)
        self.assertIsInstance(prompt.id, uuid.UUID)

    def test_reflection_prompt_str_representation(self):
        """Test string representation of ReflectionPrompt."""
        prompt = ReflectionPrompt.objects.create(
            user=self.user,
            prompt_text='Test prompt'
        )
        self.assertIn(str(self.user), str(prompt))


class ChatMessageModelTests(TestCase):
    """Tests for the ChatMessage model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.conversation = Conversation.objects.create(
            user=self.user,
            title='Test Conversation'
        )

    def test_chat_message_creation_user_sender(self):
        """Test ChatMessage creation with user sender."""
        msg = ChatMessage.objects.create(
            user=self.user,
            sender='user',
            content='I feel stressed.'
        )
        self.assertEqual(msg.content, 'I feel stressed.')
        self.assertEqual(msg.sender, 'user')
        self.assertFalse(msg.crisis_flag)

    def test_chat_message_creation_ai_sender(self):
        """Test ChatMessage creation with AI sender and metadata."""
        msg = ChatMessage.objects.create(
            user=self.user,
            conversation=self.conversation,
            sender='ai',
            content='I understand you are feeling stressed.',
            detected_mood='stressed',
            suggested_activities=['breathing exercise', 'short walk'],
            follow_up_questions=['What triggered this feeling?'],
            crisis_flag=False,
            resource_suggestions=['meditation app'],
            interaction_id='test-interaction-123'
        )
        self.assertEqual(msg.sender, 'ai')
        self.assertEqual(msg.detected_mood, 'stressed')
        self.assertEqual(len(msg.suggested_activities), 2)
        self.assertEqual(msg.interaction_id, 'test-interaction-123')

    def test_chat_message_with_conversation(self):
        """Test ChatMessage linked to a Conversation."""
        msg = ChatMessage.objects.create(
            user=self.user,
            conversation=self.conversation,
            sender='user',
            content='Hello'
        )
        self.assertEqual(msg.conversation, self.conversation)
        self.assertIn(msg, self.conversation.messages.all())

    def test_chat_message_crisis_flag(self):
        """Test ChatMessage with crisis flag set."""
        msg = ChatMessage.objects.create(
            user=self.user,
            sender='ai',
            content='I am concerned about you.',
            crisis_flag=True,
            resource_suggestions=['Crisis hotline: 988']
        )
        self.assertTrue(msg.crisis_flag)
        self.assertIn('Crisis hotline', msg.resource_suggestions[0])

    def test_chat_message_ordering(self):
        """Test ChatMessage ordering by timestamp."""
        msg1 = ChatMessage.objects.create(
            user=self.user,
            sender='user',
            content='First message'
        )
        msg2 = ChatMessage.objects.create(
            user=self.user,
            sender='ai',
            content='Second message'
        )
        messages = list(ChatMessage.objects.filter(user=self.user))
        self.assertEqual(messages[0], msg1)
        self.assertEqual(messages[1], msg2)


class VoiceAnalysisModelTests(TestCase):
    """Tests for the VoiceAnalysis model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        # Create a simple audio file for testing
        self.audio_file = SimpleUploadedFile(
            name='test_audio.wav',
            content=b'fake audio content',
            content_type='audio/wav'
        )

    def test_voice_analysis_creation(self):
        """Test basic VoiceAnalysis creation with all required fields."""
        analysis = VoiceAnalysis.objects.create(
            user=self.user,
            audio_file=self.audio_file,
            audio_duration_seconds=120,
            mime_type='audio/wav',
            energy_level=7,
            detected_emotions=['calm', 'happy'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.85,
            supportive_message='You sound calm and positive today.',
            interaction_id='voice-123'
        )
        self.assertEqual(analysis.energy_level, 7)
        self.assertEqual(analysis.speech_pace, 'normal')
        self.assertFalse(analysis.fatigue_indicator)
        self.assertIn('calm', analysis.detected_emotions)

    def test_voice_analysis_energy_level_min_validation(self):
        """Test energy_level minimum value validation."""
        analysis = VoiceAnalysis(
            user=self.user,
            audio_file=self.audio_file,
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=0,  # Invalid: below minimum
            detected_emotions=['neutral'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.5,
            supportive_message='Test'
        )
        with self.assertRaises(ValidationError):
            analysis.full_clean()

    def test_voice_analysis_energy_level_max_validation(self):
        """Test energy_level maximum value validation."""
        analysis = VoiceAnalysis(
            user=self.user,
            audio_file=self.audio_file,
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=11,  # Invalid: above maximum
            detected_emotions=['neutral'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.5,
            supportive_message='Test'
        )
        with self.assertRaises(ValidationError):
            analysis.full_clean()

    def test_voice_analysis_confidence_score_validation(self):
        """Test confidence_score range validation."""
        # Test below minimum
        analysis = VoiceAnalysis(
            user=self.user,
            audio_file=self.audio_file,
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=5,
            detected_emotions=['neutral'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=-0.1,  # Invalid
            supportive_message='Test'
        )
        with self.assertRaises(ValidationError):
            analysis.full_clean()

    def test_voice_analysis_speech_pace_choices(self):
        """Test speech_pace valid choices."""
        for pace in ['slow', 'normal', 'fast']:
            analysis = VoiceAnalysis.objects.create(
                user=self.user,
                audio_file=SimpleUploadedFile(f'test_{pace}.wav', b'content', 'audio/wav'),
                audio_duration_seconds=60,
                mime_type='audio/wav',
                energy_level=5,
                detected_emotions=['neutral'],
                fatigue_indicator=False,
                speech_pace=pace,
                confidence_score=0.5,
                supportive_message='Test'
            )
            self.assertEqual(analysis.speech_pace, pace)

    def test_voice_analysis_user_cascade_delete(self):
        """Test that VoiceAnalysis is deleted when user is deleted."""
        analysis = VoiceAnalysis.objects.create(
            user=self.user,
            audio_file=self.audio_file,
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=5,
            detected_emotions=['neutral'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.5,
            supportive_message='Test'
        )
        analysis_id = analysis.id
        self.user.delete()
        self.assertFalse(VoiceAnalysis.objects.filter(id=analysis_id).exists())


class SpaceAnalysisModelTests(TestCase):
    """Tests for the SpaceAnalysis model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.image_file = SimpleUploadedFile(
            name='test_space.jpg',
            content=b'fake image content',
            content_type='image/jpeg'
        )

    def test_space_analysis_creation(self):
        """Test basic SpaceAnalysis creation."""
        analysis = SpaceAnalysis.objects.create(
            user=self.user,
            image_file=self.image_file,
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=['plants', 'soft colors'],
            relaxation_score=8,
            environment_tips=['Add a small lamp', 'Consider a plant'],
            personalized_comment='Your space looks very calming!',
            interaction_id='space-123'
        )
        self.assertEqual(analysis.lighting_quality, 'good')
        self.assertEqual(analysis.relaxation_score, 8)
        self.assertIn('plants', analysis.calming_elements)

    def test_space_analysis_lighting_quality_choices(self):
        """Test lighting_quality valid choices."""
        for quality in ['poor', 'moderate', 'good', 'excellent']:
            analysis = SpaceAnalysis.objects.create(
                user=self.user,
                image_file=SimpleUploadedFile(f'test_{quality}.jpg', b'content', 'image/jpeg'),
                mime_type='image/jpeg',
                lighting_quality=quality,
                lighting_type='natural',
                clutter_level='minimal',
                calming_elements=[],
                relaxation_score=5,
                environment_tips=['Tip 1', 'Tip 2'],
                personalized_comment='Test'
            )
            self.assertEqual(analysis.lighting_quality, quality)

    def test_space_analysis_lighting_type_choices(self):
        """Test lighting_type valid choices."""
        for light_type in ['natural', 'artificial', 'mixed', 'dim']:
            analysis = SpaceAnalysis.objects.create(
                user=self.user,
                image_file=SimpleUploadedFile(f'test_{light_type}.jpg', b'content', 'image/jpeg'),
                mime_type='image/jpeg',
                lighting_quality='good',
                lighting_type=light_type,
                clutter_level='minimal',
                calming_elements=[],
                relaxation_score=5,
                environment_tips=['Tip 1', 'Tip 2'],
                personalized_comment='Test'
            )
            self.assertEqual(analysis.lighting_type, light_type)

    def test_space_analysis_clutter_level_choices(self):
        """Test clutter_level valid choices."""
        for clutter in ['minimal', 'moderate', 'cluttered']:
            analysis = SpaceAnalysis.objects.create(
                user=self.user,
                image_file=SimpleUploadedFile(f'test_{clutter}.jpg', b'content', 'image/jpeg'),
                mime_type='image/jpeg',
                lighting_quality='good',
                lighting_type='natural',
                clutter_level=clutter,
                calming_elements=[],
                relaxation_score=5,
                environment_tips=['Tip 1', 'Tip 2'],
                personalized_comment='Test'
            )
            self.assertEqual(analysis.clutter_level, clutter)

    def test_space_analysis_relaxation_score_validation(self):
        """Test relaxation_score range validation."""
        analysis = SpaceAnalysis(
            user=self.user,
            image_file=self.image_file,
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=[],
            relaxation_score=15,  # Invalid: above maximum
            environment_tips=['Tip'],
            personalized_comment='Test'
        )
        with self.assertRaises(ValidationError):
            analysis.full_clean()


class WeeklyInsightsModelTests(TestCase):
    """Tests for the WeeklyInsights model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.today = date.today()
        self.week_ago = self.today - timedelta(days=7)

    def test_weekly_insights_creation(self):
        """Test basic WeeklyInsights creation."""
        insights = WeeklyInsights.objects.create(
            user=self.user,
            period_start=self.week_ago,
            period_end=self.today,
            entries_analyzed=7,
            average_mood=3.5,
            mood_trend='improving',
            dominant_emotions=['calm', 'happy', 'focused'],
            energy_pattern='Higher in mornings',
            peak_days=['Monday', 'Wednesday'],
            low_days=['Thursday'],
            weekly_summary='A good week overall.',
            focus_areas=['Sleep', 'Exercise'],
            achievements=['Logged every day'],
            chart_data={
                'labels': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                'mood_scores': [3, 4, 4, 2, 4, 5, 4],
                'energy_levels': [6, 7, 7, 4, 6, 8, 7]
            },
            interaction_id='insights-123'
        )
        self.assertEqual(insights.mood_trend, 'improving')
        self.assertEqual(insights.entries_analyzed, 7)
        self.assertIn('calm', insights.dominant_emotions)

    def test_weekly_insights_mood_trend_choices(self):
        """Test mood_trend valid choices."""
        for trend in ['improving', 'stable', 'declining']:
            insights = WeeklyInsights.objects.create(
                user=self.user,
                period_start=self.week_ago - timedelta(days=7 * (1 if trend == 'improving' else 2 if trend == 'stable' else 3)),
                period_end=self.today - timedelta(days=7 * (1 if trend == 'improving' else 2 if trend == 'stable' else 3)),
                entries_analyzed=5,
                average_mood=3.0,
                mood_trend=trend,
                dominant_emotions=['neutral'],
                energy_pattern='Stable',
                peak_days=[],
                low_days=[],
                weekly_summary='Test',
                focus_areas=['Area 1', 'Area 2'],
                achievements=['Achievement'],
                chart_data={'labels': [], 'mood_scores': [], 'energy_levels': []}
            )
            self.assertEqual(insights.mood_trend, trend)

    def test_weekly_insights_unique_constraint(self):
        """Test unique constraint on user + period_start + period_end."""
        WeeklyInsights.objects.create(
            user=self.user,
            period_start=self.week_ago,
            period_end=self.today,
            entries_analyzed=5,
            average_mood=3.0,
            mood_trend='stable',
            dominant_emotions=['neutral'],
            energy_pattern='Stable',
            peak_days=[],
            low_days=[],
            weekly_summary='Test',
            focus_areas=['Area 1', 'Area 2'],
            achievements=['Achievement'],
            chart_data={'labels': [], 'mood_scores': [], 'energy_levels': []}
        )
        # Attempt to create duplicate should fail
        with self.assertRaises(IntegrityError):
            WeeklyInsights.objects.create(
                user=self.user,
                period_start=self.week_ago,
                period_end=self.today,
                entries_analyzed=3,
                average_mood=4.0,
                mood_trend='improving',
                dominant_emotions=['happy'],
                energy_pattern='High',
                peak_days=['Friday'],
                low_days=[],
                weekly_summary='Duplicate',
                focus_areas=['Area'],
                achievements=['Test'],
                chart_data={'labels': [], 'mood_scores': [], 'energy_levels': []}
            )


class ConversationModelTests(TestCase):
    """Tests for the Conversation model."""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )

    def test_conversation_creation(self):
        """Test basic Conversation creation."""
        conversation = Conversation.objects.create(
            user=self.user,
            title='My first conversation'
        )
        self.assertEqual(conversation.title, 'My first conversation')
        self.assertTrue(conversation.is_active)
        self.assertIsNotNone(conversation.created_at)
        self.assertIsNotNone(conversation.updated_at)

    def test_conversation_default_values(self):
        """Test Conversation default values."""
        conversation = Conversation.objects.create(user=self.user)
        self.assertEqual(conversation.title, '')
        self.assertTrue(conversation.is_active)

    def test_conversation_with_messages(self):
        """Test Conversation with related messages."""
        conversation = Conversation.objects.create(
            user=self.user,
            title='Test conversation'
        )
        msg1 = ChatMessage.objects.create(
            user=self.user,
            conversation=conversation,
            sender='user',
            content='Hello'
        )
        msg2 = ChatMessage.objects.create(
            user=self.user,
            conversation=conversation,
            sender='ai',
            content='Hi there!'
        )
        self.assertEqual(conversation.messages.count(), 2)

    def test_conversation_cascade_delete(self):
        """Test that messages are deleted when conversation is deleted."""
        conversation = Conversation.objects.create(
            user=self.user,
            title='Test'
        )
        msg = ChatMessage.objects.create(
            user=self.user,
            conversation=conversation,
            sender='user',
            content='Test message'
        )
        msg_id = msg.id
        conversation.delete()
        self.assertFalse(ChatMessage.objects.filter(id=msg_id).exists())


class ExceptionTests(TestCase):
    """Tests for custom exceptions."""

    def test_gemini_service_error(self):
        """Test GeminiServiceError attributes and methods."""
        error = GeminiServiceError(message="Test error", code="TEST_CODE")
        self.assertEqual(error.message, "Test error")
        self.assertEqual(error.code, "TEST_CODE")
        self.assertEqual(str(error), "[TEST_CODE] Test error")
        self.assertEqual(error.to_dict(), {"code": "TEST_CODE", "message": "Test error"})

    def test_gemini_timeout_error(self):
        """Test GeminiTimeoutError default values."""
        error = GeminiTimeoutError()
        self.assertEqual(error.code, "AI_SERVICE_TIMEOUT")
        self.assertIn("taking longer", error.message)

    def test_gemini_rate_limit_error(self):
        """Test GeminiRateLimitError with retry_after."""
        error = GeminiRateLimitError(retry_after=120)
        self.assertEqual(error.code, "AI_RATE_LIMIT_EXCEEDED")
        self.assertEqual(error.retry_after, 120)
        result = error.to_dict()
        self.assertEqual(result["retry_after"], 120)

    def test_ai_validation_error_with_field(self):
        """Test AIValidationError with field attribute."""
        error = AIValidationError(
            message="Invalid input",
            field="audio_file"
        )
        self.assertEqual(error.field, "audio_file")
        result = error.to_dict()
        self.assertEqual(result["field"], "audio_file")

    def test_invalid_audio_format_error(self):
        """Test InvalidAudioFormatError defaults."""
        error = InvalidAudioFormatError()
        self.assertEqual(error.code, "INVALID_AUDIO_FORMAT")
        self.assertEqual(error.field, "audio_file")
        self.assertIn("WAV, MP3, WebM", error.message)

    def test_invalid_image_format_error(self):
        """Test InvalidImageFormatError defaults."""
        error = InvalidImageFormatError()
        self.assertEqual(error.code, "INVALID_IMAGE_FORMAT")
        self.assertEqual(error.field, "image_file")
        self.assertIn("JPEG, PNG, WebP", error.message)

    def test_audio_duration_exceeded_error(self):
        """Test AudioDurationExceededError defaults."""
        error = AudioDurationExceededError()
        self.assertEqual(error.code, "VALIDATION_ERROR")
        self.assertIn("5 minutes", error.message)

    def test_image_size_exceeded_error(self):
        """Test ImageSizeExceededError defaults."""
        error = ImageSizeExceededError()
        self.assertEqual(error.code, "VALIDATION_ERROR")
        self.assertIn("10MB", error.message)


class ServiceImportTests(TestCase):
    """Tests to verify service imports work correctly."""

    def test_services_import(self):
        """Test that all services can be imported (skips if google-genai not installed)."""
        try:
            from .services import (
                GeminiService,
                VoiceAnalysisService,
                SpaceAnalysisService,
                InsightsGeneratorService,
                ChatService,
            )
            self.assertIsNotNone(GeminiService)
            self.assertIsNotNone(VoiceAnalysisService)
            self.assertIsNotNone(SpaceAnalysisService)
            self.assertIsNotNone(InsightsGeneratorService)
            self.assertIsNotNone(ChatService)
        except ImportError:
            self.skipTest("google-genai package not installed")

    def test_service_prompts_exist(self):
        """Test that service prompts are defined."""
        try:
            from .services import (
                VoiceAnalysisService,
                SpaceAnalysisService,
                InsightsGeneratorService,
                ChatService,
            )
            self.assertTrue(hasattr(VoiceAnalysisService, 'ANALYSIS_PROMPT'))
            self.assertTrue(hasattr(SpaceAnalysisService, 'ANALYSIS_PROMPT'))
            self.assertTrue(hasattr(InsightsGeneratorService, 'INSIGHTS_PROMPT'))
            self.assertTrue(hasattr(ChatService, 'SYSTEM_PROMPT'))
        except ImportError:
            self.skipTest("google-genai package not installed")

    def test_service_prompt_content(self):
        """Test that prompts contain required elements."""
        try:
            from .services import VoiceAnalysisService, SpaceAnalysisService
            
            # Voice prompt should mention valid emotions
            voice_prompt = VoiceAnalysisService.ANALYSIS_PROMPT
            self.assertIn('happy', voice_prompt)
            self.assertIn('sad', voice_prompt)
            self.assertIn('anxious', voice_prompt)
            self.assertIn('energy_level', voice_prompt)
            
            # Space prompt should mention valid lighting values
            space_prompt = SpaceAnalysisService.ANALYSIS_PROMPT
            self.assertIn('poor', space_prompt)
            self.assertIn('moderate', space_prompt)
            self.assertIn('good', space_prompt)
            self.assertIn('excellent', space_prompt)
        except ImportError:
            self.skipTest("google-genai package not installed")


class ModelIndexTests(TestCase):
    """Tests to verify model indexes are properly defined."""

    def test_voice_analysis_has_indexes(self):
        """Test VoiceAnalysis model has required indexes."""
        indexes = VoiceAnalysis._meta.indexes
        self.assertTrue(len(indexes) > 0)
        # Check for user + created_at index
        index_fields = [idx.fields for idx in indexes]
        self.assertIn(['user', '-created_at'], index_fields)

    def test_space_analysis_has_indexes(self):
        """Test SpaceAnalysis model has required indexes."""
        indexes = SpaceAnalysis._meta.indexes
        self.assertTrue(len(indexes) > 0)

    def test_weekly_insights_has_indexes(self):
        """Test WeeklyInsights model has required indexes."""
        indexes = WeeklyInsights._meta.indexes
        self.assertTrue(len(indexes) >= 2)

    def test_chat_message_has_indexes(self):
        """Test ChatMessage model has required indexes."""
        indexes = ChatMessage._meta.indexes
        self.assertTrue(len(indexes) >= 2)
