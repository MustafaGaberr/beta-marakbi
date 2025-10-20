import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

const UnderConstruction = () => {
  return (
    <>
      <Header variant="solid" />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Content - All in Gray Background */}
          <div className="bg-gray-100 pt-16 px-24 pb-24 rounded-lg">
            {/* Inner Container - Smaller width */}
            <div className="max-w-4xl mx-auto">
              {/* Construction Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-poppins text-center">
                Under Construction
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-orange-300 mb-8 font-poppins text-center">
                We&apos;re Building Something Amazing
              </p>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-poppins text-center">
                Our website is currently under development. We&apos;re working hard to bring you 
                the best boat rental experience in Egypt. Please check back soon!
              </p>

              {/* Features Coming Soon */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-poppins">Luxury Boats</h3>
                  <p className="text-gray-600 text-sm font-poppins">Premium yacht rentals</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-poppins">Easy Booking</h3>
                  <p className="text-gray-600 text-sm font-poppins">Simple online reservation</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-poppins">24/7 Support</h3>
                  <p className="text-gray-600 text-sm font-poppins">Round-the-clock assistance</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
                <h3 className="text-gray-800 font-semibold mb-6 font-poppins text-center text-xl">Get in Touch</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="text-gray-600 font-poppins text-lg">+2010 31 41 6 900</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="text-gray-600 font-poppins text-lg">info@marakbi.tours</span>
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors font-poppins"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnderConstruction;