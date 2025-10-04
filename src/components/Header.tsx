'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { storage, authApi } from '@/lib/api';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
  currentPage?: string;
}

const Header = ({ variant = 'transparent', currentPage }: HeaderProps) => {
  const [user, setUser] = useState<{ fullName?: string; email?: string; role?: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
  }, []);

  const textColor = variant === 'solid' ? 'text-gray-900' : 'text-white';
  const hoverColor = variant === 'solid' ? 'hover:text-blue-600' : 'hover:text-blue-200';
  const logoVariant = variant === 'solid' ? 'gradient' : 'white';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Call logout API to clear server-side session/cookies
      await authApi.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear local storage and session storage
    storage.clearAll();
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies manually
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
    }
    
    // Redirect based on current page
    if (currentPage === 'home' || window.location.pathname === '/') {
      window.location.href = '/';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <header className="relative z-50">
      {/* Top Bar */}
      <div className="bg-sky-900 h-14 flex items-center justify-between px-4 sm:px-8 md:px-16">
        {/* Left Side: Phone and Email */}
        <div className="flex items-center gap-4 sm:gap-8 md:gap-16">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="text-white text-xs sm:text-sm md:text-base font-normal font-poppins">Phone: +2010 31 41 6 900</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <span className="text-white text-xs sm:text-sm md:text-base font-normal font-poppins">Email: info@marakbi.tours</span>
          </div>
        </div>
        {/* Right Side: List your Boat and Social Icons */}
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="text-white text-xs sm:text-sm md:text-base font-normal font-poppins">List your Boat</span>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            {/* Facebook */}
            <Link href="https://www.facebook.com/profile.php?id=61578325940602" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
              <Image src="/icons/Facebook.svg" alt="Facebook" width={24} height={24} className="w-full h-full" />
            </Link>
            {/* LinkedIn */}
            <Link href="https://www.linkedin.com/company/marakbi" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
              <Image src="/icons/Linkedin.svg" alt="LinkedIn" width={24} height={24} className="w-full h-full" />
            </Link>
            {/* Instagram */}
            <Link href="https://www.instagram.com/marakbi_app/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
              <Image src="/icons/instgram.svg" alt="Instagram" width={24} height={24} className="w-full h-full" />
            </Link>
            {/* YouTube */}
            <Link href="https://www.youtube.com/@marakbi" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative overflow-hidden hover:opacity-80 transition-opacity">
              <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-full h-full" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <nav className={`absolute top-14 left-0 right-0 z-50 ${variant === 'solid' ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Logo width={64} height={100} variant={logoVariant} />
            </Link>
          </div>
          
          {/* Middle: Navigation Links - Desktop */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>Home</Link>
            <Link href="/about-us" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>About us</Link>
            <div className="flex items-center gap-2">
              <span className={`${textColor} text-base font-normal font-poppins`}>Our Services</span>
              <i className={`fas fa-caret-down ${textColor} text-sm`}></i>
            </div>
            <Link href="/contact" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>Contact</Link>
            {/* Search Icon */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className={`w-5 h-5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Right: Auth Links or Profile */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden md:flex items-center gap-6">
                <Link href="/profile" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>
                  My Profile
                </Link>
                {currentPage !== 'dashboard' && (
                  <Link href="/dashboard" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    isLoggingOut 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                  }`}
                >
                  {isLoggingOut && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-6">
                <Link href="/signup" className={`px-4 py-2 border border-orange-300 text-orange-300 text-base font-normal font-poppins rounded hover:bg-orange-300 hover:text-white transition-colors`}>
                  Register
                </Link>
                <Link href="/login" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>
                  Login
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${variant === 'solid' ? 'hover:bg-gray-100' : 'hover:bg-white/10'} transition-colors`}
            >
              <svg className={`w-6 h-6 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${variant === 'solid' ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'} border-t border-gray-200`}>
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about-us" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">About us</Link>
              <span className="block text-gray-800 text-base font-normal font-poppins">Our Services</span>
              <Link href="/contact" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">Contact</Link>
              
              {/* Mobile Auth Links */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/profile" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">
                    My Profile
                  </Link>
                  {currentPage !== 'dashboard' && (
                    <Link href="/dashboard" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-center ${
                      isLoggingOut 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                  >
                    {isLoggingOut && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/login" className="block text-gray-800 text-base font-normal font-poppins hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" className="block px-4 py-2 border border-orange-300 text-gray-800 text-base font-normal font-poppins rounded hover:bg-orange-300 hover:text-white transition-colors text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
