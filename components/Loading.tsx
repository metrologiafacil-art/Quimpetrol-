import React from 'react';
import { MetrologiaFacilLogo } from './Icons';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <MetrologiaFacilLogo className="w-16 h-16 animate-spin" />
      </div>
      <p className="mt-8 text-[#002d62] font-orbitron font-bold text-sm tracking-widest animate-pulse">
        CARGANDO SISTEMA...
      </p>
    </div>
  );
};

export default Loading;
