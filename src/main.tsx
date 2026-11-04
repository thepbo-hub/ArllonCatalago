import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { telemetry } from './utils/telemetry.ts';
import './index.css';

// Inicializa telemetria de segurança e monitoramento de falhas
telemetry.init();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
