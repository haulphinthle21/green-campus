import React, { useEffect, useState } from 'react';
import { TreeDeciduous, Sprout } from 'lucide-react';
import { FTU_LOGO_URL } from '../constants';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total load time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200); // Slight delay at 100% before unmounting
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      
      {/* 1. Logo Section */}
      <div className="mb-12 relative">
        <div className="w-36 h-36 rounded-full bg-white shadow-xl shadow-emerald-100 flex items-center justify-center border-4 border-emerald-50 relative z-10 overflow-hidden">
           <img 
             src={FTU_LOGO_URL} 
             alt="FTU Logo" 
             className="w-full h-full object-cover"
           />
        </div>
        {/* Glow effect behind logo */}
        <div className="absolute inset-0 bg-emerald-300/20 rounded-full blur-2xl transform scale-110 -z-0"></div>
      </div>

      {/* 2. Growing Tree Animation */}
      <div className="relative mb-8">
         <div className="w-24 h-24 relative">
            {/* Background Silhouette (Gray) */}
            <TreeDeciduous 
              className="w-full h-full text-gray-100 absolute inset-0" 
              strokeWidth={1.5}
            />
            
            {/* Foreground Tree (Green) - Masked by height */}
            <div 
              className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-linear"
              style={{ height: `${progress}%` }}
            >
               {/* Important: The inner icon must be absolute bottom-0 to "fill up" correctly */}
               <TreeDeciduous 
                 className="w-24 h-24 text-emerald-600 absolute bottom-0 left-0 drop-shadow-sm" 
                 strokeWidth={1.5}
                 fill="currentColor"
                 fillOpacity={0.2}
               />
            </div>
         </div>
         
         {/* Floating Leaves Particles (Decor) */}
         {progress > 30 && (
           <Sprout className="absolute -right-4 bottom-0 text-emerald-400 w-6 h-6 animate-bounce delay-75" />
         )}
         {progress > 60 && (
           <Sprout className="absolute -left-4 bottom-2 text-emerald-300 w-4 h-4 animate-bounce delay-150" />
         )}
      </div>

      {/* 3. Progress Bar & Text */}
      <div className="w-64 max-w-full space-y-3 text-center">
         <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
         </div>
         
         <div className="flex justify-between items-center text-xs font-bold font-mono">
            <span className="text-emerald-800">LOADING...</span>
            <span className="text-emerald-600">{Math.round(progress)}%</span>
         </div>
      </div>

      {/* 4. Slogan */}
      <div className="absolute bottom-12 text-center space-y-2">
         <h2 className="text-xl font-extrabold text-emerald-800 tracking-tight">FTU Green Campus</h2>
         <p className="text-sm font-medium text-emerald-600/80 italic">~ Xanh thiệt để dẫn đầu ~</p>
      </div>

    </div>
  );
};

export default LoadingScreen;