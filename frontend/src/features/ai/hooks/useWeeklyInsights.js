import { useState, useEffect, useCallback } from 'react';
import { fetchWeeklyInsights } from '../api/aiApi';

/**
 * useWeeklyInsights Hook
 * Manages weekly insights data fetching and state management
 * 
 * Features:
 * - Auto-fetch insights on mount
 * - Manual refresh capability
 * - Loading and error state management
 * - Handles insufficient data scenarios
 * 
 * @returns {Object} Weekly insights state and controls
 */
const useWeeklyInsights = () => {
    const [insights, setInsights] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch weekly insights from API
     */
    const fetchInsights = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchWeeklyInsights();

            if (response.success) {
                setInsights(response.data);
                return response.data;
            } else {
                throw new Error(response.error?.message || 'Failed to fetch insights');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to load weekly insights. Please try again.';
            setError(errorMessage);
            setInsights(null);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Auto-fetch insights when component mounts
     */
    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);

    return {
        insights,
        isLoading,
        error,
        fetchInsights,
        refetch: fetchInsights,
    };
};

export default useWeeklyInsights;
