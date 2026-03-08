/**
 * AI Service API Client
 * Handles all API calls to the Gemini Multimodal AI backend endpoints.
 * 
 * All endpoints require JWT authentication via Authorization header.
 * Rate limited to 30 requests per minute per user.
 */

const API_BASE_URL = '/api/v1/ai';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Base fetch wrapper with authentication and error handling
 */
const apiFetch = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const config = {
        ...options,
        headers: {
            ...options.headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    return response.json();
};

/**
 * Submit voice recording for tone analysis
 * 
 * @param {File} audioFile - Audio file (WAV, MP3, or WebM, max 5 minutes)
 * @returns {Promise<Object>} Analysis result with energy level, emotions, and supportive message
 * 
 * Response format:
 * {
 *   success: true,
 *   data: {
 *     id: "uuid",
 *     energy_level: "high|medium|low",
 *     detected_emotions: ["happy", "calm"],
 *     fatigue_indicator: "low|medium|high",
 *     speech_pace: "fast|normal|slow",
 *     confidence_score: 0.85,
 *     supportive_message: "You sound energized today!"
 *   }
 * }
 */
export const submitVoiceAnalysis = async (audioFile) => {
    const formData = new FormData();
    formData.append('audio_file', audioFile);

    return apiFetch('/voice-analysis/', {
        method: 'POST',
        body: formData,
    });
};

/**
 * Submit space/environment photo for analysis
 * 
 * @param {File} imageFile - Image file (JPEG, PNG, or WebP, max 10MB)
 * @returns {Promise<Object>} Analysis result with relaxation score and environment tips
 * 
 * Response format:
 * {
 *   success: true,
 *   data: {
 *     id: "uuid",
 *     lighting_quality: "excellent|good|fair|poor",
 *     lighting_type: "natural|artificial|mixed",
 *     clutter_level: "minimal|moderate|high",
 *     calming_elements: ["plants", "natural light"],
 *     relaxation_score: 8.5,
 *     environment_tips: ["Add more plants", "Reduce clutter"],
 *     personalized_comment: "Your space looks very calming!"
 *   }
 * }
 */
export const submitSpaceAnalysis = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    return apiFetch('/space-analysis/', {
        method: 'POST',
        body: formData,
    });
};

/**
 * Fetch weekly mood insights for the authenticated user
 * 
 * @returns {Promise<Object>} Weekly insights with mood trends and recommendations
 * 
 * Response format:
 * {
 *   success: true,
 *   data: {
 *     id: "uuid",
 *     period_start: "2026-03-01",
 *     period_end: "2026-03-08",
 *     average_mood: 7.5,
 *     mood_trend: "improving|stable|declining",
 *     dominant_emotions: ["happy", "calm"],
 *     energy_pattern: "consistent|fluctuating",
 *     peak_days: ["Monday", "Friday"],
 *     low_days: ["Wednesday"],
 *     weekly_summary: "You had a great week!",
 *     focus_areas: ["Sleep schedule", "Exercise"],
 *     achievements: ["Maintained consistent mood"],
 *     chart_data: { ... }
 *   }
 * }
 */
export const fetchWeeklyInsights = async () => {
    return apiFetch('/insights/weekly/', {
        method: 'GET',
    });
};

/**
 * Send a chat message to the AI chatbot
 * 
 * @param {string} message - User's message text
 * @param {string|null} conversationId - Optional conversation ID for continuing existing chat
 * @returns {Promise<Object>} AI response with detected mood and suggestions
 * 
 * Response format:
 * {
 *   success: true,
 *   data: {
 *     conversation_id: "uuid",
 *     user_message: { ... },
 *     ai_message: {
 *       id: "uuid",
 *       content: "AI response text",
 *       detected_mood: "happy|sad|anxious|neutral",
 *       suggested_activities: ["Take a walk", "Practice breathing"],
 *       follow_up_questions: ["How did that make you feel?"],
 *       crisis_flag: false,
 *       resource_suggestions: []
 *     }
 *   }
 * }
 */
export const sendChatMessage = async (message, conversationId = null) => {
    const payload = {
        message,
        ...(conversationId && { conversation_id: conversationId }),
    };

    return apiFetch('/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};

/**
 * Fetch chat history for a conversation
 * 
 * @param {string} conversationId - Conversation ID
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} pageSize - Number of messages per page (default: 50, max: 100)
 * @returns {Promise<Object>} Paginated chat messages
 * 
 * Response format:
 * {
 *   success: true,
 *   data: [
 *     {
 *       id: "uuid",
 *       sender: "user|ai",
 *       content: "Message text",
 *       timestamp: "2026-03-08T10:30:00Z",
 *       detected_mood: "happy",
 *       suggested_activities: []
 *     }
 *   ],
 *   meta: {
 *     page: 1,
 *     page_size: 50,
 *     total: 150
 *   }
 * }
 */
export const fetchChatHistory = async (conversationId, page = 1, pageSize = 50) => {
    const params = new URLSearchParams({
        conversation_id: conversationId,
        page: page.toString(),
        page_size: pageSize.toString(),
    });

    return apiFetch(`/chat/history/?${params}`, {
        method: 'GET',
    });
};
