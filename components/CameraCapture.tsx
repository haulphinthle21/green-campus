import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RefreshCw, Zap } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Prefer back camera
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure permissions are granted.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Add timestamp overlay (FTU Locket style)
        context.shadowColor = 'black';
        context.shadowBlur = 4;
        context.lineWidth = 3;
        
        // Date
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();

        // Bottom Left text
        context.font = 'bold 32px sans-serif';
        context.fillStyle = 'white';
        context.fillText(timeStr, 40, canvas.height - 80);
        
        context.font = '24px sans-serif';
        context.fillText(dateStr, 40, canvas.height - 40);

        // Top Right Branding
        context.textAlign = 'right';
        context.font = 'bold 24px sans-serif';
        context.fillStyle = '#34d399'; // Emerald-400
        context.fillText('FTU GREEN', canvas.width - 40, 60);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* Header */}
      <div className="absolute top-0 w-full p-4 pt-8 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-white font-bold text-lg drop-shadow-md pl-2">New Check-in</h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-900">
        {error ? (
          <div className="text-white text-center p-6 max-w-xs">
            <p className="text-red-400 mb-2 font-bold text-lg">Camera Error</p>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : !capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onLoadedMetadata={() => videoRef.current?.play()}
          />
        ) : (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 w-full pb-12 pt-24 px-10 flex justify-around items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        {!capturedImage ? (
          <button
            onClick={takePhoto}
            className="w-20 h-20 rounded-full border-[6px] border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-all active:scale-95 shadow-lg"
            aria-label="Take Photo"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-inner"></div>
          </button>
        ) : (
          <>
            <button
              onClick={handleRetake}
              className="flex flex-col items-center text-white space-y-2 group"
            >
              <div className="p-4 bg-gray-800 rounded-full group-hover:bg-gray-700 transition-colors border border-gray-700">
                <RefreshCw size={24} />
              </div>
              <span className="text-xs font-medium tracking-wide uppercase">Retake</span>
            </button>
            
            <button
              onClick={handleConfirm}
              className="flex flex-col items-center text-emerald-400 space-y-2 group"
            >
              <div className="p-5 bg-white rounded-full text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-transform">
                <Check size={32} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase text-white">Post</span>
            </button>
          </>
        )}
      </div>
      
      {/* Gamification Overlay */}
      {!capturedImage && !error && (
        <div className="absolute bottom-36 bg-emerald-900/40 backdrop-blur-md border border-emerald-500/30 text-emerald-50 px-5 py-2 rounded-full text-sm font-bold flex items-center shadow-xl">
          <Zap size={16} className="mr-2 fill-yellow-400 text-yellow-400" />
          Check-in for +15 Points
        </div>
      )}
    </div>
  );
};

export default CameraCapture;