// app/components/OurExhibitors.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const exhibitors = [
  '/EXHIBITOR/AAREHA.jpg',
  '/EXHIBITOR/AATOMIZE SPICE LOGO.jpg',
  '/EXHIBITOR/ADITI MEVADI.jpg',
  '/EXHIBITOR/AFRO INDIA TRADE.jpg',
  '/EXHIBITOR/AKHAND JYOTI.jpg',
  '/EXHIBITOR/AKSHAR ICE CREAM.jpg',
  '/EXHIBITOR/ALASKA REFF.jpeg',
  '/EXHIBITOR/AMRUTAM PANEER.png',
  '/EXHIBITOR/Arts-AAREHA COOTON SIS.png',
  '/EXHIBITOR/ATHAK TECHNOLOGY.jpg',
  '/EXHIBITOR/ATMIYA NATURAL FARM.jpeg',
  '/EXHIBITOR/BHAVNA KHAKHRA.jpg',
  '/EXHIBITOR/BHAVYA-PLAST-PRIVATE-LIMITED.png',
  '/EXHIBITOR/BONIKA BEVERAGE.jpg',
  '/EXHIBITOR/brahmani tea.png',
  '/EXHIBITOR/Chocotown-01 (1).jpg',
  '/EXHIBITOR/CM SQUARE.jpg',
  '/EXHIBITOR/CRISPO BITE.jpeg',
  '/EXHIBITOR/Cu-big logo finalest TM.jpg',
  '/EXHIBITOR/D3.png',
  '/EXHIBITOR/DANG MASALA.jpg',
  '/EXHIBITOR/DHANANJAY FOOD.jpg',
  '/EXHIBITOR/DHANUKA ENTERPRISE.jpeg',
  '/EXHIBITOR/dhruv enterprise.jpg',
  '/EXHIBITOR/DOSA HOUSE.jpg',
  '/EXHIBITOR/Egniol.png',
  '/EXHIBITOR/elegant packaging.jpg',
  '/EXHIBITOR/ESSEN INDUSTY.jpg',
  '/EXHIBITOR/EXCESS HOLOGRAPHY.jpg',
  '/EXHIBITOR/Firecook.jpg',
  '/EXHIBITOR/GBL CHEMICAL.jpg',
  '/EXHIBITOR/Girnes.jpg',
  '/EXHIBITOR/go veg go green (2).jpg',
  '/EXHIBITOR/go veg go green.jpg',
  '/EXHIBITOR/GopiShri.jpg',
  '/EXHIBITOR/GUROU FROGEN.jpg',
  '/EXHIBITOR/H MOTIVE.jpeg',
  '/EXHIBITOR/harakh natural.jpeg',
  '/EXHIBITOR/HEENA FOOD.jpg',
  '/EXHIBITOR/horeca 3.jpg',
  '/EXHIBITOR/JYOTI GAS.jpeg',
  '/EXHIBITOR/KPL OIL.jpeg',
  '/EXHIBITOR/laxami food product.jpeg',
  '/EXHIBITOR/LEENOVA KITCHEN EQUIP.jpeg',
  '/EXHIBITOR/LEEON ENGINEERS.jpeg',
  '/EXHIBITOR/MAA & CO.jpeg',
  '/EXHIBITOR/mahaveer.png',
  '/EXHIBITOR/mahek food.jpeg',
  '/EXHIBITOR/MARUTI TRADING.jpg',
  '/EXHIBITOR/mavdi.jpeg',
  '/EXHIBITOR/Molimor.jpg',
  '/EXHIBITOR/MummyNuTiffin.png',
  '/EXHIBITOR/NAMKYN LOGO DESIGN (1).png',
  '/EXHIBITOR/NEPTUNE PHARMA.jpeg',
  '/EXHIBITOR/NEW DHAVAL PLASTIC.jpeg',
  '/EXHIBITOR/nikita modi.jpeg',
  '/EXHIBITOR/normalife.jpg',
  '/EXHIBITOR/NUTRITIUS CHIKKI.jpeg',
  '/EXHIBITOR/OTA FRESH FOOD.jpeg',
  '/EXHIBITOR/OZON.jpeg',
  '/EXHIBITOR/parakh masala.jpeg',
  '/EXHIBITOR/PATSON FOOD (1).jpg',
  '/EXHIBITOR/PATSON FOOD (1).png',
  '/EXHIBITOR/PATSON FOOD (2).png',
  '/EXHIBITOR/PERFECT NAUKARI.jpg',
  '/EXHIBITOR/pollucon.jpeg',
  '/EXHIBITOR/PRINT EXPRESS.jpg',
  '/EXHIBITOR/queen of masalaa.jpeg',
  '/EXHIBITOR/RAM PERFUME.jpeg',
  '/EXHIBITOR/RAS SAGAR BOARD.jpg',
  '/EXHIBITOR/RAS SAGAR.jpg',
  '/EXHIBITOR/RATNAADI FOOD.jpeg',
  '/EXHIBITOR/S R NATURALS.jpeg',
  '/EXHIBITOR/SABRAS.png',
  '/EXHIBITOR/SAI ENTERPRISE-NEW.jpeg',
  '/EXHIBITOR/sai enterprise.jpeg',
  '/EXHIBITOR/SANTOSH MASALA.jpeg',
  '/EXHIBITOR/Saya Logo.png',
  '/EXHIBITOR/SHAMA ORGANIC.jpeg',
  '/EXHIBITOR/ShantaG-SPONSER.jpg',
  '/EXHIBITOR/Shivam Ref. SPONSER.png',
  '/EXHIBITOR/SHREE ANAND SALES.jpeg',
  '/EXHIBITOR/SHREE KRISHNA APPLIENCES AGENCY.jpeg',
  '/EXHIBITOR/shreeja company.jpeg',
  '/EXHIBITOR/SHRI RAJA INDUSTRY.jpeg',
  '/EXHIBITOR/Shrushti Packaging logo.png',
  '/EXHIBITOR/SILICON ENTERPRISE.jpeg',
  '/EXHIBITOR/SINGER IND PVT LTD.jpeg',
  '/EXHIBITOR/sky high innovation.jpeg',
  '/EXHIBITOR/skyhigh.png',
  '/EXHIBITOR/SOHAM.jpeg',
  '/EXHIBITOR/souvenier.jpg',
  '/EXHIBITOR/steemo.jpeg',
  '/EXHIBITOR/STHHAN-NEW DHAWAL SIS.jpeg',
  '/EXHIBITOR/SUCCESS PACKAGING.jpeg',
  '/EXHIBITOR/Swad Logo black line.png',
  '/EXHIBITOR/SWADESHI MART.jpg',
  '/EXHIBITOR/SWADESHI MART.png',
  '/EXHIBITOR/TAKOS FOOD.jpeg',
  '/EXHIBITOR/Talod Logo Eng.png',
  '/EXHIBITOR/TANUM INDIA PVT LTD.jpg',
  '/EXHIBITOR/TAWDAWALA.jpeg',
  '/EXHIBITOR/TIRUPATI EXPORT.jpeg',
  '/EXHIBITOR/trishul png.png',
  '/EXHIBITOR/TRUELINE WEBSITE.jpeg',
  '/EXHIBITOR/TRYON INFOSOFT.png',
  '/EXHIBITOR/vinayak fabrication (1).jpeg',
  '/EXHIBITOR/VINAYAK FABRICATION-NEW.jpeg',
  '/EXHIBITOR/WEDNES.17.jpeg'
];

const OurExhibitors: React.FC = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const exhibitorsPerPage = 20; // 4 rows x 5 columns
  const totalPages = Math.ceil(exhibitors.length / exhibitorsPerPage);

  useEffect(() => {
    setShow(false);
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(() => setShow(true), 120);
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
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => {
      if (timeout) window.clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  const startIdx = page * exhibitorsPerPage;
  const endIdx = startIdx + exhibitorsPerPage;
  const currentExhibitors = exhibitors.slice(startIdx, endIdx);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center py-16 w-full mx-auto overflow-hidden bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">Our Exhibitors</h1>

      <div className="grid grid-cols-5 gap-6 w-full max-w-6xl px-4" style={{ gridTemplateRows: 'repeat(4, minmax(0, 1fr))' }}>
        {currentExhibitors.map((src, i) => (
          <div
            key={startIdx + i}
            className={`flex flex-col items-center rounded-2xl p-6 relative ${show ? 'animate-fade-in-left' : ''}`}
            style={
              show
                ? {
                    animationDelay: `${i * 0.08}s`,
                    animationDuration: '0.55s',
                    animationFillMode: 'both'
                  }
                : {}
            }
          >
            <div className="w-full flex flex-col items-center mb-2">
              <div className="w-full h-28 relative flex items-center justify-center">
                <Image
                  src={src}
                  alt={`Exhibitor ${startIdx + i + 1}`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Previous page"
        >
          &larr;
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-3 h-3 rounded-full mx-1 ${idx === page ? 'bg-violet-500' : 'bg-gray-300'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setPage(idx)}
          />
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Next page"
        >
          &rarr;
        </button>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-40px); }
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

export default OurExhibitors;
