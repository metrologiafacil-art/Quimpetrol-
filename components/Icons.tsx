
import React from 'react';

// Using direct download links for Google Drive images
const QUIMPETROL_IMG = "https://lh3.googleusercontent.com/d/1GpyI5RIcGqQK5tbZKLcMDLO8vPk9_lQi";
const VALIA_IMG = "https://lh3.googleusercontent.com/d/1r7tMDP9psrrV96UU_nETFNFcBiFcOAoK";

export const QuimpetrolLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`${className} relative flex items-center justify-center`}>
    <div className="absolute inset-0 bg-red-500/5 rounded-full blur-xl scale-125"></div>
    <img 
      src={QUIMPETROL_IMG} 
      alt="Quimpetrol Logo" 
      className="relative w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
    />
  </div>
);

export const ValiaLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`${className} relative flex items-center justify-center`}>
    <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-xl scale-125"></div>
    <img 
      src={VALIA_IMG} 
      alt="Valia Logo" 
      className="relative w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
    />
  </div>
);

export const MetrologiaFacilLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="metroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f47920" />
        <stop offset="100%" stopColor="#ffc20e" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" stroke="#00599a" strokeWidth="2" strokeDasharray="5 3" />
    <rect x="25" y="25" width="50" height="50" rx="8" fill="url(#metroGrad)" />
    <path d="M35 50H65M50 35V65" stroke="white" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="50" r="5" fill="#002d62" />
  </svg>
);

export const EyeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export const DropletIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const VideoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

export const CpuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);
