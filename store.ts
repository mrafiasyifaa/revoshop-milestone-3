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
          
          const newItems = existingItem
            ? state.items.map((item) =>
                item.product.id.toString() === product.id.toString()
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.items, { product, quantity: 1 }];
          
          if (state.user) {
            saveCartToCookie(state.user.id, newItems);
          }
          
          return { items: newItems };
        }),
        
      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.reduce((acc, item) => {
            if (item.product.id.toString() === productId.toString()) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]);
          
          if (state.user) {
            saveCartToCookie(state.user.id, newItems);
          }
          
          return { items: newItems };
        }),
        
      deleteCartProduct: (productId) =>
        set((state) => {
          const newItems = state.items.filter(
            ({ product }) => product?.id.toString() !== productId.toString()
          );
          
          if (state.user) {
            saveCartToCookie(state.user.id, newItems);
          }
          
          return { items: newItems };
        }),
        
      resetCart: () => 
        set((state) => {
          if (state.user) {
            saveCartToCookie(state.user.id, []);
          }
          
          return { items: [] };
        }),
        
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
        if (typeof window !== 'undefined') {
          const userCart = getCartFromCookie(user.id);
          set({ user, items: userCart });
        } else {
          set({ user });
        }
      },
      
      logout: () => {
        if (typeof window !== 'undefined') {
          const currentUser = get().user;
          if (currentUser) {
            saveCartToCookie(currentUser.id, get().items);
          }
        }
        set({ user: null, items: [] });
      },
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ items: [] }),
    }
  )
);

function saveCartToCookie(userId: number, items: CartItem[]) {
  if (typeof window === 'undefined') return;
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  
  const cookieName = `cart_user_${userId}`;
  const cartData = JSON.stringify(items);
  
  document.cookie = `${cookieName}=${encodeURIComponent(cartData)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
}

function getCartFromCookie(userId: number): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  const cookieName = `cart_user_${userId}`;
  const cookies = document.cookie.split('; ');
  const cartCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
  
  if (!cartCookie) return [];
  
  try {
    const cookieValue = cartCookie.split('=')[1];
    const items = JSON.parse(decodeURIComponent(cookieValue));
    return items || [];
  } catch (error) {
    console.error('Error parsing cart cookie:', error);
    return [];
  }
}

export default useStore;