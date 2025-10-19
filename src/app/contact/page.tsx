import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 font-poppins">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 font-poppins">
            Get in touch with our team
          </p>
        </div>

        {/* Main Content - All in Gray Background */}
        <div className="bg-gray-100 pt-16 px-24 pb-24 rounded-lg">
          {/* Empty space under Contact Us */}
          <div className="mb-8"></div>

          {/* Inner Container - Smaller width */}
          <div className="max-w-4xl">
            {/* Main Heading */}
            <div className="mb-16">
              <h2 className="privacy-main-heading">
                We&apos;re Here to Help You Plan Your Perfect Water Adventure
              </h2>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="privacy-section-text">
                      Phone: +2010 31 41 6 900
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="privacy-section-text">
                      Email: info@marakbi.tours
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="privacy-section-text">
                      Location: Aswan, Egypt
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Business Hours</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li className="privacy-section-text">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </li>
                  <li className="privacy-section-text">
                    Saturday: 10:00 AM - 4:00 PM
                  </li>
                  <li className="privacy-section-text">Sunday: Closed</li>
                  <li className="privacy-section-text">
                    Emergency Support: 24/7
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="privacy-section-heading mb-4">
                  How We Can Help
                </h3>
                <ul className="list-disc list-inside space-y-3 ml-6">
                  <li className="privacy-section-text">
                    Boat rental and booking assistance
                  </li>
                  <li className="privacy-section-text">
                    Custom itinerary planning
                  </li>
                  <li className="privacy-section-text">
                    Group bookings and corporate events
                  </li>
                  <li className="privacy-section-text">
                    Technical support and troubleshooting
                  </li>
                  <li className="privacy-section-text">
                    General inquiries and feedback
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="privacy-section-heading mb-4">Response Time</h3>
                <p className="privacy-section-text">
                  We typically respond to all inquiries within 2-4 hours during
                  business hours. For urgent matters, please call us directly
                  for immediate assistance.
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
