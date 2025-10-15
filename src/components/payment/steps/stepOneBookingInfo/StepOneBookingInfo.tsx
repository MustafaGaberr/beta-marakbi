import React from "react";
import PaymentOption from "./PaymentOption";
import TripDetails from "./tripDetails/TripDetails";

export default function StepOneBookingInfo() {
  return (
    <div
      className="
        flex flex-col-reverse lg:flex-row 
        justify-between 
        gap-8 md:gap-12 lg:gap-24 xl:gap-32 
        w-full 
        px-4 sm:px-6 lg:px-0
      "
    >
      {/* Left side: Payment options */}
      <div className="w-full lg:w-[60%]">
        <PaymentOption />
      </div>

      {/* Right side: Trip details */}
      <div className="w-full lg:w-[40%]">
        <TripDetails />
      </div>
    </div>
  );
}
