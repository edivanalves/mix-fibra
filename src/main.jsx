import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/animations.css';
import { initPerformanceOptimizations } from './utils/performance';

// Initialize performance optimizations
initPerformanceOptimizations();

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('🚀 Mix Fibra loaded in:', perfData.loadEventEnd - perfData.navigationStart, 'ms');
    
    // Log performance metrics
    console.log('📊 Performance Metrics:', {
      'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
      'TCP Connection': perfData.connectEnd - perfData.connectStart,
      'Request Time': perfData.responseStart - perfData.requestStart,
      'Response Time': perfData.responseEnd - perfData.responseStart,
      'DOM Processing': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
    });
  });
}

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log successful initialization
console.log('🎉 Mix Fibra App initialized successfully!');
console.log('🌐 Visit: https://edivanalves.github.io/mix-fibra');
console.log('📱 WhatsApp: (83) 99641-1187');