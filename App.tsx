import React, { useState } from 'react';
import { AppProvider } from './services/appContext';
import { Tab } from './types';
import BottomNav from './components/BottomNav';
import CameraCapture from './components/CameraCapture';
import ScheduleTab from './views/ScheduleTab';
import TodoTab from './views/TodoTab';
import ImpactTab from './views/ImpactTab';
import ProfileTab from './views/ProfileTab';
import { useApp } from './services/appContext';

// Inner component to use the hook
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SCHEDULE);
  const [showCamera, setShowCamera] = useState(false);
  const { addCheckIn, addLocketItem } = useApp();

  const handleCameraCapture = (imageSrc: string) => {
    // 1. Add points and history
    addCheckIn(imageSrc);
    // 2. Add to Green Locket Feed
    addLocketItem(imageSrc);
    
    setShowCamera(false);
    setActiveTab(Tab.IMPACT); // Redirect to stats to show the points and new locket item
  };

  const renderTab = () => {
    switch (activeTab) {
      case Tab.SCHEDULE:
        return (
          <ScheduleTab 
            onNavigateToTodo={() => setActiveTab(Tab.TODO)} 
            onNavigateToImpact={() => setActiveTab(Tab.IMPACT)}
          />
        );
      case Tab.TODO:
        return <TodoTab onCameraClick={() => setShowCamera(true)} />;
      case Tab.IMPACT:
        return <ImpactTab />;
      case Tab.PROFILE:
        return <ProfileTab />;
      default:
        return <ScheduleTab onNavigateToTodo={() => setActiveTab(Tab.TODO)} onNavigateToImpact={() => setActiveTab(Tab.IMPACT)} />;
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex justify-center">
      {/* Mobile Container Constraint */}
      <div className="w-full max-w-md bg-gray-50 h-full shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
           {renderTab()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav 
          currentTab={activeTab} 
          onTabChange={setActiveTab} 
          onCameraClick={() => setShowCamera(true)}
        />

        {/* Camera Modal Overlay */}
        {showCamera && (
          <CameraCapture 
            onClose={() => setShowCamera(false)} 
            onCapture={handleCameraCapture} 
          />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;