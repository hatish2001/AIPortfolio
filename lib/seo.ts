import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://workflix.example.com'),
  title: {
    default: 'Workflix - Harishraj Udaya Bhaskar\'s Portfolio',
    template: '%s | Workflix'
  },
  description: 'AI engineer building intelligent systems that outsmart regulators, slash costs, and transform customer experiences.',
  keywords: ['AI engineer', 'machine learning', 'LLM', 'RAG', 'multi-agent systems', 'Harishraj Udaya Bhaskar', 'portfolio'],
  authors: [{ name: 'Harishraj Udaya Bhaskar' }],
  creator: 'Harishraj Udaya Bhaskar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://workflix.example.com',
    title: 'Workflix - Harishraj Udaya Bhaskar\'s Portfolio',
    description: 'AI engineer building intelligent systems that outsmart regulators, slash costs, and transform customer experiences.',
    siteName: 'Workflix',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Workflix Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflix - Harishraj Udaya Bhaskar\'s Portfolio',
    description: 'AI engineer building intelligent systems that outsmart regulators, slash costs, and transform customer experiences.',
    creator: '@uharishraj',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Harishraj Udaya Bhaskar',
    url: 'https://workflix.example.com',
    image: 'https://workflix.example.com/images/me.jpg',
    sameAs: [
      'https://github.com/hatish2001',
      'https://linkedin.com/in/uharishraj',
    ],
    jobTitle: 'AI Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'CustomStacks',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Northeastern University',
    },
    description: 'AI engineer building intelligent systems that outsmart regulators, slash costs, and transform customer experiences.',
  };
}
