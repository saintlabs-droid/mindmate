"""
Weekly Insights Serializers

Serializers for weekly mood insights endpoints including:
- WeeklyInsightsSerializer: Output serializer for weekly insights results
"""

from rest_framework import serializers
from apps.ai_service.models import WeeklyInsights
from .base import TimestampedSerializer


class WeeklyInsightsSerializer(TimestampedSerializer):
    """
    Serializer for WeeklyInsights model output.
    
    Returns all weekly insights fields including mood trends,
    dominant emotions, energy patterns, and actionable focus areas.
    """
    
    id = serializers.UUIDField(read_only=True)
    period_start = serializers.DateField(read_only=True)
    period_end = serializers.DateField(read_only=True)
    entries_analyzed = serializers.IntegerField(read_only=True)
    
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
            'created_at',
        ]
        read_only_fields = fields

