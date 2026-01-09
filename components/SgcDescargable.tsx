
import React, { useState } from 'react';
import { DownloadIcon } from './Icons';
import { sounds } from '../services/soundService';

interface Props {
  onBack: () => void;
}

interface ManagementArea {
  id: string;
  code: string;
  title: string;
  description: string;
  color: string;
  shadowColor: string;
}

const SgcDescargable: React.FC<Props> = ({ onBack }) => {
  const [selectedArea, setSelectedArea] = useState<ManagementArea | null>(null);

  const areas: ManagementArea[] = [
    { 
      id: 'pr1', 
      code: 'PR1', 
      title: 'Gestión de dirección general', 
      description: 'Estrategia corporativa, políticas de liderazgo y objetivos de alta gerencia.',
      color: 'border-t-[#002d62]',
      shadowColor: 'rgba(0, 45, 98, 0.3)'
    },
    { 
      id: 'pr2', 
      code: 'PR2', 
      title: 'Gestión de calidad', 
      description: 'Control de procesos ISO/IEC 17025, auditorías internas y mejora continua.',
      color: 'border-t-[#e30613]',
      shadowColor: 'rgba(227, 6, 19, 0.3)'
    },
    { 
      id: 'pr3', 
      code: 'PR3', 
      title: 'Gestión comercial', 
      description: 'Relación con clientes, ofertas de servicio y contratos de inspección.',
      color: 'border-t-[#f47920]',
      shadowColor: 'rgba(244, 121, 32, 0.3)'
    },
    { 
      id: 'pr4', 
      code: 'PR4', 
      title: 'Gestión integrada de laboratorios', 
      description: 'Operaciones técnicas, calibraciones y aseguramiento de validez de resultados.',
      color: 'border-t-[#00599a]',
      shadowColor: 'rgba(0, 89, 154, 0.3)'
    },
    { 
      id: 'pr5', 
      code: 'PR5', 
      title: 'Gestión de aprovisionamiento', 
      description: 'Compras técnicas, evaluación de proveedores y control de suministros.',
      color: 'border-t-[#ffc20e]',
      shadowColor: 'rgba(255, 194, 14, 0.3)'
    },
  ];

  const documents: Record<string, any[]> = {
    pr1: [
      { id: 'd1', name: 'Manual de Identidad Corporativa', type: 'PDF' },
      { id: 'd2', name: 'Plan Estratégico Quimpetrol 2025', type: 'DOCX' },
    ],
    pr2: [
      { id: 'd3', name: 'Manual de Calidad ISO 17025', type: 'PDF' },
      { id: 'd4', name: 'Formato de Acciones Correctivas', type: 'XLSX' },
    ],
    pr3: [
      { id: 'd5', name: 'Catálogo de Servicios Metrológicos', type: 'PDF' },
      { id: 'd6', name: 'Plantilla de Cotización Estándar', type: 'DOCX' },
    ],
    pr4: [
      { id: 'd7', name: 'Procedimiento Técnico de Calibración', type: 'PDF' },
      { id: 'd8', name: 'Hoja de Cálculo de Incertidumbre', type: 'XLSX' },
    ],
    pr5: [
      { id: 'd9', name: 'Criterios de Evaluación de Proveedores', type: 'PDF' },
      { id: 'd10', name: 'Registro de Recepción de Reactivos', type: 'DOCX' },
    ],
  };

  const handleAreaClick = (area: ManagementArea) => {
    sounds.playClick();
    setSelectedArea(area);
  };

  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-12">
        <button 
          onClick={selectedArea ? () => setSelectedArea(null) : onBack} 
          className="text-xs font-orbitron font-bold text-[#002d62] hover:text-[#e30613] flex items-center group transition-colors uppercase tracking-[0.2em]"
        >
          <span className="mr-3 group-hover:-translate-x-2 transition-transform">←</span> 
          {selectedArea ? 'VOLVER A ÁREAS DE GESTIÓN' : 'VOLVER AL PANEL PRINCIPAL'}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="h-[2px] w-8 bg-[#e30613]"></div>
          <span className="text-[10px] font-orbitron text-slate-400 font-black tracking-widest">SGC-QP-2025</span>
        </div>
      </div>

      {!selectedArea ? (
        <>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold text-[#002d62] mb-4">MAPA DE PROCESOS</h2>
            <p className="text-slate-500 font-semibold tracking-wide">Seleccione un área para acceder a la documentación técnica oficial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <button
                key={area.id}
                onMouseEnter={() => sounds.playHover()}
                onClick={() => handleAreaClick(area)}
                className={`flex flex-col text-left bg-white border border-slate-100 p-8 rounded-[2.5rem] border-t-8 ${area.color} transition-all duration-500 group hover:scale-[1.03] hover:shadow-2xl active:scale-95`}
                style={{ '--tw-shadow-color': area.shadowColor } as any}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl font-orbitron font-black text-slate-200 group-hover:text-slate-800 transition-colors duration-500">{area.code}</span>
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors">
                    <DownloadIcon className="w-6 h-6 text-[#002d62]" />
                  </div>
                </div>
                <h3 className="text-xl font-orbitron font-bold text-[#002d62] mb-4 leading-tight group-hover:text-[#e30613] transition-colors">{area.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed flex-grow">
                  {area.description}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-[10px] font-orbitron font-black text-[#002d62] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                  EXPLORAR ARCHIVOS <span className="ml-2">→</span>
                </div>
              </button>
            ))}
            
            {/* Branding support card */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 opacity-60">
               <p className="text-[10px] font-orbitron text-slate-400 font-black uppercase tracking-[0.4em] text-center">
                 SGC INTEGRADO <br/> <span className="text-[#002d62]">METROLOGÍA FÁCIL</span>
               </p>
            </div>
          </div>
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#002d62] to-transparent opacity-20`}></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl font-orbitron font-black text-[#002d62] border border-slate-100">
                  {selectedArea.code}
                </div>
                <div>
                  <h2 className="text-3xl font-orbitron font-bold text-[#002d62] uppercase tracking-tighter">{selectedArea.title}</h2>
                  <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest">Repositorio de Archivos Digitales</p>
                </div>
              </div>
              <div className="px-6 py-3 bg-[#002d62]/5 rounded-2xl border border-[#002d62]/10">
                <span className="text-[10px] font-orbitron font-black text-[#002d62] uppercase tracking-widest">ACTUALIZACIÓN 2025</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {documents[selectedArea.id]?.map((doc) => (
                <div key={doc.id} className="group flex items-center justify-between p-6 bg-slate-50 border border-transparent rounded-2xl hover:bg-white hover:border-[#002d62]/20 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <div className={`w-3 h-3 rounded-full ${selectedArea.id === 'pr2' ? 'bg-[#e30613]' : 'bg-[#002d62]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[#002d62] font-bold text-lg">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 font-orbitron font-black mt-1 uppercase tracking-widest">FORMATO: {doc.type}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => sounds.playClick()}
                    className="p-4 bg-white text-[#002d62] rounded-xl hover:bg-[#002d62] hover:text-white transition-all shadow-md active:scale-90 border border-slate-100"
                  >
                    <DownloadIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] font-orbitron text-slate-300 font-black uppercase tracking-[0.5em]">
                SISTEMA DE GESTIÓN QUIMPETROL PERÚ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SgcDescargable;
