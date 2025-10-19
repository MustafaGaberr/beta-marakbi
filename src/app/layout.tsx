import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

//   src: [
//     {
//       path: "../../public/fonts/poppins/Poppins-Thin.ttf",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-ExtraLight.ttf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Light.ttf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Medium.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-ExtraBold.ttf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Black.ttf",
//       weight: "900",
//       style: "normal",
//     },
//   ],
//   variable: "--font-poppins",
// });

export const metadata: Metadata = {
  title: {
    default: "Marakbi | Explore Egypt's Hidden Gems",
    template: "%s | Marakbi",
  },
  description: "Discover the best locations, trips, and adventures in Egypt. Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea.",
  keywords: ["boat rental", "Egypt", "Nile", "Red Sea", "yacht", "felucca", "water sports", "tourism", "Aswan"],
  authors: [{ name: "Marakbi Team" }],
  creator: "Marakbi",
  publisher: "Marakbi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://marakbi.tours'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Marakbi | Explore Egypt's Hidden Gems",
    description: "Discover the best locations, trips, and adventures in Egypt. Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea.",
    url: 'https://marakbi.tours',
    siteName: 'Marakbi',
    images: [
      {
        url: '/images/carousel1.png',
        width: 1200,
        height: 630,
        alt: 'Marakbi - Premium Boat Rentals in Egypt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Marakbi | Explore Egypt's Hidden Gems",
    description: "Discover the best locations, trips, and adventures in Egypt. Premium boat rentals across Egypt's majestic Nile and vibrant Red Sea.",
    images: ['/images/carousel1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
