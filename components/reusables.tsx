import React from "react";

export const GrayTitle = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-white/90">{children}</span>;
};

export const BlueTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`bg-linear-to-br font-serif from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};
