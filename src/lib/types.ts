export type AgeGroup = '15-24' | '25-38' | '39-60' | 'all';

export type Category = 'Dress' | 'Sport' | 'Dive' | 'Luxury' | 'Minimalist' | 'Digital' | 'Skeleton' | 'Chronograph';

export type MovementType = 'Automatic Mechanical' | 'Quartz' | 'Solar Powered' | 'Manual Wind' | 'Hybrid Cyber';

export type StrapMaterial = 'Italian Leather' | '316L Stainless Steel' | 'Rose Gold Plated' | 'Titanium' | 'Tactical Silicone' | 'Milanese Mesh';

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  age: number;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  userLocation?: string;
  avatar?: string;
}

export interface WatchSpec {
  caseDiameter: string;
  caseThickness: string;
  caseMaterial: string;
  waterResistance: string;
  movement: MovementType;
  glass: string;
  strapWidth: string;
  dialColor: string;
  warranty: string;
  powerReserve?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: Category;
  ageGroup: AgeGroup;
  movement: MovementType;
  strapMaterial: StrapMaterial;
  inStock: boolean;
  stockQuantity: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  discountPercentage?: number;
  description: string;
  longDescription: string;
  highlights: string[];
  specs: WatchSpec;
  variants?: {
    id: string;
    colorName: string;
    hex: string;
    image: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  engravingText?: string;
}

export interface FilterState {
  searchQuery: string;
  category: Category | 'all';
  ageGroup: AgeGroup;
  brand: string | 'all';
  movement: MovementType | 'all';
  strapMaterial: StrapMaterial | 'all';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface OrderDetails {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
}
