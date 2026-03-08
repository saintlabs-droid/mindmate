import React, { useRef, useEffect } from 'react';

/**
 * AudioWaveform Component
 * Displays real-time audio waveform visualization during recording
 * 
 * @param {Object} props
 * @param {AnalyserNode|null} props.analyserNode - Web Audio API AnalyserNode for visualization
 * @param {boolean} props.isRecording - Whether currently recording
 */
const AudioWaveform = ({ analyserNode, isRecording }) => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!analyserNode || !isRecording || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isRecording) return;

            animationFrameRef.current = requestAnimationFrame(draw);

            analyserNode.getByteTimeDomainData(dataArray);

            // Clear canvas
            ctx.fillStyle = 'rgb(243, 244, 246)'; // gray-100
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw waveform
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(59, 130, 246)'; // blue-500
            ctx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [analyserNode, isRecording]);

    if (!isRecording) {
        return null;
    }

    return (
        <div className="w-full max-w-md">
            <canvas
                ref={canvasRef}
                width={400}
                height={100}
                className="w-full h-24 bg-gray-100 rounded-lg"
                aria-label="Audio waveform visualization"
            />
        </div>
    );
};

export default AudioWaveform;
