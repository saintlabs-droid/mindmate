"""
Gemini AI Configuration for MindMate
Uses the new Interactions API (Beta) for multimodal analysis
"""
import os
from google import genai
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


# Initialize Gemini client
def get_gemini_client() -> genai.Client:
    """Get configured Gemini client."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    return genai.Client(api_key=api_key)


# Model configuration
class GeminiModels:
    FLASH = "gemini-3-flash-preview"  # Fast, multimodal
    FLASH_STABLE = "gemini-2.5-flash"  # More stable
    PRO = "gemini-2.5-pro"  # Higher quality


# Pydantic schemas for structured JSON output

class EmotionType(str, Enum):
    HAPPY = "happy"
    SAD = "sad"
    ANXIOUS = "anxious"
    CALM = "calm"
    STRESSED = "stressed"
    ENERGETIC = "energetic"
    FATIGUED = "fatigued"
    NEUTRAL = "neutral"


class VoiceAnalysisResult(BaseModel):
    """Schema for voice tone analysis results."""
    energy_level: int = Field(ge=1, le=10, description="Energy level 1-10")
    detected_emotions: list[str] = Field(description="List of detected emotions")
    fatigue_indicator: bool = Field(description="Whether fatigue is detected")
    speech_pace: str = Field(description="slow, normal, or fast")
    confidence_score: float = Field(ge=0, le=1, description="Analysis confidence")
    supportive_message: str = Field(description="Brief supportive response")


class SpaceAnalysisResult(BaseModel):
    """Schema for calm space/environment analysis."""
    lighting_quality: str = Field(description="poor, moderate, good, excellent")
    lighting_type: str = Field(description="natural, artificial, mixed, dim")
    clutter_level: str = Field(description="minimal, moderate, cluttered")
    calming_elements: list[str] = Field(description="Plants, soft colors, etc.")
    relaxation_score: int = Field(ge=1, le=10, description="How relaxing 1-10")
    environment_tips: list[str] = Field(description="Suggestions to improve")
    personalized_comment: str = Field(description="Friendly observation")


class MoodAnalysisResult(BaseModel):
    """Schema for text-based mood analysis."""
    mood_score: int = Field(ge=1, le=10, description="Overall mood 1-10")
    energy_level: int = Field(ge=1, le=10, description="Energy level 1-10")
    primary_emotion: str = Field(description="Main detected emotion")
    secondary_emotions: list[str] = Field(description="Other emotions present")
    stress_indicators: list[str] = Field(description="Signs of stress if any")
    positive_aspects: list[str] = Field(description="Positive elements noted")
    recommendations: list[str] = Field(description="Actionable suggestions")
    journal_prompt: str = Field(description="Follow-up journaling question")


class EvidenceItem(BaseModel):
    """Evidence supporting an AI insight."""
    source_type: str = Field(description="mood_entry, voice_analysis, chat_message, space_analysis")
    date: str = Field(description="When this evidence was recorded")
    detail: str = Field(description="Specific detail from the source")
    confidence: float = Field(ge=0, le=1, description="Confidence in this evidence")


class WeeklyInsightsResult(BaseModel):
    """Schema for aggregated weekly insights."""
    average_mood: float = Field(description="Average mood score")
    mood_trend: str = Field(description="improving, stable, declining")
    dominant_emotions: list[str] = Field(description="Most frequent emotions")
    energy_pattern: str = Field(description="Pattern description")
    peak_days: list[str] = Field(description="Best days of the week")
    low_days: list[str] = Field(description="Days needing attention")
    weekly_summary: str = Field(description="Natural language summary")
    focus_areas: list[str] = Field(description="Areas to work on")
    achievements: list[str] = Field(description="Positive progress noted")
    chart_data: dict = Field(description="Data formatted for UI charts")
    evidence: list[EvidenceItem] = Field(default=[], description="Supporting evidence for insights")
    overall_confidence: float = Field(default=0.85, ge=0, le=1, description="Overall confidence score")


class ChatResponseResult(BaseModel):
    """Schema for AI chatbot responses."""
    response_text: str = Field(description="The supportive response")
    detected_mood: str = Field(description="User's apparent mood")
    suggested_activities: list[str] = Field(description="Helpful activities")
    follow_up_questions: list[str] = Field(description="Engagement questions")
    crisis_flag: bool = Field(description="Whether crisis support needed")
    resource_suggestions: list[str] = Field(description="Relevant resources")
