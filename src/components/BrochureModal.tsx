"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BrochureModal() {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const ANIM_DURATION = 300; // milliseconds - matches Tailwind duration-300
  const router = useRouter();

  // ensure modal shows on load
  useEffect(() => {
    setVisible(true);
  }, []);

  // close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") beginClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function beginClose() {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
    }, ANIM_DURATION);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 z-40 ${isClosing ? 'opacity-0' : 'opacity-60'}`}
        onClick={beginClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Brochure popup"
        className={`relative bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-auto overflow-hidden transform transition-all duration-300 z-50 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <button
          type="button"
          aria-label="Close popup"
          onClick={beginClose}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 focus:outline-none z-60 pointer-events-auto"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-4 md:p-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-2">Get the Brochure</h2>
            <p className="text-gray-600 mb-4">Download the Food Mech Asia brochure to see exhibitors, schedules, and visitor information.</p>

            <div className="flex flex-row flex-nowrap items-center gap-3 justify-center md:justify-start">
              <a
                href="/FM BROCHURE 2026.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  beginClose();
                  setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = '/FM BROCHURE 2026.pdf';
                    a.download = 'FM BROCHURE 2026.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }, 300);
                }}
                className="inline-block px-5 py-2 bg-black text-white font-semibold rounded-full shadow hover:opacity-90 transition whitespace-nowrap"
              >
                GET THE BROCHURE
              </a>

              <a
                href="/visitor"
                onClick={(e) => {
                  e.preventDefault();
                  beginClose();
                  setTimeout(() => router.push('/visitor'), 300);
                }}
                className="inline-block px-5 py-2 bg-red-500 text-white font-bold rounded-full border-2 border-black shadow hover:bg-red-600 transition whitespace-nowrap"
              >
                Visitor Pass
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-3">
            <div className="relative w-full h-[140px] md:h-[180px] lg:h-[220px]">
              <Image src="/background/poster.png" alt="Brochure preview" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
