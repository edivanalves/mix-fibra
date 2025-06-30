// Conversion Funnel Tracking System

class ConversionFunnel {
  constructor() {
    this.sessionId = this.getSessionId();
    this.userId = this.getUserId();
    this.funnel = [];
    this.startTime = Date.now();
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('mixfibra-session-id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('mixfibra-session-id', sessionId);
    }
    return sessionId;
  }

  getUserId() {
    let userId = localStorage.getItem('mixfibra-user-id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('mixfibra-user-id', userId);
    }
    return userId;
  }

  // Track funnel step
  trackStep(stepName, stepData = {}) {
    const step = {
      step: stepName,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.startTime,
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      ...stepData
    };

    this.funnel.push(step);
    this.sendToAnalytics(step);
    
    // Store in localStorage for persistence
    localStorage.setItem('mixfibra-funnel', JSON.stringify(this.funnel));
  }

  // Send to analytics
  sendToAnalytics(step) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'funnel_step', {
        event_category: 'conversion_funnel',
        event_label: step.step,
        custom_parameters: {
          session_id: step.sessionId,
          user_id: step.userId,
          time_from_start: step.timeFromStart,
          step_data: JSON.stringify(step)
        }
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FunnelStep', {
        step_name: step.step,
        session_id: step.sessionId,
        time_from_start: step.timeFromStart
      });
    }

    console.log('Funnel Step:', step);
  }

  // Get funnel data
  getFunnelData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      steps: this.funnel,
      totalTime: Date.now() - this.startTime,
      conversionRate: this.calculateConversionRate()
    };
  }

  // Calculate conversion rate
  calculateConversionRate() {
    const totalSteps = this.funnel.length;
    const conversions = this.funnel.filter(step => 
      step.step.includes('conversion') || 
      step.step.includes('purchase') ||
      step.step.includes('signup')
    ).length;
    
    return totalSteps > 0 ? (conversions / totalSteps) * 100 : 0;
  }

  // Track page view
  trackPageView(pageName) {
    this.trackStep('page_view', {
      page_name: pageName,
      page_title: document.title
    });
  }

  // Track interaction
  trackInteraction(element, action) {
    this.trackStep('interaction', {
      element: element,
      action: action,
      element_text: element.textContent?.substring(0, 100),
      element_class: element.className,
      element_id: element.id
    });
  }

  // Track form submission
  trackFormSubmission(formName, formData = {}) {
    this.trackStep('form_submission', {
      form_name: formName,
      form_data: formData
    });
  }

  // Track conversion
  trackConversion(conversionType, value = 0, currency = 'BRL') {
    this.trackStep('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency
    });
  }

  // Track exit intent
  trackExitIntent() {
    this.trackStep('exit_intent', {
      time_on_page: Date.now() - this.startTime,
      scroll_depth: this.getScrollDepth()
    });
  }

  // Get scroll depth
  getScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / documentHeight) * 100);
  }

  // Track time on page
  trackTimeOnPage() {
    const timeOnPage = Date.now() - this.startTime;
    this.trackStep('time_on_page', {
      time_spent: timeOnPage,
      time_spent_formatted: this.formatTime(timeOnPage)
    });
  }

  // Format time
  formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}

// Initialize conversion funnel
const conversionFunnel = new ConversionFunnel();

// Auto-track page view
if (typeof window !== 'undefined') {
  conversionFunnel.trackPageView('Home');
  
  // Track exit intent
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
      conversionFunnel.trackExitIntent();
    }
  });

  // Track time on page before unload
  window.addEventListener('beforeunload', () => {
    conversionFunnel.trackTimeOnPage();
  });

  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const currentScrollDepth = conversionFunnel.getScrollDepth();
    if (currentScrollDepth > maxScrollDepth && currentScrollDepth % 25 === 0) {
      maxScrollDepth = currentScrollDepth;
      conversionFunnel.trackStep('scroll_depth', {
        depth: currentScrollDepth
      });
    }
  }, { passive: true });
}

export { conversionFunnel };

// React Hook for Conversion Tracking
export const useConversionTracking = () => {
  const trackStep = (stepName, stepData) => {
    conversionFunnel.trackStep(stepName, stepData);
  };

  const trackInteraction = (element, action) => {
    conversionFunnel.trackInteraction(element, action);
  };

  const trackFormSubmission = (formName, formData) => {
    conversionFunnel.trackFormSubmission(formName, formData);
  };

  const trackConversion = (conversionType, value, currency) => {
    conversionFunnel.trackConversion(conversionType, value, currency);
  };

  return {
    trackStep,
    trackInteraction,
    trackFormSubmission,
    trackConversion,
    getFunnelData: () => conversionFunnel.getFunnelData()
  };
};