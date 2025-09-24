import Image from 'next/image';

const FeaturedServices = () => {
  const services = [
    {
      icon: '/icons/Frame 42.svg', // Private Boat icon
      title: 'Private Boat',
      description: 'Rent your own exclusive boat for a completely personalized journey with family and friends.'
    },
    {
      icon: '/icons/Frame 37.svg', // Sharing Boat icon
      title: 'Sharing Boat',
      description: 'Join a social, guided trip and split the cost. The perfect way to meet new people and explore together.'
    },
    {
      icon: '/icons/boat-helm-svgrepo-com 1.svg', // Travel Boat icon
      title: 'Travel Boat',
      description: 'Find a unique floating home. Book a houseboat or yacht for an unforgettable overnight stay on the water.'
    },
    {
      icon: '/icons/Frame 1321316342.svg', // Fishing Boat icon
      title: 'Fishing Boat',
      description: 'Get out and catch more. Our boats are fully equipped with everything a dedicated angler needs.'
    },
    {
      icon: '/icons/Gift.svg', // Occasion icon
      title: 'Occassion',
      description: 'Make your event truly special. Host a birthday, party, or celebration on a stunning boat.'
    },
    {
      icon: '/icons/Wakeboarding.svg', // Water activities icon
      title: 'Water activities',
      description: 'Get your adrenaline fix. Rent a boat for all your favorite water sports, from wakeboarding to snorkeling.'
    }
  ];

  return (
    <section className="relative py-16">
      {/* Featured Activities Box */}
      <div className="max-w-4xl mx-auto mb-16 bg-white rounded-tl-lg rounded-tr-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-blue-700 text-lg font-medium font-['Poppins'] capitalize mb-4">
            Featured Activities
          </h2>

          {/* Image Gallery */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Image 1: Felucca */}
            <div className="relative">
              <img
                src="/images/f1.png"
                alt="Felucca"
                className="w-40 h-36 rounded-lg"
              />
              <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-['Poppins']">
                01
              </div>
            </div>

            {/* Image 2: Fishing (Middle, larger) */}
            <div className="relative">
              <img
                src="/images/f2.png"
                alt="Fishing"
                className="w-40 h-40 rounded-lg"
              />
              <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-['Poppins']">
                02
              </div>
            </div>

            {/* Image 3: Kayak */}
            <div className="relative">
              <img
                src="/images/f3.png"
                alt="Kayak"
                className="w-40 h-36 rounded-lg"
              />
              <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-['Poppins']">
                03
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-4 w-40 h-8 bg-black/30 rounded-bl-lg rounded-br-lg flex items-center justify-center mx-auto">
            <span className="text-white text-lg font-normal font-['Poppins'] capitalize">
              Felucca
            </span>
          </div>
        </div>
      </div>

      {/* Service Icons Grid */}
      <div className="w-full flex justify-center pt-20">
        <div className="grid grid-cols-6 gap-8 max-w-6xl">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-black text-xl font-normal font-['Inter'] capitalize mb-2">
                {service.title}
              </h3>
              <div className="w-14 h-1 bg-orange-300 mb-4"></div>
              <p className="text-sky-950 text-sm font-normal font-['Inter'] capitalize max-w-44 leading-9">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;