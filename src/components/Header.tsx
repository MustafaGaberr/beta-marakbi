import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="relative">
      {/* Top Bar */}
      <div className="bg-sky-900 h-14 flex items-center justify-between px-16">
        {/* Left Side: Phone and Email */}
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="text-white text-base font-normal font-['Poppins']">Phone: +2010 31 41 6 900</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <span className="text-white text-base font-normal font-['Poppins']">Email: info@marakbi.tours</span>
          </div>
        </div>
        {/* Right Side: List your Boat and Social Icons */}
        <div className="flex items-center gap-8">
          <span className="text-white text-base font-normal font-['Poppins']">List your Boat</span>
          <div className="flex items-center gap-8">
            {/* Facebook */}
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-6 h-6 bg-orange-300 absolute"></div>
              <svg className="w-3 h-5 absolute left-[9px] top-[4.5px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-6 h-6 bg-orange-300 absolute"></div>
              <svg className="w-[3.47px] h-2.5 absolute left-[4.92px] top-[4.73px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            {/* Instagram */}
            <div className="w-6 h-6 relative">
              <div className="w-6 h-6 bg-orange-300 absolute"></div>
            </div>
            {/* YouTube */}
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-6 h-6 bg-orange-300 absolute"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navigation Bar */}
      <nav className="absolute top-14 left-0 right-0 z-10">
        <div className="px-16 py-4 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <Logo width={64} height={100} />
          </div>
          {/* Middle: Navigation Links */}
          <div className="flex gap-6">
            <span className="text-white text-base font-normal font-['Poppins']">Home</span>
            <span className="text-white text-base font-normal font-['Poppins']">About us</span>
            <div className="flex items-center gap-2">
              <span className="text-white text-base font-normal font-['Poppins']">Our Services</span>
              <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-[5px] text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-white text-base font-normal font-['Poppins']">Contact</span>
          </div>
          {/* Right: Search Icon */}
          <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
