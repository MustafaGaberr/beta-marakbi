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

export default function HomePage() {
  return (
    <div>
      <Header currentPage="home" />
      <main className="relative z-10">
        <Hero />
        <FeaturedServices />
        <AboutApp />
        <BoatFleet />
        <WhyUs />
        <Stats />
        <Activities />
        <Destinations />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
