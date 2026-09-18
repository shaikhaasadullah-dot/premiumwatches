'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Watch, ShieldCheck, Truck, RefreshCw, Award, Send, CheckCircle2 } from 'lucide-react';
import { AGE_GROUPS } from '@/lib/data';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-obsidian-950 text-zinc-400 border-t border-amber-500/20 pt-16 pb-8">
      {/* Guarantees Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-zinc-900/60 border border-amber-500/20 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">Free Express Delivery</h5>
              <p className="text-xs text-zinc-400 mt-0.5">Complimentary insured global shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">5-Year Warranty</h5>
              <p className="text-xs text-zinc-400 mt-0.5">Full international mechanical guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">100% Certified</h5>
              <p className="text-xs text-zinc-400 mt-0.5">Authenticity verified horology</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">30-Day Returns</h5>
              <p className="text-xs text-zinc-400 mt-0.5">Hassle-free worldwide exchange</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Watch className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-widest text-amber-200">
              WATCHES WORLD
            </span>
          </Link>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            Curating fine horology for watch enthusiasts aged 15 to 60+. From urban cyber-digitals and automatic skeleton movements to flying tourbillons, we celebrate craftsmanship across generations.
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <h6 className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-2">
              Join The Collectors Club (10% Off)
            </h6>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Check your inbox for code <strong>WELCOME10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 flex-1"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Collections
          </h5>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/shop" className="hover:text-amber-400 transition-colors">All Timepieces</Link></li>
            <li><Link href="/shop?category=Skeleton" className="hover:text-amber-400 transition-colors">Skeleton Automatic</Link></li>
            <li><Link href="/shop?category=Dive" className="hover:text-amber-400 transition-colors">Deep Water Diver</Link></li>
            <li><Link href="/shop?category=Luxury" className="hover:text-amber-400 transition-colors">Flying Tourbillon</Link></li>
            <li><Link href="/shop?category=Chronograph" className="hover:text-amber-400 transition-colors">Racing Chronograph</Link></li>
            <li><Link href="/shop?category=Minimalist" className="hover:text-amber-400 transition-colors">Titanium Minimalist</Link></li>
          </ul>
        </div>

        {/* Curations by Age */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            By Age Group
          </h5>
          <ul className="space-y-2.5 text-xs">
            {AGE_GROUPS.map((group) => (
              <li key={group.id}>
                <Link
                  href={`/shop?ageGroup=${group.id}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>{group.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/watch-finder" className="text-amber-400 font-semibold hover:underline">
                Interactive Watch Finder →
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Customer Care
          </h5>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">Craftsmanship & Story</Link></li>
            <li><Link href="/checkout" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
            <li><a href="mailto:support@watchesworld.com" className="hover:text-amber-400 transition-colors">Concierge Support</a></li>
            <li><span className="text-zinc-500">24/7 Global Live Chat</span></li>
            <li><span className="text-zinc-500">Geneva, Switzerland & NYC</span></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Supabase badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
        <div>
          © {new Date().getFullYear()} WATCHES WORLD. Powered by Supabase & Next.js. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            Supabase DB Connected
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            Vercel & Netlify Ready
          </span>
        </div>
      </div>
    </footer>
  );
};
