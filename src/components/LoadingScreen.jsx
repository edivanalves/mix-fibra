import React from 'react';

const LoadingScreen = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Speed Indicator */}
          <div className="relative mb-8">
            {/* Speedometer Circle */}
            <div className="w-32 h-32 relative mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="8"
                />
                {/* Animated Speed Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#speedGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="314"
                  className="animate-spin-fast"
                  style={{
                    animation: 'speedLoad 2s ease-in-out infinite'
                  }}
                />
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Speed Needle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-1 h-12 bg-orange-500 rounded-full origin-bottom transform"
                  style={{
                    animation: 'speedNeedle 2s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* Center Dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
              </div>
            </div>
            
            {/* Speed Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center mt-4">
                <div className="text-2xl font-black text-orange-400 animate-pulse">
                  500MB
                </div>
                <div className="text-xs text-white/60">
                  Ultra Velocidade
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Bars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-blue-500 to-orange-500 rounded-full"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animation: `speedBars 1s ease-in-out infinite ${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white">
              Mix Fibra
            </h2>
            <div className="flex items-center justify-center gap-2 text-orange-400">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-lg font-semibold">Conectando em alta velocidade...</span>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      

      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes speedLoad {
          0% { stroke-dashoffset: 314; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -314; }
        }
        
        @keyframes speedNeedle {
          0% { transform: rotate(-90deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
        
        @keyframes speedBars {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        `}} />
    </div>
  );
};

export default LoadingScreen;