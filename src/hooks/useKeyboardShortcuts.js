import { useEffect } from 'react';

export const useKeyboardShortcuts = (shouldBlock, onSaveShortcut) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (shouldBlock) {
          onSaveShortcut();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldBlock, onSaveShortcut]);
};