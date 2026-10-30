import React from 'react';
import { MessageSquare, ArrowUp, ShieldCheck, FileText, Cookie, AlertCircle } from 'lucide-react';
import { STORE_INFO, MainCategory } from '../data/products';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onSelectCategory: (cat: MainCategory | 'TODOS') => void;
  onOpenLegal: (doc: LegalDocType) => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenLegal,
  onOpenCookieSettings,
}) => {
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
      <h2 className="sr-only">Informações da Barbearia, Termos Legais e Rodapé</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#082E5A] ring-1 ring-[#42C8FF]/40 flex items-center justify-center shrink-0">
                <img
                  src={STORE_INFO.logo}
                  alt="Logo oficial da Arllon Fernandes Barbearia"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-[#F5F8FC] uppercase tracking-wide">
                  ARLLON FERNANDES
                </span>
                <span className="text-sm font-black uppercase text-[#42C8FF] tracking-[0.34em] -mr-[0.34em] mt-0.5">
                  BARBEARIA
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#AAB8CA]">
              {STORE_INFO.subtitle} Linha de produtos profissionais selecionados para barbearias e cuidados diários de alta performance.
            </p>
          </div>

          {/* Catalog Navigation shortcuts */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Navegar no Catálogo
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('TODOS')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer text-left"
                >
                  Todos os Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('CABELO')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer text-left"
                >
                  Linha Cabelo (Géis, Pastas, Ceras, Cremes, Shampoos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('BARBA')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer text-left"
                >
                  Linha Barba (Balms e Óleos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('ACESSÓRIOS')}
                  className="hover:text-[#42C8FF] transition-colors cursor-pointer text-left"
                >
                  Acessórios (Esponjas Nudred & Casca de Ovo)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact via WhatsApp */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
              Atendimento Direto
            </h3>
            <p className="text-xs text-[#AAB8CA]">
              Dúvidas ou pedidos especiais? Fale diretamente com a equipe pelo canal oficial de WhatsApp.
            </p>
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir conversa no WhatsApp oficial da Arllon Fernandes Barbearia"
              className="btn-3d btn-3d-navy inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#35D49A]" />
              <span>Contato via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Informative Disclaimer on Prices, Hours and Status */}
        <div className="mt-8 p-3.5 rounded-xl bg-[#082E5A]/30 border border-white/10 flex items-start sm:items-center gap-3 text-xs text-[#AAB8CA]">
          <AlertCircle className="w-4 h-4 text-[#42C8FF] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-[#F5F8FC]">Aviso Informativo:</strong> Horários de atendimento, preços e disponibilidade de estoque são de caráter informativo e promocional, sujeitos a confirmação final com o atendente via WhatsApp.
          </p>
        </div>

        {/* Legal Links (LGPD, Termos, Cookies, Preferências) */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs">
          <button
            onClick={() => onOpenLegal('privacidade')}
            className="flex items-center gap-1.5 text-[#AAB8CA] hover:text-[#42C8FF] transition-colors cursor-pointer font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#42C8FF]" />
            <span>Política de Privacidade</span>
          </button>

          <button
            onClick={() => onOpenLegal('termos')}
            className="flex items-center gap-1.5 text-[#AAB8CA] hover:text-[#42C8FF] transition-colors cursor-pointer font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-[#42C8FF]" />
            <span>Termos de Uso</span>
          </button>

          <button
            onClick={() => onOpenLegal('cookies')}
            className="flex items-center gap-1.5 text-[#AAB8CA] hover:text-[#42C8FF] transition-colors cursor-pointer font-medium"
          >
            <Cookie className="w-3.5 h-3.5 text-[#42C8FF]" />
            <span>Política de Cookies</span>
          </button>

          <button
            onClick={onOpenCookieSettings}
            className="text-[11px] text-[#AAB8CA]/70 hover:text-white underline cursor-pointer"
          >
            Preferências de Cookies
          </button>
        </div>

        {/* Sub-footer copyright & back to top */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AAB8CA]/80">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. Todos os direitos reservados.</p>
          <button
            onClick={scrollToTop}
            aria-label="Voltar para o topo da página"
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
