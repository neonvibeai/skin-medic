'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useConsultation } from '@/context/ConsultationContext';
import productsData from '@/data/products.json';
import treatmentsData from '@/data/treatments.json';
import { Product, Treatment } from '@/types';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Calendar,
  Sparkles,
  ArrowRight,
  Tag
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openConsultation } = useConsultation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const allProducts = productsData as Product[];
  const allTreatments = treatmentsData as Treatment[];

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setShowSearchDropdown(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearchDropdown(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Filter products live after typing at least 1 character
  const matchingProducts = searchQuery.trim().length >= 1
    ? allProducts
        .filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCategory = p.categories && p.categories.some((c) => c.toLowerCase().includes(q));
          return matchName || matchBrand || matchCategory;
        })
        .slice(0, 7)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200/90 transition-shadow">
      {/* Main white navigation container — page starts directly here (no navy top bar) */}
      <div className={`max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all ${isScrolled ? 'py-2' : 'py-3 sm:py-3.5'}`}>
        <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-4 xl:gap-5">
          {/* Logo with Significantly Enlarged Graphic Mark & Full Large Brand Name "Skin Medic Skin Care" */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 py-0.5 pr-1 sm:pr-2 xl:pr-3 group shrink-0">
            <img
              src="/images/skin-medic-logo.png"
              alt="Skin Medic Skin Care"
              className="h-16 sm:h-[76px] md:h-[84px] lg:h-[92px] xl:h-[100px] w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm shrink-0"
            />

            <div className="flex flex-col justify-center">
              <span className="font-serif font-bold text-[22px] sm:text-[28px] md:text-[30px] lg:text-[34px] xl:text-[38px] tracking-tight text-slate-900 group-hover:text-[#0a2240] transition leading-[1.08] sm:whitespace-nowrap">
                Skin&nbsp;Medic Skin&nbsp;Care
              </span>
            </div>
          </Link>

          {/* Search bar with Live Autocomplete Dropdown (Compact input width to give enlarged logo generous room) */}
          <div ref={desktopSearchRef} className="hidden lg:block relative flex-1 min-w-[150px] xl:min-w-[180px] max-w-[220px] mx-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                className="w-full pl-9 pr-8 py-2 rounded-full border border-slate-200 bg-slate-50/90 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#0a2240] focus:bg-white text-slate-900 transition placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Autocomplete Results Dropdown (width: 400px, min-width: 360px, max-width: 440px, aligned left) */}
            {showSearchDropdown && searchQuery.trim().length >= 1 && (
              <div className="absolute top-full left-0 right-auto mt-2.5 w-[400px] min-w-[360px] max-w-[440px] bg-white rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-200/95 p-3 z-50 max-h-[440px] overflow-y-auto animate-fade-in">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span>Matching Products ({matchingProducts.length})</span>
                  <span className="text-cyan-700 font-semibold">Live search</span>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/shop/${p.slug}`}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-3 group"
                      >
                        {/* 45x45px Product Thumbnail */}
                        <div className="w-[45px] h-[45px] rounded-lg bg-slate-50 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center p-1 mt-0.5">
                          {p.localImages && p.localImages.length > 0 ? (
                            <img
                              src={p.localImages[0]}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Sparkles className="w-4 h-4 text-slate-400" />
                          )}
                        </div>

                        {/* Full Product Title (2-line clamp, normal wrapping) + Brand & Price */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-[13px] leading-snug text-slate-900 group-hover:text-[#0a2240] transition whitespace-normal line-clamp-2 break-words">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                p.brand === 'ZO Skin Health'
                                  ? 'bg-blue-100 text-[#0a2240]'
                                  : 'bg-slate-200 text-slate-800'
                              }`}
                            >
                              {p.brand === 'ZO Skin Health' ? 'ZO® Skin Health' : 'Obagi® Medical'}
                            </span>
                            <span className="text-xs font-bold text-[#0a2240]">
                              £{p.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0a2240] group-hover:translate-x-1 transition shrink-0 self-center" />
                      </Link>
                    ))}

                    <div className="pt-2.5 px-1 text-center">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full py-2 rounded-xl bg-slate-100 hover:bg-[#0a2240] text-slate-700 hover:text-white text-xs font-semibold transition"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo; →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No products found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links — Compact Spacing (gap: 16px, padding: 6px 10px, font: 14px/15px, weight: 500) */}
          <nav className="hidden md:flex items-center gap-[14px] xl:gap-[16px] shrink-0">
            <Link
              href="/"
              className={`text-[14px] xl:text-[15px] font-medium transition-colors px-[10px] py-[6px] rounded-lg whitespace-nowrap ${
                pathname === '/'
                  ? 'text-[#0a2240] bg-blue-50/80 font-semibold'
                  : 'text-slate-800 hover:text-[#0a2240] hover:bg-slate-100'
              }`}
            >
              Home
            </Link>

            {/* Brands Dropdown */}
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-[14px] xl:text-[15px] font-medium text-slate-800 group-hover:text-[#0a2240] px-[10px] py-[6px] rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap">
                Brands
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0a2240] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-68 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link
                  href="/brands/zo-skin-health"
                  className="p-3 rounded-xl hover:bg-blue-50/90 transition flex flex-col gap-0.5 border-l-3 border-transparent hover:border-[#0a2240]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#0a2240]">ZO® Skin Health</span>
                  </div>
                  <span className="text-[11px] text-slate-500">By Dr. Zein Obagi MD • 42 Products</span>
                </Link>

                <Link
                  href="/brands/obagi-medical"
                  className="p-3 rounded-xl hover:bg-slate-50 transition flex flex-col gap-0.5 border-l-3 border-transparent hover:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-slate-900">Obagi® Medical</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Transformative Systems • 23 Products</span>
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <Link
                  href="/shop"
                  className="p-2 text-center text-xs font-bold text-[#0a2240] hover:underline block"
                >
                  Browse All 65 Products →
                </Link>
              </div>
            </div>

            {/* Treatments Dropdown (Directly from treatments.json) */}
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-[14px] xl:text-[15px] font-medium text-slate-800 group-hover:text-[#0a2240] px-[10px] py-[6px] rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap">
                Treatments
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0a2240] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span>In-Clinic Procedures</span>
                  <Tag className="w-3 h-3 text-cyan-600" />
                </div>
                <div className="max-h-[380px] overflow-y-auto space-y-0.5 pr-1">
                  {allTreatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/treatments/${t.slug}`}
                      className="p-2.5 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0a2240] flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-2">
                        <span>{t.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {t.priceHighlight
                          ? t.priceHighlight.split(' per ')[0].split(' · ')[0]
                          : t.pricingTable && t.pricingTable.length > 0
                            ? t.pricingTable[0].price
                            : t.items && t.items.length > 0
                              ? `From ${t.items[0].price}`
                              : ''}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/treatments"
                  className="p-2.5 text-xs font-bold text-[#0a2240] border-t border-slate-100 mt-1 block hover:underline text-center"
                >
                  View All Treatments Directory →
                </Link>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              className={`text-[14px] xl:text-[15px] font-medium transition-colors px-[10px] py-[6px] rounded-lg whitespace-nowrap ${
                pathname === '/about'
                  ? 'text-[#0a2240] bg-blue-50/80 font-semibold'
                  : 'text-slate-800 hover:text-[#0a2240] hover:bg-slate-100'
              }`}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-[14px] xl:text-[15px] font-medium transition-colors px-[10px] py-[6px] rounded-lg whitespace-nowrap ${
                pathname === '/contact'
                  ? 'text-[#0a2240] bg-blue-50/80 font-semibold'
                  : 'text-slate-800 hover:text-[#0a2240] hover:bg-slate-100'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => openConsultation()}
              className="px-4 xl:px-5 py-2.5 rounded-xl bg-[#0a2240] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123661] shadow-md shadow-blue-950/20 hover:scale-[1.02] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              Book Consultation
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:text-black focus:outline-none shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
          {/* Mobile search with live list */}
          <div ref={mobileSearchRef} className="relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0a2240]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 p-1 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Mobile matching products list */}
            {searchQuery.trim().length >= 1 && (
              <div className="mt-2 bg-white rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-200 p-2.5 max-h-72 overflow-y-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 py-1 border-b border-slate-100 mb-1">
                  Matching Products ({matchingProducts.length})
                </span>
                {matchingProducts.length > 0 ? (
                  matchingProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop/${p.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 text-xs text-slate-800"
                    >
                      <div className="w-[45px] h-[45px] rounded-lg bg-slate-50 p-1 border border-slate-200 shrink-0 flex items-center justify-center">
                        {p.localImages && p.localImages.length > 0 ? (
                          <img src={p.localImages[0]} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif font-bold text-xs text-slate-900 whitespace-normal line-clamp-2 leading-snug">
                          {p.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {p.brand === 'ZO Skin Health' ? 'ZO® Skin Health' : 'Obagi® Medical'}
                          </span>
                          <span className="text-[11px] font-bold text-[#0a2240]">£{p.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-2 text-xs text-slate-500">No products found</div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-bold text-slate-900 border-b border-slate-100"
            >
              Home
            </Link>

            <div className="py-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Medical Brands
              </span>
              <div className="pl-3 space-y-1">
                <Link
                  href="/brands/zo-skin-health"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-semibold text-[#0a2240]"
                >
                  ZO® Skin Health
                </Link>
                <Link
                  href="/brands/obagi-medical"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-semibold text-slate-700"
                >
                  Obagi® Medical
                </Link>
              </div>
            </div>

            <div className="py-2 border-b border-slate-100">
              <Link
                href="/treatments"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-slate-900 block mb-1"
              >
                In-Clinic Treatments
              </Link>
              <div className="pl-3 space-y-1 text-xs">
                {allTreatments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-slate-700 font-medium hover:text-[#0a2240]"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-bold text-slate-900 border-b border-slate-100"
            >
              About
            </Link>

            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-bold text-slate-900 border-b border-slate-100"
            >
              How It Works
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-bold text-slate-900"
            >
              Contact & Location
            </Link>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultation();
              }}
              className="w-full py-3.5 rounded-xl bg-[#0a2240] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book Free Skin Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
