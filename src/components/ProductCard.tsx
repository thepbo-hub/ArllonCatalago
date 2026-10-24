import React, { useState } from 'react';
import { ShoppingBag, Check, FileText, Sparkles, ImageOff } from 'lucide-react';
import { Product, STORE_INFO } from '../data/products';
import { useCart } from '../context/CartContext';
import { RatingDots } from './RatingDots';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, formatCurrency } = useCart();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#0B2340] to-[#082E5A] border border-[#1687FF]/20 hover:border-[#42C8FF]/60 transition-all duration-300 p-4 sm:p-5 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_12px_28px_rgba(4,23,43,0.85)]"
    >
      {/* Top Bar: Indicators & Content Badge */}
      <div className="relative z-10 flex items-start justify-between gap-2 min-h-[28px] mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {product.holdLevel !== null && (
            <RatingDots type="hold" level={product.holdLevel} compact />
          )}
          {product.shineLevel !== null && (
            <RatingDots type="shine" level={product.shineLevel} compact />
          )}
        </div>

        <span className="text-[11px] font-semibold text-[#AAB8CA] px-2 py-0.5 rounded-md bg-[#04172B]/60 border border-white/5 whitespace-nowrap">
          {product.content}
        </span>
      </div>

      {/* Image Showcase: Centered light exits left on hover, leaving enlarged product as sole highlight */}
      <div className="relative z-10 w-full h-48 sm:h-52 my-2 flex items-center justify-center rounded-xl bg-[#04172B]/60 p-3 overflow-hidden">
        {/* Visible Centered Ambient Light before hover; exits to the left on hover */}
        <div 
          className="absolute w-36 h-36 rounded-full bg-[#1687FF]/35 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-x-[220%] group-hover:opacity-0 transition-all duration-500 ease-out pointer-events-none" 
          aria-hidden="true"
        />

        {/* Subtle Discreet Watermark Logo behind product */}
        <img
          src={STORE_INFO.logo}
          alt=""
          aria-hidden="true"
          className="absolute w-16 h-16 object-contain opacity-[0.06] group-hover:opacity-0 transition-opacity duration-400 pointer-events-none grayscale"
          referrerPolicy="no-referrer"
        />

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="relative z-10 w-full h-full object-contain transition-transform duration-400 ease-out group-hover:scale-108 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 text-[#AAB8CA]">
            <ImageOff className="w-8 h-8 text-[#AAB8CA]/60 mb-2" />
            <span className="text-xs font-medium">{product.name}</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="relative z-10 flex flex-col flex-grow pt-2">
        {/* Subcategory */}
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#42C8FF]/90 mb-1">
          {product.subcategory}
        </span>

        {/* Product Name */}
        <h3 className="text-base sm:text-lg font-bold text-[#F5F8FC] uppercase tracking-tight leading-snug line-clamp-2 group-hover:text-[#42C8FF] transition-colors">
          {product.name}
        </h3>

        {/* Short Commercial Description */}
        <p className="mt-1.5 text-xs text-[#AAB8CA] leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Commercial Price Section */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
          <span className="text-xs text-[#AAB8CA] font-medium">Preço</span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#F5F8FC] tabular-nums tracking-tight">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-4 flex flex-col gap-2 pt-1">
        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className={`btn-3d w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
            justAdded ? 'btn-3d-green' : 'btn-3d-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Adicionado ao Pedido!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar ao pedido</span>
            </>
          )}
        </button>

        {/* View Details / Ficha Técnica button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="btn-3d w-full py-2 px-3 rounded-lg text-center text-xs font-semibold text-[#AAB8CA] hover:text-[#F5F8FC] bg-[#04172B]/70 hover:bg-[#082E5A] border border-white/10 hover:border-[#42C8FF]/50 shadow-[0_2px_0_#04172B] hover:shadow-[0_4px_0_#04172B,0_6px_16px_rgba(22,135,255,0.25)] flex items-center justify-center gap-1.5 cursor-pointer mt-1"
        >
          <FileText className="w-3.5 h-3.5 text-[#42C8FF]" />
          <span>Ficha técnica & detalhes</span>
        </button>
      </div>
    </article>
  );
};
