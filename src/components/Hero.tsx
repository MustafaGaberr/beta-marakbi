"use client"
import { useState } from 'react';

const Hero = () => {
  const [city, setCity] = useState('');
  const [boatType, setBoatType] = useState('');
  const [tripType, setTripType] = useState('');

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
        <div className="w-[1119px] mx-auto flex justify-between items-center gap-20">
          {/* Left Side: Text Content */}
          <div className="flex flex-col">
            <div className="text-orange-300 text-4xl font-normal font-['SignPainter'] capitalize mb-4">
              With Marakbi
            </div>
            <div className="text-white text-6xl font-bold font-['Poppins'] capitalize leading-[68px] mb-8">
              <span className="text-white">Most Reliable<br/></span>
              <span className="text-orange-300">Luxury Boats </span>
              <span className="text-white">Rentals</span>
            </div>
            <div className="text-white text-3xl font-medium font-['Poppins'] capitalize mb-8">
              Your Dream boats
            </div>
            <button className="w-56 h-12 px-6 py-2.5 bg-sky-900 rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-normal font-['Poppins']">
              Explore Now
            </button>
          </div>

          {/* Right Side: Booking Form */}
          <div className="w-72 h-96 bg-white/10 rounded-lg overflow-hidden flex flex-col justify-center items-center p-3">
            <div className="text-white text-sm font-normal font-['Poppins'] capitalize mb-3">
              Where to go
            </div>

            {/* City Dropdown */}
            <div className="w-52 h-12 p-3 bg-neutral-200 rounded-lg flex justify-between items-center mb-3">
              <div className="text-neutral-400 text-sm font-normal font-['Poppins'] capitalize">
                City
              </div>
              <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-[5px] text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Boat Type Dropdown */}
            <div className="w-52 h-12 p-3 bg-neutral-200 rounded-lg flex justify-between items-center mb-3">
              <div className="text-neutral-400 text-sm font-normal font-['Poppins'] capitalize">
                Felucca
              </div>
              <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-[5px] text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Trip Type Dropdown */}
            <div className="w-52 h-12 p-3 bg-neutral-200 rounded-lg flex justify-between items-center mb-3">
              <div className="text-neutral-400 text-sm font-normal font-['Poppins'] capitalize">
                Per Hour
              </div>
              <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-[5px] text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Book now Button */}
            <div className="w-52 h-12 px-6 py-2.5 bg-sky-900 rounded-lg flex justify-center items-center gap-2.5">
              <div className="text-white text-base font-normal font-['Poppins']">
                Book now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;