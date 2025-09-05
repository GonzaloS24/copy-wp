
export const FIELD_DISPLAY_NAMES = {
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

export const getFieldDisplayName = (fieldKey) => {
  return FIELD_DISPLAY_NAMES[fieldKey] || fieldKey;
};

export const areValuesDifferent = (currentValue, originalValue, fieldKey = '') => {
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
  
  if (fieldKey === 'image' && currentValue instanceof File) {
    return true;
  }
  
  return currentValue !== originalValue;
};