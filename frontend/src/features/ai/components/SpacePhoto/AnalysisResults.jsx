import React from 'react';

/**
 * AnalysisResults Component
 * Displays space analysis results with visual indicators
 * 
 * @param {Object} props
 * @param {Object} props.result - Space analysis result data
 */
const AnalysisResults = ({ result }) => {
    if (!result) return null;

    const getRelaxationColor = (score) => {
        if (score >= 8) return 'bg-green-500';
        if (score >= 6) return 'bg-blue-500';
        if (score >= 4) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getLightingIcon = (quality) => {
        const icons = {
            excellent: '☀️',
            good: '🌤️',
            fair: '⛅',
            poor: '☁️',
        };
        return icons[quality] || '💡';
    };

    return (
        <div className="w-full max-w-md space-y-4">
            {/* Relaxation Score */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Relaxation Score</h4>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getRelaxationColor(result.relaxation_score)} transition-all duration-500`}
                            style={{ width: `${(result.relaxation_score / 10) * 100}%` }}
                        />
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                        {result.relaxation_score}/10
                    </span>
                </div>
            </div>

            {/* Lighting Assessment */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Lighting</h4>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{getLightingIcon(result.lighting_quality)}</span>
                    <div>
                        <p className="text-amber-800 capitalize font-medium">
                            {result.lighting_quality} Quality
                        </p>
                        <p className="text-sm text-amber-700 capitalize">
                            {result.lighting_type} lighting
                        </p>
                    </div>
                </div>
            </div>

            {/* Clutter Level */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Clutter Level</h4>
                <p className="text-slate-700 capitalize">{result.clutter_level}</p>
            </div>

            {/* Calming Elements */}
            {result.calming_elements && result.calming_elements.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Calming Elements</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.calming_elements.map((element, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm capitalize"
                            >
                                {element}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Environment Tips */}
            {result.environment_tips && result.environment_tips.length > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Improvement Tips</h4>
                    <ul className="space-y-2">
                        {result.environment_tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-800">
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-sm">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Personalized Comment */}
            {result.personalized_comment && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Personal Note</h4>
                    <p className="text-purple-700">{result.personalized_comment}</p>
                </div>
            )}
        </div>
    );
};

export default AnalysisResults;
