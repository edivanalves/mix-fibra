// Analytics e tracking utilities
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      custom_parameter_1: properties.category || 'general',
      custom_parameter_2: properties.label || '',
      value: properties.value || 0,
      ...properties
    });
  }
  
  // Console log para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties);
  }
};

export const trackPageView = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    category: 'engagement',
    label: formName,
    success: success ? 1 : 0
  });
};

export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    category: 'interaction',
    label: buttonName,
    location
  });
};

export const trackPlanInterest = (planName) => {
  trackEvent('plan_interest', {
    category: 'conversion',
    label: planName,
    value: 1
  });
};

export const trackWhatsAppClick = (source) => {
  trackEvent('whatsapp_click', {
    category: 'contact',
    label: source,
    value: 1
  });
};