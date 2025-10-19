# Marakbi - Production Deployment Guide

## 🚀 Production Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Domain configured
- SSL certificate

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://yasershaban.pythonanywhere.com
NEXT_PUBLIC_APP_URL=https://marakbi.tours

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
NEXT_PUBLIC_GTM_ID=your_google_tag_manager_id_here

# Contact Information
NEXT_PUBLIC_PHONE=+201031416900
NEXT_PUBLIC_EMAIL=info@marakbi.tours
NEXT_PUBLIC_ADDRESS=Aswan - Egypt

# App Store Links
NEXT_PUBLIC_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=com.marakbi.app
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/marakbi/id123456789
```

### Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint:fix
```

### Performance Optimizations

1. **Image Optimization**: All images are optimized with Next.js Image component
2. **Lazy Loading**: Images load only when needed
3. **Code Splitting**: Automatic code splitting for better performance
4. **Caching**: Static assets are cached for better performance
5. **Compression**: Gzip compression enabled
6. **Security Headers**: Security headers configured

### SEO Optimizations

1. **Meta Tags**: Complete meta tags for all pages
2. **Open Graph**: Social media sharing optimization
3. **Sitemap**: Automatic sitemap generation
4. **Robots.txt**: Search engine crawling configuration
5. **Structured Data**: JSON-LD structured data ready

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Analytics configured
- [ ] Social media links updated
- [ ] App store links updated
- [ ] Contact information verified
- [ ] Performance testing completed
- [ ] SEO testing completed
- [ ] Mobile responsiveness tested

### Monitoring

- Google Analytics integration
- Performance monitoring
- Error tracking
- Uptime monitoring

### Security Features

- XSS protection
- CSRF protection
- Content Security Policy
- Secure headers
- Input validation

### PWA Features

- Service Worker ready
- Offline functionality
- App manifest configured
- Installable on mobile devices

### Contact Information

- Phone: +2010 31 41 6 900
- Email: info@marakbi.tours
- Address: Aswan - Egypt

### Social Media

- Facebook: https://www.facebook.com/profile.php?id=61578325940602
- Instagram: https://www.instagram.com/marakbi_app/
- LinkedIn: https://www.linkedin.com/company/marakbi
- YouTube: https://www.youtube.com/@marakbi

### App Downloads

- Google Play: https://play.google.com/store/apps/details?id=com.marakbi.app
- App Store: https://apps.apple.com/app/marakbi/id123456789
