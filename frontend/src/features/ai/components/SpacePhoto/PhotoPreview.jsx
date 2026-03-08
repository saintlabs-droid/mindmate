import React from 'react';

/**
 * PhotoPreview Component
 * Displays selected image with remove option
 * 
 * @param {Object} props
 * @param {string} props.previewUrl - URL for image preview
 * @param {Function} props.onRemove - Callback to remove selected image
 */
const PhotoPreview = ({ previewUrl, onRemove }) => {
    return (
        <div className="relative w-full max-w-md">
            <img
                src={previewUrl}
                alt="Space preview"
                className="w-full h-64 object-cover rounded-lg shadow"
            />
            <button
                onClick={onRemove}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Remove image"
            >
                ×
            </button>
        </div>
    );
};

export default PhotoPreview;
