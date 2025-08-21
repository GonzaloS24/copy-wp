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

const parseTimeAndUnit = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return { time: 0, unit: 'minutos' };
  }

  const match = timeString.match(/^(\d+)(segundos|minutos|horas|dias)$/i);
  
  if (match) {
    const time = parseInt(match[1], 10);
    let unit = match[2].toLowerCase();
    
    if (unit === 'segundos') unit = 'segundos';
    else if (unit === 'minutos') unit = 'minutos'; 
    else if (unit === 'horas') unit = 'horas';
    else if (unit === 'dias') unit = 'dias';
    
    return { time, unit };
  }
  
  const numberMatch = timeString.match(/\d+/);
  if (numberMatch) {
    return { 
      time: parseInt(numberMatch[0], 10), 
      unit: 'minutos'
    };
  }
  
  return { time: 0, unit: 'minutos' };
};

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

        const promptData = apiData.prompt || {};
        console.log('🤖 Datos del prompt:', promptData);        

        const tipoPrompt = promptData.tipo_de_prompt || 'libre';
        
        let promptText = '';
        let guidePromptData = {};

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
        }

        const activadoresData = apiData.activadores_del_flujo || {};
        console.log('🎯 Datos de activadores del flujo:', activadoresData);

        const keywordsFromApi = activadoresData.palabras_clave 
          ? activadoresData.palabras_clave.split(',').map(k => k.trim()).filter(k => k)
          : [];
        
        console.log('🔑 Palabras clave extraídas:', keywordsFromApi);
      
        const defaultKeywords = ['', '', '', '', '', '', ''];
        const mergedKeywords = [...keywordsFromApi, ...defaultKeywords].slice(0, 7);

        const adIdsFromApi = activadoresData.ids_de_anuncio
          ? activadoresData.ids_de_anuncio.split(',').map(id => id.trim()).filter(id => id)
          : [];
        
        console.log('📢 IDs de anuncio extraídos:', adIdsFromApi);
        
        const defaultAdIds = ['', '', '', '', '', '', ''];
        const mergedAdIds = [...adIdsFromApi, ...defaultAdIds].slice(0, 7);

        console.log('✅ Keywords finales:', mergedKeywords);
        console.log('✅ Ad IDs finales:', mergedAdIds);

        const infoProducto = apiData.informacion_de_producto || {};
        const embudoVentas = apiData.embudo_de_ventas || {};
        const vozIA = apiData.voz_con_ia || {};
        const recordatorios = apiData.recordatorios || {};
        const remarketing = apiData.remarketing || {};

        const recordatoriosData = apiData.recordatorios || {};
        const reminder1Data = parseTimeAndUnit(recordatoriosData.tiempo_1);
        const reminder2Data = parseTimeAndUnit(recordatoriosData.tiempo_2);

        const remarketingData = apiData.remarketing || {};
        const remarketing1Data = parseTimeAndUnit(remarketingData.tiempo_1);
        const remarketing2Data = parseTimeAndUnit(remarketingData.tiempo_2);
        
        const getFileType = (url) => {
            if (!url || typeof url !== 'string') return 'document';
            
            const fileExtension = url.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileExtension)) {
              return 'image';
            } else if (['mp4', 'avi', 'mov', 'webm', 'mkv', 'flv'].includes(fileExtension)) {
              return 'video';
            } else if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(fileExtension)) {
              return 'audio';
            } else {
              return 'document';
            }
          };

          const getFileIcon = (type) => {
            const icons = {
              image: '🖼️',
              video: '▶️',
              audio: '🔊',
              document: '📄'
            };
            return icons[type] || '📄';
          };

          const multimediaData = embudoVentas.multimedia || {};
          const mediaItems = [];

          Object.entries(multimediaData).forEach(([key, url], index) => {
            if (url && typeof url === 'string' && url.trim() !== '') {
              const fileType = getFileType(url);
              const mediaItem = {
                id: index + 1,
                type: fileType,
                icon: getFileIcon(fileType),
                filled: true,
                url: url.trim(),
                key: key,
                fileName: url.split('/').pop() || `archivo_${index + 1}`
              };
              
              mediaItems.push(mediaItem);
              console.log(`📁 Archivo ${index + 1} procesado:`, {
                key,
                type: fileType,
                url: url.substring(0, 50) + '...',
                fileName: mediaItem.fileName
              });
            }
          });

          if (mediaItems.length === 0) {
            mediaItems.push(
              { id: 1, type: 'image', icon: '🖼️', filled: false, url: '' },
              { id: 2, type: 'video', icon: '▶️', filled: false, url: '' },
              { id: 3, type: 'audio', icon: '🔊', filled: false, url: '' }
            );
          }

        const mappedData = {
          info: {
            formData: {
              name: infoProducto.nombre_del_producto || infoProducto.nombre || '',
              price: infoProducto.precio_del_producto || infoProducto.precio || '',
              id: infoProducto.id || infoProducto.id_dropi || '',
              description: infoProducto.descripcion || infoProducto.descripcion_del_producto || '',
              productType: infoProducto.tipo || infoProducto.tipo_de_producto || '',
              image: infoProducto.imagen_del_producto || infoProducto.imagen || null,
              currency: 'COP'
            },
            productType: infoProducto.variable === "VARIABLE" ? 'VARIABLE' : 'SIMPLE',
            isActive: infoProducto.estado === 'activo' || infoProducto.estado_producto === 'activo'
          },
          messageWel: {
              formData: {
                initialMessage: embudoVentas.mensaje_inicial || '¡Hola! Soy Laura, bienvenida a Master Shop.',
                entryQuestion: embudoVentas.pregunta_de_entrada || 'Gracias por interesarte en nuestro producto. Cuéntanos, ¿desde qué ciudad nos escribes?'
              },
              mediaItems: mediaItems, 
              totalFiles: mediaItems.filter(item => item.filled).length 
            },
          freePrompt: {
            promptText: tipoPrompt === 'libre' ? promptText : undefined, 
            promptType: tipoPrompt,
            showTooltip: { libre: false, guiado: false },
            guidePromptData: tipoPrompt === 'guiado' ? guidePromptData : undefined 
          },
          voice: {
            voiceId: vozIA.id_de_la_voz || vozIA.id || '',
            apiKey: vozIA.api_key_elevenlabs || vozIA.api_key || '',
            stability: parseFloat(vozIA.estabilidad) || 0.3,
            similarity: parseFloat(vozIA.similaridad) || 0.7,
            style: parseFloat(vozIA.estilo) || 0.5,
            useSpeakerBoost: vozIA.speaker_boost === 'true' || vozIA.speaker_boost === true
          },
          reminder: {
            reminder1: {
              time: reminder1Data.time,
              unit: reminder1Data.unit,
              text: recordatoriosData.mensaje_1 || ''
            },
            reminder2: {
              time: reminder2Data.time,
              unit: reminder2Data.unit,
              text: recordatoriosData.mensaje_2 || ''
            },
            timeRange: {
              enabled: !!(recordatoriosData.hora_min || recordatoriosData.horario_minimo),
              minTime: recordatoriosData.hora_min || recordatoriosData.horario_minimo || '09:00',
              maxTime: recordatoriosData.hora_max || recordatoriosData.horario_maximo || '20:00'
            }
          },
          remarketing: {
            remarketing1: {
              time: remarketing1Data.time,
              unit: remarketing1Data.unit,
              template: remarketingData.plantilla_1 || ''
            },
            remarketing2: {
              time: remarketing2Data.time,
              unit: remarketing2Data.unit,
              template: remarketingData.plantilla_2 || ''
            }
          },
          activators: {
            keywords: mergedKeywords,
            adIds: mergedAdIds
          }
        };

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