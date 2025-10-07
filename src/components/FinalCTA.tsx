const FinalCTA = () => {
  return (
    <section className="relative w-full min-h-[500px] bg-gradient-to-b from-blue-600 via-sky-800 via-62% to-sky-900 overflow-hidden py-16">
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-[400px] px-4">
        <h2 className="text-sky-950 text-3xl md:text-4xl font-bold font-poppins text-center mb-4">
          Book your Dream<br />Voyage now
        </h2>
        <p className="text-sky-100 text-base font-medium font-poppins text-center max-w-lg mb-8">
          Every journey with Marakbi is tailored to perfection. From private charters to bespoke itineraries, our boats and expert captains ensure a seamless, unforgettable experience.
        </p>
        <button className="w-full sm:w-56 h-12 px-6 py-2.5 bg-white rounded-lg text-sky-900 text-base font-normal font-poppins capitalize hover:bg-orange-400 transition-colors">
          Book now
        </button>
      </div>

      {/* Decorative Text at bottom */}
      <div className="text-center text-stone-500 text-3xl md:text-5xl font-normal font-['SignPainter'] capitalize mt-8">
        It&apos;s the time book your trip
      </div>
    </section>
  );
};

export default FinalCTA;