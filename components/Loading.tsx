import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[50vh]">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>

        {/* Spinning segment */}
        <div className="absolute inset-0 border-4 border-t-[#002d62] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-[#e30613] rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-8 font-orbitron text-xs text-[#002d62] font-black tracking-[0.3em] uppercase animate-pulse">
        Cargando Sistema...
      </p>
    </div>
  );
};

export default Loading;
