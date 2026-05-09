import React, { useContext } from 'react';
import { ExternalLink, Heart, BookOpen } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

const ResourceCard = ({ resource }) => {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(resource.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(resource.id);
    } else {
      addFavorite(resource);
    }
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {resource.image ? (
          <img 
            src={resource.image} 
            alt={resource.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
            <BookOpen className="w-16 h-16 text-orange-300 dark:text-zinc-500" />
          </div>
        )}
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg"
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm border border-white/10">
          {resource.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
          {resource.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
          {resource.description}
        </p>
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 py-2.5 rounded-xl transition-colors"
          >
            Read Article <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
