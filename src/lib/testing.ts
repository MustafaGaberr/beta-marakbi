// Testing utilities for Marakbi

export interface TestConfig {
  timeout?: number;
  retries?: number;
  parallel?: boolean;
  environment?: 'development' | 'staging' | 'production';
}

// Test runner
export class TestRunner {
  private config: TestConfig;
  private tests: Array<{
    name: string;
    fn: () => Promise<void> | void;
    timeout: number;
  }> = [];
  private results: Array<{
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    error?: Error;
  }> = [];

  constructor(config: TestConfig = {}) {
    this.config = {
      timeout: 5000,
      retries: 0,
      parallel: false,
      environment: 'development',
      ...config,
    };
  }

  test(name: string, fn: () => Promise<void> | void, timeout?: number): void {
    this.tests.push({
      name,
      fn,
      timeout: timeout || this.config.timeout!,
    });
  }

  async run(): Promise<{
    passed: number;
    failed: number;
    skipped: number;
    total: number;
    duration: number;
  }> {
    const startTime = Date.now();
    
    if (this.config.parallel) {
      await this.runParallel();
    } else {
      await this.runSequential();
    }

    const duration = Date.now() - startTime;
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;

    return {
      passed,
      failed,
      skipped,
      total: this.tests.length,
      duration,
    };
  }

  private async runSequential(): Promise<void> {
    for (const test of this.tests) {
      await this.runTest(test);
    }
  }

  private async runParallel(): Promise<void> {
    const promises = this.tests.map(test => this.runTest(test));
    await Promise.all(promises);
  }

  private async runTest(test: {
    name: string;
    fn: () => Promise<void> | void;
    timeout: number;
  }): Promise<void> {
    const startTime = Date.now();
    
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Test timeout')), test.timeout);
      });

      await Promise.race([test.fn(), timeoutPromise]);
      
      this.results.push({
        name: test.name,
        status: 'passed',
        duration: Date.now() - startTime,
      });
    } catch (error) {
      this.results.push({
        name: test.name,
        status: 'failed',
        duration: Date.now() - startTime,
        error: error as Error,
      });
    }
  }

  getResults(): Array<{
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    error?: Error;
  }> {
    return [...this.results];
  }
}

// Mock utilities
export const mockUtils = {
  // Mock fetch
  mockFetch: (responses: Record<string, unknown>): void => {
    if (typeof window === 'undefined') return;
    
    const originalFetch = window.fetch;
    window.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      const urlString = url.toString();
      const response = responses[urlString];
      
      if (response) {
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      return originalFetch(url, init);
    };
  },

  // Mock localStorage
  mockLocalStorage: (): void => {
    if (typeof window === 'undefined') return;
    
    const store: Record<string, string> = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          Object.keys(store).forEach(key => delete store[key]);
        },
        length: Object.keys(store).length,
        key: (index: number) => Object.keys(store)[index] || null,
      },
      writable: true,
    });
  },

  // Mock performance
  mockPerformance: (): void => {
    if (typeof window === 'undefined') return;
    
    Object.defineProperty(window, 'performance', {
      value: {
        now: () => Date.now(),
        mark: () => {},
        measure: () => {},
        getEntriesByType: () => [],
        getEntriesByName: () => [],
      },
      writable: true,
    });
  },

  // Mock IntersectionObserver
  mockIntersectionObserver: (): void => {
    if (typeof window === 'undefined') return;
    
    class MockIntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    
    Object.defineProperty(window, 'IntersectionObserver', {
      value: MockIntersectionObserver,
      writable: true,
    });
  },
};

// Test helpers
export const testHelpers = {
  // Wait for element to appear
  waitForElement: (selector: string, timeout = 5000): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  },

  // Wait for condition to be true
  waitForCondition: (condition: () => boolean, timeout = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (condition()) {
        resolve();
        return;
      }

      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval);
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error(`Condition not met within ${timeout}ms`));
      }, timeout);
    });
  },

  // Simulate user interaction
  simulateClick: (element: HTMLElement): void => {
    element.click();
  },

  simulateInput: (element: HTMLInputElement, value: string): void => {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  },

  simulateKeyPress: (element: HTMLElement, key: string): void => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
  },

  // Get computed styles
  getComputedStyles: (element: HTMLElement): CSSStyleDeclaration => {
    return window.getComputedStyle(element);
  },

  // Check if element is visible
  isVisible: (element: HTMLElement): boolean => {
    const styles = window.getComputedStyle(element);
    return (
      styles.display !== 'none' &&
      styles.visibility !== 'hidden' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    );
  },
};

// API testing utilities
export const apiTestUtils = {
  // Test API endpoint
  testEndpoint: async (
    url: string,
    options: RequestInit = {}
  ): Promise<{
    status: number;
    data: unknown;
    headers: Headers;
  }> => {
    const response = await fetch(url, options);
    const data = await response.json();
    
    return {
      status: response.status,
      data,
      headers: response.headers,
    };
  },

  // Test API with authentication
  testAuthenticatedEndpoint: async (
    url: string,
    token: string,
    options: RequestInit = {}
  ): Promise<{
    status: number;
    data: unknown;
  }> => {
    return apiTestUtils.testEndpoint(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Test API error handling
  testErrorHandling: async (
    url: string,
    expectedStatus: number
  ): Promise<boolean> => {
    try {
      const response = await fetch(url);
      return response.status === expectedStatus;
    } catch (error) {
      return false;
    }
  },
};

// Performance testing
export const performanceTestUtils = {
  // Measure function execution time
  measureExecutionTime: async <T>(
    fn: () => Promise<T> | T
  ): Promise<{ result: T; duration: number }> => {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;
    
    return { result, duration };
  },

  // Test page load performance
  testPageLoadPerformance: (): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
  }> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        resolve({
          loadTime,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        });
      });
    });
  },

  // Test memory usage
  testMemoryUsage: (): {
    used: number;
    total: number;
    limit: number;
  } | null => {
    if ('memory' in performance) {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  },
};

// Accessibility testing
export const accessibilityTestUtils = {
  // Test keyboard navigation
  testKeyboardNavigation: (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex');
    const isDisabled = element.getAttribute('disabled') !== null;
    return tabIndex !== '-1' && !isDisabled;
  },

  // Test ARIA attributes
  testAriaAttributes: (element: HTMLElement): string[] => {
    const issues: string[] = [];
    
    if (element.getAttribute('role') && !element.getAttribute('aria-label') && !element.textContent?.trim()) {
      issues.push('Element with role missing accessible name');
    }
    
    if (element.getAttribute('aria-expanded') && !element.getAttribute('aria-controls')) {
      issues.push('Element with aria-expanded missing aria-controls');
    }
    
    return issues;
  },

  // Test color contrast
  testColorContrast: (element: HTMLElement): boolean => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    // This is a simplified check - in practice, you'd use a proper contrast checker
    return color !== backgroundColor;
  },
};

// Global test runner instance
export const testRunner = new TestRunner();

// Export all testing utilities
export const testingUtils = {
  TestRunner,
  mockUtils,
  testHelpers,
  apiTestUtils,
  performanceTestUtils,
  accessibilityTestUtils,
};
