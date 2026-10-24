import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone: Glowing slow spinning ring around circular logo & Store Name */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="relative flex items-center justify-center w-12 h-12">
            {/* Spinning glowing outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#42C8FF]/70 animate-spin-slow shadow-[0_0_12px_rgba(66,200,255,0.4)]" />
            <div className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-[#1687FF]/20 via-transparent to-[#42C8FF]/30 animate-pulse-glow pointer-events-none" />
            
            {/* Inner Logo Image inside circle */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#082E5A] ring-1 ring-[#42C8FF]/40 shadow-inner flex items-center justify-center">
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
            className="flex flex-col text-left group"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#F5F8FC] group-hover:text-[#42C8FF] transition-colors leading-tight">
              {STORE_INFO.name}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#AAB8CA]">
              Catálogo Profissional
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
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#F5F8FC] bg-[#082E5A] border border-[#1687FF]/40 shadow-[0_0_12px_rgba(22,135,255,0.25)]'
                    : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Search & Shopping Bag */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              aria-label="Pesquisar produtos"
              className="p-2.5 rounded-lg text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340] border border-transparent hover:border-[#1687FF]/30 transition-all cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label={`Carrinho com ${totalItems} itens`}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#082E5A] hover:bg-[#0B2340] border border-[#1687FF]/40 hover:border-[#42C8FF] text-[#F5F8FC] transition-all shadow-[0_0_15px_rgba(22,135,255,0.2)] active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#42C8FF]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1687FF] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-[0_0_8px_#1687FF]">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase">
              Carrinho
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de categorias"
            className="md:hidden p-2 rounded-lg text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
