"use client";

import BoatCard from "../BoatCard";
import FilterButton from "./FilterButton";
import { MdOutlineTune } from "react-icons/md";

export default function BoatListingLayout() {
  return (
    <div className="mt-24">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 px-4 sm:px-8 lg:px-16 mb-4">
        <FilterButton onClick={() => {}} label="Price" />
        <FilterButton onClick={() => {}} label="Boats" />
        <FilterButton onClick={() => {}} label="Cabins" />
        <FilterButton onClick={() => {}} label="Activities" />
        <FilterButton
          icon={MdOutlineTune}
          onClick={() => {}}
          label="More filters"
        />
      </div>

      <div className="bg-[#A0A0A0] h-px mx-4 sm:mx-8 lg:mx-16" />

      {/* Heading */}
      <div className="px-4 sm:px-8 lg:px-16">
        <p className="text-2xl sm:text-3xl lg:text-[32px] my-6 font-medium">
          Boats in Aswan
          <span className="text-[#7D7D7D] ml-3 text-sm sm:text-base font-normal">
            (124 found)
          </span>
        </p>

        {/* Boat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 pb-24">
          <BoatCard
            imageUrl="/mainBg.jpg"
            name="Dandara 45"
            price="EGP 800"
            location="Aswan, Egypt"
            guests={45}
            rooms={3}
            status="Available"
          />
          <BoatCard
            imageUrl="/mainBg.jpg"
            name="Dandara 45"
            price="EGP 800"
            location="Aswan, Egypt"
            guests={45}
            rooms={3}
            status="Available"
          />
          <BoatCard
            imageUrl="/mainBg.jpg"
            name="Dandara 45"
            price="EGP 800"
            location="Aswan, Egypt"
            guests={45}
            rooms={3}
            status="Available"
          />
        </div>
      </div>
    </div>
  );
}
