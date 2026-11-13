/**
 * Permanent redirects for search engines and old links.
 *
 * 1. Product pages that had a numeric ID in this site's first version
 *    (/shop/serum-15-6197) → keyword URLs (/shop/obagi-professional-c-serum-15).
 * 2. URLs from the old WordPress / WooCommerce site on skinmedicskincare.com,
 *    taken from saved copies of that site, → their nearest new page.
 *
 * Next.js sends 308 for `permanent: true`, which search engines treat like a 301.
 */
import type { NextConfig } from 'next';
import products from './src/data/products.json';

type Redirect = Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>[number];
type ProductRow = { slug: string; legacySlug?: string };

const rows = products as ProductRow[];
const productPath = (slug: string) => `/shop/${slug}`;

// --- 1. ID-based product URLs from the first Vercel version ------------------
const legacyIdRedirects: Redirect[] = rows
  .filter((p) => p.legacySlug && p.legacySlug !== p.slug)
  .map((p) => ({
    source: productPath(p.legacySlug!),
    destination: productPath(p.slug),
    permanent: true,
  }));

// --- 2. Old WordPress product URLs (/product/<name>/) ------------------------
// WooCommerce product slugs were the legacy slug without the trailing "-<id>".
// "cr-me" / "d-collet" come from accents stripped in the ID-based slugs.
const wpSlugFromLegacy = (legacy: string) =>
  legacy
    .replace(/-\d+$/, '')
    .replace(/cr-me/g, 'creme')
    .replace(/d-collet/g, 'decollete');

const wpProductOverrides: Record<string, string> = {
  // Two "Gentle Cleanser" products: WooCommerce gave "-2" to the newer one (ZO, id 6455).
  'gentle-cleanser': 'gentle-cleanser-6092',
  'gentle-cleanser-2': 'gentle-cleanser-6455',
  // WooCommerce dropped the "c-" / "fx-c-" prefixes on these Obagi-C products.
  'exfoliating-day-lotion': 'c-exfoliating-day-lotion-6155',
  'clarifying-serum': 'fx-c-clarifying-serum-6151',
};

const byLegacy = new Map(rows.filter((p) => p.legacySlug).map((p) => [p.legacySlug!, p.slug]));

const wpProductRedirects: Redirect[] = [
  ...rows
    .filter((p) => p.legacySlug)
    .map((p) => wpSlugFromLegacy(p.legacySlug!))
    .filter((wp) => !(wp in wpProductOverrides))
    .map((wp) => {
      const legacy = rows.find((p) => p.legacySlug && wpSlugFromLegacy(p.legacySlug) === wp)!.legacySlug!;
      return { source: `/product/${wp}`, destination: productPath(byLegacy.get(legacy)!), permanent: true };
    }),
  ...Object.entries(wpProductOverrides).map(([wp, legacy]) => ({
    source: `/product/${wp}`,
    destination: productPath(byLegacy.get(legacy)!),
    permanent: true,
  })),
];

// --- 3. Old WordPress category, brand and content pages ----------------------
const shopFilter = (concern: string) => `/shop?concern=${encodeURIComponent(concern)}`;

const wpCategoryMap: Record<string, string> = {
  'acne-blemishes': shopFilter('Acne & Blemishes'),
  acne: shopFilter('Acne & Blemishes'),
  'ageing-skin': shopFilter('Ageing Skin'),
  'anti-ageing': shopFilter('Ageing Skin'),
  body: shopFilter('Body'),
  brightening: shopFilter('Brightening'),
  cleanse: shopFilter('Cleanse'),
  'clenziderm-m-d': shopFilter('CLENZIderm M.D.'),
  'dry-dehydrated-skin': shopFilter('Dry & Dehydrated Skin'),
  'dull-skin-brightening': shopFilter('Dull Skin & Brightening'),
  'elastiderm-collection': shopFilter('ELASTIderm Collection'),
  exfoliate: shopFilter('Exfoliate'),
  'eye-care': shopFilter('Eye Care'),
  hydrators: shopFilter('Hydrators'),
  'nu-cil': shopFilter('Nu-Cil'),
  'nu-derm-fx-system': shopFilter('Nu-Derm Fx System'),
  'nu-derm-rx-system': shopFilter('Nu-Derm Rx System'),
  'obagi-c-rx-system': shopFilter('Obagi-C Rx System'),
  'oily-skin': shopFilter('Oily Skin'),
  'pigmentation-dark-spots': shopFilter('Pigmentation & Dark Spots'),
  'professional-c-portfolio': shopFilter('Professional-C Portfolio'),
  redness: shopFilter('Rosacea & Redness'),
  'rosacea-redness': shopFilter('Rosacea & Redness'),
  'sun-protection': shopFilter('Sun Protection'),
  tone: shopFilter('Tone'),
  // Obagi ranges no longer stocked as a separate category
  'obagi-c-fx-system': '/brands/obagi-medical',
  'obagi-rebalance': '/brands/obagi-medical',
  suzanobagimd: '/brands/obagi-medical',
};

const wpPageMap: Record<string, string> = {
  '/home': '/',
  '/4-steps': '/how-it-works',
  '/meet-our-experts': '/about',
  '/brand/obagi': '/brands/obagi-medical',
  '/obagi': '/brands/obagi-medical',
  '/zo': '/brands/zo-skin-health',
  '/brand/zo-skin-health': '/brands/zo-skin-health',
  '/anti-wrinkle-injections': '/treatments/fine-lines-wrinkles',
  '/advanced-injectables': '/treatments',
  '/advanced-treatments': '/treatments',
  '/clinical-facials': '/treatments',
  '/facial-aesthetics': '/treatments',
  '/skin-correction': '/treatments',
  // Brands the old shop listed that the new catalogue does not stock
  '/hydropeptide': '/shop',
  '/medik8': '/shop',
  '/cart': '/shop',
  '/checkout': '/shop',
  '/log-in': '/',
  '/cookie-policy': '/cookies',
  '/private-policy': '/privacy',
  '/terms-i-conditions': '/terms',
};

const wpOtherRedirects: Redirect[] = [
  ...Object.entries(wpCategoryMap).map(([cat, destination]) => ({
    source: `/product-category/${cat}`,
    destination,
    permanent: true,
  })),
  ...Object.entries(wpPageMap).map(([source, destination]) => ({ source, destination, permanent: true })),
  // Anything else from the old shop (discontinued products and ranges) → the catalogue
  { source: '/product/:slug*', destination: '/shop', permanent: true },
  { source: '/product-category/:slug*', destination: '/shop', permanent: true },
  { source: '/brand/:slug*', destination: '/shop', permanent: true },
];

export const siteRedirects: Redirect[] = [
  ...legacyIdRedirects,
  ...wpProductRedirects,
  ...wpOtherRedirects,
];
