// components/ui/Overlay.tsx  (or global-components/OverlayComponent.tsx)
"use client";

import React from "react";

type OverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Overlay({ children, onClose }: OverlayProps) {
  return (
    <div
      // backdrop + centering only
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* the inner wrapper must *not* impose visual styles — the modal does that */}
      <div className="w-full max-w-lg mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
