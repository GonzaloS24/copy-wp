import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { useProductSave } from '../../hooks/useProductSave';
import { AlertDialog } from './content/dialog/AlertDialog';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { ProductService } from '../../services/productService';
import { useProductMapping } from '../../hooks/useProductMapping';

import { DEFAULT_VALUES } from '../../utils/valuesDefault';

import { Portal } from '../exit/Portal';

export const VerificateExit = () => {
  const { productName } = useParams();
  const { productData } = useProduct();
  const {
    isSaving,
    saveProduct,
    navigate 
  } = useProductSave();
  
  const [modifiedFields, setModifiedFields] = useState([]);
  const [saveError, setSaveError] = useState(null);
  const [originalProductData, setOriginalProductData] = useState(null);
  const [isLoadingOriginal, setIsLoadingOriginal] = useState(false);
  
  const shouldBlock = modifiedFields.length > 0;
  const { 
    showDialog, 
    confirmNavigation, 
    cancelNavigation, 
    isUnloadAction,
    blockProgrammaticNavigation // Usar la nueva función
  } = useNavigationBlocker(shouldBlock);
  
  const { mapApiDataToProductData } = useProductMapping();

  const isEditMode = !!productName;
  const hasLoadedOriginalRef = useRef(false);

  const handleProgrammaticNavigation = useCallback((navigationCallback) => {
    return blockProgrammaticNavigation(navigationCallback, false);
  }, [blockProgrammaticNavigation]);

  React.useEffect(() => {
    window.__handleProgrammaticNavigation = handleProgrammaticNavigation;
    
    return () => {
      delete window.__handleProgrammaticNavigation;
    };
  }, [handleProgrammaticNavigation]);

  const loadOriginalProductData = useCallback(async () => {
    if (!isEditMode || !productName || hasLoadedOriginalRef.current) return;
    
    setIsLoadingOriginal(true);
    try {
      console.log('🔄 Cargando datos originales del producto para comparación:', productName);
      
      const response = await ProductService.getProductConfiguration(productName);
      
      if (!response?.data?.length) {
        console.warn('No se encontró configuración original para este producto');
        return;
      }

      const productInfo = response.data[0];
      const apiData = productInfo.value;

      const originalData = mapApiDataToProductData(apiData);

      setOriginalProductData(originalData);
      hasLoadedOriginalRef.current = true;
      console.log('✅ Datos originales cargados para comparación:', originalData);
      
    } catch (error) {
      console.error('❌ Error al cargar datos originales del producto:', error);
    } finally {
      setIsLoadingOriginal(false);
    }
  }, [isEditMode, productName, mapApiDataToProductData]);

  useEffect(() => {
    loadOriginalProductData();
  }, [loadOriginalProductData]);

  const getFieldDisplayName = (fieldKey) => {
    const fieldNames = {
      name: 'Nombre del producto',
      price: 'Precio',
      currency: 'Moneda',
      productType: 'Tipo de producto',
      id: 'ID',
      image: 'Imagen',
      initialMessage: 'Mensaje inicial',
      entryQuestion: 'Pregunta de entrada',
      contextualizacion: 'Contextualización',
      fichaTecnica: 'Ficha técnica',
      guionConversacional: 'Guion conversacional',
      posiblesSituaciones: 'Posibles situaciones',
      reglasIA: 'Reglas de IA',
      voiceId: 'ID de voz',
      apiKey: 'API Key',
      stability: 'Estabilidad de voz',
      similarity: 'Similitud de voz',
      style: 'Estilo de voz',
      useSpeakerBoost: 'Speaker Boost',
      keywords: 'Palabras clave',
      adIds: 'IDs de anuncio'
    };
    
    return fieldNames[fieldKey] || fieldKey;
  };

  const areValuesDifferent = (currentValue, originalValue, fieldKey = '') => {

    if (currentValue === null || currentValue === undefined) {
      return originalValue !== null && originalValue !== undefined;
    }
    if (originalValue === null || originalValue === undefined) {
      return currentValue !== null && currentValue !== undefined;
    }
    
    if (Array.isArray(currentValue) && Array.isArray(originalValue)) {
      return JSON.stringify(currentValue) !== JSON.stringify(originalValue);
    }
    
    if (typeof currentValue === 'object' && typeof originalValue === 'object') {
      return JSON.stringify(currentValue) !== JSON.stringify(originalValue);
    }
    
    if (fieldKey === 'image') {
      if (currentValue instanceof File) {
        return true; 
      }
      return currentValue !== originalValue;
    }
    
    return currentValue !== originalValue;
  };

  const getModifiedFields = useCallback(() => {
    if (isEditMode && (!originalProductData || isLoadingOriginal)) return [];
    
    const comparisonData = isEditMode ? originalProductData : DEFAULT_VALUES;
    
    if (!comparisonData) return [];
    
    const modified = [];
    
    if (productData.info?.formData && comparisonData.info?.formData) {
      Object.keys(productData.info.formData).forEach(key => {
        const currentValue = productData.info.formData[key];
        const comparisonValue = comparisonData.info.formData[key];
        
        if (areValuesDifferent(currentValue, comparisonValue, key)) {
          modified.push(`Información: ${getFieldDisplayName(key)}`);
        }
      });
    }
    
    if (productData.messageWel?.formData && comparisonData.messageWel?.formData) {
      Object.keys(productData.messageWel.formData).forEach(key => {
        const currentValue = productData.messageWel.formData[key];
        const comparisonValue = comparisonData.messageWel.formData[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Mensajes: ${getFieldDisplayName(key)}`);
        }
      });
      
      const currentMedia = productData.messageWel?.mediaItems || [];
      const comparisonMedia = comparisonData.messageWel?.mediaItems || [];
      
      if (currentMedia.length !== comparisonMedia.length) {
        modified.push('Archivos multimedia');
      } else {
        for (let i = 0; i < currentMedia.length; i++) {
          if (areValuesDifferent(currentMedia[i]?.url, comparisonMedia[i]?.url)) {
            modified.push('Archivos multimedia');
            break;
          }
        }
      }
    }
    
    if (productData.freePrompt && comparisonData.freePrompt) {
      if (areValuesDifferent(productData.freePrompt.promptType, comparisonData.freePrompt.promptType)) {
        modified.push('Tipo de prompt');
      }
      
      if (areValuesDifferent(productData.freePrompt.promptText, comparisonData.freePrompt.promptText)) {
        modified.push('Prompt libre');
      }
      
      if (productData.freePrompt.guidePromptData && comparisonData.freePrompt.guidePromptData) {
        Object.keys(productData.freePrompt.guidePromptData).forEach(key => {
          const currentValue = productData.freePrompt.guidePromptData[key] || '';
          const comparisonValue = comparisonData.freePrompt.guidePromptData[key] || '';
          if (areValuesDifferent(currentValue.trim(), comparisonValue.trim())) {
            modified.push(`Prompt guiado: ${getFieldDisplayName(key)}`);
          }
        });
      }
    }
    
    if (productData.voice && comparisonData.voice) {
      Object.keys(productData.voice).forEach(key => {
        const currentValue = productData.voice[key];
        const comparisonValue = comparisonData.voice[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Voz IA: ${getFieldDisplayName(key)}`);
        }
      });
    }
    
    if (productData.reminder && comparisonData.reminder) {

      if (productData.reminder.reminder1 && comparisonData.reminder.reminder1) {
        Object.keys(productData.reminder.reminder1).forEach(key => {
          const currentValue = productData.reminder.reminder1[key];
          const comparisonValue = comparisonData.reminder.reminder1[key];
          if (areValuesDifferent(currentValue, comparisonValue)) {
            modified.push(`Recordatorio 1: ${getFieldDisplayName(key)}`);
          }
        });
      }
      
      if (productData.reminder.reminder2 && comparisonData.reminder.reminder2) {
        Object.keys(productData.reminder.reminder2).forEach(key => {
          const currentValue = productData.reminder.reminder2[key];
          const comparisonValue = comparisonData.reminder.reminder2[key];
          if (areValuesDifferent(currentValue, comparisonValue)) {
            modified.push(`Recordatorio 2: ${getFieldDisplayName(key)}`);
          }
        });
      }
      
      if (productData.reminder.timeRange && comparisonData.reminder.timeRange) {
        Object.keys(productData.reminder.timeRange).forEach(key => {
          const currentValue = productData.reminder.timeRange[key];
          const comparisonValue = comparisonData.reminder.timeRange[key];
          if (areValuesDifferent(currentValue, comparisonValue)) {
            modified.push(`Rango horario: ${getFieldDisplayName(key)}`);
          }
        });
      }
    }
    
    if (productData.remarketing && comparisonData.remarketing) {

      if (productData.remarketing.remarketing1 && comparisonData.remarketing.remarketing1) {
        Object.keys(productData.remarketing.remarketing1).forEach(key => {
          const currentValue = productData.remarketing.remarketing1[key];
          const comparisonValue = comparisonData.remarketing.remarketing1[key];
          if (areValuesDifferent(currentValue, comparisonValue)) {
            modified.push(`Remarketing 1: ${getFieldDisplayName(key)}`);
          }
        });
      }
      
      if (productData.remarketing.remarketing2 && comparisonData.remarketing.remarketing2) {
        Object.keys(productData.remarketing.remarketing2).forEach(key => {
          const currentValue = productData.remarketing.remarketing2[key];
          const comparisonValue = comparisonData.remarketing.remarketing2[key];
          if (areValuesDifferent(currentValue, comparisonValue)) {
            modified.push(`Remarketing 2: ${getFieldDisplayName(key)}`);
          }
        });
      }
    }
    
    if (productData.activators && comparisonData.activators) {

      if (areValuesDifferent(productData.activators.keywords, comparisonData.activators.keywords)) {
        modified.push('Palabras clave');
      }
      
      if (areValuesDifferent(productData.activators.adIds, comparisonData.activators.adIds)) {
        modified.push('IDs de anuncio');
      }
    }
    
    return modified;
  }, [productData, originalProductData, isLoadingOriginal, isEditMode]);

  useEffect(() => {
    const modified = getModifiedFields();
    setModifiedFields(modified);
  }, [getModifiedFields]);

const handleSaveAndContinue = async () => {
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
};


  useEffect(() => {
    if (!showDialog) {
      setSaveError(null);
    }
  }, [showDialog]);

  useEffect(() => {
    const showPersistentWarning = () => {
      const existingWarning = document.querySelector('.unsaved-changes-warning');
      if (existingWarning) {
        existingWarning.remove();
      }
      if (shouldBlock) {
        const warning = document.createElement('div');
        warning.className = 'unsaved-changes-warning';
        warning.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #92400e;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border-bottom: 2px solid #d97706;
          ">
            ⚠️ ${modifiedFields.length} cambio${modifiedFields.length > 1 ? 's' : ''} sin guardar  
          </div>
        `;
        document.body.appendChild(warning);
      }
    };
    showPersistentWarning();
    return () => {
      const warning = document.querySelector('.unsaved-changes-warning');
      if (warning) {
        warning.remove();
      }
    };
  }, [shouldBlock, modifiedFields.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (shouldBlock) {
          handleSaveAndContinue();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldBlock]);

  const getDialogButtons = () => {
    return [
      {
        text: isSaving ? 'Guardando...' : 'Guardar cambios',
        onClick: handleSaveAndContinue,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        disabled: isSaving
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

  const renderModifiedFieldsContent = () => {
    if (modifiedFields.length === 0) return null;
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {isUnloadAction ? '¿Cerrar sin guardar?' : '¿Salir sin guardar?'}
          </p>
          <p className="text-sm text-gray-600">
            Tienes *{modifiedFields.length} campo{modifiedFields.length > 1 ? 's' : ''} con cambios sin guardar:
          </p>
          
          {saveError && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
              {saveError}
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-40 overflow-y-auto">
          <ul className="text-sm space-y-2">
            {modifiedFields.map((field, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{field}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Portal>
      <AlertDialog
        isOpen={showDialog}
        onClose={cancelNavigation}
        title={isUnloadAction ? 'Cerrar sin guardar' : 'Salir sin guardar'}
        content={renderModifiedFieldsContent()}
        buttons={getDialogButtons()}
      />
    </Portal>
  );
};