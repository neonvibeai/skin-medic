import type { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import treatmentsData from '@/data/treatments.json';
import { SITE_URL } from '@/lib/siteConfig';
import { Product, Treatment } from '@/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/treatments',
    '/brands/zo-skin-health',
    '/brands/obagi-medical',
    '/shop',
    '/how-it-works',
    '/faq',
    '/consultation',
    '/privacy',
    '/terms',
    '/cookies'
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' || route === '/shop' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/shop' || route === '/treatments' ? 0.9 : 0.7
  }));

  const treatmentEntries: MetadataRoute.Sitemap = (treatmentsData as Treatment[]).map((t) => ({
    url: `${SITE_URL}/treatments/${t.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const productEntries: MetadataRoute.Sitemap = (productsData as Product[]).map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [...staticEntries, ...treatmentEntries, ...productEntries];
}
