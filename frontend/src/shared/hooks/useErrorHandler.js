import { useState, useCallback } from 'react';

/**
 * useErrorHandler Hook
 * Reusable error handling for all AI features
 * 
 * Features:
 * - Error type classification
 * - User-friendly error messages
 * - Retry logic for transient failures
 * - Max retry handling
 * - Support contact suggestion
 */
const useErrorHandler = () => {
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    /**
     * Error type classification
     */
    const classifyError = (err) => {
        const message = err.message || '';
        const status = err.status || 0;

        if (status === 401 || message.includes('authentication') || message.includes('token')) {
            return 'auth';
        }

        if (status === 429 || message.includes('rate limit') || message.includes('too many')) {
            return 'rate_limit';
        }

        if (status === 400 || message.includes('validation') || message.includes('invalid')) {
            return 'validation';
        }

        if (status >= 500 || message.includes('service') || message.includes('server')) {
            return 'service';
        }

        if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
            return 'network';
        }

        return 'unknown';
    };

    /**
     * Get user-friendly error message
     */
    const getUserFriendlyMessage = (errorType, originalMessage) => {
        const messages = {
            auth: 'Your session has expired. Please log in again.',
            rate_limit: 'You\'re sending requests too quickly. Please wait a moment and try again.',
            validation: 'The information provided is invalid. Please check your input and try again.',
            service: 'Our AI service is temporarily unavailable. Please try again in a few moments.',
            network: 'Unable to connect. Please check your internet connection and try again.',
            unknown: 'Something went wrong. Please try again.',
        };

        return messages[errorType] || originalMessage || messages.unknown;
    };

    /**
     * Check if error is retryable
     */
    const isRetryable = (errorType) => {
        return ['network', 'service'].includes(errorType);
    };

    /**
     * Handle error with classification and retry logic
     */
    const handleError = useCallback((err) => {
        const errorType = classifyError(err);
        const friendlyMessage = getUserFriendlyMessage(errorType, err.message);
        const canRetry = isRetryable(errorType) && retryCount < MAX_RETRIES;

        setError({
            type: errorType,
            message: friendlyMessage,
            originalMessage: err.message,
            canRetry,
            retryCount,
            maxRetriesReached: retryCount >= MAX_RETRIES,
        });

        return {
            type: errorType,
            message: friendlyMessage,
            canRetry,
        };
    }, [retryCount]);

    /**
     * Retry the failed operation
     */
    const retry = useCallback(async (operation) => {
        if (retryCount >= MAX_RETRIES) {
            setError(prev => ({
                ...prev,
                message: 'Maximum retry attempts reached. Please contact support if the issue persists.',
                canRetry: false,
                maxRetriesReached: true,
            }));
            return null;
        }

        try {
            setRetryCount(prev => prev + 1);
            setError(null);
            
            const result = await operation();
            
            // Reset retry count on success
            setRetryCount(0);
            
            return result;
        } catch (err) {
            return handleError(err);
        }
    }, [retryCount, handleError]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
        setRetryCount(0);
    }, []);

    /**
     * Reset retry count
     */
    const resetRetryCount = useCallback(() => {
        setRetryCount(0);
    }, []);

    return {
        error,
        handleError,
        retry,
        clearError,
        resetRetryCount,
        retryCount,
        maxRetriesReached: retryCount >= MAX_RETRIES,
    };
};

export default useErrorHandler;
