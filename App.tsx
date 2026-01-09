
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { DropletIcon, FactoryIcon } from './components/Icons';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SgcDescargable from './components/SgcDescargable';
import Capacitaciones from './components/Capacitaciones';
import SgcDinamico from './components/SgcDinamico';
import { sounds } from './services/soundService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView(AppView.DASHBOARD);
      sounds.playSuccess();
    }
  }, [isAuthenticated]);

  const handleViewChange = (view: AppView) => {
    sounds.playTransition();
    setCurrentView(view);
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    sounds.setMuted(newMuteState);
    if (!newMuteState) sounds.playClick();
  };

  const renderView = () => {
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
    <div className="min-h-screen relative flex flex-col">
      {/* Enhanced Neon Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-20 left-1/3 w-32 h-32 bg-yellow-400/5 rounded-full blur-[60px] animate-pulse"></div>
      </div>

      {/* Header with Sharp Neon Palette */}
      <header className="px-6 py-4 flex justify-between items-center glass-panel-light sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,45,98,0.08)] border-b-2 border-[#002d62]/20">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e30613] to-[#00599a] rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <DropletIcon className="relative w-11 h-11 text-[#e30613] svg-glow-red" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00599a] rounded-full border-2 border-white flex items-center justify-center shadow-[0_0_10px_rgba(0,89,154,0.6)]">
               <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-orbitron font-bold tracking-tighter text-[#002d62] neon-text-blue">
              QUIMPETROL <span className="text-[#e30613] neon-text-red">PERÚ</span>
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-orbitron text-[#00599a] tracking-[0.3em] font-black uppercase">ISO/IEC 17025</span>
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#e30613] to-[#f47920]"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleMute}
            className={`p-2 rounded-full transition-all border ${isMuted ? 'border-red-400 text-red-400 bg-red-50' : 'border-[#002d62] text-[#002d62] bg-blue-50'}`}
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
              className="px-6 py-2.5 text-[10px] font-orbitron font-black text-white bg-[#002d62] rounded-full hover:bg-[#e30613] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,45,98,0.3)] hover:shadow-[0_0_15px_rgba(227,6,19,0.4)] uppercase tracking-widest"
            >
              TERMINAR SESIÓN
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col container mx-auto px-4 py-10 relative">
        {renderView()}
      </main>

      {/* Footer with Glowing Accents */}
      <footer className="py-8 glass-panel-light border-t-2 border-[#002d62]/10 bg-white/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] text-slate-400 font-orbitron uppercase tracking-[0.4em] mb-2">
              Arquitectura de Calidad <span className="text-[#00599a] font-black neon-text-blue">Metrología Fácil</span>
            </p>
            <p className="text-[11px] text-slate-600 font-bold flex items-center justify-center md:justify-start">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_5px_green]"></span>
               Ing. Luis Vieira & Nathalia Roa • © 2025
            </p>
          </div>
          <div className="flex space-x-8">
            <div className="flex flex-col items-center group cursor-pointer" onMouseEnter={() => sounds.playHover()}>
              <span className="text-[#e30613] font-orbitron font-black text-xl neon-text-red transition-all group-hover:scale-110">Q.P</span>
              <div className="h-1 w-0 group-hover:w-full bg-[#e30613] transition-all duration-300 shadow-[0_0_8px_#e30613]"></div>
            </div>
            <div className="flex flex-col items-center group cursor-pointer" onMouseEnter={() => sounds.playHover()}>
              <span className="text-[#f47920] font-orbitron font-black text-xl neon-text-orange transition-all group-hover:scale-110">M.F</span>
              <div className="h-1 w-0 group-hover:w-full bg-[#f47920] transition-all duration-300 shadow-[0_0_8px_#f47920]"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
