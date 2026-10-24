/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS, Product, MainCategory, HoldLevel, ShineLevel } from './data/products';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductFilters, SortOption } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ShoppingBag, MessageSquare, RotateCcw } from 'lucide-react';

function CatalogContent() {
  const { totalItems, totalPrice, isCartOpen, openCart, formatCurrency } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | 'TODOS'>('TODOS');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | 'TODAS'>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [holdFilter, setHoldFilter] = useState<HoldLevel | null>(null);
  const [shineFilter, setShineFilter] = useState<ShineLevel | null>(null);

  // Selected product for modal
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('TODOS');
    setSelectedSubcategory('TODAS');
    setSearchQuery('');
    setSortBy('default');
    setHoldFilter(null);
    setShineFilter(null);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by main category
    if (selectedCategory !== 'TODOS') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'TODAS') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Filter by search query (name, description, purpose, benefits)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inPurpose = p.purpose.toLowerCase().includes(q);
        const inSub = p.subcategory.toLowerCase().includes(q);
        const inBenefits = p.benefits.some((b) => b.toLowerCase().includes(q));
        return inName || inDesc || inPurpose || inSub || inBenefits;
      });
    }

    // Filter by hold level
    if (holdFilter !== null) {
      result = result.filter((p) => p.holdLevel === holdFilter);
    }

    // Filter by shine level
    if (shineFilter !== null) {
      result = result.filter((p) => p.shineLevel === shineFilter);
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, holdFilter, shineFilter]);

  const handleFocusSearch = () => {
    const input = document.getElementById('search-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04172B] text-[#F5F8FC]">
      {/* Top Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory('TODAS');
        }}
        onSearchClick={handleFocusSearch}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 md:pb-12 space-y-8">
        {/* Navigation & Filters */}
        <ProductFilters
          category={selectedCategory}
          onCategoryChange={setSelectedCategory}
          subcategory={selectedSubcategory}
          onSubcategoryChange={setSelectedSubcategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          holdFilter={holdFilter}
          onHoldFilterChange={setHoldFilter}
          shineFilter={shineFilter}
          onShineFilterChange={setShineFilter}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredProducts.length}
        />

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#082E5A]/20 border border-white/5 p-8 max-w-lg mx-auto space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider text-[#F5F8FC]">
              NENHUM PRODUTO ENCONTRADO
            </h3>
            <p className="text-sm text-[#AAB8CA]">
              Nenhum item corresponde aos critérios ou termos pesquisados. Tente ajustar os filtros ou buscar por outro termo.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-3d btn-3d-blue mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Limpar filtros</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setActiveModalProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Mobile Sticky Bottom Bar (when cart has items and drawer is closed) */}
      {totalItems > 0 && !isCartOpen && (
        <aside
          aria-label="Resumo rápido do pedido"
          className="fixed bottom-0 left-0 right-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] bg-[#04172B]/95 backdrop-blur-md border-t border-[#082E5A] md:hidden shadow-[0_-10px_25px_rgba(4,23,43,0.8)] animate-slideUp"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-[#AAB8CA] tracking-wider">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
              </span>
              <span className="text-lg font-black text-[#F5F8FC] tabular-nums leading-tight">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <button
              onClick={openCart}
              className="btn-3d btn-3d-green flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Ver pedido</span>
            </button>
          </div>
        </aside>
      )}

      {/* Modals, Drawer and Toast */}
      <ProductDetailsModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      <CartDrawer />

      <Toast />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory('TODAS');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CatalogContent />
    </CartProvider>
  );
}
