'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/types';
import { PROMO_CODES } from '@/lib/data';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, engravingText?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  appliedPromo: string | null;
  promoDiscountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingCost: number;
  freeShippingThreshold: number;
  total: number;
}

const CART_STORAGE_KEY = 'ww_cart_items';
const PROMO_STORAGE_KEY = 'ww_applied_promo';
const FREE_SHIPPING_THRESHOLD = 500; // Free shipping over $500

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
      if (savedPromo) {
        setAppliedPromo(savedPromo);
      }
    } catch (e) {
      console.error('Failed to parse saved cart:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart, isLoaded]);

  // Save promo code
  useEffect(() => {
    if (!isLoaded) return;
    if (appliedPromo) {
      localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }, [appliedPromo, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    engravingText?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (engravingText) updated[existingIndex].engravingText = engravingText;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor, engravingText }];
      }
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.engravingText ? 25 : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const promoDiscountPercentage = appliedPromo && PROMO_CODES[appliedPromo.toUpperCase()]
    ? PROMO_CODES[appliedPromo.toUpperCase()]
    : 0;

  const discountAmount = Math.round((subtotal * promoDiscountPercentage) / 100);

  const shippingCost = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25;

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setAppliedPromo(normalized);
      return {
        success: true,
        message: `Promo code ${normalized} applied! You saved ${PROMO_CODES[normalized]}%.`,
      };
    } else {
      return {
        success: false,
        message: 'Invalid or expired promo code. Try WELCOME10 or TIMELESS15.',
      };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        appliedPromo,
        promoDiscountPercentage,
        applyPromoCode,
        removePromoCode,
        shippingCost,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
