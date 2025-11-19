
import React, { useState, useEffect, useRef } from 'react';
import { XIcon, GripIcon } from './Icons';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}

export const BaseModal: React.FC<BaseModalProps> = ({ 
  isOpen, onClose, title, children, footer,
  initialWidth = 600,
  initialHeight = 500
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Drag Logic
  const handleMouseDownDrag = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    // Initialize position if not moved yet (switch from CSS centered to Fixed position)
    if (!hasMoved && modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
        setHasMoved(true);
        dragStartRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    } else {
        dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
    
    setIsDragging(true);
  };

  // Resize Logic
  const handleMouseDownResize = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.stopPropagation(); // Prevent drag when resizing
    setIsResizing(true);
    resizeStartRef.current = { 
        x: e.clientX, 
        y: e.clientY, 
        width: size.width, 
        height: size.height 
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartRef.current.x,
          y: e.clientY - dragStartRef.current.y
        });
      }
      if (isResizing) {
        const dx = e.clientX - resizeStartRef.current.x;
        const dy = e.clientY - resizeStartRef.current.y;
        setSize({
          width: Math.max(300, resizeStartRef.current.width + dx), // Min width 300
          height: Math.max(200, resizeStartRef.current.height + dy) // Min height 200
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);


  if (!isOpen) return null;

  // Style logic:
  // If Mobile: Fixed full screen.
  // If Desktop & Not Moved: Relative (let Flexbox parent center it).
  // If Desktop & Moved: Fixed at specific coordinates.
  const modalStyle: React.CSSProperties = isMobile ? {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%'
  } : hasMoved ? {
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    maxWidth: '90vw',
    maxHeight: '90vh'
  } : {
    position: 'relative',
    width: size.width,
    height: size.height,
    maxWidth: '90vw',
    maxHeight: '90vh'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       {/* Backdrop - Click to close */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer" onClick={onClose}></div>
      
      {/* Modal Window */}
      <div 
        ref={modalRef}
        style={modalStyle}
        className="flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/50 overflow-hidden transition-shadow duration-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside modal
      >
        {/* Header (Draggable) */}
        <div 
           className={`flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-800 to-green-700 text-white select-none ${!isMobile ? 'cursor-move' : ''}`}
           onMouseDown={handleMouseDownDrag}
        >
          <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 bg-gradient-to-b from-white to-green-50/30 custom-scrollbar">
           {children}
        </div>

        {/* Footer */}
        {footer && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                {footer}
            </div>
        )}

        {/* Resize Handle (Desktop Only) */}
        {!isMobile && (
            <div 
                className="absolute bottom-0 right-0 p-1 cursor-nwse-resize text-gray-400 hover:text-green-600"
                onMouseDown={handleMouseDownResize}
            >
                <GripIcon className="w-5 h-5" />
            </div>
        )}
      </div>
    </div>
  );
};
