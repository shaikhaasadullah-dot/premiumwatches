'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AGE_GROUPS } from '@/lib/data';

export const AgeCuration: React.FC = () => {
  return (
    <section className="py-20 bg-obsidian-950 border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Demographic Curations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Timepieces For Every Stage Of Life
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Whether you are 18 stepping into streetwear, 30 conquering the boardroom, or 50 appreciating rare horology complications — find your perfect match.
          </p>
        </div>

        {/* 3 Demographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGE_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={`/shop?ageGroup=${group.id}`}
              className="group relative rounded-2xl overflow-hidden bg-obsidian-900 border border-zinc-800 hover:border-amber-500/50 shadow-2xl transition-all duration-500 flex flex-col justify-end min-h-[420px] p-6"
            >
              {/* Background Image */}
              <Image
                src={group.bgImage}
                alt={group.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-50"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-transparent z-10" />

              {/* Card Content */}
              <div className="relative z-20 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">
                  {group.badge}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {group.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {group.subtitle}
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-amber-400 uppercase tracking-wider gap-2 group-hover:translate-x-1 transition-transform">
                  <span>Explore Curation</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
