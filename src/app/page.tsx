'use client';

import Hero from '@/components/Hero';
import OurServices from '@/components/OurServices';
import AboutApp from '@/components/AboutApp';
import BoatFleet from '@/components/BoatFleet';
import WhyChoosingUs from '@/components/WhyChoosingUs';
import Stats from '@/components/Stats';
import Activities from '@/components/Activities';
import Destinations from '@/components/Destinations';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div>
      <Header currentPage="home" />
      <main className="relative z-10">
        <Hero />
        <OurServices />
        <AboutApp />
        <BoatFleet />
        <WhyChoosingUs />
        <Stats />
        <Activities />
        <Destinations />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}