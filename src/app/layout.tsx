import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SearchProvider } from '@/context/SearchContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { SearchModal } from '@/components/layout/SearchModal';

export const metadata: Metadata = {
  title: 'Watches World | Haute Horlogerie For All Generations (Ages 15-60+)',
  description:
    'Discover luxury watches curated across age demographics. From cyber-digitals and skeleton automatic mechanicals to flying tourbillons. Powered by Supabase.',
  keywords: [
    'luxury watches',
    'watches world',
    'skeleton watches',
    'automatic watch',
    'tourbillon',
    'diver watch',
    'watches for gen z',
    'executive watches',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian-950 text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <CartDrawer />
              <WishlistDrawer />
              <SearchModal />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
