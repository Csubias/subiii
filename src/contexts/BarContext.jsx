import React, { createContext, useContext, useState } from "react";

const BarContext = createContext();

export const useBar = () => {
  const context = useContext(BarContext);
  if (!context) {
    throw new Error("useBar must be used within a BarProvider");
  }
  return context;
};

export const BarProvider = ({ children }) => {
  const [barState, setBarState] = useState({});

  return (
    <BarContext.Provider value={{ barState, setBarState }}>
      {children}
    </BarContext.Provider>
  );
};
