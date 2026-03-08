import React from 'react';

/**
 * RecordingControls Component
 * Displays recording start/stop controls with visual feedback
 * 
 * @param {Object} props
 * @param {boolean} props.isRecording - Whether currently recording
 * @param {number} props.duration - Current recording duration in seconds
 * @param {Function} props.onStart - Callback to start recording
 * @param {Function} props.onStop - Callback to stop recording
 */
const RecordingControls = ({ isRecording, duration, onStart, onStop }) => {
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {isRecording ? (
                <>
                    <button
                        onClick={onStop}
                        className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors animate-pulse"
                        aria-label="Stop recording"
                    >
                        <div className="w-8 h-8 bg-white rounded-sm" />
                    </button>
                    <div className="text-lg font-medium text-gray-700">
                        {formatDuration(duration)}
                    </div>
                    <div className="text-sm text-gray-500">
                        Recording... (max 5:00)
                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={onStart}
                        className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                        aria-label="Start recording"
                    >
                        <div className="w-6 h-6 rounded-full bg-white" />
                    </button>
                    <div className="text-sm text-gray-500">
                        Tap to start recording
                    </div>
                </>
            )}
        </div>
    );
};

export default RecordingControls;
