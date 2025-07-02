import { useEffect, useRef } from 'react';

const useSwipeNavigation = (refs) => {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const currentSectionIndex = useRef(0);

  const sections = [
    refs.homeRef,
    refs.plansRef,
    refs.solicitationRef,
    refs.contactRef
  ];

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.innerWidth > 768) return; // Only on mobile
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (window.innerWidth > 768) return; // Only on mobile
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;
      
      // Check if it's a horizontal swipe (more horizontal than vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe left - next section
          navigateToSection(1);
        } else {
          // Swipe right - previous section
          navigateToSection(-1);
        }
      }
    };

    const navigateToSection = (direction) => {
      const newIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex.current + direction));
      
      if (newIndex !== currentSectionIndex.current && sections[newIndex]?.current) {
        currentSectionIndex.current = newIndex;
        window.dispatchEvent(new CustomEvent('closeContent'));
        sections[newIndex].current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    };

    // Update current section index based on scroll position
    const updateCurrentSection = () => {
      const scrollY = window.scrollY;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((ref, index) => {
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      currentSectionIndex.current = closestIndex;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', updateCurrentSection, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', updateCurrentSection);
    };
  }, [refs]);

  return null;
};

export default useSwipeNavigation;