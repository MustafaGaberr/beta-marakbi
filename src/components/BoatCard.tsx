// import Image from 'next/image';

interface BoatCardProps {
  imageUrl: string;
  name: string;
  price: string;
  location: string;
  guests: number;
  status: string;
  rooms: number;
}

const BoatCard = ({ imageUrl, name, price, location, guests, status, rooms }: BoatCardProps) => {
  return (
    <div className="w-96 h-[516px] bg-white rounded-2xl shadow-lg">
      {/* Boat Image */}
      <div className="relative w-96 h-64 rounded-t-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-black text-xl font-semibold font-['Poppins'] mb-2">{name}</h3>

        {/* Price */}
        <p className="text-sky-900 text-base font-medium font-['Poppins'] mb-4">{price}</p>

        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center mr-2.5">
            <svg className="w-4 h-5 text-sky-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-black text-base font-normal font-['Poppins']">{location}</span>
        </div>

        {/* Orange Line */}
        <div className="w-14 h-1 bg-orange-300 mb-4"></div>

        {/* Separator Line */}
        <div className="w-96 h-0 border border-stone-300 mb-4"></div>

        {/* Details */}
        <div className="flex justify-between items-center">
          {/* Guests */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-6 h-3 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <span className="text-black text-base font-normal font-['Poppins']">{guests} Guest</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-black text-base font-normal font-['Poppins']">{status}</span>
          </div>

          {/* Rooms */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-300 rounded-full flex items-center justify-center">
              <svg className="w-5 h-3.5 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-black text-base font-normal font-['Poppins']">{rooms} Rooms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatCard;