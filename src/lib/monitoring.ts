// Monitoring utilities for Marakbi

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  context?: Record<string, unknown>;
}

export interface ErrorMetric {
  message: string;
  stack?: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, unknown>;
}

export interface UserMetric {
  action: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  context?: Record<string, unknown>;
}

// Performance monitoring
export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.setupPerformanceObserver();
  }

  private setupPerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.recordMetric('navigation', entry.duration, {
            type: 'navigation',
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          });
        }
      }
    });

    navObserver.observe({ entryTypes: ['navigation'] });
    this.observers.push(navObserver);

    // Observe paint timing
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          this.recordMetric(entry.name, entry.startTime, {
            type: 'paint',
            paintType: entry.name,
          });
        }
      }
    });

    paintObserver.observe({ entryTypes: ['paint'] });
    this.observers.push(paintObserver);

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          this.recordMetric('resource_load', entry.duration, {
            type: 'resource',
            resourceType: resourceEntry.initiatorType,
            resourceUrl: entry.name,
            transferSize: resourceEntry.transferSize,
          });
        }
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(resourceObserver);
  }

  recordMetric(name: string, value: number, context?: Record<string, unknown>): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      context,
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendMetric(metric);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const metrics = this.metrics.filter(m => m.name === name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  private async sendMetric(metric: PerformanceMetric): Promise<void> {
    try {
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      console.warn('Failed to send metric:', error);
    }
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Error monitoring
export class ErrorMonitor {
  private errors: ErrorMetric[] = [];

  constructor() {
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', (event) => {
      this.recordError({
        message: event.error?.message || 'Unknown error',
        stack: event.error?.stack,
        severity: 'high',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        message: `Unhandled promise rejection: ${event.reason}`,
        stack: event.reason?.stack,
        severity: 'high',
        context: {
          reason: event.reason,
        },
      });
    });
  }

  recordError(error: Omit<ErrorMetric, 'timestamp'>): void {
    const errorMetric: ErrorMetric = {
      ...error,
      timestamp: Date.now(),
    };

    this.errors.push(errorMetric);

    // Keep only last 500 errors
    if (this.errors.length > 500) {
      this.errors.shift();
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendError(errorMetric);
    }
  }

  getErrors(): ErrorMetric[] {
    return [...this.errors];
  }

  getErrorCount(severity?: string): number {
    if (severity) {
      return this.errors.filter(e => e.severity === severity).length;
    }
    return this.errors.length;
  }

  private async sendError(error: ErrorMetric): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      });
    } catch (err) {
      console.warn('Failed to send error:', err);
    }
  }
}

// User behavior monitoring
export class UserMonitor {
  private actions: UserMetric[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupUserTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupUserTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page views
    this.trackAction('page_view', {
      url: window.location.href,
      referrer: document.referrer,
    });

    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        this.trackAction('click', {
          element: target.tagName,
          text: target.textContent?.trim(),
          href: target.getAttribute('href'),
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackAction('form_submit', {
        formId: form.id,
        formAction: form.action,
      });
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.trackAction('scroll_depth', {
          depth: maxScrollDepth,
        });
      }
    });
  }

  trackAction(action: string, context?: Record<string, unknown>): void {
    const userMetric: UserMetric = {
      action,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      context,
    };

    this.actions.push(userMetric);

    // Keep only last 1000 actions
    if (this.actions.length > 1000) {
      this.actions.shift();
    }

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, context);
    }
  }

  getActions(): UserMetric[] {
    return [...this.actions];
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

// Global monitoring instance
export const performanceMonitor = new PerformanceMonitor();
export const errorMonitor = new ErrorMonitor();
export const userMonitor = new UserMonitor();

// Health check
export const performHealthCheck = async (): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  metrics: Record<string, unknown>;
}> => {
  const metrics = {
    performance: performanceMonitor.getMetrics().length,
    errors: errorMonitor.getErrorCount(),
    userActions: userMonitor.getActions().length,
    memoryUsage: (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0,
    timestamp: Date.now(),
  };

  const errorCount = errorMonitor.getErrorCount('critical');
  const performanceIssues = performanceMonitor.getAverageMetric('navigation') > 5000;

  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  if (errorCount > 10 || performanceIssues) {
    status = 'unhealthy';
  } else if (errorCount > 5 || performanceMonitor.getAverageMetric('navigation') > 3000) {
    status = 'degraded';
  }

  return { status, metrics };
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.destroy();
  });
}
