import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Copy, Check, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    generateWhatsAppMessage,
    generateWhatsAppUrl,
    formatCurrency,
  } = useCart();

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Lock background scrolling and attach Escape key listener when cart is open
  useEffect(() => {
    if (!isCartOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleCopyMessage = async () => {
    const msg = generateWhatsAppMessage();
    if (!msg) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback textarea copy
      const textarea = document.createElement('textarea');
      textarea.value = msg;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 h-[100dvh] w-full bg-black/75 backdrop-blur-xs flex justify-end animate-fadeIn overflow-hidden"
      onClick={closeCart}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md h-[100dvh] max-h-[100dvh] bg-[#04172B] border-l border-[#082E5A] shadow-2xl flex flex-col min-h-0 overflow-hidden"
      >
        {/* Cart Header - Fixed top */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-[#082E5A] flex items-center justify-between bg-[#0B2340]/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#42C8FF]" />
            <h2 id="cart-title" className="text-base sm:text-lg font-bold text-[#F5F8FC] uppercase tracking-wide">
              Seu Pedido
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#082E5A] text-[#42C8FF] border border-[#1687FF]/30 tabular-nums">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                title="Esvaziar carrinho"
                className="text-xs text-[#AAB8CA] hover:text-[#FF5A65] transition-colors p-1.5 rounded-md hover:bg-white/5 cursor-pointer"
              >
                Limpar
              </button>
            )}
            <button
              onClick={closeCart}
              aria-label="Fechar carrinho"
              className="p-2 rounded-lg text-[#AAB8CA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List or Empty State - Scrollable Middle (with min-h-0 so it shrinks properly on mobile) */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#082E5A]/50 border border-white/5 flex items-center justify-center text-[#AAB8CA]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#F5F8FC]">Seu carrinho está vazio.</h3>
                <p className="text-xs text-[#AAB8CA]">Explore os produtos e monte seu pedido.</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-xl bg-[#1687FF] hover:bg-[#1687FF]/90 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Ver produtos
              </button>
            </div>
          ) : (
            items.map(({ product, quantity, subtotal }) => (
              <div
                key={product.id}
                className="p-3 sm:p-3.5 rounded-xl bg-[#082E5A]/40 border border-white/5 flex items-center gap-3 relative group"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#04172B] p-1.5 shrink-0 flex items-center justify-center border border-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0 pr-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#F5F8FC] uppercase tracking-tight line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="text-[11px] text-[#AAB8CA] flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                    <span>Unit.: {formatCurrency(product.price)}</span>
                    <span className="hidden xs:inline">·</span>
                    <span className="font-semibold text-[#42C8FF] tabular-nums">
                      Subtotal: {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="inline-flex items-center rounded-lg bg-[#04172B] border border-white/10 p-0.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#AAB8CA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 sm:w-8 text-center text-xs font-bold text-[#F5F8FC] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#AAB8CA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      title="Remover item"
                      className="p-1.5 rounded text-[#AAB8CA] hover:text-[#FF5A65] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary and WhatsApp Checkout - Fixed bottom with safe-area protection */}
        {items.length > 0 && (
          <div className="shrink-0 p-4 sm:p-5 border-t border-[#082E5A] bg-[#0B2340]/90 backdrop-blur-md space-y-3 pb-[max(1rem,env(safe-area-inset-bottom,1rem))]">
            {/* Total summary */}
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-xs uppercase tracking-wider text-[#AAB8CA] font-semibold">
                Total do Pedido:
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#F5F8FC] tabular-nums tracking-tight">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* WhatsApp Checkout Primary Action */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const msg = generateWhatsAppMessage();
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(msg).catch(() => {});
                }
              }}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#35D49A] hover:bg-[#35D49A]/90 text-[#04172B] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(53,212,154,0.35)] hover:shadow-[0_0_28px_rgba(53,212,154,0.5)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer no-underline text-center"
            >
              <MessageSquare className="w-5 h-5 fill-current shrink-0" />
              <span>Finalizar Pedido pelo WhatsApp</span>
            </a>

            {/* Fallback & Copy tools */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <button
                onClick={handleCopyMessage}
                className="flex-1 py-2 px-2.5 rounded-lg bg-[#04172B] hover:bg-[#082E5A] text-[#AAB8CA] hover:text-[#F5F8FC] border border-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copiar mensagem organizada para colar no WhatsApp se necessário"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#35D49A]" />
                    <span className="text-[#35D49A] font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar pedido</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="py-2 px-3 rounded-lg bg-[#04172B] hover:bg-[#082E5A] text-[#AAB8CA] hover:text-[#F5F8FC] border border-white/5 transition-colors text-[11px] cursor-pointer whitespace-nowrap"
              >
                {showPreview ? 'Ocultar mensagem' : 'Ver mensagem'}
              </button>
            </div>

            {/* Message Preview Drawer if requested */}
            {showPreview && (
              <div className="p-2.5 rounded-lg bg-[#04172B] border border-white/10 text-[11px] text-[#AAB8CA] font-mono whitespace-pre-wrap max-h-28 overflow-y-auto">
                {generateWhatsAppMessage()}
              </div>
            )}

            <p className="text-[10px] text-center text-[#AAB8CA]/80 leading-tight">
              Destino oficial: <span className="text-[#42C8FF]">{STORE_INFO.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
