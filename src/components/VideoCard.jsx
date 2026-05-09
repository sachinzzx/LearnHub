import React, { useContext } from 'react';
import { Heart, Play, MonitorPlay, Calendar, Eye, ExternalLink } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

const VideoCard = ({ video }) => {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(video.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(video.id);
    } else {
      addFavorite(video);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">

      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img 
          src={video.image} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
          <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] transform scale-75 group-hover:scale-100 transition-all duration-500 delay-100">
            <Play className="w-6 h-6 text-white ml-1 fill-white" />
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-300'}`} />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm border border-white/10 flex items-center gap-1.5">
          <MonitorPlay className="w-3.5 h-3.5 text-red-500" /> YouTube
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300" title={video.title}>
          {video.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {video.channelName.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="truncate" title={video.channelName}>{video.channelName}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-slate-400" />
            <span>{video.views}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{formatDate(video.publishDate)}</span>
          </div>
        </div>

        <a 
          href={video.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center w-full bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
        >
          Watch Videos <ExternalLink className="w-4 h-4 ml-1.5" />
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
