import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getOptimizedSrc = (originalSrc) => {
    const formats = ['webp', 'avif'];
    const baseSrc = originalSrc.replace(/\.[^/.]+$/, '');
    
    return {
      avif: `${baseSrc}.avif`,
      webp: `${baseSrc}.webp`,
      original: originalSrc
    };
  };

  const sources = getOptimizedSrc(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white/10 animate-pulse rounded-lg" />
      )}
      
      <picture>
        <source srcSet={sources.avif} type="image/avif" />
        <source srcSet={sources.webp} type="image/webp" />
        <img
          src={sources.original}
          alt={alt}
          loading={loading}
          sizes={sizes}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      </picture>
      
      {hasError && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-white/60">
          <span className="text-sm">Imagem não disponível</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;