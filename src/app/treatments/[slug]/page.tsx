import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import treatmentsData from '@/data/treatments.json';
import { Treatment } from '@/types';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/siteConfig';
import { cleanMetaDescription } from '@/lib/seo';
import TreatmentDetailClient from './TreatmentDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const treatments = treatmentsData as Treatment[];
  return treatments.map((t) => ({
    slug: t.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatments = treatmentsData as Treatment[];
  const treatment = treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: 'Treatment Not Found'
    };
  }

  const description = cleanMetaDescription(treatment.description, 155);
  const canonicalUrl = `${SITE_URL}/treatments/${treatment.slug}`;

  return {
    title: `${treatment.title} | Clinical Treatments`,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${treatment.title} | Clinical Treatments | Skin Medic Skin Care`,
      description,
      url: canonicalUrl,
      siteName: 'Skin Medic Skin Care',
      locale: 'en_GB',
      type: 'website'
    }
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatments = treatmentsData as Treatment[];
  const treatment = treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

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
        name: 'Treatments',
        item: `${SITE_URL}/treatments`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: treatment.title,
        item: `${SITE_URL}/treatments/${treatment.slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <TreatmentDetailClient treatment={treatment} />
    </>
  );
}
