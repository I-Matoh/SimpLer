import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

type CartContextType = {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart_data';
const MAX_QUANTITY_PER_ITEM = 10;

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        if (existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
          throw new Error(`Maximum quantity limit (${MAX_QUANTITY_PER_ITEM}) reached for this item`);
        }
        
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_ITEM) }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }
      
      if (action.payload.quantity > MAX_QUANTITY_PER_ITEM) {
        throw new Error(`Maximum quantity limit (${MAX_QUANTITY_PER_ITEM}) reached for this item`);
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    case 'LOAD_CART':
      return action.payload;
      
    default:
      throw new Error('Invalid cart action');
  } 
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY); 
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  
  const addToCart = (product: Product) => {
    if (!product.inStock) {
      throw new Error('Product is out of stock');
    }

    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem && existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Maximum quantity limit (${MAX_QUANTITY_PER_ITEM}) reached for this item`);
    }

    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const removeFromCart = (id: number) => {
    if (!state.items.some(item => item.id === id)) {
      throw new Error('Product not found in cart');
    }
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Maximum quantity limit (${MAX_QUANTITY_PER_ITEM}) reached for this item`);
    }
    if (!state.items.some(item => item.id === id)) {
      throw new Error('Product not found in cart');
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
