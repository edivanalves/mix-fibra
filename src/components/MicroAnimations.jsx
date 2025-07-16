import React from 'react';

// Animated CTA Button with micro-interactions
export const AnimatedCTA = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 
        text-white font-bold rounded-2xl transition-all duration-300 
        hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25
        active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-500/50
        ${className}
      `}
      {...props}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-200" />
      
      {/* Shimmer effect */}
      <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
};

// Floating card with hover effects
export const FloatingCard = ({ children, className = '', delay = 0 }) => {
  return (
    <div
      className={`
        group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20
        transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:bg-white/15
        hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Progress indicator with animation
export const ProgressIndicator = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-white/10 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      >
        <div className="h-full bg-white/30 animate-pulse" />
      </div>
    </div>
  );
};

// Bouncing icon
export const BouncingIcon = ({ icon: Icon, className = '' }) => {
  return (
    <div className={`inline-block animate-bounce ${className}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
};

// Typing animation
export const TypingAnimation = ({ text, speed = 100, className = '' }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Stagger animation container
export const StaggerContainer = ({ children, className = '', staggerDelay = 100 }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};