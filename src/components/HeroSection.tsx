import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const HeroSection: React.FC = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04172B] via-[#082E5A]/40 to-[#04172B] pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-[#082E5A]/40">
      {/* Subtle radial ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1687FF]/10 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Editorial Sub-kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082E5A]/80 border border-[#42C8FF]/30 text-xs font-semibold tracking-wider text-[#42C8FF] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#42C8FF]" />
          <span>{STORE_INFO.name.toUpperCase()}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F8FC] uppercase leading-tight max-w-3xl">
          PRODUTOS PROFISSIONAIS. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1687FF] to-[#42C8FF]">RESULTADOS DE RESPEITO.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#AAB8CA] max-w-2xl leading-relaxed font-normal">
          {STORE_INFO.subtitle}
        </p>

        {/* Call to action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToCatalog}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#1687FF] hover:bg-[#1687FF]/90 text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(22,135,255,0.45)] hover:shadow-[0_0_32px_rgba(66,200,255,0.6)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explorar Produtos</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Micro highlights (clean metadata, no fake claims) */}
        <div className="mt-10 pt-8 border-t border-white/5 w-full grid grid-cols-3 gap-2 sm:gap-6 text-center text-xs text-[#AAB8CA]">
          <div>
            <span className="block font-bold text-sm sm:text-base text-[#F5F8FC] tabular-nums">17</span>
            <span>Itens Selecionados</span>
          </div>
          <div>
            <span className="block font-bold text-sm sm:text-base text-[#F5F8FC]">Linha Barba & Cabelo</span>
            <span>Uso Profissional</span>
          </div>
          <div>
            <span className="block font-bold text-sm sm:text-base text-[#F5F8FC]">WhatsApp Direto</span>
            <span>Atendimento Rápido</span>
          </div>
        </div>
      </div>
    </section>
  );
};
