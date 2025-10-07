import BoatCard from './BoatCard';

const BoatFleet = ({ homeData }) => {
  // Use API data if available, otherwise fallback to empty array
  const boats = homeData?.new_joiners || [];

  return (
    <section className="relative w-full bg-slate-900/70 overflow-hidden py-16">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      <div className="relative">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          {/* Orange Line */}
          <div className="w-14 h-1 bg-orange-300 mb-8"></div>

          {/* Title */}
          <h2 className="text-white text-3xl md:text-5xl font-semibold font-poppins mb-4">
            Fleet of Luxury Boats
          </h2>

          {/* Description */}
          <p className="text-white text-sm font-normal font-poppins max-w-2xl leading-9 px-4">
            Explore our exquisite collection of high-end yachts and premium vessels, perfect for tailored trips across Aswan&apos;s majestic Nile and Egypt&apos;s stunning Red Sea.
          </p>
        </div>

        {/* Boat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {boats.length > 0 ? (
            boats.map((boat, index) => (
              <BoatCard
                key={boat.id || index}
                imageUrl={boat.images?.[0] || '/images/Rectangle 3463853.png'}
                name={boat.name}
                price={`EGP ${boat.price_per_hour} /Hour`}
                location={boat.cities?.[0] || 'Aswan- Egypt'}
                guests={boat.max_seats}
                status="available"
                rooms={boat.max_seats_stay}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              <p>No boats available at the moment.</p>
            </div>
          )}
        </div>

        {/* View All Boats Button */}
        <div className="text-center">
          <button className="w-full sm:w-56 h-12 px-6 py-2.5 bg-sky-900 rounded-lg text-white text-base font-normal font-poppins capitalize hover:bg-sky-800 transition-colors">
            View all boats
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoatFleet;