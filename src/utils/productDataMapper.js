export const mapProductDataToServiceFormat = (productData, isInactive = false) => {
  const guideData = productData.freePrompt?.guidePromptData || {};

  const mapMediaItems = (mediaItems) => {
    console.log('🔍 Procesando mediaItems:', mediaItems);
    
    if (!mediaItems || !Array.isArray(mediaItems)) {
      console.log('⚠️ MediaItems no es un array válido, retornando c1 vacío');
      return { c1: '' };
    }

    const multimedia = {};
    let counter = 1;

    mediaItems.forEach((item, index) => {
      console.log(`📋 Procesando item ${index}:`, item);
      
      if (item.filled && item.url) {
        multimedia[`c${counter}`] = item.url;
        console.log(`✅ Asignado c${counter}: ${item.url}`);
        counter++;
      } else {
        console.log(`❌ Item ${index} omitido - filled: ${item.filled}, url: ${item.url}`);
      }
    });

    if (!multimedia.c1) {
      multimedia.c1 = '';
      console.log('🔧 c1 no encontrado, asignando string vacío');
    }

    console.log('📦 Multimedia final:', multimedia);
    return multimedia;
  };

  const mappedData = {
    informacion_de_producto: {
      nombre_del_producto: productData.info?.formData?.name || '',
      precio_del_producto: productData.info?.formData?.price || '', 
      id_del_producto_en_dropi: productData.info?.formData?.dropiId || '', 
      tipo_de_producto: productData.info?.productType || 'SIMPLE', 
      imagen_del_producto: productData.info?.formData?.image || '', 
      estado: isInactive ? 'inactivo' : 'activo'
    },
    embudo_de_ventas: {
      mensaje_inicial: productData.messageWel?.formData?.initialMessage || '',
      multimedia: mapMediaItems(productData.messageWel?.mediaItems),
      pregunta_de_entrada: productData.messageWel?.formData?.entryQuestion || ''
    },
    prompt: {
      tipo_de_prompt: productData.freePrompt?.promptType || 'libre',
      prompt_libre: productData.freePrompt?.promptType === 'libre' ? (productData.freePrompt?.promptText || '') : '',
      prompt_guiado_contextualizacion: productData.freePrompt?.promptType === 'guiado' ? guideData.contextualizacion || '' : '',
      prompt_guiado_ficha_tecnica: productData.freePrompt?.promptType === 'guiado' ? guideData.fichaTecnica || '' : '',
      prompt_guiado_guion_conversacional: productData.freePrompt?.promptType === 'guiado' ? guideData.guionConversacional || '' : '',
      prompt_guiado_posibles_situaciones: productData.freePrompt?.promptType === 'guiado' ? guideData.posiblesSituaciones || '' : '',
      prompt_guiado_reglas: productData.freePrompt?.promptType === 'guiado' ? guideData.reglasIA || '' : ''
    },
    voz_con_ia: {
      id: productData.voice?.voiceId || '',
      api_key_elevenlabs: productData.voice?.apiKey || '', 
      estabilidad: productData.voice?.stability || 0.5, 
      similaridad: productData.voice?.similarity || 0.7, 
      estilo: productData.voice?.style || 0.5,
      speaker_boost: productData.voice?.useSpeakerBoost ? 'si' : 'no' 
    },
    recordatorios: {
      tiempo_recordatorio_1: productData.reminder?.reminder1?.time && productData.reminder?.reminder1?.unit 
        ? `${productData.reminder.reminder1.time}${productData.reminder.reminder1.unit}` 
        : '',
      mensaje_recordatorio_1: productData.reminder?.reminder1?.text || '', 
      tiempo_recordatorio_2: productData.reminder?.reminder2?.time && productData.reminder?.reminder2?.unit 
        ? `${productData.reminder.reminder2.time}${productData.reminder.reminder2.unit}` 
        : '',
      mensaje_recordatorio_2: productData.reminder?.reminder2?.text || '', 
      hora_min: productData.reminder?.timeRange?.enabled ? productData.reminder.timeRange.minTime : '', 
      hora_max: productData.reminder?.timeRange?.enabled ? productData.reminder.timeRange.maxTime : ''  
    },
    remarketing: {
      tiempo_remarketing_1: productData.remarketing?.remarketing1?.time ? `${productData.remarketing.remarketing1.time}${productData.remarketing.remarketing1.unit}` : '', 
      plantilla_remarketing_1: productData.remarketing?.remarketing1?.template || '', 
      tiempo_remarketing_2: productData.remarketing?.remarketing2?.time ? `${productData.remarketing.remarketing2.time}${productData.remarketing.remarketing2.unit}` : '',
      plantilla_remarketing_2: productData.remarketing?.remarketing2?.template || '' 
    },
    activadores_del_flujo: {
      palabras_clave: productData.triggers?.keywords || productData.activators?.keywords || '', 
      ids_de_anuncio: productData.triggers?.adIds || productData.activators?.adIds || '' 
    }
  };

  console.log('🎯 Datos mapeados completos:', mappedData);
  console.log('📱 Multimedia en datos mapeados:', mappedData.embudo_de_ventas.multimedia);
  
  return mappedData;
};

const getPromptText = (freePrompt) => {
  const promptData = freePrompt?.promptText || freePrompt?.promptContent;
  
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