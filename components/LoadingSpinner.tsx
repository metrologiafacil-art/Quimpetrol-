import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#002d62] border-r-[#e30613] border-b-[#f47920] border-l-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-[#002d62] font-orbitron font-bold text-sm tracking-widest animate-pulse">
        CARGANDO...
      </p>
    </div>
  );
};

export default LoadingSpinner;
