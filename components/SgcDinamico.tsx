
import React, { useState, useRef } from 'react';
import { ValiaLogo, DropletIcon } from './Icons';
import { 
  analyzeSafetyPhoto, 
  generateQualityResponse, 
  generateTTS, 
  generateImagePro 
} from '../services/geminiService';
import { sounds } from '../services/soundService';


interface Props {
  onBack: () => void;
}

const SgcDinamico: React.FC<Props> = ({ onBack }) => {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendQuery = async () => {
    if (!inputText) return;
    setLoading(true);
    sounds.playClick();
    setChatLog(prev => [...prev, { role: 'user', text: inputText }]);
    const currentInput = inputText;
    setInputText('');

    try {
      const response = await generateQualityResponse(currentInput);
      setChatLog(prev => [...prev, { role: 'ai', text: response || 'No se obtuvo respuesta.' }]);
    } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { role: 'ai', text: 'Error en la conexión inteligente.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    sounds.playClick();
    setAnalysisResult('Iniciando Visión Artificial QP...');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const result = await analyzeSafetyPhoto(base64);
        setAnalysisResult(result || 'Análisis finalizado sin detecciones críticas.');
      } catch (err) {
        console.error(err);
        setAnalysisResult('Fallo en el servidor de visión QP.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTTS = async (text: string) => {
    try {
      sounds.playClick();
      const base64Audio = await generateTTS(text);
      if (base64Audio) {
        await sounds.playPCM(base64Audio, 24000);
      }
    } catch (err) {
      console.error("TTS Error", err);
    }
  };

  const handleGenerateAsset = async () => {
    sounds.playClick();
    const userPrompt = window.prompt("Describa el activo industrial o diagrama a generar:");
    if (!userPrompt) return;

    if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) await window.aistudio.openSelectKey();
    }

    setIsImgLoading(true);
    try {
      const img = await generateImagePro(userPrompt, "1K", "1:1");
      setGeneratedImg(img);
    } catch (err) {
      alert("Fallo en el motor de renderizado QP.");
    } finally {
      setIsImgLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-10 pb-16">
      <button 
        onClick={() => { sounds.playClick(); onBack(); }} 
        className="text-xs font-orbitron font-black text-[#00599a] hover:text-[#e30613] flex items-center group transition-all uppercase tracking-[0.2em] px-2"
      >
        <span className="mr-3 group-hover:-translate-x-2 transition-transform">←</span> RETORNAR AL PANEL CENTRAL
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* IA Interaction Panel */}
        <div className="lg:col-span-2 space-y-10">
          <div className="glass-panel-light p-10 rounded-[3rem] neon-border-blue border-t-[8px] border-t-[#002d62] flex flex-col h-[750px] shadow-2xl relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f47920]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="flex justify-between items-center mb-10 relative">
              <h3 className="text-2xl font-orbitron font-bold text-[#002d62] flex items-center neon-text-blue">
                <ValiaLogo className="w-16 h-16 mr-5 drop-shadow-[0_0_10px_rgba(244,121,32,0.4)]" />
                ASISTENTE VALIA SGC
              </h3>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_green] animate-pulse"></div>
                 <span className="text-[10px] font-orbitron text-slate-500 font-black uppercase tracking-[0.2em]">VALIA ENGINE ONLINE</span>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-8 mb-10 pr-4 custom-scrollbar">
              {chatLog.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-[#f47920]/10 rounded-full blur-2xl animate-pulse group-hover:bg-[#00599a]/20 transition-colors"></div>
                    <ValiaLogo className="relative w-32 h-32 mb-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="italic text-sm font-semibold text-center max-w-sm leading-relaxed px-6">
                    Inicie una consulta técnica sobre normativas <span className="text-[#00599a]">ISO/IEC 17025</span> o procesos operativos de Quimpetrol...
                  </p>
                </div>
              )}
              {chatLog.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed relative ${
                    chat.role === 'user' 
                      ? 'bg-[#002d62] text-white shadow-[0_10px_25px_rgba(0,45,98,0.2)] rounded-tr-none border border-[#00599a]/30' 
                      : 'bg-white border-2 border-slate-100 text-slate-700 shadow-sm rounded-tl-none font-semibold neon-border-orange'
                  }`}>
                    <div className={`text-[9px] font-orbitron font-black mb-3 uppercase tracking-[0.3em] ${chat.role === 'user' ? 'text-blue-300' : 'text-[#f47920] neon-text-orange'}`}>
                       {chat.role === 'user' ? 'AUTORIZACIÓN QP' : 'VALIA CORE AI'}
                    </div>
                    <p className="text-sm">{chat.text}</p>
                    {chat.role === 'ai' && (
                      <button 
                        onClick={() => handleTTS(chat.text)}
                        className="mt-6 flex items-center space-x-2 text-[10px] text-[#00599a] font-orbitron font-black hover:text-[#e30613] transition-all bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:shadow-[0_0_10px_rgba(227,6,19,0.2)]"
                      >
                        <span className="animate-pulse">🔊</span>
                        <span>REPRODUCIR INFORME TÉCNICO</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-white border-2 border-slate-50 p-6 rounded-[2rem] shadow-sm neon-border-orange">
                      <div className="flex space-x-3">
                        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce shadow-[0_0_8px_#f47920]"></div>
                        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce delay-75 shadow-[0_0_8px_#f47920]"></div>
                        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce delay-150 shadow-[0_0_8px_#f47920]"></div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 p-3 bg-slate-100 rounded-[2rem] border-2 border-white shadow-inner relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00599a] to-[#f47920] rounded-[2.2rem] blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                className="relative flex-grow bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-800 font-semibold text-sm focus:outline-none focus:border-[#00599a] transition-all shadow-sm"
                placeholder="Consultar competencia técnica SGC..."
              />
              <button 
                onClick={handleSendQuery}
                disabled={loading}
                className="relative bg-[#002d62] text-white px-10 rounded-2xl font-orbitron font-black text-xs hover:bg-[#e30613] transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest"
              >
                CONSULTAR
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic AI Sidebar Tools */}
        <div className="space-y-10">
          {/* Analysis Tool with Pulsing Neon */}
          <div className="glass-panel-light p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl relative overflow-hidden group hover:neon-border-red transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e30613]/5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform"></div>
            <h4 className="text-[12px] font-orbitron text-[#e30613] mb-5 tracking-[0.4em] font-black uppercase neon-text-red">Análisis Fotométrico</h4>
            <p className="text-[11px] text-slate-500 mb-8 font-semibold leading-relaxed px-1">Auditoría visual de EPP e infraestructura industrial mediante procesamiento neuronal.</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload}
              className="hidden" 
              accept="image/*"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-white border-2 border-[#e30613]/20 text-[#e30613] font-orbitron font-black text-[10px] py-5 rounded-2xl hover:bg-[#e30613] hover:text-white transition-all shadow-[0_0_15px_rgba(227,6,19,0.1)] hover:shadow-[0_0_20px_rgba(227,6,19,0.3)] uppercase tracking-[0.2em]"
            >
              ACTIVAR CÁMARA / SUBIR
            </button>
            {analysisResult && (
              <div className="mt-8 p-5 bg-[#f8fafc] rounded-2xl border-l-4 border-[#e30613] text-[11px] text-slate-700 font-bold max-h-56 overflow-y-auto animate-fade-in shadow-inner">
                 <div className="flex items-center space-x-2 mb-3">
                    <div className="w-1.5 h-1.5 bg-[#e30613] rounded-full animate-ping"></div>
                    <span className="font-black text-[#e30613] uppercase tracking-widest">DIAGNÓSTICO QP:</span>
                 </div>
                 <p className="leading-relaxed">{analysisResult}</p>
              </div>
            )}
          </div>

          {/* Asset Generation with Orange Glow */}
          <div className="glass-panel-light p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl relative group hover:neon-border-orange transition-all duration-500">
            <h4 className="text-[12px] font-orbitron text-[#f47920] mb-5 tracking-[0.4em] font-black uppercase neon-text-orange">Modelado de Procesos</h4>
            <p className="text-[11px] text-slate-500 mb-8 font-semibold leading-relaxed px-1">Generación sintética de diagramas técnicos y renders para bibliotecas SGC.</p>
            <button 
              onClick={handleGenerateAsset}
              disabled={isImgLoading}
              className="w-full bg-[#f47920] text-white font-orbitron font-black text-[10px] py-5 rounded-2xl hover:bg-[#ff944d] transition-all shadow-[0_10px_20px_rgba(244,121,32,0.2)] hover:shadow-[0_0_20px_rgba(244,121,32,0.4)] active:scale-95 uppercase tracking-[0.2em]"
            >
              {isImgLoading ? 'RENDERIZANDO...' : 'GENERAR DIAGRAMA TÉCNICO'}
            </button>
            {generatedImg && (
              <div className="mt-8 p-2 bg-white border-2 border-slate-100 rounded-2xl shadow-2xl animate-fade-in group/img overflow-hidden">
                 <img src={generatedImg} className="w-full rounded-xl transition-transform duration-700 group-hover/img:scale-110" alt="Activo Quimpetrol" />
                 <div className="mt-3 text-center">
                    <p className="text-[9px] font-orbitron text-slate-400 font-black uppercase tracking-[0.3em] py-2">ASSET_QP_GEN_2025</p>
                 </div>
              </div>
            )}
          </div>
          
          {/* Support Branding Widget */}
          <div className="p-8 bg-[#002d62]/5 rounded-[2.5rem] border-2 border-dashed border-[#002d62]/10 text-center group hover:bg-white hover:border-[#002d62]/30 transition-all">
             <div className="inline-block p-3 rounded-xl bg-white shadow-sm mb-4 border border-slate-50 transition-transform group-hover:scale-110">
                <DropletIcon className="w-6 h-6 text-[#00599a] svg-glow-blue" />
             </div>
             <p className="text-[10px] font-orbitron text-[#002d62] font-black mb-1 uppercase tracking-[0.3em] neon-text-blue">METROLOGÍA FÁCIL</p>
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Soporte Técnico Especializado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SgcDinamico;
