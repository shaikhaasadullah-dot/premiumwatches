'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Cpu, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Watches World Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Connecting Generations Through Fine Horology
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Founded with a singular vision: to create timepieces that transcend age barriers. Whether you are 15 discovering your first mechanical wristwatch or 60+ adding a flying tourbillon to a lifelong collection, Watches World delivers master craftsmanship.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
              alt="Watchmaking Workshop"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-white">
              Every Tick Tells A Life Story
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              We believe a watch is far more than a tool for tracking hours. It is an extension of character, a celebration of personal milestones, and a physical heirloom passed down through families.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Swiss & Japanese Calibers</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">High-frequency mechanical automatic and precision quartz movements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">5-Year Global Guarantee</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Comprehensive mechanical coverage backed by international service centers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-obsidian-950 border border-amber-500/30 text-center space-y-4">
          <h2 className="font-serif text-3xl font-extrabold text-white">Ready To Find Your Signature Timepiece?</h2>
          <p className="text-xs text-zinc-300 max-w-md mx-auto">Explore our curated collections by demographic or browse the entire catalog.</p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/shop">
              <Button variant="gold" size="lg" className="flex items-center gap-2">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
