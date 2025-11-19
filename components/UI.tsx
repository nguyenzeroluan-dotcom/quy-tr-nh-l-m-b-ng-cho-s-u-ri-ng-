
import React, { useState, useEffect } from 'react';
import { 
    HomeIcon, ChevronRightIcon, SprayIcon, LeafIcon, 
    ScissorsIcon, FlowerIcon, DropletIcon, ArrowUpIcon 
} from './Icons';

// --- Breadcrumb ---
export const Breadcrumb = ({ items, onNavigate }: { items: { label: string, action?: () => void }[], onNavigate: () => void }) => (
  <nav className="flex text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
    <div 
        onClick={onNavigate}
        className="flex items-center hover:text-green-700 cursor-pointer transition-colors"
    >
        <HomeIcon className="w-4 h-4 mr-1" />
        Trang Chủ
    </div>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRightIcon className="w-4 h-4 mx-2 flex-shrink-0" />
        <span 
          className={`${index === items.length - 1 ? 'font-bold text-green-800' : 'hover:text-green-700 cursor-pointer transition-colors'}`}
          onClick={item.action}
        >
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

// --- Image Placeholder ---
export const ImagePlaceholder = ({ type, text, imageUrl }: { type: string, text: string, imageUrl?: string }) => {
  if (imageUrl) {
      return (
        <div className="w-full h-48 md:h-64 rounded-lg mb-4 relative overflow-hidden group shadow-sm">
            <img src={imageUrl} alt={text} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider bg-green-600/80 px-2 py-1 rounded backdrop-blur-sm">
                    {text}
                </span>
            </div>
        </div>
      );
  }

  let color = "bg-gray-200";
  let iconColor = "text-gray-400";
  let borderColor = "border-gray-300";

  if (type.includes("spray")) { color = "bg-blue-100"; iconColor = "text-blue-400"; borderColor = "border-blue-200"; }
  else if (type.includes("fertilizer")) { color = "bg-amber-100"; iconColor = "text-amber-500"; borderColor = "border-amber-200"; }
  else if (type.includes("growth") || type.includes("leaf")) { color = "bg-green-100"; iconColor = "text-green-500"; borderColor = "border-green-200"; }
  else if (type.includes("pruning")) { color = "bg-stone-100"; iconColor = "text-stone-500"; borderColor = "border-stone-200"; }
  else if (type.includes("bloom") || type.includes("flower")) { color = "bg-yellow-100"; iconColor = "text-yellow-500"; borderColor = "border-yellow-200"; }

  return (
    <div className={`w-full h-40 md:h-48 rounded-lg mb-4 flex items-center justify-center ${color} border-2 ${borderColor} relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-50"></div>
      <div className={`transform transition-transform duration-500 group-hover:scale-110 flex flex-col items-center`}>
        <span className={`text-5xl mb-2 ${iconColor} opacity-80`}>
            {type.includes('spray') && <SprayIcon className="w-12 h-12"/>}
            {type.includes('fertilizer') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('growth') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('leaf') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('pruning') && <ScissorsIcon className="w-12 h-12"/>}
            {(type.includes('bloom') || type.includes('flower')) && <FlowerIcon className="w-12 h-12"/>}
            {type.includes('soil') && <DropletIcon className="w-12 h-12"/>}
        </span>
        <span className="text-sm font-bold text-gray-600 uppercase tracking-wider px-4 text-center bg-white/60 rounded py-1 backdrop-blur-sm">{text}</span>
      </div>
    </div>
  );
};

// --- Stage Badge ---
export const StageBadge = ({ stage, label }: { stage: string, label: string }) => {
  const colors: Record<string, string> = {
    recovery: "bg-stone-600 text-white",
    growth: "bg-green-600 text-white",
    flowering: "bg-yellow-600 text-white",
  };
  
  const colorClass = colors[stage] || "bg-gray-500 text-white";

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${colorClass} shadow-sm`}>
      {label}
    </span>
  );
};

// --- Back To Top ---
export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-green-600 to-green-800 text-white shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl focus:outline-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

// --- Filter Button ---
export const FilterButton = ({ label, active, onClick, colorClass }: { label: string, active: boolean, onClick: () => void, colorClass: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-sm border ${
      active 
        ? `${colorClass} text-white shadow-md scale-105` 
        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);
