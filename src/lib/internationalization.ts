// Internationalization utilities for Marakbi

export interface Locale {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
  currency: string;
  dateFormat: string;
  numberFormat: string;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  fallbackLocale?: string;
  namespaceSeparator?: string;
  keySeparator?: string;
}

// Supported locales
export const supportedLocales: Locale[] = [
  {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
  },
  {
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
    currency: 'EGP',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'ar-EG',
  },
  {
    code: 'fr',
    name: 'Français',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'fr-FR',
  },
];

// Default configuration
const defaultConfig: I18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'ar', 'fr'],
  fallbackLocale: 'en',
  namespaceSeparator: ':',
  keySeparator: '.',
};

// Translation store
class TranslationStore {
  private translations: Map<string, Translation> = new Map();
  private currentLocale: string;
  private config: I18nConfig;

  constructor(config: I18nConfig = defaultConfig) {
    this.config = config;
    this.currentLocale = config.defaultLocale;
  }

  // Set translations for a locale
  setTranslations(locale: string, translations: Translation): void {
    this.translations.set(locale, translations);
  }

  // Get translation for a key
  getTranslation(key: string, locale?: string): string {
    const targetLocale = locale || this.currentLocale;
    const translations = this.translations.get(targetLocale);
    
    if (!translations) {
      // Fallback to default locale
      const fallbackTranslations = this.translations.get(this.config.fallbackLocale!);
      if (fallbackTranslations) {
        return this.getNestedValue(fallbackTranslations, key) || key;
      }
      return key;
    }

    return this.getNestedValue(translations, key) || key;
  }

  // Get nested value from object
  private getNestedValue(obj: Translation, path: string): string | undefined {
    const keys = path.split(this.config.keySeparator!);
    let current: unknown = obj;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }
    
    return typeof current === 'string' ? current : undefined;
  }

  // Set current locale
  setLocale(locale: string): void {
    if (this.config.locales.includes(locale)) {
      this.currentLocale = locale;
      this.updateDocumentDirection();
    }
  }

  // Get current locale
  getCurrentLocale(): string {
    return this.currentLocale;
  }

  // Update document direction
  private updateDocumentDirection(): void {
    if (typeof document === 'undefined') return;
    
    const locale = supportedLocales.find(l => l.code === this.currentLocale);
    if (locale) {
      document.documentElement.dir = locale.direction;
      document.documentElement.lang = this.currentLocale;
    }
  }

  // Get all available locales
  getAvailableLocales(): string[] {
    return this.config.locales;
  }

  // Check if locale is supported
  isLocaleSupported(locale: string): boolean {
    return this.config.locales.includes(locale);
  }
}

// Global translation store
export const translationStore = new TranslationStore();

// Translation function
export const t = (key: string, locale?: string): string => {
  return translationStore.getTranslation(key, locale);
};

// Translation with interpolation
export const tWithInterpolation = (
  key: string,
  values: Record<string, string | number>,
  locale?: string
): string => {
  let translation = translationStore.getTranslation(key, locale);
  
  // Replace placeholders with values
  Object.entries(values).forEach(([placeholder, value]) => {
    const regex = new RegExp(`{{${placeholder}}}`, 'g');
    translation = translation.replace(regex, String(value));
  });
  
  return translation;
};

// Pluralization
export const tPlural = (
  key: string,
  count: number,
  locale?: string
): string => {
  const targetLocale = locale || translationStore.getCurrentLocale();
  
  // Handle different pluralization rules
  if (targetLocale === 'ar') {
    // Arabic pluralization rules
    if (count === 0) {
      return t(`${key}.zero`, locale);
    } else if (count === 1) {
      return t(`${key}.one`, locale);
    } else if (count === 2) {
      return t(`${key}.two`, locale);
    } else if (count >= 3 && count <= 10) {
      return t(`${key}.few`, locale);
    } else {
      return t(`${key}.many`, locale);
    }
  } else {
    // English pluralization rules
    if (count === 1) {
      return t(`${key}.one`, locale);
    } else {
      return t(`${key}.other`, locale);
    }
  }
};

// Date formatting
export const formatDate = (date: Date, locale?: string): string => {
  const targetLocale = locale || translationStore.getCurrentLocale();
  const localeConfig = supportedLocales.find(l => l.code === targetLocale);
  
  if (!localeConfig) return date.toLocaleDateString();
  
  return new Intl.DateTimeFormat(targetLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Number formatting
export const formatNumber = (number: number, locale?: string): string => {
  const targetLocale = locale || translationStore.getCurrentLocale();
  const localeConfig = supportedLocales.find(l => l.code === targetLocale);
  
  if (!localeConfig) return number.toString();
  
  return new Intl.NumberFormat(localeConfig.numberFormat).format(number);
};

// Currency formatting
export const formatCurrency = (amount: number, locale?: string): string => {
  const targetLocale = locale || translationStore.getCurrentLocale();
  const localeConfig = supportedLocales.find(l => l.code === targetLocale);
  
  if (!localeConfig) return `$${amount}`;
  
  return new Intl.NumberFormat(localeConfig.numberFormat, {
    style: 'currency',
    currency: localeConfig.currency,
  }).format(amount);
};

// Language detection
export const detectLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLanguage = navigator.language.split('-')[0];
  const supportedLanguages = translationStore.getAvailableLocales();
  
  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }
  
  return translationStore.getCurrentLocale();
};

// Initialize translations
export const initializeTranslations = async (): Promise<void> => {
  const currentLocale = detectLanguage();
  translationStore.setLocale(currentLocale);
  
  // Load translations for current locale
  try {
    // For now, we'll use empty translations
    // In a real app, you would load from actual translation files
    const translations = {};
    translationStore.setTranslations(currentLocale, translations);
  } catch (error) {
    console.warn(`Failed to load translations for ${currentLocale}:`, error);
    
    // Fallback to default locale
    if (currentLocale !== 'en') {
      try {
        const fallbackTranslations = {};
        translationStore.setTranslations('en', fallbackTranslations);
      } catch (fallbackError) {
        console.error('Failed to load fallback translations:', fallbackError);
      }
    }
  }
};

// Language switcher component
export const createLanguageSwitcher = (): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'language-switcher';
  
  const currentLocale = translationStore.getCurrentLocale();
  
  supportedLocales.forEach(locale => {
    const button = document.createElement('button');
    button.textContent = locale.name;
    button.className = `language-option ${locale.code === currentLocale ? 'active' : ''}`;
    button.addEventListener('click', () => {
      translationStore.setLocale(locale.code);
      window.location.reload();
    });
    container.appendChild(button);
  });
  
  return container;
};

// RTL support
export const setupRTLSupport = (): void => {
  const currentLocale = translationStore.getCurrentLocale();
  const localeConfig = supportedLocales.find(l => l.code === currentLocale);
  
  if (localeConfig?.direction === 'rtl') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }
};

// Export all i18n utilities
export const i18nUtils = {
  translationStore,
  t,
  tWithInterpolation,
  tPlural,
  formatDate,
  formatNumber,
  formatCurrency,
  detectLanguage,
  initializeTranslations,
  createLanguageSwitcher,
  setupRTLSupport,
  supportedLocales,
};
