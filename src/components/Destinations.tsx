const Destinations = () => {
  return (
    <section className="relative w-full min-h-[573px] bg-sky-100 overflow-hidden py-16">
      {/* Background Images - Hidden on mobile, shown on larger screens */}
      <img
        src="/images/image 6.png"
        alt="Background"
        className="hidden lg:block absolute w-[1087px] h-[1023px] -left-[400px] -top-[100px] object-cover opacity-50"
      />
      <img
        src="/images/image 5.png"
        alt="Background"
        className="hidden lg:block absolute w-[914px] h-[1017px] right-[-200px] -top-[80px] object-cover opacity-50"
      />

      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-['Poppins'] capitalize text-black/10 mb-4">
            Destination
          </h2>
        </div>

        {/* Destination Cards */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-8">
          {/* Philae Temple */}
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/205x205"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-['Poppins'] capitalize">
              Philae Temple
            </div>
          </div>

          {/* Botanical Garden */}
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/205x205"
              alt="Botanical Garden"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-['Poppins'] capitalize">
              Botanical Garden
            </div>
          </div>

          {/* Philae Temple 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/205x205"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-['Poppins'] capitalize">
              Philae Temple
            </div>
          </div>

          {/* Philae Temple 3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/205x205"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-['Poppins'] capitalize">
              Philae Temple
            </div>
          </div>

          {/* Philae Temple 4 */}
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/205x205"
              alt="Philae Temple"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover"
            />
            <div className="text-center mt-4 text-black text-lg md:text-xl font-medium font-['Poppins'] capitalize">
              Philae Temple
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <button className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-400 transition-colors">
            <svg className="w-6 h-6 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <button className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-400 transition-colors">
            <svg className="w-6 h-6 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-16">
        <div className="text-stone-500 text-2xl md:text-4xl font-normal font-['SignPainter'] capitalize mb-2">
          Where to sail Now
        </div>
        <div className="text-black text-3xl md:text-5xl font-bold font-['Poppins'] capitalize">
          Top Destination
        </div>
      </div>
    </section>
  );
};

export default Destinations;