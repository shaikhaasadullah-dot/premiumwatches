'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, Truck, ShieldCheck, Printer, ArrowRight, Clock } from 'lucide-react';
import { getOrderById } from '@/lib/api';
import { OrderDetails } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Confetti effect
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F7E7CE', '#ffffff', '#FFD700'],
      });
    } catch (e) {
      console.log('Confetti trigger error:', e);
    }

    if (orderId) {
      const found = getOrderById(orderId);
      setOrder(found);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Banner */}
        <div className="text-center space-y-4 bg-gradient-to-b from-amber-500/10 via-zinc-900/60 to-obsidian-950 p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/20 border border-amber-400 rounded-full flex items-center justify-center text-amber-400 mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest block">
            Payment & Order Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
            Order <strong className="text-amber-300 font-mono">{orderId}</strong> has been registered. A confirmation email and tracking link have been dispatched to your email.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </Button>
            <Link href="/shop">
              <Button variant="gold" size="sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
          <h3 className="text-xs uppercase font-bold text-amber-400 tracking-widest">
            Fulfillment Progress Tracker
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase font-bold">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-amber-300 block">Order Placed</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-zinc-300 block">72H Precision QC</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-600 flex items-center justify-center mx-auto">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-zinc-500 block">Express Transit</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-600 flex items-center justify-center mx-auto">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-zinc-500 block">Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Items Purchased */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <h4 className="font-serif font-bold text-base text-amber-200 border-b border-white/10 pb-3">
                Items In Order
              </h4>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded bg-obsidian-950 border border-zinc-800 overflow-hidden shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <h5 className="font-bold text-white truncate">{item.product.name}</h5>
                      <span className="text-zinc-400 text-[10px]">
                        Qty: {item.quantity} • {item.product.brand}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-300">
                      {formatPrice((item.product.price + (item.engravingText ? 25 : 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 space-y-1 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm border-t border-white/10 pt-2">
                  <span>Total Paid</span>
                  <span className="text-amber-300">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Customer Details */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4 text-xs">
              <h4 className="font-serif font-bold text-base text-amber-200 border-b border-white/10 pb-3">
                Delivery Address & Info
              </h4>
              <div className="space-y-2 text-zinc-300">
                <p><strong className="text-white">Customer:</strong> {order.customer.fullName}</p>
                <p><strong className="text-white">Email:</strong> {order.customer.email}</p>
                <p><strong className="text-white">Phone:</strong> {order.customer.phone}</p>
                <p><strong className="text-white">Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.postalCode}, {order.customer.country}</p>
                <p><strong className="text-white">Shipping Method:</strong> {order.shippingMethod.name}</p>
                <p><strong className="text-white">Payment Method:</strong> {order.paymentMethod}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-zinc-400 text-xs py-8">
            Order summary details loaded from local store.
          </div>
        )}
      </div>
    </div>
  );
}
