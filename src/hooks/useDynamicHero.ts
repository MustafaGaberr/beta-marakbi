"use client";

import { usePathname } from "next/navigation";

export default function useDynamicHero() {
  const pathname = usePathname();

  const paths = [
    {
      route: "/about",
      title: "About\nUs",
      description:
        "No matter the journey, we have a boat for your story. Explore Egypt’s stunning waterways with a curated selection of vessels and seasoned captains.",
      background: "/mainBg.jpg",
    },
    {
      route: "/boat-listing",
      title: "Boat\nListing",
      description:
        "No matter the journey, we have a boat for your story. Explore Egypt’s stunning waterways with a curated selection of vessels and seasoned captains.",
      background: "/mainBg.jpg",
    },
    {
      route: "/contact",
      title: "Contact\nUs",
      description:
        "Get in touch with our team for bookings, inquiries, or partnership opportunities.",
      background: "/contactBg.jpg",
    },
  ];

  // Find the route that matches the current pathname
  const matchedPath =
    paths.find((path) => pathname.includes(path.route)) || paths[0];

  // Split the title by \n for multi-line rendering
  const title = matchedPath.title;

  return {
    title,
    description: matchedPath.description,
    background: matchedPath.background,
  };
}
