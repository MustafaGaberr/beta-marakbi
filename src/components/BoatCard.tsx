import Image from "next/image";
import {
  MdOutlineBed,
  MdOutlineGroups2,
  MdOutlineLocationOn,
} from "react-icons/md";
import { GiMeal } from "react-icons/gi";

interface BoatCardProps {
  imageUrl: string;
  name: string;
  price: string;
  location: string;
  guests: number;
  status: string;
  rooms: number;
}

export default function BoatCard({
  imageUrl,
  name,
  price,
  location,
  guests,
  status,
  rooms,
}: BoatCardProps) {
  return (
    <div className="bg-white cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-md sm:max-w-lg mx-auto">
      {/* Image */}
      <div className="px-3 pt-3.5">
        <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 py-4 flex flex-col items-center text-center gap-2">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">{name}</p>
        <p className="text-[#093B77] text-sm sm:text-base font-medium">
          {price} / Hour
        </p>

        <div className="my-2">
          <Image src="/CardLine.png" alt="divider" width={56} height={3} />
        </div>

        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <MdOutlineLocationOn color="#0B4C99" size={22} />
          <p className="text-gray-600 text-sm sm:text-base">{location}</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200" />

      {/* Info Row */}
      <div className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 text-sm sm:text-base flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <MdOutlineGroups2 color="#927C4E" size={20} />
          <span>{guests} Guests</span>
        </div>

        <div className="flex items-center gap-2">
          <GiMeal color="#927C4E" size={20} />
          <span>{status}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineBed color="#927C4E" size={20} />
          <span>{rooms} Rooms</span>
        </div>
      </div>
    </div>
  );
}
