"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// CSS for animations
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Service {
  id: number;
  name: string;
  image: string;
  description?: string;
}

interface ServicesDropdownProps {
  variant?: 'transparent' | 'solid';
}

const ServicesDropdown = ({ variant = 'transparent' }: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      name: "Private Boats",
      image: "/images/Frame 1321316435.png",
      description: "Exclusive private boat rentals"
    },
    {
      id: 2,
      name: "Sharing Trips",
      image: "/images/Frame 1321316436.png",
      description: "Group boat trips and experiences"
    },
    {
      id: 3,
      name: "Travel Boats",
      image: "/images/Frame 1321316437.png",
      description: "Long-distance travel boats"
    },
    {
      id: 4,
      name: "Fishing Boats",
      image: "/images/Frame 1321316438.png",
      description: "Fishing expeditions and trips"
    },
    {
      id: 5,
      name: "Water Activities",
      image: "/images/Frame 1321316439.png",
      description: "Water sports and activities"
    },
    {
      id: 6,
      name: "Occasion",
      image: "/images/Frame 1321316440.png",
      description: "Special events and celebrations"
    }
  ];

  // Handle hover and click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const textColor = variant === 'solid' ? 'text-gray-900' : 'text-white';
  const hoverColor = variant === 'solid' ? 'hover:text-blue-600' : 'hover:text-orange-300';

  return (
    <>
      <style>{styles}</style>
       <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       {/* Trigger Button */}
       <button
         className={`flex items-center gap-1 ${textColor} ${hoverColor} transition-colors`}
       >
        Our Services
        <Image
          src="/icons/arrow_drop_down-1.svg"
          alt="Dropdown arrow"
          width={16}
          height={16}
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} filter brightness-0 invert`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[1100px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
             style={{
               animation: 'slideDown 0.3s ease-out'
             }}>
          <div className='py-2'>

            
            {/* Horizontal Row of Service Cards */}
            <div className="flex flex-nowrap gap-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group cursor-pointer hover:scale-103 transition-all duration-200 bg-gray-50 hover:bg-white rounded-lg p-3 hover:shadow-md flex-shrink-0 w-44"
                  onClick={() => {
                    console.log(`Selected service: ${service.name}`);
                    setIsOpen(false);
                    // يمكن إضافة navigation هنا لاحقاً
                  }}
                >
                  {/* Service Image */}
                  <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={176}
                      height={96}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-colors duration-200"></div>
                  </div>
                  
                  {/* Service Name */}
                  <h3 className="text-gray-800 text-base font-semibold font-poppins text-center group-hover:text-blue-600 transition-colors duration-200">
                    {service.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ServicesDropdown;
