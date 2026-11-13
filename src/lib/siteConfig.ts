import productsData from '@/data/products.json';
import { Product } from '@/types';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skinmedicskincare.com'
).replace(/\/+$/, '');

export const IS_PREVIEW_ENV =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

/**
 * Search engines may index the site only once NEXT_PUBLIC_ALLOW_INDEXING=true
 * is set in Vercel (on the day the real domain is switched over). Until then
 * every deployment, production included, sends noindex and Disallow: /.
 */
export const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' &&
  !IS_PREVIEW_ENV &&
  !SITE_URL.includes('vercel.app');

const allProducts = productsData as Product[];

export const CATALOG_COUNTS = {
  zo: allProducts.filter((p) => p.brand === 'ZO Skin Health').length,
  obagi: allProducts.filter((p) => p.brand === 'Obagi Medical').length,
  total: allProducts.length
} as const;
