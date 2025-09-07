import { areValuesDifferent, getFieldDisplayName } from './fieldComparison';

export const detectModifiedFields = (productData, comparisonData, isEditMode) => {
  if (!productData || Object.keys(productData).length === 0 || !comparisonData) {
    return [];
  }

  const modified = [];

  const compareNestedObjects = (currentObj, comparisonObj, prefix = '') => {
    if (!currentObj || !comparisonObj) return;
    
    Object.keys(currentObj).forEach(key => {
      const currentValue = currentObj[key];
      const comparisonValue = comparisonObj[key];
      
      if (areValuesDifferent(currentValue, comparisonValue, key)) {
        modified.push(`${prefix}${getFieldDisplayName(key)}`);
      }
    });
  };

  if (productData.info?.formData && comparisonData.info?.formData) {
    compareNestedObjects(productData.info.formData, comparisonData.info.formData, 'Información: ');
  }

  if (productData.messageWel?.formData && comparisonData.messageWel?.formData) {
    compareNestedObjects(productData.messageWel.formData, comparisonData.messageWel.formData, 'Mensajes: ');
    
    const currentMedia = productData.messageWel?.mediaItems || [];
    const comparisonMedia = comparisonData.messageWel?.mediaItems || [];
    
    if (currentMedia.length !== comparisonMedia.length) {
      modified.push('Archivos multimedia');
    } else {
      const hasMediaChanges = currentMedia.some((media, index) => 
        areValuesDifferent(media?.url, comparisonMedia[index]?.url)
      );
      if (hasMediaChanges) modified.push('Archivos multimedia');
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
      Object.keys(productData.reminder.reminder1).forEach((key) => {
        const currentValue = productData.reminder.reminder1[key];
        const comparisonValue = comparisonData.reminder.reminder1[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Recordatorio 1: ${getFieldDisplayName(key)}`);
        }
      });
    }

    if (productData.reminder.reminder2 && comparisonData.reminder.reminder2) {
      Object.keys(productData.reminder.reminder2).forEach((key) => {
        const currentValue = productData.reminder.reminder2[key];
        const comparisonValue = comparisonData.reminder.reminder2[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Recordatorio 2: ${getFieldDisplayName(key)}`);
        }
      });
    }

    if (productData.reminder.timeRange && comparisonData.reminder.timeRange) {
      Object.keys(productData.reminder.timeRange).forEach((key) => {
        const currentValue = productData.reminder.timeRange[key];
        const comparisonValue = comparisonData.reminder.timeRange[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(
            `Rango horario recordatorios: ${getFieldDisplayName(key)}`
          );
        }
      });
    }
  }

  if (productData.remarketing && comparisonData.remarketing) {
    if (
      productData.remarketing.remarketing1 &&
      comparisonData.remarketing.remarketing1
    ) {
      Object.keys(productData.remarketing.remarketing1).forEach((key) => {
        const currentValue = productData.remarketing.remarketing1[key];
        const comparisonValue = comparisonData.remarketing.remarketing1[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Remarketing 1: ${getFieldDisplayName(key)}`);
        }
      });
    }

    if (
      productData.remarketing.remarketing2 &&
      comparisonData.remarketing.remarketing2
    ) {
      Object.keys(productData.remarketing.remarketing2).forEach((key) => {
        const currentValue = productData.remarketing.remarketing2[key];
        const comparisonValue = comparisonData.remarketing.remarketing2[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(`Remarketing 2: ${getFieldDisplayName(key)}`);
        }
      });
    }

    if (
      productData.remarketing.timeRange &&
      comparisonData.remarketing.timeRange
    ) {
      Object.keys(productData.remarketing.timeRange).forEach((key) => {
        const currentValue = productData.remarketing.timeRange[key];
        const comparisonValue = comparisonData.remarketing.timeRange[key];
        if (areValuesDifferent(currentValue, comparisonValue)) {
          modified.push(
            `Rango horario remarketing: ${getFieldDisplayName(key)}`
          );
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

  // Meta Conversion - Detección corregida
  if (productData.metaConversion && comparisonData.metaConversion) {
    const currentMeta = productData.metaConversion;
    const comparisonMeta = comparisonData.metaConversion;
    
    // Detectar cambio en el estado habilitado
    if (areValuesDifferent(currentMeta.enabled, comparisonMeta.enabled)) {
      modified.push('Pixel Meta: Estado habilitado');
    }
    
    // Si ambos están habilitados, comparar los demás campos
    if (currentMeta.enabled && comparisonMeta.enabled) {
      // Detectar cambio en useDefault (por defecto vs personalizado)
      if (areValuesDifferent(currentMeta.useDefault, comparisonMeta.useDefault)) {
        modified.push('Pixel Meta: Configuración por defecto');
      }
      
      // Detectar cambios en Page ID
      if (areValuesDifferent(currentMeta.pageId, comparisonMeta.pageId)) {
        modified.push('Pixel Meta: Page ID');
      }
      
      // Detectar cambios en Custom Audience ID
      if (areValuesDifferent(currentMeta.audienceId, comparisonMeta.audienceId)) {
        modified.push('Pixel Meta: Custom Audience ID');
      }
    }
    // Si uno está habilitado y el otro no, pero había datos previos, también detectar cambios en campos
    else if (currentMeta.enabled && !comparisonMeta.enabled) {
      // Si se habilita y se agregan datos
      if (currentMeta.pageId && currentMeta.pageId.trim() !== '') {
        modified.push('Pixel Meta: Page ID');
      }
      if (currentMeta.audienceId && currentMeta.audienceId.trim() !== '') {
        modified.push('Pixel Meta: Custom Audience ID');
      }
    }
  }

  return modified;
};