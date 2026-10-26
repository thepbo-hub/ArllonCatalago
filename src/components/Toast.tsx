import React from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="Notificação do carrinho"
      className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-[#082E5A] border border-[#35D49A]/50 text-white p-3.5 shadow-[0_10px_25px_rgba(4,23,43,0.85)] flex items-center justify-between gap-3 animate-slideUp"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-[#35D49A]/20 text-[#35D49A] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <p className="text-xs font-medium text-[#F5F8FC] truncate">
          {toastMessage}
        </p>
      </div>

      <button
        onClick={openCart}
        className="text-[11px] font-bold text-[#42C8FF] hover:underline uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-1.5"
      >
        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
        <span>Ver carrinho</span>
      </button>
    </aside>
  );
};
