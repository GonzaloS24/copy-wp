import React, { createContext, useContext, useState, useEffect } from 'react';
import { productConfigService } from '../services/productConfigService';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [dropiConfig, setDropiConfig] = useState({
    dropiConnection: 'no',
    integrationId: '',
    integrationToken: '',
    country: '',
    showIdTooltip: false,
    showTokenTooltip: false,
    productStructureRules: '',
    productPromptRules: ''
  });

  const [actionsConfig, setActionsConfig] = useState({
    autoUpload: false,
    validateDeliveries: false,
    validateFreight: false,
    minOrdersQuantity: 0,
    minDeliveryPercentage: 0,
    freightCriterion: 'valor',
    freightValue: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGeneralConfiguration();
  }, []);

  const loadGeneralConfiguration = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productConfigService.getGeneralConfiguration();
      
      if (response.status === 'success' && response.data) {
        const configData = response.data;
        
        if (configData.conexion_con_dropi) {
          setDropiConfig(prev => ({
            ...prev,
            dropiConnection: configData.conexion_con_dropi.conectar || 'no',
            country: configData.conexion_con_dropi.pais || '',
            integrationId: configData.conexion_con_dropi.integration_id || '',
            integrationToken: configData.conexion_con_dropi.integration_token || ''
          }));
        }

        if (configData.acciones_especiales?.validaciones_orden) {
          const validaciones = configData.acciones_especiales.validaciones_orden;
          setActionsConfig(prev => ({
            ...prev,
            autoUpload: validaciones.subida_automatica === 'si',
            validateDeliveries: validaciones.validar_entregas?.esta_activo === 'si',
            validateFreight: validaciones.validar_flete?.esta_activo === 'si',
            minOrdersQuantity: parseInt(validaciones.validar_entregas?.minimo_de_ordenes || 0),
            minDeliveryPercentage: parseInt(validaciones.validar_entregas?.porcentaje_minimo || 0),
            freightCriterion: validaciones.validar_flete?.criterio || 'valor',
            freightValue: parseInt(validaciones.validar_flete?.flete_minimo || 0)
          }));
        }

        if (configData.producto_segundos) {
          setDropiConfig(prev => ({
            ...prev,
            productStructureRules: configData.producto_segundos.prompt_datos || '',
            productPromptRules: configData.producto_segundos.prompt_prompt || ''
          }));
        }
      }
    } catch (err) {
      console.error('Error loading general configuration:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDropiConfig = (newConfig) => {
    setDropiConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateActionsConfig = (newConfig) => {
    setActionsConfig(prev => ({ ...prev, ...newConfig }));
  };

  const refreshConfiguration = () => {
    loadGeneralConfiguration();
  };

  return (
    <ConfigContext.Provider value={{
      dropiConfig,
      actionsConfig,
      loading,
      error,
      updateDropiConfig,
      updateActionsConfig,
      refreshConfiguration
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig debe usarse dentro de un ConfigProvider');
  }
  return context;
};