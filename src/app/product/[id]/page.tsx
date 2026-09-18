'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Star,
  Plus,
  Minus,
  MessageSquare,
  ChevronRight,
  Share2,
  Award
} from 'lucide-react';
import { getProductBySlugOrId, getReviewsForProduct, addReview, getProducts } from '@/lib/api';
import { Product, ProductReview } from '@/lib/types';
import { formatPrice, calculateDiscount, formatDate } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productIdOrSlug = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [showEngraving, setShowEngraving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Review Form state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewAge, setNewReviewAge] = useState<number>(28);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const found = await getProductBySlugOrId(productIdOrSlug);
      if (found) {
        setProduct(found);
        if (found.variants && found.variants.length > 0) {
          setSelectedColor(found.variants[0].colorName);
        }
        const fetchedReviews = await getReviewsForProduct(found.id);
        setReviews(fetchedReviews);

        // Fetch related products
        const all = await getProducts();
        const related = all.filter((p) => p.id !== found.id && (p.category === found.category || p.ageGroup === found.ageGroup)).slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
    loadData();
  }, [productIdOrSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 py-32 text-center text-zinc-400">
        <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs uppercase tracking-wider">Loading Timepiece Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian-950 py-32 text-center space-y-4">
        <h2 className="font-serif text-2xl text-white font-bold">Timepiece Not Found</h2>
        <p className="text-xs text-zinc-400">The watch you requested may have been archived or updated.</p>
        <Button variant="gold" size="md" onClick={() => router.push('/shop')}>
          Return To Shop
        </Button>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const discountPct = calculateDiscount(product.price, product.originalPrice);

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewContent) return;

    setSubmittingReview(true);
    const created = await addReview({
      productId: product.id,
      author: newReviewAuthor,
      age: newReviewAge,
      rating: newReviewRating,
      title: newReviewTitle,
      content: newReviewContent,
      verifiedPurchase: true,
      userLocation: 'Verified Buyer',
    });

    setReviews([created, ...reviews]);
    setSubmittingReview(false);
    setReviewModalOpen(false);
    setNewReviewTitle('');
    setNewReviewContent('');
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/shop" className="hover:text-amber-400">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-amber-300 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Section (Gallery + Purchase Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-obsidian-900 border border-zinc-800 overflow-hidden shadow-2xl">
              <Image
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isBestSeller && <Badge variant="gold">Best Seller</Badge>}
                {discountPct > 0 && <Badge variant="sale">-{discountPct}% OFF</Badge>}
              </div>

              {/* Share link button */}
              <button
                onClick={copyShareLink}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-obsidian-950/70 border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copiedLink && (
                <div className="absolute top-16 right-4 z-10 bg-emerald-500 text-black font-bold text-[10px] px-2.5 py-1 rounded shadow-lg">
                  Link Copied!
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative w-20 h-20 rounded-xl bg-obsidian-900 border overflow-hidden shrink-0 transition-all ${
                    selectedImg === idx
                      ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">
                  {product.brand}
                </span>
                <Badge variant="gold">Ages {product.ageGroup}</Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-zinc-400 font-sans">{product.subtitle}</p>

              {/* Rating header */}
              <div className="flex items-center gap-3 pt-1">
                <Rating rating={product.rating} showCount count={reviews.length} />
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  Read Verified Reviews ({reviews.length})
                </button>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/20 flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-amber-300">
                  {formatPrice(product.price + (engravingText ? 25 : 0))}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm line-through text-zinc-500">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready To Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color / Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 border-t border-white/5 pt-4">
                <label className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                  Select Color Dial: <span className="text-white font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedColor(v.colorName)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        selectedColor === v.colorName
                          ? 'border-amber-400 bg-amber-500/10 text-white'
                          : 'border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: v.hex }} />
                      <span>{v.colorName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Engraving Option */}
            <div className="border-t border-white/5 pt-4 space-y-2">
              <button
                type="button"
                onClick={() => setShowEngraving(!showEngraving)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>{showEngraving ? 'Remove Custom Backplate Engraving' : '+ Add Personalized Engraving ($25)'}</span>
              </button>

              {showEngraving && (
                <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/30">
                  <label className="text-[11px] font-semibold text-zinc-300 block">
                    Custom Message Engraved On Sapphire Backplate:
                  </label>
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    maxLength={25}
                    placeholder="e.g., Happy 30th Birthday David"
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[10px] text-zinc-400">Max 25 characters. Includes precision laser etching.</p>
                </div>
              )}
            </div>

            {/* Quantity + Add To Cart + Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-extrabold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => addToCart(product, quantity, selectedColor, engravingText.trim() || undefined)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add To Bag</span>
                </Button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isLiked
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-amber-400' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  addToCart(product, quantity, selectedColor, engravingText.trim() || undefined);
                  router.push('/checkout');
                }}
              >
                Instant Buy Now
              </Button>
            </div>

            {/* Trust Perks */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Free Insured Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>5-Year International Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>100% Certified Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>30-Day Hassle Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs & Reviews Section */}
        <div className="border-t border-white/10 pt-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 gap-8 text-sm uppercase tracking-wider font-bold mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Description & Highlights
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'specs'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Watch Specifications
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl text-zinc-300 text-sm leading-relaxed">
              <p>{product.longDescription}</p>

              <div>
                <h4 className="text-xs uppercase font-bold text-amber-400 tracking-widest mb-3">
                  Craftsmanship Highlights:
                </h4>
                <ul className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <div className="divide-y divide-white/5 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/60">
                <div className="grid grid-cols-2 p-4 text-xs">
                  <span className="font-bold text-amber-400 uppercase">Case Diameter</span>
                  <span className="text-zinc-200">{product.specs.caseDiameter}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs bg-obsidian-950/40">
                  <span className="font-bold text-amber-400 uppercase">Case Thickness</span>
                  <span className="text-zinc-200">{product.specs.caseThickness}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs">
                  <span className="font-bold text-amber-400 uppercase">Case Material</span>
                  <span className="text-zinc-200">{product.specs.caseMaterial}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs bg-obsidian-950/40">
                  <span className="font-bold text-amber-400 uppercase">Movement Caliber</span>
                  <span className="text-zinc-200">{product.specs.movement}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs">
                  <span className="font-bold text-amber-400 uppercase">Water Resistance</span>
                  <span className="text-zinc-200">{product.specs.waterResistance}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs bg-obsidian-950/40">
                  <span className="font-bold text-amber-400 uppercase">Glass Type</span>
                  <span className="text-zinc-200">{product.specs.glass}</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs">
                  <span className="font-bold text-amber-400 uppercase">Strap Material & Width</span>
                  <span className="text-zinc-200">{product.strapMaterial} ({product.specs.strapWidth})</span>
                </div>
                <div className="grid grid-cols-2 p-4 text-xs bg-obsidian-950/40">
                  <span className="font-bold text-amber-400 uppercase">Warranty</span>
                  <span className="text-zinc-200">{product.specs.warranty}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-serif font-extrabold text-amber-300">
                      {product.rating.toFixed(1)}
                    </span>
                    <div>
                      <Rating rating={product.rating} />
                      <p className="text-xs text-zinc-400 mt-1">Based on {reviews.length} verified owner reviews</p>
                    </div>
                  </div>
                </div>

                <Button variant="gold" size="md" onClick={() => setReviewModalOpen(true)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Write A Review</span>
                </Button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Rating rating={rev.rating} size="sm" />
                        <h5 className="font-serif font-bold text-sm text-white">{rev.title}</h5>
                      </div>
                      <span className="text-[11px] text-zinc-500">{formatDate(rev.date)}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">"{rev.content}"</p>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                      <span className="font-bold text-white">
                        {rev.author} {rev.age ? `(${rev.age} yrs)` : ''}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-16 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-obsidian-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-white">
            <h3 className="font-serif text-xl font-bold text-amber-200">
              Write A Review for {product.name}
            </h3>

            <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. David Vance"
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Your Age</label>
                  <input
                    type="number"
                    required
                    min={15}
                    max={90}
                    value={newReviewAge}
                    onChange={(e) => setNewReviewAge(Number(e.target.value))}
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Star Rating (1-5)</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-obsidian-950 border border-zinc-700 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional skeleton movement craftsmanship"
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Detailed Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="Share your experience regarding weight, finishing, strap quality..."
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="gold" size="md" className="flex-1" isLoading={submittingReview} type="submit">
                  Submit Review
                </Button>
                <Button variant="ghost" size="md" type="button" onClick={() => setReviewModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
