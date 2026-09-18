'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Watch,
  Sparkles,
  ChevronDown,
  User,
  Sliders
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSearch } from '@/context/SearchContext';
import { AGE_GROUPS } from '@/lib/data';

export const Header: React.FC = () => {
  const [isScrolled, setIsLoadedScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ageMenuOpen, setAgeMenuOpen] = useState(false);
  const pathname = usePathname();

  const { openCart, cartCount } = useCart();
  const { openWishlist, wishlistCount } = useWishlist();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsLoadedScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-obsidian-950 via-zinc-900 to-obsidian-950 border-b border-amber-500/20 py-2 text-center text-xs text-amber-200/90 font-medium tracking-wider flex items-center justify-center gap-2 px-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>COMPLIMENTARY GLOBAL EXPRESS SHIPPING ON ORDERS OVER $500</span>
        <span className="hidden sm:inline-block text-amber-500/40">|</span>
        <span className="hidden sm:inline-block text-zinc-400">USE CODE <strong className="text-amber-400 font-semibold">WELCOME10</strong> FOR 10% OFF</span>
      </div>

      {/* Main Glass Header */}
      <div
        className={`w-full transition-all duration-300 backdrop-blur-md border-b ${
          isScrolled
            ? 'bg-obsidian-950/90 border-amber-500/20 shadow-2xl shadow-black/80 py-3'
            : 'bg-obsidian-950/70 border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-zinc-300">
            <Link
              href="/shop"
              className={`hover:text-amber-400 transition-colors ${
                pathname === '/shop' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Shop All
            </Link>

            {/* Age Dropdown */}
            <div
              className="relative group py-2 cursor-pointer"
              onMouseEnter={() => setAgeMenuOpen(true)}
              onMouseLeave={() => setAgeMenuOpen(false)}
            >
              <div className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                <span>By Age</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:rotate-180" />
              </div>

              {ageMenuOpen && (
                <div className="absolute top-full left-0 w-72 bg-obsidian-900 border border-amber-500/30 rounded-lg shadow-2xl p-3 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-widest mb-2 px-3 pt-1">
                    Curated For Generations
                  </div>
                  {AGE_GROUPS.map((group) => (
                    <Link
                      key={group.id}
                      href={`/shop?ageGroup=${group.id}`}
                      className="block p-3 rounded-md hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20 group/item"
                    >
                      <div className="text-xs font-semibold text-white group-hover/item:text-amber-300 flex items-center justify-between">
                        <span>{group.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 normal-case mt-0.5 font-normal line-clamp-1">
                        {group.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/watch-finder"
              className={`hover:text-amber-400 transition-colors flex items-center gap-1.5 ${
                pathname === '/watch-finder' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Watch Finder</span>
            </Link>

            <Link
              href="/about"
              className={`hover:text-amber-400 transition-colors ${
                pathname === '/about' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Craftsmanship
            </Link>
          </nav>

          {/* Logo Center */}
          <Link href="/" className="flex items-center gap-2 group text-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
                <Watch className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-serif text-lg sm:text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 block leading-tight">
                WATCHES WORLD
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 block -mt-1 font-sans">
                Haute Horlogerie
              </span>
            </div>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 text-zinc-300">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-white/5 hover:text-amber-400 transition-all cursor-pointer"
              title="Search Watches"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              className="relative p-2 rounded-full hover:bg-white/5 hover:text-amber-400 transition-all cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-obsidian-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-2 group"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider pr-1">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-black font-extrabold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-950/95 backdrop-blur-2xl border-b border-amber-500/20 p-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4 text-sm font-medium uppercase tracking-wider text-zinc-200">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg hover:bg-white/5 hover:text-amber-400 border-b border-white/5"
            >
              Shop All Watches
            </Link>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3">
                Collections By Age
              </div>
              {AGE_GROUPS.map((group) => (
                <Link
                  key={group.id}
                  href={`/shop?ageGroup=${group.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-amber-500/30"
                >
                  <div className="text-xs font-bold text-amber-200">{group.title}</div>
                  <div className="text-[11px] text-zinc-400 normal-case mt-0.5">{group.subtitle}</div>
                </Link>
              ))}
            </div>

            <Link
              href="/watch-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg hover:bg-white/5 hover:text-amber-400 flex items-center gap-2 border-b border-white/5"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Interactive Watch Finder</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg hover:bg-white/5 hover:text-amber-400"
            >
              Craftsmanship & Heritage
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
