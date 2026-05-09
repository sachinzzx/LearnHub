import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <nav className="glass-nav py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl shadow-md group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)] transition-all duration-300 transform group-hover:scale-105">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            LearnHub
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link 
            to="/favorites" 
            className={`btn-icon flex items-center gap-2 ${isFavoritesPage ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400'}`}
            title="Favorites"
          >
            <Heart className={`w-5 h-5 ${isFavoritesPage ? 'fill-red-500' : ''}`} />
            <span className="hidden sm:inline font-semibold text-sm">Favorites</span>
          </Link>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          
          <DarkModeToggle />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
