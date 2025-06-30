import { useState, useEffect, useRef } from 'react';

export const useSwipeGestures = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const elementRef = useRef(null);

  const minSwipeDistance = threshold;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: true });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd]);

  return elementRef;
};

export const usePinchZoom = (onZoomIn, onZoomOut) => {
  const [initialDistance, setInitialDistance] = useState(null);
  const elementRef = useRef(null);

  const getDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialDistance;
      
      if (scale > 1.1 && onZoomIn) {
        onZoomIn(scale);
        setInitialDistance(currentDistance);
      } else if (scale < 0.9 && onZoomOut) {
        onZoomOut(scale);
        setInitialDistance(currentDistance);
      }
    }
  };

  const onTouchEnd = () => {
    setInitialDistance(null);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: true });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [initialDistance]);

  return elementRef;
};

export const useLongPress = (onLongPress, delay = 500) => {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef(null);
  const elementRef = useRef(null);

  const start = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      if (onLongPress) onLongPress();
    }, delay);
  };

  const stop = () => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', start, { passive: true });
    element.addEventListener('touchend', stop, { passive: true });
    element.addEventListener('touchcancel', stop, { passive: true });
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', stop);
    element.addEventListener('mouseleave', stop);

    return () => {
      element.removeEventListener('touchstart', start);
      element.removeEventListener('touchend', stop);
      element.removeEventListener('touchcancel', stop);
      element.removeEventListener('mousedown', start);
      element.removeEventListener('mouseup', stop);
      element.removeEventListener('mouseleave', stop);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return { elementRef, isPressed };
};