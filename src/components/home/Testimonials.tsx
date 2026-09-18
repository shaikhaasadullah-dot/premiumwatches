'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { DEMO_REVIEWS } from '@/lib/data';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-obsidian-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Real Connoisseur Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Loved By Collectors Aged 15 To 60+
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <h4 className="text-sm font-bold text-white font-serif">{review.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed italic">"{review.content}"</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                {review.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber-500/30">
                    <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{review.author}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">({review.age} yrs)</span>
                    {review.verifiedPurchase && (
                      <span title="Verified Purchase">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400">{review.userLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
