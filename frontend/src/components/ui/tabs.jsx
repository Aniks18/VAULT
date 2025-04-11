import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [active, setActive] = useState(defaultValue);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { active, setActive })
  );
};

export const TabsList = ({ children }) => (
  <div className="flex gap-4 mb-4">{children}</div>
);

export const TabsTrigger = ({ value, children, active, setActive }) => (
  <button
    onClick={() => setActive(value)}
    className={`px-4 py-2 rounded-full font-semibold ${
      active === value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
    }`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, active }) => {
  return active === value ? <div>{children}</div> : null;
};
