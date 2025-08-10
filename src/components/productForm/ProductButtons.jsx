import React, { useContext, useState } from 'react';
import { useParams, useLocation, useNavigate  } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { ProductService } from '../../services/productService';
import { AlertDialog } from './content/dialog/AlertDialog';

import { mapProductDataToServiceFormat } from '../../utils/productDataMapper';

import { SaveButton } from '../buttons/SaveButton';

export const ProductButtons = () => {
  const { productData, validationState } = useProduct();
  const { productName } = useParams();
  const location = useLocation();
   const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [isSecondAttempt, setIsSecondAttempt] = useState(false);
  const [showNameRequiredDialog, setShowNameRequiredDialog] = useState(false);

  const openAutoAssistantModal = () => {
    console.log('Abriendo modal de asistente automático');
  };

  const isEditMode = () => {
    return productName && location.pathname.includes(`/${productName}`);
  };

  const getPromptText = () => {
    const promptData = productData.freePrompt?.promptText || productData.freePrompt?.promptContent;
    
    if (!promptData) return '';
    
    if (typeof promptData === 'string') return promptData;
    
    if (typeof promptData === 'object') {
      if (promptData.text) return promptData.text;
      if (promptData.prompt) return promptData.prompt;
      if (promptData.content) return promptData.content;
      if (promptData.value) return promptData.value;
      
      const keys = Object.keys(promptData);
      if (keys.length === 1) {
        const value = promptData[keys[0]];
        if (typeof value === 'string') return value;
      }
    }
    
    return '';
  };

  const validateProductData = (mappedData) => {
    const errors = [];
    
    if (!mappedData || typeof mappedData !== 'object') {
      errors.push('Datos del producto inválidos');
      return errors;
    }

    if (!mappedData.informacion_de_producto) {
      errors.push('Información del producto requerida');
    }

    return errors;
  };

  const validateRequiredFields = () => {
    const missing = [];

    if (!productData.info?.formData?.name?.trim()) {
      missing.push('Nombre del producto');
      return missing;
    }

    if (!productData.info?.formData?.price?.trim()) {
      missing.push('Precio del producto');
    }
    if (!productData.info?.formData?.description?.trim()) {
      missing.push('Descripción del producto');
    }

    if (!productData.messageWel?.formData?.initialMessage?.trim()) {
      missing.push('Mensaje inicial');
    }
    if (!productData.messageWel?.formData?.entryQuestion?.trim()) {
      missing.push('Pregunta de entrada');
    }

    const freePromptValid = getPromptText().trim() !== '';
    
    const guidePromptValid = (
      productData.freePrompt?.guidePromptData?.contextualizacion?.trim() !== '' ||
      productData.freePrompt?.guidePromptData?.fichaTecnica?.trim() !== '' ||
      productData.freePrompt?.guidePromptData?.guionConversacional?.trim() !== '' ||
      productData.freePrompt?.guidePromptData?.posiblesSituaciones?.trim() !== '' ||
      productData.freePrompt?.guidePromptData?.reglasIA?.trim() !== ''
    );

    if (productData.freePrompt?.promptType === 'libre') {
      if (!freePromptValid) {
        missing.push('Prompt libre');
      }
      if (guidePromptValid) {
        missing.push('Conflicto: Prompt libre seleccionado pero campos de prompt guiado llenos');
      }
    } else if (productData.freePrompt?.promptType === 'guiado') {
      if (!guidePromptValid) {
        missing.push('Al menos un campo de prompt guiado');
      }
      if (freePromptValid) {
        missing.push('Conflicto: Prompt guiado seleccionado pero campo de prompt libre lleno');
      }
    } else {
      missing.push('Tipo de prompt (libre o guiado)');
    }

    if (!productData.reminder?.reminder1?.text?.trim()) {
      missing.push('Mensaje del recordatorio 1');
    }
    if (!productData.reminder?.reminder2?.text?.trim()) {
      missing.push('Mensaje del recordatorio 2');
    }

    if (!productData.triggers?.keywords?.trim()) {
      missing.push('Palabras clave');
    }

    return missing;
  };

const saveAssistant = async (forceInactive = false) => {
  const missingRequiredFields = validateRequiredFields();
  const hasMissingFields = missingRequiredFields.length > 0;
  
  const isMissingName = missingRequiredFields.includes('Nombre del producto');
  
  if (isMissingName) {
    setShowNameRequiredDialog(true);
    return;
  }
  
  const isInactive = forceInactive || hasMissingFields;
  
  if (hasMissingFields && !forceInactive) {
    setMissingFields(missingRequiredFields);
    setIsSecondAttempt(true);
    setShowValidationDialog(true);
    return;
  }

  setIsLoading(true);
  
  try {
    console.log('🎯 MediaItems antes del mapeo:', productData.messageWel?.mediaItems);
    
    const mappedData = mapProductDataToServiceFormat(productData, isInactive);
    const productNameFromData = productData.info?.formData?.name?.trim() || '';
    
    console.log('📊 Datos completos mapeados:', mappedData);
    
    const validationErrors = validateProductData(mappedData);
    if (validationErrors.length > 0) {
      throw new Error(`Datos inválidos: ${validationErrors.join(', ')}`);
    }
    
    if (isEditMode()) {
      console.log('🔄 Modo edición - actualizando producto:', productName);
      console.log('📝 Datos a enviar para actualización:', mappedData);

      const response = await ProductService.updateProduct(productName, mappedData);
      console.log('✅ Respuesta de actualización:', response);

      if (response && (response.status === 'ok' || response.message || response.data)) {
        alert(`¡Producto "${productName || 'nuevo'}" actualizado exitosamente!`);
        navigate('/productos-config'); 
      } else {
        throw new Error('Error al actualizar el producto - respuesta inválida');
      }
    } else {
      console.log('🆕 Modo creación - creando nuevo producto');
      console.log('📝 Datos a enviar para creación:', mappedData);
      
      const response = await ProductService.createProduct(mappedData);
      console.log('✅ Respuesta de creación:', response);

      if (response && (response.status === 'ok' || response.message || response.data)) {
        alert(`¡Asistente "${productNameFromData}" guardado exitosamente como ${isInactive ? 'inactivo' : 'activo'}!`);
        navigate('/productos-config'); 
      } else {
        throw new Error('Error al guardar el asistente - respuesta inválida');
      }
    }
  } catch (error) {
    console.error('❌ Error al guardar el asistente:', error);
    console.error('📊 Datos que causaron el error:', productData);
    alert(`Error al ${isEditMode() ? 'actualizar' : 'guardar'} el asistente: ${error.message}`);
  } finally {
    setIsLoading(false);
    setIsSecondAttempt(false);
  }
};

  const handleValidationDialogClose = () => {
    setShowValidationDialog(false);
    setMissingFields([]);
  };

  const handleNameRequiredDialogClose = () => {
    setShowNameRequiredDialog(false);
  };

  const handleConfirmSecondAttempt = () => {
    setShowValidationDialog(false);
    saveAssistant(true); 
  };

  const renderMissingFieldsContent = () => {
    const actionText = isEditMode() ? 'actualizar' : 'guardar';
    const entityText = isEditMode() ? 'producto' : 'agente';
    
    return (
      <div>
        {isSecondAttempt ? (
          <>
            <p className="mb-4">¿Está seguro de {actionText} el {entityText} con los siguientes campos obligatorios vacíos?</p>
            <ul className="list-disc pl-5 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-600">
                  {field}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Su {entityText} será {isEditMode() ? 'actualizado' : 'guardado'} como "inactivo"
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">Los siguientes campos obligatorios están vacíos:</p>
            <ul className="list-disc pl-5 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-600">
                  {field}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Por favor complete estos campos antes de {actionText} el {entityText}.
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <SaveButton
        isLoading={isLoading}
        onClick={() => saveAssistant(false)}
        className="fixed bottom-8 left-80"
      />

      <AlertDialog
        title={isSecondAttempt ? 
          `Confirmar ${isEditMode() ? 'actualización' : 'guardado'} con campos faltantes` : 
          "Campos requeridos faltantes"
        }
        content={renderMissingFieldsContent()}
        isOpen={showValidationDialog}
        onClose={handleValidationDialogClose}
        onConfirm={isSecondAttempt ? handleConfirmSecondAttempt : handleValidationDialogClose}
        confirmText={isSecondAttempt ? 
          `${isEditMode() ? 'Actualizar' : 'Guardar'} como inactivo` : 
          "Entendido"
        }
        showCancel={isSecondAttempt}
        cancelText="Cancelar"
      />

      <AlertDialog
        title="Campo obligatorio faltante"
        content={
          <div>
            <p className="mb-4">El campo "Nombre del producto" es obligatorio y no puede estar vacío.</p>
            <p className="text-sm text-slate-600">
              Por favor complete este campo antes de {isEditMode() ? 'actualizar' : 'guardar'} el {isEditMode() ? 'producto' : 'asistente'}.
            </p>
          </div>
        }
        isOpen={showNameRequiredDialog}
        onClose={handleNameRequiredDialogClose}
        onConfirm={handleNameRequiredDialogClose}
        confirmText="Entendido"
        showCancel={false}
      />
    </>
  );
};