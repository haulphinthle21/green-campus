import React, { useState } from 'react';
import { useApp } from '../services/appContext';
import { Plus, Check, Camera, BookOpen, Brain, Ban, Clock, X, ListTodo } from 'lucide-react';
import { INITIAL_CLASSES } from '../constants';
import GamificationBanner from '../components/GamificationBanner';

interface TodoTabProps {
  onCameraClick: () => void;
}

const TodoTab: React.FC<TodoTabProps> = ({ onCameraClick }) => {
  const { state, toggleTodo, addTodo, getClassesForDay } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [newTask, setNewTask] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(INITIAL_CLASSES[0].courseCode);

  const todayClasses = getClassesForDay('Today');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTodo(newTask, selectedSubject); 
      setNewTask('');
      setTaskTime('');
      setIsAdding(false);
    }
  };

  // Helper to get icon based on text keywords
  const getTaskIcon = (text: string, isGreen: boolean) => {
    if (isGreen) return <Ban size={20} className="text-red-500" />;
    if (text.toLowerCase().includes('empathy') || text.toLowerCase().includes('tư duy')) return <Brain size={20} className="text-pink-500" />;
    return <BookOpen size={20} className="text-blue-400" />;
  };

  // Check for "Other" tasks
  const otherTodos = state.todos.filter(t => t.courseCode === 'OTHER');

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] relative">
      
      {/* 1. Header & Gamification Banner - Sticky */}
      <div className="pt-6 pb-2 px-4 bg-[#FAFAFA] sticky top-0 z-20">
        <GamificationBanner />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 space-y-6">
        
        {/* Page Title */}
        <div className="mt-2 px-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Todo theo môn</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">Việc học + việc xanh (Locket FTU)</p>
        </div>

        {/* 1. Quick Add Section */}
        <section className="bg-white rounded-3xl p-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] border border-emerald-50">
           <div className="flex justify-between items-start mb-3">
              <div>
                 <h3 className="text-sm font-bold text-gray-900">Quick add</h3>
                 <p className="text-[10px] text-gray-400 font-medium">Tự thêm việc (sẽ nhắc lại vào lần học sau)</p>
              </div>
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center shadow-sm transition-colors"
              >
                <Plus size={14} className="mr-1" /> Thêm
              </button>
           </div>
           
           <div className="bg-red-50/60 rounded-xl p-3 border border-red-50 text-red-400 text-[11px] italic leading-relaxed">
              Ví dụ: “Mang bình nước”, “Note bài chương 3”, “Không mua đồ nhựa sau break”
           </div>
        </section>

        {/* 2. Class Lists */}
        <section className="space-y-6">
           {todayClasses.map((cls) => {
             const classTodos = state.todos.filter(t => t.courseCode === cls.courseCode);
             if (classTodos.length === 0) return null; 

             return (
               <div key={cls.id} className="border border-emerald-100/80 rounded-3xl p-4 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.05)] bg-white">
                  {/* Class Header */}
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-[10px] text-gray-400 font-semibold mb-0.5">{cls.startTime} – {cls.endTime}</p>
                        <h3 className="text-base font-extrabold text-gray-900 leading-tight">{cls.name}</h3>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">{cls.location}</p>
                     </div>
                     <button className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors">
                        Nhắc trước giờ học
                     </button>
                  </div>

                  {/* Todo Items */}
                  <div className="space-y-3">
                     {classTodos.map(todo => (
                       <div 
                         key={todo.id}
                         className={`relative rounded-2xl p-3 border transition-all ${
                            todo.isGreenTask 
                              ? 'border-red-100 bg-white shadow-sm' 
                              : 'border-red-100 bg-white'
                         }`}
                       >
                          <div className="flex items-center gap-3">
                             {/* Icon Box */}
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${todo.isGreenTask ? 'bg-red-50' : 'bg-gray-50'}`}>
                                {getTaskIcon(todo.text, todo.isGreenTask)}
                             </div>

                             {/* Content */}
                             <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 leading-snug">{todo.text}</h4>
                                {todo.isGreenTask ? (
                                   <div className="mt-1 flex items-center text-[10px] text-gray-500">
                                      <span>Chụp realtime để cộng điểm</span>
                                   </div>
                                ) : (
                                   <p className="text-[10px] text-gray-400 mt-0.5 truncate">Ghi insight + pain points</p>
                                )}
                                {todo.isGreenTask && (
                                   <div className="mt-1.5 flex items-center text-[9px] text-gray-400 font-medium">
                                      <Clock size={10} className="mr-1" /> Trong 30 phút sau giờ học
                                   </div>
                                )}
                             </div>

                             {/* Action Button */}
                             <div className="shrink-0 ml-1">
                                {todo.isGreenTask ? (
                                   <button 
                                      onClick={onCameraClick}
                                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-emerald-600 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-200 active:scale-95 transition-transform"
                                   >
                                      <Camera size={16} className="mb-0.5" />
                                      <span className="text-[10px] font-bold">+8</span>
                                   </button>
                                ) : (
                                   <button 
                                      onClick={() => toggleTodo(todo.id)}
                                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                                         todo.isCompleted 
                                            ? 'bg-red-50 border-red-200 text-red-500' 
                                            : 'border-red-200 text-transparent hover:bg-gray-50'
                                      }`}
                                   >
                                      <Check size={16} strokeWidth={3} />
                                   </button>
                                )}
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             );
           })}

           {/* 3. Other/General Section */}
           {otherTodos.length > 0 && (
              <div className="border border-gray-100 rounded-3xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-base font-extrabold text-gray-900 leading-tight">Việc cá nhân / Khác</h3>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {otherTodos.map(todo => (
                       <div 
                         key={todo.id}
                         className={`relative rounded-2xl p-3 border transition-all ${
                            todo.isCompleted 
                              ? 'border-gray-100 bg-gray-50 opacity-70' 
                              : 'border-red-100 bg-white'
                         }`}
                       >
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-50">
                                <ListTodo size={20} className="text-gray-400" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className={`text-xs font-bold leading-snug ${todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{todo.text}</h4>
                             </div>
                             <div className="shrink-0 ml-1">
                               <button 
                                  onClick={() => toggleTodo(todo.id)}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                                     todo.isCompleted 
                                        ? 'bg-gray-100 border-gray-200 text-gray-400' 
                                        : 'border-red-200 text-transparent hover:bg-gray-50'
                                  }`}
                               >
                                  <Check size={16} strokeWidth={3} />
                               </button>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
              </div>
           )}
        </section>
      </div>

      {/* Quick Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
            <button 
               onClick={() => setIsAdding(false)}
               className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
               <X size={20} className="text-gray-500" />
            </button>
            
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Thêm đầu việc mới</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Đầu việc</label>
                  <input 
                    type="text" 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nhập tên công việc..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    autoFocus
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Thời gian</label>
                  <input 
                    type="time" 
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Môn học</label>
                  <select 
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                  >
                     {INITIAL_CLASSES.map(c => (
                        <option key={c.id} value={c.courseCode}>{c.name}</option>
                     ))}
                     {/* Added 'Khác' Option */}
                     <option value="OTHER">Khác</option>
                  </select>
               </div>

               <button 
                  type="submit"
                  className="w-full bg-[#059669] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-200 hover:bg-[#047857] active:scale-[0.98] transition-all mt-4"
               >
                  Thêm vào lịch trình
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TodoTab;