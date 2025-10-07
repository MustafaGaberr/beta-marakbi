'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import AboutApp from '@/components/AboutApp';
import BoatFleet from '@/components/BoatFleet';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Activities from '@/components/Activities';
import Destinations from '@/components/Destinations';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getHomeData, handleApiError } from '@/lib/api';

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        console.log('📡 Fetching home data (dummy mode)...');
        const data = await getHomeData();
        console.log('✅ Home data loaded:', data);
        setHomeData(data);
      } catch (err) {
        console.error('❌ Error fetching home data:', err);
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header currentPage="home" />
        <main className="relative z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-900 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading amazing boats...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header currentPage="home" />
        <main className="relative z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-lg text-red-600 mb-4">Error loading data</p>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header currentPage="home" />
      <main className="relative z-10">
        <Hero homeData={homeData} />
        <FeaturedServices homeData={homeData} />
        <AboutApp />
        <BoatFleet homeData={homeData} />
        <WhyUs />
        <Stats />
        <Activities homeData={homeData} />
        <Destinations />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
