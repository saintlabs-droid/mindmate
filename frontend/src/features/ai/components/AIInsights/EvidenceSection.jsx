/**
 * EvidenceSection Component
 * Displays evidence-based transparency for AI insights
 * 
 * Implements enterprise AI principles by showing:
 * - Source data that supports AI conclusions
 * - Confidence scores for each evidence item
 * - Overall confidence in the analysis
 * 
 * This transparency builds user trust and allows verification of AI outputs.
 */
const EvidenceSection = ({ evidence, overallConfidence }) => {
    if (!evidence || evidence.length === 0) {
        return null;
    }

    const getSourceIcon = (sourceType) => {
        const icons = {
            mood_entry: '📝',
            voice_analysis: '🎤',
            chat_message: '💬',
            space_analysis: '📸',
        };
        return icons[sourceType] || '📊';
    };

    const getSourceLabel = (sourceType) => {
        const labels = {
            mood_entry: 'Mood Entry',
            voice_analysis: 'Voice Analysis',
            chat_message: 'Chat Message',
            space_analysis: 'Space Analysis',
        };
        return labels[sourceType] || 'Data Point';
    };

    const getConfidenceColor = (confidence) => {
        if (confidence >= 0.9) return 'text-green-600 bg-green-50';
        if (confidence >= 0.7) return 'text-blue-600 bg-blue-50';
        if (confidence >= 0.5) return 'text-amber-600 bg-amber-50';
        return 'text-gray-600 bg-gray-50';
    };

    const formatConfidence = (confidence) => {
        return `${Math.round(confidence * 100)}%`;
    };

    return (
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
                    <span>🔍</span>
                    Evidence-Based Analysis
                </h4>
                {overallConfidence && (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(overallConfidence)}`}>
                        {formatConfidence(overallConfidence)} Confidence
                    </div>
                )}
            </div>

            <p className="text-sm text-indigo-700 mb-4">
                Our AI conclusions are based on your actual data. Here's what we analyzed:
            </p>

            <div className="space-y-3">
                {evidence.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg p-3 border border-indigo-100 hover:border-indigo-300 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">
                                {getSourceIcon(item.source_type)}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-xs font-medium text-indigo-600">
                                        {getSourceLabel(item.source_type)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {item.date}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">
                                    {item.detail}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-indigo-500 h-1.5 rounded-full transition-all"
                                            style={{ width: `${item.confidence * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">
                                        {formatConfidence(item.confidence)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-600">
                    <span className="font-semibold">Why we show this:</span> Transparency builds trust. 
                    Every AI insight links back to your real data, so you can verify our conclusions.
                </p>
            </div>
        </div>
    );
};

export default EvidenceSection;
