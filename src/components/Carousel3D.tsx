'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export interface Slide {
  src: string;
  alt: string;
  caption: string;
  tagline: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Confident client observing radiant skin in the mirror',
    caption: 'Radiant, Healthy Complexion',
    tagline: 'Physician-grade protocols tailored to your anatomy'
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Client applying nourishing medical-grade treatment cream',
    caption: 'Targeted Cellular Renewal',
    tagline: 'Evidence-backed ZO\u00A0Skin\u00A0Health & Obagi\u00A0Medical'
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Mature woman with smooth, radiant complexion applying eye cream',
    caption: 'Long-Term Skin Vitality',
    tagline: 'Continuous support from Registered Nurse Roslyn Bolton'
  }
];

interface Carousel3DProps {
  slides?: Slide[];
  showArrows?: boolean;
}

export default function Carousel3D({
  slides = DEFAULT_SLIDES,
  showArrows = false
}: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Touch handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Autoplay every 3.5 seconds (loop: true)
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || slides.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion, slides.length]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-[540px] mx-auto h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center select-none py-4 overflow-hidden rounded-[24px]"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => {
        if (!prefersReducedMotion) setIsPlaying(true);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="3D Carousel of Skin Medic results"
    >
      {/* 3D Stage Container */}
      <div className="relative w-full max-w-[300px] sm:max-w-[375px] lg:max-w-[400px] h-[320px] sm:h-[395px] lg:h-[425px] flex items-center justify-center [transform-style:preserve-3d]">
        {slides.map((slide, idx) => {
          // Calculate cyclic offset (-1, 0, 1)
          const offset = (idx - activeIndex + slides.length) % slides.length;

          let transform = '';
          let zIndex = 10;
          let opacity = 0.5;
          let filter = 'brightness(0.75) blur(1px)';
          let isCenter = false;

          if (offset === 0) {
            // Center / Active Slide
            transform = 'translateX(0%) translateZ(60px) scale(1) rotateY(0deg)';
            zIndex = 30;
            opacity = 1;
            filter = 'brightness(1) blur(0px)';
            isCenter = true;
          } else if (offset === 1) {
            // Right Slide
            transform = 'translateX(32%) translateZ(-90px) scale(0.82) rotateY(-22deg)';
            zIndex = 20;
            opacity = 0.7;
            filter = 'brightness(0.85) blur(0.5px)';
          } else if (offset === 2) {
            // Left Slide
            transform = 'translateX(-32%) translateZ(-90px) scale(0.82) rotateY(22deg)';
            zIndex = 20;
            opacity = 0.7;
            filter = 'brightness(0.85) blur(0.5px)';
          }

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className={`absolute inset-0 rounded-[24px] overflow-hidden cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl border-2 ${
                isCenter
                  ? 'border-white/80 ring-2 ring-slate-900/10 shadow-slate-900/25'
                  : 'border-white/40 hover:opacity-90'
              }`}
              style={{
                transform,
                zIndex,
                opacity,
                filter: prefersReducedMotion ? 'none' : filter
              }}
              aria-hidden={!isCenter}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Bottom Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  {slide.tagline}
                </span>
                <p className="font-serif font-bold text-base sm:text-lg text-white mt-0.5 drop-shadow-sm">
                  {slide.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Prev/Next Navigation Arrows */}
      {showArrows && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-3 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg border border-slate-200/80 flex items-center justify-center transition hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-2 sm:right-3 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg border border-slate-200/80 flex items-center justify-center transition hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Floating Indicator Dots & Pause Button */}
      <div className="absolute bottom-1 inset-x-0 z-40 flex items-center justify-center gap-2">
        <div className="bg-[#0a2240]/85 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                idx === activeIndex
                  ? 'w-6 h-2 bg-cyan-400'
                  : 'w-2 h-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}

          <span className="w-px h-3 bg-white/25 mx-0.5" />

          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="text-white/80 hover:text-white p-0.5 transition"
            aria-label={isPlaying ? 'Pause 3D carousel' : 'Play 3D carousel'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
