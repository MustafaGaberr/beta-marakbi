const Activities = ({ homeData }) => {
  // Get activities data from API
  const fishingTrips = homeData?.fishing_trips || [];
  const waterGames = homeData?.water_games || [];
  const nileCruises = homeData?.nile_cruises || [];
  const occasions = homeData?.occasions || [];
  return (
    <section className="relative py-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-black text-4xl md:text-6xl font-bold font-poppins capitalize leading-tight">
          Discover the Best Activities <br />at waterways
        </h2>
        <p className="text-zinc-500 text-lg md:text-2xl font-medium font-poppins capitalize mt-8 max-w-3xl mx-auto px-4">
          From thrilling water sports to serene sunset cruises, enjoy handpicked activities that make every moment at sea unforgettable.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 h-auto lg:h-[1000px]">
        {/* Water Sports - Column 1, Rows 1-3 */}
        <div className="flex flex-col row-span-3">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463860.png"
              alt="Water Sports"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Water Sports
              </span>
            </div>
          </div>
        </div>

        {/* Boat Rides - Column 1, Rows 4-6 */}
        <div className="flex flex-col row-span-4">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463861.png"
              alt="Boat Rides"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Boat Rides
              </span>
            </div>
          </div>
        </div>

        

        {/* Fishing Trips - Column 2, Rows 1-4 */}
        <div className="flex flex-col row-span-3">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463862.png"
              alt="Fishing Trips"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Fishing Trips
              </span>
            </div>
          </div>
        </div>

        

        {/* Family Activities - Column 2, Rows 5-6 */}
        <div className="flex flex-col row-span-3">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463863.png"
              alt="Family Activities"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Family Activities
              </span>
            </div>
          </div>
        </div>

        

        


        {/* Snorkelling & Diving - Column 3, Rows 1-3 */}
        <div className="flex flex-col row-span-3">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463864.png"
              alt="Snorkelling & Diving"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Snorkelling & Diving
              </span>
            </div>
          </div>
        </div>

        {/* Cruises - Column 3, Rows 4-6 */}
        <div className="flex flex-col row-span-2">
          <div className="relative overflow-hidden rounded-[32px] mb-4 h-full">
            <img
              src="/images/Rectangle 3463865.png"
              alt="Cruises"
              className="w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-white text-xl md:text-2xl font-medium font-poppins capitalize">
                Cruises
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Activities;