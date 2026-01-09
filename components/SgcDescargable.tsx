
import React from 'react';
import { DownloadIcon } from './Icons';

interface Props {
  onBack: () => void;
}

const SgcDescargable: React.FC<Props> = ({ onBack }) => {
  const documents = [
    { id: '1', name: 'Manual de Calidad ISO/IEC 17025:2017 - QP', category: 'Manual', lastUpdated: '2024-12-01', size: '4.2 MB' },
    { id: '2', name: 'Procedimiento de Inspección de Tanques de Combustible', category: 'Operativo', lastUpdated: '2025-01-15', size: '2.1 MB' },
    { id: '3', name: 'Formato de Control Metrológico de Precisión', category: 'Formato', lastUpdated: '2024-11-20', size: '0.8 MB' },
    { id: '4', name: 'Política de Calidad y Competencia Técnica Quimpetrol', category: 'Institucional', lastUpdated: '2025-02-01', size: '1.5 MB' },
    { id: '5', name: 'Guía de Manejo Seguro de Hidrocarburos', category: 'Seguridad', lastUpdated: '2024-10-10', size: '3.7 MB' },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <button onClick={onBack} className="mb-8 text-xs font-orbitron font-bold text-[#00599a] hover:text-[#e30613] flex items-center group transition-colors">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> VOLVER AL PANEL DE CONTROL
      </button>
      
      <div className="glass-panel-light rounded-3xl p-10 neon-border-blue border-t-8 border-t-[#002d62] shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-[#002d62] mb-2 flex items-center">
              <DownloadIcon className="w-8 h-8 mr-4 text-[#e30613]" />
              CENTRO DE DOCUMENTACIÓN
            </h2>
            <p className="text-slate-500 font-medium text-sm">Biblioteca oficial del Sistema de Gestión de Calidad bajo ISO/IEC 17025.</p>
          </div>
          <div className="hidden md:block">
             <div className="px-4 py-2 bg-slate-100 rounded-full border border-slate-200 text-[10px] font-orbitron font-bold text-[#002d62]">
               V.2.5.0 SGC
             </div>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#00599a] hover:shadow-lg transition-all">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#00599a]/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#002d62]"></div>
                </div>
                <div>
                  <h4 className="text-[#002d62] font-bold group-hover:text-[#00599a] transition-colors">{doc.name}</h4>
                  <div className="flex space-x-4 mt-1 items-center">
                    <span className="text-[10px] text-[#e30613] font-orbitron font-black uppercase tracking-widest">{doc.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">VERSIÓN: {doc.lastUpdated}</span>
                    <span className="text-[10px] text-slate-300 font-bold">[{doc.size}]</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#002d62] p-3 rounded-xl text-white hover:bg-[#e30613] hover:scale-110 transition-all shadow-lg active:scale-95">
                <DownloadIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-center">
           <p className="text-[10px] text-slate-400 font-orbitron tracking-widest">
             SGC DESARROLLADO POR <span className="text-[#00599a] font-black">METROLOGÍA FÁCIL</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default SgcDescargable;