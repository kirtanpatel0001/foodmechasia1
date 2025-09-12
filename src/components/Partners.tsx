// app/components/Partners.tsx
'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const partners = [
  {
    img: "/assiosatepatners/WhatsApp Image 2025-09-04 at 11.28.24_a164630e.jpg",
    title: "AFRO INDIA TRADE",
    desc: "Leading international trade partner for food industry collaborations.",
    highlight: "ORGANIZED BY"
  },
  {
    img: "/assiosatepatners/Frame 2.png",
    title: "FRAME 2",
    desc: "Innovative solutions for packaging and logistics in the food sector.",
    highlight: "DESGIN & DEVELOP PARTNER"
  },
  {
    img: "/assiosatepatners/logo - Dark.png",
    title: "LOGO LIGHT",
    desc: "Branding and identity for food businesses worldwide.",
    highlight: "BRANDING PARTNER"
  },
  {
    img: "/assiosatepatners/AFRO INDIA TRADE.jpeg.jpg",
    title: "TRISHUL",
    desc: "Trusted supplier of food processing equipment and technology.",
    highlight: "INTERNATIONAL MEDIA PARTNER"
  },
  {
    img: "/assiosatepatners/WhatsApp Image 2025-09-04 at 11.28.24_1eaf177e.jpg",
    title: "PARTNER 1",
    desc: "Excellence in food distribution and logistics.",
    highlight: "MEDIA PARTNER"
  },
  {
    img: "/assiosatepatners/trishul png.png",
    title: "PARTNER 2",
    desc: "Innovative marketing strategies for food brands.",
    highlight: "MEDIA PARTNER"
  },
  {
    img: "/assiosatepatners/WhatsApp Image 2025-09-04 at 11.28.25_c2a5d597.jpg",
    title: "PARTNER 3",
    desc: "Specialized consulting for food industry growth.",
    highlight: "MEDIA PARTNER"
  }
];

const Partners: React.FC = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShow(false);
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(t);
    }

    let timeout: number | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(false);
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(() => setShow(true), 50);
          }
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-16 w-full mx-auto overflow-hidden"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">Associate Partners</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {partners.map((p, i) => (
          <div
            key={p.title}
            className={`flex flex-col items-center bg-gray-300 rounded-2xl shadow-lg p-6 relative ${
              show ? 'animate-fade-in-left' : ''
            }`}
            style={
              show
                ? {
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "0.7s",
                    animationFillMode: "both"
                  }
                : {}
            }
          >
            <div className="w-full flex flex-col items-center mb-3">
              <div className="w-full h-32 relative mb-2">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              <div className="text-sm font-semibold text-orange-500 text-center mb-1">{p.highlight}</div>
              {/* <div className="text-lg sm:text-xl font-bold text-center mb-2">{p.title}</div> */}
            </div>
            <div className="text-gray-700 text-center text-sm sm:text-base">{p.desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation-name: fade-in-left;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
          animation-duration: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default Partners;
