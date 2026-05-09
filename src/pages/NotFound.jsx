import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="glass-card p-12 max-w-lg w-full">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
