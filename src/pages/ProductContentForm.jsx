import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductSidebar } from '../components/productForm/ProductSidebar';
import { ProductInfo } from '../components/productForm/content/ProducInfo';
import { ProductMessageWel } from '../components/productForm/content/ProductMessageWel';
import { ProductFreePrompt } from '../components/productForm/content/ProductFreePrompt';
import { ProductVoice } from '../components/productForm/content/ProductVoice';
import { ProductReminder } from '../components/productForm/content/ProductReminder';
import { ProductRemarketing } from '../components/productForm/content/ProductRemarketing';
import { ProductActivators } from '../components/productForm/content/ProductActivators';
import { ProductButtons } from '../components/productForm/ProductButtons';
import { ProductChat } from '../components/productForm/content/ProductChat';
import { MainLayout } from '../components/MainLayout';
import { ProductProvider, useProduct } from '../context/ProductContext';

import { ProductService } from '../services/productService';
import { VerificateExit } from '../components/productForm/VerificateExit';
import { useProductMapping } from '../hooks/useProductMapping'; 

const ProductContentFormInner = () => {
  const [activeSection, setActiveSection] = React.useState('info-producto');
  const [isLoading, setIsLoading] = React.useState(false);
  const { productName } = useParams();
  const { updateProductData } = useProduct();
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const { mapApiDataToProductData } = useProductMapping(); 

  const isEditMode = !!productName;

  React.useEffect(() => {
    if (!isEditMode || hasLoaded) {
      setIsLoading(false);
      return;
    }

    if (!productName || hasLoaded) return;

    const fetchAndLoadProduct = async () => {
      setIsLoading(true);
      try {
        console.log('🔄 Cargando producto con identificador:', productName);
        
        const response = await ProductService.getProductConfiguration(productName);
        
        if (!response?.data?.length) {
          console.warn('No se encontró configuración para este producto');
          setIsLoading(false);
          return;
        }

        const productInfo = response.data[0];
        console.log('📄 Información del producto recibida:', productInfo);

        const apiData = productInfo.value;
        console.log('📊 Datos de la API parseados:', apiData);
        
        const mappedData = mapApiDataToProductData(apiData);

        console.log('🎯 Datos mapeados para contexto:', mappedData);
        console.log('⚡ Datos específicos de activators:', mappedData.activators);

        updateProductData('', mappedData);
        setHasLoaded(true);
        
      } catch (error) {
        console.error('❌ Error al cargar el producto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndLoadProduct();
  }, [productName, hasLoaded, updateProductData, isEditMode, mapApiDataToProductData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
        </div>
      );
    }

    switch (activeSection) {
      case 'info-producto':
        return <ProductInfo />;
      case 'embudo-ventas':
        return <ProductMessageWel />;
      case 'prompt-producto':
        return <ProductFreePrompt />;
      case 'voz-ia':
        return <ProductVoice />;
      case 'recordatorios':
        return <ProductReminder />;
      case 'remarketing':
        return <ProductRemarketing />;
      case 'activador-flujo':
        return <ProductActivators />;
      case 'prueba-flujo':
        return <ProductChat />;
      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Sección en desarrollo</div>;
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-white">
        <ProductSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 bg-gray-50 ml-64 overflow-auto">
          <div className="p-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
              {renderContent()}
            </div>
          </div>
        </main>

        <ProductButtons />
      </div>
      <VerificateExit />
    </MainLayout>
  );
};

export const ProductContentForm = () => {
  return (
    <ProductProvider>
      <ProductContentFormInner />
    </ProductProvider>
  );
};