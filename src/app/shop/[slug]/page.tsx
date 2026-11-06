import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { CLINIC_INFO } from '@/data/siteData';
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
}) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${product.brand} | Skin Medic Skin Care`,
    description: product.shortDescription || product.description?.slice(0, 160)
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

  // Related products from the same brand or category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.categories.some(c => product.categories.includes(c))))
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
