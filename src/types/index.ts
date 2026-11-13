export interface Product {
  id: string;
  slug: string;
  legacySlug?: string;
  name: string;
  brand: 'ZO Skin Health' | 'Obagi Medical';
  price: number;
  salePrice: number | null;
  categories: string[];
  description: string;
  shortDescription: string;
  howToUse: string;
  ingredients: string;
  safetyInfo: string;
  benefits: string;
  storage: string;
  isFeatured: boolean;
  isMostLoved: boolean;
  images: string[];
  localImages?: string[];
  inStock: boolean;
  orderIndex?: number;
  mostLovedOrder?: number;
  capacity?: string;
  activeConcentration?: string;
  indication?: string;
  officialCardUrl?: string;
  auditStatus?: string;
}

export interface TreatmentPricingRow {
  name: string;
  amount?: string;
  price: string;
}

export interface TreatmentSubItem {
  name: string;
  description: string;
  price: string;
  duration?: string;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pricingSectionTitle?: string;
  priceHighlight?: string;
  pricingDetails?: string;
  pricingNote?: string;
  pricingTable?: TreatmentPricingRow[];
  items?: TreatmentSubItem[];
  faqs: TreatmentFAQ[];
  ctaTitle: string;
  ctaDescription?: string;
  ctaButton: string;
  fullText?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Review {
  name: string;
  role?: string;
  rating: number;
  date?: string;
  quote: string;
  product?: string;
  brand?: string;
}

export interface ConsultationFormData {
  concern: string;
  productOfInterest?: string;
  consultationType: 'video' | 'clinic' | 'whatsapp';
  preferredDate?: string;
  preferredTime?: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}
