import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRoadmapById } from '../data/roadmaps';
import ProgressTracker from '../components/ProgressTracker';
import StepCard from '../components/StepCard';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const data = getRoadmapById(id);
    if (!data) {
      navigate('/404');
    } else {
      setRoadmap(data);
    }
  }, [id, navigate]);

  if (!roadmap) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

      <div className="mb-8 animate-in slide-in-from-left-4 duration-500">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {roadmap.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {roadmap.description}
        </p>
      </div>

      <div className="animate-in fade-in duration-700 delay-100 fill-mode-both">
        <ProgressTracker roadmap={roadmap} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Learning Path</h2>
        <div className="space-y-2 relative">
          {roadmap.steps.map((step, index) => (
            <div key={step.id} className="animate-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
              <StepCard step={step} index={index} roadmapId={roadmap.id} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
