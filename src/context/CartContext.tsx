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

const SESSION_STORAGE_KEY = 'arllon_barbearia_cart_session_v2';
const LEGACY_STORAGE_KEYS = ['arllon_barbearia_cart_v1', 'arllon_barbearia_cart'];

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
    // Purge old persistent localStorage so previously stored orders do not linger
    try {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {}

    try {
      // Use sessionStorage so the cart automatically disappears when the biosite is closed
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
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

  // Sync with sessionStorage (automatically wiped out when the user closes the biosite window/tab)
  useEffect(() => {
    try {
      if (Object.keys(cart).length === 0) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } else {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
      }
    } catch (e) {
      console.error('Failed to sync cart with sessionStorage', e);
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

    // Sanitização e validação de quantidade: número inteiro positivo limitado entre 1 e 99
    const safeQty = Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1)));

    setCart((prev) => {
      const current = prev[productId] || 0;
      return {
        ...prev,
        [productId]: Math.min(99, current + safeQty),
      };
    });

    setToastMessage(`Produto adicionado ao carrinho: ${product.name}`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const safeQty = Math.floor(Number(quantity) || 0);
      if (safeQty <= 0) {
        delete next[productId];
      } else {
        next[productId] = Math.min(99, safeQty);
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
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {}
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
