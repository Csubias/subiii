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
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const registerOrder = (order) => {
    setCurrentOrder(order);
    setCurrentItemIndex(0);
  };

  const nextItem = () => {
    setCurrentItemIndex((prevIndex) => prevIndex + 1);
  };

  const resetOrder = () => {
    setCurrentOrder(null);
    setCurrentItemIndex(0);
  };

  return (
    <BarContext.Provider
      value={{
        barState,
        setBarState,
        currentOrder,
        currentItemIndex,
        registerOrder,
        nextItem,
        resetOrder,
      }}
    >
      {children}
    </BarContext.Provider>
  );
};
