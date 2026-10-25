import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare } from 'lucide-react';
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

  // Lock background scrolling on mobile & desktop, and attach Escape key listener
  useEffect(() => {
    if (!isCartOpen) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 w-full h-full bg-black/80 backdrop-blur-xs flex justify-end overflow-hidden"
      onClick={closeCart}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md h-full bg-[#04172B] border-l border-[#082E5A] shadow-2xl flex flex-col min-h-0 overflow-hidden animate-drawer-slide"
      >
        {/* Cart Header - Fixed top */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-[#082E5A] flex items-center justify-between bg-[#0B2340]">
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
                className="btn-3d btn-3d-red text-[11px] font-bold py-1 px-2.5 rounded-lg cursor-pointer"
              >
                Limpar
              </button>
            )}
            <button
              onClick={closeCart}
              aria-label="Fechar carrinho"
              className="btn-3d btn-3d-navy p-2 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
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
                className="btn-3d btn-3d-blue mt-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
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
                    <div className="inline-flex items-center rounded-xl bg-[#04172B] border border-white/10 p-1 gap-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        className="btn-3d w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-[#082E5A] hover:bg-[#1687FF] shadow-[0_2px_0_#04172B] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <span className="w-7 sm:w-8 text-center text-xs font-bold text-[#F5F8FC] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        className="btn-3d w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-[#082E5A] hover:bg-[#1687FF] shadow-[0_2px_0_#04172B] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      title="Remover item"
                      className="btn-3d p-2 rounded-lg bg-[#FF5A65]/15 hover:bg-[#FF5A65] text-[#FF5A65] hover:text-white border border-[#FF5A65]/30 shadow-[0_2px_0_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary and WhatsApp Checkout - Solid background with safe-area protection */}
        {items.length > 0 && (
          <div className="shrink-0 p-4 sm:p-5 border-t border-[#082E5A] bg-[#04172B] space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))]">
            {/* Total summary */}
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-xs uppercase tracking-wider text-[#AAB8CA] font-semibold">
                Total do Pedido:
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#F5F8FC] tabular-nums tracking-tight">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* WhatsApp Checkout Primary Action in 3D */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const msg = generateWhatsAppMessage();
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(msg).catch(() => {});
                }
                // Limpa o pedido após o envio para não continuar com o conteúdo anterior
                setTimeout(() => {
                  clearCart();
                  closeCart();
                }, 150);
              }}
              className="btn-3d btn-3d-green w-full py-3.5 sm:py-4 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer no-underline text-center"
            >
              <MessageSquare className="w-5 h-5 fill-current shrink-0" />
              <span>Finalizar Pedido pelo WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#AAB8CA]/80 leading-tight">
              Destino oficial: <span className="text-[#42C8FF]">{STORE_INFO.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
