import { useState, useCallback } from 'react';
import { submitSpaceAnalysis } from '../api/aiApi';

/**
 * useSpaceAnalysis Hook
 * Manages space/environment photo selection, validation, and analysis submission
 * 
 * Features:
 * - Camera permission management
 * - Image file selection and preview
 * - File size validation (max 10MB)
 * - Analysis submission to backend
 * 
 * @returns {Object} Space analysis state and controls
 */
const useSpaceAnalysis = () => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

    /**
     * Request camera permission from user
     */
    const requestCameraPermission = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            
            // Stop the stream immediately after permission granted
            stream.getTracks().forEach(track => track.stop());
            
            setCameraPermissionStatus('granted');
            return true;
        } catch (err) {
            setCameraPermissionStatus('denied');
            setError('Camera access denied. Please enable camera permissions in your browser settings.');
            return false;
        }
    }, []);

    /**
     * Validate file size
     */
    const validateFileSize = useCallback((file) => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setError(`Image size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller image.`);
            return false;
        }
        return true;
    }, []);

    /**
     * Validate file format
     */
    const validateFileFormat = useCallback((file) => {
        if (!ALLOWED_FORMATS.includes(file.type)) {
            setError('Invalid image format. Please use JPEG, PNG, or WebP.');
            return false;
        }
        return true;
    }, []);

    /**
     * Select image file and create preview
     */
    const selectImage = useCallback((file) => {
        setError(null);

        // Validate format
        if (!validateFileFormat(file)) {
            return false;
        }

        // Validate size
        if (!validateFileSize(file)) {
            return false;
        }

        // Create preview URL
        const url = URL.createObjectURL(file);
        setSelectedImage(file);
        setPreviewUrl(url);
        setAnalysisResult(null);

        return true;
    }, [validateFileFormat, validateFileSize]);

    /**
     * Clear selected image and reset state
     */
    const clearImage = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedImage(null);
        setPreviewUrl(null);
        setAnalysisResult(null);
        setError(null);
    }, [previewUrl]);

    /**
     * Submit selected image for analysis
     */
    const submitImage = useCallback(async () => {
        if (!selectedImage) {
            setError('No image selected to analyze.');
            return null;
        }

        try {
            setIsAnalyzing(true);
            setError(null);

            const response = await submitSpaceAnalysis(selectedImage);

            if (response.success) {
                setAnalysisResult(response.data);
                return response.data;
            } else {
                throw new Error(response.error?.message || 'Analysis failed');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to analyze space. Please try again.';
            setError(errorMessage);
            return null;
        } finally {
            setIsAnalyzing(false);
        }
    }, [selectedImage]);

    return {
        // Permission state
        cameraPermissionStatus,
        requestCameraPermission,

        // Image state
        selectedImage,
        previewUrl,
        selectImage,
        clearImage,

        // Analysis state
        isAnalyzing,
        analysisResult,
        submitImage,

        // Error state
        error,

        // Constants
        maxFileSizeMB: MAX_FILE_SIZE_MB,
        allowedFormats: ALLOWED_FORMATS,
    };
};

export default useSpaceAnalysis;
