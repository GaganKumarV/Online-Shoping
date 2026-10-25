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
    default: 'GDG.com – Curated Books & Electronics Store',
    template: '%s | GDG.com',
  },
  description:
    'Discover premier software engineering books and curated developer tech gear with fast India-wide shipping and secure payments.',
  keywords: ['books', 'electronics', 'software engineering', 'tech gear', 'gadgets', 'india shopping'],
  authors: [{ name: 'GDG.com' }],
  openGraph: {
    title: 'GDG.com – Curated Books & Electronics',
    description: 'Premier software books and developer hardware delivered to your doorstep.',
    url: 'https://gdg.com',
    siteName: 'GDG.com',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG.com – Books & Electronics',
    description: 'Premier software books and developer hardware.',
  },
};

export const viewport: Viewport = {
  themeColor: '#4f46e5',
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
      <body className="flex min-h-screen flex-col bg-slate-50/50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
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
