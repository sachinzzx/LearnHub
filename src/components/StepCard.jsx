import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';

const StepCard = ({ step, roadmapId, index }) => {
  const { isStepComplete } = useContext(ProgressContext);
  const completed = isStepComplete(step.id);

  return (
    <div className="relative flex items-start gap-4 group">

      <div className="absolute top-8 bottom-[-2rem] left-5 w-px bg-slate-200 dark:bg-slate-700 group-last:hidden z-0"></div>

      <div className="relative z-10 flex-shrink-0 mt-1 bg-light-bg dark:bg-dark-bg py-1">
        {completed ? (
          <CheckCircle className="w-10 h-10 text-green-500 fill-green-100 dark:fill-green-900/30" />
        ) : (
          <Circle className="w-10 h-10 text-slate-300 dark:text-slate-600 fill-white dark:fill-slate-800" />
        )}
      </div>

      <Link 
        to={`/dashboard/${roadmapId}/step/${step.id}`}
        className="flex-grow glass-card p-5 hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-all duration-300 mb-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2 block">
              Step {index + 1}
            </span>
            <h4 className={`text-xl font-bold mb-2 ${completed ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
              {step.title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {step.description}
            </p>
          </div>
          <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StepCard;
