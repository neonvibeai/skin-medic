'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SiteContentData } from '@/app/api/admin/content/route';
import type { Product, Treatment, TreatmentFAQ, TreatmentPricingRow } from '@/types';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Lock,
  LogOut,
  Package,
  Pencil,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

type TabKey = 'texts' | 'images' | 'products' | 'treatments';

interface ToastState {
  type: 'success' | 'error';
  text: string;
}

const EMPTY_PRODUCT_DRAFT: Partial<Product> = {
  name: '',
  brand: 'ZO Skin Health',
  price: 0,
  salePrice: null,
  capacity: '',
  categories: ['Skincare'],
  shortDescription: '',
  description: '',
  howToUse: '',
  ingredients: '',
  benefits: '',
  safetyInfo: '',
  images: ['/images/hero-1.jpg'],
  inStock: true,
  isFeatured: false,
  isMostLoved: false,
};

const EMPTY_TREATMENT_DRAFT: Partial<Treatment> = {
  title: '',
  subtitle: 'Aesthetic Clinical Treatment',
  description: '',
  pricingSectionTitle: 'Treatment Pricing',
  priceHighlight: '',
  pricingDetails: '',
  pricingNote: '',
  pricingTable: [],
  faqs: [],
  ctaTitle: '',
  ctaDescription: 'Schedule a personalised assessment with Registered Nurse Roslyn Bolton.',
  ctaButton: 'Book Consultation',
};

export default function AdminClient() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [cloudMode, setCloudMode] = useState(false);
  const [githubConfigured, setGithubConfigured] = useState(false);

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKey>('texts');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [content, setContent] = useState<SiteContentData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const [productSearch, setProductSearch] = useState('');
  const [productBrandFilter, setProductBrandFilter] = useState<'ALL' | 'ZO Skin Health' | 'Obagi Medical'>('ALL');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const [editingTreatment, setEditingTreatment] = useState<Partial<Treatment> | null>(null);
  const [isNewTreatment, setIsNewTreatment] = useState(false);

  const showToast = useCallback((type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    window.setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 6000);
  }, []);

  const loadAllData = useCallback(async () => {
    const [cRes, pRes, tRes] = await Promise.all([
      fetch('/api/admin/content'),
      fetch('/api/admin/products'),
      fetch('/api/admin/treatments'),
    ]);
    if (cRes.ok) {
      const cJson = (await cRes.json()) as { content: SiteContentData };
      setContent(cJson.content);
    }
    if (pRes.ok) {
      const pJson = (await pRes.json()) as { products: Product[] };
      setProducts(pJson.products);
    }
    if (tRes.ok) {
      const tJson = (await tRes.json()) as { treatments: Treatment[] };
      setTreatments(tJson.treatments);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/auth');
        const data = (await res.json()) as {
          authenticated: boolean;
          cloudMode: boolean;
          githubConfigured: boolean;
        };
        if (!active) return;
        setAuthenticated(data.authenticated);
        setCloudMode(data.cloudMode);
        setGithubConfigured(data.githubConfigured);
        if (data.authenticated) {
          await loadAllData();
        }
      } catch {
        // ignore initial check error
      } finally {
        if (active) setCheckingAuth(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [loadAllData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError('Incorrect password. Please try again.');
        return;
      }
      const data = (await res.json()) as {
        cloudMode: boolean;
        githubConfigured: boolean;
      };
      setAuthenticated(true);
      setCloudMode(data.cloudMode);
      setGithubConfigured(data.githubConfigured);
      setPassword('');
      await loadAllData();
    } catch {
      setLoginError('Unable to sign in right now.');
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setContent(null);
  }

  async function uploadImageFile(file: File, key: string): Promise<string | null> {
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string; mode?: string };
      if (!res.ok || !data.url) {
        showToast('error', data.error || 'Image upload failed');
        return null;
      }
      showToast(
        'success',
        data.mode === 'github'
          ? 'Image uploaded and committed to GitHub. Live site will rebuild shortly.'
          : 'Image uploaded successfully.'
      );
      return data.url;
    } catch {
      showToast('error', 'Image upload failed.');
      return null;
    } finally {
      setUploadingKey(null);
    }
  }

  async function saveContent(nextContent?: SiteContentData) {
    const payload = nextContent ?? content;
    if (!payload) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: payload }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; mode?: string };
      if (!res.ok) {
        showToast('error', data.error || 'Failed to save changes');
        return;
      }
      showToast(
        'success',
        data.mode === 'github'
          ? 'Changes saved to GitHub! Vercel is rebuilding the live site (takes ~1 minute).'
          : 'Website texts and images saved!'
      );
    } catch {
      showToast('error', 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    try {
      const method = isNewProduct ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: editingProduct }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        products?: Product[];
        error?: string;
        mode?: string;
      };
      if (!res.ok || !data.products) {
        showToast('error', data.error || 'Failed to save product');
        return;
      }
      setProducts(data.products);
      setEditingProduct(null);
      showToast(
        'success',
        data.mode === 'github'
          ? 'Product saved to GitHub! Live site will rebuild shortly.'
          : isNewProduct
          ? 'New product added!'
          : 'Product updated!'
      );
    } catch {
      showToast('error', 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct(product: Product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(product.id)}`, {
        method: 'DELETE',
      });
      const data = (await res.json()) as { products?: Product[]; error?: string; mode?: string };
      if (!res.ok || !data.products) {
        showToast('error', data.error || 'Failed to delete product');
        return;
      }
      setProducts(data.products);
      showToast(
        'success',
        data.mode === 'github'
          ? 'Product deleted on GitHub. Live site will rebuild shortly.'
          : 'Product deleted.'
      );
    } catch {
      showToast('error', 'Failed to delete product.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveTreatment(e: React.FormEvent) {
    e.preventDefault();
    if (!editingTreatment) return;
    setSaving(true);
    try {
      const method = isNewTreatment ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/treatments', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ treatment: editingTreatment }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        treatments?: Treatment[];
        error?: string;
        mode?: string;
      };
      if (!res.ok || !data.treatments) {
        showToast('error', data.error || 'Failed to save treatment');
        return;
      }
      setTreatments(data.treatments);
      setEditingTreatment(null);
      showToast(
        'success',
        data.mode === 'github'
          ? 'Treatment saved to GitHub! Live site will rebuild shortly.'
          : isNewTreatment
          ? 'New treatment added!'
          : 'Treatment updated!'
      );
    } catch {
      showToast('error', 'Failed to save treatment.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTreatment(treatment: Treatment) {
    if (!window.confirm(`Delete treatment "${treatment.title}"? This cannot be undone.`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/treatments?id=${encodeURIComponent(treatment.id)}`, {
        method: 'DELETE',
      });
      const data = (await res.json()) as {
        treatments?: Treatment[];
        error?: string;
        mode?: string;
      };
      if (!res.ok || !data.treatments) {
        showToast('error', data.error || 'Failed to delete treatment');
        return;
      }
      setTreatments(data.treatments);
      showToast(
        'success',
        data.mode === 'github'
          ? 'Treatment deleted on GitHub. Live site will rebuild shortly.'
          : 'Treatment deleted.'
      );
    } catch {
      showToast('error', 'Failed to delete treatment.');
    } finally {
      setSaving(false);
    }
  }

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return products.filter((p) => {
      if (productBrandFilter !== 'ALL' && p.brand !== productBrandFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [products, productSearch, productBrandFilter]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-sm text-slate-500 font-medium">Loading Skin Medic Admin…</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0a2240] text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6 text-cyan-300" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Skin Medic Admin
            </h1>
            <p className="text-sm text-slate-600">
              Sign in to manage website texts, photos, skincare products, and clinic treatments.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/15 outline-none text-sm"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white font-semibold text-sm transition cursor-pointer disabled:opacity-60"
            >
              {loggingIn ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-[#0a2240] underline">
              ← Return to Skin Medic website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0a2240] text-white flex items-center justify-center font-serif font-bold text-sm">
              SM
            </div>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-tight">
                Skin Medic Admin Panel
              </h1>
              <p className="text-[11px] text-slate-500">
                Roslyn Bolton — Content, Photos, Products &amp; Treatments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-2 rounded-xl border border-slate-200 hover:border-[#0a2240] text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Cloud / GitHub warning if needed */}
        {cloudMode && !githubConfigured && (
          <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <div className="font-semibold">
                Cloud persistence not yet connected (`GITHUB_TOKEN` missing)
              </div>
              <p className="text-amber-800">
                You are viewing the live Vercel deployment. To save changes permanently from this
                dashboard, add <code className="px-1 py-0.5 bg-amber-100 rounded">GITHUB_TOKEN</code>{' '}
                (a GitHub Personal Access Token with repo write access) in Vercel Project Settings →
                Environment Variables and redeploy.
              </p>
            </div>
          </div>
        )}

        {/* Toast notification */}
        {toast && (
          <div
            className={`fixed bottom-5 right-5 z-50 max-w-md rounded-2xl px-4 py-3 shadow-xl border flex items-center gap-2.5 text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {(
            [
              { key: 'texts', label: 'Website Texts', icon: FileText },
              { key: 'images', label: 'Images & Carousel', icon: ImageIcon },
              { key: 'products', label: `Products (${products.length})`, icon: Package },
              { key: 'treatments', label: `Treatments (${treatments.length})`, icon: Sparkles },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === key
                  ? 'bg-[#0a2240] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0a2240]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* TAB 1: TEXTS */}
        {activeTab === 'texts' && content && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-slate-900">Hero Section</h2>
                  <p className="text-xs text-slate-500">
                    The main headline, intro paragraph, buttons, and trust badges at the top of the home page.
                  </p>
                </div>
                <button
                  onClick={() => saveContent()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save Texts'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Top Badge"
                  value={content.hero.badge}
                  onChange={(v) => setContent({ ...content, hero: { ...content.hero, badge: v } })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Primary Button"
                    value={content.hero.primaryCta}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, primaryCta: v } })
                    }
                  />
                  <Field
                    label="Secondary Button"
                    value={content.hero.secondaryCta}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, secondaryCta: v } })
                    }
                  />
                </div>
                <Field
                  label="Headline Line 1"
                  value={content.hero.headlineLine1}
                  onChange={(v) =>
                    setContent({ ...content, hero: { ...content.hero, headlineLine1: v } })
                  }
                />
                <Field
                  label="Headline Line 2 (Highlighted)"
                  value={content.hero.headlineLine2}
                  onChange={(v) =>
                    setContent({ ...content, hero: { ...content.hero, headlineLine2: v } })
                  }
                />
              </div>

              <TextAreaField
                label="Hero Description"
                rows={3}
                value={content.hero.description}
                onChange={(v) =>
                  setContent({ ...content, hero: { ...content.hero, description: v } })
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Field
                    label="Trust Item 1 Value"
                    value={content.hero.trust1Value}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust1Value: v } })
                    }
                  />
                  <Field
                    label="Trust Item 1 Label"
                    value={content.hero.trust1Label}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust1Label: v } })
                    }
                  />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Field
                    label="Trust Item 2 Value"
                    value={content.hero.trust2Value}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust2Value: v } })
                    }
                  />
                  <Field
                    label="Trust Item 2 Label"
                    value={content.hero.trust2Label}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust2Label: v } })
                    }
                  />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Field
                    label="Trust Item 3 Value"
                    value={content.hero.trust3Value}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust3Value: v } })
                    }
                  />
                  <Field
                    label="Trust Item 3 Label"
                    value={content.hero.trust3Label}
                    onChange={(v) =>
                      setContent({ ...content, hero: { ...content.hero, trust3Label: v } })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-serif font-bold text-slate-900">
                  Welcome, Clinical Director &amp; Featured Quote
                </h2>
                <p className="text-xs text-slate-500">
                  Introductory clinic story, Roslyn Bolton&apos;s card bio, and the quote in Most Loved.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Welcome Badge"
                  value={content.welcome.badge}
                  onChange={(v) =>
                    setContent({ ...content, welcome: { ...content.welcome, badge: v } })
                  }
                />
                <Field
                  label="Welcome Heading"
                  value={content.welcome.heading}
                  onChange={(v) =>
                    setContent({ ...content, welcome: { ...content.welcome, heading: v } })
                  }
                />
              </div>

              <TextAreaField
                label="Welcome Body Copy"
                rows={4}
                value={content.welcome.body}
                onChange={(v) =>
                  setContent({ ...content, welcome: { ...content.welcome, body: v } })
                }
              />

              <TextAreaField
                label="Clinical Director Bio (Roslyn Bolton Card)"
                rows={2}
                value={content.welcome.directorBio}
                onChange={(v) =>
                  setContent({ ...content, welcome: { ...content.welcome, directorBio: v } })
                }
              />

              <Field
                label="Most Loved Products Quote"
                value={content.welcome.mostLovedQuote}
                onChange={(v) =>
                  setContent({ ...content, welcome: { ...content.welcome, mostLovedQuote: v } })
                }
              />

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => saveContent()}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save All Text Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IMAGES & CAROUSEL */}
        {activeTab === 'images' && content && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Website Photos &amp; Banners
                  </h2>
                  <p className="text-xs text-slate-500">
                    Upload a new image (JPG, PNG, WebP, max 4 MB) or paste an image path, then click Save Images.
                  </p>
                </div>
                <button
                  onClick={() => saveContent()}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save Images'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(
                  [
                    { key: 'founderPortrait', label: 'Founder Portrait (Roslyn Bolton)' },
                    { key: 'videoConsultationBg', label: 'Video Consultation Section Photo' },
                    { key: 'parallaxBannerDesktop', label: 'Parallax Showcase Banner (Desktop)' },
                    { key: 'parallaxBannerMobile', label: 'Showcase Banner (Mobile)' },
                  ] as const
                ).map(({ key, label }) => (
                  <div
                    key={key}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                  >
                    <div className="text-sm font-semibold text-slate-900">{label}</div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
                      <Image
                        src={content.images[key]}
                        alt={label}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={content.images[key]}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            images: { ...content.images, [key]: e.target.value },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                      />
                      <label className="px-3 py-2 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        {uploadingKey === key ? 'Uploading…' : 'Upload'}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await uploadImageFile(file, key);
                            if (url) {
                              const next: SiteContentData = {
                                ...content,
                                images: { ...content.images, [key]: url },
                              };
                              setContent(next);
                              await saveContent(next);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-serif font-bold text-slate-900">
                  Hero 3D Carousel Slides
                </h2>
                <p className="text-xs text-slate-500">
                  Update the 3 rotating hero photos and captions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {content.heroSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Slide {idx + 1}
                    </div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <label className="w-full py-2 rounded-xl bg-white border border-slate-300 hover:border-[#0a2240] text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      {uploadingKey === `slide-${idx}` ? 'Uploading…' : 'Upload New Photo'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadImageFile(file, `slide-${idx}`);
                          if (url) {
                            const nextSlides = content.heroSlides.map((s, i) =>
                              i === idx ? { ...s, src: url } : s
                            );
                            const next = { ...content, heroSlides: nextSlides };
                            setContent(next);
                            await saveContent(next);
                          }
                        }}
                      />
                    </label>
                    <Field
                      label="Caption"
                      value={slide.caption}
                      onChange={(v) => {
                        const nextSlides = content.heroSlides.map((s, i) =>
                          i === idx ? { ...s, caption: v } : s
                        );
                        setContent({ ...content, heroSlides: nextSlides });
                      }}
                    />
                    <Field
                      label="Tagline"
                      value={slide.tagline}
                      onChange={(v) => {
                        const nextSlides = content.heroSlides.map((s, i) =>
                          i === idx ? { ...s, tagline: v } : s
                        );
                        setContent({ ...content, heroSlides: nextSlides });
                      }}
                    />
                    <Field
                      label="Alt Text (Accessibility)"
                      value={slide.alt}
                      onChange={(v) => {
                        const nextSlides = content.heroSlides.map((s, i) =>
                          i === idx ? { ...s, alt: v } : s
                        );
                        setContent({ ...content, heroSlides: nextSlides });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => saveContent()}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save Carousel & Images'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search products by name or category…"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0a2240] outline-none"
                  />
                </div>
                <select
                  value={productBrandFilter}
                  onChange={(e) =>
                    setProductBrandFilter(
                      e.target.value as 'ALL' | 'ZO Skin Health' | 'Obagi Medical'
                    )
                  }
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="ALL">All Brands ({products.length})</option>
                  <option value="ZO Skin Health">ZO Skin Health</option>
                  <option value="Obagi Medical">Obagi Medical</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setIsNewProduct(true);
                  setEditingProduct({ ...EMPTY_PRODUCT_DRAFT });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 items-start shadow-sm hover:border-slate-300 transition"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={product.images?.[0] || '/images/hero-1.jpg'}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                      {product.brand}
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="text-sm font-bold text-[#0a2240]">
                      £{product.price.toFixed(2)}
                      {product.isMostLoved && (
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                          Most Loved
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          setIsNewProduct(false);
                          setEditingProduct({ ...product });
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TREATMENTS */}
        {activeTab === 'treatments' && (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 flex items-center justify-between gap-4 shadow-sm">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900">
                  Clinic Treatments ({treatments.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Add new clinic treatments or edit pricing tables, descriptions, and FAQs.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewTreatment(true);
                  setEditingTreatment({ ...EMPTY_TREATMENT_DRAFT });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add New Treatment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                        {treatment.subtitle}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-slate-900">
                        {treatment.title}
                      </h3>
                    </div>
                    {treatment.priceHighlight && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0a2240] text-xs font-semibold shrink-0">
                        {treatment.priceHighlight}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{treatment.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500">
                      {treatment.pricingTable?.length ?? 0} pricing rows ·{' '}
                      {treatment.faqs?.length ?? 0} FAQs
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsNewTreatment(false);
                          setEditingTreatment({
                            ...treatment,
                            pricingTable: treatment.pricingTable ? [...treatment.pricingTable] : [],
                            faqs: treatment.faqs ? [...treatment.faqs] : [],
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTreatment(treatment)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-serif font-bold text-xl text-slate-900">
                {isNewProduct ? 'Add New Product' : `Edit Product: ${editingProduct.name}`}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Product Name *"
                  required
                  value={editingProduct.name || ''}
                  onChange={(v) => setEditingProduct({ ...editingProduct, name: v })}
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Brand *
                  </label>
                  <select
                    value={editingProduct.brand || 'ZO Skin Health'}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        brand: e.target.value as 'ZO Skin Health' | 'Obagi Medical',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="ZO Skin Health">ZO Skin Health</option>
                    <option value="Obagi Medical">Obagi Medical</option>
                  </select>
                </div>
                <Field
                  label="Price (£) *"
                  type="number"
                  step="0.01"
                  required
                  value={String(editingProduct.price ?? 0)}
                  onChange={(v) =>
                    setEditingProduct({ ...editingProduct, price: parseFloat(v) || 0 })
                  }
                />
                <Field
                  label="Capacity / Size (e.g. 50 ml)"
                  value={editingProduct.capacity || ''}
                  onChange={(v) => setEditingProduct({ ...editingProduct, capacity: v })}
                />
              </div>

              <Field
                label="Categories (comma-separated)"
                value={(editingProduct.categories || []).join(', ')}
                onChange={(v) =>
                  setEditingProduct({
                    ...editingProduct,
                    categories: v
                      .split(',')
                      .map((c) => c.trim())
                      .filter(Boolean),
                  })
                }
              />

              {/* Product Image Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Product Image
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                    <Image
                      src={editingProduct.images?.[0] || '/images/hero-1.jpg'}
                      alt="Product preview"
                      fill
                      unoptimized
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={editingProduct.images?.[0] || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          images: [e.target.value],
                        })
                      }
                      placeholder="/images/uploads/product.jpg"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-xs font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      {uploadingKey === 'product-img' ? 'Uploading…' : 'Upload Product Photo'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadImageFile(file, 'product-img');
                          if (url) {
                            setEditingProduct({
                              ...editingProduct,
                              images: [url, ...(editingProduct.images?.slice(1) || [])],
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <TextAreaField
                label="Short Description"
                rows={2}
                value={editingProduct.shortDescription || ''}
                onChange={(v) =>
                  setEditingProduct({ ...editingProduct, shortDescription: v })
                }
              />

              <TextAreaField
                label="Full Description"
                rows={4}
                value={editingProduct.description || ''}
                onChange={(v) => setEditingProduct({ ...editingProduct, description: v })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextAreaField
                  label="How to Use"
                  rows={3}
                  value={editingProduct.howToUse || ''}
                  onChange={(v) => setEditingProduct({ ...editingProduct, howToUse: v })}
                />
                <TextAreaField
                  label="Key Benefits"
                  rows={3}
                  value={editingProduct.benefits || ''}
                  onChange={(v) => setEditingProduct({ ...editingProduct, benefits: v })}
                />
              </div>

              <TextAreaField
                label="Ingredients"
                rows={2}
                value={editingProduct.ingredients || ''}
                onChange={(v) => setEditingProduct({ ...editingProduct, ingredients: v })}
              />

              <div className="flex flex-wrap gap-5 pt-1">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock !== false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                    }
                    className="rounded"
                  />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isFeatured)}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })
                    }
                    className="rounded"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isMostLoved)}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isMostLoved: e.target.checked })
                    }
                    className="rounded"
                  />
                  Show in &ldquo;Most Loved by Patients&rdquo;
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : isNewProduct ? 'Create Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TREATMENT MODAL */}
      {editingTreatment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-serif font-bold text-xl text-slate-900">
                {isNewTreatment
                  ? 'Add New Treatment'
                  : `Edit Treatment: ${editingTreatment.title}`}
              </h2>
              <button
                onClick={() => setEditingTreatment(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTreatment} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Treatment Title *"
                  required
                  value={editingTreatment.title || ''}
                  onChange={(v) => setEditingTreatment({ ...editingTreatment, title: v })}
                />
                <Field
                  label="Subtitle / Category"
                  value={editingTreatment.subtitle || ''}
                  onChange={(v) => setEditingTreatment({ ...editingTreatment, subtitle: v })}
                />
                <Field
                  label="Price Highlight Badge (e.g. From £195)"
                  value={editingTreatment.priceHighlight || ''}
                  onChange={(v) =>
                    setEditingTreatment({ ...editingTreatment, priceHighlight: v })
                  }
                />
                <Field
                  label="Pricing Section Heading"
                  value={editingTreatment.pricingSectionTitle || ''}
                  onChange={(v) =>
                    setEditingTreatment({ ...editingTreatment, pricingSectionTitle: v })
                  }
                />
              </div>

              <TextAreaField
                label="Treatment Description *"
                rows={4}
                value={editingTreatment.description || ''}
                onChange={(v) => setEditingTreatment({ ...editingTreatment, description: v })}
              />

              <TextAreaField
                label="Pricing Details / Overview"
                rows={2}
                value={editingTreatment.pricingDetails || ''}
                onChange={(v) =>
                  setEditingTreatment({ ...editingTreatment, pricingDetails: v })
                }
              />

              {/* Pricing Table Rows */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Pricing Table Rows
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const nextRows: TreatmentPricingRow[] = [
                        ...(editingTreatment.pricingTable || []),
                        { name: '', amount: '', price: '' },
                      ];
                      setEditingTreatment({ ...editingTreatment, pricingTable: nextRows });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#0a2240] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Row
                  </button>
                </div>

                {(editingTreatment.pricingTable || []).map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Option name"
                      value={row.name}
                      onChange={(e) => {
                        const rows = [...(editingTreatment.pricingTable || [])];
                        rows[idx] = { ...rows[idx], name: e.target.value };
                        setEditingTreatment({ ...editingTreatment, pricingTable: rows });
                      }}
                      className="col-span-5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Amount / Area"
                      value={row.amount || ''}
                      onChange={(e) => {
                        const rows = [...(editingTreatment.pricingTable || [])];
                        rows[idx] = { ...rows[idx], amount: e.target.value };
                        setEditingTreatment({ ...editingTreatment, pricingTable: rows });
                      }}
                      className="col-span-4 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="£Price"
                      value={row.price}
                      onChange={(e) => {
                        const rows = [...(editingTreatment.pricingTable || [])];
                        rows[idx] = { ...rows[idx], price: e.target.value };
                        setEditingTreatment({ ...editingTreatment, pricingTable: rows });
                      }}
                      className="col-span-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const rows = (editingTreatment.pricingTable || []).filter(
                          (_, i) => i !== idx
                        );
                        setEditingTreatment({ ...editingTreatment, pricingTable: rows });
                      }}
                      className="col-span-1 p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Treatment FAQs
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const nextFaqs: TreatmentFAQ[] = [
                        ...(editingTreatment.faqs || []),
                        { q: '', a: '' },
                      ];
                      setEditingTreatment({ ...editingTreatment, faqs: nextFaqs });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#0a2240] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add FAQ
                  </button>
                </div>

                {(editingTreatment.faqs || []).map((faq, idx) => (
                  <div key={idx} className="space-y-2 p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.q}
                        onChange={(e) => {
                          const faqs = [...(editingTreatment.faqs || [])];
                          faqs[idx] = { ...faqs[idx], q: e.target.value };
                          setEditingTreatment({ ...editingTreatment, faqs });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const faqs = (editingTreatment.faqs || []).filter((_, i) => i !== idx);
                          setEditingTreatment({ ...editingTreatment, faqs });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Answer"
                      value={faq.a}
                      onChange={(e) => {
                        const faqs = [...(editingTreatment.faqs || [])];
                        faqs[idx] = { ...faqs[idx], a: e.target.value };
                        setEditingTreatment({ ...editingTreatment, faqs });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="CTA Title"
                  value={editingTreatment.ctaTitle || ''}
                  onChange={(v) => setEditingTreatment({ ...editingTreatment, ctaTitle: v })}
                />
                <Field
                  label="CTA Button Label"
                  value={editingTreatment.ctaButton || ''}
                  onChange={(v) => setEditingTreatment({ ...editingTreatment, ctaButton: v })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTreatment(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#11325b] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : isNewTreatment ? 'Create Treatment' : 'Save Treatment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  step,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        step={step}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/15 outline-none text-sm bg-white"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/15 outline-none text-sm bg-white"
      />
    </div>
  );
}
