import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState('lg');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.sm) {
        setScreenSize('xs');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < breakpoints.md) {
        setScreenSize('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < breakpoints.lg) {
        setScreenSize('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < breakpoints.xl) {
        setScreenSize('lg');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width < breakpoints['2xl']) {
        setScreenSize('xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setScreenSize('2xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  };
};