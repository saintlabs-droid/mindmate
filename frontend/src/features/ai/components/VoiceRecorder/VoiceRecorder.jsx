import React, { useEffect } from 'react';
import useVoiceRecorder from '../../hooks/useVoiceRecorder';
import RecordingControls from './RecordingControls';
import AudioWaveform from './AudioWaveform';

/**
 * VoiceRecorder Component
 * Complete voice recording interface with analysis submission
 * 
 * States:
 * 1. Permission prompt - Request microphone access
 * 2. Permission denied - Show instructions to enable
 * 3. Ready to record - Show record button
 * 4. Recording - Show waveform and stop button
 * 5. Playback preview - Show audio player and submit/re-record buttons
 * 6. Analyzing - Show loading spinner
 * 7. Results - Display analysis results
 * 
 * @param {Object} props
 * @param {Function} props.onAnalysisComplete - Callback when analysis completes successfully
 */
const VoiceRecorder = ({ onAnalysisComplete }) => {
    const {
        permissionStatus,
        requestPermission,
        isRecording,
        duration,
        audioUrl,
        analyserNode,
        startRecording,
        stopRecording,
        playAudio,
        resetRecording,
        isAnalyzing,
        analysisResult,
        submitRecording,
        error,
    } = useVoiceRecorder();

    // Call onAnalysisComplete when results are ready
    useEffect(() => {
        if (analysisResult && onAnalysisComplete) {
            onAnalysisComplete(analysisResult);
        }
    }, [analysisResult, onAnalysisComplete]);

    // State 1: Permission prompt
    if (permissionStatus === 'prompt') {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Voice Tone Analysis
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Record your voice to analyze your emotional tone and energy levels
                    </p>
                </div>
                <button
                    onClick={requestPermission}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    Enable Microphone
                </button>
            </div>
        );
    }

    // State 2: Permission denied
    if (permissionStatus === 'denied') {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                        Microphone Access Denied
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        To use voice analysis, please enable microphone access:
                    </p>
                    <ol className="text-sm text-gray-600 text-left list-decimal list-inside space-y-1">
                        <li>Click the lock icon in your browser's address bar</li>
                        <li>Find "Microphone" in the permissions list</li>
                        <li>Change the setting to "Allow"</li>
                        <li>Refresh this page</li>
                    </ol>
                </div>
                <button
                    onClick={requestPermission}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Voice Tone Analysis
                </h3>
                <p className="text-sm text-gray-600">
                    {isRecording ? 'Recording your voice...' : 'Record up to 5 minutes'}
                </p>
            </div>

            {/* Error display */}
            {error && (
                <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* State 4: Recording - Show waveform */}
            {isRecording && (
                <AudioWaveform analyserNode={analyserNode} isRecording={isRecording} />
            )}

            {/* State 3 & 4: Recording controls */}
            {!audioUrl && !isAnalyzing && !analysisResult && (
                <RecordingControls
                    isRecording={isRecording}
                    duration={duration}
                    onStart={startRecording}
                    onStop={stopRecording}
                />
            )}

            {/* State 5: Playback preview */}
            {audioUrl && !isAnalyzing && !analysisResult && (
                <div className="flex flex-col items-center gap-4 w-full max-w-md">
                    <audio
                        controls
                        src={audioUrl}
                        className="w-full"
                        aria-label="Recording preview"
                    />
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={resetRecording}
                            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                        >
                            Re-record
                        </button>
                        <button
                            onClick={submitRecording}
                            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            Analyze
                        </button>
                    </div>
                </div>
            )}

            {/* State 6: Analyzing */}
            {isAnalyzing && (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">Analyzing your voice tone...</p>
                </div>
            )}

            {/* State 7: Results */}
            {analysisResult && (
                <div className="w-full max-w-md space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Energy Level</h4>
                        <p className="text-blue-700 capitalize">{analysisResult.energy_level}</p>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Detected Emotions</h4>
                        <div className="flex flex-wrap gap-2">
                            {analysisResult.detected_emotions?.map((emotion, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm capitalize"
                                >
                                    {emotion}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Message for You</h4>
                        <p className="text-green-700">{analysisResult.supportive_message}</p>
                    </div>

                    <button
                        onClick={resetRecording}
                        className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                    >
                        Record Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;
