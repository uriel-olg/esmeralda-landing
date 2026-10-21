import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { products } from '../data/products';

type Cart = Record<string, number>;
interface Toast { id: number; message: string }
interface ShopContextValue {
  cart: Cart;
  favorites: string[];
  cartCount: number;
  subtotal: number;
  cartOpen: boolean;
  toast: Toast | null;
  addItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  notify: (message: string) => void;
}

const CART_KEY = 'raices-cart-v1';
const FAVORITES_KEY = 'raices-favorites-v1';
const validId = (id: string) => products.some((p) => p.id === id);

function readStorage(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') as unknown; }
  catch { return null; }
}
function initialCart(): Cart {
  const value = readStorage(CART_KEY);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, n]) => validId(id) && typeof n === 'number' && Number.isInteger(n) && n > 0 && n <= 99));
}
function initialFavorites(): string[] {
  const value = readStorage(FAVORITES_KEY);
  return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && validId(id)))] : [];
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastId = useRef(0);

  useEffect(() => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Storage may be disabled. The cart still works in memory. */ } }, [cart]);
  useEffect(() => { try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch { /* Favorites still work in memory. */ } }, [favorites]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast({ id: ++toastId.current, message });
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);
  const addItem = useCallback((id: string) => {
    if (!validId(id)) return;
    setCart((current) => ({ ...current, [id]: Math.min((current[id] ?? 0) + 1, 99) }));
  }, []);
  const setQuantity = useCallback((id: string, quantity: number) => {
    if (!validId(id) || !Number.isInteger(quantity)) return;
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = Math.min(quantity, 99);
      return next;
    });
  }, []);
  const removeItem = useCallback((id: string) => setCart((current) => {
    const next = { ...current }; delete next[id]; return next;
  }), []);
  const toggleFavorite = useCallback((id: string) => {
    if (!validId(id)) return;
    setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }, []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
  return (
    <ShopContext.Provider value={{ cart, favorites, cartCount, subtotal, cartOpen, toast, addItem, setQuantity, removeItem, toggleFavorite, openCart, closeCart, notify }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextValue {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop must be used inside ShopProvider.');
  return value;
}
