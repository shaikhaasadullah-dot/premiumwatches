'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Heart, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.variants?.[0]?.colorName
  );
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [showEngraving, setShowEngraving] = useState(false);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/80 text-zinc-400 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Left */}
        <div className="p-6 bg-obsidian-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative aspect-square rounded-xl bg-obsidian-900 border border-zinc-800 overflow-hidden mb-4">
            <Image
              src={product.images[selectedImg] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 justify-center">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`relative w-14 h-14 rounded-lg border overflow-hidden transition-all ${
                  selectedImg === idx ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-zinc-800 opacity-60'
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details Right */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                {product.brand}
              </span>
              <Badge variant="gold">Target Age: {product.ageGroup}</Badge>
            </div>

            <h3 className="text-xl font-serif font-extrabold text-white">{product.name}</h3>
            <p className="text-xs text-zinc-400">{product.subtitle}</p>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-amber-300">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm line-through text-zinc-500">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <Rating rating={product.rating} showCount count={product.reviewCount} />

            <p className="text-xs text-zinc-300 leading-relaxed border-t border-b border-white/5 py-3">
              {product.description}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
              <div><strong className="text-zinc-200">Movement:</strong> {product.movement}</div>
              <div><strong className="text-zinc-200">Water Resistance:</strong> {product.specs.waterResistance}</div>
              <div><strong className="text-zinc-200">Glass:</strong> {product.specs.glass}</div>
              <div><strong className="text-zinc-200">Case Diameter:</strong> {product.specs.caseDiameter}</div>
            </div>

            {/* Custom Engraving Option */}
            <div>
              <button
                type="button"
                onClick={() => setShowEngraving(!showEngraving)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showEngraving ? 'Cancel Custom Engraving' : '+ Add Backplate Engraving ($25)'}</span>
              </button>

              {showEngraving && (
                <div className="mt-2 space-y-1">
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    maxLength={25}
                    placeholder="e.g., Alex & Sarah 2026"
                    className="w-full bg-zinc-900 border border-amber-500/40 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[10px] text-zinc-400">Max 25 characters engraved on backplate.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex gap-2">
              <Button
                variant="gold"
                size="md"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => {
                  addToCart(product, quantity, selectedColor, engravingText.trim() || undefined);
                  onClose();
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </Button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded border transition-colors ${
                  isLiked
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs text-zinc-400 hover:text-amber-400 underline font-medium"
            >
              View Full Timepiece Details & Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
