'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-obsidian-950 overflow-hidden py-12 lg:py-0">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Overlay pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Hero Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Horology For Ages 15 to 60+</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Time is ourside <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              across Generations
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-sans">
            From urban cyber-digitals for youth to skeleton automatics and flying tourbillons for seasoned connoisseurs — discover timepieces engineered for every stage of life.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <span>Explore Shop</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/watch-finder" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Find Your Watch (Quiz)</span>
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">10,000+</div>
              <div className="text-[11px] text-zinc-400 uppercase font-medium mt-0.5">Verified Collectors</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">100%</div>
              <div className="text-[11px] text-zinc-400 uppercase font-medium mt-0.5">Authentic Movement</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">5 Years</div>
              <div className="text-[11px] text-zinc-400 uppercase font-medium mt-0.5">Swiss Standard Warranty</div>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-amber-500/20 via-zinc-900 to-obsidian-950 p-[1px] shadow-2xl shadow-amber-500/10">
            <div className="w-full h-full bg-obsidian-900 rounded-[23px] overflow-hidden relative group">
              <Image
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80"
                alt="Grand Sovereign Skeleton Automatic"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-obsidian-950/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl space-y-1">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <span>Featured Masterpiece</span>
                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px]">Grand Sovereign</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">Skeleton Automatic Mechanical</h4>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-zinc-400">18K Rose Gold • Sapphire Glass</span>
                  <span className="text-amber-300 font-extrabold">$1,290</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
