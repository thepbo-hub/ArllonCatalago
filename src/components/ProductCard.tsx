import React, { useState } from 'react';
import { ShoppingBag, Check, FileText, Sparkles, ImageOff } from 'lucide-react';
import { Product } from '../data/products';
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
      className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#0B2340] to-[#082E5A] border border-[#1687FF]/20 hover:border-[#42C8FF]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(22,135,255,0.25)] p-4 sm:p-5 cursor-pointer overflow-hidden"
    >
      {/* Ambient hover glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-[#1687FF]/0 via-transparent to-[#42C8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
        aria-hidden="true" 
      />

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

      {/* Image Showcase */}
      <div className="relative z-10 w-full h-48 sm:h-52 my-2 flex items-center justify-center rounded-xl bg-[#04172B]/50 p-3 group-hover:bg-[#04172B]/70 transition-colors">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4 text-[#AAB8CA]">
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
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-97 ${
            justAdded
              ? 'bg-[#35D49A] text-[#04172B]'
              : 'bg-white hover:bg-[#F5F8FC] text-[#04172B] hover:shadow-[0_0_16px_rgba(255,255,255,0.4)]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar ao pedido</span>
            </>
          )}
        </button>

        {/* View Details / Ficha Técnica link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="w-full py-1.5 text-center text-xs font-medium text-[#AAB8CA] hover:text-[#42C8FF] transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ficha técnica & detalhes</span>
        </button>
      </div>
    </article>
  );
};
