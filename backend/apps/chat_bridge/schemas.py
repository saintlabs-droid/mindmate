"""
Chat Bridge Pydantic Schemas

This module defines Pydantic models for structured conversation starter generation
and mood context interpretation, ensuring type safety and validation.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class MoodInterpretation(BaseModel):
    """Interpretation of mood level and associated emotional state."""
    
    mood_level: int = Field(ge=1, le=5, description="User's mood level (1-5)")
    emotional_state: str = Field(description="Interpreted emotional state")
    tone_category: str = Field(description="Response tone: empathetic, exploratory, or growth-focused")
    support_level: str = Field(description="Level of support needed: high, medium, low")


class StressAnalysis(BaseModel):
    """Analysis of stress factors and their impact."""
    
    primary_stressor: str = Field(description="Most significant stress factor")
    stress_factors: List[str] = Field(description="All selected stress factors")
    stress_intensity: str = Field(description="Perceived intensity: low, moderate, high")
    focus_areas: List[str] = Field(description="Areas requiring attention")


class MoodContext(BaseModel):
    """Complete mood context for conversation generation."""
    
    mood_interpretation: MoodInterpretation
    stress_analysis: StressAnalysis
    user_id: str = Field(description="User identifier")
    timestamp: str = Field(description="Mood entry timestamp")


class ConversationStarterResult(BaseModel):
    """Result of conversation starter generation."""
    
    starter_text: str = Field(
        min_length=50,
        max_length=750,  # Approximately 150 words
        description="Generated conversation opener (50-150 words)"
    )
    mood_interpretation: str = Field(description="AI's interpretation of user's mood")
    conversation_tone: str = Field(description="empathetic, exploratory, or growth-focused")
    stress_acknowledgment: List[str] = Field(description="Specific stress factors addressed")
    engagement_question: str = Field(description="Open-ended question to encourage response")
    confidence_score: Optional[float] = Field(
        ge=0.0,
        le=1.0,
        description="AI confidence in the generated response"
    )