/**
 * Telemetria e Monitoramento de Estabilidade Client-Side
 * Permite capturar e registrar erros sem expor dados sensíveis ou quebrar a navegação
 */

interface ErrorReport {
  message: string;
  source?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

class TelemetryService {
  private isInitialized = false;

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Captura global de exceções não tratadas
    window.addEventListener('error', (event: ErrorEvent) => {
      this.logError({
        message: event.message || 'Erro de execução desconhecido',
        source: `${event.filename}:${event.lineno}:${event.colno}`,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    });

    // Captura de Promises rejeitadas sem catch
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.logError({
        message: event.reason instanceof Error ? event.reason.message : String(event.reason),
        source: 'unhandledrejection',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    });
  }

  private logError(report: ErrorReport) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Telemetry Log]:', report.message, report.source);
    }
    // Caso o proprietário integre Sentry/Datadog futuramente, este método despacha o evento
    window.dispatchEvent(new CustomEvent('app_telemetry_error', { detail: report }));
  }
}

export const telemetry = new TelemetryService();
