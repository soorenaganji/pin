import React, { createContext, useState, useContext } from 'react';

// Create the context
const ReloadContext = createContext();

// Custom hook to use the ReloadContext
export const useReload = () => useContext(ReloadContext);

// Provider component to manage the shouldBeReloaded state
export const ReloadProvider = ({ children }) => {
  const [shouldBeReloaded, setShouldBeReloaded] = useState(true);

  return (
    <ReloadContext.Provider value={{ shouldBeReloaded, setShouldBeReloaded }}>
      {children}
    </ReloadContext.Provider>
  );
};
