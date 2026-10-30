import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Sparkles, Pause, Play } from 'lucide-react';

const VIDEO_URL = 'https://yourimageshare.com/ib/CufIM3MjZf.mp4';

export const HeroSection: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Acessibilidade WCAG 2.1 AA: Respeitar prefers-reduced-motion automaticamente
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#04172B] pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 border-b border-[#082E5A]/40 min-h-[460px] sm:min-h-[520px] flex flex-col justify-center items-center">
      {/* Background Video Layer with aesthetic biosite gradient transitions - completely silent and muted */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!hasError ? (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#04172B]" />
        )}

        {/* Top gradient overlay blending into biosite background */}
        <div 
          className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#04172B] via-[#04172B]/85 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Bottom gradient overlay blending into biosite background */}
        <div 
          className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#04172B] via-[#04172B]/90 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Side lateral vignetting for clean aesthetic framing */}
        <div 
          className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#04172B] via-[#04172B]/60 to-transparent pointer-events-none" 
          aria-hidden="true"
        />
        <div 
          className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#04172B] via-[#04172B]/60 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Central dark radial backdrop to guarantee optimal typography legibility */}
        <div 
          className="absolute inset-0 bg-radial from-[#04172B]/50 via-[#04172B]/75 to-[#04172B]/95 pointer-events-none" 
          aria-hidden="true"
        />
      </div>

      {/* Main Content (Eyebrow, Headline, Subtitle, CTA Button, and Highlights - all centered together) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow matching the reference design */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082E5A]/60 border border-[#42C8FF]/35 text-[#42C8FF] text-xs sm:text-sm font-bold tracking-wider uppercase mb-3.5 sm:mb-4 shadow-[0_0_15px_rgba(66,200,255,0.18)] backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#42C8FF] fill-[#42C8FF]/20" />
          <span>CATÁLOGO DE PRODUTOS</span>
        </div>

        {/* Headline formatted exactly as requested and styled matching reference image */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F8FC] leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] max-w-3xl">
          <span className="block">PRODUTOS PROFISSIONAIS.</span>
          <span className="block mt-1">
            RESULTADOS DE <span className="text-[#42C8FF] drop-shadow-[0_0_24px_rgba(66,200,255,0.6)]">RESPEITO.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#D4DEEB] max-w-xl mx-auto font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          Encontre os produtos certos para modelar, cuidar e transformar cada detalhe do visual.
        </p>

        {/* Elevated Call to Action: Button right under subtitle with sporadic razor blade shimmer effect */}
        <div className="mt-6 sm:mt-8 w-full sm:w-auto flex justify-center">
          <button
            type="button"
            onClick={scrollToCatalog}
            className="group relative overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer bg-gradient-to-r from-[#0C325E] via-[#0E4788] to-[#1687FF] text-[#F5F8FC] border border-[#42C8FF]/60 shadow-[0_0_25px_rgba(22,135,255,0.45)] hover:shadow-[0_0_35px_rgba(66,200,255,0.7)] hover:border-[#42C8FF] active:scale-[0.98] transition-all duration-200"
          >
            {/* Sporadic razor / blade light ray sweep across the button */}
            <div 
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-blade-sweep" 
              aria-hidden="true"
            />
            <span className="relative z-10">EXPLORAR PRODUTOS</span>
            <ArrowDown className="relative z-10 w-4 h-4 stroke-[2.5] text-white transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Centered Highlights ("Itens Disponíveis", "Uso Profissional", "Atendimento Direto") */}
        <div className="w-full max-w-lg mx-auto mt-8 sm:mt-10 pt-6 border-t border-white/10 flex justify-center">
          <div className="w-full grid grid-cols-3 gap-2 sm:gap-6 text-center text-[10px] xs:text-xs text-[#AAB8CA]">
            <div className="flex flex-col items-center justify-center px-1">
              <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] tabular-nums">17</span>
              <span className="mt-0.5">Itens Disponíveis</span>
            </div>
            <div className="flex flex-col items-center justify-center px-1">
              <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] leading-tight">Barba & Cabelo</span>
              <span className="mt-0.5">Uso Profissional</span>
            </div>
            <div className="flex flex-col items-center justify-center px-1">
              <span className="block font-bold text-xs xs:text-sm sm:text-base text-[#F5F8FC] leading-tight">WhatsApp</span>
              <span className="mt-0.5">Atendimento Direto</span>
            </div>
          </div>
        </div>

        {/* Acessibilidade WCAG: Controle para pausar/reproduzir animação de fundo */}
        {!hasError && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
              title={isPlaying ? 'Pausar vídeo de fundo (acessibilidade)' : 'Reproduzir vídeo de fundo'}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04172B]/80 hover:bg-[#082E5A] border border-white/10 text-[11px] text-[#AAB8CA] hover:text-[#42C8FF] transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#AAB8CA]" />
                  <span>Pausar animação de fundo</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#42C8FF] fill-current" />
                  <span>Reproduzir animação</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
