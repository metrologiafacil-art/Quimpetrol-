
import React, { useState } from 'react';
import { FactoryIcon, DropletIcon } from './Icons';
import { sounds } from '../services/soundService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
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

  return (
    <div className="flex-grow flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel-light p-10 rounded-[2.5rem] neon-border-blue border-t-[6px] border-t-[#e30613] shadow-2xl relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#e30613]/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#00599a]/5 rounded-full blur-2xl"></div>
        
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-[#f47920]/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative p-6 rounded-full bg-white shadow-[0_0_20px_rgba(244,121,32,0.2)] border border-[#f47920]/20">
              <FactoryIcon className="w-16 h-16 text-[#f47920] svg-glow-orange" />
              <div className="absolute -bottom-1 right-0 w-8 h-8 bg-[#002d62] rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_10px_rgba(0,45,98,0.5)]">
                 <DropletIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-orbitron font-bold text-[#002d62] mb-3 neon-text-blue">BIENVENIDO</h2>
          <div className="flex justify-center mb-8">
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#e30613] to-[#f47920] rounded-full shadow-[0_0_10px_rgba(227,6,19,0.4)]"></div>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
            <p className="text-sm text-slate-700 leading-relaxed font-semibold">
              Sistema de Gestión de Calidad <br/> 
              <span className="text-[#e30613] font-black uppercase tracking-wider neon-text-red">Quimpetrol Perú</span>
            </p>
            <div className="mt-5 pt-5 border-t border-slate-200 flex flex-col items-center">
              <p className="text-[10px] text-slate-400 font-orbitron tracking-[0.3em] font-black uppercase mb-2">
                DESARROLLO POR <span className="text-[#00599a]">METROLOGÍA FÁCIL</span>
              </p>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm" onMouseEnter={() => sounds.playHover()}>Ing. Luis Vieira</span>
                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm" onMouseEnter={() => sounds.playHover()}>Nathalia Roa</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-orbitron text-slate-400 font-black tracking-[0.4em] px-2 uppercase">CREDENCIAL DE ACCESO</label>
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${error ? 'from-red-600 to-red-400' : 'from-[#00599a] to-[#002d62]'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => sounds.playHover()}
                className={`relative w-full bg-white border-2 ${error ? 'border-[#e30613] animate-shake' : 'border-slate-100'} rounded-2xl p-5 text-[#002d62] font-black text-center focus:outline-none focus:border-[#00599a] focus:shadow-[0_0_20px_rgba(0,89,154,0.3)] transition-all shadow-inner placeholder:text-slate-300 tracking-[0.5em]`}
                placeholder="••••••••"
              />
              {error && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                   <div className="w-2.5 h-2.5 bg-[#e30613] rounded-full shadow-[0_0_8px_#e30613] animate-ping"></div>
                </div>
              )}
            </div>
          </div>
          
          <button 
            type="submit"
            onMouseEnter={() => sounds.playHover()}
            className="w-full bg-[#002d62] hover:bg-[#00599a] text-white font-orbitron font-black py-5 rounded-2xl transition-all shadow-[0_10px_25px_rgba(0,45,98,0.3)] active:scale-95 hover:translate-y-[-3px] flex items-center justify-center group relative overflow-hidden uppercase tracking-[0.2em]"
          >
            <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
            INGRESAR AL SGC
            <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </form>
        
        {error && (
          <div className="mt-8 flex items-center justify-center space-x-3 text-[#e30613] animate-pulse">
            <div className="h-[2px] w-4 bg-[#e30613]"></div>
            <p className="text-[10px] font-orbitron font-black uppercase tracking-[0.3em]">ACCESO RESTRINGIDO</p>
            <div className="h-[2px] w-4 bg-[#e30613]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
