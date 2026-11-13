'use client';

import Image from 'next/image';
import React from 'react';
import siteContent from '@/data/siteContent.json';

/**
 * Responsive showcase banner:
 * - Mobile (< md): Standard responsive image (/images/08_PARALLAX.jpg) with parallax disabled
 *   so all 5 women are cleanly visible without mobile fixed-background distortion.
 * - Desktop (>= md): Fixed-attachment CSS Parallax banner using /images/08_PARALLAX_SHIFTED.jpg.
 */
export default function ParallaxBanner() {
  return (
    <>
      {/* Mobile version: Standard static image (parallax disabled) */}
      <div className="block md:hidden relative w-full rounded-[20px] overflow-hidden shadow-xl border border-slate-200/80 mb-10 select-none bg-[#cbb09d]">
        <Image
          src={siteContent.images.parallaxBannerMobile}
          alt="Diverse women with radiant, healthy skin"
          className="w-full h-auto block object-cover"
  width={1024}
  height={575}
  sizes="100vw"
/>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a2240]/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-black/10" />
      </div>

      {/* Desktop version: Fixed-attachment CSS Parallax banner */}
      <div
        role="img"
        aria-label="Diverse women with radiant, healthy skin"
        className="hidden md:block relative w-full h-[500px] rounded-[24px] overflow-hidden shadow-xl border border-slate-200/80 mb-14 select-none"
        style={{
          backgroundColor: '#cbb09d',
          backgroundImage: `url(${siteContent.images.parallaxBannerDesktop})`,
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
    </>
  );
}
