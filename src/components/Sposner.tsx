// app/components/Sponsors.tsx
'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Use exact files from public/sponser as requested
const sponsorList = [
  "/sponser/ambe engineering.jpeg",
  "/sponser/Athak Technology.png",
  "/sponser/Camry.jpg",
  "/sponser/Canny Coverage.jpg",
  "/sponser/damond masala.jpeg",
  "/sponser/deep dairy product.jpg",
  "/sponser/euro fresh.jpeg",
  "/sponser/jalpooree outer logo.png",
  "/sponser/Jenish Masala.jpg",
  "/sponser/Khajurbhai TITLE SPONSER.png",
  "/sponser/KRISHNA KUNJ ICE CREAM LOGO.png",
  "/sponser/lilaba.jpeg",
  "/sponser/Maharana Foods Logo.png",
  "/sponser/namo mukhwas -SPONSER.png",
  "/sponser/namo mukhwas.png",
  "/sponser/nexa-water PARTNER.png",
  "/sponser/RAJ WAFFER.jpg",
  "/sponser/REMA LOGO.png",
  "/sponser/sbc new.png",
  "/sponser/ShantaG-SPONSER.jpg",
  "/sponser/ShantaG.jpg",
  "/sponser/Shivam Ref. Logo.png",
  "/sponser/SOCIETY TEA.jpg",
  "/sponser/SR Equip..png",
  "/sponser/sumul eblon.png",
  "/sponser/Vasy-New-Logo_white (1).png",
  "/sponser/visvakarma techno steel.png",
];

const sponsorData = {
  all: sponsorList,
  title: ["/sponser/Khajurbhai TITLE SPONSER.png"],
  main: ["/sponser/vasyerp logo png.png"],
};

// Animation classes
const slideUpClass =
  'transition-all duration-500 ease-out opacity-100 translate-y-0';
const slideUpHiddenClass =
  'transition-all duration-500 ease-out opacity-0 translate-y-32';

const getLogoAnimClass = (show: boolean) =>
  `${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'} transition-opacity transition-transform duration-500 ease-out`;

const Sponsors: React.FC = () => {
  const [category, setCategory] = useState<'all' | 'title' | 'main'>('all');
  const [showAnim, setShowAnim] = useState(false);
  const [logoAnim, setLogoAnim] = useState(false);

  const handleCategory = (cat: 'all' | 'title' | 'main') => {
    if (cat === category) return;
    setShowAnim(false);
    setLogoAnim(false);
    setTimeout(() => {
      setCategory(cat);
      setShowAnim(true);
      setTimeout(() => setLogoAnim(true), 100);
    }, 50);
  };

  useEffect(() => {
    setShowAnim(true);
    setTimeout(() => setLogoAnim(true), 100);
  }, [category]);

  const logos = sponsorData[category];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-cover bg-center px-4 sm:px-6 md:px-8 py-6"
      style={{ backgroundImage: "url('/background/backgroundicons.png')" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-2 mb-4">Our Sponsors</h1>
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {['all', 'title', 'main'].map((cat) => (
          <button
            key={cat}
            className={`px-4 sm:px-6 py-2 rounded-xl font-semibold focus:outline-none ${category === cat ? 'bg-[#E04B4D] text-white shadow border-2 border-black' : 'bg-transparent text-black transition-all'}`}
            onClick={() => handleCategory(cat as 'all' | 'title' | 'main')}
          >
            {cat === 'all' ? 'All Sponsors' : cat === 'title' ? 'Title Sponsor' : 'Main Sponsor'}
          </button>
        ))}
      </div>

      <div
        className={`w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-center ${
          (category === 'title' || category === 'main' || category === 'all')
            ? (showAnim ? slideUpClass : slideUpHiddenClass)
            : ''
        }`}
      >
        {logos.map((src, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center rounded-lg p-2 sm:p-3 md:p-4 aspect-[4/3] ${getLogoAnimClass(logoAnim)} hover:scale-105 hover:shadow-2xl transform-gpu`}
            style={{ transitionDelay: logoAnim ? `${idx * 90}ms` : '0ms' }}
          >
            <Image
              src={src}
              alt={`Sponsor ${idx + 1}`}
              className="object-contain w-full h-full max-h-24 sm:max-h-28 md:max-h-32"
              width={200}
              height={150}
              priority={idx < 2}
              loading={idx < 2 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
