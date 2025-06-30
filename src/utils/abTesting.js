// A/B Testing System for Mix Fibra

class ABTesting {
  constructor() {
    this.tests = new Map();
    this.userId = this.getUserId();
  }

  getUserId() {
    let userId = localStorage.getItem('mixfibra-user-id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('mixfibra-user-id', userId);
    }
    return userId;
  }

  // Create A/B Test
  createTest(testName, variants, trafficSplit = 0.5) {
    this.tests.set(testName, {
      variants,
      trafficSplit,
      results: new Map()
    });
  }

  // Get variant for user
  getVariant(testName) {
    const test = this.tests.get(testName);
    if (!test) return null;

    const storageKey = `ab_test_${testName}`;
    let variant = localStorage.getItem(storageKey);

    if (!variant) {
      // Assign variant based on user hash
      const hash = this.hashCode(this.userId + testName);
      const normalizedHash = Math.abs(hash) / Math.pow(2, 31);
      
      variant = normalizedHash < test.trafficSplit ? 
        test.variants.A : test.variants.B;
      
      localStorage.setItem(storageKey, JSON.stringify(variant));
      
      // Track assignment
      this.trackEvent('ab_test_assignment', {
        test_name: testName,
        variant: variant.name || 'unknown',
        user_id: this.userId
      });
    } else {
      variant = JSON.parse(variant);
    }

    return variant;
  }

  // Track conversion
  trackConversion(testName, conversionType = 'conversion') {
    const variant = this.getVariant(testName);
    if (!variant) return;

    this.trackEvent('ab_test_conversion', {
      test_name: testName,
      variant: variant.name || 'unknown',
      conversion_type: conversionType,
      user_id: this.userId
    });
  }

  // Hash function for consistent user assignment
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Track events
  trackEvent(eventName, properties) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'ab_testing',
        custom_parameters: properties
      });
    }
    
    // Also log to console for debugging
    console.log('AB Test Event:', eventName, properties);
  }
}

// Initialize AB Testing
const abTesting = new ABTesting();

// Define tests
abTesting.createTest('hero_cta_button', {
  A: { 
    name: 'control',
    text: 'Ver Planos',
    color: 'blue',
    size: 'md'
  },
  B: { 
    name: 'variant',
    text: 'Contratar Agora!',
    color: 'orange', 
    size: 'lg'
  }
}, 0.5);

abTesting.createTest('pricing_display', {
  A: {
    name: 'monthly',
    display: 'monthly',
    highlight: false
  },
  B: {
    name: 'savings',
    display: 'yearly_savings',
    highlight: true
  }
}, 0.5);

abTesting.createTest('urgency_timer', {
  A: {
    name: 'no_timer',
    show: false
  },
  B: {
    name: 'with_timer', 
    show: true,
    hours: 24
  }
}, 0.3);

export { abTesting };

// React Hook for A/B Testing
export const useABTest = (testName) => {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    const testVariant = abTesting.getVariant(testName);
    setVariant(testVariant);
  }, [testName]);

  const trackConversion = (conversionType) => {
    abTesting.trackConversion(testName, conversionType);
  };

  return { variant, trackConversion };
};

// Import React hooks
import { useState, useEffect } from 'react';