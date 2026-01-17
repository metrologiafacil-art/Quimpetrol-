import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] w-full">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-t-[#e30613] border-r-[#002d62] border-b-transparent border-l-transparent rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-0 m-8 bg-[#002d62] rounded-full animate-pulse opacity-50"></div>
      </div>
      <p className="mt-6 text-[#002d62] font-orbitron font-bold text-lg animate-pulse tracking-widest">
        CARGANDO SISTEMA...
      </p>
    </div>
  );
};

export default Loading;
