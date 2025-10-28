'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import ServicesDropdown from './ServicesDropdown';
import { storage, isAuthenticated } from '@/lib/api';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
  currentPage?: string;
}

const Header = ({ variant = 'transparent', currentPage }: HeaderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName?: string; email?: string; role?: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  type Suggestion = { label: string; href: string; keywords?: string[] };

  const searchSuggestions: Suggestion[] = [
    { label: 'PRIVATE BOATS', href: '/services/private-boats', keywords: ['boats', 'private', 'مراكب', 'قوارب', 'مركب'] },
    { label: 'SHARING BOATS', href: '/services/sharing-boats', keywords: ['sharing', 'shared', 'مشتركة', 'رحلة مشتركة', 'قارب مشترك'] },
    { label: 'TRAVEL BOATS', href: '/services/travel-boats', keywords: ['travel', 'trip', 'رحلات', 'سفر', 'رحلة'] },
    { label: 'FISHING BOATS', href: '/services/fishing-boats', keywords: ['fishing', 'fish', 'صيد', 'مراكب صيد'] },
    { label: 'STAYOVER BOATS', href: '/services/stayover-boats', keywords: ['stayover', 'overnight', 'مبيت', 'مبيت بحري'] },
    { label: 'WATER ACTIVITIES', href: '/services/water-activities', keywords: ['activities', 'water', 'نشاطات', 'أنشطة', 'أنشطة مائية'] },
    { label: 'OCCASIONS', href: '/services/occasions', keywords: ['occasions', 'party', 'مناسبات', 'حفلات'] },
    { label: 'FELUCCA', href: '/services/felucca', keywords: ['felucca', 'فلوكة', 'فلوكه'] },
    { label: 'YACHT', href: '/services/yacht', keywords: ['yacht', 'يخت', 'يachts'] },
    { label: 'TRIPS', href: '/services/trips', keywords: ['trips', 'tours', 'رحلات', 'جولات'] },
    { label: 'BOAT FLEET', href: '/#boat-fleet', keywords: ['fleet', 'boats', 'أسطول', 'أسطول القوارب', 'مراكب'] },
    { label: 'DESTINATIONS', href: '/#destinations', keywords: ['destinations', 'أماكن', 'وجهات', 'معبد'] },
  ];

  const normalizeArabic = (text: string) =>
    text
      .toLowerCase()
      .replace(/أ|إ|آ/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/\s+/g, ' ') // collapse spaces
      .trim();

  const tokenStartsWith = (source: string, query: string) => {
    const q = normalizeArabic(query);
    if (!q) return false;
    return normalizeArabic(source)
      .split(' ')
      .some((tok) => tok.startsWith(q));
  };

  const filteredSuggestions = searchQuery.trim()
    ? searchSuggestions.filter((s) => {
        const pool = [s.label, ...(s.keywords ?? [])];
        return pool.some((p) => tokenStartsWith(p, searchQuery));
      }).slice(0, 8)
    : [];

  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      const userData = storage.getUser();
      if (userData) {
        setUser({
          fullName: userData.username,
          email: userData.email || '',
          role: userData.role || 'user'
        });
      }
    } else {
      setUser(null);
    }
  }, []);


  const textColor = variant === 'solid' ? 'text-gray-900' : 'text-white';
  const hoverColor = variant === 'solid' ? 'hover:text-blue-600' : 'hover:text-blue-200';
  const logoVariant = variant === 'solid' ? 'gradient' : 'white';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Clear token and user data
      storage.clear();
      
      // Clear cookies
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="relative z-50">
      {/* Top Bar - Hidden on Mobile */}
      <div className="hidden sm:flex bg-[#093B77] h-14 items-center justify-between px-8 md:px-16">
        {/* Left Side: Phone and Email */}
        <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src="/icons/phone_in_talk-1.svg" alt="Phone" width={18} height={18} />
            </div>
            <Link href="tel:+201031416900" className="text-white text-sm md:text-base font-normal font-poppins hover:text-orange-300 transition-colors">
              Phone: +2010 31 41 6 900
            </Link>
          </div>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src="/icons/mail.svg" alt="Email" width={18} height={18} />
            </div>
            <Link href="mailto:info@marakbi.tours" className="text-white text-sm md:text-base font-normal font-poppins hover:text-orange-300 transition-colors">
              Email: info@marakbi.tours
            </Link>
          </div>
        </div>
        {/* Right Side: List your Boat and Social Icons */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/list-boat" className="text-white text-sm md:text-base font-normal font-poppins hover:text-orange-300 transition-colors">
            List your Boat
          </Link>
          <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
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
      <nav className={`absolute top-0 sm:top-14 left-0 right-0 z-50 ${variant === 'solid' ? 'bg-white shadow-sm' : 'bg-[#093B77] sm:bg-transparent'}`}>
        <div className="px-4 sm:px-8 md:px-16 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo - Left on Mobile & Desktop */}
          <div className="flex items-center">
            <Link href="/" className="block">
              {/* Mobile Logo - Always White */}
              <div className="block sm:hidden">
                <Logo width={48} height={60} variant="white" />
              </div>
              {/* Desktop Logo - Depends on page variant */}
              <div className="hidden sm:block">
                <Logo width={64} height={80} variant={logoVariant} />
              </div>
            </Link>
          </div>
          
          {/* Middle: Navigation Links - Desktop Only */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>Home</Link>
            <Link href="/about-us" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>About us</Link>
            {/* Our Services Dropdown */}
            <ServicesDropdown variant={variant} />
            <Link href="/contact" className={`${textColor} text-base font-normal font-poppins ${hoverColor} transition-colors`}>Contact</Link>
            {/* Search Icon + Expanding Input (Desktop) */}
            <div className="relative flex items-center">
              <button
                aria-label="Open search"
                onClick={() => {
                  setIsSearchOpen((v) => !v);
                  setTimeout(() => searchInputRef.current?.focus(), 0);
                }}
                className="w-6 h-6 flex items-center justify-center"
              >
                <svg className={`w-5 h-5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = (filteredSuggestions[0] ?? null);
                    if (target) {
                      router.push(target.href);
                      setIsSearchOpen(false);
                    }
                  } else if (e.key === 'Escape') {
                    setIsSearchOpen(false);
                  }
                }}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 120)}
                placeholder="Search..."
                className={`absolute left-full ml-2 h-9 rounded-full bg-white text-gray-900 placeholder-gray-400 shadow border border-gray-200 px-4 transition-all duration-300 ease-out ${
                  isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
              />
              {/* Suggestions Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className={`absolute left-full top-full ml-2 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-hidden transition-opacity duration-200 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {filteredSuggestions.map((s, idx) => (
                    <Link
                      key={`${s.href}-${idx}`}
                      href={s.href}
                      className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onMouseDown={(e) => {
                        // prevent input blur from cancelling navigation before push
                        e.preventDefault();
                        router.push(s.href);
                        setIsSearchOpen(false);
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                  {filteredSuggestions.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500">No results</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Auth Links (Desktop) & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Desktop Auth Links */}
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
            
            {/* Burger Menu Button - Mobile Only (Right Side) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className={`md:hidden ${variant === 'solid' ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'} border-t border-gray-200 animate-fade-in`}>
            <div className="px-6 py-6 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
              >
                Home
              </Link>
              <Link 
                href="/about-us" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
              >
                About us
              </Link>
              
              {/* Services Section */}
              <div className="space-y-2">
                <span className="block text-gray-800 text-base font-semibold font-poppins px-3 py-2">Our Services</span>
                <div className="ml-2 space-y-1 pl-3 border-l-2 border-blue-100">
                  <Link 
                    href="/services/private-boats" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Private Boats
                  </Link>
                  <Link 
                    href="/services/sharing-boats" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Sharing Boats
                  </Link>
                  <Link 
                    href="/services/travel-boats" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Travel Boats
                  </Link>
                  <Link 
                    href="/services/fishing-boats" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Fishing Boats
                  </Link>
                  <Link 
                    href="/services/stayover-boats" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Stayover Boats
                  </Link>
                  <Link 
                    href="/services/water-activities" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Water Activities
                  </Link>
                  <Link 
                    href="/services/occasions" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 text-sm font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    Occasions
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
              >
                Contact
              </Link>
              
              {/* Mobile Auth Links */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    My Profile
                  </Link>
                  {currentPage !== 'dashboard' && (
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`w-full px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
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
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-800 text-base font-medium font-poppins hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 border-2 border-orange-300 text-orange-300 text-base font-medium font-poppins rounded-lg hover:bg-orange-300 hover:text-white transition-all text-center"
                  >
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
