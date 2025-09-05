
import React, { createContext, useContext, useCallback, useEffect } from 'react';

const NavigationBlockContext = createContext(null);

export const useNavigationBlock = () => {
  const context = useContext(NavigationBlockContext);
  
  if (!context) {
    return {
      handleProgrammaticNavigation: (navigationCallback) => {
        console.warn('NavigationBlockContext not available - navigating without blocking');
        navigationCallback();
        return false;
      }
    };
  }
  
  return context;
};

export const NavigationBlockProvider = ({ children, blockProgrammaticNavigation }) => {
  const handleProgrammaticNavigation = useCallback((navigationCallback) => {
    return blockProgrammaticNavigation(navigationCallback, false);
  }, [blockProgrammaticNavigation]);

  useEffect(() => {
    window.__handleProgrammaticNavigation = handleProgrammaticNavigation;
    
    return () => {
      delete window.__handleProgrammaticNavigation;
    };
  }, [handleProgrammaticNavigation]);

  return (
    <NavigationBlockContext.Provider value={{ handleProgrammaticNavigation }}>
      {children}
    </NavigationBlockContext.Provider>
  );
};