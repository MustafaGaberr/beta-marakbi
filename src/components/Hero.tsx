"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [city, setCity] = useState('');
  const [boatType, setBoatType] = useState('');
  const [tripType, setTripType] = useState('');
  // Dummy data for cities
  const cities = [
    { id: 1, name: 'Aswan' },
    { id: 2, name: 'Luxor' },
    { id: 3, name: 'Cairo' },
    { id: 4, name: 'Alexandria' },
    { id: 5, name: 'Hurghada' },
    { id: 6, name: 'Sharm El Sheikh' }
  ];

  // Dummy data for boats
  const boats = [
    { id: 1, name: 'Traditional Felucca' },
    { id: 2, name: 'Luxury Yacht' },
    { id: 3, name: 'Speed Boat' },
    { id: 4, name: 'Fishing Boat' },
    { id: 5, name: 'Party Boat' },
    { id: 6, name: 'Family Boat' }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Timer for image gallery animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[1024px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Rectangle 3463841.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={90}
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
                {boats.map((boat, index) => {
                  const boatData = boat as { id?: number; name?: string };
                  return (
                    <option key={boatData.id || index} value={boatData.id}>
                      {boatData.name}
                    </option>
                  );
                })}
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

      {/* Featured Activities Section - Bottom Center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 max-w-5xl w-[600px] px-4">
        <div className="bg-white rounded-tl-lg rounded-tr-lg shadow-lg">
          <div className="p-4 min-h-[200px] overflow-hidden">
            <h2 className="text-blue-700 text-lg font-medium font-poppins capitalize mb-4">
              Featured Activities
            </h2>

            {/* Image Gallery */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 h-40">
              {/* Image 1: Felucca */}
              <div className="relative transition-all duration-500 ease-in-out">
                <Image
                  src="/images/f1.png"
                  alt="Felucca"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 0
                      ? 'w-44 h-40 scale-105'
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  01
                </div>
              </div>

              {/* Image 2: Fishing */}
              <div className="relative transition-all duration-500 ease-in-out">
                <Image
                  src="/images/f2.png"
                  alt="Fishing"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 1 
                      ? 'w-44 h-40 scale-105' 
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  02
                </div>
              </div>

              {/* Image 3: Kayak */}
              <div className="relative transition-all duration-500 ease-in-out">
                <Image
                  src="/images/f3.png"
                  alt="Kayak"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 2 
                      ? 'w-44 h-40 scale-105' 
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  03
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;