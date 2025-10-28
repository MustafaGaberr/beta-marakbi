"use client";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Private Boat",
      description: "Rent Your Own Exclusive Boat For A Completely Personalized Journey With Family And Friends.",
      icon: "/icons/Frame 42.svg"
    },
    {
      id: 2,
      title: "Sharing Boat",
      description: "Join A Social, Guided Trip And Split The Cost. The Perfect Way To Meet New People And Explore Together.",
      icon: "/icons/Frame 37.svg"
    },
    {
      id: 3,
      title: "Travel Boat",
      description: "Find A Unique Floating Home. Book A Houseboat Or Yacht For An Unforgettable Overnight Stay On The Water.",
      icon: "/icons/boat-helm-svgrepo-com 1.svg"
    },
    {
      id: 4,
      title: "Fishing Boat",
      description: "Get Out And Catch More. Our Boats Are Fully Equipped With Everything A Dedicated Angler Needs.",
      icon: "/icons/Frame 1321316342.svg"
    },
    {
      id: 5,
      title: "Occasion",
      description: "Make Your Event Truly Special. Host A Birthday, Party, Or Celebration On A Stunning Boat.",
      icon: "/icons/Gift.svg"
    },
    {
      id: 6,
      title: "Water Sports",
      description: "Get Your Adrenaline Fix. Rent A Boat For All Your Favorite Water Sports, From Wakeboarding To Snorkeling.",
      icon: "/icons/Wakeboarding.svg"
    }
  ];

  return (
    <section className="py-8 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-4xl sm:text-4xl lg:text-5xl font-signpainter text-[#927C4E] mb-2 sm:mb-4">
            What Do We Offer
          </p>
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-black font-poppins mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-poppins max-w-4xl mx-auto leading-relaxed">
            No Matter The Journey, We Have A Boat For Your Story. Explore Egypt&apos;s Stunning Waterways With A Curated Selection Of Vessels And Seasoned Captains.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CEAF6E] p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              {/* Icon */}
              <div className="mb-3 sm:mb-4">
                <img 
                  src={service.icon} 
                  alt={service.title}
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#093B77] font-poppins mb-2 sm:mb-3">
                {service.title}
              </h3>

              {/* Wavy Underline */}
              <div className="mb-3 sm:mb-4">
                <img 
                  src="/icons/Line 74.svg" 
                  alt="Decorative line"
                  className="h-3 sm:h-4"
                />
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#072D5B] font-poppins leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>

              {/* Button */}
              <button className="bg-[#093B77] text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-lg font-normal hover:bg-[#0A3D7A] transition-colors duration-300 w-full sm:w-auto">
                Explore Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
