
import React, { useState } from 'react';
import { QuimpetrolLogo, ValiaLogo, EyeIcon, EyeOffIcon } from './Icons';
import { sounds } from '../services/soundService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (password === 'SGC2025') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const togglePasswordVisibility = () => {
    sounds.playHover();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel-light p-10 rounded-[3rem] border-t-[8px] border-t-[#e30613] shadow-[0_40px_80px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-500 border-x border-b border-white">
        {/* Clean top neon line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#e30613] opacity-40 shadow-[0_0_20px_#e30613]"></div>
        
        <div className="text-center mb-12">
          <div className="relative inline-block mb-10 group">
            {/* Minimal white glow to separate from background */}
            <div className="absolute -inset-24 bg-white rounded-full blur-[80px] opacity-100 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Even LARGER Logo Container */}
            <div className="relative w-80 h-80 rounded-full bg-white shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-slate-50 transition-all duration-700 group-hover:scale-105 flex items-center justify-center overflow-hidden">
              {/* Very faint Valia Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none transform -rotate-12 scale-150 group-hover:rotate-0 transition-all duration-1000">
                <ValiaLogo className="w-full h-full" />
              </div>
              
              {/* MAXIMIZED Central Quimpetrol Logo */}
              <div className="relative z-10 p-4">
                <QuimpetrolLogo className="w-72 h-72 drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:scale-110" />
              </div>
              
              {/* Scaled Valia Badge - Larger and cleaner */}
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-white rounded-full p-4 border border-slate-100 shadow-xl group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                 <ValiaLogo className="w-full h-full" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-orbitron font-bold text-[#002d62] mb-4 neon-text-blue tracking-tighter uppercase">ACCESO AUTORIZADO</h2>
          <div className="flex justify-center mb-10">
            <div className="h-2.5 w-48 bg-gradient-to-r from-[#e30613] via-[#002d62] to-[#f47920] rounded-full shadow-sm"></div>
          </div>
          
          <div className="p-8 bg-white/50 rounded-[2.5rem] border border-slate-100 shadow-sm backdrop-blur-sm">
            <p className="text-[15px] text-slate-700 leading-relaxed font-semibold">
              Sistema de Gestión de Calidad <br/> 
              <span className="text-[#e30613] font-black uppercase tracking-wider neon-text-red">Quimpetrol Perú</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-orbitron text-slate-400 font-black tracking-[0.4em] uppercase">CREDENCIAL DE ACCESO</label>
              <div className="flex space-x-2">
                 <div className="w-2 h-2 rounded-full bg-[#002d62] animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-[#e30613] animate-pulse delay-75"></div>
              </div>
            </div>
            
            <div className="relative group">
              <div className={`absolute -inset-1 bg-[#002d62] rounded-2xl blur opacity-0 group-hover:opacity-5 transition duration-300`}></div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => sounds.playHover()}
                  className={`w-full bg-white border-2 ${error ? 'border-[#e30613] animate-shake' : 'border-slate-100'} rounded-2xl p-6 pr-16 text-[#002d62] font-black text-center focus:outline-none focus:border-[#002d62] transition-all shadow-sm placeholder:text-slate-200 tracking-[0.5em] text-xl`}
                  placeholder="••••••••"
                />
                
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-[#002d62] transition-colors"
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon className="w-8 h-8" /> : <EyeIcon className="w-8 h-8" />}
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            onMouseEnter={() => sounds.playHover()}
            className="w-full bg-[#002d62] hover:bg-[#003e85] text-white font-orbitron font-black py-7 rounded-2xl transition-all shadow-[0_20px_50px_rgba(0,45,98,0.15)] active:scale-95 hover:translate-y-[-4px] flex items-center justify-center group relative overflow-hidden uppercase tracking-[0.3em] text-sm"
          >
            <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
            INGRESAR AL SISTEMA
            <span className="ml-4 group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
          </button>
        </form>
        
        {error && (
          <div className="mt-8 flex items-center justify-center space-x-4 text-[#e30613] animate-pulse">
            <div className="h-[2px] w-6 bg-[#e30613]"></div>
            <p className="text-[11px] font-orbitron font-black uppercase tracking-[0.4em]">ACCESO RESTRINGIDO</p>
            <div className="h-[2px] w-6 bg-[#e30613]"></div>
          </div>
        )}
        
        <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col items-center">
          <p className="text-[11px] text-slate-400 font-orbitron tracking-[0.4em] font-black uppercase flex items-center">
            DESARROLLADO POR <span className="text-[#002d62] ml-2 font-black">METROLOGÍA FÁCIL</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
