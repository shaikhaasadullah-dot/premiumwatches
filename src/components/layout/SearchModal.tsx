'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Watch } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setAllProducts(data);
    }
    load();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = allProducts.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.movement.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });
      setResults(filtered);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [searchQuery, allProducts]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={closeSearch} />

      <div className="relative w-full max-w-3xl bg-obsidian-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-6 h-6 text-amber-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search watches by name, brand, category or movement (e.g., Skeleton, Automatic, Diver)..."
            className="w-full bg-transparent text-white text-base sm:text-lg placeholder-zinc-500 focus:outline-none font-sans"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs uppercase font-bold text-zinc-400 hover:text-amber-400 px-3 py-1.5 rounded bg-zinc-800"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-white/5">
          {!searchQuery.trim() ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
                Popular Suggestions
              </div>
              <div className="flex flex-wrap gap-2">
                {['Skeleton Automatic', 'Diver 300M', 'Rose Gold', 'Minimalist', 'Youth Digital', 'Titanium'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-zinc-800/80 text-xs font-medium text-zinc-300 hover:bg-amber-500/20 hover:text-amber-300 border border-zinc-700/50 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : loading ? (
            <div className="py-12 text-center text-zinc-400 text-sm">
              Searching horological archive...
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <Watch className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
              <p className="text-white font-medium">No timepieces matched "{searchQuery}"</p>
              <p className="text-zinc-400 text-xs mt-1">
                Try searching for 'Automatic', 'Chronograph', 'Diver', or 'Skeleton'.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                Found {results.length} Timepiece{results.length > 1 ? 's' : ''}
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-amber-500/20"
                >
                  <div className="relative w-16 h-16 rounded-lg bg-obsidian-950 overflow-hidden shrink-0 border border-zinc-800">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                      {product.brand}
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {product.subtitle} • {product.movement}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-amber-300">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
