
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate cart total and count
    const total = cartItems.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
    setCartTotal(total);
    
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);
  
  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If product already exists in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast(`${product.name} atualizado no carrinho!`, {
          description: `Quantidade: ${updatedItems[existingItemIndex].quantity}`,
        });
        return updatedItems;
      } else {
        // Otherwise add new item
        toast(`${product.name} adicionado ao carrinho!`, {
          description: `Quantidade: ${quantity}`,
        });
        return [...prevItems, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.product.id === productId);
      const newItems = prevItems.filter(item => item.product.id !== productId);
      
      if (removedItem) {
        toast(`${removedItem.product.name} removido do carrinho!`);
      }
      
      return newItems;
    });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast('Carrinho limpo com sucesso!');
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartTotal,
        cartCount
      }}
    >
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
