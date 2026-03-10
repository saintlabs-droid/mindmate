"""
Weekly Insights Serializers

Serializers for weekly mood insights endpoints including:
- EvidenceItemSerializer: Serializer for evidence supporting AI insights
- WeeklyInsightsSerializer: Output serializer for weekly insights results
"""

from rest_framework import serializers
from apps.ai_service.models import WeeklyInsights
from .base import TimestampedSerializer


class EvidenceItemSerializer(serializers.Serializer):
    """
    Serializer for evidence items supporting AI insights.
    
    Evidence items link AI conclusions back to source data,
    providing transparency and auditability for AI-generated insights.
    """
    source_type = serializers.CharField(
        help_text="Type of source: mood_entry, voice_analysis, chat_message, space_analysis"
    )
    date = serializers.CharField(
        help_text="Date when this evidence was recorded"
    )
    detail = serializers.CharField(
        help_text="Specific detail from the source"
    )
    confidence = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text="Confidence score for this evidence item"
    )


class WeeklyInsightsSerializer(TimestampedSerializer):
    """
    Serializer for WeeklyInsights model output.
    
    Returns all weekly insights fields including mood trends,
    dominant emotions, energy patterns, actionable focus areas,
    and evidence-based transparency features.
    """
    
    id = serializers.UUIDField(read_only=True)
    period_start = serializers.DateField(read_only=True)
    period_end = serializers.DateField(read_only=True)
    entries_analyzed = serializers.IntegerField(read_only=True)
    evidence = EvidenceItemSerializer(many=True, read_only=True)
    overall_confidence = serializers.FloatField(read_only=True)
    
    class Meta:
        model = WeeklyInsights
        fields = [
            'id',
            'period_start',
            'period_end',
            'entries_analyzed',
            'average_mood',
            'mood_trend',
            'dominant_emotions',
            'energy_pattern',
            'peak_days',
            'low_days',
            'weekly_summary',
            'focus_areas',
            'achievements',
            'chart_data',
            'evidence',
            'overall_confidence',
            'created_at',
        ]
        read_only_fields = fields

