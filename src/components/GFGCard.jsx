import React, { useContext } from 'react';
import { ExternalLink, BookOpen, Heart } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

const GFGCard = ({ article }) => {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  const favorite = isFavorite(article.url);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(article.url);
    } else {
      addFavorite({ ...article, id: article.url, type: 'gfg' });
    }
  };

  const getDifficultyColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'easy':
      case 'basic': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">

      <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-200 dark:border-slate-800 bg-[#2F8D46]/5 dark:bg-[#2F8D46]/10">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-700">
            
            <span className="font-extrabold text-[#2F8D46] text-xl tracking-tighter">GFG</span>
          </div>
          <div className="truncate">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-1.5 ${getDifficultyColor(article.difficulty)}`}>
              {article.difficulty}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-[#2F8D46] transition-colors" title={article.title}>
              {article.title}
            </h3>
          </div>
        </div>

        <button
          onClick={toggleFavorite}
          className="p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm ml-2 flex-shrink-0"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-300'}`}
          />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 flex-grow leading-relaxed">
          {article.description}
        </p>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#2F8D46] hover:bg-[#236b35] text-white font-semibold rounded-xl transition-colors text-sm shadow-md"
          >
            <BookOpen className="w-4 h-4" /> Read Article <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GFGCard;
