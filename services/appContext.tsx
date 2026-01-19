import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, UserProfile, ClassSession, TodoItem, CheckIn, CampusEvent, LocketItem } from '../types';
import { INITIAL_USER, INITIAL_CLASSES, INITIAL_TODOS, INITIAL_EVENTS, INITIAL_LOCKET_ITEMS } from '../constants';

interface AppContextType {
  state: AppState;
  selectClass: (classId: string | null) => void;
  toggleTodo: (todoId: string) => void;
  addTodo: (text: string, courseCode: string) => void;
  joinEvent: (eventId: string) => void;
  addCheckIn: (photoUrl: string) => void;
  addLocketItem: (photoUrl: string) => void;
  getClassesForDay: (day: string) => ClassSession[];
  getNextSession: (courseCode: string) => ClassSession | undefined;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    // Try to load from local storage
    try {
      const saved = localStorage.getItem('ftu_green_app_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    // Fallback to initial state
    return {
      user: INITIAL_USER,
      stats: { points: 1250, streak: 5, co2Saved: 12.4 },
      selectedClassId: null,
      history: [],
      todos: INITIAL_TODOS,
      events: INITIAL_EVENTS,
      locketItems: INITIAL_LOCKET_ITEMS
    };
  });

  // Persist state on every change
  useEffect(() => {
    localStorage.setItem('ftu_green_app_v1', JSON.stringify(state));
  }, [state]);

  const selectClass = (classId: string | null) => {
    setState(prev => ({ ...prev, selectedClassId: classId }));
  };

  const toggleTodo = (todoId: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(t => 
        t.id === todoId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    }));
  };

  const addTodo = (text: string, courseCode: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      courseCode,
      text,
      isCompleted: false,
      isGreenTask: false
    };
    setState(prev => ({ ...prev, todos: [newTodo, ...prev.todos] })); // Add to top
  };

  const joinEvent = (eventId: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(e => 
        e.id === eventId ? { ...e, joined: !e.joined } : e
      )
    }));
  };

  const addCheckIn = (photoUrl: string) => {
    const pointsEarned = 15;
    const co2Earned = 0.5; // 0.5kg assumed
    
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      photoUrl,
      pointsEarned,
      co2Saved: co2Earned
    };

    setState(prev => ({
      ...prev,
      stats: {
        points: prev.stats.points + pointsEarned,
        streak: prev.stats.streak + 1,
        co2Saved: parseFloat((prev.stats.co2Saved + co2Earned).toFixed(2))
      },
      history: [newCheckIn, ...prev.history]
    }));
  };

  const addLocketItem = (photoUrl: string) => {
    const newItem: LocketItem = {
      id: Date.now().toString(),
      user: 'You',
      img: photoUrl,
      type: 'self',
      timestamp: Date.now(),
      caption: 'Green Check-in'
    };
    setState(prev => ({
      ...prev,
      locketItems: [newItem, ...prev.locketItems]
    }));
  };

  const getClassesForDay = (day: string) => {
    return INITIAL_CLASSES.filter(c => c.day === day);
  };

  // Logic to find the next session of a specific course (e.g., if today is Tue, find Thu session)
  const getNextSession = (courseCode: string) => {
    // In a real app, this would check dates. For this demo, we check if there is a session
    // in the list that is NOT the currently selected one, or is on a future day ('Tomorrow').
    // We prioritize 'Tomorrow'.
    return INITIAL_CLASSES.find(c => 
      c.courseCode === courseCode && 
      c.day !== 'Today'
    );
  };

  const resetData = () => {
    localStorage.removeItem('ftu_green_app_v1');
    window.location.reload();
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      selectClass, 
      toggleTodo, 
      addTodo, 
      joinEvent, 
      addCheckIn,
      addLocketItem,
      getClassesForDay,
      getNextSession,
      resetData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};