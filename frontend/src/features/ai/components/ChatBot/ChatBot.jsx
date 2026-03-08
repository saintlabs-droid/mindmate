import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useChatBot from '../../hooks/useChatBot';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

/**
 * ChatBot Component
 * Main AI chatbot interface with conversation management
 * 
 * Features:
 * - Scrollable message list
 * - Auto-scroll to latest message
 * - Typing indicator during AI response
 * - Error handling with retry
 * - Crisis detection callback
 * - Conversation history loading
 */
const ChatBot = ({ userId, onCrisisDetected, conversationId = null }) => {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const {
        messages,
        conversationId: currentConversationId,
        isLoading,
        error,
        sendMessage,
        loadHistory,
        clearConversation,
    } = useChatBot({ onCrisisDetected });

    /**
     * Auto-scroll to bottom when new messages arrive
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * Load conversation history if conversationId provided
     */
    useEffect(() => {
        if (conversationId) {
            loadHistory(conversationId);
        }
    }, [conversationId, loadHistory]);

    /**
     * Handle sending a message
     */
    const handleSendMessage = async (messageText) => {
        await sendMessage(messageText);
    };

    /**
     * Handle retry after error
     */
    const handleRetry = () => {
        clearConversation();
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4">
                <h2 className="text-xl font-semibold">AI Support Chat</h2>
                <p className="text-sm text-blue-100 mt-1">
                    I'm here to listen and support you
                </p>
            </div>

            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50"
                style={{ minHeight: '400px', maxHeight: '600px' }}
            >
                {/* Empty State */}
                {messages.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="bg-white rounded-full p-6 shadow-md mb-4">
                            <svg
                                className="w-12 h-12 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Start a conversation
                        </h3>
                        <p className="text-sm text-gray-600 max-w-md">
                            Share what's on your mind. I'm here to provide support and guidance.
                        </p>
                    </div>
                )}

                {/* Messages List */}
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        sender={message.sender}
                        content={message.content}
                        timestamp={message.timestamp}
                        metadata={{
                            detected_mood: message.detected_mood,
                            suggested_activities: message.suggested_activities,
                            follow_up_questions: message.follow_up_questions,
                            crisis_flag: message.crisis_flag,
                            resource_suggestions: message.resource_suggestions,
                        }}
                    />
                ))}

                {/* Typing Indicator */}
                {isLoading && messages.length > 0 && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 rounded-lg px-4 py-3 rounded-bl-none">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <svg
                                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-900 mb-1">
                                    Something went wrong
                                </p>
                                <p className="text-sm text-red-700 mb-3">{error}</p>
                                <button
                                    onClick={handleRetry}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput
                onSend={handleSendMessage}
                isLoading={isLoading}
                placeholder="Share what's on your mind..."
            />

            {/* Conversation ID Display (for debugging) */}
            {currentConversationId && (
                <div className="px-6 py-2 bg-gray-100 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        Conversation ID: {currentConversationId.slice(0, 8)}...
                    </p>
                </div>
            )}
        </div>
    );
};

ChatBot.propTypes = {
    userId: PropTypes.string.isRequired,
    onCrisisDetected: PropTypes.func,
    conversationId: PropTypes.string,
};

export default ChatBot;
