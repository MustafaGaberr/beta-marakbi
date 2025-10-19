"use client";

import Image from "next/image";
import useDynamicHero from "@/hooks/useDynamicHero";

export default function DynamicHero() {
  const { title, description, background } = useDynamicHero();

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={background}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
        {/* Left Side - Title */}
        <div className="text-center md:text-left flex-1">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line">
            {title}
          </p>
        </div>

        {/* Divider (visible only on medium and up) */}
        <div className="hidden md:block w-px h-24 bg-white/70" />

        {/* Right Side - Description */}
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <p className="text-sm sm:text-base lg:text-lg font-light text-gray-100 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
