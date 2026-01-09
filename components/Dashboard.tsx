
import React from 'react';
import { AppView } from '../types';
import { DownloadIcon, VideoIcon, CpuIcon } from './Icons';
import { sounds } from '../services/soundService';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const menuItems = [
    {
      id: AppView.SGC_DESCARGABLE,
      title: 'SGC DESCARGABLE',
      description: 'Documentación oficial, formatos y manuales operativos bajo norma ISO/IEC 17025.',
      icon: <DownloadIcon className="w-14 h-14" />,
      color: 'text-[#002d62]',
      neonClass: 'hover-neon-blue neon-border-blue',
      accent: 'bg-[#002d62]/5',
      glowColor: '#00599a'
    },
    {
      id: AppView.CAPACITACIONES,
      title: 'CAPACITACIONES',
      description: 'Material audiovisual de alta calidad y simulaciones dinámicas para entrenamiento técnico.',
      icon: <VideoIcon className="w-14 h-14" />,
      color: 'text-[#e30613]',
      neonClass: 'hover-neon-red neon-border-red',
      accent: 'bg-[#e30613]/5',
      glowColor: '#e30613'
    },
    {
      id: AppView.SGC_DINAMICO,
      title: 'SGC DINÁMICO',
      description: 'Asistente inteligente VALIA para control de calidad, análisis de riesgos y asistencia 24/7.',
      icon: <CpuIcon className="w-14 h-14" />,
      color: 'text-[#f47920]',
      neonClass: 'hover-neon-orange neon-border-orange',
      accent: 'bg-[#f47920]/5',
      glowColor: '#f47920'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-orbitron font-bold text-[#002d62] mb-4 neon-text-blue">CENTRO OPERATIVO SGC</h2>
        <div className="flex justify-center items-center space-x-4">
           <div className="h-[2px] w-12 bg-[#e30613] shadow-[0_0_8px_#e30613]"></div>
           <div className="h-[3px] w-48 bg-gradient-to-r from-[#e30613] via-[#002d62] to-[#f47920] rounded-full shadow-lg"></div>
           <div className="h-[2px] w-12 bg-[#f47920] shadow-[0_0_8px_#f47920]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onMouseEnter={() => sounds.playHover()}
            onClick={() => { sounds.playClick(); onViewChange(item.id); }}
            className={`flex flex-col items-center text-center p-12 glass-panel-light border-2 rounded-[3rem] transition-all duration-500 group ${item.neonClass} ${item.color} hover:scale-[1.05] hover:shadow-2xl shadow-slate-200`}
          >
            <div className={`mb-10 p-8 rounded-[2rem] ${item.accent} transform group-hover:rotate-6 transition-all duration-500 relative`}>
              <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: item.glowColor }}></div>
              <div className="relative">
                {item.icon}
              </div>
            </div>
            <h3 className="text-2xl font-orbitron font-bold mb-5 tracking-tight group-hover:scale-105 transition-transform">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold px-2">
              {item.description}
            </p>
            <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
              <span className="px-6 py-2 bg-[#002d62] text-white text-[10px] font-orbitron font-black uppercase tracking-[0.4em] rounded-full shadow-lg">
                ACCEDER
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
