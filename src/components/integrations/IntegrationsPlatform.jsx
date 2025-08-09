import React, { useState } from 'react';
import { ConnectIntegration } from './dialog/ConnectIntegration';
//import { uploadImage } from './uploadImageService';

export const IntegrationsPlatform = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState(['openai']);

  const integrations = [
    {
      id: 'dropi',
      name: 'Dropi',
      description: 'Conecta con la plataforma logística para gestión de pedidos',
      icon: '📦',
      connected: false,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      iconBorder: 'border-blue-300'
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Potencia tus asistentes con inteligencia artificial avanzada',
      icon: '🤖',
      connected: true,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      iconBorder: 'border-green-300'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Sincroniza tu tienda online con los asistentes de venta',
      icon: '🛒',
      connected: false,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      iconBorder: 'border-yellow-300'
    },
    {
      id: 'googlesheets',
      name: 'Google Sheets',
      description: 'Exporta y gestiona datos de tus asistentes en hojas de cálculo',
      icon: '📄',
      connected: false,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      iconBorder: 'border-red-300'
    },
    {
      id: 'backblaze',
      name: 'Backblaze B2',
      description: 'Almacenamiento en la nube para archivos y respaldos de conversaciones',
      icon: '☁️',
      connected: true,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      iconBorder: 'border-purple-300'
    }
  ];

  const integrationsWithStatus = integrations.map(integration => ({
    ...integration,
    connected: connectedIntegrations.includes(integration.id)
  }));

  const handleConnectClick = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleConnect = (integrationId, formData) => {
    setConnectedIntegrations(prev => [...prev, integrationId]);
    console.log(`Integración ${integrationId} conectada con datos:`, formData);
 
  };

  const handleDisconnect = (integrationId) => {
    setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
    console.log(`Integración ${integrationId} desconectada`);
  };

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-sky-500 mb-12 text-center">
            Integraciones de Chatea PRO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {integrationsWithStatus.map((integration) => (
              <div
                key={integration.id}
                className={`
                  bg-white rounded-3xl border-2 shadow-lg transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-xl flex flex-col overflow-hidden relative
                  ${integration.connected 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-slate-200'
                  }
                `}
              >
                {/* Status Badge */}
                <div className={`
                  absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-semibold 
                  flex items-center gap-1.5
                  ${integration.connected 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-500'
                  }
                `}>
                  <span className={`
                    w-2 h-2 rounded-full
                    ${integration.connected ? 'bg-green-600' : 'bg-gray-500'}
                  `}></span>
                  {integration.connected ? 'Conectado' : 'Desconectado'}
                </div>

                {/* Header with Icon */}
                <div className="h-36 flex justify-center items-center">
                  <div className={`
                    w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl
                    ${integration.iconBg} ${integration.iconColor} ${integration.iconBorder}
                  `}>
                    {integration.icon}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 text-center flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-slate-700">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {integration.description}
                  </p>

                  {/* Buttons */}
                  {integration.connected ? (
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => handleConnectClick(integration)}
                        className="
                          bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 
                          rounded-xl font-semibold text-sm transition-all duration-300
                          hover:-translate-y-0.5
                        "
                      >
                        Configurar
                      </button>
                      <button 
                        onClick={() => handleDisconnect(integration.id)}
                        className="
                          bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 
                          rounded-xl font-semibold text-sm transition-all duration-300
                          hover:-translate-y-0.5
                        "
                      >
                        Eliminar
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleConnectClick(integration)}
                      className="
                        bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                        text-white px-5 py-2.5 rounded-xl font-semibold text-sm 
                        transition-all duration-300 hover:-translate-y-0.5
                      "
                    >
                      Conectar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Integración */}
      <ConnectIntegration
        isOpen={isModalOpen}
        onClose={handleModalClose}
        integration={selectedIntegration}
        onConnect={handleConnect}
      />
    </>
  );
};