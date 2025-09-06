import React, { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { useProductSave } from "../../hooks/useProductSave";
import { AlertDialog } from "./content/dialog/AlertDialog";
import { SaveButton } from "../buttons/SaveButton";
import { AutoAssistantButton } from "./content/productInSeconds/AutoAssistantButton";

export const ProductButtons = () => {
  const { productData } = useProduct();
  const [isGeneratingAssistant, setIsGeneratingAssistant] = useState(false);

  const {
    isSaving,
    showValidationDialog,
    missingFields,
    isSecondAttempt,
    showNameRequiredDialog,
    setShowValidationDialog,
    setShowNameRequiredDialog,
    setIsSecondAttempt,
    saveProduct,
    isEditMode,
    navigate,
  } = useProductSave();

  const openAutoAssistantModal = () => {
    setIsGeneratingAssistant(true);
    console.log("Abriendo modal de asistente automático");
  };

  const handleSave = async (forceInactive = false) => {
    // Pasar skipNavigation: true cuando estemos en modo edición
    const result = await saveProduct(productData, forceInactive, false, isEditMode());

    if (result.success) {
      alert(result.message);
      
      // Solo navegar si hay navigateTo definido
      if (result.navigateTo) {
        navigate(result.navigateTo);
      }
      // Si estamos en modo edición y no hay navigateTo, activar el reset
      else if (isEditMode()) {
        console.log('🔄 Disparando reset automático...');
        window.dispatchEvent(new CustomEvent('resetProductState'));
      }
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleValidationDialogClose = () => {
    setShowValidationDialog(false);
    setMissingFields([]);
    setIsSecondAttempt(false);
  };

  const handleNameRequiredDialogClose = () => {
    setShowNameRequiredDialog(false);
  };

  const handleConfirmSecondAttempt = () => {
    setShowValidationDialog(false);
    handleSave(true);
  };

  const renderMissingFieldsContent = () => {
    const actionText = isEditMode() ? "actualizar" : "guardar";
    const entityText = isEditMode() ? "producto" : "agente";
    return (
      <div>
        {isSecondAttempt ? (
          <>
            <p className="mb-4">
              ¿Está seguro de {actionText} el {entityText} con los siguientes
              campos obligatorios vacíos?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-600">
                  {field}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Su {entityText} será {isEditMode() ? "actualizado" : "guardado"}{" "}
              como "inactivo"
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              Los siguientes campos obligatorios están vacíos:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-600">
                  {field}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Por favor complete estos campos antes de {actionText} el{" "}
              {entityText}.
            </p>
          </>
        )}
      </div>
    );
  };

  const getValidationDialogButtons = () => {
    if (isSecondAttempt) {
      return [
        {
          text: `Cancelar`,
          onClick: handleValidationDialogClose,
          className:
            "px-6 py-3 border-2 border-slate-200 bg-white text-slate-700 rounded-xl font-semibold text-base transition-all duration-200 hover:border-slate-300 hover:bg-slate-50",
          disabled: false,
        },
        {
          text: `${isEditMode() ? "Actualizar" : "Guardar"} como inactivo`,
          onClick: handleConfirmSecondAttempt,
          className:
            "px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:from-blue-600 hover:to-blue-700",
          disabled: false,
        },
      ];
    } else {
      return [
        {
          text: "Entendido",
          onClick: handleValidationDialogClose,
          className:
            "px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:from-blue-600 hover:to-blue-700",
          disabled: false,
        },
      ];
    }
  };

  const getNameRequiredDialogButtons = () => {
    return [
      {
        text: "Entendido",
        onClick: handleNameRequiredDialogClose,
        className:
          "px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:from-blue-600 hover:to-blue-700",
        disabled: false,
      },
    ];
  };

  return (
    <>
      <div className="fixed bottom-8 left-80 right-8 flex justify-between items-center">
        <SaveButton isLoading={isSaving} onClick={() => handleSave(false)} />
        <AutoAssistantButton
          isLoading={isGeneratingAssistant}
          onClick={openAutoAssistantModal}
        />
      </div>

      <AlertDialog
        title={
          isSecondAttempt
            ? `Confirmar ${
                isEditMode() ? "actualización" : "guardado"
              } con campos faltantes`
            : "Campos requeridos faltantes"
        }
        content={renderMissingFieldsContent()}
        isOpen={showValidationDialog}
        onClose={handleValidationDialogClose}
        buttons={getValidationDialogButtons()}
      />

      <AlertDialog
        title="Campo obligatorio faltante"
        content={
          <div>
            <p className="mb-4">
              El campo "Nombre del producto" es obligatorio y no puede estar
              vacío.
            </p>
            <p className="text-sm text-slate-600">
              Por favor complete este campo antes de{" "}
              {isEditMode() ? "actualizar" : "guardar"} el{" "}
              {isEditMode() ? "producto" : "asistente"}.
            </p>
          </div>
        }
        isOpen={showNameRequiredDialog}
        onClose={handleNameRequiredDialogClose}
        buttons={getNameRequiredDialogButtons()}
      />
    </>
  );
};