import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenCookiePolicy: () => void;
  isOpenExplicitly?: boolean;
  onCloseExplicit?: () => void;
}

const STORAGE_KEY = 'arllon_cookie_consent';

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenCookiePolicy,
  isOpenExplicitly = false,
  onCloseExplicit,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpenExplicitly) {
      setIsVisible(true);
      return;
    }

    try {
      const savedConsent = localStorage.getItem(STORAGE_KEY);
      if (!savedConsent) {
        // Show after a tiny delay for smooth appearance
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In private browsing mode or storage blocked
    }
  }, [isOpenExplicitly]);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'all');
    } catch {}
    setIsVisible(false);
    if (onCloseExplicit) onCloseExplicit();
    // Dispatch custom event for tracking listeners if configured in the future
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: 'all' }));
  };

  const handleAcceptEssentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'essential');
    } catch {}
    setIsVisible(false);
    if (onCloseExplicit) onCloseExplicit();
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: 'essential' }));
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Aviso de Privacidade e Cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl bg-[#04172B]/95 backdrop-blur-md border border-[#1687FF]/50 shadow-[0_10px_35px_rgba(4,23,43,0.95)] animate-slideUp text-left"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#082E5A] border border-[#42C8FF]/30 text-[#42C8FF] shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-[#F5F8FC] uppercase tracking-wide flex items-center gap-1.5">
              <span>Sua Privacidade & Cookies</span>
            </h3>
            {isOpenExplicitly && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onCloseExplicit) onCloseExplicit();
                }}
                aria-label="Fechar configurações de cookies"
                className="text-[#AAB8CA] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-[#AAB8CA] leading-relaxed">
            Utilizamos armazenamento local estritamente necessário para o funcionamento do carrinho de compras e para lembrar suas preferências, em conformidade com a LGPD. Não utilizamos cookies invasivos de rastreamento sem o seu consentimento.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="btn-3d btn-3d-blue py-2 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
            >
              Aceitar todos
            </button>

            <button
              onClick={handleAcceptEssentialOnly}
              className="btn-3d btn-3d-navy py-2 px-3.5 rounded-xl text-xs font-semibold text-center cursor-pointer text-[#D4DEEB] hover:text-white"
            >
              Apenas essenciais
            </button>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenCookiePolicy}
              className="text-[11px] text-[#42C8FF] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ler nossa Política de Cookies e LGPD</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
