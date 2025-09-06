import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useProductSave } from '../hooks/useProductSave';
import { useNavigationBlocker } from '../hooks/useNavigationBlocker';
import { ProductService } from '../services/productService';
import { useProductMapping } from '../hooks/useProductMapping';
import { DEFAULT_VALUES } from '../utils/valuesDefault';
import { detectModifiedFields } from '../utils/ventasWp/modifiedFieldsDetector';

export const useVerificationExit = () => {
  const { productName } = useParams();
  const { productData, updateProductData } = useProduct();
  const { isSaving, saveProduct, navigate } = useProductSave();
  const { mapApiDataToProductData } = useProductMapping();

  const isEditMode = !!productName;
  const [modifiedFields, setModifiedFields] = useState([]);
  const [saveError, setSaveError] = useState(null);
  const [originalProductData, setOriginalProductData] = useState(null);
  const [isLoadingOriginal, setIsLoadingOriginal] = useState(false);
  const hasLoadedOriginalRef = useRef(false);

  const shouldBlock = modifiedFields.length > 0 && !isLoadingOriginal;

  const navigationBlocker = useNavigationBlocker(shouldBlock);

  const loadOriginalProductData = useCallback(async () => {
    if (!isEditMode || !productName || hasLoadedOriginalRef.current) return;
    
    setIsLoadingOriginal(true);
    try {
      const response = await ProductService.getProductConfiguration(productName);
      
      if (!response?.data?.length) {
        console.warn('No se encontró configuración original para este producto');
        return;
      }

      const productInfo = response.data[0];
      const originalData = mapApiDataToProductData(productInfo.value);
      
      setOriginalProductData(originalData);
      hasLoadedOriginalRef.current = true;
    } catch (error) {
      console.error('Error al cargar datos originales del producto:', error);
    } finally {
      setIsLoadingOriginal(false);
    }
  }, [isEditMode, productName, mapApiDataToProductData]);

  // función de reset
  const resetProductState = useCallback(async () => {
    console.log('🔄 Reseteando estado del producto...');
    
    try {
      if (isEditMode && productName) {
        setIsLoadingOriginal(true);
        const response = await ProductService.getProductConfiguration(productName);
        
        if (response?.data?.length) {
          const productInfo = response.data[0];
          const freshData = mapApiDataToProductData(productInfo.value);
          
          // Actualizar datos originales
          setOriginalProductData(freshData);
          
          // Actualizar el contexto con los datos frescos del servidor
          updateProductData('', freshData);
          
          console.log('✅ Estado reseteado con datos del servidor');
        }
      }
    } catch (error) {
      console.error('❌ Error al resetear estado:', error);
    } finally {
      setIsLoadingOriginal(false);
    }
  }, [isEditMode, productName, mapApiDataToProductData, updateProductData]);

  // Listener para el reset automático después de guardar
  useEffect(() => {
    const handleReset = () => {
      resetProductState();
    };

    window.addEventListener('resetProductState', handleReset);
    
    return () => {
      window.removeEventListener('resetProductState', handleReset);
    };
  }, [resetProductState]);

  useEffect(() => {
    loadOriginalProductData();
  }, [loadOriginalProductData]);

  const getModifiedFields = useCallback(() => {
    if (isEditMode && (!originalProductData || isLoadingOriginal)) return [];
    
    const comparisonData = isEditMode ? originalProductData : DEFAULT_VALUES;
    
    if (!comparisonData) return [];
    
    return detectModifiedFields(productData, comparisonData, isEditMode);
  }, [productData, originalProductData, isLoadingOriginal, isEditMode]);

  useEffect(() => {
    const modified = getModifiedFields();
    setModifiedFields(modified);
  }, [getModifiedFields]);

  return {
    isEditMode,
    modifiedFields,
    setModifiedFields,
    saveError,
    setSaveError,
    originalProductData,
    isLoadingOriginal,
    shouldBlock,
    productData,
    isSaving,
    saveProduct,
    navigate,
    getModifiedFields,
    resetProductState,
    blockProgrammaticNavigation: navigationBlocker.blockProgrammaticNavigation, 
    ...navigationBlocker
  };
};