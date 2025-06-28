import React, { memo } from 'react';

const SkeletonLoader = memo(({ 
  width = '100%', 
  height = '20px', 
  className = '',
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%]';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-[shimmer_2s_infinite] bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Carregando conteúdo"
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
});

export const SkeletonCard = memo(() => (
  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/10 animate-pulse">
    <SkeletonLoader height="160px" className="mb-3 rounded-xl" />
    <div className="flex items-center justify-center gap-2">
      <SkeletonLoader width="12px" height="12px" variant="circular" />
      <SkeletonLoader width="80px" height="20px" />
    </div>
  </div>
));

export const SkeletonText = memo(({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <SkeletonLoader 
        key={i}
        width={i === lines - 1 ? '75%' : '100%'}
        height="16px"
        variant="text"
      />
    ))}
  </div>
));

export default SkeletonLoader;