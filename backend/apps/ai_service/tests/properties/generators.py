"""
Hypothesis strategies for generating test data for AI service models
"""
from hypothesis import strategies as st
from hypothesis.strategies import composite


# Energy levels
energy_levels = st.sampled_from(['low', 'medium', 'high'])

# Emotions
emotions = st.sampled_from([
    'happy', 'sad', 'anxious', 'calm', 'excited', 
    'stressed', 'relaxed', 'frustrated', 'content'
])

# Fatigue indicators
fatigue_indicators = st.sampled_from(['low', 'medium', 'high'])

# Speech pace
speech_pace = st.sampled_from(['slow', 'normal', 'fast'])

# Lighting quality
lighting_quality = st.sampled_from(['poor', 'fair', 'good', 'excellent'])

# Lighting type
lighting_type = st.sampled_from(['natural', 'artificial', 'mixed'])

# Clutter level
clutter_level = st.sampled_from(['minimal', 'moderate', 'high'])

# Mood trend
mood_trend = st.sampled_from(['improving', 'stable', 'declining'])

# Energy pattern
energy_pattern = st.sampled_from(['consistent', 'fluctuating'])

# Days of week
days_of_week = st.sampled_from([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
])


@composite
def voice_analysis_result(draw):
    """Generate a valid VoiceAnalysisResult"""
    return {
        'energy_level': draw(energy_levels),
        'detected_emotions': draw(st.lists(emotions, min_size=1, max_size=3, unique=True)),
        'fatigue_indicator': draw(fatigue_indicators),
        'speech_pace': draw(speech_pace),
        'confidence_score': draw(st.floats(min_value=0.0, max_value=1.0)),
        'supportive_message': draw(st.text(min_size=10, max_size=200)),
    }


@composite
def space_analysis_result(draw):
    """Generate a valid SpaceAnalysisResult"""
    return {
        'lighting_quality': draw(lighting_quality),
        'lighting_type': draw(lighting_type),
        'clutter_level': draw(clutter_level),
        'calming_elements': draw(st.lists(st.text(min_size=3, max_size=20), min_size=0, max_size=5)),
        'relaxation_score': draw(st.floats(min_value=0.0, max_value=10.0)),
        'environment_tips': draw(st.lists(st.text(min_size=10, max_size=100), min_size=1, max_size=5)),
        'personalized_comment': draw(st.text(min_size=10, max_size=200)),
    }


@composite
def weekly_insights_result(draw):
    """Generate a valid WeeklyInsightsResult"""
    return {
        'average_mood': draw(st.floats(min_value=1.0, max_value=10.0)),
        'mood_trend': draw(mood_trend),
        'dominant_emotions': draw(st.lists(emotions, min_size=1, max_size=3, unique=True)),
        'energy_pattern': draw(energy_pattern),
        'peak_days': draw(st.lists(days_of_week, min_size=0, max_size=3, unique=True)),
        'low_days': draw(st.lists(days_of_week, min_size=0, max_size=3, unique=True)),
        'weekly_summary': draw(st.text(min_size=20, max_size=500)),
        'focus_areas': draw(st.lists(st.text(min_size=5, max_size=50), min_size=1, max_size=5)),
        'achievements': draw(st.lists(st.text(min_size=5, max_size=100), min_size=0, max_size=5)),
        'chart_data': draw(st.dictionaries(
            keys=st.text(min_size=1, max_size=20),
            values=st.lists(st.floats(min_value=0.0, max_value=10.0), min_size=7, max_size=7)
        )),
    }


@composite
def chat_response_result(draw):
    """Generate a valid ChatResponseResult"""
    crisis_flag = draw(st.booleans())
    return {
        'response_text': draw(st.text(min_size=10, max_size=500)),
        'detected_mood': draw(st.sampled_from(['happy', 'sad', 'anxious', 'neutral'])),
        'suggested_activities': draw(st.lists(st.text(min_size=5, max_size=100), min_size=0, max_size=5)),
        'follow_up_questions': draw(st.lists(st.text(min_size=10, max_size=100), min_size=0, max_size=3)),
        'crisis_flag': crisis_flag,
        'resource_suggestions': draw(st.lists(
            st.text(min_size=10, max_size=100), 
            min_size=1 if crisis_flag else 0, 
            max_size=5
        )),
    }
