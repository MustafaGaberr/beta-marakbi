const Activities = ({ homeData }: { homeData: any }) => {
  const activities = [
    { src: '/images/Rectangle 3463860.png', title: 'Water Sports', height: 'h-150' },
    { src: '/images/Rectangle 3463863.png', title: 'Family Activities', height: 'h-150' },
    { src: '/images/Rectangle 3463861.png', title: 'Boat Rides', height: 'h-200' },
    { src: '/images/Rectangle 3463865.png', title: 'Cruises', height: 'h-100' },
    { src: '/images/Rectangle 3463862.png', title: 'Fishing Trips', height: 'h-150' },
    { src: '/images/Rectangle 3463864.png', title: 'Snorkelling & Diving', height: 'h-150' },
  ];

  return (
    <section className="relative py-2">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-black text-4xl md:text-6xl font-bold font-poppins capitalize leading-tight">
          Discover the Best Activities <br />at waterways
        </h2>
        <p className="text-zinc-500 text-lg md:text-2xl font-medium font-poppins capitalize mt-8 max-w-3xl mx-auto px-4">
          From thrilling water sports to serene sunset cruises, enjoy handpicked activities that make every moment at sea unforgettable.
        </p>
      </div>

      {/* Activities Masonry Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto px-4">
        {activities.map((item, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-[32px] mb-6 break-inside-avoid ${item.height} group`}
          >
            {/* الصورة */}
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover rounded-[32px] transition-transform duration-500 group-hover:scale-105"
            />

            {/* الأوفرلاي الأسود الافتراضي */}
            <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-transparent"></div>

            {/* العنوان */}
            <div
  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
>
  <span className="text-white text-xl font-medium font-poppins capitalize">
    {item.title}
  </span>
</div>

          </div>
        ))}
      </div>
      <div className="text-center mb-16 mt-16">
          <p className="text-4xl lg:text-5xl font-signpainter text-[#927C4E] mb-4">
          Where to sail Now
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-black font-poppins mb-6">
          Top Destinations
          </h2>
          
        </div>
    </section>
  );
};

export default Activities;
