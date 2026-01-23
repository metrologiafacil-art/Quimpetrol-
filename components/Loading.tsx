import React from 'react';
import { MetrologiaFacilLogo } from './Icons';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
      <MetrologiaFacilLogo className="w-16 h-16 animate-pulse" />
      <p className="mt-4 text-slate-500 font-orbitron text-sm animate-pulse">Cargando...</p>
    </div>
  );
};

export default Loading;
