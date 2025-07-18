// ProductInfo.js
import React, { useState } from 'react';
import { useProduct } from '../../../context/ProductContext';

export const ProductInfo = () => {
  const { 
    productData, 
    updateProductData,
    validationState,
    updateValidationState
  } = useProduct();
  
  const [showTooltip, setShowTooltip] = useState(false);

  const touchedFields = validationState.info?.touchedFields || {
    name: false,
    price: false,
    description: false,
    image: false
  };

  const requiredFields = ['name', 'price', 'description', 'image'];
  
  const setTouchedField = (field) => {
    updateValidationState('info', {
      touchedFields: {
        ...touchedFields,
        [field]: true
      }
    });
  };

  const handleInputChange = (field, value) => {
    if (!touchedFields[field]) {
      setTouchedField(field);
    }
    updateProductData('info', {
      formData: {
        ...productData.info.formData,
        [field]: value
      }
    });
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setTouchedField('image');
        handleInputChange('image', file);
      }
    };
    input.click();
  };

  const isFieldValid = (field) => {
    if (!requiredFields.includes(field)) return true;
    if (!touchedFields[field]) return true;
    
    if (field === 'image') {
      return !!productData.info.formData.image;
    }
    
    return !!productData.info.formData[field];
  };

  const currencies = [
    { value: 'COP', label: 'COP' },
    { value: 'MXN', label: 'MXN' },
    { value: 'CLP', label: 'CLP' },
    { value: 'PEN', label: 'PEN' },
    { value: 'ARS', label: 'ARS' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'BRL', label: 'BRL' },
    { value: 'UYU', label: 'UYU' },
    { value: 'BOB', label: 'BOB' },
    { value: 'PYG', label: 'PYG' },
    { value: 'VES', label: 'VES' }
  ];

  return (
    <div className="block">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Información del producto
        </h1>
        
        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('name') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Nombre del producto<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all ${
              !isFieldValid('name') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-200 focus:border-sky-500'
            }`}
            placeholder="Ingresa el nombre del producto"
            value={productData.info.formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => setTouchedField('name')}
          />
          {!isFieldValid('name') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('price') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Precio del producto<span className="text-red-500">*</span>
          </label>
          <div className="flex items-stretch">
            <input
              type="number"
              className={`flex-1 p-4 border-2 rounded-l-xl border-r-0 text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all ${
                !isFieldValid('price') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-sky-500'
              }`}
              placeholder="Ingresa el precio"
              min="0"
              step="0.01"
              value={productData.info.formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              onBlur={() => setTouchedField('price')}
            />
            <select
              className={`w-32 p-4 border-2 rounded-r-xl border-l-0 text-base bg-slate-50 text-slate-700 cursor-pointer font-medium focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all ${
                !isFieldValid('price') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-sky-500'
              }`}
              value={productData.info.formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
          {!isFieldValid('price') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        {/* Descripción del producto */}
        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('description') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Descripción del producto<span className="text-red-500">*</span>
          </label>
          <textarea
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
              !isFieldValid('description') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-200 focus:border-sky-500'
            }`}
            rows="4"
            placeholder="Ingresa una descripción breve del producto"
            value={productData.info.formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onBlur={() => setTouchedField('description')}
          />
          {!isFieldValid('description') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        <div className="mb-6 flex flex-col">
          <label className="text-base font-semibold text-slate-700 mb-2">
            ID del producto en Droplin
          </label>
          <input
            type="text"
            className="p-4 border-2 border-slate-200 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
            placeholder="Ingresa el ID"
            value={productData.info.formData.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
          />
        </div>

        <div className="mb-6 flex flex-col">
          <label className="text-base font-semibold text-slate-700 mb-2">
            Tipo de producto
          </label>
          <div className="flex flex-col gap-4 mt-2">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => updateProductData('info', { productType: 'simple' })}
            >
              <div className={`w-5 h-5 border-2 rounded-full transition-all ${
                productData.info.productType === 'simple' 
                  ? 'border-sky-500 bg-sky-500' 
                  : 'border-slate-300 bg-white'
              }`}>
                {productData.info.productType === 'simple' && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1"></div>
                )}
              </div>
              <span className="text-slate-700">Producto simple</span>
            </div>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => updateProductData('info', { productType: 'variable' })}
            >
              <div className={`w-5 h-5 border-2 rounded-full transition-all ${
                productData.info.productType === 'variable' 
                  ? 'border-sky-500 bg-sky-500' 
                  : 'border-slate-300 bg-white'
              }`}>
                {productData.info.productType === 'variable' && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1"></div>
                )}
              </div>
              <span className="text-slate-700">Producto variable</span>
            </div>
          </div>
        </div>

 
        <div className="mb-6 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-base font-semibold text-slate-700">
              Estado del producto
            </label>
            <div className="relative inline-block">
              <div
                className="w-5 h-5 bg-sky-500 text-white rounded-full text-center text-xs leading-5 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                i
              </div>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-left rounded-lg p-3 text-sm z-10">
                  Si está activo, significa que la IA le puede hablar de este producto a los clientes. Si está inactivo, la IA no le hablará de este producto. Se sugiere dejarlo activo cuando el producto esté totalmente configurado.
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`relative w-11 h-5 rounded-full cursor-pointer transition-all border ${
                productData.info.isActive 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'bg-slate-200 border-slate-200'
              }`}
              onClick={() => updateProductData('info', { isActive: !productData.info.isActive })}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                  productData.info.isActive ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </div>
            <span className={`text-base font-medium transition-all ${
              productData.info.isActive ? 'text-emerald-500' : 'text-slate-500'
            }`}>
              {productData.info.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>

        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('image') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Imagen del producto<span className="text-red-500">*</span>
          </label>
          <div
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-slate-50 cursor-pointer transition-all hover:bg-cyan-50 ${
              !isFieldValid('image') 
                ? 'border-red-500 hover:border-red-500' 
                : 'border-slate-300 hover:border-sky-500'
            }`}
            onClick={handleImageUpload}
          >
            <div className="text-3xl text-sky-500 mb-3">+</div>
            <div className={`text-base text-center ${
              !isFieldValid('image') ? 'text-red-500' : 'text-slate-700'
            }`}>
              {productData.info.formData.image 
                ? productData.info.formData.image.name 
                : 'Haz clic para subir una imagen'}
            </div>
          </div>
          {!isFieldValid('image') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>
      </div>
    </div>
  );
};