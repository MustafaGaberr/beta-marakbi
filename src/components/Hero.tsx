"use client"
import { useState, useEffect } from 'react';
import { clientApi } from '@/lib/api';

const Hero = ({ homeData }: { homeData: any }) => {
  const [city, setCity] = useState('');
  const [boatType, setBoatType] = useState('');
  const [tripType, setTripType] = useState('');
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [boats, setBoats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, boatsResponse] = await Promise.all([
          clientApi.getCities(),
          clientApi.getBoats()
        ]);
        
        if (citiesResponse.success && citiesResponse.data) {
          setCities(citiesResponse.data.cities || []);
          console.log('Cities loaded:', citiesResponse.data.cities);
        }
        
        if (boatsResponse.success && boatsResponse.data) {
          setBoats(boatsResponse.data.boats || []);
          console.log('Boats loaded:', boatsResponse.data.boats);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative w-full h-[1024px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/Rectangle 3463841.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-32">
          {/* Left Side: Text Content */}
          <div className="flex flex-col text-center lg:text-left lg:ml-8">
            <div className="text-orange-300 text-2xl sm:text-3xl lg:text-4xl font-normal font-['SignPainter'] capitalize mb-4">
              With Marakbi
            </div>
            <div className="text-white text-xl sm:text-2xl lg:text-3xl font-medium font-poppins capitalize mb-8">
              Your Dream boats
            </div>
            <div className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold font-poppins capitalize leading-tight lg:leading-[68px] mb-8">
              <span className="text-white">Most Reliable<br/></span>
              <span className="text-white">Luxury Boats </span>
              <span className="text-orange-300">Rentals</span>
            </div>
            <button className="w-full sm:w-56 h-12 px-6 py-2.5 bg-[#0C4A8C] rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-normal font-poppins mx-auto lg:mx-0 clickable hover:bg-[#0A3D7A] transition-colors">
              Explore Now
            </button>
          </div>

          {/* Right Side: Booking Form */}
          <div className="w-full sm:w-80 h-96 bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-start items-center p-6 shadow-2xl border border-white/30 space-y-4">

            {/* City Dropdown */}
            <div className="w-full sm:w-64">
              <p className="text-white text-base font-normal font-poppins mb-2">Where To Go</p>
              <select 
                className="w-full h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">City</option>
                {cities.map((cityOption) => (
                  <option key={cityOption.id} value={cityOption.id}>
                    {cityOption.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Boat Type Dropdown */}
            <div className="w-full sm:w-64">
              <p className="text-white text-base font-normal font-poppins mb-2">Boat Type</p>
              <select 
                className="w-full h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={boatType}
                onChange={(e) => setBoatType(e.target.value)}
              >
                <option value="">Felucca</option>
                {boats.map((boat) => (
                  <option key={boat.id} value={boat.id}>
                    {boat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trip Type Dropdown */}
            <div className="w-full sm:w-64">
              <p className="text-white text-base font-normal font-poppins mb-2">Trip Type</p>
              <select 
                className="w-full h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="">Per Hour</option>
                <option value="per_hour">Per Hour</option>
                <option value="half_day">Half Day</option>
                <option value="full_day">Full Day</option>
                <option value="multi_day">Multi Day</option>
              </select>
            </div>

            {/* Book now Button */}
            <button className="w-full sm:w-64 h-12 px-6 py-2.5 bg-[#0C4A8C] backdrop-blur-sm rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-normal font-poppins clickable hover:bg-[#0A3D7A] transition-all duration-300 shadow-lg mt-auto">
              Book now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;