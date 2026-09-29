import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundScene from '@/components/BackgroundScene';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'DailyPlanner – AI-Powered Smart Daily Scheduling App',
  description:
    'DailyPlanner - AI-powered daily planning app that automatically builds personalized schedules, blocks distractions, and helps you focus on what truly matters. 100% Free.',
  metadataBase: new URL('https://dailyplanner.app'),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    title: 'DailyPlanner – AI-Powered Smart Daily Scheduling App',
    description:
      'AI-powered daily planning app that automatically builds personalized schedules, blocks distractions, and helps you focus on what truly matters. 100% Free.',
    url: 'https://dailyplanner.app',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyPlanner – AI-Powered Smart Daily Scheduling App',
    description:
      'AI-powered daily planning app that automatically builds personalized schedules. 100% Free.',
    images: ['/logo.png'],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'DailyPlanner',
              operatingSystem: 'ANDROID, IOS',
              applicationCategory: 'ProductivityApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body id="top">
        <SmoothScroll>
          <div className="noise-overlay" aria-hidden="true" />
          <BackgroundScene />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
