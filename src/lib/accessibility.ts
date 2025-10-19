// Accessibility utilities for Marakbi

export interface AccessibilityOptions {
  enableKeyboardNavigation?: boolean;
  enableScreenReader?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
}

// Accessibility manager
export class AccessibilityManager {
  private options: AccessibilityOptions;
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex = 0;

  constructor(options: AccessibilityOptions = {}) {
    this.options = {
      enableKeyboardNavigation: true,
      enableScreenReader: true,
      enableHighContrast: false,
      enableReducedMotion: false,
      ...options,
    };

    this.setupAccessibility();
  }

  private setupAccessibility(): void {
    if (typeof window === 'undefined') return;

    // Setup keyboard navigation
    if (this.options.enableKeyboardNavigation) {
      this.setupKeyboardNavigation();
    }

    // Setup screen reader support
    if (this.options.enableScreenReader) {
      this.setupScreenReaderSupport();
    }

    // Setup high contrast mode
    if (this.options.enableHighContrast) {
      this.setupHighContrastMode();
    }

    // Setup reduced motion
    if (this.options.enableReducedMotion) {
      this.setupReducedMotion();
    }
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      } else if (event.key === 'Enter' || event.key === ' ') {
        this.handleActivation(event);
      } else if (event.key === 'Escape') {
        this.handleEscape(event);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        this.handleArrowNavigation(event);
      }
    });
  }

  private setupScreenReaderSupport(): void {
    // Add ARIA labels to interactive elements
    this.addAriaLabels();
    
    // Setup live regions for dynamic content
    this.setupLiveRegions();
  }

  private setupHighContrastMode(): void {
    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
  }

  private setupReducedMotion(): void {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    this.updateFocusableElements();
    
    if (event.shiftKey) {
      this.currentFocusIndex = Math.max(0, this.currentFocusIndex - 1);
    } else {
      this.currentFocusIndex = Math.min(
        this.focusableElements.length - 1,
        this.currentFocusIndex + 1
      );
    }

    if (this.focusableElements[this.currentFocusIndex]) {
      this.focusableElements[this.currentFocusIndex].focus();
    }
  }

  private handleActivation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      event.preventDefault();
      target.click();
    }
  }

  private handleEscape(event: KeyboardEvent): void {
    // Close modals, dropdowns, etc.
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      if (modal.getAttribute('aria-hidden') === 'false') {
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  private handleArrowNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') === 'menu' || target.getAttribute('role') === 'listbox') {
      event.preventDefault();
      // Handle arrow navigation in menus
    }
  }

  private updateFocusableElements(): void {
    this.focusableElements = Array.from(
      document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  }

  private addAriaLabels(): void {
    // Add ARIA labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });

    // Add ARIA labels to images
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
      img.setAttribute('alt', 'Image');
    });
  }

  private setupLiveRegions(): void {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  // Announce to screen readers
  announce(message: string): void {
    const liveRegion = document.querySelector('[aria-live="polite"]');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  // Focus management
  focusElement(element: HTMLElement): void {
    element.focus();
    this.announce(`Focused on ${element.textContent || element.getAttribute('aria-label') || 'element'}`);
  }

  // Skip to main content
  setupSkipLinks(): void {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Accessibility utilities
export const accessibilityUtils = {
  // Check if element is visible to screen readers
  isVisibleToScreenReader: (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      element.getAttribute('aria-hidden') !== 'true'
    );
  },

  // Get accessible name for element
  getAccessibleName: (element: HTMLElement): string => {
    return (
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim() ||
      element.getAttribute('alt') ||
      'Unlabeled element'
    );
  },

  // Check color contrast ratio
  getContrastRatio: (color1: string, color2: string): number => {
    const getLuminance = (color: string): number => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map(c => {
        const val = parseInt(c) / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Check if color combination meets WCAG standards
  meetsWCAGStandards: (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const ratio = accessibilityUtils.getContrastRatio(color1, color2);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  },

  // Generate accessible color palette
  generateAccessibleColors: (baseColor: string): string[] => {
    // This is a simplified version - in practice, you'd use a color library
    const colors = [baseColor];
    // Add lighter and darker variants
    return colors;
  },

  // Setup focus indicators
  setupFocusIndicators: (): void => {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);
  },

  // Validate form accessibility
  validateFormAccessibility: (form: HTMLFormElement): string[] => {
    const issues: string[] = [];
    
    // Check for labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const label = form.querySelector(`label[for="${id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      
      if (!label && !ariaLabel && !ariaLabelledby) {
        issues.push(`Input ${id} is missing a label`);
      }
    });

    // Check for required field indicators
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const ariaRequired = input.getAttribute('aria-required');
      if (ariaRequired !== 'true') {
        issues.push(`Required input ${input.getAttribute('id')} should have aria-required="true"`);
      }
    });

    return issues;
  }
};

// Global accessibility manager
export const accessibilityManager = new AccessibilityManager();

// Setup accessibility on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager.setupSkipLinks();
    accessibilityUtils.setupFocusIndicators();
  });
}
