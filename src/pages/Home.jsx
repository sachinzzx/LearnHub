import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ResourceCard from '../components/ResourceCard';
import VideoCard from '../components/VideoCard';
import RepoCard from '../components/RepoCard';
import Loader from '../components/Loader';
import { searchResources } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import { SearchX, AlertCircle, Map, Code2, Binary, Server } from 'lucide-react';
import { getAllRoadmaps } from '../data/roadmaps';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortOption, setSortOption] = useState('Default');

  const roadmaps = getAllRoadmaps();

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setResources([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchResources(debouncedSearchQuery);
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [debouncedSearchQuery]);

  const categories = useMemo(() => {
    const cats = new Set(resources.map(r => r.category));
    return Array.from(cats);
  }, [resources]);

  const processedResources = useMemo(() => {
    let result = resources.filter(resource => {
      const matchCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchLevel = selectedLevel === 'All Levels' || resource.level === selectedLevel;
      return matchCategory && matchLevel;
    });

    if (sortOption !== 'Default') {
      result = [...result].sort((a, b) => {
        if (sortOption === 'Latest') {
          const dateA = new Date(a.publishDate || 0).getTime();
          const dateB = new Date(b.publishDate || 0).getTime();
          return dateB - dateA;
        }
        if (sortOption === 'Most Viewed') {
          return (b.rawViews || 0) - (a.rawViews || 0);
        }
        if (sortOption === 'Most Starred') {
          return (b.rawStars || 0) - (a.rawStars || 0);
        }
        return 0;
      });
    }

    return result;
  }, [resources, selectedCategory, selectedLevel, sortOption]);

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Code2': return <Code2 className="w-8 h-8 text-orange-500" />;
      case 'Binary': return <Binary className="w-8 h-8 text-amber-500" />;
      case 'Server': return <Server className="w-8 h-8 text-rose-500" />;
      default: return <Map className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700 fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          Welcome to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-rose-600">LearnHub</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Your guided learning platform. Choose a predefined roadmap to master a skill, or search for specific resources instantly.
        </p>
      </div>

      <div className="mb-12 space-y-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {!debouncedSearchQuery && !loading && (
        <div className="animate-in fade-in duration-700 slide-in-from-bottom-8">
          <div className="flex items-center gap-3 mb-8">
            <Map className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Structured Learning Paths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmaps.map(roadmap => (
              <Link 
                key={roadmap.id} 
                to={`/dashboard/${roadmap.id}`}
                className="glass-card p-8 group flex flex-col items-center text-center hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(roadmap.icon)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {roadmap.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {debouncedSearchQuery && (
        <div className="animate-in fade-in duration-500">
          {!loading && !error && categories.length > 0 && (
            <FilterBar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          )}

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center py-24 glass-card flex flex-col items-center justify-center border-dashed border-2 border-red-300 dark:border-red-900/30">
              <AlertCircle className="w-16 h-16 text-red-500/80 mb-4" />
              <p className="text-xl text-red-500 dark:text-red-400 font-medium mb-6">{error}</p>
              <button onClick={() => setSearchQuery('')} className="btn-primary">
                Clear Search
              </button>
            </div>
          ) : processedResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-8">
              {processedResources.map(resource => {
                if (resource.type === 'youtube') return <VideoCard key={resource.id} video={resource} />;
                if (resource.type === 'github') return <RepoCard key={resource.id} repo={resource} />;
                return <ResourceCard key={resource.id} resource={resource} />;
              })}
            </div>
          ) : (
            <div className="text-center py-24 glass-card flex flex-col items-center justify-center border-dashed border-2 border-slate-300 dark:border-slate-700">
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
                <SearchX className="w-12 h-12 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No matches found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                We couldn't find any resources matching your exact criteria. Try adjusting your search term or clearing your filters.
              </p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All Levels'); setSortOption('Default'); }} className="btn-primary">
                Clear Search and Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
