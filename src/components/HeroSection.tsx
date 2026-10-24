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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] h-[220px] bg-[#1687FF]/10 blur-[100px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Editorial Sub-kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082E5A]/80 border border-[#42C8FF]/30 text-xs font-semibold tracking-wider text-[#42C8FF] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#42C8FF]" />
          <span>{STORE_INFO.name.toUpperCase()}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F8FC] uppercase leading-tight max-w-3xl">
          PRODUTOS PROFISSIONAIS. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1687FF] to-[#42C8FF]">RESULTADOS DE RESPEITO.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-[#AAB8CA] max-w-2xl leading-relaxed font-normal">
          {STORE_INFO.subtitle}
        </p>

        {/* Call to action */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToCatalog}
            className="btn-3d btn-3d-blue w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explorar Produtos</span>
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Micro highlights (clean metadata, no fake claims) */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5 w-full grid grid-cols-3 gap-1.5 sm:gap-6 text-center text-[10px] xs:text-xs text-[#AAB8CA]">
          <div className="px-1">
            <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] tabular-nums">17</span>
            <span>Itens Disponíveis</span>
          </div>
          <div className="px-1">
            <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] leading-tight">Barba & Cabelo</span>
            <span>Uso Profissional</span>
          </div>
          <div className="px-1">
            <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] leading-tight">WhatsApp Direto</span>
            <span>Atendimento</span>
          </div>
        </div>
      </div>
    </section>
  );
};
