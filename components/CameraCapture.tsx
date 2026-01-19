import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string, requireApproval: boolean) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  
  // State for Approval Option
  const [requireApproval, setRequireApproval] = useState(false);

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
        setRequireApproval(false); // Reset to default on new capture
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setRequireApproval(false);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage, requireApproval);
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
      <div className="absolute bottom-0 w-full pb-12 pt-16 px-10 flex flex-col justify-end items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent min-h-[250px]">
        
        {/* APPROVAL OPTION TOGGLE (Only visible after capture) */}
        {capturedImage && (
          <div 
            onClick={() => setRequireApproval(!requireApproval)}
            className={`mb-8 flex items-center gap-3 px-5 py-3 rounded-2xl cursor-pointer transition-all border ${
              requireApproval 
                ? 'bg-orange-500/20 border-orange-500 text-orange-200' 
                : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
            }`}
          >
             <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${requireApproval ? 'bg-orange-500 border-orange-500' : 'border-gray-400'}`}>
                {requireApproval && <Check size={14} className="text-white" />}
             </div>
             <div>
                <p className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck size={16} className={requireApproval ? "text-orange-400" : "text-gray-400"} />
                  Yêu cầu xét duyệt (BTC)
                </p>
                <p className="text-[10px] opacity-70">Gửi ảnh lên timeline xét duyệt để kiểm tra</p>
             </div>
          </div>
        )}

        <div className="flex justify-around items-center w-full">
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
                className={`flex flex-col items-center space-y-2 group ${requireApproval ? 'text-orange-400' : 'text-emerald-400'}`}
              >
                <div className={`p-5 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform relative`}>
                  {requireApproval ? (
                     <ShieldCheck size={32} strokeWidth={2.5} className="text-orange-500" />
                  ) : (
                     <Check size={32} strokeWidth={3} className="text-emerald-600" />
                  )}
                  {/* Status Indicator Dot */}
                  <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${requireApproval ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                </div>
                <span className="text-xs font-bold tracking-wide uppercase text-white">
                   {requireApproval ? 'Gửi duyệt' : 'Đăng ngay'}
                </span>
              </button>
            </>
          )}
        </div>
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