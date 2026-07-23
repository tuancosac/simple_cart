import { Product, CartItem } from '../types/products';

const PRODUCTS_KEY = 'products';
const CART_KEY = 'cart';

export const loadFromStorage = (): { products: Product[]; cart: CartItem[] } => {
  const savedProducts = localStorage.getItem(PRODUCTS_KEY);
  const savedCart = localStorage.getItem(CART_KEY);
  
  const products: Product[] = savedProducts ? JSON.parse(savedProducts) : [];
  const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
  
  return { products, cart };
};

export const saveToStorage = (products: Product[], cart: CartItem[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};