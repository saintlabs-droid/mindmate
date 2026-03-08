/**
 * AI Feature Type Definitions
 * JSDoc type definitions for all AI-related data structures
 */

/**
 * @typedef {Object} VoiceAnalysisResult
 * @property {string} id - Unique identifier
 * @property {'high'|'medium'|'low'} energy_level - Detected energy level from voice
 * @property {string[]} detected_emotions - Array of detected emotions (e.g., ["happy", "calm"])
 * @property {'low'|'medium'|'high'} fatigue_indicator - Fatigue level indicator
 * @property {'fast'|'normal'|'slow'} speech_pace - Speech pace classification
 * @property {number} confidence_score - Analysis confidence (0.0 to 1.0)
 * @property {string} supportive_message - Personalized supportive message
 * @property {string} created_at - ISO timestamp of analysis
 */

/**
 * @typedef {Object} SpaceAnalysisResult
 * @property {string} id - Unique identifier
 * @property {'excellent'|'good'|'fair'|'poor'} lighting_quality - Lighting quality assessment
 * @property {'natural'|'artificial'|'mixed'} lighting_type - Type of lighting detected
 * @property {'minimal'|'moderate'|'high'} clutter_level - Clutter level assessment
 * @property {string[]} calming_elements - Array of calming elements found (e.g., ["plants", "natural light"])
 * @property {number} relaxation_score - Relaxation score (0.0 to 10.0)
 * @property {string[]} environment_tips - Array of improvement suggestions
 * @property {string} personalized_comment - Personalized comment about the space
 * @property {string} created_at - ISO timestamp of analysis
 */

/**
 * @typedef {Object} WeeklyInsightsResult
 * @property {string} id - Unique identifier
 * @property {string} period_start - Start date of the week (ISO date)
 * @property {string} period_end - End date of the week (ISO date)
 * @property {number} entries_analyzed - Number of mood entries analyzed
 * @property {number} average_mood - Average mood score for the week (0.0 to 10.0)
 * @property {'improving'|'stable'|'declining'} mood_trend - Overall mood trend
 * @property {string[]} dominant_emotions - Most frequent emotions
 * @property {'consistent'|'fluctuating'} energy_pattern - Energy pattern classification
 * @property {string[]} peak_days - Days with highest mood
 * @property {string[]} low_days - Days with lowest mood
 * @property {string} weekly_summary - Natural language summary of the week
 * @property {string[]} focus_areas - Recommended areas to focus on
 * @property {string[]} achievements - Positive achievements to celebrate
 * @property {Object} chart_data - Data for mood visualization charts
 * @property {string} created_at - ISO timestamp of generation
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id - Unique identifier
 * @property {'user'|'ai'} sender - Message sender type
 * @property {string} content - Message text content
 * @property {string} timestamp - ISO timestamp of message
 * @property {'happy'|'sad'|'anxious'|'neutral'|null} detected_mood - AI-detected mood (AI messages only)
 * @property {string[]|null} suggested_activities - Activity suggestions (AI messages only)
 * @property {string[]|null} follow_up_questions - Follow-up questions (AI messages only)
 * @property {boolean|null} crisis_flag - Crisis detection flag (AI messages only)
 * @property {Object[]|null} resource_suggestions - Crisis resources (AI messages only)
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id - Unique identifier
 * @property {string} title - Conversation title
 * @property {boolean} is_active - Whether conversation is active
 * @property {string} created_at - ISO timestamp of creation
 * @property {string} updated_at - ISO timestamp of last update
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request succeeded
 * @property {*} data - Response data
 * @property {Object} [meta] - Optional metadata (pagination, timestamps, etc.)
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false for errors
 * @property {Object} error - Error details
 * @property {string} error.code - Error code (e.g., "VALIDATION_ERROR")
 * @property {string} error.message - User-friendly error message
 * @property {Object} [error.fields] - Field-specific validation errors
 */
