import Image from "next/image";
import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import TripDetailsCell from "./TripDetailsCell";
import TripDetailsCellItem from "./TripDetailsCellItem";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineAssignmentInd, MdOutlineGroups2 } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { HiLockOpen } from "react-icons/hi";

export default function TripDetails() {
  return (
    <div className="border-2 w-full overflow-hidden border-[#C0C0C0] rounded-lg text-sm sm:text-base">
      {/* === 1. Main Image & Header === */}
      <TripDetailsCell>
        <div className="relative h-[160px] sm:h-[200px] md:h-[240px] overflow-hidden rounded-md">
          <Image
            alt="paymentBg"
            src="/paymentBg.jpg"
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-[22px] sm:text-[26px] md:text-[28px] mt-3 mb-2 font-semibold leading-tight">
          Aswan Felucca Boat
        </p>

        <div className="flex flex-wrap text-[#CEAF6E] items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IoStarSharp key={i} size={18} className="sm:size-[20px]" />
            ))}
          </div>
          <IoMdThumbsUp size={22} className="ml-1 sm:ml-2 text-[#CEAF6E]" />
          <div className="flex gap-1 text-[#7D7D7D] text-sm sm:text-base">
            <span>4.3</span>
            <span>(325)</span>
          </div>
        </div>
      </TripDetailsCell>

      {/* === 2. Location, Date, Guests === */}
      <TripDetailsCell>
        <div className="flex flex-col gap-3 sm:gap-4">
          <TripDetailsCellItem
            Icon={RiMapPin2Line}
            description="35 Kornish El-Nile - Aswan - Aswan infront of Government building"
          />
          <TripDetailsCellItem
            Icon={FaRegClock}
            description="Monday, October 24, 2025 at 4:00 AM"
          />
          <TripDetailsCellItem Icon={MdOutlineGroups2} description="3 Guests" />
        </div>
      </TripDetailsCell>

      {/* === 3. Cancellation Policy === */}
      <TripDetailsCell>
        <TripDetailsCellItem
          Icon={HiLockOpen}
          description="Free cancellation"
          details="Until 4:00 AM on October 23"
        />
      </TripDetailsCell>

      {/* === 4. Contact Info === */}
      <TripDetailsCell>
        <TripDetailsCellItem
          editBtn
          Icon={MdOutlineAssignmentInd}
          description={`Ahmed Hussein\nuser-example@mail.com\n(+20)010368 554545`}
        />
      </TripDetailsCell>

      {/* === 5. Total Section === */}
      <TripDetailsCell grayBg>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <p className="text-base sm:text-lg font-semibold">Total</p>
          <div className="text-right sm:text-left">
            <p className="text-lg sm:text-xl mb-0.5 font-semibold">1953 EGP</p>
            <p className="text-[#A0A0A0] text-xs sm:text-sm font-normal">
              All taxes & Fees included
            </p>
          </div>
        </div>
      </TripDetailsCell>
    </div>
  );
}
