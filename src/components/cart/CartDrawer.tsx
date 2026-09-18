'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    shippingCost,
    freeShippingThreshold,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) setPromoInput('');
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-amber-500/20 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold uppercase tracking-wider font-serif text-amber-100">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-gradient-to-r from-amber-950/40 to-obsidian-900 border-b border-amber-500/10 p-4">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              {amountNeededForFreeShipping > 0 ? (
                <span className="text-zinc-300">
                  Add <strong className="text-amber-400">{formatPrice(amountNeededForFreeShipping)}</strong> more for <span className="text-emerald-400 font-bold">FREE Express Shipping</span>
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> You unlocked FREE Express Shipping!
                </span>
              )}
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-zinc-200">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Explore our luxury watch collections curated for all generations and find your signature timepiece.
                </p>
                <div className="pt-2">
                  <Button variant="gold" size="md" onClick={closeCart}>
                    <Link href="/shop">Browse Collections</Link>
                  </Button>
                </div>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor || idx}`} className="pt-4 first:pt-0 flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg bg-obsidian-900 border border-zinc-800 overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          {item.product.brand}
                        </span>
                        <h4 className="text-sm font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <p className="text-[11px] text-zinc-400">Color: {item.selectedColor}</p>
                    )}

                    {item.engravingText && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Engraving: "{item.engravingText}" (+ $25)</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-zinc-700 rounded bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-amber-300">
                        {formatPrice((item.product.price + (item.engravingText ? 25 : 0)) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-obsidian-900/80 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (WELCOME10)"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded pl-9 pr-3 py-1.5 text-xs uppercase placeholder:normal-case text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <Button variant="outline" size="sm" type="submit">
                    Apply
                  </Button>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded text-amber-300">
                    <span>Applied: <strong>{appliedPromo}</strong></span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-zinc-400 hover:text-white underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.success ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-300 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Insured Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-white border-t border-white/10 pt-2">
                  <span>Estimated Total</span>
                  <span className="text-amber-300">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2 pt-2">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button variant="gold" size="lg" className="w-full flex items-center justify-center gap-2">
                    <span>Proceed To Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <p className="text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit Encrypted Checkout • 5-Year Warranty</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
