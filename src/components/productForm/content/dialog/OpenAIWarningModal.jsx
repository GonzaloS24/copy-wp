import React from 'react';

const OpenAIWarningModal = ({ isOpen, onClose, onRedirect, type = 'openai' }) => {
  if (!isOpen) return null;

  const config = {
    openai: {
      title: 'Integración requerida',
      description: 'No has realizado la integración con OpenAI',
      message: 'Por favor dirígete a la sección de integraciones para configurar tu API key de OpenAI y poder utilizar esta funcionalidad.',
      buttonText: 'Ir a integraciones',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    shopify: {
      title: 'Integración de Shopify requerida',
      description: 'No has realizado la integración con Shopify',
      message: 'Por favor dirígete a la sección de integraciones para configurar tus credenciales de Shopify y poder utilizar esta funcionalidad.',
      buttonText: 'Ir a integraciones',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    dropi: {
      title: 'Integración de Dropi requerida',
      description: 'No has realizado la integración con Dropi',
      message: 'Por favor dirígete a la sección de integraciones para configurar tu clave de integración de Dropi y poder utilizar esta funcionalidad.',
      buttonText: 'Ir a integraciones',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  };

  const currentConfig = config[type] || config.openai;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-6 relative animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {currentConfig.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{currentConfig.title}</h3>
          <p className="text-gray-600 mb-4">{currentConfig.description}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-yellow-800 text-center">
            {currentConfig.message}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onRedirect}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-center"
          >
            {currentConfig.buttonText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenAIWarningModal;