import React from 'react';
import { useApp } from '../services/appContext';
import { Clock, MapPin, Zap, Plus, Leaf, Award, CalendarPlus } from 'lucide-react';
import GamificationBanner from '../components/GamificationBanner';

interface ScheduleTabProps {
  onNavigateToTodo: () => void;
  onNavigateToImpact: () => void;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ onNavigateToTodo, onNavigateToImpact }) => {
  const { state, selectClass, getClassesForDay, joinEvent } = useApp();
  
  const todayClasses = getClassesForDay('Today');
  
  // Requirement: "Integrated over to 'schedule' when I press 'add to schedule'"
  // We filter by joined === true to only show events that the user has explicitly added.
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

                     {/* Requirement: Removed Button, Changed Tag Text */}
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

      </div>
    </div>
  );
};

export default ScheduleTab;