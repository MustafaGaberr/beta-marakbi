// Caching utilities for Marakbi

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

export class CacheManager {
  private cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();
  private maxSize: number;
  private storage: 'memory' | 'localStorage' | 'sessionStorage';

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100;
    this.storage = options.storage || 'memory';
  }

  set(key: string, data: unknown, ttl = 300000): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });

    // Persist to storage if needed
    if (this.storage !== 'memory') {
      this.persistToStorage(key, data, ttl);
    }
  }

  get(key: string): unknown | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      // Try to load from storage
      if (this.storage !== 'memory') {
        return this.loadFromStorage(key);
      }
      return null;
    }

    // Check if expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
    
    if (this.storage !== 'memory') {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage;
      storage.removeItem(`cache_${key}`);
    }
  }

  clear(): void {
    this.cache.clear();
    
    if (this.storage !== 'memory') {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage;
      Object.keys(storage).forEach(key => {
        if (key.startsWith('cache_')) {
          storage.removeItem(key);
        }
      });
    }
  }

  size(): number {
    return this.cache.size;
  }

  private persistToStorage(key: string, data: unknown, ttl: number): void {
    if (typeof window === 'undefined') return;
    
    const storage = this.storage === 'localStorage' ? localStorage : sessionStorage;
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    
    try {
      storage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to persist cache to storage:', error);
    }
  }

  private loadFromStorage(key: string): unknown | null {
    if (typeof window === 'undefined') return null;
    
    const storage = this.storage === 'localStorage' ? localStorage : sessionStorage;
    
    try {
      const cached = storage.getItem(`cache_${key}`);
      if (!cached) return null;
      
      const { data, timestamp, ttl } = JSON.parse(cached);
      
      // Check if expired
      if (Date.now() - timestamp > ttl) {
        storage.removeItem(`cache_${key}`);
        return null;
      }
      
      // Update memory cache
      this.cache.set(key, { data, timestamp, ttl });
      
      return data;
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
      return null;
    }
  }
}

// Global cache instance
export const cache = new CacheManager({
  ttl: 300000, // 5 minutes
  maxSize: 100,
  storage: 'memory',
});

// API response caching
export const cacheApiResponse = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 300000
): Promise<T> => {
  // Check cache first
  const cached = cache.get(key);
  if (cached) {
    return cached as T;
  }

  // Fetch fresh data
  try {
    const data = await fetcher();
    cache.set(key, data, ttl);
    return data;
  } catch (error) {
    // Return cached data if available, even if expired
    const staleData = cache.get(key);
    if (staleData) {
      console.warn('Using stale cache data due to fetch error');
      return staleData as T;
    }
    throw error;
  }
};

// Image caching
export const cacheImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload critical images
export const preloadImages = (imageUrls: string[]): Promise<string[]> => {
  return Promise.all(imageUrls.map(cacheImage));
};

// Cache invalidation
export const invalidateCache = (pattern?: string): void => {
  if (pattern) {
    // Invalidate specific pattern - this would need to be implemented in the CacheManager class
    cache.clear();
  } else {
    // Invalidate all cache
    cache.clear();
  }
};

// Cache statistics
export const getCacheStats = () => {
  return {
    size: cache.size(),
    maxSize: 100, // Default max size
    storage: 'memory' as const,
  };
};

// Cache warming
export const warmCache = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => {
    return cacheApiResponse(`warm_${url}`, () => fetch(url).then(r => r.json()));
  });
  
  await Promise.allSettled(promises);
};

// Cache cleanup
export const cleanupCache = (): void => {
  // This would need to be implemented in the CacheManager class
  // For now, we'll just clear the cache
  cache.clear();
};

// Auto cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupCache, 300000);
}
