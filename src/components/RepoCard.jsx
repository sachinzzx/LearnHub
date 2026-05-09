import React, { useContext } from 'react';
import { Star, GitFork, Code2, Heart, GitBranch, ExternalLink } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

const RepoCard = ({ repo }) => {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(repo.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">

      <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-4 overflow-hidden">
          {repo.avatar ? (
            <img 
              src={repo.avatar} 
              alt={repo.owner} 
              className="w-12 h-12 rounded-full shadow-sm bg-white"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-slate-500" />
            </div>
          )}
          <div className="truncate">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{repo.owner}</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" title={repo.title}>
              {repo.title}
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
          {repo.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-6 mt-auto">
          <div className="flex items-center gap-1.5" title="Stars">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{formatNumber(repo.stars)}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Forks">
            <GitFork className="w-4 h-4 text-slate-400" />
            <span>{formatNumber(repo.forks)}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Language">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="truncate max-w-[100px]">{repo.language}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-semibold rounded-xl transition-colors text-sm shadow-md"
          >
            <GitBranch className="w-4 h-4" /> View Repository <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
