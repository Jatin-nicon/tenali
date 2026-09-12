/**
 * MAIN ENTRY POINT - REACT APPLICATION
 *
 * Initializes React and mounts the main App component to the DOM.
 * Renders inside the proctoring + i18n + accessibility provider stack
 * (proctoring was added by origin/new; i18n/accessibility on new_f).
 */

import React from 'react'; window.React = React;
import ReactDOM from 'react-dom/client'
import App, { AuthMenu } from './App.jsx'
import { GlobalXpPanel } from './components/HintSystem/HintModal.jsx';
import { ProctorProvider } from './proctor/ProctorContext';
import './index.css';
import './kid-zone.css';
import { I18nProvider } from './lib/i18n.jsx';
import { AccessibilityProvider } from './lib/AccessibilityProvider.jsx';

import PaintMixingPlayground from './modules/PaintMixingPlayground';
import KernelPlayground from './modules/KernelPlayground';

function RootRouter() {
  const [activeModule, setActiveModule] = React.useState(() => {
    const mode = new URLSearchParams(window.location.search).get('mode');
    if (mode === 'paintmixer' || mode === 'kernel') return mode;
    return null;
  });

  if (activeModule === 'paintmixer') {
    return (
      <PaintMixingPlayground
        onBack={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('mode');
          window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
          setActiveModule(null);
        }}
        onNavigateKernel={() => {
          const url = new URL(window.location.href);
          url.searchParams.set('mode', 'kernel');
          window.history.pushState({}, '', url.pathname + url.search);
          setActiveModule('kernel');
        }}
      />
    );
  }

  if (activeModule === 'kernel') {
    return (
      <KernelPlayground
        onBack={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('mode');
          window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
          setActiveModule(null);
        }}
        onNavigateColor={() => {
          const url = new URL(window.location.href);
          url.searchParams.set('mode', 'paintmixer');
          window.history.pushState({}, '', url.pathname + url.search);
          setActiveModule('paintmixer');
        }}
      />
    );
  }

  return (
    <>
      <App />
      {/* Floating Studios Launcher */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('mode', 'paintmixer');
            window.history.pushState({}, '', url.pathname + url.search);
            setActiveModule('paintmixer');
          }}
          title="Open Paint Mixing Studio"
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #d97706 50%, #dc2641 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '0.65rem 1.15rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'transform 0.15s ease',
          }}
        >
          <span>🎨</span> Paint Studio
        </button>
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('mode', 'kernel');
            window.history.pushState({}, '', url.pathname + url.search);
            setActiveModule('kernel');
          }}
          title="Open The Zero Balance (Kernel) Studio"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #1e55be 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '0.65rem 1.15rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'transform 0.15s ease',
          }}
        >
          <span>⚖️</span> Zero Balance
        </button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <AccessibilityProvider>
        <ProctorProvider>
          <RootRouter />
          {/* Hamburger menu (login/logout) — fixed top-right, visible on every page */}
          <AuthMenu />
          <GlobalXpPanel />
        </ProctorProvider>
      </AccessibilityProvider>
    </I18nProvider>
  </React.StrictMode>,
)
