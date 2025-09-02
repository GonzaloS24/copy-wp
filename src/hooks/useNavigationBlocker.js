import { useState, useEffect, useCallback, useRef } from 'react';

export const useNavigationBlocker = (shouldBlock) => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isUnloadAction, setIsUnloadAction] = useState(false);
  const isDialogActive = useRef(false);
  const beforeUnloadEnabled = useRef(false);

  const blockProgrammaticNavigation = useCallback((navigationCallback, isUnload = false) => {
    if (shouldBlock && !isDialogActive.current) {
      isDialogActive.current = true;
      setIsUnloadAction(isUnload);
      setShowDialog(true);
      setPendingAction(() => () => {
        beforeUnloadEnabled.current = false;
        navigationCallback();
      });
      return true; 
    }
    return false;
  }, [shouldBlock]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (shouldBlock && !isDialogActive.current) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          blockProgrammaticNavigation(() => {
            window.location.reload();
          }, true);
          return;
        }
        
        if (event.key === 'F5') {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          blockProgrammaticNavigation(() => {
            window.location.reload();
          }, true);
          return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          blockProgrammaticNavigation(() => {
            window.close();
          }, true);
          return;
        }

        if (event.altKey && event.key === 'F4') {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          blockProgrammaticNavigation(() => {
            window.close();
          }, true);
          return;
        }
      }
    };

    const handlePopState = (event) => {
      if (shouldBlock && !isDialogActive.current) {
        window.history.pushState(null, '', window.location.href);
        
        blockProgrammaticNavigation(() => {
          window.removeEventListener('popstate', handlePopState);
          beforeUnloadEnabled.current = false;
          
          setTimeout(() => {
            window.history.back();
            
            setTimeout(() => {
              window.addEventListener('popstate', handlePopState);
              beforeUnloadEnabled.current = true;
            }, 100);
          }, 50);
        }, false);
      }
    };

    const handleClick = (event) => {
      if (shouldBlock && !isDialogActive.current) {
        const link = event.target.closest('a');
        const button = event.target.closest('button[type="submit"]');
        
        if (link && link.href) {
          const targetUrl = new URL(link.href, window.location.href);
          const currentUrl = new URL(window.location.href);
          
          if (targetUrl.origin === currentUrl.origin && 
              !link.hasAttribute('data-allow-navigation')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            
            blockProgrammaticNavigation(() => {
              beforeUnloadEnabled.current = false;
              window.location.href = link.href;
            }, false);
          }
        }
        
        if (button && !button.closest('[data-save-form]')) {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          blockProgrammaticNavigation(() => {
            beforeUnloadEnabled.current = false;
            button.form?.submit();
          }, false);
        }
      }
    };

    const handleBeforeUnload = (event) => {
      if (shouldBlock && beforeUnloadEnabled.current && !isDialogActive.current) {
        setTimeout(() => {
          if (!isDialogActive.current) {
            blockProgrammaticNavigation(() => {
            }, true);
          }
        }, 0);
        
        const message = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?';
        event.returnValue = message;
        return message;
      }
    };

    const handleVisibilityChange = () => {
  if (shouldBlock && document.hidden) {
    beforeUnloadEnabled.current = true;
  }
    };

    beforeUnloadEnabled.current = shouldBlock;
    
    if (shouldBlock) {
      window.history.pushState(null, '', window.location.href);
    }

    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldBlock, blockProgrammaticNavigation]);

  const confirmNavigation = useCallback(() => {
    setShowDialog(false);
    isDialogActive.current = false;
    
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
      }, 100);
    }
    
    setPendingAction(null);
    setIsUnloadAction(false);
  }, [pendingAction]);

  const cancelNavigation = useCallback(() => {
    setShowDialog(false);
    isDialogActive.current = false;
    setPendingAction(null);
    setIsUnloadAction(false);
    
    beforeUnloadEnabled.current = shouldBlock;
  }, [shouldBlock]);

  return {
    showDialog,
    confirmNavigation,
    cancelNavigation,
    isUnloadAction,
    blockProgrammaticNavigation 
  };
};