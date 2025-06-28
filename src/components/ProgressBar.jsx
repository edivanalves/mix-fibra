import React, { useState, useEffect, memo } from 'react';

const ProgressBar = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-slate-900/20 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso da página"
    >
      <div
        className="h-full bg-gradient-to-r from-orange-400 to-cyan-400 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

export default ProgressBar;