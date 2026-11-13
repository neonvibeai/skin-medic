'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import filtersData from '@/data/filters.json';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useConsultation } from '@/context/ConsultationContext';
import { Product } from '@/types';
import { Search, Filter, RotateCcw, Calendar, ShieldCheck, Sparkles, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { openConsultation } = useConsultation();

  // Query params
  const initialQuery = searchParams.get('q') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialConcern = searchParams.get('concern') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedConcern, setSelectedConcern] = useState(initialConcern);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allProducts = productsData as Product[];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCats = p.categories.some((c) => c.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCats) return false;
        }

        // Brand
        if (selectedBrand) {
          if (p.brand !== selectedBrand) return false;
        }

        // Concern
        if (selectedConcern) {
          const hasConcern = p.categories.some(
            (c) => c.toLowerCase() === selectedConcern.toLowerCase()
          );
          if (!hasConcern) return false;
        }

        // Category
        if (selectedCategory) {
          const hasCat = p.categories.some(
            (c) => c.toLowerCase() === selectedCategory.toLowerCase()
          );
          if (!hasCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Default sorting strictly follows the official catalog sequence (orderIndex), or mostLovedOrder when filtering by Most Loved
        if (sortBy === 'featured') {
          if (selectedCategory.toLowerCase() === 'our most loved products') {
            return (a.mostLovedOrder ?? 999) - (b.mostLovedOrder ?? 999);
          }
          return (a.orderIndex ?? 999) - (b.orderIndex ?? 999);
        }
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [allProducts, search, selectedBrand, selectedConcern, selectedCategory, sortBy]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedConcern('');
    setSelectedCategory('');
    setSortBy('featured');
  };

  const hasActiveFilters = Boolean(search || selectedBrand || selectedConcern || selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Medical Consultation Notice */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
                Official UK Stockist
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-0.5">
                Medical Skincare Catalogue
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing physician-dispensed formulations from{' '}
                <strong className="text-slate-800">ZO®{'\u00A0'}Skin{'\u00A0'}Health</strong> and{' '}
                <strong className="text-slate-800">Obagi® Medical</strong>.
              </p>
            </div>

            <button
              onClick={() => openConsultation()}
              className="px-5 py-2.5 rounded-xl bg-[#0a2240] text-white text-xs font-bold hover:bg-[#123661] transition flex items-center justify-center gap-2 self-start md:self-auto shadow-sm"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book Free Skin Consultation
            </button>
          </div>

          {/* Consultation Requirement Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-[#0a2240] to-blue-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-800 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-sm text-white">
                  Why is there no direct checkout button?
                </p>
                <p className="text-slate-300">
                  Under UK healthcare regulations, active medical-grade skincare (ZO & Obagi) requires professional qualification. Click <strong>&ldquo;Book Consultation&rdquo;</strong> on any product to begin your free 1-on-1 assessment with Roslyn Bolton.
                </p>
              </div>
            </div>

            <button
              onClick={() => openConsultation()}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 transition shrink-0 whitespace-nowrap"
            >
              Get Assessed Free
            </button>
          </div>
        </div>

        {/* Brand Tabs (ZO highlighted first) */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedBrand('')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedBrand === ''
                ? 'bg-[#0a2240] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Products ({allProducts.length})
          </button>

          <button
            onClick={() => setSelectedBrand('ZO Skin Health')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              selectedBrand === 'ZO Skin Health'
                ? 'bg-[#002447] text-cyan-200 ring-2 ring-cyan-400 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            ZO® Skin Health ({allProducts.filter((p) => p.brand === 'ZO Skin Health').length})
          </button>

          <button
            onClick={() => setSelectedBrand('Obagi Medical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedBrand === 'Obagi Medical'
                ? 'bg-slate-900 text-amber-200 ring-2 ring-amber-400 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Obagi® Medical ({allProducts.filter((p) => p.brand === 'Obagi Medical').length})
          </button>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters ({filteredProducts.length} results)
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'name-asc')}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800"
            >
              <option value="featured">Sort: Featured (ZO First)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Desktop Left Sidebar */}
          <aside className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0a2240]" />
                  Filter Catalog
                </span>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Search Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cleansers, serums..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Skin Concern Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  By Skin Concern
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedConcern('')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      selectedConcern === ''
                        ? 'bg-blue-50 text-[#0a2240] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All Concerns
                  </button>
                  {filtersData.concerns.map((concern) => (
                    <button
                      key={concern}
                      onClick={() => setSelectedConcern(concern === selectedConcern ? '' : concern)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                        selectedConcern === concern
                          ? 'bg-blue-50 text-[#0a2240] font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{concern}</span>
                      {selectedConcern === concern && <span className="text-[#0a2240]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Product Category
                </label>
                <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      selectedCategory === ''
                        ? 'bg-blue-50 text-[#0a2240] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {[
                    'Cleanse',
                    'Exfoliate',
                    'Tone',
                    'Hydrators',
                    'Retinoids',
                    'Eye Care',
                    'Sun Protection',
                    'Brightening',
                    'Nu-Derm Fx System',
                    'Obagi-C Rx System',
                    'ELASTIderm Collection',
                    'CLENZIderm M.D.'
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-blue-50 text-[#0a2240] font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && <span className="text-[#0a2240]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Bar with Sort & Chips */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-900">
                  {filteredProducts.length} Products Found
                </span>
                {selectedBrand && (
                  <span className="text-xs text-slate-500 ml-2">
                    in <strong>{selectedBrand}</strong>
                  </span>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-slate-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'name-asc')}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                >
                  <option value="featured">Featured (ZO Skin Health First)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Active filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-medium">
                    &ldquo;{search}&rdquo;
                    <button onClick={() => setSearch('')}>
                      <X className="w-3 h-3 hover:text-rose-600" />
                    </button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-[#0a2240] text-xs font-medium">
                    Brand: {selectedBrand}
                    <button onClick={() => setSelectedBrand('')}>
                      <X className="w-3 h-3 hover:text-rose-600" />
                    </button>
                  </span>
                )}
                {selectedConcern && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-medium">
                    Concern: {selectedConcern}
                    <button onClick={() => setSelectedConcern('')}>
                      <X className="w-3 h-3 hover:text-rose-600" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-medium">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('')}>
                      <X className="w-3 h-3 hover:text-rose-600" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  No medical skincare products matched your criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting or clearing your filters, or request a custom recommendation through our clinical consultation service.
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading skincare catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
