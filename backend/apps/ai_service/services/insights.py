"""
Insights Generator Service for MindMate

Generates weekly mood insights from aggregated mood data using Gemini AI.
"""
import logging
from typing import Optional

from apps.ai_service.ai_config import WeeklyInsightsResult
from .base import GeminiService

logger = logging.getLogger(__name__)


class InsightsGeneratorService(GeminiService):
    """Service for generating weekly mood insights from aggregated data."""
    
    INSIGHTS_PROMPT = """
[Persona] You are a compassionate mental wellness analyst helping users understand their emotional patterns.

[Action] Analyze the provided mood data and generate comprehensive weekly insights.

[Context] The user has logged mood entries over the past week.

[Format] Return a JSON object with exactly these fields:
{
    "average_mood": <float 1.0-5.0>,
    "mood_trend": "<string: exactly 'improving', 'stable', or 'declining'>",
    "dominant_emotions": [<list of top 3 emotions>],
    "energy_pattern": "<string: natural language description>",
    "peak_days": [<list of day names>],
    "low_days": [<list of day names>],
    "weekly_summary": "<string: 2-4 sentence summary>",
    "focus_areas": [<list of 2-3 improvement areas>],
    "achievements": [<list of 2-3 positive observations>],
    "chart_data": {"labels": [], "mood_scores": [], "energy_levels": []}
}

[Constraints]
- average_mood: Float from 1.0 to 5.0
- mood_trend: MUST be exactly one of: "improving", "stable", "declining"
- dominant_emotions: Array of exactly 3 most frequent emotions
- energy_pattern: 1-2 sentences describing when energy is highest/lowest
- peak_days: Array of day names with highest mood
- low_days: Array of day names requiring attention (can be empty)
- weekly_summary: Warm, encouraging 2-4 sentence overview
- focus_areas: Array of 2-3 specific, actionable improvement suggestions
- achievements: Array of 2-3 positive observations from the week
- chart_data: Object with labels, mood_scores, and energy_levels arrays

[Special Case] If fewer than 3 entries provided, return partial analysis with encouragement.
"""

    def _prepare_mood_data(self, mood_entries: list) -> str:
        """
        Format mood entries into a structured string for the prompt.
        
        Args:
            mood_entries: List of mood entry dictionaries with date, mood_score, 
                         energy_level, emotions, and notes
        
        Returns:
            Formatted string ready for inclusion in the Gemini prompt
        """
        if not mood_entries:
            return "No mood entries provided."
        
        formatted_entries = []
        for entry in mood_entries:
            entry_str = (
                f"Date: {entry.get('date', 'Unknown')}\n"
                f"  Mood Score: {entry.get('mood_score', 'N/A')}/5\n"
                f"  Energy Level: {entry.get('energy_level', 'N/A')}/10\n"
                f"  Emotions: {', '.join(entry.get('emotions', []))}\n"
                f"  Notes: {entry.get('notes', 'None')}"
            )
            formatted_entries.append(entry_str)
        
        return "\n\n".join(formatted_entries)

    def generate_weekly_insights(
        self,
        user_id: str,
        mood_entries: list,
        previous_id: Optional[str] = None
    ) -> tuple[WeeklyInsightsResult, str]:
        """
        Generate weekly insights from mood entry data.
        
        Args:
            user_id: UUID of the user requesting insights
            mood_entries: List of mood entry dictionaries from the past 7 days
            previous_id: Optional previous interaction ID for conversation context
        
        Returns:
            Tuple of (WeeklyInsightsResult, interaction_id)
        
        Raises:
            GeminiServiceError: If AI service fails
        """
        # Handle insufficient data case
        if len(mood_entries) < 3:
            logger.info(f"Insufficient mood data for user {user_id}: {len(mood_entries)} entries")
            # Return partial analysis with encouragement
            return self._generate_partial_insights(mood_entries), ""
        
        # Prepare mood data for the prompt
        mood_data_str = self._prepare_mood_data(mood_entries)
        full_prompt = f"{self.INSIGHTS_PROMPT}\n\n[Mood Data]\n{mood_data_str}"
        
        # Create interaction with Gemini
        logger.info(f"Generating weekly insights for user {user_id} with {len(mood_entries)} entries")
        interaction = self._create_interaction(
            full_prompt,
            WeeklyInsightsResult,
            previous_id
        )
        
        # Parse and return result
        result = self._parse_response(interaction, WeeklyInsightsResult)
        logger.info(f"Weekly insights generated successfully for user {user_id}")
        return result, interaction.id

    def _generate_partial_insights(self, mood_entries: list) -> WeeklyInsightsResult:
        """
        Generate partial insights when there are fewer than 3 mood entries.
        Returns encouraging message to log more moods.
        
        Args:
            mood_entries: List of mood entry dictionaries (fewer than 3)
        
        Returns:
            WeeklyInsightsResult with partial data and encouragement
        """
        # Calculate basic stats from available entries
        if mood_entries:
            mood_scores = [e.get('mood_score', 3) for e in mood_entries]
            avg_mood = sum(mood_scores) / len(mood_scores) if mood_scores else 3.0
            
            # Collect emotions from available entries
            all_emotions = []
            for entry in mood_entries:
                all_emotions.extend(entry.get('emotions', []))
            
            # Get most common emotions (up to 3)
            from collections import Counter
            emotion_counts = Counter(all_emotions)
            dominant = [e for e, _ in emotion_counts.most_common(3)]
            if not dominant:
                dominant = ["neutral"]
        else:
            avg_mood = 3.0
            dominant = ["neutral"]
        
        # Return partial insights with encouragement
        return WeeklyInsightsResult(
            average_mood=avg_mood,
            mood_trend="stable",
            dominant_emotions=dominant,
            energy_pattern="Not enough data to determine energy patterns yet.",
            peak_days=[],
            low_days=[],
            weekly_summary=(
                f"You've logged {len(mood_entries)} mood {'entry' if len(mood_entries) == 1 else 'entries'} this week. "
                "Keep going! Logging at least 3 entries per week helps us provide more meaningful insights. "
                "Your mental wellness journey is just beginning, and every entry brings you closer to understanding your patterns."
            ),
            focus_areas=[
                "Log your mood more frequently to unlock detailed insights",
                "Try to check in at different times of day"
            ],
            achievements=[
                "Started your wellness tracking journey" if len(mood_entries) > 0 else "Ready to begin tracking"
            ],
            chart_data={
                "labels": [],
                "mood_scores": [],
                "energy_levels": []
            }
        )
