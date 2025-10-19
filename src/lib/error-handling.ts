// Error handling utilities for Marakbi

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
  timestamp: string;
  userAgent?: string;
  url?: string;
}

// Error boundary class
export class ErrorBoundary {
  private hasError: boolean = false;
  private error?: Error;
  private children: unknown;
  private fallback?: unknown;

  constructor(props: { children: unknown; fallback?: unknown }) {
    this.children = props.children;
    this.fallback = props.fallback;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log error to monitoring service
    logError({
      message: error.message,
      stack: error.stack,
      componentStack: (errorInfo as { componentStack?: string })?.componentStack || '',
      errorBoundary: 'ErrorBoundary',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }

  render() {
    if (this.hasError) {
      return this.fallback || null;
    }

    return this.children;
  }
}

// Error logging function
export const logError = (errorInfo: ErrorInfo) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorInfo);
  }

  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Send to your error monitoring service (e.g., Sentry, LogRocket, etc.)
    sendToMonitoringService(errorInfo);
  }
};

// Send error to monitoring service
const sendToMonitoringService = async (errorInfo: ErrorInfo) => {
  try {
    await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorInfo),
    });
  } catch (error) {
    console.error('Failed to send error to monitoring service:', error);
  }
};

// Global error handler
export const setupGlobalErrorHandling = () => {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    logError({
      message: `Unhandled promise rejection: ${event.reason}`,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    
    logError({
      message: event.error?.message || 'Unknown error',
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  });
};

// API error handler
export const handleApiError = (error: unknown, context?: string) => {
  const errorMessage = (error as { message?: string })?.message || 'An unexpected error occurred';
  
  logError({
    message: `API Error${context ? ` in ${context}` : ''}: ${errorMessage}`,
    stack: (error as { stack?: string })?.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  });

  // Return user-friendly error message
  if (error?.response?.status === 404) {
    return 'The requested resource was not found.';
  }
  
  if (error?.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  
  if (error?.response?.status === 401) {
    return 'Please log in to continue.';
  }
  
  if (error?.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }
  
  return 'Something went wrong. Please try again.';
};

// Retry mechanism for failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
};

// Error recovery strategies
export const errorRecoveryStrategies = {
  // Retry with exponential backoff
  retry: (fn: () => Promise<unknown>, maxRetries = 3) => {
    return retryRequest(fn, maxRetries);
  },
  
  // Fallback to cached data
  fallbackToCache: (cacheKey: string, fallbackData: unknown) => {
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : fallbackData;
  },
  
  // Redirect to error page
  redirectToError: (errorCode: string) => {
    window.location.href = `/error?code=${errorCode}`;
  },
  
  // Show user-friendly message
  showUserMessage: (message: string) => {
    // Implement your notification system here
    console.log('User message:', message);
  },
};

// Error types
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

// Error classification
export const classifyError = (error: any): ErrorType => {
  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('fetch')) {
    return ErrorType.NETWORK;
  }
  
  if (error?.response?.status === 401) {
    return ErrorType.AUTHENTICATION;
  }
  
  if (error?.response?.status === 403) {
    return ErrorType.AUTHORIZATION;
  }
  
  if (error?.response?.status === 404) {
    return ErrorType.NOT_FOUND;
  }
  
  if (error?.response?.status >= 500) {
    return ErrorType.SERVER;
  }
  
  if (error?.response?.status >= 400) {
    return ErrorType.CLIENT;
  }
  
  return ErrorType.UNKNOWN;
};

// Error reporting
export const reportError = (error: Error, _context?: string) => {
  const errorType = classifyError(error);
  
  logError({
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  });
  
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `${errorType}: ${error.message}`,
      fatal: false,
    });
  }
};
