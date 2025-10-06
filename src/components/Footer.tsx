import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-t from-[#083872] via-[#0A4489] to-[#106BD8]">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-1 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Column 1: Logo and Description */}
          <div className="space-y-6 md:col-span-2 md:pr-8 lg:pr-10">
            <div className="flex items-center space-x-3">
              <Logo variant="white" width={72} height={90} />
            </div>
            <p className="text-gray-300 text-base leading-7 font-poppins">
              <span>Marakbi is your premier digital gateway to</span><br/>
              <span>effortless boat rentals across Egypt&apos;s</span><br/>
              <span>majestic Nile and vibrant Red Sea. We</span><br/>
              <span>connect you with a diverse fleet, from</span><br/>
              <span>authentic feluccas to luxury yachts,</span><br/>
              <span>blending local expertise with cutting-edge</span><br/>
              <span>technology for your unforgettable aquatic</span><br/>
              <span>adventure.</span>
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xl text-amber-300 font-semibold mb-6 font-poppins">Marakbi Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Boat Rentals
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Water Sports
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Family activities
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Fishing Trips
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Occassions
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Travel Boat
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Dahabya
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-xl text-amber-300 font-semibold mb-6 font-poppins">Useful Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className=" hover:text-orange-300 transition-colors font-poppins">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h4 className="text-xl text-amber-300 font-semibold mb-6 font-poppins">Subscribe</h4>
            <p className="text-gray-300 font-poppins mb-6">If you want to stay updated and receive regular information subscribing is a great option.</p>
            <p className="text-gray-300 mb-3 font-poppins">Email Newsletter</p>
            <div className="flex items-stretch w-full rounded-xl overflow-hidden shadow-sm">
              <div className="relative bg-white/90 flex-[4]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-14 pl-5 pr-12 bg-transparent text-[#093B77] placeholder-gray-500 focus:outline-none font-poppins"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <div className="w-px bg-[#0E5AA3]" />
              <button className="h-14 px-6 bg-[#CEAF6E] text-[#093B77] font-semibold hover:bg-[#d8ba78] transition-colors font-poppins flex-[1]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300 font-poppins">+2010 31 41 6 900</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300 font-poppins">info@marakbi.tours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 font-poppins">Aswan - Egypt</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61578325940602" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="https://www.instagram.com/marakbi_app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/marakbi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link href="https://www.youtube.com/@marakbi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm font-poppins">
              © 2025 Marakbi. All rights reserved. Experience luxury on Egyptian waters.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
                Terms of Use
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;