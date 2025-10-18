'use client';
import { useRef } from 'react';

const Destinations = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="relative w-full min-h-[573px] bg-sky-100  overflow-hidden py-16">
      {/* Background Images - Hidden on mobile, shown on larger screens */}
      <img
        src="/images/image 6.png"
        alt="Background"
        className="hidden lg:block absolute w-[1087px] h-[1023px] -left-[400px] -top-[100px] object-contain"
      />
      <img
        src="/images/image 5.png"
        alt="Background"
        className="hidden lg:block absolute w-[914px] h-[1017px] right-[-200px] -top-[80px] object-contain"
      />
      

      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-poppins capitalize text-black/10 mb-4">
            Destinations
          </h2>
        </div>

        {/* Destination Cards Carousel */}
        <div className="relative max-w-7xl mx-auto flex items-center">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-full z-10 mr-4 hover:scale-110 transition-transform"
          >
            <img src="/icons/arrow_circle_left.svg" alt="Previous" className="w-12 h-12 md:w-14 md:h-14" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide justify-center w-full cursor-grab active:cursor-grabbing"
          >
          {/* Philae Temple */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <img
                src="/images/Rectangle 3463870.png"
                alt="Philae Temple"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/images/philae2.png"
                alt="Philae Temple Hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>

          {/* Nubian Village */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <img
                src="/images/nubian-village1.jpg"
                alt="Nubian Village"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/images/nubian-village2.jpg"
                alt="Nubian Village Hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Nubian Village
            </div>
          </div>

          {/* Botanical Garden */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <img
                src="/images/Aswan-Botanical-Garden1.jpg"
                alt="Botanical Garden"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/images/Aswan-Botanical-Garden2.jpg"
                alt="Botanical Garden Hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Botanical Garden
            </div>
          </div>

          {/* Elephantine Island */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <img
                src="/images/Elephantine Island1.jpg"
                alt="Elephantine Island"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/images/Elephantine Island2.webp"
                alt="Elephantine Island Hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Elephantine Island
            </div>
          </div>

          {/* Abu Simbel Temples */}
          <div className="flex flex-col items-center flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden">
              <img
                src="/images/abusimple1.jpg"
                alt="Abu Simbel Temples"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/images/abusimple2.jpg"
                alt="Abu Simbel Temples Hover"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
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
            <img src="/icons/arrow_circle_right.svg" alt="Next" className="w-12 h-12 md:w-14 md:h-14" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Destinations;