import React from 'react';

const LoadingScreen = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-blue-500/30 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white animate-pulse">
              Mix Fibra
            </h2>
            <p className="text-white/70 animate-pulse text-lg">
              Carregando experiência premium...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;