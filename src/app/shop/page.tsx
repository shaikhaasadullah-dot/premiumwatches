'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  Grid2X2,
  Sparkles,
  Watch,
  RotateCcw
} from 'lucide-react';
import { getProducts } from '@/lib/api';
import { Product, FilterState, AgeGroup, Category, MovementType, StrapMaterial } from '@/lib/types';
import { CATEGORIES, AGE_GROUPS, BRANDS } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Button } from '@/components/ui/Button';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Filter state initialized from URL search params
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get('q') || '',
    category: (searchParams.get('category') as Category) || 'all',
    ageGroup: (searchParams.get('ageGroup') as AgeGroup) || 'all',
    brand: searchParams.get('brand') || 'all',
    movement: (searchParams.get('movement') as MovementType) || 'all',
    strapMaterial: (searchParams.get('strapMaterial') as StrapMaterial) || 'all',
    minPrice: 0,
    maxPrice: 6000,
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: 'featured',
  });

  // Sync URL query params with filter state
  useEffect(() => {
    const age = searchParams.get('ageGroup');
    const cat = searchParams.get('category');
    const query = searchParams.get('q');
    if (age || cat || query) {
      setFilters((prev) => ({
        ...prev,
        ageGroup: (age as AgeGroup) || prev.ageGroup,
        category: (cat as Category) || prev.category,
        searchQuery: query || prev.searchQuery,
      }));
    }
  }, [searchParams]);

  // Load products with filters
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProducts(filters);
      setProducts(data);
      setLoading(false);
    }
    load();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      ageGroup: 'all',
      brand: 'all',
      movement: 'all',
      strapMaterial: 'all',
      minPrice: 0,
      maxPrice: 6000,
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: 'featured',
    });
    router.push('/shop');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete Horology Archive</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Fine Watch Collection
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Filter by age group, movement caliber, strap materials, and complication categories to discover your ultimate wristwatch.
          </p>
        </div>

        {/* Top Control Bar (Mobile filter toggle, count, search, sort) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-zinc-900/80 border border-amber-500/20 rounded-2xl mb-8 backdrop-blur-md">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <span className="text-xs text-zinc-300 font-medium">
              Showing <strong className="text-amber-400 font-bold">{products.length}</strong> Timepiece{products.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Search bar inside shop */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Filter by name..."
              className="w-full bg-obsidian-950 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Sort & Grid Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold hidden sm:inline-block">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-obsidian-950 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured Choice</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1 border-l border-white/10 pl-3">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded ${
                  gridCols === 3 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-zinc-500 hover:text-white'
                }`}
                title="3 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded ${
                  gridCols === 4 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-zinc-500 hover:text-white'
                }`}
                title="4 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filter Panel (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-bold text-base text-amber-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filter Catalog</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Age Group Filter */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Target Age Demographic
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Ages (15-60+)' },
                  { id: '15-24', label: 'Youth & Next Gen (15–24)' },
                  { id: '25-38', label: 'Young Professional (25–38)' },
                  { id: '39-60', label: 'Executive & Heritage (39–60+)' },
                ].map((age) => (
                  <button
                    key={age.id}
                    onClick={() => setFilters({ ...filters, ageGroup: age.id as AgeGroup })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      filters.ageGroup === age.id
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <label className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Complication Category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters({ ...filters, category: cat.id as Category })}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      filters.category === cat.id
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <label className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Brand Atelier
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full bg-obsidian-950 border border-zinc-700 text-xs text-white rounded-lg p-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-xs">
                <label className="uppercase font-bold text-amber-400 tracking-wider">
                  Max Price
                </label>
                <span className="font-bold text-amber-300">${filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min={150}
                max={6000}
                step={100}
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-2 border-t border-white/5 pt-4 text-xs text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) => setFilters({ ...filters, onSaleOnly: e.target.checked })}
                  className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-amber-500/50"
                />
                <span>Show On Sale Only</span>
              </label>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="py-24 text-center space-y-3">
                <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full mx-auto" />
                <p className="text-zinc-400 text-xs">Fetching timepieces...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-4 p-8">
                <Watch className="w-12 h-12 text-amber-500/40 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No timepieces match your criteria</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting or resetting your filter preferences to view all available watches.
                </p>
                <Button variant="gold" size="md" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-6`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-obsidian-950 border-l border-amber-500/20 p-6 flex flex-col justify-between overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-bold text-lg text-white">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-amber-400 block mb-2">Age Group</label>
                <select
                  value={filters.ageGroup}
                  onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value as AgeGroup })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 rounded"
                >
                  <option value="all">All Ages (15-60+)</option>
                  <option value="15-24">Youth & Next Gen (15-24)</option>
                  <option value="25-38">Young Professional (25-38)</option>
                  <option value="39-60">Executive & Heritage (39-60+)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as Category })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 rounded"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-2">
              <Button variant="gold" size="md" className="w-full" onClick={() => setMobileFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian-950 py-20 text-center text-white">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
