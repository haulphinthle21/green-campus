import React from 'react';
import { useApp } from '../services/appContext';
import { FTU_LOGO_URL } from '../constants';

const GamificationBanner: React.FC = () => {
  const { state } = useApp();
  
  // Calculate progress based on state points
  const points = state.stats.points; 
  // Simple level logic: 500 points per level
  const nextLevel = Math.ceil((points + 1) / 500) * 500;
  
  // Calculate absolute percentage for the bar to match visual "1250 / 1500" logic
  // (1250 / 1500 = 83%, matching the visual length in the design)
  const progressPercent = Math.max(5, Math.min(100, (points / nextLevel) * 100));

  return (
    <div className="bg-[#047857] rounded-2xl p-4 text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
       {/* Decorative bg elements */}
       <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
       <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
       
       <div className="relative z-10">
          {/* Header Row: Logo & Info */}
          <div className="flex items-center gap-3 mb-3">
              {/* Logo */}
              <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md shrink-0 border-2 border-emerald-400/30">
                 <img 
                   src={FTU_LOGO_URL} 
                   alt="FTU" 
                   className="w-full h-full object-contain" 
                 />
              </div>

              {/* Text Info */}
              <div className="flex-1">
                 <p className="text-[9px] font-bold opacity-80 uppercase tracking-wider text-emerald-100 mb-0.5">FTU Green Campus</p>
                 <h3 className="font-bold text-base leading-tight">Tiến độ điểm rèn luyện</h3>
                 <p className="text-[10px] font-medium text-emerald-100 mt-0.5 opacity-90">
                    Đạt <span className="text-white font-bold">{nextLevel} điểm</span> để cộng <span className="text-yellow-300 font-bold">+5 ĐRL</span>
                 </p>
              </div>
          </div>

          {/* Progress Bar Row */}
          <div className="space-y-1.5">
              <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                 <div 
                    className="h-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-yellow-300 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.6)] relative transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                 >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                 </div>
              </div>
              
              <div className="flex justify-between items-start pt-0.5">
                 <p className="text-[9px] font-medium text-emerald-100 italic pr-2 leading-tight max-w-[75%]">
                    • Quote: “Nature is not a place to visit. It is home.” - Gary Snyder
                 </p>
                 <p className="text-[10px] font-bold text-emerald-50 tracking-wide shrink-0">{points} / {nextLevel} điểm</p>
              </div>
          </div>
       </div>
    </div>
  );
};

export default GamificationBanner;