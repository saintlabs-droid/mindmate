import { useState, useCallback } from 'react';
import { sendChatMessage, fetchChatHistory } from '../api/aiApi';

/**
 * useChatBot Hook
 * Manages AI chatbot conversation state and message handling
 * 
 * Features:
 * - Send messages and receive AI responses
 * - Load conversation history
 * - Track conversation context
 * - Crisis detection callback
 * - Loading and error state management
 * 
 * @param {Object} options - Hook configuration
 * @param {Function} options.onCrisisDetected - Callback when crisis is detected
 * @returns {Object} Chat state and controls
 */
const useChatBot = ({ onCrisisDetected } = {}) => {
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Send a message to the AI chatbot
     * 
     * @param {string} messageText - User's message text
     * @returns {Promise<Object|null>} AI response or null on error
     */
    const sendMessage = useCallback(async (messageText) => {
        if (!messageText || !messageText.trim()) {
            setError('Message cannot be empty');
            return null;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await sendChatMessage(messageText.trim(), conversationId);

            if (response.success) {
                const { conversation_id, user_message, ai_message } = response.data;

                // Update conversation ID if this is a new conversation
                if (!conversationId && conversation_id) {
                    setConversationId(conversation_id);
                }

                // Add both user and AI messages to state
                setMessages(prev => [
                    ...prev,
                    {
                        id: user_message.id,
                        sender: 'user',
                        content: messageText.trim(),
                        timestamp: user_message.timestamp || new Date().toISOString(),
                    },
                    {
                        id: ai_message.id,
                        sender: 'ai',
                        content: ai_message.content,
                        timestamp: ai_message.timestamp || new Date().toISOString(),
                        detected_mood: ai_message.detected_mood,
                        suggested_activities: ai_message.suggested_activities || [],
                        follow_up_questions: ai_message.follow_up_questions || [],
                        crisis_flag: ai_message.crisis_flag || false,
                        resource_suggestions: ai_message.resource_suggestions || [],
                    },
                ]);

                // Trigger crisis callback if crisis detected
                if (ai_message.crisis_flag && onCrisisDetected) {
                    onCrisisDetected(ai_message);
                }

                return ai_message;
            } else {
                throw new Error(response.error?.message || 'Failed to send message');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to send message. Please try again.';
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [conversationId, onCrisisDetected]);

    /**
     * Load conversation history
     * 
     * @param {string} convId - Conversation ID to load
     * @param {number} page - Page number for pagination
     * @returns {Promise<Array|null>} Messages array or null on error
     */
    const loadHistory = useCallback(async (convId, page = 1) => {
        if (!convId) {
            setError('Conversation ID is required');
            return null;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchChatHistory(convId, page);

            if (response.success) {
                const historyMessages = response.data.map(msg => ({
                    id: msg.id,
                    sender: msg.sender,
                    content: msg.content,
                    timestamp: msg.timestamp,
                    detected_mood: msg.detected_mood,
                    suggested_activities: msg.suggested_activities || [],
                    follow_up_questions: msg.follow_up_questions || [],
                    crisis_flag: msg.crisis_flag || false,
                    resource_suggestions: msg.resource_suggestions || [],
                }));

                setMessages(historyMessages);
                setConversationId(convId);

                return historyMessages;
            } else {
                throw new Error(response.error?.message || 'Failed to load history');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to load conversation history. Please try again.';
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Clear current conversation and start fresh
     */
    const clearConversation = useCallback(() => {
        setMessages([]);
        setConversationId(null);
        setError(null);
    }, []);

    return {
        messages,
        conversationId,
        isLoading,
        error,
        sendMessage,
        loadHistory,
        clearConversation,
    };
};

export default useChatBot;
