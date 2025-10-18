const Destinations = () => {
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
          <button className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-full z-10 mr-4">
            <img src="/icons/arrow_circle_left.svg" alt="Previous" className="w-12 h-12 md:w-14 md:h-14" />
          </button>

          {/* Carousel */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide justify-center w-full">
          {/* Philae Temple */}
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="/images/Rectangle 3463870.png"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>

          {/* Botanical Garden */}
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="/images/Rectangle 3463870.png"
              alt="Botanical Garden"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Botanical Garden
            </div>
          </div>

          {/* Philae Temple 2 */}
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="/images/Rectangle 3463870.png"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>

          {/* Philae Temple 3 */}
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="/images/Rectangle 3463870.png"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>

          {/* Philae Temple 4 */}
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="/images/Rectangle 3463870.png"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-poppins capitalize">
              Philae Temple
            </div>
          </div>
          </div>

          {/* Right Arrow */}
          <button className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-full z-10 ml-4">
            <img src="/icons/arrow_circle_right.svg" alt="Next" className="w-12 h-12 md:w-14 md:h-14" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Destinations;