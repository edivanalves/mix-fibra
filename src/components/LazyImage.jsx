import React, { useState, useRef, useEffect, memo } from 'react';

const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNWE2YTk5Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMxNS41ODE3IDMwIDEyIDI2LjQxODMgMTIgMjJDMTIgMTcuNTgxNyAxNS41ODE3IDE0IDIwIDE0QzI0LjQxODMgMTQgMjggMTcuNTgxNyAyOCAyMkMyOCAyNi40MTgzIDI0LjQxODMgMzAgMjAgMzBaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPC9zdmc+',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setError(true);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-sm ${className}`}
          aria-hidden="true"
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
});

export default LazyImage;