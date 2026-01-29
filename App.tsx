
import React, { useState, useEffect, Suspense } from 'react';
import { AppView } from './types';
import { QuimpetrolLogo, MetrologiaFacilLogo, ValiaLogo } from './components/Icons';
import Login from './components/Login';
import { sounds } from './services/soundService';

// Implement Code Splitting: Lazy load heavy components to reduce initial bundle size
// and defer loading of large dependencies (e.g., geminiService) until needed.
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const SgcDescargable = React.lazy(() => import('./components/SgcDescargable'));
const Capacitaciones = React.lazy(() => import('./components/Capacitaciones'));
const SgcDinamico = React.lazy(() => import('./components/SgcDinamico'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView(AppView.DASHBOARD);
      sounds.playSuccess();
    } else {
      setCurrentView(AppView.LOGIN);
    }
  }, [isAuthenticated]);

  const handleViewChange = (view: AppView) => {
    // Solo permitir cambio de vista si el usuario está autenticado o si va al login
    if (isAuthenticated || view === AppView.LOGIN) {
      sounds.playTransition();
      setCurrentView(view);
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    sounds.setMuted(newMuteState);
    if (!newMuteState) sounds.playClick();
  };

  const renderView = () => {
    // Guardia de seguridad: si no está autenticado, forzar vista de login
    if (!isAuthenticated) {
      return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    switch (currentView) {
      case AppView.LOGIN:
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={handleViewChange} />;
      case AppView.SGC_DESCARGABLE:
        return <SgcDescargable onBack={() => handleViewChange(AppView.DASHBOARD)} />;
      case AppView.CAPACITACIONES:
        return <Capacitaciones onBack={() => handleViewChange(AppView.DASHBOARD)} />;
      case AppView.SGC_DINAMICO:
        return <SgcDinamico onBack={() => handleViewChange(AppView.DASHBOARD)} />;
      default:
        return <Dashboard onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50">
      {/* Background set to a clean slate-50, decorative colors removed as requested */}

      {/* Header with Sharp Neon Palette - Left branding removed as requested */}
      <header className="px-6 py-4 flex justify-end items-center bg-white sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b-2 border-slate-100">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleMute}
            className={`p-3 rounded-full transition-all border ${isMuted ? 'border-red-400 text-red-400 bg-red-50' : 'border-slate-200 text-[#002d62] bg-white hover:bg-slate-50 shadow-sm'}`}
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            )}
          </button>
          {isAuthenticated && (
            <button 
              onClick={() => { sounds.playClick(); setIsAuthenticated(false); }}
              className="px-6 py-3 text-[10px] font-orbitron font-black text-white bg-[#002d62] rounded-full hover:bg-[#e30613] transition-all transform hover:scale-105 active:scale-95 shadow-md uppercase tracking-widest"
            >
              TERMINAR SESIÓN
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col container mx-auto px-4 py-16 relative">
        <Suspense fallback={
          <div className="flex justify-center items-center h-full min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f47920]"></div>
          </div>
        }>
          {renderView()}
        </Suspense>
      </main>

      {/* Footer with Minimal Accents */}
      <footer className="py-12 glass-panel-light border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center space-x-3 mb-4">
              <MetrologiaFacilLogo className="w-8 h-8" />
              <p className="text-[12px] text-slate-400 font-orbitron uppercase tracking-[0.4em]">
                Arquitectura de Calidad <span className="text-[#002d62] font-black">Metrología Fácil</span>
              </p>
            </div>
            <p className="text-[13px] text-slate-500 font-bold flex items-center justify-center md:justify-start">
               <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_green]"></span>
               Ing. Luis Vieira & Nathalia Roa • © 2025
            </p>
          </div>
          <div className="flex space-x-12">
            <div className={`flex flex-col items-center group ${isAuthenticated ? 'cursor-pointer' : ''}`} onMouseEnter={() => isAuthenticated && sounds.playHover()}>
              <QuimpetrolLogo className="w-20 h-20 transition-all duration-300 group-hover:scale-110" />
              <div className="h-1 w-0 group-hover:w-full bg-[#e30613] transition-all duration-300 mt-2"></div>
            </div>
            <div className={`flex flex-col items-center group ${isAuthenticated ? 'cursor-pointer' : ''}`} onMouseEnter={() => isAuthenticated && sounds.playHover()}>
              <ValiaLogo className="w-20 h-20 transition-all duration-300 group-hover:scale-110" />
              <div className="h-1 w-0 group-hover:w-full bg-[#f47920] transition-all duration-300 mt-2"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
