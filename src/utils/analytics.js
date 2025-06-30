// Google Analytics 4 & Performance Tracking

export const initGA = () => {
  // Google Analytics 4
  if (typeof window !== 'undefined') {
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_title: 'Mix Fibra - Internet Fibra Óptica',
      page_location: window.location.href
    });
  }
};

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href
  });
};

export const trackConversion = (action, value = 0) => {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: action,
    value: value
  });
};

export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location
  });
};

export const trackPlanView = (planName, price) => {
  trackEvent('plan_view', {
    event_category: 'plans',
    event_label: planName,
    value: price
  });
};

export const trackFormStart = (formName) => {
  trackEvent('form_start', {
    event_category: 'forms',
    event_label: formName
  });
};

export const trackPlanInterest = (planName, price) => {
  trackEvent('plan_interest', {
    event_category: 'plans',
    event_label: planName,
    value: price
  });
};

export const trackWhatsAppClick = (source = 'unknown') => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: source
  });
};

export const trackCentralClick = () => {
  trackEvent('central_click', {
    event_category: 'customer_area',
    event_label: 'sgp_access'
  });
};

// Performance Monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          request: perfData.responseStart - perfData.requestStart,
          response: perfData.responseEnd - perfData.responseStart,
          dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          load: perfData.loadEventEnd - perfData.loadEventStart,
          total: perfData.loadEventEnd - perfData.navigationStart
        };

        // Track performance metrics
        trackEvent('performance_metrics', {
          event_category: 'performance',
          custom_parameters: metrics
        });

        console.log('Performance Metrics:', metrics);
      }, 0);
    });
  }
};

// Scroll Tracking
export const trackScroll = () => {
  let maxScroll = 0;
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      trackEvent('scroll_depth', {
        event_category: 'engagement',
        event_label: `${scrollPercent}%`,
        value: scrollPercent
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};