// Analytics and tracking utilities for Marakbi

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Google Analytics tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_location: url,
      page_title: title,
    });
  }
};

// User engagement tracking
export const trackEngagement = (type: string, data?: unknown) => {
  trackEvent('engagement', 'user_interaction', type);
  
  // Track specific engagement types
  switch (type) {
    case 'boat_view':
      trackEvent('view_item', 'boats', (data as { boat_name?: string })?.boat_name);
      break;
    case 'booking_start':
      trackEvent('begin_checkout', 'booking', (data as { trip_type?: string })?.trip_type);
      break;
    case 'contact_form':
      trackEvent('form_submit', 'contact', 'contact_form');
      break;
    case 'newsletter_signup':
      trackEvent('sign_up', 'newsletter', 'email_signup');
      break;
    case 'app_download':
      trackEvent('download', 'app', (data as { platform?: string })?.platform);
      break;
  }
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
    });
  }
};

// Error tracking
export const trackError = (error: string, fatal = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error,
      fatal: fatal,
    });
  }
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'business', conversionType, value);
};

// Initialize analytics
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Load Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '');
};

// E-commerce tracking
export const trackPurchase = (transactionId: string, value: number, currency = 'EGP') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    });
  }
};

// Social media tracking
export const trackSocialShare = (platform: string, content: string) => {
  trackEvent('share', 'social', platform);
};

// Search tracking
export const trackSearch = (query: string, results: number) => {
  trackEvent('search', 'site_search', query, results);
};
