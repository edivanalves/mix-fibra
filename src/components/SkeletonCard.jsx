import React from 'react';

const SkeletonCard = ({ variant = 'default' }) => {
  const variants = {
    default: 'h-48',
    plan: 'h-64',
    testimonial: 'h-32',
    contact: 'h-40'
  };

  return (
    <div className={`animate-pulse bg-white/10 backdrop-blur-md rounded-2xl p-6 ${variants[variant]}`}>
      <div className="space-y-4">
        <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-white/15 rounded-full"></div>
          <div className="h-3 bg-white/15 rounded-full w-5/6"></div>
        </div>
        <div className="h-8 bg-white/25 rounded-xl w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;