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

const ProductContentFormInner = () => {
  const [activeSection, setActiveSection] = React.useState('info-producto');
  const [isLoading, setIsLoading] = React.useState(false);
  const { productName } = useParams();
  const { updateProductData } = useProduct();
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const isEditMode = !!productName;

  React.useEffect(() => {
    if (!isEditMode || hasLoaded) {
      setIsLoading(false);
      return;
    }

    if (!productName || hasLoaded) return;

    const formattedName = productName.replace(/-/g, ' ');
    
    const fetchAndLoadProduct = async () => {
      setIsLoading(true);
      try {
        const response = await ProductService.getProductConfiguration(formattedName);
        
        if (!response?.data?.length) {
          console.warn('No se encontró configuración para este producto');
          setIsLoading(false);
          return;
        }

      
        const apiData = typeof response.data[0].value === 'string' 
          ? JSON.parse(response.data[0].value) 
          : response.data[0].value;

        console.log('Datos de la API parseados:', apiData);

        const promptData = apiData.prompt || {};
        console.log('Datos del prompt: ', promptData)        

        const tipoPrompt = promptData.tipo_de_prompt || 'libre';
        
        let promptText = '';
        let guidePromptData = {};
        let contextualizacionText = '';

        if (tipoPrompt === 'libre') {
          promptText = promptData.prompt_libre || '';
        } else if (tipoPrompt === 'guiado') {
          guidePromptData = {
            contextualizacion: promptData.prompt_guiado_contextualizacion || '',
            fichaTecnica: promptData.prompt_guiado_ficha_tecnica || '',
            guionConversacional: promptData.prompt_guiado_guion_conversacional || '',
            posiblesSituaciones: promptData.prompt_guiado_posibles_situaciones || '',
            reglasIA: promptData.prompt_guiado_reglas || ''
          };
          contextualizacionText = promptData.prompt_guiado_contextualizacion || '';
          
        
        }

        console.log('Tipo de prompt:', tipoPrompt);
        console.log('Texto del prompt (solo para tipo libre):', tipoPrompt === 'libre' ? promptText : 'undefined');
        console.log('Datos del prompt guiado:', tipoPrompt === 'guiado' ? guidePromptData : 'undefined');

        const activadoresData = apiData.activadores_del_flujo || {};
        console.log('Datos de activadores del flujo:', activadoresData);

        const keywordsFromApi = activadoresData.palabras_clave 
          ? activadoresData.palabras_clave.split(',').map(k => k.trim()).filter(k => k)
          : [];
        
        console.log('Palabras clave extraídas de la API:', keywordsFromApi);
      
        const defaultKeywords = ['', '', '', '', '', '', ''];
        const mergedKeywords = [...keywordsFromApi, ...defaultKeywords].slice(0, 7);

        const adIdsFromApi = activadoresData.ids_de_anuncio
          ? activadoresData.ids_de_anuncio.split(',').map(id => id.trim()).filter(id => id)
          : [];
        
        console.log('IDs de anuncio extraídos de la API:', adIdsFromApi);
        
        const defaultAdIds = ['', '', '', '', '', '', ''];
        const mergedAdIds = [...adIdsFromApi, ...defaultAdIds].slice(0, 7);

        console.log('Keywords finales:', mergedKeywords);
        console.log('Ad IDs finales:', mergedAdIds);

      
        const mappedData = {
          info: {
            formData: {
              name: apiData.informacion_de_producto?.nombre || '',
              price: apiData.informacion_de_producto?.precio || '',
              id: apiData.informacion_de_producto?.id_dropi || '',
              description: '',
              image: apiData.informacion_de_producto?.imagen || null,
              currency: 'COP'
            },
            productType: apiData.informacion_de_producto?.tipo === 'si' ? 'variable' : 'simple',
            isActive: true
          },
          messageWel: {
            formData: {
              initialMessage: apiData.embudo_de_ventas?.mensaje_inicial || '',
              entryQuestion: apiData.embudo_de_ventas?.pregunta_de_entrada || ''
            },
            mediaItems: [
              { id: 1, type: 'image', icon: '🖼️', filled: !!apiData.embudo_de_ventas?.imagen_1 },
              { id: 2, type: 'video', icon: '▶️', filled: false },
              { id: 3, type: 'audio', icon: '🔊', filled: false }
            ]
          },
          freePrompt: {
            promptText: tipoPrompt === 'libre' ? promptText : undefined, 
            promptType: tipoPrompt,
            showTooltip: { libre: false, guiado: false },
            guidePromptData: tipoPrompt === 'guiado' ? guidePromptData : undefined 
          },
          voice: {
            voiceId: apiData.voz_con_ia?.id_de_la_voz || '',
            apiKey: apiData.voz_con_ia?.api_key_elevenlabs || '',
            stability: parseFloat(apiData.voz_con_ia?.estabilidad) || 0.3,
            similarity: parseFloat(apiData.voz_con_ia?.similaridad) || 0.7,
            style: parseFloat(apiData.voz_con_ia?.estilo) || 0.5,
            useSpeakerBoost: apiData.voz_con_ia?.speaker_boost === 'true'
          },
          reminder: {
            reminder1: {
              time: parseInt(apiData.recordatorios?.tiempo_1) || 5,
              unit: 'minutos',
              text: apiData.recordatorios?.mensaje_1 || ''
            },
            reminder2: {
              time: parseInt(apiData.recordatorios?.tiempo_2) || 10,
              unit: 'minutos',
              text: apiData.recordatorios?.mensaje_2 || ''
            },
            timeRange: {
              enabled: !!apiData.recordatorios?.horario_minimo,
              minTime: apiData.recordatorios?.horario_minimo || '09:00',
              maxTime: apiData.recordatorios?.horario_maximo || '20:00'
            }
          },
          remarketing: {
            remarketing1: {
              time: parseInt(apiData.remarketing?.tiempo_1) || 0,
              unit: 'minutos',
              template: apiData.remarketing?.plantilla_remarketing_1 || ''
            },
            remarketing2: {
              time: parseInt(apiData.remarketing?.tiempo_2) || 0,
              unit: 'minutos',
              template: apiData.remarketing?.plantilla_remarketing_2 || ''
            }
          },
          activators: {
            keywords: mergedKeywords,
            adIds: mergedAdIds
          }
        };

        console.log('Datos mapeados para contexto:', mappedData);
        console.log('Activators data específica:', mappedData.activators);

        updateProductData('', mappedData);
        setHasLoaded(true);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndLoadProduct();
  }, [productName, hasLoaded, updateProductData, isEditMode]);

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