"""
Unit tests for AI Service models.

Tests model creation, validation, relationships, and cascade deletion
for VoiceAnalysis, SpaceAnalysis, and WeeklyInsights models.
"""

import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from datetime import date, timedelta
from apps.ai_service.models import VoiceAnalysis, SpaceAnalysis, WeeklyInsights

User = get_user_model()


@pytest.mark.django_db
class TestVoiceAnalysisModel:
    """Tests for VoiceAnalysis model."""
    
    def test_create_voice_analysis(self, mock_user):
        """Test creating a VoiceAnalysis instance with valid data."""
        voice_analysis = VoiceAnalysis.objects.create(
            user=mock_user,
            audio_file='voice_analyses/2025/03/test.wav',
            audio_duration_seconds=120,
            mime_type='audio/wav',
            energy_level=7,
            detected_emotions=['happy', 'energetic'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.85,
            supportive_message='You sound energetic today!',
            interaction_id='test-interaction-123'
        )
        
        assert voice_analysis.id is not None
        assert voice_analysis.user == mock_user
        assert voice_analysis.energy_level == 7
        assert voice_analysis.detected_emotions == ['happy', 'energetic']
        assert voice_analysis.fatigue_indicator is False
        assert voice_analysis.speech_pace == 'normal'
        assert voice_analysis.confidence_score == 0.85
        assert voice_analysis.created_at is not None
    
    def test_voice_analysis_energy_level_validation(self, mock_user):
        """Test energy_level must be between 1 and 10."""
        # Test invalid energy level (too high)
        voice_analysis = VoiceAnalysis(
            user=mock_user,
            audio_file='test.wav',
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=11,
            detected_emotions=['happy'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.8,
            supportive_message='Test'
        )
        
        with pytest.raises(ValidationError):
            voice_analysis.full_clean()
    
    def test_voice_analysis_confidence_score_validation(self, mock_user):
        """Test confidence_score must be between 0 and 1."""
        voice_analysis = VoiceAnalysis(
            user=mock_user,
            audio_file='test.wav',
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=5,
            detected_emotions=['calm'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=1.5,
            supportive_message='Test'
        )
        
        with pytest.raises(ValidationError):
            voice_analysis.full_clean()
    
    def test_voice_analysis_cascade_deletion(self, mock_user):
        """Test VoiceAnalysis is deleted when user is deleted."""
        voice_analysis = VoiceAnalysis.objects.create(
            user=mock_user,
            audio_file='test.wav',
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=5,
            detected_emotions=['calm'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.8,
            supportive_message='Test'
        )
        
        voice_analysis_id = voice_analysis.id
        mock_user.delete()
        
        assert not VoiceAnalysis.objects.filter(id=voice_analysis_id).exists()
    
    def test_voice_analysis_ordering(self, mock_user):
        """Test VoiceAnalysis instances are ordered by created_at descending."""
        va1 = VoiceAnalysis.objects.create(
            user=mock_user,
            audio_file='test1.wav',
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=5,
            detected_emotions=['calm'],
            fatigue_indicator=False,
            speech_pace='normal',
            confidence_score=0.8,
            supportive_message='First'
        )
        
        va2 = VoiceAnalysis.objects.create(
            user=mock_user,
            audio_file='test2.wav',
            audio_duration_seconds=60,
            mime_type='audio/wav',
            energy_level=7,
            detected_emotions=['happy'],
            fatigue_indicator=False,
            speech_pace='fast',
            confidence_score=0.9,
            supportive_message='Second'
        )
        
        analyses = list(VoiceAnalysis.objects.all())
        assert analyses[0].id == va2.id
        assert analyses[1].id == va1.id


@pytest.mark.django_db
class TestSpaceAnalysisModel:
    """Tests for SpaceAnalysis model."""
    
    def test_create_space_analysis(self, mock_user):
        """Test creating a SpaceAnalysis instance with valid data."""
        space_analysis = SpaceAnalysis.objects.create(
            user=mock_user,
            image_file='space_analyses/2025/03/test.jpg',
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=['plants', 'soft colors'],
            relaxation_score=8,
            environment_tips=['Add more plants', 'Consider softer lighting'],
            personalized_comment='Your space looks very calming!',
            interaction_id='test-interaction-456'
        )
        
        assert space_analysis.id is not None
        assert space_analysis.user == mock_user
        assert space_analysis.lighting_quality == 'good'
        assert space_analysis.lighting_type == 'natural'
        assert space_analysis.clutter_level == 'minimal'
        assert space_analysis.calming_elements == ['plants', 'soft colors']
        assert space_analysis.relaxation_score == 8
        assert space_analysis.created_at is not None
    
    def test_space_analysis_relaxation_score_validation(self, mock_user):
        """Test relaxation_score must be between 1 and 10."""
        space_analysis = SpaceAnalysis(
            user=mock_user,
            image_file='test.jpg',
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=['plants'],
            relaxation_score=15,
            environment_tips=['Test'],
            personalized_comment='Test'
        )
        
        with pytest.raises(ValidationError):
            space_analysis.full_clean()
    
    def test_space_analysis_cascade_deletion(self, mock_user):
        """Test SpaceAnalysis is deleted when user is deleted."""
        space_analysis = SpaceAnalysis.objects.create(
            user=mock_user,
            image_file='test.jpg',
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=['plants'],
            relaxation_score=8,
            environment_tips=['Test'],
            personalized_comment='Test'
        )
        
        space_analysis_id = space_analysis.id
        mock_user.delete()
        
        assert not SpaceAnalysis.objects.filter(id=space_analysis_id).exists()
    
    def test_space_analysis_ordering(self, mock_user):
        """Test SpaceAnalysis instances are ordered by created_at descending."""
        sa1 = SpaceAnalysis.objects.create(
            user=mock_user,
            image_file='test1.jpg',
            mime_type='image/jpeg',
            lighting_quality='good',
            lighting_type='natural',
            clutter_level='minimal',
            calming_elements=['plants'],
            relaxation_score=7,
            environment_tips=['Test'],
            personalized_comment='First'
        )
        
        sa2 = SpaceAnalysis.objects.create(
            user=mock_user,
            image_file='test2.jpg',
            mime_type='image/jpeg',
            lighting_quality='excellent',
            lighting_type='mixed',
            clutter_level='minimal',
            calming_elements=['plants', 'artwork'],
            relaxation_score=9,
            environment_tips=['Test'],
            personalized_comment='Second'
        )
        
        analyses = list(SpaceAnalysis.objects.all())
        assert analyses[0].id == sa2.id
        assert analyses[1].id == sa1.id


@pytest.mark.django_db
class TestWeeklyInsightsModel:
    """Tests for WeeklyInsights model."""
    
    def test_create_weekly_insights(self, mock_user):
        """Test creating a WeeklyInsights instance with valid data."""
        today = date.today()
        week_start = today - timedelta(days=7)
        
        insights = WeeklyInsights.objects.create(
            user=mock_user,
            period_start=week_start,
            period_end=today,
            entries_analyzed=7,
            average_mood=7.5,
            mood_trend='improving',
            dominant_emotions=['happy', 'calm', 'energetic'],
            energy_pattern='Energy levels were highest in the mornings',
            peak_days=['Monday', 'Wednesday'],
            low_days=['Friday'],
            weekly_summary='Great week overall with positive trends',
            focus_areas=['Maintain morning routine', 'Address Friday stress'],
            achievements=['Consistent mood tracking', 'Improved sleep'],
            chart_data={'labels': ['Mon', 'Tue'], 'values': [7, 8]},
            interaction_id='test-interaction-789'
        )
        
        assert insights.id is not None
        assert insights.user == mock_user
        assert insights.period_start == week_start
        assert insights.period_end == today
        assert insights.entries_analyzed == 7
        assert insights.average_mood == 7.5
        assert insights.mood_trend == 'improving'
        assert len(insights.dominant_emotions) == 3
        assert insights.created_at is not None
    
    def test_weekly_insights_unique_constraint(self, mock_user):
        """Test unique constraint for user + period_start + period_end."""
        today = date.today()
        week_start = today - timedelta(days=7)
        
        WeeklyInsights.objects.create(
            user=mock_user,
            period_start=week_start,
            period_end=today,
            entries_analyzed=5,
            average_mood=7.0,
            mood_trend='stable',
            dominant_emotions=['calm'],
            energy_pattern='Stable',
            peak_days=['Monday'],
            low_days=['Friday'],
            weekly_summary='Test',
            focus_areas=['Test'],
            achievements=['Test'],
            chart_data={}
        )
        
        # Attempt to create duplicate
        with pytest.raises(IntegrityError):
            WeeklyInsights.objects.create(
                user=mock_user,
                period_start=week_start,
                period_end=today,
                entries_analyzed=6,
                average_mood=7.5,
                mood_trend='improving',
                dominant_emotions=['happy'],
                energy_pattern='Improving',
                peak_days=['Tuesday'],
                low_days=['Thursday'],
                weekly_summary='Duplicate',
                focus_areas=['Test'],
                achievements=['Test'],
                chart_data={}
            )
    
    def test_weekly_insights_cascade_deletion(self, mock_user):
        """Test WeeklyInsights is deleted when user is deleted."""
        today = date.today()
        week_start = today - timedelta(days=7)
        
        insights = WeeklyInsights.objects.create(
            user=mock_user,
            period_start=week_start,
            period_end=today,
            entries_analyzed=5,
            average_mood=7.0,
            mood_trend='stable',
            dominant_emotions=['calm'],
            energy_pattern='Stable',
            peak_days=['Monday'],
            low_days=['Friday'],
            weekly_summary='Test',
            focus_areas=['Test'],
            achievements=['Test'],
            chart_data={}
        )
        
        insights_id = insights.id
        mock_user.delete()
        
        assert not WeeklyInsights.objects.filter(id=insights_id).exists()
    
    def test_weekly_insights_ordering(self, mock_user):
        """Test WeeklyInsights instances are ordered by created_at descending."""
        today = date.today()
        
        wi1 = WeeklyInsights.objects.create(
            user=mock_user,
            period_start=today - timedelta(days=14),
            period_end=today - timedelta(days=7),
            entries_analyzed=5,
            average_mood=6.5,
            mood_trend='stable',
            dominant_emotions=['calm'],
            energy_pattern='Stable',
            peak_days=['Monday'],
            low_days=['Friday'],
            weekly_summary='First week',
            focus_areas=['Test'],
            achievements=['Test'],
            chart_data={}
        )
        
        wi2 = WeeklyInsights.objects.create(
            user=mock_user,
            period_start=today - timedelta(days=7),
            period_end=today,
            entries_analyzed=7,
            average_mood=7.5,
            mood_trend='improving',
            dominant_emotions=['happy'],
            energy_pattern='Improving',
            peak_days=['Tuesday'],
            low_days=['Thursday'],
            weekly_summary='Second week',
            focus_areas=['Test'],
            achievements=['Test'],
            chart_data={}
        )
        
        insights = list(WeeklyInsights.objects.all())
        assert insights[0].id == wi2.id
        assert insights[1].id == wi1.id
