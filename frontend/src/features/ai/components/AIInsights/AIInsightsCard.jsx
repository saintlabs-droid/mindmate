import useWeeklyInsights from '../../hooks/useWeeklyInsights';
import WeeklySummary from './WeeklySummary';
import FocusAreas from './FocusAreas';
import Achievements from './Achievements';
import EvidenceSection from './EvidenceSection';

/**
 * AIInsightsCard Component
 * Main component for displaying weekly AI-generated insights
 * 
 * Features:
 * - Auto-fetches insights on mount
 * - Displays mood trends and dominant emotions
 * - Shows weekly summary, focus areas, and achievements
 * - Evidence-based transparency with confidence scores
 * - Handles loading and error states
 * - Displays encouraging message when insufficient data
 */
const AIInsightsCard = () => {
    const { insights, isLoading, error, refetch } = useWeeklyInsights();

    /**
     * Get mood trend icon and color based on trend value
     */
    const getMoodTrendDisplay = (trend) => {
        const trends = {
            improving: { icon: '📈', color: 'text-green-600', bg: 'bg-green-50', label: 'Improving' },
            stable: { icon: '➡️', color: 'text-blue-600', bg: 'bg-blue-50', label: 'Stable' },
            declining: { icon: '📉', color: 'text-amber-600', bg: 'bg-amber-50', label: 'Needs Attention' },
        };
        return trends[trend] || trends.stable;
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Weekly Insights
                </h3>
                
                {/* Loading State - Skeleton */}
                {isLoading && (
                    <div className="space-y-6 animate-pulse">
                        <div className="h-24 bg-gray-200 rounded-lg" />
                        <div className="h-16 bg-gray-200 rounded-lg" />
                        <div className="h-32 bg-gray-200 rounded-lg" />
                        <div className="h-24 bg-gray-200 rounded-lg" />
                        <div className="h-24 bg-gray-200 rounded-lg" />
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 mb-3">{error}</p>
                        <button
                            onClick={refetch}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Insights Content */}
                {!isLoading && !error && insights && (
                    <>
                        {/* Mood Trend Display */}
                        {insights.mood_trend && (
                            <div className="mb-6">
                                <div className={`p-4 rounded-lg ${getMoodTrendDisplay(insights.mood_trend).bg}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{getMoodTrendDisplay(insights.mood_trend).icon}</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Mood Trend</h4>
                                            <p className={`${getMoodTrendDisplay(insights.mood_trend).color} font-medium`}>
                                                {getMoodTrendDisplay(insights.mood_trend).label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dominant Emotions Display */}
                        {insights.dominant_emotions && insights.dominant_emotions.length > 0 && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3">Dominant Emotions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {insights.dominant_emotions.map((emotion, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize"
                                        >
                                            {emotion}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Weekly Summary, Focus Areas, Achievements */}
                        <div className="space-y-4">
                            <WeeklySummary summary={insights.weekly_summary} />
                            <FocusAreas focusAreas={insights.focus_areas} />
                            <Achievements achievements={insights.achievements} />
                            
                            {/* Evidence-Based Transparency */}
                            <EvidenceSection 
                                evidence={insights.evidence} 
                                overallConfidence={insights.overall_confidence}
                            />
                        </div>
                    </>
                )}

                {/* Insufficient Data Message */}
                {!isLoading && !error && !insights && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-center">
                        <span className="text-5xl mb-4 block">📊</span>
                        <h4 className="font-semibold text-indigo-900 mb-2">
                            Not Enough Data Yet
                        </h4>
                        <p className="text-indigo-700 mb-4">
                            Keep logging your moods this week! We need at least 3 entries to generate meaningful insights.
                        </p>
                        <p className="text-sm text-indigo-600">
                            Your personalized AI insights will appear here once you have enough data.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIInsightsCard;
