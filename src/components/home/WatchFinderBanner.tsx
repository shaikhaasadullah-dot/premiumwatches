'use client';

import React from 'react';
import Link from 'next/link';
import { Sliders, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const WatchFinderBanner: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-obsidian-950 via-zinc-900 to-obsidian-950 border-t border-b border-amber-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>AI Horological Style Finder</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Unsure Which Watch Matches Your Age & Style?
          </h2>

          <p className="text-zinc-300 text-sm leading-relaxed">
            Take our 60-second interactive style quiz. Answer 3 quick questions about your age group, occasion, and preferred movement to unlock personalized timepieces curated just for you.
          </p>
        </div>

        <div className="shrink-0">
          <Link href="/watch-finder">
            <Button variant="gold" size="lg" className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-black" />
              <span>Start Watch Finder Quiz</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
