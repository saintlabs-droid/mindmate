"""
Mood Context Generator Service

This service interprets mood data and generates contextual conversation starters
by analyzing mood levels, stress factors, and creating appropriate AI prompts.
"""

from typing import List, Dict, Any
from apps.mood_tracking.models import MoodEntry
from apps.ai_service.services import GeminiService, GeminiServiceError
from apps.ai_service.ai_config import GeminiModels
from ..schemas import (
    MoodInterpretation, 
    StressAnalysis, 
    MoodContext, 
    ConversationStarterResult
)
from ..exceptions import ConversationGenerationError, MoodDataValidationError
import logging

logger = logging.getLogger(__name__)


class MoodContextGenerator:
    """
    Generates conversation context and starters from mood entry data.
    
    This service analyzes mood levels and stress factors to create personalized
    conversation starters that match the user's emotional state and needs.
    """
    
    # Mood level interpretation mapping
    MOOD_INTERPRETATIONS = {
        1: {
            'emotional_state': 'Very distressed',
            'tone_category': 'empathetic',
            'support_level': 'high'
        },
        2: {
            'emotional_state': 'Distressed',
            'tone_category': 'empathetic', 
            'support_level': 'high'
        },
        3: {
            'emotional_state': 'Neutral',
            'tone_category': 'exploratory',
            'support_level': 'medium'
        },
        4: {
            'emotional_state': 'Positive',
            'tone_category': 'growth-focused',
            'support_level': 'low'
        },
        5: {
            'emotional_state': 'Very positive',
            'tone_category': 'growth-focused',
            'support_level': 'low'
        }
    }
    
    # Stress factor analysis
    STRESS_FACTOR_PRIORITIES = {
        'Academics': {'intensity': 'high', 'focus': 'performance and learning'},
        'Finances': {'intensity': 'high', 'focus': 'security and planning'},
        'Relationships': {'intensity': 'moderate', 'focus': 'connection and communication'},
        'Family': {'intensity': 'moderate', 'focus': 'support and boundaries'},
        'Career': {'intensity': 'high', 'focus': 'growth and fulfillment'}
    }
    
    def __init__(self):
        """Initialize the context generator with AI service."""
        self.gemini_service = GeminiService(model=GeminiModels.FLASH)
    
    def interpret_mood_level(self, mood_level: int) -> MoodInterpretation:
        """
        Interpret mood level and return structured interpretation.
        
        Args:
            mood_level: User's mood level (1-5)
            
        Returns:
            MoodInterpretation with emotional state and tone category
            
        Raises:
            MoodDataValidationError: If mood level is invalid
        """
        if not (1 <= mood_level <= 5):
            raise MoodDataValidationError(f"Invalid mood level: {mood_level}")
            
        interpretation_data = self.MOOD_INTERPRETATIONS[mood_level]
        
        return MoodInterpretation(
            mood_level=mood_level,
            emotional_state=interpretation_data['emotional_state'],
            tone_category=interpretation_data['tone_category'],
            support_level=interpretation_data['support_level']
        )
    
    def analyze_stress_factors(self, stress_factors: List[str]) -> StressAnalysis:
        """
        Analyze stress factors and determine primary stressor and intensity.
        
        Args:
            stress_factors: List of selected stress categories
            
        Returns:
            StressAnalysis with primary stressor and focus areas
        """
        if not stress_factors:
            return StressAnalysis(
                primary_stressor="General",
                stress_factors=[],
                stress_intensity="low",
                focus_areas=["general wellbeing"]
            )
        
        # Determine primary stressor based on priority
        primary_stressor = stress_factors[0]  # For now, use first factor
        
        # Calculate overall intensity
        intensities = [self.STRESS_FACTOR_PRIORITIES.get(factor, {'intensity': 'low'})['intensity'] 
                      for factor in stress_factors]
        
        if 'high' in intensities:
            overall_intensity = 'high'
        elif 'moderate' in intensities:
            overall_intensity = 'moderate'
        else:
            overall_intensity = 'low'
        
        # Generate focus areas
        focus_areas = [self.STRESS_FACTOR_PRIORITIES.get(factor, {'focus': 'general support'})['focus']
                      for factor in stress_factors]
        
        return StressAnalysis(
            primary_stressor=primary_stressor,
            stress_factors=stress_factors,
            stress_intensity=overall_intensity,
            focus_areas=focus_areas
        )
    
    def create_contextual_prompt(self, mood_data: MoodContext) -> str:
        """
        Create a contextual prompt for Gemini API based on mood data.
        
        Args:
            mood_data: Complete mood context information
            
        Returns:
            Formatted prompt string for AI generation
        """
        mood_interp = mood_data.mood_interpretation
        stress_analysis = mood_data.stress_analysis
        
        prompt = f"""
[Persona] You are MindMate, a warm AI companion specializing in mood-based support.

[Action] Create a conversation starter based on the user's mood entry.

[Context] User submitted: 
- Mood Level: {mood_interp.mood_level}/5 ({mood_interp.emotional_state})
- Primary Stress Factor: {stress_analysis.primary_stressor}
- All Stress Factors: {', '.join(stress_analysis.stress_factors)}
- Support Level Needed: {mood_interp.support_level}
- Recommended Tone: {mood_interp.tone_category}

[Format] Return JSON with ConversationStarterResult schema:
{{
    "starter_text": "<string: your conversation opener (50-150 words)>",
    "mood_interpretation": "<string: your interpretation of their mood>",
    "conversation_tone": "{mood_interp.tone_category}",
    "stress_acknowledgment": {stress_analysis.stress_factors},
    "engagement_question": "<string: open-ended question to encourage response>",
    "confidence_score": <float: 0.0-1.0>
}}

[Constraints]
- starter_text: 50-150 words, {mood_interp.tone_category} tone
- Reference specific stress factors: {', '.join(stress_analysis.stress_factors)}
- End with engaging question
- Match tone to mood level ({mood_interp.tone_category} for level {mood_interp.mood_level})

[Tone Guidelines for {mood_interp.tone_category}]
"""
        
        if mood_interp.tone_category == 'empathetic':
            prompt += """
- Be warm and supportive, not clinical
- Validate feelings before exploring
- Acknowledge the difficulty they're experiencing
- Offer gentle support and understanding
"""
        elif mood_interp.tone_category == 'exploratory':
            prompt += """
- Be curious and gentle
- Ask open-ended questions
- Help them explore their feelings
- Maintain a balanced, non-judgmental tone
"""
        else:  # growth-focused
            prompt += """
- Be encouraging and forward-looking
- Acknowledge their positive state
- Explore opportunities for growth
- Balance positivity with any challenges mentioned
"""
        
        return prompt.strip()
    
    def generate_conversation_starter(self, mood_entry: MoodEntry) -> ConversationStarterResult:
        """
        Generate a contextual conversation starter from mood entry data.
        
        Args:
            mood_entry: MoodEntry instance with mood and stress data
            
        Returns:
            ConversationStarterResult with generated starter and metadata
            
        Raises:
            ConversationGenerationError: If generation fails
            MoodDataValidationError: If mood data is invalid
        """
        try:
            # Validate mood entry
            if not mood_entry.mood_level or not mood_entry.stress_category:
                raise MoodDataValidationError("Mood entry missing required data")
            
            # Interpret mood and analyze stress
            mood_interpretation = self.interpret_mood_level(mood_entry.mood_level)
            stress_analysis = self.analyze_stress_factors([mood_entry.stress_category])
            
            # Create mood context
            mood_context = MoodContext(
                mood_interpretation=mood_interpretation,
                stress_analysis=stress_analysis,
                user_id=str(mood_entry.user.id),
                timestamp=mood_entry.timestamp.isoformat()
            )
            
            # Generate contextual prompt
            prompt = self.create_contextual_prompt(mood_context)
            
            # Call Gemini API
            interaction = self.gemini_service._create_interaction(
                prompt,
                ConversationStarterResult
            )
            
            result = self.gemini_service._parse_response(interaction, ConversationStarterResult)
            
            logger.info(f"Generated conversation starter for mood entry {mood_entry.id}")
            return result
            
        except GeminiServiceError as e:
            logger.error(f"AI service error generating starter: {e}")
            raise ConversationGenerationError(f"AI service failed: {e}")
        except Exception as e:
            logger.error(f"Unexpected error generating starter: {e}")
            raise ConversationGenerationError(f"Generation failed: {e}")

    # Fallback conversation starter templates
    FALLBACK_STARTERS = {
        (1, 2): {
            'Academics': "I can see you're having a tough time with your studies right now. Academic pressure can feel overwhelming, and it's completely understandable to feel stressed about it. Remember that struggling doesn't mean you're not capable - it often means you're challenging yourself and growing. What specific aspect of your academics has been weighing on you most today?",
            'Finances': "I notice you're feeling stressed about your financial situation, and that's a really valid concern. Money worries can affect so many aspects of our lives and create a lot of anxiety. You're not alone in feeling this way, and acknowledging these feelings is an important first step. What's been the most challenging part of your financial situation lately?",
            'Relationships': "It sounds like you're going through a difficult time with relationships right now. Relationship challenges can be emotionally draining and leave us feeling disconnected or hurt. Your feelings are completely valid, and it takes courage to acknowledge when things are tough. What's been happening in your relationships that's been particularly hard for you?",
            'Family': "I can sense that family matters are causing you stress right now. Family dynamics can be complex and emotionally challenging, especially when we care deeply about the people involved. It's okay to feel overwhelmed by family situations. What's been going on with your family that's been weighing on your mind?",
            'Career': "I understand you're feeling stressed about your career situation. Career concerns can create a lot of uncertainty and pressure, affecting how we feel about our future and our sense of purpose. These feelings are completely normal and valid. What aspect of your career has been causing you the most concern lately?"
        },
        (3,): {
            'Academics': "It seems like you're in a reflective space about your academic life today. Sometimes neutral feelings can be just as important to explore as strong emotions. How are you feeling about your studies right now? Is there anything specific on your mind about your academic journey?",
            'Finances': "I notice you're thinking about your financial situation today. It's good to check in with ourselves about money matters, even when we're feeling neutral about them. How are things going with your finances? Is there anything you've been considering or planning?",
            'Relationships': "It sounds like relationships are on your mind today. Sometimes it's valuable to reflect on our connections with others, even during quieter emotional moments. How are your relationships feeling to you right now? Is there anything you've been thinking about?",
            'Family': "Family seems to be something you're considering today. Family relationships can be complex, and it's natural to have mixed or neutral feelings sometimes. How are things with your family at the moment? Is there anything particular you've been reflecting on?",
            'Career': "I can see career matters are on your mind today. It's healthy to regularly check in with how we're feeling about our professional lives. How are you feeling about your career path right now? Is there anything you've been contemplating or planning?"
        },
        (4, 5): {
            'Academics': "I'm glad to hear you're feeling positive today, even while dealing with academic pressures. It's wonderful that you can maintain a good outlook while navigating your studies. This positive energy can be a great foundation for growth and learning. What's been going well in your academic life, and how can you build on this positive momentum?",
            'Finances': "It's great that you're feeling good today, even while managing financial considerations. Having a positive mindset can be really helpful when dealing with money matters and planning for the future. What's been working well for you financially, or what opportunities are you excited about?",
            'Relationships': "I love that you're feeling positive today while thinking about your relationships. Good feelings can be a wonderful foundation for nurturing and growing your connections with others. What's been going well in your relationships, and how might you want to invest in them further?",
            'Family': "It's wonderful that you're feeling good while considering family matters. Positive feelings can create great opportunities for strengthening family bonds and creating meaningful moments together. What's been positive about your family situation, and how might you want to build on that?",
            'Career': "I'm excited to hear you're feeling positive about your career situation! This kind of optimism can be incredibly powerful for professional growth and pursuing new opportunities. What's been going well in your career, and what possibilities are you most excited about exploring?"
        }
    }
    
    def get_fallback_starter(self, mood_entry: MoodEntry) -> ConversationStarterResult:
        """
        Get a fallback conversation starter when AI generation fails.
        
        Args:
            mood_entry: MoodEntry instance
            
        Returns:
            ConversationStarterResult with template-based starter
        """
        mood_level = mood_entry.mood_level
        stress_category = mood_entry.stress_category
        
        # Determine mood range for fallback selection
        if mood_level in [1, 2]:
            mood_range = (1, 2)
        elif mood_level == 3:
            mood_range = (3,)
        else:
            mood_range = (4, 5)
        
        # Get appropriate fallback starter
        starter_text = self.FALLBACK_STARTERS[mood_range].get(
            stress_category,
            self.FALLBACK_STARTERS[mood_range]['Academics']  # Default fallback
        )
        
        # Create basic engagement question
        engagement_questions = {
            (1, 2): "Would you like to talk about what's been most challenging for you?",
            (3,): "What's been on your mind about this lately?",
            (4, 5): "What opportunities are you most excited about right now?"
        }
        
        engagement_question = engagement_questions[mood_range]
        
        # Determine tone based on mood level
        tone_mapping = {
            (1, 2): 'empathetic',
            (3,): 'exploratory', 
            (4, 5): 'growth-focused'
        }
        
        return ConversationStarterResult(
            starter_text=starter_text,
            mood_interpretation=self.MOOD_INTERPRETATIONS[mood_level]['emotional_state'],
            conversation_tone=tone_mapping[mood_range],
            stress_acknowledgment=[stress_category],
            engagement_question=engagement_question,
            confidence_score=0.7  # Lower confidence for fallback
        )