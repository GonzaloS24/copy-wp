import { productConfigService } from '../../services/productConfigService';

export const configSave = {
  async saveConfiguration(dropiConfig, actionsConfig, setSaveStatus, setIsLoading) {
    try {
      setIsLoading(true);
      setSaveStatus(null);

      const configData = transformConfigData(dropiConfig, actionsConfig);
      
      console.log('📤 Enviando configuración:', configData);

      const result = await productConfigService.configureProduct(configData);
      
      setSaveStatus('success');
      console.log('✅ Configuración guardada exitosamente:', result);
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);

      setSaveStatus('success');
      return true;
    } catch (error) {
      console.error('Error saving configuration:', error);
      setSaveStatus('error');
      return false; 
    } finally {
      setIsLoading(false);
    }
  }
};

export const transformConfigData = (dropiConfig, actionsConfig) => {
  return {
    conexion_con_dropi: {
      conectar: dropiConfig.dropiConnection || 'no',
      pais: dropiConfig.country || null,
      integration_id: dropiConfig.integrationId || null,
      integration_token: dropiConfig.integrationToken || null
    },
    acciones_especiales: {
      validaciones_orden: {
        subida_automatica: actionsConfig.autoUpload ? 'si' : 'no',
        validar_entregas: {
          esta_activo: actionsConfig.validateDeliveries ? 'si' : 'no',
          porcentaje_minimo: actionsConfig.minDeliveryPercentage?.toString() || '0',
          minimo_de_ordenes: actionsConfig.minOrdersQuantity?.toString() || '0'
        },
        validar_flete: {
          esta_activo: actionsConfig.validateFreight ? 'si' : 'no',
          flete_minimo: actionsConfig.freightValue?.toString() || '0',
          criterio: actionsConfig.freightCriterion || 'valor'
        }
      }
    },
    producto_segundos: {
      prompt_datos: dropiConfig.productStructureRules || '',
      prompt_prompt: dropiConfig.productPromptRules || ''
    }
  };
};