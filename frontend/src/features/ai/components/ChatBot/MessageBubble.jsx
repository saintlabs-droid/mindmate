import React from 'react';
import PropTypes from 'prop-types';

/**
 * MessageBubble Component
 * Displays a single chat message with sender-specific styling
 * 
 * Features:
 * - User messages: right-aligned with user color
 * - AI messages: left-aligned with AI color
 * - AI metadata: detected mood and suggested activities
 * - Crisis resources: prominent display when crisis detected
 * - Timestamp display
 */
const MessageBubble = ({ sender, content, timestamp, metadata = {} }) => {
    const isUser = sender === 'user';
    const isAI = sender === 'ai';

    const {
        detected_mood,
        suggested_activities = [],
        follow_up_questions = [],
        crisis_flag = false,
        resource_suggestions = [],
    } = metadata;

    const formatTimestamp = (ts) => {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div
                    className={`rounded-lg px-4 py-3 ${
                        isUser
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
                </div>

                {/* Timestamp */}
                <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    {formatTimestamp(timestamp)}
                </div>

                {/* AI Metadata */}
                {isAI && (detected_mood || suggested_activities.length > 0) && (
                    <div className="mt-2 space-y-2">
                        {/* Detected Mood */}
                        {detected_mood && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Mood detected:</span>
                                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                                    {detected_mood}
                                </span>
                            </div>
                        )}

                        {/* Suggested Activities */}
                        {suggested_activities.length > 0 && (
                            <div className="bg-blue-50 rounded-lg p-3">
                                <p className="text-xs font-medium text-blue-900 mb-2">
                                    Suggested activities:
                                </p>
                                <ul className="space-y-1">
                                    {suggested_activities.map((activity, index) => (
                                        <li key={index} className="text-xs text-blue-800 flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{activity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Follow-up Questions */}
                        {follow_up_questions.length > 0 && (
                            <div className="space-y-1">
                                {follow_up_questions.map((question, index) => (
                                    <p key={index} className="text-xs text-gray-600 italic">
                                        {question}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Crisis Resources - Prominent Display */}
                {isAI && crisis_flag && resource_suggestions.length > 0 && (
                    <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-2">
                            <svg
                                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-red-900 mb-2">
                                    Important Resources
                                </p>
                                <p className="text-xs text-red-800 mb-3">
                                    If you're in crisis or need immediate support, please reach out to these resources:
                                </p>
                                <div className="space-y-2">
                                    {resource_suggestions.map((resource, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded p-2 border border-red-200"
                                        >
                                            <p className="text-xs font-medium text-red-900">
                                                {resource.name || resource}
                                            </p>
                                            {resource.contact && (
                                                <p className="text-xs text-red-700 mt-1">
                                                    {resource.contact}
                                                </p>
                                            )}
                                            {resource.description && (
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {resource.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

MessageBubble.propTypes = {
    sender: PropTypes.oneOf(['user', 'ai']).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
    metadata: PropTypes.shape({
        detected_mood: PropTypes.string,
        suggested_activities: PropTypes.arrayOf(PropTypes.string),
        follow_up_questions: PropTypes.arrayOf(PropTypes.string),
        crisis_flag: PropTypes.bool,
        resource_suggestions: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    name: PropTypes.string,
                    contact: PropTypes.string,
                    description: PropTypes.string,
                }),
            ])
        ),
    }),
};

export default MessageBubble;
