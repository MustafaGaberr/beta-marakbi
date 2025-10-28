'use client';
import { useRef, useState } from 'react';

import Image from 'next/image';

const Destinations = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const destinations = [
    { name: 'Philae Temple', img1: '/images/Rectangle 3463870.png', img2: '/images/philae2.png' },
    { name: 'Nubian Village', img1: '/images/nubian-village1.jpg', img2: '/images/nubian-village2.jpg' },
    { name: 'Botanical Garden', img1: '/images/Aswan-Botanical-Garden1.jpg', img2: '/images/Aswan-Botanical-Garden2.jpg' },
    { name: 'Elephantine Island', img1: '/images/Elephantine Island1.jpg', img2: '/images/Elephantine Island2.webp' },
    { name: 'Abu Simbel Temples', img1: '/images/abusimple1.jpg', img2: '/images/abusimple2.jpg' }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full min-h-[573px] bg-white md:bg-sky-100 overflow-hidden py-8 md:py-16">
      {/* Background Images - Hidden on mobile, shown on larger screens */}
      <Image
        src="/images/image 6.png"
        alt="Background"
        width={1087}
        height={1023}
        className="hidden lg:block absolute w-[1087px] h-[1023px] -left-[400px] -top-[100px] object-contain"
        quality={75}
      />
      <Image
        src="/images/image 5.png"
        alt="Background"
        width={914}
        height={1017}
        className="hidden lg:block absolute w-[914px] h-[1017px] right-[-200px] -top-[80px] object-contain"
        quality={75}
      />
      

      <div className="container mx-auto px-4">
        {/* Title - Hidden on Mobile */}
        <div className="hidden md:block text-center mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-poppins capitalize text-black/10 mb-4">
            Destinations
          </h2>
        </div>

        {/* Mobile View - Single Card */}
        <div className="block md:hidden max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="relative h-80 group">
              <Image
                src={destinations[currentIndex].img1}
                alt={destinations[currentIndex].name}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src={destinations[currentIndex].img2}
                alt={`${destinations[currentIndex].name} Hover`}
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center py-6 text-black text-2xl font-medium font-poppins capitalize">
              {destinations[currentIndex].name}
            </div>
          </div>

          {/* Navigation Arrows - Below Card */}
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={goToPrevious}
              className="hover:scale-110 transition-transform"
            >
              <Image src="/icons/arrow_circle_left.svg" alt="Previous" width={48} height={48} className="w-12 h-12" />
            </button>
            <button 
              onClick={goToNext}
              className="hover:scale-110 transition-transform"
            >
              <Image src="/icons/arrow_circle_right.svg" alt="Next" width={48} height={48} className="w-12 h-12" />
            </button>
          </div>
        </div>

        {/* Desktop View - Original Carousel */}
        <div className="hidden md:flex relative max-w-7xl mx-auto items-center">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-full z-10 mr-4 hover:scale-110 transition-transform"
          >
            <Image src="/icons/arrow_circle_left.svg" alt="Previous" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide justify-center w-full cursor-grab active:cursor-grabbing"
          >
          {/* Philae Temple */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <Image
                src="/images/Rectangle 3463870.png"
                alt="Philae Temple"
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src="/images/philae2.png"
                alt="Philae Temple Hover"
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>

          {/* Nubian Village */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <Image
                src="/images/nubian-village1.jpg"
                alt="Nubian Village"
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src="/images/nubian-village2.jpg"
                alt="Nubian Village Hover"
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Nubian Village
            </div>
          </div>

          {/* Botanical Garden */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <Image
                src="/images/Aswan-Botanical-Garden1.jpg"
                alt="Botanical Garden"
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src="/images/Aswan-Botanical-Garden2.jpg"
                alt="Botanical Garden Hover"
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Botanical Garden
            </div>
          </div>

          {/* Elephantine Island */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <Image
                src="/images/Elephantine Island1.jpg"
                alt="Elephantine Island"
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src="/images/Elephantine Island2.webp"
                alt="Elephantine Island Hover"
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Elephantine Island
            </div>
          </div>

          {/* Abu Simbel Temples */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <Image
                src="/images/abusimple1.jpg"
                alt="Abu Simbel Temples"
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                quality={85}
              />
              <Image
                src="/images/abusimple2.jpg"
                alt="Abu Simbel Temples Hover"
                fill
                className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                quality={85}
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Abu Simbel Temples
            </div>
          </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-full z-10 ml-4 hover:scale-110 transition-transform"
          >
            <Image src="/icons/arrow_circle_right.svg" alt="Next" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Destinations;