import React, { useRef } from 'react';
import useSpaceAnalysis from '../../hooks/useSpaceAnalysis';
import PhotoPreview from './PhotoPreview';
import AnalysisResults from './AnalysisResults';

/**
 * SpacePhoto Component
 * Complete space/environment photo analysis interface
 * 
 * States:
 * 1. Permission prompt - Request camera access
 * 2. Permission denied - Show instructions to enable
 * 3. Ready to select - Show camera/upload button
 * 4. Image selected - Show preview with submit button
 * 5. Analyzing - Show loading spinner
 * 6. Results - Display analysis results
 * 
 * @param {Object} props
 * @param {Function} props.onAnalysisComplete - Callback when analysis completes successfully
 */
const SpacePhoto = ({ onAnalysisComplete }) => {
    const fileInputRef = useRef(null);

    const {
        cameraPermissionStatus,
        requestCameraPermission,
        selectedImage,
        previewUrl,
        selectImage,
        clearImage,
        isAnalyzing,
        analysisResult,
        submitImage,
        error,
        maxFileSizeMB,
    } = useSpaceAnalysis();

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            selectImage(file);
        }
    };

    const handleSubmit = async () => {
        const result = await submitImage();
        if (result && onAnalysisComplete) {
            onAnalysisComplete(result);
        }
    };

    // State 1: Permission prompt (for camera capture)
    if (cameraPermissionStatus === 'prompt' && !selectedImage) {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Space Analysis
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Analyze your environment for relaxation and well-being
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={requestCameraPermission}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        📷 Use Camera
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                    >
                        🖼️ Upload Photo
                    </button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        );
    }

    // State 2: Permission denied
    if (cameraPermissionStatus === 'denied' && !selectedImage) {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                        Camera Access Denied
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        To use camera capture, please enable camera access:
                    </p>
                    <ol className="text-sm text-gray-600 text-left list-decimal list-inside space-y-1">
                        <li>Click the lock icon in your browser's address bar</li>
                        <li>Find "Camera" in the permissions list</li>
                        <li>Change the setting to "Allow"</li>
                        <li>Refresh this page</li>
                    </ol>
                    <p className="text-sm text-gray-500 mt-3">
                        Or you can upload a photo instead:
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={requestCameraPermission}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                    >
                        Upload Photo
                    </button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Space Analysis
                </h3>
                <p className="text-sm text-gray-600">
                    {isAnalyzing ? 'Analyzing your space...' : 'Upload a photo of your environment'}
                </p>
            </div>

            {/* Error display */}
            {error && (
                <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* State 3: Ready to select */}
            {!selectedImage && !isAnalyzing && !analysisResult && (
                <div className="flex gap-3">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        📷 Select Photo
                    </button>
                </div>
            )}

            {/* State 4: Image selected - Show preview */}
            {previewUrl && !isAnalyzing && !analysisResult && (
                <div className="flex flex-col items-center gap-4 w-full">
                    <PhotoPreview previewUrl={previewUrl} onRemove={clearImage} />
                    <p className="text-xs text-gray-500">
                        Max size: {maxFileSizeMB}MB | Formats: JPEG, PNG, WebP
                    </p>
                    <button
                        onClick={handleSubmit}
                        className="w-full max-w-md px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Analyze Space
                    </button>
                </div>
            )}

            {/* State 5: Analyzing */}
            {isAnalyzing && (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">Analyzing your space...</p>
                </div>
            )}

            {/* State 6: Results */}
            {analysisResult && (
                <>
                    <AnalysisResults result={analysisResult} />
                    <button
                        onClick={clearImage}
                        className="w-full max-w-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                    >
                        Analyze Another Space
                    </button>
                </>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
};

export default SpacePhoto;
