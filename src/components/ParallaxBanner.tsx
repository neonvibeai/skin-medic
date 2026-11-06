'use client';

import React from 'react';

/**
 * Fixed-attachment CSS Parallax banner using /images/08_PARALLAX_SHIFTED.jpg.
 * Keeps true `background-attachment: fixed` ("przyklejenie zdjęcia") while shifting
 * the portrait downward in the viewport so all 5 women's faces remain centered and
 * completely visible in the window while scrolling.
 */
export default function ParallaxBanner() {
  return (
    <div
      role="img"
      aria-label="Diverse women with radiant, healthy skin"
      className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] rounded-[24px] overflow-hidden shadow-xl border border-slate-200/80 mb-14 select-none"
      style={{
        backgroundColor: '#cbb09d',
        backgroundImage: 'url(/images/08_PARALLAX_SHIFTED.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center 25px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle inner frame & soft bottom gradient for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a2240]/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-black/10" />
    </div>
  );
}
