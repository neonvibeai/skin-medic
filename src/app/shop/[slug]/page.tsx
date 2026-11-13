import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/siteConfig';
import { cleanMetaDescription } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';

const allProducts = productsData as Product[];

export function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return {};

  const description = cleanMetaDescription(
    product.shortDescription || product.description || `${product.name} by ${product.brand}`,
    155
  );
  const canonicalUrl = `${SITE_URL}/shop/${product.slug}`;

  return {
    title: `${product.name} | ${product.brand}`,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${product.name} | ${product.brand} | Skin Medic Skin Care`,
      description,
      url: canonicalUrl,
      siteName: 'Skin Medic Skin Care',
      locale: 'en_GB',
      type: 'website'
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand ||
          p.categories.some((c) => product.categories.includes(c)))
    )
    .slice(0, 4);

  const isZO = product.brand === 'ZO Skin Health';
  const brandPath = isZO ? '/brands/zo-skin-health' : '/brands/obagi-medical';
  const productUrl = `${SITE_URL}/shop/${product.slug}`;
  const productDescription = cleanMetaDescription(
    product.shortDescription || product.description || product.name,
    300
  );
  const productImages =
    product.localImages && product.localImages.length > 0
      ? product.localImages.map((img) => `${SITE_URL}${img}`)
      : undefined;

  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: productDescription,
    ...(productImages ? { image: productImages } : {}),
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    ...(product.price > 0
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'GBP',
            price: product.price.toFixed(2),
            url: productUrl
          }
        }
      : {})
  };

  const breadcrumbJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop Catalogue',
        item: `${SITE_URL}/shop`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.brand,
        item: `${SITE_URL}${brandPath}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: productUrl
      }
    ]
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
