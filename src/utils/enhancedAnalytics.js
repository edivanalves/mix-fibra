// Enhanced Analytics with Heatmaps and User Behavior
class EnhancedAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.interactions = [];
    this.scrollDepth = 0;
    this.timeOnPage = 0;
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track user interactions with heatmap data
  trackInteraction(element, type, data = {}) {
    const rect = element.getBoundingClientRect();
    const interaction = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      type: type,
      element: {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        text: element.textContent?.substring(0, 100)
      },
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      },
      ...data
    };

    this.interactions.push(interaction);
    this.sendToAnalytics('user_interaction', interaction);
  }

  // Track scroll heatmap
  trackScrollHeatmap() {
    let scrollTimer;
    
    const trackScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > this.scrollDepth) {
          this.scrollDepth = scrollPercent;
          this.sendToAnalytics('scroll_heatmap', {
            sessionId: this.sessionId,
            depth: scrollPercent,
            timestamp: Date.now(),
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            }
          });
        }
      }, 100);
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  // Track time spent on sections
  trackSectionTime() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const startTime = Date.now();
          
          entry.target.dataset.viewStart = startTime;
        } else {
          const sectionId = entry.target.id;
          const startTime = entry.target.dataset.viewStart;
          
          if (startTime) {
            const timeSpent = Date.now() - parseInt(startTime);
            this.sendToAnalytics('section_time', {
              sessionId: this.sessionId,
              section: sectionId,
              timeSpent: timeSpent,
              timestamp: Date.now()
            });
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  }

  // Track form interactions
  trackFormBehavior(formElement) {
    const formData = {
      formId: formElement.id,
      sessionId: this.sessionId,
      startTime: Date.now(),
      fields: []
    };

    formElement.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('focus', () => {
        formData.fields.push({
          name: field.name,
          type: field.type,
          action: 'focus',
          timestamp: Date.now()
        });
      });

      field.addEventListener('blur', () => {
        formData.fields.push({
          name: field.name,
          type: field.type,
          action: 'blur',
          value: field.value ? 'filled' : 'empty',
          timestamp: Date.now()
        });
      });
    });

    formElement.addEventListener('submit', () => {
      formData.submitTime = Date.now();
      formData.completionTime = formData.submitTime - formData.startTime;
      this.sendToAnalytics('form_completion', formData);
    });
  }

  // Track device and performance metrics
  trackDeviceMetrics() {
    const metrics = {
      sessionId: this.sessionId,
      device: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      },
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null,
      timestamp: Date.now()
    };

    this.sendToAnalytics('device_metrics', metrics);
  }

  // Send data to analytics service
  sendToAnalytics(eventType, data) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'enhanced_analytics',
        custom_parameters: data
      });
    }

    // Microsoft Clarity (if available)
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventType, data);
    }

    // Console log for development
    console.log('Enhanced Analytics:', eventType, data);
  }

  // Initialize all tracking
  init() {
    this.trackScrollHeatmap();
    this.trackSectionTime();
    this.trackDeviceMetrics();

    // Track clicks globally
    document.addEventListener('click', (e) => {
      this.trackInteraction(e.target, 'click');
    });

    // Track form interactions
    document.querySelectorAll('form').forEach(form => {
      this.trackFormBehavior(form);
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.timeOnPage = Date.now() - this.startTime;
      this.sendToAnalytics('session_end', {
        sessionId: this.sessionId,
        totalTime: this.timeOnPage,
        interactions: this.interactions.length,
        maxScrollDepth: this.scrollDepth
      });
    });
  }
}

export const enhancedAnalytics = new EnhancedAnalytics();