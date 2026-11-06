import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import treatmentsData from '@/data/treatments.json';
import { Treatment } from '@/types';
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
      title: 'Treatment Not Found | Skin Medic'
    };
  }

  return {
    title: `${treatment.title} | Skin Medic Clinical Treatments`,
    description: treatment.description.slice(0, 160)
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatments = treatmentsData as Treatment[];
  const treatment = treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentDetailClient treatment={treatment} />;
}
