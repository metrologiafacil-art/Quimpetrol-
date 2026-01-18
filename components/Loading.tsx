import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[50vh]">
      <div className="flex space-x-3">
        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce shadow-[0_0_8px_#f47920]"></div>
        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce delay-75 shadow-[0_0_8px_#f47920]"></div>
        <div className="w-2.5 h-2.5 bg-[#f47920] rounded-full animate-bounce delay-150 shadow-[0_0_8px_#f47920]"></div>
      </div>
    </div>
  );
};

export default Loading;
