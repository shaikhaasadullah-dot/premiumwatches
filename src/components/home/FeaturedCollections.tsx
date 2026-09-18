'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Button } from '@/components/ui/Button';

export const FeaturedCollections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'bestseller' | 'skeleton'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
    }
    load();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.featured;
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'skeleton') return p.category === 'Skeleton' || p.category === 'Luxury';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Timepieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Featured Flagship Series
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Flagships' },
              { id: 'featured', label: 'Featured Choice' },
              { id: 'bestseller', label: 'Best Sellers' },
              { id: 'skeleton', label: 'Skeleton & Luxury' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
              <span>View All 12 Timepieces in Catalog</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
