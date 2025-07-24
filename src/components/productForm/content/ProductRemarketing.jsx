import React, { useState } from 'react';
import { useProduct } from '../../../context/ProductContext';


export const ProductRemarketing = () => {
  const { productData, updateProductData } = useProduct();
  
  const remarketingData = productData.remarketing || {
    remarketing1: {
      time: 0,
      unit: 'minutos',
      template: ''
    },
    remarketing2: {
      time: 0,
      unit: 'minutos',
      template: ''
    },
    templates: [
      { value: 'plantilla1', label: 'Plantilla 1' },
      { value: 'plantilla2', label: 'Plantilla 2' },
      { value: 'plantilla3', label: 'Plantilla 3' }
    ]
  };

  const handleRemarketing1TimeChange = (value) => {
    updateProductData('remarketing', {
      remarketing1: {
        ...remarketingData.remarketing1,
        time: parseInt(value) || 0
      }
    });
  };

  const handleRemarketing1UnitChange = (value) => {
    updateProductData('remarketing', {
      remarketing1: {
        ...remarketingData.remarketing1,
        unit: value
      }
    });
  };

  const handleRemarketing1TemplateChange = (value) => {
    updateProductData('remarketing', {
      remarketing1: {
        ...remarketingData.remarketing1,
        template: value
      }
    });
  };

  const handleRemarketing2TimeChange = (value) => {
    updateProductData('remarketing', {
      remarketing2: {
        ...remarketingData.remarketing2,
        time: parseInt(value) || 0
      }
    });
  };

  const handleRemarketing2UnitChange = (value) => {
    updateProductData('remarketing', {
      remarketing2: {
        ...remarketingData.remarketing2,
        unit: value
      }
    });
  };

  const handleRemarketing2TemplateChange = (value) => {
    updateProductData('remarketing', {
      remarketing2: {
        ...remarketingData.remarketing2,
        template: value
      }
    });
  };

  const crearPlantilla = () => {
    console.log('Creando nueva plantilla...');
  };

  const recargarPlantillas = () => {
    console.log('Recargando plantillas...');
  };

  return (
    <div className="p-6 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center text-slate-700">
          Remarketing
        </h1>
        
        {/* Remarketing 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-3">
              Tiempo Remarketing 1
            </label>
            <div className="flex mt-3">
              <input
                type="number"
                value={remarketingData.remarketing1?.time || 0}
                onChange={(e) => handleRemarketing1TimeChange(e.target.value)}
                placeholder="0"
                min="1"
                className="flex-1 p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-base text-center bg-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 min-w-[100px]"
              />
              <select
                value={remarketingData.remarketing1?.unit || 'minutos'}
                onChange={(e) => handleRemarketing1UnitChange(e.target.value)}
                className="flex-[2] p-4 border-2 border-slate-200 rounded-r-xl text-base bg-white cursor-pointer focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 min-w-[140px]"
              >
                <option value="minutos">minutos</option>
                <option value="segundos">segundos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-3">
              Plantilla de Remarketing 1
            </label>
            <select
              value={remarketingData.remarketing1?.template || ''}
              onChange={(e) => handleRemarketing1TemplateChange(e.target.value)}
              className="mt-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600"
            >
              <option value="">Selecciona una plantilla</option>
              {remarketingData.templates?.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-3">
              Tiempo Remarketing 2
            </label>
            <div className="flex mt-3">
              <input
                type="number"
                value={remarketingData.remarketing2?.time || 0}
                onChange={(e) => handleRemarketing2TimeChange(e.target.value)}
                placeholder="0"
                min="1"
                className="flex-1 p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-base text-center bg-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 min-w-[100px]"
              />
              <select
                value={remarketingData.remarketing2?.unit || 'minutos'}
                onChange={(e) => handleRemarketing2UnitChange(e.target.value)}
                className="flex-[2] p-4 border-2 border-slate-200 rounded-r-xl text-base bg-white cursor-pointer focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 min-w-[140px]"
              >
                <option value="minutos">minutos</option>
                <option value="segundos">segundos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-3">
              Plantilla de Remarketing 2
            </label>
            <select
              value={remarketingData.remarketing2?.template || ''}
              onChange={(e) => handleRemarketing2TemplateChange(e.target.value)}
              className="mt-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600"
            >
              <option value="">Selecciona una plantilla</option>
              {remarketingData.templates?.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200">
          <button
            onClick={crearPlantilla}
            className="px-8 py-5 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:from-sky-600 hover:to-sky-700 hover:-translate-y-0.5 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30"
          >
            Crear plantilla
          </button>
          <button
            onClick={recargarPlantillas}
            className="px-8 py-5 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:from-sky-600 hover:to-sky-700 hover:-translate-y-0.5 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30"
          >
            Recargar plantillas
          </button>
        </div>
      </div>
    </div>
  );
};