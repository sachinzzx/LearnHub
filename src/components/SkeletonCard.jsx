import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass-card flex flex-col h-full overflow-hidden animate-pulse border-transparent shadow-sm">

      <div className="h-48 w-full skeleton-bg relative">
        <div className="absolute bottom-3 left-3 w-20 h-6 bg-white/20 dark:bg-black/20 rounded backdrop-blur-sm"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow gap-4">

        <div className="space-y-2">
          <div className="h-5 skeleton-bg rounded w-3/4"></div>
          <div className="h-5 skeleton-bg rounded w-1/2"></div>
        </div>

        <div className="space-y-2 mt-2 flex-grow">
          <div className="h-3 skeleton-bg rounded w-full"></div>
          <div className="h-3 skeleton-bg rounded w-full"></div>
          <div className="h-3 skeleton-bg rounded w-5/6"></div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <div className="h-4 skeleton-bg rounded w-24"></div>
          <div className="h-4 skeleton-bg rounded w-16"></div>
        </div>
        
      </div>
    </div>
  );
};

export default SkeletonCard;
