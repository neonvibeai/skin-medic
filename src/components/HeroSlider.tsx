'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Confident client observing radiant skin in the mirror'
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Client applying nourishing medical-grade treatment cream'
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Mature woman with smooth, radiant complexion applying eye cream'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto transition every 5 seconds
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prefersReducedMotion]);

  return (
    <div
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[530px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => {
        if (!prefersReducedMotion) setIsPlaying(true);
      }}
      aria-label="Skin Medic featured visual showcase"
    >
      {/* Slides */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center ${
                !prefersReducedMotion && isActive
                  ? 'scale-105 transition-transform duration-[6000ms] ease-out'
                  : 'scale-100'
              }`}
            />
            {/* Subtle bottom gradient to ensure indicator contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Floating Controls Bar: Dots + Pause/Play */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-3">
        <div className="bg-[#0a2240]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
          {/* 3 Slide Dots */}
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-cyan-300'
                  : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentIndex ? 'true' : undefined}
            />
          ))}

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-1 p-1 rounded-full text-white/80 hover:text-white transition focus:outline-none"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
