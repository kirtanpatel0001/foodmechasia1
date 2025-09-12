import React from "react";
import Image from "next/image";

const backgroundImg = "/background/Expo 2026.png";

export default function Expo1() {
  return (
    <section suppressHydrationWarning className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <Image
        src={backgroundImg}
        alt="Expo Background"
        fill
        className="object-cover filter blur-sm scale-100 md:blur-md md:scale-105 z-0"
        priority
      />

      {/* Card with accent borders */}
      <div className="relative z-10 flex items-center justify-center w-full">
        {/* Decorative accents (use a small public svg so it won't 404) */}
        <Image
          src="/background/Rectangle 2.png"
          alt="Decorative"
          width={320}
          height={80}
          className="hidden md:block w-80 h-auto absolute -top-6 -right-[-415px] opacity-80"
        />
        <Image
          src="/background/Rectangle 1.png"
          alt="Decorative"
          width={320}
          height={80}
          className="hidden md:block w-80 h-auto absolute -bottom-6 -left-[-415px] opacity-80"
        />

        {/* Main Card - mobile-first smaller paddings and widths, md+ restores original sizes */}
        <div className="relative bg-white rounded-xl shadow-lg px-6 py-6 max-w-xs text-center md:px-8 md:py-10 md:max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-black">Expo 2026</h1>
          <p className="text-base md:text-lg font-medium text-gray-800">
            Welcome to the Food Mech Asia, a celebration
            <br />
            of culinary excellence and gastronomic diversity! Our exhibition brings
            <br />
            together the best in food and beverage from around the world,
            <br />
            offering a unique platform for food enthusiasts,
            <br />
            chefs, and producers to showcase their passion and creativity.
          </p>
        </div>
      </div>
  </section>
  );
}
