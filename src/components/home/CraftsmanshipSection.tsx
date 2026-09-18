'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Cpu, Layers, Droplets, Gem } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-20 bg-obsidian-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Swiss & Japanese Engineering Standard
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Uncompromising Standards In Every Component
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              We source only marine-grade 316L surgical stainless steel, scratchproof synthetic sapphire crystal glass, and self-winding automatic mechanical movements calibrated to +/- 5 seconds per day.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Cpu className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Automatic Mechanics</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Self-winding rotors with 42+ hour dark reserve.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Gem className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Sapphire Glass</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Mohs hardness level 9 anti-reflective crystal.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Droplets className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">300M Pressure Tested</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">O-ring gasket seals & helium valve protection.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Layers className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Italian Leather</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Hand-stitched full grain alligator leather.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Breakdown */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
                alt="Watch movement craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs uppercase font-extrabold text-amber-400">Master Horologist Inspection</div>
                <h4 className="text-lg font-serif font-bold">Every piece undergoes 72 hours of timing precision testing before dispatch.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
