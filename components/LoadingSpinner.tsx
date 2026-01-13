import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[50vh]">
       <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm neon-border-orange">
          <div className="flex space-x-3">
            <div className="w-4 h-4 bg-[#f47920] rounded-full animate-bounce shadow-[0_0_8px_#f47920]"></div>
            <div className="w-4 h-4 bg-[#f47920] rounded-full animate-bounce delay-75 shadow-[0_0_8px_#f47920]"></div>
            <div className="w-4 h-4 bg-[#f47920] rounded-full animate-bounce delay-150 shadow-[0_0_8px_#f47920]"></div>
          </div>
       </div>
    </div>
  );
};

export default LoadingSpinner;
