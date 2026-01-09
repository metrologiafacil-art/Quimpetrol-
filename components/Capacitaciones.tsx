
import React, { useState } from 'react';
// Fix: Add DropletIcon to the imports from ./Icons
import { VideoIcon, DropletIcon } from './Icons';
import { generateVeoVideo } from '../services/geminiService';

interface Props {
  onBack: () => void;
}

const Capacitaciones: React.FC<Props> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;

    if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }

    setLoading(true);
    setLoadingMsg('Iniciando motores de IA...');
    try {
      const messages = [
        'Modelando entorno industrial...',
        'Optimizando flujos de calidad...',
        'Sincronizando con protocolos Quimpetrol...',
        'Finalizando video de capacitación...'
      ];
      let msgIndex = 0;
      const interval = setInterval(() => {
        setLoadingMsg(messages[msgIndex % messages.length]);
        msgIndex++;
      }, 4000);

      const videoUrl = await generateVeoVideo(prompt, aspectRatio);
      setGeneratedVideo(videoUrl);
      clearInterval(interval);
    } catch (err) {
      console.error(err);
      alert('Error al generar el video. Verifique su conexión y API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      <button onClick={onBack} className="mb-8 text-xs font-orbitron font-bold text-[#00599a] hover:text-[#f47920] flex items-center group transition-colors">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> VOLVER AL PANEL
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel-light p-10 rounded-3xl neon-border-orange border-t-8 border-t-[#f47920] shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-orbitron font-bold text-[#002d62] mb-3 flex items-center">
              <VideoIcon className="w-10 h-10 mr-4 text-[#f47920]" />
              VEO TRAINING CENTER
            </h2>
            <div className="h-1 w-12 bg-[#ffc20e] mb-6"></div>
            <p className="text-slate-600 font-medium text-sm leading-relaxed">
              Sistema avanzado de generación audiovisual para capacitación técnica. Utilice IA para simular escenarios operativos de <span className="text-[#e30613] font-bold">Quimpetrol Perú</span>.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-orbitron text-slate-400 font-bold uppercase tracking-widest px-1">Escenario de Capacitación</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 bg-white border-2 border-slate-100 rounded-2xl p-5 text-slate-800 font-medium text-sm focus:outline-none focus:border-[#f47920] transition-all shadow-inner placeholder:text-slate-300 resize-none"
                placeholder="Ejem: Procedimiento seguro para la descarga de crudo en planta, enfatizando el uso de arnés y conexión a tierra..."
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-2xl">
              <div className="flex space-x-2 w-full">
                <button 
                  onClick={() => setAspectRatio("16:9")}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-orbitron font-bold transition-all ${aspectRatio === "16:9" ? 'bg-[#f47920] text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
                >
                  16:9 LANDSCAPE
                </button>
                <button 
                  onClick={() => setAspectRatio("9:16")}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-orbitron font-bold transition-all ${aspectRatio === "9:16" ? 'bg-[#f47920] text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
                >
                  9:16 PORTRAIT
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full bg-[#002d62] hover:bg-[#00599a] disabled:opacity-50 text-white font-orbitron font-bold py-5 rounded-2xl transition-all shadow-2xl shadow-blue-900/20 active:scale-95 transform hover:-translate-y-1"
            >
              {loading ? (
                <span className="flex items-center justify-center italic">
                   PROCESANDO VÍDEO...
                </span>
              ) : 'INICIAR GENERACIÓN IA'}
            </button>
          </div>
        </div>

        <div className="glass-panel-light p-10 rounded-3xl border-2 border-slate-100 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[500px]">
          {loading ? (
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 border-8 border-[#f47920]/20 border-t-[#f47920] rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <DropletIcon className="w-8 h-8 text-[#e30613] animate-pulse" />
                </div>
              </div>
              <p className="font-orbitron text-xs text-[#002d62] font-black tracking-[0.2em] animate-pulse uppercase">{loadingMsg}</p>
            </div>
          ) : generatedVideo ? (
            <div className="w-full h-full flex flex-col items-center animate-fade-in">
              <h4 className="text-[10px] font-orbitron text-[#f47920] mb-4 font-black">MATERIAL LISTO PARA VISUALIZACIÓN</h4>
              <video 
                src={generatedVideo} 
                controls 
                className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white"
              />
              <a 
                href={generatedVideo} 
                download="capacitacion-quimpetrol-peru.mp4"
                className="mt-8 flex items-center space-x-2 text-xs font-orbitron font-black text-[#002d62] hover:text-[#e30613] transition-colors border-b-2 border-slate-100 pb-1"
              >
                <span>GUARDAR EN BIBLIOTECA LOCAL</span>
                <span>↓</span>
              </a>
            </div>
          ) : (
            <div className="text-center opacity-40">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <VideoIcon className="w-16 h-16 text-slate-300" />
              </div>
              <p className="font-orbitron text-[10px] text-slate-400 font-bold tracking-[0.3em] max-w-[200px] mx-auto uppercase">
                Visualizador de Capacitaciones Dinámicas
              </p>
            </div>
          )}
          
          {/* Decorative industrial corner */}
          <div className="absolute bottom-4 right-4 text-[8px] font-orbitron text-slate-200 font-black">
            QP-SGC-VEO-3.1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capacitaciones;
