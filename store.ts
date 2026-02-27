import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/src/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
}

interface CartState {
  items: CartItem[];
  user: User | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  setUser: (user: User) => void;
  logout: () => void;
}

const useStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      user: null,
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id.toString() === product.id.toString()
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id.toString() === product.id.toString()
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product.id.toString() === productId.toString()) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?.id.toString() !== productId.toString()
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          return total + price * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product.id.toString() === productId.toString());
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      
      setUser: (user) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        
        if (typeof window !== 'undefined') {
          document.cookie = `auth_session=${JSON.stringify(user)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
        }
        
        set({ user });
      },
      
      logout: () => {
        if (typeof window !== 'undefined') {
          document.cookie = 'auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          
          try {
            const stored = sessionStorage.getItem('cart-store');
            if (stored) {
              const parsed = JSON.parse(stored);
              sessionStorage.setItem('cart-store', JSON.stringify({ 
                state: { items: parsed.state?.items || [], user: null },
                version: parsed.version || 0
              }));
            }
          } catch (e) {
            console.error('Error clearing localStorage:', e);
          }
        }
        
        set({ user: null });
      },
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const getSessionFromCookie = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(cookie => cookie.startsWith('auth_session='));
  
  if (!authCookie) return null;
  
  try {
    const cookieValue = authCookie.split('=')[1];
    const user = JSON.parse(decodeURIComponent(cookieValue));
    return user;
  } catch (error) {
    console.error('Error parsing auth cookie:', error);
    return null;
  }
};

export default useStore;