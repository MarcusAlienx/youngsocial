import React, { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { Cart, CartItem, Product, Size, Color } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number, size?: Size, color?: Color) => void;
  removeFromCart: (productId: string, size?: Size, color?: Color) => void;
  updateQuantity: (productId: string, quantity: number, size?: Size, color?: Color) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size?: Size; color?: Color } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size?: Size; color?: Color } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; size?: Size; color?: Color } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' };

interface CartState {
  cart: Cart;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to generate unique key for cart items
const getCartItemKey = (productId: string, size?: Size, color?: Color): string => {
  return `${productId}-${size?.id || 'nosize'}-${color?.id || 'nocolor'}`;
};

// Helper function to find cart item by product, size, and color
const findCartItem = (items: CartItem[], productId: string, size?: Size, color?: Color): CartItem | undefined => {
  return items.find(item =>
    item.product.id === productId &&
    item.selectedSize?.id === size?.id &&
    item.selectedColor?.id === color?.id
  );
};

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => {
    const price = item.product.onSale && item.product.originalPrice
      ? item.product.originalPrice
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size, color } = action.payload;
      const existingItem = findCartItem(state.cart.items, product.id, size, color);

      let newItems: CartItem[];
      if (existingItem) {
        // Update quantity of existing item
        newItems = state.cart.items.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          quantity,
          selectedSize: size,
          selectedColor: color
        };
        newItems = [...state.cart.items, newItem];
      }

      const { total, itemCount } = calculateCartTotals(newItems);

      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount
        }
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, size, color } = action.payload;
      const newItems = state.cart.items.filter(item =>
        !(item.product.id === productId &&
          item.selectedSize?.id === size?.id &&
          item.selectedColor?.id === color?.id)
      );

      const { total, itemCount } = calculateCartTotals(newItems);

      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount
        }
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, size, color } = action.payload;

      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, {
          type: 'REMOVE_ITEM',
          payload: { productId, size, color }
        });
      }

      const newItems = state.cart.items.map(item => {
        if (item.product.id === productId &&
            item.selectedSize?.id === size?.id &&
            item.selectedColor?.id === color?.id) {
          return { ...item, quantity };
        }
        return item;
      });

      const { total, itemCount } = calculateCartTotals(newItems);

      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount
        }
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          total: 0,
          itemCount: 0
        }
      };

    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload
      };

    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    default:
      return state;
  }
};

const initialState: CartState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0
  },
  isCartOpen: false
};

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ys-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ys-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product, quantity = 1, size?: Size, color?: Color) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, size, color }
    });
  };

  const removeFromCart = (productId: string, size?: Size, color?: Color) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId, size, color }
    });
  };

  const updateQuantity = (productId: string, quantity: number, size?: Size, color?: Color) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity, size, color }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen: state.isCartOpen,
        openCart,
        closeCart,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
