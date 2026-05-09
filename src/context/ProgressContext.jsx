import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('completedSteps');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleStepComplete = (stepId) => {
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const isStepComplete = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const saveNote = (stepId, text) => {
    setNotes((prev) => ({
      ...prev,
      [stepId]: text
    }));
  };

  const getNote = (stepId) => {
    return notes[stepId] || '';
  };

  const calculateProgress = (roadmapSteps) => {
    if (!roadmapSteps || roadmapSteps.length === 0) return 0;
    const completedCount = roadmapSteps.filter(step => completedSteps.includes(step.id)).length;
    return Math.round((completedCount / roadmapSteps.length) * 100);
  };

  return (
    <ProgressContext.Provider 
      value={{ 
        completedSteps, 
        toggleStepComplete, 
        isStepComplete, 
        notes, 
        saveNote, 
        getNote,
        calculateProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
