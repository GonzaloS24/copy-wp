import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/productService';
import { mapProductDataToServiceFormat } from '../utils/productDataMapper';

export const useProductSave = () => {
  const { productName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [isSecondAttempt, setIsSecondAttempt] = useState(false);
  const [showNameRequiredDialog, setShowNameRequiredDialog] = useState(false);

  const isEditMode = () => {
    return productName && location.pathname.includes(`/${productName}`);
  };

  const formatPromptText = (promptText, promptType) => {
    if (!promptText || typeof promptText !== 'string') return '';
    if (promptType === 'libre' && promptText.trim() !== '') {
      return promptText.replace(/\n/g, '\\n');
    }
    return promptText;
  };

  const getPromptText = (freePrompt) => {
    const promptData = freePrompt?.promptText || freePrompt?.promptContent;
    if (!promptData) return '';
    
    let processedText = '';
    if (typeof promptData === 'string') {
      processedText = promptData;
    } else if (typeof promptData === 'object') {
      if (promptData.text) processedText = promptData.text;
      else if (promptData.prompt) processedText = promptData.prompt;
      else if (promptData.content) processedText = promptData.content;
      else if (promptData.value) processedText = promptData.value;
      else {
        const keys = Object.keys(promptData);
        if (keys.length === 1) {
          const value = promptData[keys[0]];
          if (typeof value === 'string') processedText = value;
        }
      }
    }
    return formatPromptText(processedText, freePrompt?.promptType);
  };

  // Función para extraer el ID del producto de la respuesta del servidor
  const extractProductIdFromResponse = (response, productName) => {
    // Intentar extraer el ID de diferentes partes de la respuesta
    if (response?.data?.id) {
      return response.data.id;
    }
    
    if (response?.data?.product_id) {
      return response.data.product_id;
    }
    
    if (response?.data?.productId) {
      return response.data.productId;
    }
    
    // Si hay un campo name o similar que contenga el ID
    if (response?.data?.name) {
      const match = response.data.name.match(/\[Producto Ventas Wp\]\s*(.+)/);
      if (match && match[1]) {
        // Verificar si es un número puro
        if (/^\d+$/.test(match[1].trim())) {
          return match[1].trim();
        }
        return match[1].trim();
      }
    }
    
    // Como fallback, usar el nombre del producto limpio
    if (productName && typeof productName === 'string') {
      // Si el nombre del producto es solo un número, usarlo
      if (/^\d+$/.test(productName.trim())) {
        return productName.trim();
      }
      return productName.trim();
    }
    
    return null;
  };

  const validateRequiredFields = (productData) => {
    const missing = [];
    if (!productData.info?.formData?.name?.trim()) {
      missing.push('Nombre del producto');
      return missing;
    }
    if (!productData.info?.formData?.price?.trim()) {
      missing.push('Precio del producto');
    }
    if (!productData.info?.formData?.productType?.trim()) {
        missing.push('Tipo de producto');
    }

    const productType = productData.info?.formData?.productType;
    const shouldValidateDtaPrompt = productType === 'digital' || productType === 'servicio';

 if (shouldValidateDtaPrompt) {
        const dtaPromptValue = productData.info?.formData?.dta_prompt;
        if (typeof dtaPromptValue !== 'string' || dtaPromptValue.trim() === '') {
            missing.push('Datos solicitados al cliente para producto '+ productType);
        }
    }
    

    if (!productData.messageWel?.formData?.initialMessage?.trim()) {
      missing.push('Mensaje inicial');
    }
    if (!productData.messageWel?.formData?.entryQuestion?.trim()) {
      missing.push('Pregunta de entrada');
    }
    
    const hasValidKeywords = productData.activators?.keywords?.some(keyword => 
    keyword && keyword.trim() !== ''
    );

    const freePromptValid = getPromptText(productData.freePrompt).trim() !== '';

    const guidePromptData = productData.freePrompt?.guidePromptData;
    const guidePromptValid = guidePromptData && 
      Object.values(guidePromptData).some(value => typeof value === 'string' && value.trim() !== '');

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
    if (!hasValidKeywords) {
      missing.push('Palabras clave');
    }
    return missing;
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

  const saveProduct = async (productData, forceInactive = false) => {
    const missingRequiredFields = validateRequiredFields(productData);
    const hasMissingFields = missingRequiredFields.length > 0;
    const isMissingName = missingRequiredFields.includes('Nombre del producto');

    if (isMissingName) {
      setShowNameRequiredDialog(true);
      return { success: false, requiresName: true };
    }

    const isInactive = forceInactive || hasMissingFields;

    if (hasMissingFields && !forceInactive) {
      setMissingFields(missingRequiredFields);
      setIsSecondAttempt(true);
      setShowValidationDialog(true);
      return { success: false, hasMissingFields: true };
    }

    setIsSaving(true);

    try {
      console.log('MediaItems antes del mapeo:', productData.messageWel?.mediaItems);
      const mappedData = mapProductDataToServiceFormat(productData, isInactive);
      const productNameFromData = productData.info?.formData?.name?.trim() || '';
      console.log('Datos completos mapeados:', mappedData);
      
      const validationErrors = validateProductData(mappedData);
      if (validationErrors.length > 0) {
        throw new Error(`Datos inválidos: ${validationErrors.join(', ')}`);
      }

      if (isEditMode()) {
        console.log('Modo edición - actualizando producto:', productName);
        console.log('Datos a enviar para actualización:', mappedData);
        const response = await ProductService.updateProduct(productName, mappedData);
        console.log('Respuesta de actualización:', response);
        
        if (response && (response.status === 'ok' || response.message || response.data)) {
          return { 
            success: true, 
            message: `¡Producto "${productName || 'nuevo'}" actualizado exitosamente!`,
            navigateTo: '/productos-config'
          };
        } else {
          throw new Error('Error al actualizar el producto - respuesta inválida');
        }
      } else {
        console.log('🆕 Modo creación - creando nuevo producto');
        console.log('📝 Datos a enviar para creación:', mappedData);
        const response = await ProductService.createProduct(mappedData);
        console.log('✅ Respuesta de creación:', response);
        
        if (response && (response.status === 'ok' || response.message || response.data)) {
          // Extraer el ID del producto creado para redirigir a la página de edición
          const productId = extractProductIdFromResponse(response, productNameFromData);
          
          const redirectPath = productId ? `/producto/${productId}` : '/productos-config';
          
          console.log(`🎯 Redirigiendo a: ${redirectPath}`);
          
          return { 
            success: true, 
            message: `¡Asistente "${productNameFromData}" guardado exitosamente como ${isInactive ? 'inactivo' : 'activo'}!`,
            navigateTo: redirectPath
          };
        } else {
          throw new Error('Error al guardar el asistente - respuesta inválida');
        }
      }
    } catch (error) {
      console.error('Error al guardar el asistente:', error);
      return { 
        success: false, 
        error: `Error al ${isEditMode() ? 'actualizar' : 'guardar'} el asistente: ${error.message}` 
      };
    } finally {
      setIsSaving(false);
      setIsSecondAttempt(false);
    }
  };

  return {
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
    navigate
  };
};