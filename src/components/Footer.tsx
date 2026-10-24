import React from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { STORE_INFO, MainCategory } from '../data/products';

interface FooterProps {
  onSelectCategory: (cat: MainCategory | 'TODOS') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: MainCategory | 'TODOS') => {
    onSelectCategory(cat);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 border-t border-[#082E5A] bg-[#04172B] text-[#AAB8CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#082E5A] ring-1 ring-[#42C8FF]/40 flex items-center justify-center shrink-0">
                <img
                  src={STORE_INFO.logo}
                  alt={STORE_INFO.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-base font-bold text-[#F5F8FC] uppercase tracking-tight">
                {STORE_INFO.name}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#AAB8CA]">
              {STORE_INFO.subtitle} Linha de produtos profissionais selecionados para barbearias e cuidados diários de alta performance.
            </p>
          </div>

          {/* Catalog Navigation shortcuts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Navegar no Catálogo
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('TODOS')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer"
                >
                  Todos os Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('CABELO')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer"
                >
                  Linha Cabelo (Géis, Pastas, Ceras, Cremes, Shampoos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('BARBA')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer"
                >
                  Linha Barba (Balms e Óleos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('ACESSÓRIOS')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer"
                >
                  Acessórios (Esponjas Nudred & Casca de Ovo)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact via WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Atendimento Direto
            </h4>
            <p className="text-xs text-[#AAB8CA]">
              Dúvidas ou pedidos especiais? Fale diretamente com a equipe pelo canal oficial de WhatsApp.
            </p>
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#082E5A] hover:bg-[#1687FF] text-[#F5F8FC] border border-[#1687FF]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#35D49A]" />
              <span>Contato via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AAB8CA]/80">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. Todos os direitos reservados.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F5F8FC] transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
