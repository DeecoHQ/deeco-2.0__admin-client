"use client";

import React from "react";

type FloatingActionButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className='bg-[#043D25] text-white p-3 rounded-full shadow-lg transition hover:scale-110 cursor-pointer'
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
