// components/ui/Overlay.tsx
"use client";

import React from "react";

type OverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[480px]"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
