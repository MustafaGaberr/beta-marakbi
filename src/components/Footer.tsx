import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-t from-[#083872] via-[#0A4489] to-[#106BD8]">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-1 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4 md:col-span-2 md:pr-4 lg:pr-6">
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
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Boat Rentals
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Water Sports
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Family activities
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Fishing Trips
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Occasions
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Travel Boat
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Dahabya
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-xl text-amber-300 font-semibold mb-6 font-poppins">Useful Links</h4>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <Link href="/about-us" className=" hover:text-orange-300 transition-colors font-poppins">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className=" hover:text-orange-300 transition-colors font-poppins">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-orange-300 transition-colors font-poppins">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/faqs" className=" hover:text-orange-300 transition-colors font-poppins">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className=" hover:text-orange-300 transition-colors font-poppins">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className=" hover:text-orange-300 transition-colors font-poppins">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className=" hover:text-orange-300 transition-colors font-poppins">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            
            {/* Download App Buttons */}
            <div className="mt-6">
              <h5 className="text-lg text-amber-300 font-semibold mb-4 font-poppins">Download App</h5>
              <div className="flex flex-col space-y-3">
                <Link 
                  href="https://play.google.com/store/apps/details?id=com.marakbi.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-black/20 hover:bg-black/30 rounded-lg p-3 transition-colors"
                >
                  <Image src="/icons/flat-color-icons_google.svg" alt="Google Play" width={32} height={32} className="w-8 h-8" />
                  <div>
                    <p className="text-white text-sm font-poppins">Get it on</p>
                    <p className="text-white text-base font-semibold font-poppins">Google Play</p>
                  </div>
                </Link>
                
                <Link 
                  href="https://apps.apple.com/app/marakbi/id123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-black/20 hover:bg-black/30 rounded-lg p-3 transition-colors"
                >
                  <Image src="/icons/flat-color-icons_apple.svg" alt="App Store" width={32} height={32} className="w-8 h-8" />
                  <div>
                    <p className="text-white text-sm font-poppins">Download on the</p>
                    <p className="text-white text-base font-semibold font-poppins">App Store</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h4 className="text-xl text-amber-300 font-semibold mb-6 font-poppins">Subscribe</h4>
            <p className="text-gray-300 font-poppins mb-6">If you want to stay updated and receive regular information subscribing is a great option.</p>
            <p className="text-gray-300 mb-3 font-poppins">Email Newsletter</p>
            <div className="flex items-stretch w-full rounded-xl overflow-hidden shadow-sm">
              <div className="relative bg-white/90 flex-[3]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-14 pl-4 pr-10 bg-transparent text-[#093B77] placeholder-gray-500 focus:outline-none font-poppins"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="border-t border-gray-400">
        <div className="container mx-auto px-1 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-74">
              <div className="flex items-center space-x-2">
                <Image src="/icons/phone_in_talk_y.svg" alt="Phone" width={20} height={20} className="w-5 h-5" />
                <Link href="tel:+201031416900" className="text-gray-300 font-poppins hover:text-orange-300 transition-colors">
                  +2010 31 41 6 900
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/icons/mail-1.svg" alt="Email" width={20} height={20} className="w-5 h-5" />
                <Link href="mailto:info@marakbi.tours" className="text-gray-300 font-poppins hover:text-orange-300 transition-colors">
                  info@marakbi.tours
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/icons/home_pin.svg" alt="Location" width={20} height={20} className="w-5 h-5" />
                <span className="text-gray-300 font-poppins">Aswan - Egypt</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-6">
              <Link href="https://www.facebook.com/profile.php?id=61578325940602" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/icons/Facebook.svg" alt="Facebook" width={24} height={24} className="w-full h-full" />
              </Link>
              <Link href="https://www.linkedin.com/company/marakbi" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/icons/Linkedin.svg" alt="LinkedIn" width={24} height={24} className="w-full h-full" />
              </Link>
              <Link href="https://www.instagram.com/marakbi_app/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/icons/instgram.svg" alt="Instagram" width={24} height={24} className="w-full h-full" />
              </Link>
              <Link href="https://www.youtube.com/@marakbi" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-full h-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm font-poppins">
              © 2025 Marakbi. All rights reserved. Experience luxury on Egyptian waters.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
                Terms of Use
              </Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-orange-300 transition-colors font-poppins">
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