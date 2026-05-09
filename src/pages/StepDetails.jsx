import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRoadmapById } from '../data/roadmaps';
import { searchResources } from '../services/api';
import { ProgressContext } from '../context/ProgressContext';
import VideoCard from '../components/VideoCard';
import RepoCard from '../components/RepoCard';
import GFGCard from '../components/GFGCard';
import Loader from '../components/Loader';
import NotesSection from '../components/NotesSection';
import { ArrowLeft, CheckCircle, Circle, MonitorPlay, GitBranch, BookOpen } from 'lucide-react';

const StepDetails = () => {
  const { roadmapId, stepId } = useParams();
  const navigate = useNavigate();
  const { isStepComplete, toggleStepComplete } = useContext(ProgressContext);
  
  const [step, setStep] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const mapData = getRoadmapById(roadmapId);
    if (!mapData) {
      navigate('/404');
      return;
    }
    setRoadmap(mapData);
    
    const stepData = mapData.steps.find(s => s.id === stepId);
    if (!stepData) {
      navigate('/404');
      return;
    }
    setStep(stepData);

    const fetchStepData = async () => {
      setLoading(true);
      try {
        
        const data = await searchResources(stepData.query);
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch step resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStepData();
  }, [roadmapId, stepId, navigate]);

  if (!step || !roadmap) return null;

  const completed = isStepComplete(step.id);
  const videos = resources.filter(r => r.type === 'youtube');
  const repos = resources.filter(r => r.type === 'github');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

      <div className="mb-10">
        <Link to={`/dashboard/${roadmap.id}`} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to {roadmap.title}
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {step.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {step.description}
            </p>
          </div>
          
          <button 
            onClick={() => toggleStepComplete(step.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-sm transition-all duration-300 font-bold border-2 flex-shrink-0 ${
              completed 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400' 
                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 hover:border-orange-500 dark:hover:border-orange-500'
            }`}
          >
            {completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-slate-400" />}
            {completed ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-12">
          
          {loading ? (
            <Loader />
          ) : (
            <>
              
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <MonitorPlay className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recommended Videos</h2>
                </div>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {videos.map(video => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No videos found for this topic.</p>
                )}
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6">
                  <GitBranch className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Related Repositories</h2>
                </div>
                {repos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {repos.map(repo => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No repositories found for this topic.</p>
                )}
              </section>

              {step.gfgLinks && step.gfgLinks.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-6 h-6 text-[#2F8D46]" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Read on GFG 📗</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {step.gfgLinks.map((article, idx) => (
                      <GFGCard key={idx} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <NotesSection stepId={step.id} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StepDetails;

