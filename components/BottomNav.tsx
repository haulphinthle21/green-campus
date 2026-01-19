import React from 'react';
import { Calendar, CheckSquare, Leaf, User, Camera } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  onCameraClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, onCameraClick }) => {
  const navItems = [
    { id: Tab.SCHEDULE, icon: Calendar, label: 'Lịch' },
    { id: Tab.TODO, icon: CheckSquare, label: 'Việc' },
    { id: 'CAMERA', icon: null, label: '' }, // Placeholder for FAB
    { id: Tab.IMPACT, icon: Leaf, label: 'Impact' },
    { id: Tab.PROFILE, icon: User, label: 'Hồ sơ' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-40 max-w-md mx-auto">
      <div className="flex justify-between items-center px-2 h-16 relative">
        
        {/* Floating Camera Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-50">
          <button 
            onClick={onCameraClick}
            className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 border-4 border-white active:scale-95 transition-transform"
            aria-label="Open Camera"
          >
            <Camera className="text-white w-8 h-8" />
          </button>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-700 whitespace-nowrap">Check-in</span>
        </div>

        {navItems.map((item) => {
          if (item.id === 'CAMERA') return <div key="spacer" className="w-12" />; // Spacer

          const isActive = currentTab === item.id;
          const Icon = item.icon!;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as Tab)}
              className={`flex flex-col items-center justify-center w-16 py-1 transition-colors ${
                isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-emerald-700' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;