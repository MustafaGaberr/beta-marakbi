import BoatListingLayout from "@/components/boatListing/BoatListingLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boat Listing",
};

export default function page() {
  return <BoatListingLayout />;
}
