import React, { useState } from 'react';
import { ProducConfigSidebar } from './ProducConfigSidebar';
import { ProductConfig } from './content/ProductConfig';
import { ProductConfigActions } from './content/ProductConfigActions';
import { ConfigProvider, useConfig } from '../../context/ConfigContext';
import { productConfigService } from '../../services/productConfigService';

const ProductConfigContent = ({ onGoToProducts }) => {
  const [activeSection, setActiveSection] = useState('conexion-dropi');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); 
  
  const { dropiConfig, actionsConfig } = useConfig();

  const transformConfigData = () => {
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
      }
    };
  };

  const handleSaveConfiguration = async () => {
    try {
      setIsLoading(true);
      setSaveStatus(null);

      const configData = transformConfigData();
      
      console.log('📤 Enviando configuración:', configData);

      const result = await productConfigService.configureProduct(configData);
      
      setSaveStatus('success');
      console.log('✅ Configuración guardada exitosamente:', result);
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);

    } catch (error) {
      console.error('❌ Error al guardar configuración:', error);
      setSaveStatus('error');
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'conexion-dropi':
        return <ProductConfig />;
      case 'acciones-especiales':
        return <ProductConfigActions />;
      default:
        return (
          <div className="flex items-center justify-center py-8 text-gray-500">
            Sección no encontrada
          </div>
        );
    }
  };

  const renderSaveButton = () => (
    <div className="sticky bottom-6 right-6 z-10 flex justify-end">
      <div className="bg-white rounded-lg shadow-lg p-4 border">
        {saveStatus === 'success' && (
          <div className="mb-2 text-sm text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Configuración guardada exitosamente
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="mb-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Error al guardar la configuración
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onGoToProducts}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSaveConfiguration}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              isLoading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            } ${saveStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </div>
            ) : (
              'Guardar Configuración'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[80vh] bg-gray-50 -mx-6 -my-6 relative">
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <ProducConfigSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
      
      <main className="flex-1"> 
        <div className="p-6">
          {renderContent()} 
        </div>
        
        {renderSaveButton()}
      </main>
    </div>
  );
};

export const ProductConfigPreview = ({ onGoToProducts }) => {
  return (
    <ConfigProvider> 
      <ProductConfigContent onGoToProducts={onGoToProducts} />
    </ConfigProvider>
  );
};