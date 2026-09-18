'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';
import { generateOrderNumber, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingCost, total, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'express', // express | priority
    paymentMethod: 'card', // card | applepay | cod
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian-950 py-32 text-center text-white space-y-4">
        <ShoppingBag className="w-12 h-12 text-amber-500/40 mx-auto" />
        <h2 className="font-serif text-2xl font-bold">Your Bag Is Empty</h2>
        <p className="text-xs text-zinc-400">Please add timepieces to your cart before proceeding to checkout.</p>
        <Button variant="gold" size="md" onClick={() => router.push('/shop')}>
          Return To Shop
        </Button>
      </div>
    );
  }

  const fillDemoAddress = () => {
    setFormData((prev) => ({
      ...prev,
      email: 'alexander.sterling@example.com',
      fullName: 'Alexander Sterling',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Fifth Avenue Suite 1200',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderId = generateOrderNumber();

    const orderDetails = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      shippingMethod: {
        id: formData.shippingMethod,
        name: formData.shippingMethod === 'express' ? 'Complimentary Insured Express' : 'Priority Air Courier',
        price: shippingCost,
        estimatedDays: formData.shippingMethod === 'express' ? '2-3 Business Days' : '1 Business Day',
      },
      paymentMethod: formData.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Apple Pay',
      subtotal,
      discount: discountAmount,
      shippingFee: shippingCost,
      tax: Math.round(subtotal * 0.05),
      total: total + Math.round(subtotal * 0.05),
      status: 'confirmed' as const,
    };

    await createOrder(orderDetails);
    clearCart();
    setLoading(false);
    router.push(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-amber-200">
            WATCHES WORLD
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted SSL Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Checkout Form Steps */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            {/* Quick Demo Autofill Banner */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
              <span className="text-amber-200">Test Drive Checkout with 1-Click Sample Data:</span>
              <button
                type="button"
                onClick={fillDemoAddress}
                className="bg-amber-500 text-black px-3 py-1 rounded font-bold hover:bg-amber-400 uppercase tracking-wider"
              >
                Autofill Demo Address
              </button>
            </div>

            {/* Step 1: Contact Information */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">1</span>
                <span>Contact & Shipping Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Alexander Sterling"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@example.com"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="742 Evergreen Terrace, Suite 100"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="10001"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">2</span>
                <span>Insured Global Shipping Method</span>
              </h3>

              <div className="space-y-3 text-xs">
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.shippingMethod === 'express'
                    ? 'border-amber-400 bg-amber-500/10'
                    : 'border-zinc-800 bg-obsidian-950'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                        className="accent-amber-500"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">Complimentary Express Insured Courier</div>
                        <p className="text-zinc-400 text-[11px] mt-0.5">2-3 Business Days • Full Value Transit Insurance</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-400 text-sm">FREE</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">3</span>
                <span>Payment Method</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 p-3 bg-obsidian-950 border border-zinc-800 rounded-xl">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white">Credit / Debit Card (Simulated Direct Checkout)</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-zinc-300 font-semibold mb-1">Card Number</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardNumber}
                      className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white text-sm font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Expiration</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardExpiry}
                      className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">CVC Code</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardCvc}
                      className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              variant="gold"
              size="lg"
              className="w-full py-4 text-base flex items-center justify-center gap-2 shadow-2xl"
              isLoading={loading}
              type="submit"
            >
              <span>Place Order ({formatPrice(total + Math.round(subtotal * 0.05))})</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-amber-500/20 rounded-2xl p-6 space-y-6 sticky top-28">
            <h3 className="font-serif font-bold text-lg text-amber-200 border-b border-white/10 pb-4">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h3>

            {/* Cart Items Summary */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-white/5">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg bg-obsidian-950 border border-zinc-800 overflow-hidden shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{item.product.name}</h5>
                    <p className="text-[10px] text-zinc-400">Qty: {item.quantity} • {item.product.brand}</p>
                    {item.engravingText && (
                      <span className="text-[10px] text-amber-400 block font-mono">
                        Engraving: "{item.engravingText}"
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-amber-300">
                    {formatPrice((item.product.price + (item.engravingText ? 25 : 0)) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4 text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (5%)</span>
                <span>{formatPrice(Math.round(subtotal * 0.05))}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-white border-t border-white/10 pt-3">
                <span>Total Amount</span>
                <span className="text-amber-300">{formatPrice(total + Math.round(subtotal * 0.05))}</span>
              </div>
            </div>

            <div className="bg-obsidian-950/80 p-4 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Watches World Quality Promise</span>
              </div>
              <p>Every timepiece is tested for rate accuracy and water resistance before being sealed in our signature luxury presentation box.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
