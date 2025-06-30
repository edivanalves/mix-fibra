import React, { useState } from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  successMessage = 'Sucesso!',
  className = '',
  ...props 
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
    secondary: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white',
    outline: 'border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/10'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = (e) => {
    setIsClicked(true);
    
    // Reset animation
    setTimeout(() => setIsClicked(false), 200);
    
    // Show success state
    if (successMessage) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
    
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative overflow-hidden font-bold rounded-2xl
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
        ${variants[variant]}
        ${sizes[size]}
        ${isClicked ? 'scale-95' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Ripple Effect */}
      <div className={`
        absolute inset-0 bg-white/20 rounded-2xl transform scale-0 
        ${isClicked ? 'animate-ping' : ''}
      `} />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {showSuccess ? (
          <>
            <Check className="w-5 h-5 animate-scale-in" />
            {successMessage}
          </>
        ) : (
          <>
            {Icon && <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />}
            {children}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </span>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl" />
    </button>
  );
};

const PulseButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        relative bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-2xl
        transition-all duration-300 hover:scale-105
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-orange-500 before:to-red-500
        before:animate-pulse before:opacity-75
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        {children}
      </span>
    </button>
  );
};

const FloatingButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-2xl
        transition-all duration-300 hover:scale-105 hover:-translate-y-1
        shadow-lg hover:shadow-2xl
        animate-float
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export { AnimatedButton, PulseButton, FloatingButton };