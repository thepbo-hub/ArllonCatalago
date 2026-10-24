import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, CheckCircle2, ImageOff, ArrowLeft } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { RatingDots } from './RatingDots';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, formatCurrency } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Reset state when opening product
  useEffect(() => {
    setQuantity(1);
    setImageError(false);
    setJustAdded(false);
  }, [product]);

  // Lock body scroll while modal is open & handle Escape key
  useEffect(() => {
    if (!product) return;

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
      if (e.key === 'Escape') {
        onClose();
      }
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
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex flex-col items-center justify-start sm:justify-center p-2.5 xs:p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B2340] to-[#04172B] border border-[#1687FF]/40 shadow-[0_20px_50px_rgba(4,23,43,0.95)]"
      >
        {/* Header com botão de saída centralizado dentro do enquadramento, com o 'X' no canto superior direito do botão */}
        <div className="w-full shrink-0 flex items-center justify-center pt-3 pb-2.5 px-4 bg-[#04172B]/95 border-b border-[#1687FF]/20 z-30">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar especificações do produto"
            className="relative btn-3d btn-3d-navy px-8 py-2 sm:px-10 sm:py-2.5 rounded-xl flex items-center justify-center cursor-pointer bg-[#082E5A] hover:bg-[#0B366B] border border-[#42C8FF]/50 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group transition-all"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5F8FC] group-hover:text-white pr-2.5">
              Fechar Especificações
            </span>
            {/* O X no canto superior direito desse mesmo botão centralizado */}
            <span
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#1687FF] group-hover:bg-[#FF5A65] text-white flex items-center justify-center border-2 border-[#04172B] shadow-[0_0_12px_#1687FF] transition-all transform group-hover:scale-110"
              aria-hidden="true"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </span>
          </button>
        </div>

        {/* Content body: 2 columns on tablet/desktop, vertical on mobile */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* Left Column: Product Image Showcase */}
        <div className="w-full md:w-5/12 p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#04172B]/90 to-[#082E5A]/40 border-b md:border-b-0 md:border-r border-[#1687FF]/20 shrink-0 relative">
          <div className="w-full max-w-[190px] xs:max-w-[220px] sm:max-w-[280px] h-36 xs:h-44 sm:h-72 flex items-center justify-center">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-[#AAB8CA]">
                <ImageOff className="w-12 h-12 text-[#AAB8CA]/60 mb-3" />
                <span className="text-sm font-semibold">{product.name}</span>
              </div>
            )}
          </div>

          <div className="mt-2 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#AAB8CA]">
            <span>Conteúdo: <strong className="text-[#F5F8FC]">{product.content}</strong></span>
            <span>·</span>
            <span className="text-[#35D49A]">Disponível</span>
          </div>
        </div>

        {/* Right Column: Information, Specs & Actions */}
        <div className="w-full md:w-7/12 p-4 sm:p-8 flex flex-col justify-between flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#42C8FF]">
                {product.category} · {product.subcategory}
              </span>
              <h2
                id="modal-title"
                className="mt-1 text-xl sm:text-2xl font-extrabold text-[#F5F8FC] uppercase tracking-tight leading-tight"
              >
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-[#AAB8CA] italic">
                "{product.description}"
              </p>
            </div>

            {/* Price display */}
            <div className="p-3.5 rounded-xl bg-[#082E5A]/50 border border-white/5 flex items-baseline justify-between">
              <span className="text-xs text-[#AAB8CA] font-medium uppercase tracking-wider">
                Preço Unitário
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] tabular-nums tracking-tight">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Hold and Shine Indicators (Only rendered if present) */}
            {(product.holdLevel !== null || product.shineLevel !== null) && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#AAB8CA] block">
                  Classificação Técnica
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.holdLevel !== null && (
                    <RatingDots type="hold" level={product.holdLevel} />
                  )}
                  {product.shineLevel !== null && (
                    <RatingDots type="shine" level={product.shineLevel} />
                  )}
                </div>
              </div>
            )}

            {/* Purpose: Para que serve */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC] mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
                Para que serve
              </h3>
              <p className="text-xs sm:text-sm text-[#AAB8CA] leading-relaxed">
                {product.purpose}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35D49A]" />
                Benefícios principais
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#AAB8CA]">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35D49A] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Actions: Quantity + Add to Cart */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#AAB8CA]">
                Quantidade:
              </span>
              <div className="flex items-center rounded-xl bg-[#04172B] border border-white/10 p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="btn-3d w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold text-[#F5F8FC] bg-[#082E5A] hover:bg-[#1687FF] border border-white/10 shadow-[0_2px_0_#04172B] cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#F5F8FC] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="btn-3d w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold text-[#F5F8FC] bg-[#082E5A] hover:bg-[#1687FF] border border-white/10 shadow-[0_2px_0_#04172B] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn-3d w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                justAdded ? 'btn-3d-green' : 'btn-3d-blue'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Adicionado ao carrinho!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Adicionar ao carrinho · {formatCurrency(product.price * quantity)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-xs font-semibold text-[#AAB8CA] hover:text-[#42C8FF] transition-colors cursor-pointer"
            >
              Voltar ao catálogo
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
