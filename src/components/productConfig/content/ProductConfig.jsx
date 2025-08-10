import React from 'react';
import { useConfig } from '../../../context/ConfigContext';

export const ProductConfig = () => {
  const { dropiConfig, updateDropiConfig } = useConfig();
  
  const handleRadioChange = (value) => {
    updateDropiConfig({ dropiConnection: value });
  };

  const countries = [
    { value: 'colombia', label: 'Colombia' },
    { value: 'chile', label: 'Chile' },
    { value: 'mexico', label: 'México' },
    { value: 'ecuador', label: 'Ecuador' },
    { value: 'peru', label: 'Perú' },
    { value: 'paraguay', label: 'Paraguay' },
    { value: 'panama', label: 'Panamá' }
  ];

  return (
    <div className="block">
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 w-full relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Conexión con Dropi</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            ¿Deseas conectar el asistente a dropi?
          </label>
          <div className="flex flex-col gap-4 mt-4">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleRadioChange('si')}
            >
              <div className="w-5 h-5 border-2 border-slate-300 rounded-full relative transition-all duration-200 bg-white flex-shrink-0">
                {dropiConfig.dropiConnection === 'si' && (
                  <>
                    <div className="border-2 border-sky-500 rounded-full w-full h-full absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
              </div>
              <span className="text-gray-700">Sí</span>
            </div>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleRadioChange('no')}
            >
              <div className="w-5 h-5 border-2 border-slate-300 rounded-full relative transition-all duration-200 bg-white flex-shrink-0">
                {dropiConfig.dropiConnection === 'no' && (
                  <>
                    <div className="border-2 border-sky-500 rounded-full w-full h-full absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
              </div>
              <span className="text-gray-700">No</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors bg-white"
            value={dropiConfig.country}
            onChange={(e) => updateDropiConfig({ country: e.target.value })}
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};