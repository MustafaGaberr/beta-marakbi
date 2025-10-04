import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 font-poppins">About Us</h1>
          <p className="text-lg text-gray-600 font-poppins">Discover the story behind Marakbi</p>
        </div>

        {/* Main Content - All in Gray Background */}
        <div className="bg-gray-100 pt-16 px-24 pb-24 rounded-lg">
          {/* Empty space under About Us */}
          <div className="mb-8"></div>
          
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
