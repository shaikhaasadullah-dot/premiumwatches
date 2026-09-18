import { supabase } from './supabase';
import { DEMO_PRODUCTS, DEMO_REVIEWS } from './data';
import { Product, ProductReview, OrderDetails, FilterState } from './types';

export async function getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data && data.length > 0) {
      // Map DB snake_case columns to TS camelCase if fetched from DB
      let mappedProducts: Product[] = data.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        name: item.name,
        subtitle: item.subtitle,
        brand: item.brand,
        price: Number(item.price),
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        rating: Number(item.rating),
        reviewCount: item.review_count,
        images: item.images,
        category: item.category,
        ageGroup: item.age_group,
        movement: item.movement,
        strapMaterial: item.strap_material,
        inStock: item.in_stock,
        stockQuantity: item.stock_quantity,
        featured: item.featured,
        isNewArrival: item.is_new_arrival,
        isBestSeller: item.is_best_seller,
        description: item.description,
        longDescription: item.long_description,
        highlights: item.highlights || [],
        specs: item.specs,
      }));
      return filterProductsList(mappedProducts, filters);
    }
  } catch (err) {
    console.warn('Supabase query failed or offline, using fallback products:', err);
  }

  // Fallback to DEMO_PRODUCTS
  return filterProductsList(DEMO_PRODUCTS, filters);
}

export async function getProductBySlugOrId(idOrSlug: string): Promise<Product | null> {
  const allProducts = await getProducts();
  const found = allProducts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return found || null;
}

export async function getReviewsForProduct(productId: string): Promise<ProductReview[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        author: item.author,
        age: item.age,
        rating: Number(item.rating),
        date: item.date,
        title: item.title,
        content: item.content,
        verifiedPurchase: item.verified_purchase,
        userLocation: item.user_location,
        avatar: item.avatar,
      }));
    }
  } catch (err) {
    console.warn('Supabase reviews query failed, returning fallback reviews:', err);
  }

  // Local fallback
  const localAdded = getStoredReviews();
  const combined = [...DEMO_REVIEWS, ...localAdded];
  return combined.filter((r) => r.productId === productId);
}

export async function addReview(review: Omit<ProductReview, 'id' | 'date'>): Promise<ProductReview> {
  const newReview: ProductReview = {
    ...review,
    id: 'rev-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
  };

  try {
    await supabase.from('reviews').insert([
      {
        product_id: review.productId,
        author: review.author,
        age: review.age,
        rating: review.rating,
        date: newReview.date,
        title: review.title,
        content: review.content,
        verified_purchase: review.verifiedPurchase,
        user_location: review.userLocation,
      },
    ]);
  } catch (e) {
    console.warn('Supabase review insert failed, saving locally:', e);
  }

  saveReviewLocally(newReview);
  return newReview;
}

export async function createOrder(orderDetails: OrderDetails): Promise<boolean> {
  try {
    await supabase.from('orders').insert([
      {
        id: orderDetails.id,
        customer_info: orderDetails.customer,
        shipping_method: orderDetails.shippingMethod,
        payment_method: orderDetails.paymentMethod,
        items: orderDetails.items,
        subtotal: orderDetails.subtotal,
        discount: orderDetails.discount,
        shipping_fee: orderDetails.shippingFee,
        tax: orderDetails.tax,
        total: orderDetails.total,
        status: orderDetails.status,
      },
    ]);
  } catch (e) {
    console.warn('Supabase order insert failed, order saved locally:', e);
  }

  // Always save in localStorage for instant order tracking
  if (typeof window !== 'undefined') {
    const existingOrders = JSON.parse(localStorage.getItem('ww_orders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('ww_orders', JSON.stringify(existingOrders));
  }

  return true;
}

export function getOrderById(id: string): OrderDetails | null {
  if (typeof window === 'undefined') return null;
  const existingOrders: OrderDetails[] = JSON.parse(localStorage.getItem('ww_orders') || '[]');
  return existingOrders.find((o) => o.id === id) || null;
}

// Helper: Filter Products
function filterProductsList(products: Product[], filters?: Partial<FilterState>): Product[] {
  if (!filters) return products;

  return products.filter((p) => {
    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchDesc && !matchCat) return false;
    }

    // Category
    if (filters.category && filters.category !== 'all') {
      if (p.category !== filters.category) return false;
    }

    // Age Group
    if (filters.ageGroup && filters.ageGroup !== 'all') {
      if (p.ageGroup !== 'all' && p.ageGroup !== filters.ageGroup) return false;
    }

    // Brand
    if (filters.brand && filters.brand !== 'all') {
      if (p.brand !== filters.brand) return false;
    }

    // Movement
    if (filters.movement && filters.movement !== 'all') {
      if (p.movement !== filters.movement) return false;
    }

    // Strap Material
    if (filters.strapMaterial && filters.strapMaterial !== 'all') {
      if (p.strapMaterial !== filters.strapMaterial) return false;
    }

    // Price range
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;

    // Stock
    if (filters.inStockOnly && !p.inStock) return false;

    // On Sale
    if (filters.onSaleOnly && (!p.originalPrice || p.originalPrice <= p.price)) return false;

    return true;
  }).sort((a, b) => {
    if (!filters.sortBy || filters.sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return 0;
  });
}

function getStoredReviews(): ProductReview[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('ww_local_reviews') || '[]');
  } catch {
    return [];
  }
}

function saveReviewLocally(review: ProductReview) {
  if (typeof window === 'undefined') return;
  const current = getStoredReviews();
  current.push(review);
  localStorage.setItem('ww_local_reviews', JSON.stringify(current));
}
