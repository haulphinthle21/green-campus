import React from 'react';
import { useApp } from '../services/appContext';

const GamificationBanner: React.FC = () => {
  const { state } = useApp();
  
  // Calculate progress based on state points
  const points = state.stats.points; 
  // Simple level logic: 500 points per level
  const nextLevel = Math.ceil((points + 1) / 500) * 500;
  const prevLevel = nextLevel - 500;
  // Calculate percentage (clamped between 5% and 100% for visual aesthetics)
  const progressPercent = Math.max(5, Math.min(100, ((points - prevLevel) / 500) * 100));

  return (
    <div className="bg-[#047857] rounded-2xl p-4 text-white shadow-lg shadow-emerald-900/10 flex items-center justify-between relative overflow-hidden">
       {/* Decorative bg circle */}
       <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
       
       <div className="flex items-center space-x-3 z-10">
          {/* Logo Container */}
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border-2 border-emerald-400/50 shrink-0">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Logo_Truong_Dai_hoc_Ngoai_thuong.png/600px-Logo_Truong_Dai_hoc_Ngoai_thuong.png" 
               alt="FTU Green Campus" 
               className="w-full h-full object-cover p-0.5" 
             />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider truncate">FTU Green Campus</p>
            <p className="font-bold text-sm leading-tight">Tiến độ điểm rèn luyện</p>
          </div>
       </div>

       <div className="flex-1 ml-4 z-10 max-w-[120px]">
          <div className="flex justify-between text-[10px] font-medium mb-1 opacity-90">
             <span>Đạt {nextLevel} điểm để cộng +5 ĐRL</span>
          </div>
          <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
             <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.5)] transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
             ></div>
          </div>
          <p className="text-[10px] mt-1 text-right font-bold text-emerald-100">{points} / {nextLevel} điểm</p>
       </div>
    </div>
  );
};

export default GamificationBanner;