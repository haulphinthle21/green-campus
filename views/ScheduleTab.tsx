import React from 'react';
import { useApp } from '../services/appContext';
import { Clock, MapPin, Zap, Plus, Leaf, Award, CalendarPlus, ChevronRight, Grid, Printer } from 'lucide-react';
import GamificationBanner from '../components/GamificationBanner';

interface ScheduleTabProps {
  onNavigateToTodo: () => void;
  onNavigateToImpact: () => void;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ onNavigateToTodo, onNavigateToImpact }) => {
  const { state, selectClass, getClassesForDay, joinEvent } = useApp();
  
  const todayClasses = getClassesForDay('Today');
  const todayEvents = state.events.filter(e => e.date === 'Today' && e.joined);

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] relative">
      
      {/* 1. Header & Gamification Banner */}
      <div className="bg-[#FAFAFA] px-4 pt-6 pb-2 sticky top-0 z-20">
        <GamificationBanner />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 space-y-6">
        
        {/* 2. Schedule Section */}
        <section>
          <div className="mb-4 mt-2 px-1">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Lịch học hôm nay</h2>
            <p className="text-xs font-medium text-slate-500 mt-1">Lịch học & gợi ý xanh theo bối cảnh</p>
          </div>

          <div className="space-y-3">
            {todayClasses.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                   selectClass(item.id);
                   onNavigateToTodo();
                }}
                className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative group cursor-pointer active:scale-[0.98] transition-all hover:border-emerald-200"
              >
                {/* Green accent line */}
                <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-emerald-500"></div>

                <div className="flex justify-between items-start mb-2 pl-3">
                   <div className="text-xs text-gray-500 font-semibold flex items-center bg-gray-50 px-2 py-1 rounded-md">
                      {item.startTime} – {item.endTime}
                   </div>
                   <div className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold border border-emerald-100 flex items-center shadow-sm">
                      <Plus size={8} className="mr-0.5" />{item.points || 15} pts
                   </div>
                </div>

                <div className="pl-3">
                   <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{item.name}</h3>
                   <p className="text-sm text-gray-500 font-medium mb-3 flex items-center">
                     <MapPin size={12} className="mr-1" />
                     {item.location}
                   </p>
                   
                   <span className="inline-block px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-full border border-red-100">
                     Hôm nay
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Events Section */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Sự kiện hôm nay</h2>
              <p className="text-xs font-medium text-slate-500 mt-1">Sự kiện CLB/nhà trường</p>
            </div>
            <div className="px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center shadow-sm">
               <Leaf size={12} className="text-emerald-600 mr-1" />
               <span className="text-[10px] font-bold text-emerald-700">Green bonus</span>
            </div>
          </div>

          <div className="space-y-4">
             {todayEvents.length === 0 ? (
               <div className="text-center py-10 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <CalendarPlus size={20} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium mb-3">Chưa có sự kiện nào trong lịch.</p>
                  <button 
                    onClick={onNavigateToImpact}
                    className="text-xs font-bold text-emerald-600 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors shadow-sm"
                  >
                    + Thêm từ Campus Events
                  </button>
               </div>
             ) : (
               todayEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-emerald-200 transition-colors">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded-md">{event.time}</span>
                        <span className="bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-[10px] font-extrabold border border-red-100 shadow-sm">
                          +{event.points} pts
                        </span>
                     </div>

                     <h3 className="font-bold text-gray-900 text-base mb-1 mt-2">{event.title}</h3>
                     <p className="text-xs text-gray-500 font-medium mb-3">{event.organizer}</p>
                     
                     <p className="text-sm text-gray-600 mb-4 leading-relaxed bg-gray-50/50 p-2 rounded-lg border border-gray-100/50">
                       {event.description}
                     </p>

                     <div>
                        <div className="w-full px-3 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center shadow-sm">
                           <Leaf size={14} className="text-emerald-600 mr-2" />
                           <span className="text-xs font-bold text-emerald-700">Sự kiện xanh + {event.points} Điểm Xanh</span>
                        </div>
                     </div>
                  </div>
               ))
             )}
          </div>
        </section>

        {/* 4. Weekly Schedule Grid */}
        <section className="pb-4">
          <div className="flex justify-between items-end mb-4 px-1">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Lịch học trong tuần</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs font-medium text-slate-500">Tuần 02</span>
                   <span className="text-[10px] font-medium text-slate-400 bg-gray-100 px-1.5 py-0.5 rounded">[19/01 - 25/01]</span>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                 <ChevronRight size={16} />
              </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
             {/* Controls */}
             <div className="flex border-b border-gray-100 p-2 bg-gray-50/30 gap-2">
                <div className="flex-1 bg-white border border-gray-200 rounded-lg h-7 px-2 flex items-center text-[10px] text-gray-600 font-medium">Học kỳ 2 - 2025-2026</div>
                <div className="w-20 bg-emerald-50 border border-emerald-100 rounded-lg h-7 flex items-center justify-center text-[10px] text-emerald-600 font-bold gap-1 cursor-pointer hover:bg-emerald-100">
                   <Printer size={10} /> In lịch
                </div>
             </div>

             {/* Scrollable Table Container */}
             <div className="overflow-x-auto no-scrollbar relative">
                <div className="min-w-[650px] bg-white p-1"> 
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0.5 mb-0.5">
                       <div className="bg-gray-100/80 rounded flex items-center justify-center text-[9px] font-bold text-gray-500 h-8">Tiết</div>
                       {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
                           <div key={d} className={`rounded flex flex-col items-center justify-center h-8 ${i === 1 ? 'bg-emerald-50/60' : 'bg-gray-50'}`}>
                              <span className={`text-[10px] font-bold ${i === 1 ? 'text-emerald-600' : 'text-gray-700'}`}>{d}</span>
                              <span className="text-[8px] text-gray-400 font-medium">{19+i}/01</span>
                           </div>
                       ))}
                    </div>
                    
                    {/* Grid Rows */}
                    <div className="space-y-0.5">
                        {/* Morning 1 */}
                        <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0.5">
                            <div className="bg-[#059669] rounded text-white font-bold text-[9px] flex flex-col items-center justify-center py-2 h-20 shadow-sm">
                               <span>Tiết 1</span>
                               <span className="opacity-70 text-[8px] mt-0.5">06:45</span>
                            </div>
                            
                            {/* T2: Tư duy thiết kế (MOVED HERE) */}
                            <div className="bg-blue-100 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden group">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Tư duy thiết kế</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.A502</p>
                               </div>
                               <span className="text-[7px] text-blue-500 pl-1.5 font-mono mb-0.5">06:45 - 09:00</span>
                            </div>
                            
                            <div className="bg-gray-50/30 rounded"></div>
                            
                            {/* T4: Tư duy thiết kế */}
                             <div className="bg-blue-100 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden group">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Tư duy thiết kế</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.B402</p>
                               </div>
                               <span className="text-[7px] text-blue-500 pl-1.5 font-mono mb-0.5">06:45 - 09:00</span>
                            </div>

                            <div className="bg-gray-50/30 rounded"></div>
                            <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                        </div>

                        {/* Morning 2 */}
                        <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0.5">
                            <div className="bg-[#059669] rounded text-white font-bold text-[9px] flex flex-col items-center justify-center py-2 h-20 shadow-sm">
                               <span>Tiết 4</span>
                               <span className="opacity-70 text-[8px] mt-0.5">09:15</span>
                            </div>
                            
                            {/* T2: Giao dịch TMQT */}
                            <div className="bg-blue-50 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Giao dịch TMQT</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.A206</p>
                               </div>
                               <span className="text-[7px] text-blue-500 pl-1.5 font-mono mb-0.5">09:15 - 11:30</span>
                            </div>
                            
                            <div className="bg-gray-50/30 rounded"></div>

                             {/* T4: Giao dịch TMQT */}
                            <div className="bg-blue-50 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Giao dịch TMQT</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.B402</p>
                               </div>
                               <span className="text-[7px] text-blue-500 pl-1.5 font-mono mb-0.5">09:15 - 11:30</span>
                            </div>

                            <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                        </div>

                         {/* Afternoon 1 */}
                        <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0.5">
                            <div className="bg-[#059669] rounded text-white font-bold text-[9px] flex flex-col items-center justify-center py-2 h-20 shadow-sm">
                               <span>Tiết 7</span>
                               <span className="opacity-70 text-[8px] mt-0.5">12:30</span>
                            </div>
                            
                            {/* T2: Chính sách TMQT */}
                            <div className="bg-blue-50 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Chính sách TMQT</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.A305</p>
                               </div>
                               <span className="text-[7px] text-blue-500 pl-1.5 font-mono mb-0.5">12:30 - 14:45</span>
                            </div>
                            
                            <div className="bg-gray-50/30 rounded"></div>

                             {/* T4: Chính sách TMQT */}
                            <div className="bg-blue-50 border border-blue-200 rounded p-1 flex flex-col justify-between h-20 relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                               <div className="pl-1.5 pt-0.5">
                                  <p className="text-[9px] font-bold text-blue-900 leading-tight line-clamp-2">Chính sách TMQT</p>
                                  <p className="text-[8px] text-blue-700 mt-0.5 font-medium">CS2.A503</p>
                               </div>
                            </div>

                            <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                        </div>

                        {/* Afternoon 2 */}
                        <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0.5">
                            <div className="bg-[#059669] rounded text-white font-bold text-[9px] flex flex-col items-center justify-center py-2 h-20 shadow-sm">
                               <span>Tiết 10</span>
                               <span className="opacity-70 text-[8px] mt-0.5">15:00</span>
                            </div>
                            
                            {/* Empty T2 */}
                            <div className="bg-gray-50/30 rounded"></div>
                            
                            <div className="bg-gray-50/30 rounded"></div>

                             {/* Empty T4 */}
                            <div className="bg-gray-50/30 rounded"></div>

                            <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                             <div className="bg-gray-50/30 rounded"></div>
                        </div>

                    </div>
                </div>
             </div>
             
             {/* Hint */}
             <div className="bg-gray-50 py-1.5 text-center border-t border-gray-100">
                <span className="text-[9px] text-gray-400 italic">Vuốt ngang để xem chi tiết lịch học</span>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ScheduleTab;