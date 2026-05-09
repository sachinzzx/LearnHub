import React from 'react';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  sortOption,
  setSortOption
}) => {
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Default', 'Latest', 'Most Viewed', 'Most Starred'];

  return (
    <div className="flex flex-col gap-4 my-6 p-4 glass-card">

      <div className="flex items-center flex-wrap gap-2">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-20">Category:</span>
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedCategory === 'All'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-20">Level:</span>
        {levels.map((level) => (
          <button
            key={level}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedLevel === level
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-2 pt-4 border-t border-slate-200 dark:border-slate-700/50">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-20">Sort By:</span>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                sortOption === opt
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              onClick={() => setSortOption(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default FilterBar;
