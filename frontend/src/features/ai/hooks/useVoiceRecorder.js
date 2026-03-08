import { useState, useRef, useEffect, useCallback } from 'react';
import { submitVoiceAnalysis } from '../api/aiApi';

/**
 * useVoiceRecorder Hook
 * Manages voice recording with MediaRecorder API, duration tracking, and analysis submission.
 * 
 * Features:
 * - Microphone permission management
 * - Real-time recording with duration tracking
 * - Auto-stop at 5-minute limit
 * - Audio playback preview
 * - Analysis submission to backend
 * 
 * @returns {Object} Voice recorder state and controls
 */
const useVoiceRecorder = () => {
    const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const durationIntervalRef = useRef(null);
    const analyserRef = useRef(null);

    const MAX_DURATION_SECONDS = 300; // 5 minutes

    /**
     * Request microphone permission from user
     */
    const requestPermission = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Stop the stream immediately after permission granted
            stream.getTracks().forEach(track => track.stop());
            
            setPermissionStatus('granted');
            return true;
        } catch (err) {
            setPermissionStatus('denied');
            setError('Microphone access denied. Please enable microphone permissions in your browser settings.');
            return false;
        }
    }, []);

    /**
     * Start recording audio
     */
    const startRecording = useCallback(async () => {
        try {
            setError(null);
            
            // Request fresh stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Create audio analyser for waveform visualization
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(analyser);
            analyserRef.current = analyser;

            // Create MediaRecorder
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4',
            });

            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                
                // Cleanup
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
            setDuration(0);

            // Start duration tracking
            durationIntervalRef.current = setInterval(() => {
                setDuration(prev => {
                    const newDuration = prev + 1;
                    
                    // Auto-stop at max duration
                    if (newDuration >= MAX_DURATION_SECONDS) {
                        stopRecording();
                    }
                    
                    return newDuration;
                });
            }, 1000);

        } catch (err) {
            setError('Failed to start recording. Please check microphone permissions.');
            console.error('Recording error:', err);
        }
    }, []);

    /**
     * Stop recording audio
     */
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            // Clear duration interval
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
                durationIntervalRef.current = null;
            }
        }
    }, [isRecording]);

    /**
     * Play recorded audio for preview
     */
    const playAudio = useCallback(() => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(err => {
                setError('Failed to play audio preview.');
                console.error('Playback error:', err);
            });
        }
    }, [audioUrl]);

    /**
     * Reset recorder state for new recording
     */
    const resetRecording = useCallback(() => {
        setAudioBlob(null);
        setAudioUrl(null);
        setDuration(0);
        setAnalysisResult(null);
        setError(null);
        audioChunksRef.current = [];
    }, []);

    /**
     * Submit recorded audio for analysis
     */
    const submitRecording = useCallback(async () => {
        if (!audioBlob) {
            setError('No audio recording to submit.');
            return null;
        }

        try {
            setIsAnalyzing(true);
            setError(null);

            // Create File object from Blob
            const audioFile = new File(
                [audioBlob],
                `recording-${Date.now()}.webm`,
                { type: audioBlob.type }
            );

            const response = await submitVoiceAnalysis(audioFile);

            if (response.success) {
                setAnalysisResult(response.data);
                return response.data;
            } else {
                throw new Error(response.error?.message || 'Analysis failed');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to analyze audio. Please try again.';
            setError(errorMessage);
            return null;
        } finally {
            setIsAnalyzing(false);
        }
    }, [audioBlob]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    return {
        // Permission state
        permissionStatus,
        requestPermission,

        // Recording state
        isRecording,
        duration,
        audioBlob,
        audioUrl,
        analyserNode: analyserRef.current,

        // Recording controls
        startRecording,
        stopRecording,
        playAudio,
        resetRecording,

        // Analysis state
        isAnalyzing,
        analysisResult,
        submitRecording,

        // Error state
        error,
    };
};

export default useVoiceRecorder;
