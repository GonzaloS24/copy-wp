import { useEffect, useCallback } from 'react';

export const useProgrammaticNavigation = (blockProgrammaticNavigation) => {
  const handleProgrammaticNavigation = useCallback((navigationCallback) => {
    return blockProgrammaticNavigation(navigationCallback, false);
  }, [blockProgrammaticNavigation]);

  useEffect(() => {
    window.__handleProgrammaticNavigation = handleProgrammaticNavigation;
    
    return () => {
      delete window.__handleProgrammaticNavigation;
    };
  }, [handleProgrammaticNavigation]);

  return { handleProgrammaticNavigation };
};