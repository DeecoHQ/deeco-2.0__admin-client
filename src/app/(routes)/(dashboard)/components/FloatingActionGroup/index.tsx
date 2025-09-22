"use client";

import React from "react";
import FloatingActionButton from "../FloatingActionButton";

type FloatingActionGroupProps = {
  actions: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  }[];
};

const FloatingActionGroup: React.FC<FloatingActionGroupProps> = ({ actions }) => {
  return (
    <div className="fixed bottom-10 right-6 sm:right-12 flex flex-col items-end gap-6 z-50">
      {actions.map((action, idx) => (
        <FloatingActionButton
          key={idx}
          icon={action.icon}
          onClick={action.onClick}
          label={action.label}
        />
      ))}
    </div>
  );
};

export default FloatingActionGroup;
