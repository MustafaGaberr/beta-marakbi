import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Marakbi - Premium Boat Rentals',
    short_name: 'Marakbi',
    description: 'Discover the best locations, trips, and adventures in Egypt. Premium boat rentals across Egypt\'s majestic Nile and vibrant Red Sea.',
    start_url: '/',
    display: 'standalone',
    background_color: '#083872',
    theme_color: '#106BD8',
    icons: [
      {
        src: '/icons/Frame 1000005926.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['travel', 'lifestyle', 'navigation'],
    lang: 'en',
    orientation: 'portrait',
  }
}
