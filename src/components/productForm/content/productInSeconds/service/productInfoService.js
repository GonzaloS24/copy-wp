import autoCreateFormService from '../../../../../services/formVentasWp/autoCreateFormService';
import { useProduct } from '../../../../../context/ProductContext';

const CLOUDFRONT_URL = "https://d39ru7awumhhs2.cloudfront.net/";

const useProductService = () => {
  const { updateProductData } = useProduct();
  
  const processProductInfo = async (selectedSource, inputValue, setLoadingState) => {
    let productObject;
    let productId = inputValue.trim();
    
    try {
      setLoadingState && setLoadingState(1);
      
      if (selectedSource === 'dropi') {
        console.log('Buscando producto en Dropi con ID:', productId);
        const productData = await autoCreateFormService.getProductById(productId);
        productObject = productData?.objects;
      } else if (selectedSource === 'url') {
        console.log('Obteniendo producto desde URL:', productId);
        const response = await autoCreateFormService.getProductsByUrl(productId);
        
        if (!response || !response.data) {
          throw new Error('La respuesta del servidor no contiene datos válidos');
        }
        
        productObject = response.data;
        productId = productObject.id || productId;
      } else if (selectedSource === 'shopify') {
      console.log('Buscando producto en Shopify con ID:', productId);
      const productData = await autoCreateFormService.getShopifyProductById(productId);
      
      productObject = productData.data; 
      
      console.log('Producto de Shopify obtenido:', productObject);
      
    } else {
      return { success: false, message: 'Fuente no soportada aún' };
    }

      if (!productObject) {
        throw new Error('No se encontró información válida del producto');
      }

        setLoadingState && setLoadingState(2);
        const generatedJson = await autoCreateFormService.generateJson(productObject);
        console.log('JSON generado por OpenAI:', generatedJson);

        if (!generatedJson?.data) {
          throw new Error('No se pudo generar la estructura del producto');
        }

        const data = generatedJson.data;

        const nombre = data?.informacion_de_producto?.nombre_del_producto;
        const precio = data?.informacion_de_producto?.precio_del_producto;
        const mensaje_inicial = data?.embudo_de_ventas?.mensaje_inicial;
        const pregunta_entrada = data?.embudo_de_ventas?.pregunta_de_entrada;
        const producto_json = JSON.stringify(productObject);

        const multimedia = data?.embudo_de_ventas?.multimedia;
        const urls_imagenes = [];

        if (multimedia) {
          Object.values(multimedia).forEach(url => {
            if (url && typeof url === 'string' && url.trim() !== '') {
              urls_imagenes.push(url); 
            }
          });
        }
        
        const promptData = {
          nombre,
          precio,
          mensaje_inicial,
          urls_imagenes,
          pregunta_entrada,
          producto_json
        };

        console.log('Datos preparados para el prompt:', promptData);

        const promptResult = await autoCreateFormService.generatePrompt(promptData);
        console.log('Resultado del prompt:', promptResult);

        setLoadingState && setLoadingState(3);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mappedData = mapApiDataToContext(data, productId, promptResult.data?.prompt);
        updateProductData('', mappedData);

        return { success: true };

    } catch (error) {
      console.error('Error en processProductInfo:', error);
      throw new Error(`No se pudo procesar la información: ${error.message}`);
    }
  };


  return { processProductInfo };
};

const mapApiDataToContext = (apiData, productId, generatedPrompt = '') => {
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

  const processMultimedia = (multimedia) => {
    const mediaItems = [];
    
    if (multimedia) {
      Object.entries(multimedia).forEach(([key, url], index) => {
        if (url && typeof url === 'string' && url.trim() !== '') {
          const fullUrl = url.startsWith('http') ? url : `${CLOUDFRONT_URL}${url}`;
          const fileType = getFileType(fullUrl);
          mediaItems.push({
            id: index + 1,
            type: fileType,
            icon: getFileIcon(fileType),
            filled: true,
            url: fullUrl,
            key: key,
            fileName: url.split('/').pop() || `archivo_${index + 1}`
          });
        }
      });
    }

    if (mediaItems.length === 0) {
      mediaItems.push(
        { id: 1, type: 'image', icon: '🖼️', filled: false, url: '' },
        { id: 2, type: 'video', icon: '▶️', filled: false, url: '' },
        { id: 3, type: 'audio', icon: '🔊', filled: false, url: '' }
      );
    }

    return mediaItems;
  };

  const recordatoriosData = apiData.recordatorios || {};
  const reminder1Data = parseTimeAndUnit(recordatoriosData.tiempo_recordatorio_1);
  const reminder2Data = parseTimeAndUnit(recordatoriosData.tiempo_recordatorio_2);

  const activadoresData = apiData.activadores_del_flujo || {};
  const keywordsFromApi = activadoresData.palabras_clave 
    ? activadoresData.palabras_clave.split(',').map(k => k.trim()).filter(k => k)
    : [];
  
  const defaultKeywords = ['', '', '', '', '', '', ''];
  const mergedKeywords = [...keywordsFromApi, ...defaultKeywords].slice(0, 7);

  const adIdsFromApi = activadoresData.ids_de_anuncio
    ? activadoresData.ids_de_anuncio.split(',').map(id => id.trim()).filter(id => id)
    : [];
  
  const defaultAdIds = ['', '', '', '', '', '', ''];
  const mergedAdIds = [...adIdsFromApi, ...defaultAdIds].slice(0, 7);

  return {
    info: {
      formData: {
        name: apiData.informacion_de_producto?.nombre_del_producto || '',
        price: apiData.informacion_de_producto?.precio_del_producto || '',
        description: '',
        id: productId,
        image: apiData.informacion_de_producto?.imagen_del_producto 
          ? `${CLOUDFRONT_URL}${apiData.informacion_de_producto.imagen_del_producto}`
          : null,
        currency: 'COP'
      },
      productType: 'simple',
      isActive: false
    },
    messageWel: {
      formData: {
        initialMessage: apiData.embudo_de_ventas?.mensaje_inicial || '',
        entryQuestion: apiData.embudo_de_ventas?.pregunta_de_entrada || ''
      },
      mediaItems: processMultimedia(apiData.embudo_de_ventas?.multimedia),
      totalFiles: processMultimedia(apiData.embudo_de_ventas?.multimedia).filter(item => item.filled).length
    },
    freePrompt: {
      promptText: (generatedPrompt || '').replace(/(\\{1,2})n/g, '\n'), 
      promptType: 'libre',
      showTooltip: { libre: false, guiado: false }
    },
    voice: {
      voiceId: apiData.voz_con_ia?.id_de_la_voz || '',
      apiKey: apiData.voz_con_ia?.api_key_elevenlabs || '',
      stability: parseFloat(apiData.voz_con_ia?.estabilidad) || 0.3,
      similarity: parseFloat(apiData.voz_con_ia?.similaridad) || 0.7,
      style: parseFloat(apiData.voz_con_ia?.estilo) || 0.5,
      useSpeakerBoost: true
    },
    reminder: {
      reminder1: {
        time: reminder1Data.time,
        unit: reminder1Data.unit,
        text: recordatoriosData.mensaje_recordatorio_1 || ''
      },
      reminder2: {
        time: reminder2Data.time,
        unit: reminder2Data.unit,
        text: recordatoriosData.mensaje_recordatorio_2 || ''
      },
      timeRange: {
        enabled: !!(recordatoriosData.horario_minimo),
        minTime: recordatoriosData.horario_minimo || '09:00',
        maxTime: recordatoriosData.horario_maximo || '20:00'
      }
    },
    remarketing: {
      remarketing1: {
        time: 0,
        unit: 'minutos',
        template: ''
      },
      remarketing2: {
        time: 0,
        unit: 'minutos',
        template: ''
      }
    },
    activators: {
      keywords: mergedKeywords,
      adIds: mergedAdIds
    }
  };
};

export { useProductService };