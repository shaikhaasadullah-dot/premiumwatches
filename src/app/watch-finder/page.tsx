'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sliders, Sparkles, Compass, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WatchFinderPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    ageGroup: '25-38',
    occasion: 'Professional',
    movement: 'Automatic Mechanical',
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [matches, setMatches] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setAllProducts(data);
    }
    load();
  }, []);

  const calculateMatches = () => {
    let filtered = [...allProducts];

    // Age filter match
    filtered = filtered.filter((p) => p.ageGroup === 'all' || p.ageGroup === answers.ageGroup);

    // Movement filter match if possible
    const movementMatch = filtered.filter((p) => p.movement === answers.movement);

    if (movementMatch.length > 0) {
      setMatches(movementMatch.slice(0, 3));
    } else {
      setMatches(filtered.slice(0, 3));
    }
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Interactive Horology Wizard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Find Your Signature Watch
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Answer 3 quick questions about your demographic, wearing habits, and mechanical preference to unlock tailored timepieces.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="p-8 bg-zinc-900/80 border border-amber-500/30 rounded-3xl shadow-2xl backdrop-blur-md space-y-8">
          {/* Progress Indicator */}
          {step <= 3 && (
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-4">
              <span>Step {step} of 3</span>
              <div className="flex gap-2">
                <span className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                <span className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                <span className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-amber-400' : 'bg-zinc-800'}`} />
              </div>
            </div>
          )}

          {/* Question 1: Age */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-white text-center">
                1. Which age demographic best describes you or the recipient?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: '15-24', title: '15 – 24 Years', desc: 'Youth & Next-Gen streetwear, cyber hybrids & bold minimalists.' },
                  { id: '25-38', title: '25 – 38 Years', desc: 'Career Professionals, skeleton automatics & sports divers.' },
                  { id: '39-60', title: '39 – 60+ Years', desc: 'Executive Connoisseurs, flying tourbillons & perpetual calendars.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, ageGroup: opt.id });
                      setStep(2);
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      answers.ageGroup === opt.id
                        ? 'border-amber-400 bg-amber-500/20 text-white'
                        : 'border-zinc-800 bg-obsidian-950 text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <h4 className="font-bold text-amber-300 text-sm mb-1">{opt.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Occasion */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-white text-center">
                2. What is your primary wearing style or occasion?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Casual', title: 'Urban Casual & Daily Wear', desc: 'Lightweight titanium, silicone or mesh bands.' },
                  { id: 'Professional', title: 'Boardroom & Executive Meetings', desc: 'Steel link chronographs and dress leather.' },
                  { id: 'Sport', title: 'Outdoor Exploration & Diving', desc: '300m water resistance, ceramic bezels.' },
                  { id: 'Luxury', title: 'Gala Events & Fine Horology', desc: 'Rose gold, skeleton mechanicals, flying tourbillons.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, occasion: opt.id });
                      setStep(3);
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      answers.occasion === opt.id
                        ? 'border-amber-400 bg-amber-500/20 text-white'
                        : 'border-zinc-800 bg-obsidian-950 text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <h4 className="font-bold text-amber-300 text-sm mb-1">{opt.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Movement */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-white text-center">
                3. What mechanical caliber do you prefer?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Automatic Mechanical', title: 'Automatic Mechanical (Self-Winding)', desc: 'No battery required. Powered by body wrist movement.' },
                  { id: 'Quartz', title: 'Precision Quartz', desc: 'Swiss accuracy with zero daily time deviation.' },
                  { id: 'Solar Powered', title: 'Solar Powered', desc: 'Infinite solar charging from indoor and outdoor light.' },
                  { id: 'Manual Wind', title: 'Manual Wind Horology', desc: 'Tactile daily winding ritual with exhibition spring gears.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, movement: opt.id });
                      calculateMatches();
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      answers.movement === opt.id
                        ? 'border-amber-400 bg-amber-500/20 text-white'
                        : 'border-zinc-800 bg-obsidian-950 text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <h4 className="font-bold text-amber-300 text-sm mb-1">{opt.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-400 tracking-widest flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 98% Match Rating Calculated
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Your Curated Watch Recommendations
                </h3>
                <p className="text-xs text-zinc-400">
                  Based on your preferences for <strong className="text-amber-300">{answers.ageGroup}</strong> age group and <strong className="text-amber-300">{answers.movement}</strong> movement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {matches.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center pt-4 border-t border-white/10 flex justify-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Quiz</span>
                </Button>
                <Link href="/shop">
                  <Button variant="gold" size="sm">
                    View Entire Shop Catalog
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
