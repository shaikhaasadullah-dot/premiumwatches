'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-amber-500/20 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/60">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-base font-bold uppercase tracking-wider font-serif text-amber-100">
                Saved Timepieces ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-zinc-200">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Save your favorite watches by tapping the heart icon on any timepiece.
                </p>
                <Button variant="gold" size="md" onClick={closeWishlist}>
                  <Link href="/shop">Explore Watches</Link>
                </Button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:border-amber-500/30 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg bg-obsidian-950 border border-zinc-800 overflow-hidden shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase font-bold text-amber-400">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeWishlist}
                        className="text-xs font-semibold text-white truncate block hover:text-amber-300"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs font-bold text-amber-300 block mt-0.5">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="gold"
                        size="sm"
                        className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px]"
                        onClick={() => {
                          addToCart(product);
                          closeWishlist();
                        }}
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move To Cart</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
