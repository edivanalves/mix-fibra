// Performance Optimization Utilities

// Lazy loading images
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/mix-fibra/imagens/logo-mix-fibra.png',
    '/mix-fibra/videos/hero-video.mp4'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.mp4') ? 'video' : 'image';
    document.head.appendChild(link);
  });
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    body { margin: 0; font-family: system-ui, sans-serif; }
    .loading { opacity: 0; }
    .loaded { opacity: 1; transition: opacity 0.3s; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'dns-prefetch', href: '//wa.me' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.keys(hint).forEach(key => {
      if (key === 'crossorigin') {
        link.crossOrigin = hint[key];
      } else {
        link[key] = hint[key];
      }
    });
    document.head.appendChild(link);
  });
};

// Service Worker registration
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/mix-fibra/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Web Vitals monitoring
export const monitorWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'LCP',
            value: Math.round(entry.startTime)
          });
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime)
          });
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'performance',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000)
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run immediately
  inlineCriticalCSS();
  addResourceHints();
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      preloadCriticalResources();
    });
  } else {
    lazyLoadImages();
    preloadCriticalResources();
  }
  
  // Run on load
  window.addEventListener('load', () => {
    registerServiceWorker();
    monitorWebVitals();
  });
};