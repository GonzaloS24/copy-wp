import React, { useCallback, useEffect } from 'react';
import { useVerificationExit } from '../../hooks/useVerificationExit';
import { useProgrammaticNavigation } from '../../hooks/useProgrammaticNavigation';
import { usePersistentWarning } from '../../hooks/usePersistentWarning';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { AlertDialog } from './content/dialog/AlertDialog';
import { Portal } from '../exit/Portal';
import { ModifiedFieldsContent } from './ModifiedFieldsContent';
import { navigationEvents } from '../../utils/ventasWp/navigationEvents';

export const VerificateExit = () => {
  const {
    isEditMode,
    modifiedFields,
    saveError,
    setSaveError,
    isLoadingOriginal,
    shouldBlock,
    productData,
    isSaving,
    saveProduct,
    navigate,
    showDialog,
    confirmNavigation,
    cancelNavigation,
    isUnloadAction,
    blockProgrammaticNavigation
  } = useVerificationExit();

  const { handleProgrammaticNavigation } = useProgrammaticNavigation(blockProgrammaticNavigation);
  usePersistentWarning(shouldBlock, modifiedFields.length);

  useEffect(() => {
    const navigationListener = (navigationCallback) => {
      return blockProgrammaticNavigation(navigationCallback, false);
    };

    navigationEvents.addListener(navigationListener);

    return () => {
      navigationEvents.removeListener(navigationListener);
    };
  }, [blockProgrammaticNavigation]);

  const handleSaveAndContinue = useCallback(async () => {
    setSaveError(null);
    
    try {
      const result = await saveProduct(productData, false, true, true);
      
      if (result.success) {
        navigate('/productos-config');
      } else if (result.hasMissingFields) {
        const saveResult = await saveProduct(productData, true, true, true);
        if (saveResult.success) {
          navigate('/productos-config');
        } else {
          setSaveError('Error al guardar como inactivo');
        }
      } else if (result.requiresName) {
        setSaveError('El nombre del producto es obligatorio');
      } else {
        setSaveError('Error al guardar los cambios');
      }
    } catch (error) {
      setSaveError('Error inesperado al guardar');
    }
  }, [saveProduct, productData, navigate, setSaveError]);

  useKeyboardShortcuts(shouldBlock, handleSaveAndContinue);

  useEffect(() => {
    console.log('Modified fields:', modifiedFields);
    console.log('Should block navigation:', shouldBlock);
    console.log('Is loading original:', isLoadingOriginal);
  }, [modifiedFields, shouldBlock, isLoadingOriginal]);

  useEffect(() => {
    if (!showDialog) {
      setSaveError(null);
    }
  }, [showDialog, setSaveError]);

  const getDialogButtons = () => {
    return [
      {
        text: isSaving ? 'Guardando...' : 'Guardar cambios',
        onClick: handleSaveAndContinue,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        disabled: isSaving || modifiedFields.length === 0,
      },
      {
        text: isUnloadAction ? 'Salir sin guardar' : 'Continuar sin guardar',
        onClick: confirmNavigation,
        className: 'bg-red-600 hover:bg-red-700 text-white',
        disabled: false
      },
      {
        text: 'Cancelar',
        onClick: cancelNavigation,
        className: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
        disabled: false
      }
    ];
  };

  return (
    <Portal>
      <AlertDialog
        isOpen={showDialog}
        onClose={cancelNavigation}
        title={isUnloadAction ? 'Cerrar sin guardar' : 'Salir sin guardar'}
        content={
          <ModifiedFieldsContent 
            modifiedFields={modifiedFields}
            isUnloadAction={isUnloadAction}
            saveError={saveError}
          />
        }
        buttons={getDialogButtons()}
      />
    </Portal>
  );
};