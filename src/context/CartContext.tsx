import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS, STORE_INFO } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartContextType {
  cart: Record<string, number>; // productId -> quantity
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toastMessage: string | null;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  generateWhatsAppMessage: () => string;
  generateWhatsAppUrl: () => string;
  formatCurrency: (value: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'arllon_barbearia_cart_v1';

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      if (typeof parsed !== 'object' || parsed === null) return {};

      // Validate products exist and quantities are positive integers
      const validated: Record<string, number> = {};
      for (const [id, qty] of Object.entries(parsed)) {
        if (typeof qty === 'number' && qty > 0 && PRODUCTS.some((p) => p.id === id)) {
          validated[id] = Math.floor(qty);
        }
      }
      return validated;
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (productId: string, quantity: number = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || !product.available) return;

    setCart((prev) => {
      const current = prev[productId] || 0;
      return {
        ...prev,
        [productId]: current + Math.max(1, quantity),
      };
    });

    setToastMessage(`Produto adicionado ao carrinho: ${product.name}`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = Math.floor(quantity);
      }
      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Compute joined items, total items count, and total price
  const items: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return null;
      return {
        product,
        quantity,
        subtotal: product.price * quantity,
      };
    })
    .filter((item): item is CartItem => item !== null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

  const generateWhatsAppMessage = (): string => {
    if (items.length === 0) return '';

    const lines: string[] = [];
    lines.push('Olá! Gostaria de fazer o seguinte pedido:');
    lines.push('');
    lines.push('*MEU PEDIDO — ARLLON FERNANDES BARBEARIA*');
    lines.push('');

    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.product.name}`);
      lines.push(`   Quantidade: ${item.quantity}`);
      lines.push(`   Valor unitário: ${formatBRL(item.product.price)}`);
      lines.push(`   Subtotal: ${formatBRL(item.subtotal)}`);
      lines.push('');
    });

    lines.push(`*TOTAL DO PEDIDO: ${formatBRL(totalPrice)}*`);
    lines.push('');
    lines.push('Poderiam confirmar a disponibilidade dos produtos e me orientar sobre a finalização da compra?');
    lines.push('');
    lines.push('Obrigado!');

    return lines.join('\n');
  };

  const generateWhatsAppUrl = (): string => {
    const message = generateWhatsAppMessage();
    if (!message) return `https://api.whatsapp.com/send?phone=${STORE_INFO.whatsappPhone}`;

    const encoded = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${STORE_INFO.whatsappPhone}&text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        totalItems,
        totalPrice,
        isCartOpen,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        generateWhatsAppMessage,
        generateWhatsAppUrl,
        formatCurrency: formatBRL,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
