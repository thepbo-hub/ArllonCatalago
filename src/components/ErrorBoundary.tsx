import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ShoppingBag } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Registro seguro de erros sem expor dados sensíveis ou PII
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary caught error]:', error, errorInfo);
    }
  }

  private handleReload = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-[#04172B] text-[#F5F8FC] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0B2340] to-[#04172B] border border-[#1687FF]/40 shadow-2xl space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF5A65]/10 border border-[#FF5A65]/30 flex items-center justify-center text-[#FF5A65]">
              <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F5F8FC]">
                Algo inesperado ocorreu
              </h1>
              <p className="text-xs sm:text-sm text-[#AAB8CA] leading-relaxed">
                Não se preocupe: seus itens temporários no carrinho permanecem protegidos no seu navegador.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn-3d btn-3d-blue w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4 stroke-[2.4]" />
                <span>Recarregar Catálogo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                }}
                className="btn-3d btn-3d-navy w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-[#AAB8CA] hover:text-white"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tentar Novamente</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
