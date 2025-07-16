import { useState, useEffect } from 'react';

export const usePullToRefresh = (onRefresh) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    let touchStartY = 0;
    let pullThreshold = 80;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        setStartY(touchStartY);
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY > 0) {
        const currentY = e.touches[0].clientY;
        const distance = Math.max(0, currentY - touchStartY);
        setPullDistance(Math.min(distance, pullThreshold * 1.5));
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > pullThreshold) {
        setIsRefreshing(true);
        if (navigator.vibrate) navigator.vibrate(50);
        await onRefresh();
        setTimeout(() => setIsRefreshing(false), 1000);
      }
      setPullDistance(0);
      setStartY(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, pullDistance]);

  return { isRefreshing, pullDistance };
};