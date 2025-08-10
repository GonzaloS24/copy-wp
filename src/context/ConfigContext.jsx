import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [dropiConfig, setDropiConfig] = useState({
    dropiConnection: 'no',
    integrationId: '',
    integrationToken: '',
    country: '',
    showIdTooltip: false,
    showTokenTooltip: false
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

  const updateDropiConfig = (newConfig) => {
    setDropiConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateActionsConfig = (newConfig) => {
    setActionsConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{
      dropiConfig,
      actionsConfig,
      updateDropiConfig,
      updateActionsConfig
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