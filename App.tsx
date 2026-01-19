import React, { useState, useEffect } from 'react';
import { AppProvider } from './services/appContext';
import { Tab } from './types';
import BottomNav from './components/BottomNav';
import CameraCapture from './components/CameraCapture';
import ScheduleTab from './views/ScheduleTab';
import TodoTab from './views/TodoTab';
import ImpactTab from './views/ImpactTab';
import ProfileTab from './views/ProfileTab';
import LoadingScreen from './components/LoadingScreen';
import { useApp } from './services/appContext';

// Inner component to use the hook
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SCHEDULE);
  const [showCamera, setShowCamera] = useState(false);
  const { addCheckIn, addLocketItem, addApprovalItem } = useApp();

  const handleCameraCapture = (imageSrc: string, requireApproval: boolean) => {
    if (requireApproval) {
       // Option 1: Approval Mode
       addApprovalItem(imageSrc);
    } else {
       // Option 2: Standard Mode
       addCheckIn(imageSrc);
       addLocketItem(imageSrc);
    }
    
    setShowCamera(false);
    setActiveTab(Tab.IMPACT); 
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
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;