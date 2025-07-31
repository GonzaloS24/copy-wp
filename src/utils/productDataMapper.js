export const mapProductDataToServiceFormat = (productData, isInactive = false) => {
  const guideData = productData.freePrompt?.guidePromptData || {};

  return {
    informacion_de_producto: {
      nombre_del_producto: productData.info?.formData?.name || '',
      precio_del_producto: productData.info?.formData?.price || '', 
      id_del_producto_en_dropi: productData.info?.formData?.dropiId || '', 
      tipo_de_producto: productData.info?.productType || 'simple', 
      imagen_del_producto: productData.info?.formData?.image || '', 
      estado: isInactive ? 'inactivo' : 'activo'
    },
    embudo_de_ventas: {
      mensaje_inicial: productData.messageWel?.formData?.initialMessage || '',
      multimedia: { 
        c1: productData.messageWel?.formData?.image1 || ''
      },
      pregunta_de_entrada: productData.messageWel?.formData?.entryQuestion || ''
    },
    prompt: {
      tipo_de_prompt: productData.freePrompt?.promptType || 'libre',
      prompt_libre: productData.freePrompt?.promptType === 'libre' ? getPromptText(productData.freePrompt) : '',
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
      horario_minimo: productData.reminder?.timeRange?.enabled ? productData.reminder.timeRange.minTime : '', 
      horario_maximo: productData.reminder?.timeRange?.enabled ? productData.reminder.timeRange.maxTime : ''  
    },
    remarketing: {
      tiempo_remarketing_1: productData.remarketing?.remarketing1?.time ? `${productData.remarketing.remarketing1.time}${productData.remarketing.remarketing1.unit}` : '', 
      plantilla_remarketing_1: productData.remarketing?.remarketing1?.template || '', 
      tiempo_remarketing_2: productData.remarketing?.remarketing2?.time ? `${productData.remarketing.remarketing2.time}${productData.remarketing.remarketing2.unit}` : '',
      plantilla_remarketing_2: productData.remarketing?.remarketing2?.template || '' 
    },
    activadores_del_flujo: {
      palabras_clave: productData.activators?.keywords || [], 
      ids_de_anuncio: productData.activators?.adIds || [] 
    }
  };
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