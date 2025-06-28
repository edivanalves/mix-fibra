import React, { memo } from 'react';

const LoadingSpinner = memo(({ size = 'md', color = 'orange' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    cyan: 'border-cyan-500',
    white: 'border-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Carregando"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
});

export default LoadingSpinner;