import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatInput Component
 * Text input field with send button for chat messages
 * 
 * Features:
 * - Textarea with auto-resize
 * - Character limit (1000 characters)
 * - Send button with loading state
 * - Enter key to send (Shift+Enter for new line)
 * - Disabled state during loading
 */
const ChatInput = ({ onSend, isLoading = false, placeholder = 'Type your message...' }) => {
    const [message, setMessage] = useState('');
    const MAX_LENGTH = 1000;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!message.trim() || isLoading) {
            return;
        }

        onSend(message.trim());
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH) {
            setMessage(value);
        }
    };

    const remainingChars = MAX_LENGTH - message.length;
    const isNearLimit = remainingChars < 100;

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-end gap-2">
                {/* Text Input */}
                <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={isLoading}
                        rows={1}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        style={{
                            minHeight: '48px',
                            maxHeight: '120px',
                        }}
                    />
                    
                    {/* Character Counter */}
                    {isNearLimit && (
                        <div className="text-xs text-right mt-1">
                            <span className={remainingChars < 50 ? 'text-red-500' : 'text-gray-500'}>
                                {remainingChars} characters remaining
                            </span>
                        </div>
                    )}
                </div>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[80px]"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </div>
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
            </p>
        </form>
    );
};

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default ChatInput;
