"""
Unit tests for evidence-based insights feature.

Tests the new evidence and confidence score functionality
added to weekly insights generation.
"""
import pytest
from apps.ai_service.ai_config import EvidenceItem, WeeklyInsightsResult


class TestEvidenceItem:
    """Test EvidenceItem Pydantic model."""
    
    def test_evidence_item_creation(self):
        """Test creating a valid evidence item."""
        evidence = EvidenceItem(
            source_type="mood_entry",
            date="2026-03-08",
            detail="Mood score was 2/5 with 'anxious' emotion",
            confidence=0.95
        )
        
        assert evidence.source_type == "mood_entry"
        assert evidence.date == "2026-03-08"
        assert evidence.confidence == 0.95
    
    def test_evidence_item_confidence_validation(self):
        """Test confidence score must be between 0 and 1."""
        # Valid confidence
        evidence = EvidenceItem(
            source_type="mood_entry",
            date="2026-03-08",
            detail="Test detail",
            confidence=0.5
        )
        assert evidence.confidence == 0.5
        
        # Test boundary values
        evidence_min = EvidenceItem(
            source_type="mood_entry",
            date="2026-03-08",
            detail="Test detail",
            confidence=0.0
        )
        assert evidence_min.confidence == 0.0
        
        evidence_max = EvidenceItem(
            source_type="mood_entry",
            date="2026-03-08",
            detail="Test detail",
            confidence=1.0
        )
        assert evidence_max.confidence == 1.0


class TestWeeklyInsightsResult:
    """Test WeeklyInsightsResult with evidence fields."""
    
    def test_insights_with_evidence(self):
        """Test creating insights with evidence items."""
        evidence_items = [
            EvidenceItem(
                source_type="mood_entry",
                date="2026-03-08",
                detail="Mood score was 2/5",
                confidence=0.95
            ),
            EvidenceItem(
                source_type="voice_analysis",
                date="2026-03-09",
                detail="Detected stressed emotion",
                confidence=0.89
            )
        ]
        
        insights = WeeklyInsightsResult(
            average_mood=3.2,
            mood_trend="declining",
            dominant_emotions=["anxious", "stressed"],
            energy_pattern="Low energy throughout week",
            peak_days=["Monday"],
            low_days=["Wednesday", "Friday"],
            weekly_summary="Mood has been declining",
            focus_areas=["Sleep", "Stress management"],
            achievements=["Consistent logging"],
            chart_data={"labels": [], "mood_scores": []},
            evidence=evidence_items,
            overall_confidence=0.87
        )
        
        assert len(insights.evidence) == 2
        assert insights.overall_confidence == 0.87
        assert insights.evidence[0].source_type == "mood_entry"
        assert insights.evidence[1].confidence == 0.89
    
    def test_insights_with_empty_evidence(self):
        """Test insights can have empty evidence list."""
        insights = WeeklyInsightsResult(
            average_mood=3.0,
            mood_trend="stable",
            dominant_emotions=["neutral"],
            energy_pattern="Consistent",
            peak_days=[],
            low_days=[],
            weekly_summary="Not enough data",
            focus_areas=["Log more moods"],
            achievements=["Started tracking"],
            chart_data={},
            evidence=[],
            overall_confidence=0.3
        )
        
        assert insights.evidence == []
        assert insights.overall_confidence == 0.3
    
    def test_insights_default_confidence(self):
        """Test default confidence score is 0.85."""
        insights = WeeklyInsightsResult(
            average_mood=3.5,
            mood_trend="stable",
            dominant_emotions=["calm"],
            energy_pattern="Good",
            peak_days=["Monday"],
            low_days=[],
            weekly_summary="Good week",
            focus_areas=["Maintain routine"],
            achievements=["Consistent mood"],
            chart_data={}
        )
        
        # Default confidence should be 0.85
        assert insights.overall_confidence == 0.85
        # Default evidence should be empty list
        assert insights.evidence == []


class TestEvidenceSourceTypes:
    """Test different evidence source types."""
    
    def test_all_source_types(self):
        """Test all supported evidence source types."""
        source_types = [
            "mood_entry",
            "voice_analysis",
            "chat_message",
            "space_analysis"
        ]
        
        for source_type in source_types:
            evidence = EvidenceItem(
                source_type=source_type,
                date="2026-03-08",
                detail=f"Test {source_type}",
                confidence=0.8
            )
            assert evidence.source_type == source_type


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
