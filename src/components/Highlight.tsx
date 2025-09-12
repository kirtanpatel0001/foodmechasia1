"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically load motion to keep initial bundle small; it will load when the component mounts
const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });

const highlights = [
  { src: "/highlights/164-1024x683.jpg", alt: "Highlight 1" },
  { src: "/highlights/243A1980.jpg", alt: "Highlight 2" },
  { src: "/highlights/DSC_0013.jpg", alt: "Highlight 3" },
  { src: "/highlights/DSC_0018.jpg", alt: "Highlight 4" },
  { src: "/highlights/DSC00514.jpg", alt: "Highlight 5" },
  { src: "/highlights/DSC00533.jpg", alt: "Highlight 6" },
  { src: "/highlights/DSC00574.jpg", alt: "Highlight 7" },
  { src: "/highlights/DSC00592.jpg", alt: "Highlight 8" },
  { src: "/highlights/DSC00593.jpg", alt: "Highlight 9" },
  { src: "/highlights/DSC00600.jpg", alt: "Highlight 10" },
  { src: "/highlights/DSC00602.jpg", alt: "Highlight 11" },
  { src: "/highlights/DSC00783.jpg", alt: "Highlight 12" },
  { src: "/highlights/DSC00788.jpg", alt: "Highlight 13" },
  { src: "/highlights/DSC00910.jpg", alt: "Highlight 14" },
  { src: "/highlights/DSC00941.jpg", alt: "Highlight 15" },
  { src: "/highlights/DSC00991.jpg", alt: "Highlight 16" },
  { src: "/highlights/DSC00994.jpg", alt: "Highlight 17" },
  { src: "/highlights/DSC01023.jpg", alt: "Highlight 18" },
  { src: "/highlights/DSC01027.jpg", alt: "Highlight 19" },
  { src: "/highlights/DSC01137.jpg", alt: "Highlight 20" },
  { src: "/highlights/DSC01160.jpg", alt: "Highlight 21" },
  { src: "/highlights/DSC01216.jpg", alt: "Highlight 22" },
  { src: "/highlights/DSC01265.jpg", alt: "Highlight 23" },
  { src: "/highlights/DSC01269.jpg", alt: "Highlight 24" },
  { src: "/highlights/DSC01275.jpg", alt: "Highlight 25" },
  { src: "/highlights/DSCF3440.jpg", alt: "Highlight 26" },
  { src: "/highlights/DSCF3442.jpg", alt: "Highlight 27" },
  { src: "/highlights/DSCF3577.jpg", alt: "Highlight 28" },
  { src: "/highlights/R6II8493.jpg", alt: "Highlight 29" },
  { src: "/highlights/RZ6_6620.jpg", alt: "Highlight 30" },
];

export default function Highlight() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [inView, setInView] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // determine viewport size on client only and listen for changes
  useEffect(() => {
    function update() {
      setIsSmall(window.innerWidth < 768);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // observe visibility to avoid autoplay and heavy loading when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting));
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // autoplay
  useEffect(() => {
    if (isPaused || !inView) return;
    intervalRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPaused, inView]);

  const goTo = useCallback((dir: number) => {
    setActive((prev) => {
      const n = highlights.length;
      return (prev + dir + n) % n;
    });
  }, []);

  const handlePrev = useCallback(() => goTo(-1), [goTo]);
  const handleNext = useCallback(() => goTo(1), [goTo]);

  const springTransition = useMemo(
    () => ({ type: "spring", stiffness: 140, damping: 20 } as const),
    []
  );

  // only render center and immediate neighbors
  const center = active;

  return (
    <section suppressHydrationWarning className="flex flex-col items-center justify-start bg-white w-full py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-8 md:mb-10">Showcasing the Highlights of Our Exhibitions</h2>

      <div
        ref={containerRef}
        className="relative w-full flex justify-center items-center"
        style={{ height: isSmall ? 300 : 420, perspective: isSmall ? 600 : 800 }}
      >
        {/* Hide arrows on mobile */}
        {!isSmall && (
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-2 md:left-8 z-20 bg-black/90 rounded-full shadow p-2 hover:bg-blue-100 transition"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        )}

        <div
          className="relative flex items-center justify-center"
          style={{ width: '100%', maxWidth: isSmall ? 420 : 820, height: isSmall ? 300 : 420 }}
        >
          {highlights.map((img, i) => {
            const n = highlights.length;
            let delta = i - center;
            if (delta > Math.floor(n / 2)) delta -= n;
            if (delta < -Math.floor(n / 2)) delta += n;

            const abs = Math.abs(delta);
            if (abs > 1) return null;

            const x = delta * (isSmall ? 140 : 320);
            const y = abs * (isSmall ? 6 : 10);
            const scale = delta === 0 ? (isSmall ? 1.04 : 1.02) : 0.96;
            const rotateY = delta * (isSmall ? -10 : -18);
            const zIndex = 100 - abs;
            const opacity = delta === 0 ? 1 : 0.72;
            const blur = delta === 0 ? 0 : 3;

            const isCenter = delta === 0;
            const w = isCenter ? (isSmall ? 320 : 520) : (isSmall ? 220 : 320);
            const h = isCenter ? (isSmall ? 220 : 360) : (isSmall ? 150 : 220);

            return (
              <MotionDiv
                key={img.src}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ x, y, scale, rotateY, opacity, filter: `blur(${blur}px)` }}
                transition={springTransition}
                whileHover={isCenter ? { scale: 1.12, rotateY: -6 } : {}}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '10%',
                  margin: '0 auto',
                  transform: 'translateY(-50%)',
                  width: w,
                  height: h,
                  zIndex,
                  borderRadius: 20,
                  transformStyle: 'preserve-3d',
                  overflow: 'hidden',
                }}
                className="rounded-2xl shadow-2xl bg-black/5 will-change-transform"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* center image loads with priority; neighbors lazy-load */}
                  <Image
                    src={encodeURI(img.src)}
                    alt={img.alt}
                    fill
                    sizes={isSmall ? '320px' : '520px'}
                    style={{ objectFit: 'cover' }}
                    priority={isCenter}
                    loading={isCenter ? 'eager' : 'lazy'}
                  />
                </div>

                {isCenter && (
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', left: '-40%', top: '-40%', width: '120%', height: '120%', background: 'linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', transform: 'rotate(25deg)', mixBlendMode: 'screen', opacity: 0.8 }} />
                  </div>
                )}
              </MotionDiv>
            );
          })}
        </div>

        {/* Hide arrows on mobile */}
        {!isSmall && (
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-2 md:right-8 z-20 bg-black/90 rounded-full shadow p-2 hover:bg-blue-100 transition"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        )}
      </div>
    </section>
  );
}
