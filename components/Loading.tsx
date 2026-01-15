import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-[#002d62] animate-spin absolute top-0 left-0"></div>
      </div>
      <span className="text-slate-500 font-orbitron text-sm animate-pulse tracking-widest">CARGANDO...</span>
    </div>
  );
};

export default Loading;
