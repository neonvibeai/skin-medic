import { Review } from '@/types';

export const CLINIC_INFO = {
  name: 'Skin Medic Skin Care',
  legalName: 'Skin Medic Skin Care Limited',
  tagline: 'Advanced Skincare Backed by Science',
  rotatingTags: ['Trusted', 'Professional', 'Clinical', 'Expert-Led'],
  founder: {
    name: 'Roslyn Bolton',
    title: 'Registered Nurse & Skin Specialist, Founder',
    experience: 'Extensive clinical experience in dermatology and aesthetic nursing',
    quote: 'We believe everyone—regardless of age, gender, or skin type—deserves to feel confident in their own skin.'
  },
  address: {
    street: '37 Portland Road',
    town: 'Hucknall',
    city: 'Nottingham',
    postcode: 'NG15 7SL',
    country: 'United Kingdom'
  },
  phone: '+44 7956 072102',
  phoneAlt: '+44 7956 073682',
  email: 'info@skinmedicskincare.com',
  whatsappNumber: '447956072102',
  whatsappUrl: 'https://wa.me/447956072102',
  // Google Business profile search for the clinic (opens the rating and reviews panel)
  googleReviewsUrl: 'https://www.google.com/search?q=skin+medic+skin+care+hucknall',
  stats: {
    googleRating: '4.9',
    googleReviewsCount: '150+',
    facebookScore: '100%',
    clinicalExpertise: 'Expert-Led'
  },
  announcements: [
    'Next-day delivery available across the UK',
    'Free delivery on all orders over £100',
    'Free ongoing skincare support with certified specialists',
    'Complimentary 30-minute virtual skin consultation'
  ]
};

export const REVIEWS: Review[] = [
  {
    name: 'Charlotte Machen',
    role: 'Verified Patient',
    rating: 5,
    date: 'November 2024',
    quote: 'I visited the Skin Clinic for help with age spots. After previously trying products that left my skin dull and greasy, I was relieved to find a routine and products that worked. By June 2025, my age spots are gone, my skin is clearer and brighter, and I\'ve received compliments. I now have a skincare routine that keeps me feeling clean and fresh. I would recommend the Skin Clinic to everyone.',
    brand: 'ZO Skin Health'
  },
  {
    name: 'Laura Atkinson',
    role: 'Verified Patient',
    rating: 5,
    date: '2025',
    quote: 'I didn\'t realise I needed a new skin care regime until I saw how tired my skin looked with obvious large pores and pigmentation spots from pregnancy! Decided to start using ZO products to see if it made a difference and I will never go back! I had a thorough consultation with Roslyn who recommended a routine and the difference it had made is amazing! For the first time in a long time (I\'m now 44) I don\'t wear any makeup on my skin for work! My pore size has visibly reduced and my pigmentation spots are no longer noticeable.',
    brand: 'ZO Skin Health'
  },
  {
    name: 'Garry Marino',
    role: 'Verified Patient',
    rating: 5,
    date: '2025',
    quote: 'I have been using ZO skin products for a couple of years and absolutely love them. Roslyn has been amazing in helping me with my skin journey and I would recommend the clinic and ZO to anyone looking for genuine, noticeable changes in skin tone and resilience.',
    brand: 'ZO Skin Health'
  },
  {
    name: 'Senior Patient (Age 66)',
    role: 'Long-term Client',
    rating: 5,
    date: 'Clinical Case',
    quote: 'I have been using medical-grade skincare for almost 15 years. I love the way it\'s made my skin look. I have no wrinkles at 66 years of age and everyone guesses my age at least 10 years younger. When friends try to get me to use their high street products, I ask them why? Why try something different when I know what this has done for me! Wonderful products!',
    brand: 'Obagi Medical & ZO'
  }
];

export const BEFORE_AFTER_CASES = [
  {
    title: 'ZO Anti-Ageing & Texture Transformation',
    client: 'Andras',
    image: '/images/andras.jpg',
    program: 'ZO Anti-Ageing Protocol',
    quote: 'I get compliments about my skin now, and I haven\'t changed my routine. Definitely worth it.',
    results: ['Less dullness', 'More refreshed look', 'Smoothed expression lines'],
    brand: 'ZO Skin Health'
  },
  {
    title: 'Mel - Melasma & Pigmentation Correction',
    client: 'Mel',
    image: '/images/mel.jpg',
    program: 'ZO Pigmentation Control & Brightening',
    quote: 'My skin looks clearer and more radiant, and I don\'t need heavy makeup anymore. The discolouration has reduced dramatically.',
    results: ['Fade stubborn dark patches', 'Even skin tone', 'Enhanced cellular clarity'],
    brand: 'ZO Skin Health'
  },
  {
    title: 'SUZANOBAGIMD™ Claribright Radiance Protocol',
    client: 'Clinical Case Study',
    program: 'Claribright Radiance Brightening Lotion',
    quote: 'Clinically proven, non-irritating skincare system designed to visibly improve skin brightness, reduce redness, and target hyperpigmentation.',
    results: ['Reduced redness', 'Brightened complexion', 'Even tone achieved through personalised protocol'],
    brand: 'Obagi Medical'
  },
  {
    title: 'Obagi Retinol + PHA Refining Night Cream',
    client: 'Clinical Evaluation',
    program: 'Polyhydroxy Acid (Gluconolactone) + Retinoid System',
    quote: 'Noticeably clearer, reduced breakouts, and remarkably more even complexion without typical retinoid peeling.',
    results: ['Clearer texture', 'Pore refinement', 'Smooth, glowing surface'],
    brand: 'Obagi Medical'
  }
];

export const SKIN_CONCERNS = [
  {
    name: 'Ageing Skin',
    slug: 'ageing-skin',
    tagline: 'Restore youth & firmness',
    description: 'Target fine lines, deep wrinkles, loss of elasticity and skin laxity.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Acne & Blemishes',
    slug: 'acne-blemishes',
    tagline: 'Clearer skin starts here',
    description: 'Break the acne cycle, reduce sebum production, and unclog congested pores.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Anti-Ageing',
    slug: 'anti-ageing',
    tagline: 'Turn back the clock',
    description: 'Preventative and restorative clinical retinoids, growth factors and peptides.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Oily Skin',
    slug: 'oily-skin',
    tagline: 'Balance and refine',
    description: 'Normalise surface sebum, minimise enlarged pores, and promote a clean matte finish.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Dry & Dehydrated',
    slug: 'dry-dehydrated-skin',
    tagline: 'Quench and restore',
    description: 'Deep hydration and lipid replenishment to restore compromised skin barrier function.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Rosacea & Redness',
    slug: 'rosacea-redness',
    tagline: 'Calm, soothe, restore',
    description: 'Clinically proven gentle anti-inflammatory formulas to reduce flushing and vascular redness.',
    recommendedBrand: 'ZO Skin Health'
  },
  {
    name: 'Dull Skin & Brightening',
    slug: 'dull-skin-brightening',
    tagline: 'Reveal your natural glow',
    description: 'Exfoliate dead cells and infuse high-potency Vitamin C to awaken tired complexion.',
    recommendedBrand: 'ZO Skin Health & Obagi'
  },
  {
    name: 'Pigmentation & Dark Spots',
    slug: 'pigmentation-dark-spots',
    tagline: 'Even, radiant skin tone',
    description: 'Medical-grade arbutin, retinol, and non-hydroquinone brighteners to suppress excess melanin.',
    recommendedBrand: 'ZO Skin Health & Obagi'
  }
];
