import { useState, useEffect, useCallback, useRef } from 'react';

export const useNavigationBlocker = (shouldBlock) => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isUnloadAction, setIsUnloadAction] = useState(false);
  const isDialogActive = useRef(false);
  const beforeUnloadEnabled = useRef(false);

  // Nueva función para navegación programática
  const blockProgrammaticNavigation = useCallback((navigationCallback, isUnload = false) => {
    if (shouldBlock && !isDialogActive.current) {
      isDialogActive.current = true;
      setIsUnloadAction(isUnload);
      setShowDialog(true);
      setPendingAction(() => () => {
        beforeUnloadEnabled.current = false;
        navigationCallback();
      });
      return true; // Se mostró el diálogo
    }
    return false; // No se mostró el diálogo (no hay cambios o ya está activo)
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
            
            // Restaurar listener después de la navegación
            setTimeout(() => {
              window.addEventListener('popstate', handlePopState);
              beforeUnloadEnabled.current = true;
            }, 100);
          }, 50);
        }, false);
      }
    };

    // 3. Interceptar clics en enlaces y formularios
    const handleClick = (event) => {
      if (shouldBlock && !isDialogActive.current) {
        const link = event.target.closest('a');
        const button = event.target.closest('button[type="submit"]');
        
        // Interceptar enlaces internos
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
        
        // Interceptar envío de formularios (excepto los de guardado)
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

    // 4. Interceptar intentos de cerrar con el botón X del navegador
    const handleBeforeUnload = (event) => {
      // Solo activar si no tenemos nuestro diálogo activo
      if (shouldBlock && beforeUnloadEnabled.current && !isDialogActive.current) {
        // Intentar mostrar nuestro diálogo primero (funciona en algunos navegadores)
        setTimeout(() => {
          if (!isDialogActive.current) {
            blockProgrammaticNavigation(() => {
              // Esta función se ejecutará si el usuario confirma
            }, true);
          }
        }, 0);
        
        // Fallback: diálogo nativo como último recurso
        const message = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?';
        event.returnValue = message;
        return message;
      }
    };

    // 5. Detectar cuando la página pierde el foco (posible cierre)
    const handleVisibilityChange = () => {
      if (shouldBlock && document.hidden && !isDialogActive.current) {
        // La página se está ocultando, posiblemente cerrando
        setTimeout(() => {
          if (document.hidden && !isDialogActive.current) {
            blockProgrammaticNavigation(() => {
              // Esta función se ejecutará si el usuario confirma
            }, true);
          }
        }, 100);
      }
    };

    // Inicializar estado
    beforeUnloadEnabled.current = shouldBlock;
    
    // Agregar estado al historial para detectar navegación
    if (shouldBlock) {
      window.history.pushState(null, '', window.location.href);
    }

    // Registrar todos los event listeners con alta prioridad
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
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
      // Ejecutar la acción pendiente
      setTimeout(() => {
        pendingAction();
      }, 100);
    }
    
    // Limpiar estado
    setPendingAction(null);
    setIsUnloadAction(false);
  }, [pendingAction]);

  const cancelNavigation = useCallback(() => {
    setShowDialog(false);
    isDialogActive.current = false;
    setPendingAction(null);
    setIsUnloadAction(false);
    
    // Restaurar la capacidad del beforeunload
    beforeUnloadEnabled.current = shouldBlock;
  }, [shouldBlock]);

  return {
    showDialog,
    confirmNavigation,
    cancelNavigation,
    isUnloadAction,
    blockProgrammaticNavigation // Exportar la nueva función
  };
};