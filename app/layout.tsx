import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { defaultMetadata, generateJsonLd } from '@/lib/seo'
import { ChatBot } from '@/components/ChatBot'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Workflix - Harishraj Udaya Bhaskar Portfolio',
    template: '%s | Workflix'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = generateJsonLd();
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b0b0f" />
        
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
