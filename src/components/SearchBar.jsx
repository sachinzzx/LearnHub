import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>

      <input
        type="text"
        className="input-field pl-10 py-3 text-lg"
        placeholder="Search GitHub repos & YouTube videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
    </div>
  );
};

export default SearchBar;
