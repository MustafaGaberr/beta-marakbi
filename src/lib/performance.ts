// Performance optimization utilities for Marakbi

// Image optimization
export const optimizeImage = (src: string, width?: number, height?: number, quality = 75) => {
  if (src.startsWith('http')) {
    return src; // External images
  }
  
  // For local images, we can add optimization parameters
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  
  return `${src}?${params.toString()}`;
};

// Lazy loading utility
export const lazyLoadImage = (src: string, alt: string, className?: string) => {
  return {
    src,
    alt,
    loading: 'lazy' as const,
    className: className || '',
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.classList.add('loaded');
    }
  };
};

// Debounce utility for search inputs
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  const criticalImages = [
    '/images/carousel1.png',
    '/images/carousel2.png',
    '/images/carousel3.png',
    '/images/Rectangle 3463841.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => unknown) => {
  if (typeof window === 'undefined') return fn();
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Bundle size optimization
export const loadComponentLazy = (importFn: () => Promise<unknown>) => {
  // This would need to be implemented in a React component file
  return importFn;
};

// Memory management
export const cleanupEventListeners = (element: HTMLElement) => {
  const newElement = element.cloneNode(true) as HTMLElement;
  element.parentNode?.replaceChild(newElement, element);
  return newElement;
};

// Cache management
export const cache = new Map<string, unknown>();

export const getCachedData = <T>(key: string, fetcher: () => Promise<T>, ttl = 300000): Promise<T> => {
  const cached = cache.get(key) as { data: T; timestamp: number } | undefined;
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < ttl) {
    return Promise.resolve(cached.data);
  }
  
  return fetcher().then(data => {
    cache.set(key, { data, timestamp: now });
    return data;
  });
};

// Service Worker registration for PWA features
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  const criticalCSS = `
    .font-poppins { font-family: 'Poppins', sans-serif; }
    .font-signpainter { font-family: 'SignPainter', cursive; }
    .bg-gradient-to-t { background: linear-gradient(to top, #083872, #0A4489, #106BD8); }
    .text-amber-300 { color: #fbbf24; }
    .text-orange-300 { color: #fdba74; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};
