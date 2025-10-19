// Advanced optimization utilities for Marakbi

// import { ReactNode } from 'react';

// Image optimization with WebP support
export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  height?: number, 
  quality = 80
): string => {
  if (src.startsWith('http')) return src;
  
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', 'webp');
  
  return `${src}?${params.toString()}`;
};

// Critical CSS inlining
export const getCriticalCSS = (): string => {
  return `
    .font-poppins { font-family: 'Poppins', sans-serif; }
    .font-signpainter { font-family: 'SignPainter', cursive; }
    .bg-gradient-to-t { background: linear-gradient(to top, #083872, #0A4489, #106BD8); }
    .text-amber-300 { color: #fbbf24; }
    .text-orange-300 { color: #fdba74; }
    .text-white { color: #ffffff; }
    .text-black { color: #000000; }
    .bg-blue-600 { background-color: #2563eb; }
    .bg-blue-700 { background-color: #1d4ed8; }
    .rounded-lg { border-radius: 0.5rem; }
    .transition-colors { transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out; }
    .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
    .hover\\:text-orange-300:hover { color: #fdba74; }
  `;
};

// Resource hints for performance
export const getResourceHints = (): Array<{rel: string, href: string, as?: string}> => {
  return [
    { rel: 'dns-prefetch', href: 'https://yasershaban.pythonanywhere.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', as: 'font' },
    { rel: 'preload', href: '/images/carousel1.png', as: 'image' },
    { rel: 'preload', href: '/images/Rectangle 3463841.png', as: 'image' },
  ];
};

// Bundle analysis and optimization
export const getBundleOptimizations = () => {
  return {
    // Tree shaking
    sideEffects: false,
    
    // Code splitting
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    
    // Compression
    compression: {
      algorithm: 'gzip',
      threshold: 1024,
    },
  };
};

// Memory management
export class MemoryManager {
  private static cache = new Map<string, unknown>();
  private static maxSize = 100;
  
  static set(key: string, value: unknown): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
  
  static get(key: string): unknown {
    return this.cache.get(key);
  }
  
  static clear(): void {
    this.cache.clear();
  }
  
  static size(): number {
    return this.cache.size;
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  
  static startTiming(name: string): () => void {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      
      this.metrics.get(name)!.push(duration);
      
      // Keep only last 100 measurements
      const measurements = this.metrics.get(name)!;
      if (measurements.length > 100) {
        measurements.shift();
      }
    };
  }
  
  static getAverageTime(name: string): number {
    const measurements = this.metrics.get(name) || [];
    if (measurements.length === 0) return 0;
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
  }
  
  static getMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [name, measurements] of this.metrics) {
      result[name] = this.getAverageTime(name);
    }
    return result;
  }
}

// Lazy loading with intersection observer
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Debounced scroll handler
export const createScrollHandler = (
  callback: () => void,
  delay = 100
): (() => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

// Image lazy loading utility
export const createLazyImageLoader = (
  src: string,
  alt: string,
  className: string = '',
  width?: number,
  height?: number
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = getOptimizedImageUrl(src, width, height);
    img.alt = alt;
    img.className = className;
    img.loading = 'lazy';
  });
};

// Service Worker registration
export const registerServiceWorker = async (): Promise<void> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

// PWA installation prompt
export const createPWAInstallPrompt = () => {
  let deferredPrompt: unknown = null;
  let isInstallable = false;
  
  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
    isInstallable = true;
  };
  
  const handleAppInstalled = () => {
    deferredPrompt = null;
    isInstallable = false;
  };
  
  const setupListeners = () => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
  };
  
  const removeListeners = () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.removeEventListener('appinstalled', handleAppInstalled);
  };
  
  const installApp = async (): Promise<void> => {
    if (!deferredPrompt) return;
    
    (deferredPrompt as { prompt: () => void }).prompt();
    const { outcome } = await (deferredPrompt as { userChoice: Promise<{ outcome: string }> }).userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation declined');
    }
    
    deferredPrompt = null;
    isInstallable = false;
  };
  
  return { 
    isInstallable: () => isInstallable, 
    installApp,
    setupListeners,
    removeListeners
  };
};
