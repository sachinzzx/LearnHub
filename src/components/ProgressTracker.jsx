import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { Trophy } from 'lucide-react';

const ProgressTracker = ({ roadmap }) => {
  const { calculateProgress } = useContext(ProgressContext);
  
  if (!roadmap || !roadmap.steps) return null;

  const progress = calculateProgress(roadmap.steps);

  return (
    <div className="glass-card p-6 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 text-slate-100 dark:text-slate-800/30">
        <Trophy className="w-32 h-32 transform rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Your Journey</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Keep going! You're making great progress in {roadmap.title}.</p>
        </div>
        
        <div className="flex flex-col items-end min-w-[200px]">
          <span className="text-2xl font-extrabold text-orange-600 dark:text-orange-400 mb-2">
            {progress}% Completed
          </span>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
