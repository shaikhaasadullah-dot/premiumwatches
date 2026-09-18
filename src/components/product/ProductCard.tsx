'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isLiked = isInWishlist(product.id);
  const discountPct = calculateDiscount(product.price, product.originalPrice);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative bg-obsidian-900/60 border border-zinc-800/80 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-obsidian-950 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges Floating */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && <Badge variant="gold">Best Seller</Badge>}
          {product.isNewArrival && <Badge variant="new">New</Badge>}
          {discountPct > 0 && <Badge variant="sale">-{discountPct}% OFF</Badge>}
        </div>

        {/* Wishlist Button top-right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all ${
            isLiked
              ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-lg'
              : 'bg-obsidian-950/60 border-white/10 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Quick Action Overlay (Slide-up on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Cart</span>
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="bg-obsidian-950/90 hover:bg-obsidian-900 text-white p-2.5 rounded-lg border border-zinc-700 hover:border-amber-400 transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-amber-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-400 mb-1 font-semibold">
            <span className="text-amber-400 font-bold">{product.brand}</span>
            <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700/50">
              Age {product.ageGroup}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <div className="border-t border-white/5 pt-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-amber-300">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs line-through text-zinc-500">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{product.movement}</p>
          </div>

          <Rating rating={product.rating} showCount count={product.reviewCount} size="sm" />
        </div>
      </div>
    </div>
  );
};
