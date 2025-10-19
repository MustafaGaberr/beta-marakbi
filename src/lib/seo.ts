// SEO utilities for Marakbi

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

// Default SEO data
export const defaultSEO: SEOData = {
  title: "Marakbi | Explore Egypt's Hidden Gems",
  description: "Discover the best locations, trips, and adventures in Egypt. Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea.",
  keywords: ["boat rental", "Egypt", "Nile", "Red Sea", "yacht", "felucca", "water sports", "tourism", "Aswan"],
  image: "/images/carousel1.png",
  url: "https://marakbi.tours",
  type: "website"
};

// Generate structured data for boats
export const generateBoatStructuredData = (boat: unknown) => {
  const boatData = boat as {
    name?: string;
    description?: string;
    images?: string[];
    price_per_hour?: number;
    average_rating?: number;
    total_reviews?: number;
  };
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": boatData.name,
    "description": boatData.description,
    "image": boatData.images?.[0] || "/images/Rectangle 3463853.png",
    "offers": {
      "@type": "Offer",
      "price": boatData.price_per_hour,
      "priceCurrency": "EGP",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": boatData.average_rating || 4.5,
      "reviewCount": boatData.total_reviews || 0
    }
  };
};

// Generate structured data for organization
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marakbi",
    "url": "https://marakbi.tours",
    "logo": "https://marakbi.tours/logo.png",
    "description": "Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201031416900",
      "contactType": "customer service",
      "email": "info@marakbi.tours"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Aswan",
      "addressCountry": "Egypt"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578325940602",
      "https://www.instagram.com/marakbi_app/",
      "https://www.linkedin.com/company/marakbi",
      "https://www.youtube.com/@marakbi"
    ]
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate local business structured data
export const generateLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Marakbi",
    "description": "Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea",
    "url": "https://marakbi.tours",
    "telephone": "+201031416900",
    "email": "info@marakbi.tours",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Aswan",
      "addressCountry": "Egypt"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.0889",
      "longitude": "32.8998"
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "$$",
    "servedArea": {
      "@type": "Country",
      "name": "Egypt"
    }
  };
};

// Generate meta tags
export const generateMetaTags = (seoData: SEOData) => {
  const tags = {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords?.join(', '),
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:image': seoData.image || defaultSEO.image,
    'og:url': seoData.url || defaultSEO.url,
    'og:type': seoData.type || defaultSEO.type,
    'twitter:card': 'summary_large_image',
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    'twitter:image': seoData.image || defaultSEO.image,
  };
  
  return tags;
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://marakbi.tours';
  return `${baseUrl}${path}`;
};

// Generate sitemap entries
export const generateSitemapEntries = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://marakbi.tours';
  
  return [
    { url: baseUrl, priority: 1.0, changefreq: 'daily' },
    { url: `${baseUrl}/about-us`, priority: 0.8, changefreq: 'monthly' },
    { url: `${baseUrl}/our-team`, priority: 0.7, changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.8, changefreq: 'monthly' },
    { url: `${baseUrl}/faqs`, priority: 0.6, changefreq: 'weekly' },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changefreq: 'yearly' },
    { url: `${baseUrl}/terms-conditions`, priority: 0.3, changefreq: 'yearly' },
  ];
};
