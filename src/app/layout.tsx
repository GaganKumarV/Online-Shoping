import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Toast } from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Mati Living – Handcrafted Home Decor & Artisan Living',
    template: '%s | Mati Living',
  },
  description:
    'Thoughtfully curated handmade home decor crafted by regional Indian artisans. Earthen ceramics, handwoven textiles, ambient lighting, and warm tactile accents.',
  keywords: ['handmade home decor', 'ceramics', 'textiles', 'handcrafted lighting', 'indian artisans', 'mati living', 'terracotta'],
  authors: [{ name: 'Mati Living' }],
  openGraph: {
    title: 'Mati Living – Handcrafted Home Decor',
    description: 'Warm, minimal, and authentic artisan decor delivered across India.',
    url: 'https://matiliving.com',
    siteName: 'Mati Living',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mati Living – Handcrafted Home Decor',
    description: 'Warm, minimal, and authentic artisan decor.',
  },
};

export const viewport: Viewport = {
  themeColor: '#78350f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-[#faf8f5] font-sans text-stone-900 antialiased selection:bg-amber-900/10 selection:text-amber-950">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
