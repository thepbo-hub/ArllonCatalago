import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { STORE_INFO, MainCategory } from '../data/products';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  selectedCategory: MainCategory | 'TODOS';
  onSelectCategory: (cat: MainCategory | 'TODOS') => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  onSearchClick,
}) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: MainCategory | 'TODOS' }[] = [
    { label: 'Todos os Produtos', value: 'TODOS' },
    { label: 'Cabelo', value: 'CABELO' },
    { label: 'Barba', value: 'BARBA' },
    { label: 'Acessórios', value: 'ACESSÓRIOS' },
  ];

  const handleCategoryClick = (cat: MainCategory | 'TODOS') => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#04172B]/92 border-b border-[#082E5A]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone: Glowing slow spinning ring around circular logo & Store Name */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 shrink-0">
            {/* Spinning glowing outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#42C8FF]/70 animate-spin-slow shadow-[0_0_12px_rgba(66,200,255,0.4)]" />
            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-[#1687FF]/20 via-transparent to-[#42C8FF]/30 animate-pulse-glow pointer-events-none" />
            
            {/* Inner Logo Image inside circle */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#082E5A] ring-1 ring-[#42C8FF]/40 shadow-inner flex items-center justify-center">
              <img
                src={STORE_INFO.logo}
                alt={STORE_INFO.name}
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <a
            href="#catalogo"
            className="flex flex-col text-left group min-w-0"
          >
            <span className="text-[11px] xs:text-xs sm:text-sm font-extrabold tracking-wider text-[#F5F8FC] group-hover:text-[#42C8FF] transition-colors leading-tight uppercase truncate block">
              ARLLON FERNANDES
            </span>
            <span className="text-xs xs:text-sm sm:text-base font-black uppercase text-[#42C8FF] tracking-[0.34em] sm:tracking-[0.40em] -mr-[0.34em] sm:-mr-[0.40em] leading-tight block truncate">
              BARBEARIA
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = selectedCategory === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleCategoryClick(item.value)}
                className={`btn-3d px-3.5 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'btn-3d-blue text-white'
                    : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/60 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Search & Shopping Bag */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              aria-label="Pesquisar produtos"
              className="btn-3d p-2 sm:p-2.5 rounded-lg text-[#AAB8CA] hover:text-[#F5F8FC] bg-[#04172B]/60 hover:bg-[#082E5A] border border-white/5 hover:border-[#42C8FF]/40 shadow-xs transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label={`Ver carrinho com ${totalItems} itens`}
            title="Ver carrinho"
            className="btn-3d btn-3d-navy relative flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 rounded-xl cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#42C8FF] stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#1687FF] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center tabular-nums shadow-[0_0_8px_#1687FF]">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase">
              Ver carrinho
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de categorias"
            className="md:hidden p-2 rounded-lg text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#082E5A] bg-[#04172B] px-4 py-4 space-y-1.5 shadow-xl">
          <p className="text-[11px] font-semibold text-[#AAB8CA] uppercase tracking-wider px-3 pb-1">
            Categorias
          </p>
          {navItems.map((item) => {
            const isActive = selectedCategory === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleCategoryClick(item.value)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  isActive
                    ? 'text-[#F5F8FC] bg-[#082E5A] border border-[#1687FF]/40'
                    : 'text-[#AAB8CA] hover:bg-[#0B2340] hover:text-[#F5F8FC]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#42C8FF]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
