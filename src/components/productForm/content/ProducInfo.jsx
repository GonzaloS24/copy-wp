import React, { useState, useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';
import { uploadImage } from '../../../services/uploadImageService';

export const ProductInfo = () => {
  const {
    productData,
    updateProductData,
    validationState,
    updateValidationState
  } = useProduct();

  const [showTooltip, setShowTooltip] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const touchedFields = validationState.info?.touchedFields || {
    name: false,
    price: false,
    productType: false,
    image: false
  };

  const requiredFields = ['name', 'price', 'productType', 'image'];

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
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        setTouchedField('image');
        setIsUploading(true);
        setUploadError(null);
        try {
          const result = await uploadImage.uploadFile(file, file.name);
          handleInputChange('image', result.data.url);
          console.log('Imagen subida con éxito:', result);
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          setUploadError(error.message);
          handleInputChange('image', null);
        } finally {
          setIsUploading(false);
        }
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
    { value: 'EUR', label: 'EUR' },
    { value: 'UYU', label: 'UYU' },
    { value: 'BOB', label: 'BOB' },
    { value: 'PYG', label: 'PYG' },
  ];

  const productTypes = [
    { value: '', label: 'Selecciona un tipo', disabled: true },
    { value: 'fisico', label: 'Producto Físico' },
    { value: 'digital', label: 'Producto Digital' },
    { value: 'servicio', label: 'Servicio' }
  ];

  const shouldShowKeywordsField = () => {
    const selectedType = productData.info.formData.productType;
    return selectedType === 'digital' || selectedType === 'servicio';
  };

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

        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('productType') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Tipo de producto<span className="text-red-500">*</span>
          </label>
          <select
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all ${
              !isFieldValid('productType')
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-200 focus:border-sky-500'
            }`}
            value={productData.info.formData.productType || ''}
            onChange={(e) => handleInputChange('productType', e.target.value)}
            onBlur={() => setTouchedField('productType')}
          >
            {productTypes.map((type) => (
              <option 
                key={type.value} 
                value={type.value}
                disabled={type.disabled || false}
              >
                {type.label}
              </option>
            ))}
          </select>
          {!isFieldValid('productType') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        {shouldShowKeywordsField() && (
          <div className="mb-6 flex flex-col">
            <label className="text-base font-semibold mb-2 text-slate-700">
              Datos que serán solicitados al cliente
            </label>
            <input
              type="text"
              className="p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all border-slate-200 focus:border-sky-500"
              placeholder="Ej: nombre, correo, teléfono"
              value={productData.info.formData.dta_prompt || ''}
              onChange={(e) => handleInputChange('dta_prompt', e.target.value)}
            />
            <div className="text-xs text-slate-500 mt-1">
              Escribe los datos que necesitas.
            </div>
          </div>
        )}
        

        <div className="mb-6 flex flex-col">
          <label className="text-base font-semibold text-slate-700 mb-2">
            ID del producto en Dropi
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
            ¿Su producto tiene variaciones?
          </label>
          <div className="flex flex-col gap-4 mt-2">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => updateProductData('info', { productType: 'VARIABLE' })}
            >
              <div className={`w-5 h-5 border-2 rounded-full transition-all ${
                productData.info.productType === 'VARIABLE'
                  ? 'border-sky-500 bg-sky-500'
                  : 'border-slate-300 bg-white'
              }`}>
                {productData.info.productType === 'VARIABLE' && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1"></div>
                )}
              </div>
              <span className="text-slate-700">Si</span>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => updateProductData('info', { productType: 'SIMPLE' })}
            >
              <div className={`w-5 h-5 border-2 rounded-full transition-all ${
                productData.info.productType === 'SIMPLE'
                  ? 'border-sky-500 bg-sky-500'
                  : 'border-slate-300 bg-white'
              }`}>
                {productData.info.productType === 'SIMPLE' && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1"></div>
                )}
              </div>
              <span className="text-slate-700">No</span>
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
              isUploading ? 'cursor-not-allowed' : ''
            } ${
              !isFieldValid('image')
                ? 'border-red-500 hover:border-red-500'
                : 'border-slate-300 hover:border-sky-500'
            }`}
            onClick={!isUploading ? handleImageUpload : undefined}
          >
            {isUploading ? (
              <div className="text-base text-slate-700">Subiendo imagen...</div>
            ) : productData.info.formData.image ? (
              <div className="relative w-full h-48">
                <img
                  src={productData.info.formData.image}
                  alt="Previsualización del producto"
                  className="w-full h-full object-contain rounded-xl"
                />
                <div className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-70 rounded-full cursor-pointer hover:bg-opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange('image', null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ) : (
              <>
                <div className="text-3xl text-sky-500 mb-3">+</div>
                <div className={`text-base text-center ${
                  !isFieldValid('image') ? 'text-red-500' : 'text-slate-700'
                }`}>
                  Haz clic para subir una imagen
                </div>
              </>
            )}
          </div>
          {uploadError && (
            <span className="text-red-500 text-sm mt-1">{uploadError}</span>
          )}
          {!isFieldValid('image') && !uploadError && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>
      </div>


    </div>
  );
};