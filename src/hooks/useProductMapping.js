import { useCallback } from 'react';

export const useProductMapping = () => {
const parseTimeAndUnit = useCallback((timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return { time: 0, unit: 'minutos' };
  }

  const cleanString = timeString.trim().toLowerCase();
  
  const parts = cleanString.split(/\s+/);
  
  if (parts.length >= 2) {
    const time = parseInt(parts[0], 10);
    const unit = parts[1];
    
    if (isNaN(time) || time < 0) {
      return { time: 0, unit: 'minutos' };
    }
    
    const validUnits = {
      'segundo': 'segundos',
      'segundos': 'segundos',
      'minuto': 'minutos',
      'minutos': 'minutos',
      'hora': 'horas',
      'horas': 'horas',
      'dia': 'dias',
      'dias': 'dias',
      'día': 'dias',
      'días': 'dias'
    };
    
    const normalizedUnit = validUnits[unit] || 'minutos';
    
    return { time, unit: normalizedUnit };
  }
  
  if (parts.length === 1) {
    const time = parseInt(parts[0], 10);
    if (!isNaN(time) && time >= 0) {
      return { time, unit: 'minutos' };
    }
  }
  
  return { time: 0, unit: 'minutos' };
}, []);

  const getFileType = useCallback((url) => {
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
  }, []);

  const getFileIcon = useCallback((type) => {
    const icons = {
      image: '🖼️',
      video: '▶️',
      audio: '🔊',
      document: '📄'
    };
    return icons[type] || '📄';
  }, []);

  const mapApiDataToProductData = useCallback((apiData) => {
    const promptData = apiData.prompt || {};
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

    const infoProducto = apiData.informacion_de_producto || {};
    const embudoVentas = apiData.embudo_de_ventas || {};
    const vozIA = apiData.voz_con_ia || {};
    const recordatorios = apiData.recordatorios || {};
    const remarketing = apiData.remarketing || {};


    const prompKeyWordFromtApi = infoProducto.dta_prompt  ? infoProducto.dta_prompt.split(',').map(id => id.trim()).filter(id => id): [];
    
    const reminder1Data = parseTimeAndUnit(recordatorios.tiempo_1);
    const reminder2Data = parseTimeAndUnit(recordatorios.tiempo_2);
    const remarketing1Data = parseTimeAndUnit(remarketing.tiempo_1);
    const remarketing2Data = parseTimeAndUnit(remarketing.tiempo_2);

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
      }
    });

    if (mediaItems.length === 0) {
      mediaItems.push(
        { id: 1, type: 'image', icon: '🖼️', filled: false, url: '' },
        { id: 2, type: 'video', icon: '▶️', filled: false, url: '' },
        { id: 3, type: 'audio', icon: '🔊', filled: false, url: '' }
      );
    }

    return {
      info: {
        formData: {
          name: infoProducto.nombre_del_producto || infoProducto.nombre || '',
          price: infoProducto.precio_del_producto || infoProducto.precio || '',
          id: infoProducto.id || infoProducto.id_dropi || '',
          productType: infoProducto.tipo || infoProducto.tipo_de_producto || '',
          image: infoProducto.imagen_del_producto || infoProducto.imagen || null,
          currency: 'COP',
          dta_prompt: prompKeyWordFromtApi
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
          text: recordatorios.mensaje_1 || ''
        },
        reminder2: {
          time: reminder2Data.time,
          unit: reminder2Data.unit,
          text: recordatorios.mensaje_2 || ''
        },
        timeRange: {
          enabled: !!(recordatorios.hora_min || recordatorios.horario_minimo),
          minTime: recordatorios.hora_min || recordatorios.horario_minimo || '09:00',
          maxTime: recordatorios.hora_max || recordatorios.horario_maximo || '20:00'
        }
      },
      remarketing: {
        remarketing1: {
          time: remarketing1Data.time,
          unit: remarketing1Data.unit,
          template: remarketing.plantilla_1 || ''
        },
        remarketing2: {
          time: remarketing2Data.time,
          unit: remarketing2Data.unit,
          template: remarketing.plantilla_2 || ''
        }
      },
      activators: {
        keywords: mergedKeywords,
        adIds: mergedAdIds
      }
    };
  }, [parseTimeAndUnit, getFileType, getFileIcon]);

  return {
    parseTimeAndUnit,
    getFileType,
    getFileIcon,
    mapApiDataToProductData
  };
};