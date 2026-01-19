import React, { useState } from 'react';
import { useApp } from '../services/appContext';
import { Trophy, CheckCircle2, Clock, XCircle, Zap, X, Share2, Heart } from 'lucide-react';
import { LocketItem } from '../types';

const ImpactTab: React.FC = () => {
  const { state, joinEvent } = useApp();
  const [subTab, setSubTab] = useState<'stats' | 'events'>('stats');
  const [selectedLocket, setSelectedLocket] = useState<LocketItem | null>(null);

  // Mock data for Approval Timeline
  const approvalTimeline = [
    { id: 101, img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80', status: 'approved' },
    { id: 102, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80', status: 'approved' },
    { id: 103, img: 'https://images.unsplash.com/photo-1611273426761-53c8577a3dc7?w=400&q=80', status: 'rejected' },
    { id: 104, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=80', status: 'pending' },
  ];

  // Derived Stats
  const points = state.stats.points;
  const nextLevel = Math.ceil((points + 1) / 500) * 500;
  const progressPercent = Math.min(100, Math.max(5, (points / nextLevel) * 100));

  // Sort locket items by timestamp descending
  const sortedLocketItems = [...state.locketItems].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] relative">
      
      {/* Header */}
      <div className="pt-6 pb-2 px-4 bg-white sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">My Impact</h1>
        <div className="flex p-1 bg-gray-100/80 rounded-xl">
          <button 
            onClick={() => setSubTab('stats')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              subTab === 'stats' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Nhật Ký Green
          </button>
          <button 
             onClick={() => setSubTab('events')}
             className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              subTab === 'events' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sự kiện sắp tới
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 space-y-6 pt-4">
        
        {subTab === 'stats' ? (
          <>
            {/* 1. Green Locket Section */}
            <section className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] border border-emerald-50/50">
               <div className="mb-4 pl-1 border-l-4 border-purple-400">
                  <h2 className="text-lg font-bold text-gray-900 leading-none ml-2">Green Locket</h2>
                  <p className="text-xs font-medium text-gray-400 ml-2 mt-1">Nhật ký ảnh hoạt động xanh</p>
               </div>

               <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                  {/* Add Button */}
                  <div className="w-24 h-32 flex-shrink-0 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50/50">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                        <Zap size={16} className="text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">Add snap</span>
                  </div>

                  {sortedLocketItems.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedLocket(item)}
                      className="w-24 h-32 flex-shrink-0 relative group cursor-pointer active:scale-95 transition-transform"
                    >
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-2xl z-10"></div>
                       <img src={item.img} alt={item.user} className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm" />
                       <div className="absolute bottom-2 left-0 right-0 text-center z-20">
                          <p className="text-[10px] font-bold text-white drop-shadow-md bg-black/20 backdrop-blur-[2px] rounded-full mx-2 py-0.5">{item.user}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* 2. Stats Grid (2x2) */}
            <section className="grid grid-cols-2 gap-3">
               {/* Points Card */}
               <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-28">
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1">Tổng điểm xanh</p>
                    <p className="text-2xl font-extrabold text-slate-900">{state.stats.points}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">Quy đổi điểm rèn luyện</p>
               </div>

               {/* CO2 Card */}
               <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-28">
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1">CO₂ tiết kiệm</p>
                    <p className="text-2xl font-extrabold text-slate-900">{state.stats.co2Saved} <span className="text-sm text-gray-400 font-bold">kg</span></p>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">ước tính</p>
               </div>

               {/* Water Refill Card */}
               <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-28">
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1">Refill nước</p>
                    <p className="text-2xl font-extrabold text-slate-900">18 <span className="text-sm text-gray-400 font-bold">lần</span></p>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">~18 chai nhựa</p>
               </div>

               {/* Check-in Card */}
               <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-28">
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1">Check-in hợp lệ</p>
                    <p className="text-2xl font-extrabold text-slate-900">31</p>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">realtime</p>
               </div>
            </section>

            {/* 3. DRL Progress Bar Card */}
            <section className="bg-[#047857] rounded-3xl p-5 shadow-lg shadow-emerald-200/50 relative overflow-hidden">
               {/* Background Decor */}
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               
               <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white mb-1">Tiến độ điểm rèn luyện</h3>
                  <p className="text-[11px] text-emerald-100/90 mb-4 font-medium">
                     Đạt {nextLevel} điểm xanh để cộng <span className="text-white font-bold">+5 điểm rèn luyện</span>
                  </p>

                  <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden border border-white/10 mb-2">
                     <div 
                        className="h-full bg-gradient-to-r from-yellow-300 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(253,224,71,0.6)]" 
                        style={{ width: `${progressPercent}%` }}
                     ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-100 opacity-90">
                     <span>{state.stats.points} / {nextLevel} điểm</span>
                  </div>
               </div>
            </section>

            {/* 4. Approval Timeline */}
            <section className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] border border-gray-100">
               <div className="mb-4 pl-1 border-l-4 border-orange-400">
                  <h2 className="text-lg font-bold text-gray-900 leading-none ml-2">Timeline xét duyệt</h2>
                  <p className="text-xs font-medium text-gray-400 ml-2 mt-1">Quá trình xét duyệt green activities</p>
               </div>

               <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
                  {approvalTimeline.map((item) => (
                    <div key={item.id} className="relative flex-shrink-0 w-24">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                           <img src={item.img} alt="proof" className={`w-full h-full object-cover ${item.status === 'rejected' ? 'grayscale opacity-70' : ''}`} />
                        </div>
                        
                        {/* Status Icon Overlay */}
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                           {item.status === 'approved' && <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-100" />}
                           {item.status === 'rejected' && <XCircle size={20} className="text-red-500 fill-red-100" />}
                           {item.status === 'pending' && <Clock size={20} className="text-orange-500 fill-orange-100" />}
                        </div>
                    </div>
                  ))}
               </div>
            </section>
          </>
        ) : (
          /* Events Feed */
          <div className="space-y-4">
             {state.events.map(event => (
               <div key={event.id} className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex gap-4">
                     <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{event.title}</h3>
                           {event.isGreen && <Trophy size={14} className="text-emerald-500 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">{event.organizer}</p>
                        <button
                           onClick={() => joinEvent(event.id)}
                           disabled={event.joined}
                           className={`px-3 py-1.5 rounded-lg text-[10px] font-bold w-full transition-colors ${
                              event.joined ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-900 text-white'
                           }`}
                        >
                           {event.joined ? 'Đã thêm vào lịch' : 'Tham gia ngay'}
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Locket Item Detail Modal */}
      {selectedLocket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md h-full flex flex-col relative">
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold border border-white/30">
                     {selectedLocket.user[0]}
                  </div>
                  <div>
                     <p className="text-sm font-bold shadow-black drop-shadow-md">{selectedLocket.user}</p>
                     <p className="text-[10px] opacity-80">{new Date(selectedLocket.timestamp).toLocaleString()}</p>
                  </div>
               </div>
               <button 
                  onClick={() => setSelectedLocket(null)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center">
               <img 
                  src={selectedLocket.img} 
                  alt="Detail" 
                  className="w-full max-h-screen object-contain"
               />
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
               <div className="flex justify-between items-end">
                  <div className="text-white">
                     <p className="font-medium text-sm mb-1">{selectedLocket.caption || "Green activity check-in"}</p>
                     <div className="flex gap-2 text-[10px] opacity-70">
                        <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-200">#GreenCampus</span>
                        <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-200">#FTU</span>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all">
                        <Heart className="fill-white" size={24} />
                        <span className="text-[10px] font-bold">12</span>
                     </button>
                     <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all">
                        <Share2 size={24} />
                        <span className="text-[10px] font-bold">Share</span>
                     </button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ImpactTab;