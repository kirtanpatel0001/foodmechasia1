"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

// Slides configuration - only the first slide is prioritized for faster initial load
const SLIDES = [
  { src: "/background/background 102.png.jpg", textColor: "white" },
  { src: "/background/background 103.png.jpg", textColor: "white" },
  { src: "/background/background 104.png.jpg", textColor: "white" },
  { src: "/background/background 105.png.jpg", textColor: "white" },
  { src: "/background/background 106.png.jpg", textColor: "white" },
  { src: "/background/background 107.png.jpg", textColor: "white" },
  { src: "/background/sawamiji.JPG", textColor: "white" },
];

export default function HeroSection() {
  // Render a single server-friendly image for LCP, then mount client slideshow after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const orderedSlides = useMemo(() => SLIDES, []);
  const firstSlide = orderedSlides[0];
  const textColor = firstSlide?.textColor || "white";

  return (
    <section suppressHydrationWarning id="top" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Critical LCP image (SSR) */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={encodeURI(firstSlide.src)}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* Client-only slideshow mounted after hydration */}
      {mounted && (
        <div className="absolute inset-0 z-0 bg-slideshow" aria-hidden>
          {orderedSlides.map((slide, i) => (
            <div key={slide.src} className="bg-slide-item absolute inset-0 z-0 transition-opacity duration-700" style={{ opacity: i === 0 ? 1 : 0 }}>
              <Image src={encodeURI(slide.src)} alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
      )}

      {/* Overlay for text contrast */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", background: "linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42))", transition: "background 300ms ease" }} />

      {/* Content */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-8 py-16 pt-0 relative z-20">
        {/* Headings */}
        <h1
          className="font-semibold leading-tight mb-4 text-3xl sm:text-2xl md:text-[54px]"
          style={{ fontFamily: "Kantumruy Pro, sans-serif", color: textColor }}
        >
          Experience Asia’s Premier
        </h1>

        <h2
          className="font-semibold leading-tight mb-4 text-3xl sm:text-4xl md:text-[54px]"
          style={{ fontFamily: "Kantumruy Pro, sans-serif", color: textColor }}
        >
          Food Industry Exhibition
        </h2>

        {/* Edition + tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 relative">
          <span
            className="text-[#E41146] font-semibold mr-0 sm:mr-4 relative inline-block text-xl sm:text-3xl md:text-[54px] whitespace-nowrap sm:whitespace-normal mb-2 sm:mb-0"
            style={{ fontFamily: "Kantumruy Pro, sans-serif" }}
          >
            15th Edition
            <Image
              src="/icons/img_line_1.svg"
              alt="underline"
              width={270}
              height={40}
              className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-[160px] sm:w-[220px] md:w-[270px]"
              style={{
                bottom: -23,
                pointerEvents: "none",
                userSelect: "none",
                opacity: 0.95,
              }}
              priority={true}
            />
          </span>

          <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: textColor }}>
            - bringing Innovation,
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8" style={{ color: textColor }}>
          Opportunities & Networking
        </h3>

        {/* Event Info + Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 w-full">
          {/* Date + Location */}
          <div className="flex flex-col gap-6 items-center text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-md ml-[5px]">
                {/* Calendar icon */} 
                <Image src="/icons/calander.png" alt="calendar" width={36} height={36} className="inline-block" />
              </div>
              <div className="text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16 }}>
                <div className="font-bold" style={{ color: textColor }}>
                  6–9 February, 2026
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-md ml-[20px]">
                <Image src="/icons/location.png" alt="location" width={32} height={32} className="inline-block" />
              </div>
              <div className="text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16 }}>
                <div className="font-bold" style={{ color: textColor }}>
                  Vanita Vishram Ground
                </div>
                <div style={{ color: textColor }}>Surat, Gujarat</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 items-center w-full sm:w-auto">
            <button
              className="px-8 py-3 rounded-lg bg-lime-400 text-white font-bold border-2 border-lime-600 shadow-md hover:bg-lime-500 transition-all w-full sm:w-44"
              style={{ boxShadow: "0 6px 12px 0 #b6d43a" }}
              onClick={() => (window.location.href = "/bookstall")}
            >
              Book Now
            </button>

            <button
              className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-bold border-2 border-yellow-600 shadow-md hover:bg-yellow-500 transition-all w-full sm:w-44"
              style={{ boxShadow: "0 6px 12px 0 #f7d13b" }}
              onClick={() => (window.location.href = "/visitor")}
            >
              Visitor Pass
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
