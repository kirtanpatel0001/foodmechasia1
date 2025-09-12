"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// dynamically load motion to keep initial client bundle smaller
const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });
import Image from "next/image";

const highlights = [
  { src: "/ExhibitionDay/f1.webp", alt: "Highlight 1" },
  { src: "/ExhibitionDay/f2.webp", alt: "Highlight 2" },
  { src: "/ExhibitionDay/f3.webp", alt: "Highlight 3" },
  { src: "/ExhibitionDay/f4.webp", alt: "Highlight 4" },
];

export default function Exhibition() {
  const [active, setActive] = useState(1); // index of the center image
  // store natural dimensions for each image after preload
  const [naturalSizes, setNaturalSizes] = useState<Record<number, { w: number; h: number }>>({});

  // show each image for 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // preload images and capture natural sizes
  useEffect(() => {
    let mounted = true;
    const sizes: Record<number, { w: number; h: number }> = {};

      highlights.forEach((img, idx) => {
      const I = new window.Image();
      I.src = img.src;
      I.onload = () => {
        if (!mounted) return;
        sizes[idx] = { w: I.naturalWidth || I.width, h: I.naturalHeight || I.height };
        // update state incrementally so UI can update as images load
        setNaturalSizes((prev) => ({ ...prev, [idx]: sizes[idx] }));
      };
      // if image fails to load, we simply skip — component will fall back to defaults
    });

    return () => {
      mounted = false;
    };
  }, []);

  // responsive: track viewport width. Use a stable server-safe default and update on mount.
  const [vw, setVw] = useState<number>(1200);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const setInitial = () => setVw(window.innerWidth || 1200);
    setInitial();
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    // mark mounted after first client render to avoid SSR/CSR markup differences
    setMounted(true);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // active index controls which image is center; images animate based on their delta from active

  return (
  <div suppressHydrationWarning className="flex flex-col items-center justify-start bg-white w-full" style={{ minHeight: 120, paddingTop: 12 }}>
      <h2 className="text-3xl font-bold text-center mb-2" style={{ paddingTop: 4 }}>
        In Exhibition Day
      </h2>
      {/* compute responsive sizes */}
      {/** sizeScale reduces card sizes on smaller screens but not too small */}
      {!mounted ? (
        <div className="relative w-full flex justify-center items-center" style={{ height: 420 }}>
          {/* Static placeholder to match server HTML and avoid hydration mismatch */}
          <div className="relative flex items-center justify-center" style={{ width: '100%', maxWidth: 1000, height: 320 }}>
            <Image src={highlights[active].src} alt={highlights[active].alt} width={600} height={360} className="rounded-2xl" />
          </div>
        </div>
      ) : (
        <div className="relative w-full flex justify-center items-center" style={{ height: (vw < 480 ? 360 : vw < 1024 ? 420 : 520), perspective: 1200 }}>
          <div className="relative flex items-center justify-center" style={{ width: '100%', maxWidth: 1000, height: (vw < 480 ? 240 : vw < 1024 ? 320 : 380) }}>
          {highlights.map((img, i) => {
            const n = highlights.length;
            let delta = i - active;
            // wrap delta to range -floor(n/2) .. floor(n/2)
            if (delta > Math.floor(n / 2)) delta -= n;
            if (delta < -Math.floor(n / 2)) delta += n;

            const abs = Math.abs(delta);
            // only render center and immediate neighbors
            if (abs > 1) return null;
            // compute visual properties
            // horizontal spacing adapts to viewport so cards don't overlap on small screens
            const spacing = vw < 480 ? 200 : vw < 1024 ? 240 : 280;
            const x = delta * spacing;
            const y = abs * 10; // vertical offset for depth
            const scale = delta === 0 ? 1.02 : abs === 1 ? 0.98 : 0.92;
            const rotateY = delta * -18;
            const zIndex = 100 - abs;
            const opacity = delta === 0 ? 1 : abs === 1 ? 0.6 : 0.35;
            const blur = delta === 0 ? '0px' : abs === 1 ? '4px' : '8px';

            const spring = ({ type: 'spring', stiffness: 140, damping: 20 } as unknown) as import('framer-motion').Transition;

            const isCenter = delta === 0;
            // design constraints: maximum available sizes per visual state, scaled for smaller screens
            const sizeScale = vw < 480 ? 0.72 : vw < 1024 ? 0.86 : 1;
            const maxW = (isCenter ? 520 : abs === 1 ? 320 : 180) * sizeScale;
            const maxH = (isCenter ? 360 : abs === 1 ? 220 : 120) * sizeScale;

            // try to use natural size (preserve quality) but never upscale beyond natural size
            const nat = naturalSizes[i];
            let w = maxW;
            let h = maxH;
            if (nat && nat.w > 0 && nat.h > 0) {
              // compute scale that fits natural size into max box but never > 1
              const scale = Math.min(1, Math.min(maxW / nat.w, maxH / nat.h));
              w = Math.round(nat.w * scale);
              h = Math.round(nat.h * scale);
            }
            // increase card size by 10px as requested but keep a reasonable minimum
            const extra = 10;
            w = Math.max(120, Math.round(w + extra));
            h = Math.max(100, Math.round(h + extra));

            return (
                  <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ x, y, scale, rotateY, opacity, filter: `blur(${blur})` }}
                transition={spring}
                whileHover={isCenter ? { scale: 1.22, rotateY: -6 } : {}}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  translate: '-50% -50%',
                  width: w,
                  height: h,
                  zIndex,
                  borderRadius: 28,
                  transformStyle: 'preserve-3d',
                  overflow: 'hidden',
                }}
                className="rounded-2xl shadow-2xl bg-black/5"
              >
                
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={w}
                  height={h}
                  priority={isCenter}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    backgroundColor: 'rgba(0,0,0,0.03)'
                  }}
                  className="rounded-2xl"
                />
                {isCenter && (
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', left: '-40%', top: '-40%', width: '120%', height: '120%', background: 'linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', transform: 'rotate(25deg)', mixBlendMode: 'screen', opacity: 0.8 }} />
                  </div>
                )}
                  </MotionDiv>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
}




