import type { Metadata } from 'next';
import faqsData from '@/data/faqs.json';
import JsonLd from '@/components/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import FAQClient from './FAQClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about medical-grade skincare prescriptions, free consultations, UK delivery and clinic care in Hucknall, Nottingham.',
  path: '/faq'
});

const faqJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FAQClient />
    </>
  );
}
