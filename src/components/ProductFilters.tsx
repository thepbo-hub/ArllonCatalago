import React, { useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { MainCategory, PRODUCTS, HoldLevel, HOLD_LABELS, ShineLevel, SHINE_LABELS } from '../data/products';

export type SortOption = 'default' | 'name-asc' | 'price-asc' | 'price-desc';

interface ProductFiltersProps {
  category: MainCategory | 'TODOS';
  onCategoryChange: (cat: MainCategory | 'TODOS') => void;
  subcategory: string | 'TODAS';
  onSubcategoryChange: (sub: string | 'TODAS') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  holdFilter: HoldLevel | null;
  onHoldFilterChange: (h: HoldLevel | null) => void;
  shineFilter: ShineLevel | null;
  onShineFilterChange: (s: ShineLevel | null) => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  category,
  onCategoryChange,
  subcategory,
  onSubcategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  holdFilter,
  onHoldFilterChange,
  shineFilter,
  onShineFilterChange,
  onResetFilters,
  totalFiltered,
}) => {
  // Available subcategories based on active category
  const availableSubcategories = useMemo(() => {
    let prods = PRODUCTS;
    if (category !== 'TODOS') {
      prods = prods.filter((p) => p.category === category);
    }
    const subs = Array.from(new Set(prods.map((p) => p.subcategory)));
    return subs;
  }, [category]);

  const isAnyFilterActive =
    category !== 'TODOS' ||
    subcategory !== 'TODAS' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'default' ||
    holdFilter !== null ||
    shineFilter !== null;

  return (
    <div id="catalogo" className="w-full space-y-4 pt-4 pb-2">
      {/* Semantic accessible heading */}
      <h2 className="sr-only">Catálogo de Produtos, Filtros e Busca</h2>

      {/* Category Tabs: Functional segmented control */}
      <div className="flex items-center gap-2 p-1.5 bg-[#082E5A]/50 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar shadow-inner">
        <button
          onClick={() => {
            onCategoryChange('TODOS');
            onSubcategoryChange('TODAS');
          }}
          className={`btn-3d px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer ${
            category === 'TODOS'
              ? 'btn-3d-blue text-white'
              : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/80 border border-transparent'
          }`}
        >
          TODOS OS PRODUTOS
        </button>

        <button
          onClick={() => {
            onCategoryChange('CABELO');
            onSubcategoryChange('TODAS');
          }}
          className={`btn-3d px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer ${
            category === 'CABELO'
              ? 'btn-3d-blue text-white'
              : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/80 border border-transparent'
          }`}
        >
          CABELO
        </button>

        <button
          onClick={() => {
            onCategoryChange('BARBA');
            onSubcategoryChange('TODAS');
          }}
          className={`btn-3d px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer ${
            category === 'BARBA'
              ? 'btn-3d-blue text-white'
              : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/80 border border-transparent'
          }`}
        >
          BARBA
        </button>

        <button
          onClick={() => {
            onCategoryChange('ACESSÓRIOS');
            onSubcategoryChange('TODAS');
          }}
          className={`btn-3d px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer ${
            category === 'ACESSÓRIOS'
              ? 'btn-3d-blue text-white'
              : 'text-[#AAB8CA] hover:text-[#F5F8FC] hover:bg-[#0B2340]/80 border border-transparent'
          }`}
        >
          ACESSÓRIOS
        </button>
      </div>

      {/* Subcategories bar (scrollable on mobile) */}
      {availableSubcategories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-[#AAB8CA] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Subcategoria:
          </span>
          <button
            onClick={() => onSubcategoryChange('TODAS')}
            className={`btn-3d px-3.5 py-2 rounded-xl whitespace-nowrap cursor-pointer font-semibold ${
              subcategory === 'TODAS'
                ? 'btn-3d-navy text-white font-bold'
                : 'bg-[#04172B]/80 border border-white/10 text-[#AAB8CA] hover:text-[#F5F8FC] hover:border-white/20'
            }`}
          >
            Todas
          </button>
          {availableSubcategories.map((sub) => {
            const isActive = subcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={`btn-3d px-3.5 py-2 rounded-xl whitespace-nowrap cursor-pointer font-semibold ${
                  isActive
                    ? 'btn-3d-navy text-white font-bold'
                    : 'bg-[#04172B]/80 border border-white/10 text-[#AAB8CA] hover:text-[#F5F8FC] hover:border-white/20'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      )}

      {/* Search and Secondary Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB8CA]" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            maxLength={60}
            onChange={(e) => {
              // Sanitização de input contra injeções de script e limitação de comprimento
              const clean = e.target.value.replace(/[<>]/g, '').slice(0, 60);
              onSearchChange(clean);
            }}
            placeholder="Pesquisar por nome, efeito matte, barba, fixação..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#082E5A]/40 border border-[#1687FF]/20 focus:border-[#42C8FF] focus:outline-none text-sm text-[#F5F8FC] placeholder-[#AAB8CA]/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Limpar pesquisa"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#AAB8CA] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Granular Filters: Clean 2-column grid on mobile, flex row on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Sort selector */}
          <div className="relative w-full sm:w-auto inline-flex items-center">
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#AAB8CA] pointer-events-none" />
            <select
              value={sortBy}
              aria-label="Ordenar produtos"
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full pl-8 pr-7 py-2 rounded-lg bg-[#082E5A]/40 border border-white/10 hover:border-white/20 text-xs text-[#F5F8FC] font-medium focus:outline-none focus:border-[#42C8FF] cursor-pointer appearance-none truncate"
            >
              <option value="default" className="bg-[#04172B] text-white">Recomendados</option>
              <option value="name-asc" className="bg-[#04172B] text-white">Nome (A - Z)</option>
              <option value="price-asc" className="bg-[#04172B] text-white">Menor Preço</option>
              <option value="price-desc" className="bg-[#04172B] text-white">Maior Preço</option>
            </select>
          </div>

          {/* Hold Level filter (only for styling items) */}
          <div className="relative w-full sm:w-auto inline-flex items-center">
            <select
              value={holdFilter ?? ''}
              aria-label="Filtrar por nível de fixação"
              onChange={(e) => {
                const val = e.target.value;
                onHoldFilterChange(val ? (parseInt(val) as HoldLevel) : null);
              }}
              className="w-full px-2.5 py-2 rounded-lg bg-[#082E5A]/40 border border-white/10 hover:border-white/20 text-xs text-[#F5F8FC] font-medium focus:outline-none focus:border-[#42C8FF] cursor-pointer truncate"
            >
              <option value="" className="bg-[#04172B] text-white">Fixação: Todas</option>
              <option value="1" className="bg-[#04172B] text-white">Fixação: 1 (Leve)</option>
              <option value="2" className="bg-[#04172B] text-white">Fixação: 2 (Média)</option>
              <option value="4" className="bg-[#04172B] text-white">Fixação: 4 (Extra)</option>
            </select>
          </div>

          {/* Shine Level filter */}
          <div className="relative w-full sm:w-auto inline-flex items-center">
            <select
              value={shineFilter ?? ''}
              aria-label="Filtrar por nível de brilho"
              onChange={(e) => {
                const val = e.target.value;
                onShineFilterChange(val ? (parseInt(val) as ShineLevel) : null);
              }}
              className="w-full px-2.5 py-2 rounded-lg bg-[#082E5A]/40 border border-white/10 hover:border-white/20 text-xs text-[#F5F8FC] font-medium focus:outline-none focus:border-[#42C8FF] cursor-pointer truncate"
            >
              <option value="" className="bg-[#04172B] text-white">Brilho: Todos</option>
              <option value="1" className="bg-[#04172B] text-white">Brilho: 1 (Matte)</option>
              <option value="2" className="bg-[#04172B] text-white">Brilho: 2 (Natural)</option>
              <option value="4" className="bg-[#04172B] text-white">Brilho: 4 (Intenso)</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {isAnyFilterActive && (
            <button
              onClick={onResetFilters}
              className="btn-3d btn-3d-red w-full sm:w-auto col-span-2 sm:col-span-1 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-[#AAB8CA] pt-1">
        <span>
          Mostrando <strong className="text-[#F5F8FC] tabular-nums">{totalFiltered}</strong> {totalFiltered === 1 ? 'produto' : 'produtos'}
        </span>
        {isAnyFilterActive && (
          <span className="text-[#42C8FF] text-[11px]">
            Filtros ativos
          </span>
        )}
      </div>
    </div>
  );
};
