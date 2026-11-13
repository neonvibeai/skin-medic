import productsData from '@/data/products.json';
import { Product } from '@/types';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skinmedicskincare.com'
).replace(/\/+$/, '');

export const IS_PREVIEW_ENV =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

const allProducts = productsData as Product[];

export const CATALOG_COUNTS = {
  zo: allProducts.filter((p) => p.brand === 'ZO Skin Health').length,
  obagi: allProducts.filter((p) => p.brand === 'Obagi Medical').length,
  total: allProducts.length
} as const;
