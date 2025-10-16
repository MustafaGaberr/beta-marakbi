// import Image from 'next/image';

const AboutApp = () => {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
          <p className="text-4xl lg:text-5xl font-signpainter text-[#927C4E] mb-4">
          what is marakbi
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-black font-poppins mb-6">
          About us
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-4xl mx-auto leading-relaxed">
          Discover the soul of Egypt&apos;s waters with Marakbi. We connect you with authentic local captains and unforgettable journeys across the country&apos;s seas and rivers.
          </p>
        </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Text Content */}
          <div>
            <h2 className="text-[#072D5B] text-5xl font-semibold font-poppins mb-8 leading-tight">
              Providing a large fleet of Boats for a perfect and dreamy experience
            </h2>

            <p className="text-[#093B77] text-lg font-normal font-poppins leading-9 mb-8">
              Born in Aswan, Marakbi offers authentic experiences across Egypt&apos;s prime waters.
              We connect you to a network of vetted, professional boat owners and captains on the
              Nile River, the Red Sea, and the Mediterranean Sea. You&apos;re not just renting a boat;
              you&apos;re gaining access to expert local knowledge for a safe and unforgettable journey.
            </p>

            <ul className="space-y-3">
              <li className="text-[#093B77] text-lg font-semibold font-poppins leading-9 flex items-start">
                <span className=" mr-3">•</span>
                Premium Boats & Yachts
              </li>
              <li className="text-[#093B77] text-lg font-semibold font-poppins leading-9 flex items-start">
                <span className=" mr-3">•</span>
                Our Professional Approach
              </li>
              <li className="text-[#093B77] text-lg font-semibold font-poppins leading-9 flex items-start">
                <span className=" mr-3">•</span>
                AR/VR Experience
              </li>
              <li className="text-[#093B77] text-lg font-semibold font-poppins leading-9 flex items-start">
                <span className=" mr-3">•</span>
                360 Video Experience
              </li>
              <li className="text-[#093B77] text-lg font-semibold font-poppins leading-9 flex items-start">
                <span className=" mr-3">•</span>
                AI Chatbot
              </li>
            </ul>

            <div className="mt-8">
              <img
                src="/images/image 2.png"
                alt="App Store"
                className="w-52 h-11"
              />
            </div>
            <div className=" pl-4 mb-8">
              <p className="text-black text-sm font-normal font-poppins leading-9">
                CTO & Founder, Marakbi App
              </p>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-end">
            <img
              src="/images/image 1.png"
              alt="Boat Image"
              className="w-[640px] h-[661px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApp;