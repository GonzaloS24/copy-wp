import React, { useState } from 'react';
import { useProduct } from '../../../context/ProductContext';

export const ProductVoice = () => {
  const { productData, updateProductData } = useProduct();
  
  const voiceData = productData.voice || {
    voiceId: '',
    apiKey: '',
    stability: 0.3,
    similarity: 0.7,
    style: 0.5,
    useSpeakerBoost: true
  };

  const [testText, setTestText] = useState('');

  const increaseValue = (param) => {
    const step = 0.1;
    const max = 1.0;
    const newValue = Math.min((voiceData[param] || 0) + step, max);
    
    updateProductData('voice', {
      [param]: newValue
    });
  };

  const decreaseValue = (param) => {
    const step = 0.1;
    const min = 0.0;
    const newValue = Math.max((voiceData[param] || 0) - step, min);
    
    updateProductData('voice', {
      [param]: newValue
    });
  };

  const reproduceVoice = () => {
    console.log('Reproduciendo voz con:', {
      ...voiceData,
      testText 
    });
  };

  const formatValue = (value) => {
    return (value || 0).toFixed(1).replace('.', ',');
  };

  const handleInputChange = (field, value) => {
    updateProductData('voice', {
      [field]: value
    });
  };

  const handleSpeakerBoostChange = (value) => {
    updateProductData('voice', {
      useSpeakerBoost: value
    });
  };

  return (
    <div className="p-6 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-semibold mb-6 text-center text-slate-700">
          Conecta tu voz
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-center text-slate-700">
              Configuración de Voz
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID de voz
                </label>
                <input
                  type="text"
                  value={voiceData.voiceId || ''}
                  onChange={(e) => handleInputChange('voiceId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingresa el ID de voz"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  API Key de cuenta
                </label>
                <input
                  type="text"
                  value={voiceData.apiKey || ''}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingresa tu API Key"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-center text-slate-700">
              Parámetros de Voz
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estabilidad
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseValue('stability')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={formatValue(voiceData.stability)}
                    readOnly
                    className="flex-1 text-center px-2 py-2 border border-gray-300 rounded-md bg-slate-50 font-semibold"
                  />
                  <button
                    onClick={() => increaseValue('stability')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Similaridad
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseValue('similarity')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={formatValue(voiceData.similarity)}
                    readOnly
                    className="flex-1 text-center px-2 py-2 border border-gray-300 rounded-md bg-slate-50 font-semibold"
                  />
                  <button
                    onClick={() => increaseValue('similarity')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estilo
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseValue('style')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={formatValue(voiceData.style)}
                    readOnly
                    className="flex-1 text-center px-2 py-2 border border-gray-300 rounded-md bg-slate-50 font-semibold"
                  />
                  <button
                    onClick={() => increaseValue('style')}
                    className="w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center cursor-pointer text-lg text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ¿Usar speaker boost?
                </label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => handleSpeakerBoostChange(true)}
                      className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                        voiceData.useSpeakerBoost 
                          ? 'border-sky-500 bg-sky-500' 
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {voiceData.useSpeakerBoost && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-sm text-slate-700">Sí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => handleSpeakerBoostChange(false)}
                      className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                        !voiceData.useSpeakerBoost 
                          ? 'border-sky-500 bg-sky-500' 
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {!voiceData.useSpeakerBoost && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-sm text-slate-700">No</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <div className="flex gap-4 items-stretch">
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="flex-1 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Texto de prueba"
            />
            <button
              onClick={reproduceVoice}
              className="bg-sky-500 text-white border-none rounded-lg px-8 py-3 font-semibold cursor-pointer transition-all duration-200 hover:bg-sky-600 whitespace-nowrap"
            >
              Reproducir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};