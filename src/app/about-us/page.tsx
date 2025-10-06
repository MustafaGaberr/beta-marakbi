import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section (same style as My Profile) */}
      <div className="bg-black relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-60" 
             style={{backgroundImage: "url('/images/Rectangle 3463880.jpg')"}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            {/* Left Side - Title */}
            <div className="flex flex-col items-start">
              <h1 className="text-6xl font-bold text-white font-poppins leading-tight">About</h1>
              <h1 className="text-6xl font-bold text-white font-poppins leading-tight">Us</h1>
            </div>
            
            {/* Vertical Line */}
            <div className="w-px h-32 bg-white mx-8"></div>
            
            {/* Right Side - Description */}
            <div className="flex-1 max-w-2xl">
              <p className="text-xl text-white leading-relaxed font-poppins">
                No Matter The Journey, We Have A Boat For Your Story. Explore Egypt&apos;s Stunning Waterways With A Curated Selection Of Vessels And Seasoned Captains.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* What We Aim Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="signpainter-title">Know Us More</p>
          <h2 className="text-5xl sm:text-6xl font-bold font-poppins text-gray-900 mt-2">What We Aim</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Images cluster */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-3xl flex items-center justify-center gap-6">
              {/* Small left (up) */}
              <div className="transform -translate-y-6">
                <Image src="/images/Frame 1321316468.png" alt="Boat trip" width={260} height={220} className="rounded" />
              </div>
              {/* Center main */}
              <div className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] border-4 border-sky-500">
                <Image src="/images/Frame 1321316466.png" alt="Nile view" width={420} height={420} className="w-full h-auto" />
              </div>
              {/* Small right (down) */}
              <div className="transform translate-y-6">
                <Image src="/images/Frame 1321316468.png" alt="Boat trip" width={300} height={240} className="rounded" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:col-span-6">
            <p className="leading-relaxed mb-4">
              <span className="text-black text-[18px] font-poppins font-bold">Marakbi is dedicated to making boat trips easy for everyone.</span>{' '}
              <span className="text-black text-[18px] font-poppins font-normal">We believe that every person—whether you are booking your first boat or you&apos;re an experienced sailor—should have no trouble finding the perfect ride.</span>
            </p>
            <p className="leading-relaxed">
              <span className="text-black text-[18px] font-poppins font-bold">Our main focus is making it fast to book a boat anywhere you need one.</span>{' '}
              <span className="text-black text-[18px] font-poppins font-normal">We are always improving our service and listing new boats. Most importantly, we have strong rules to make sure every trip is safe and respects the environment.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content - All in Gray Background */}
        <div className="bg-gray-100 pt-16 px-6 sm:px-10 lg:px-24 pb-24 rounded-lg">
          {/* Inner Container - Smaller width */}
          <div className="max-w-4xl">
            {/* Main Heading */}
            <div className="mb-16">
              <h2 className="privacy-main-heading">
                Your Gateway to Egypt&apos;s Most Beautiful Waterways
              </h2>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Our Story</h3>
                <p className="privacy-section-text">
                  Founded in the heart of Aswan, Marakbi was born from a passion for showcasing Egypt&apos;s stunning waterways. 
                  We believe that every journey on water should be memorable, safe, and luxurious.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Our Mission</h3>
                <p className="privacy-section-text">
                  To connect travelers with Egypt&apos;s finest boat experiences, from traditional feluccas to modern yachts, 
                  ensuring every voyage is unforgettable and every moment is cherished.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Why Choose Marakbi</h3>
                <ul className="list-disc list-inside space-y-3 ml-6">
                  <li className="privacy-section-text">Curated selection of premium boats and experienced captains</li>
                  <li className="privacy-section-text">24/7 customer support and safety monitoring</li>
                  <li className="privacy-section-text">Transparent pricing with no hidden fees</li>
                  <li className="privacy-section-text">Local expertise and insider knowledge of Egypt&apos;s waterways</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Our Commitment</h3>
                <p className="privacy-section-text">
                  We are committed to sustainable tourism practices, supporting local communities, 
                  and preserving Egypt&apos;s natural beauty for future generations to enjoy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
