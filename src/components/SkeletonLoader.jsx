import React from 'react';

const SkeletonLoader = ({ className = "", variant = "default" }) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl";
  
  const variants = {
    default: "h-4 w-full",
    card: "h-64 w-full",
    circle: "h-12 w-12 rounded-full",
    button: "h-12 w-32",
    title: "h-8 w-3/4",
    text: "h-4 w-full",
    hero: "h-96 w-full"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
};

const SkeletonSection = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <SkeletonLoader variant="title" className="mx-auto mb-4" />
        <SkeletonLoader variant="text" className="mx-auto max-w-2xl mb-2" />
        <SkeletonLoader variant="text" className="mx-auto max-w-xl" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <SkeletonLoader key={i} variant="card" />
        ))}
      </div>
    </div>
  );
};

export { SkeletonLoader, SkeletonSection };