import React from 'react';
import SkeletonCard from './SkeletonCard';

const Loader = () => {
  
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full animate-in fade-in duration-500">
      {skeletons.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default Loader;
