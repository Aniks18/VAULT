import React from "react";

export const Card = ({ children, className }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
