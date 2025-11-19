
import React, { useEffect } from 'react';
import { XIcon } from './Icons';

interface ImageViewerProps {
  isOpen: boolean;
  imageUrl: string | null;
  altText?: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, imageUrl, altText = "Full size image", onClose }) => {
  
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[70] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors group"
        title="Đóng (ESC)"
      >
        <XIcon className="w-8 h-8" />
      </button>

      {/* Image Container */}
      <div 
        className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent click on image from closing
      >
        <img 
            src={imageUrl} 
            alt={altText} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in select-none"
        />
      </div>
      
      {/* Caption/Hint */}
      <div className="absolute bottom-6 text-white/60 text-sm pointer-events-none">
          Nhấn ESC hoặc click ra ngoài để đóng
      </div>
    </div>
  );
};

export default ImageViewer;
