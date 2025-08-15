// src/components/ProductMessageWel/ProductMessageWel.jsx
import React, { useState } from 'react';
import { useProduct } from '../../../context/ProductContext';
import { MediaManager } from './mediaCarrusel/MediaManager';

export const ProductMessageWel = () => {
  const { productData, updateProductData, validationState, updateValidationState } = useProduct();
  const [showFileTypesModal, setShowFileTypesModal] = useState(false); // Estado del modal

  const initialMediaItems = [
    { id: 1, type: 'image', icon: '🖼️', filled: false },
    { id: 2, type: 'video', icon: '🎥', filled: false },
    { id: 3, type: 'audio', icon: '🎵', filled: false },
  ];

  const messageWelData = productData.messageWel || {
    formData: {
      initialMessage: '',
      entryQuestion: ''
    },
    mediaItems: productData.messageWel?.mediaItems || initialMediaItems
  };

  const requiredFields = ['initialMessage', 'entryQuestion'];

  const isFieldValid = (field) => {
    if (!requiredFields.includes(field)) return true;
    if (!validationState.messageWel.touchedFields?.[field]) return true;
    return !!messageWelData.formData?.[field];
  };

  const handleInputChange = (field, value) => {
    if (!validationState.messageWel.touchedFields?.[field]) {
      updateValidationState('messageWel', {
        touchedFields: {
          ...validationState.messageWel.touchedFields,
          [field]: true
        }
      });
    }
    updateProductData('messageWel', {
      formData: {
        ...messageWelData.formData,
        [field]: value
      }
    });
  };

  const handleBlur = (field) => {
    if (!validationState.messageWel.touchedFields?.[field]) {
      updateValidationState('messageWel', {
        touchedFields: {
          ...validationState.messageWel.touchedFields,
          [field]: true
        }
      });
    }
  };

  return (
    <div className="block">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Mensajes de bienvenida
        </h1>

        {/* Mensaje inicial */}
        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('initialMessage') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Mensaje inicial<span className="text-red-500">*</span>
          </label>
          <textarea
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
              !isFieldValid('initialMessage')
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-200 focus:border-sky-500'
            }`}
            rows="3"
            placeholder="¡Hola! Soy Laura, bienvenida a Master Shop."
            value={messageWelData.formData?.initialMessage || ''}
            onChange={(e) => handleInputChange('initialMessage', e.target.value)}
            onBlur={() => handleBlur('initialMessage')}
          />
          {!isFieldValid('initialMessage') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        {/* Pasamos los estados del modal a MediaManager */}
        <MediaManager
          mediaItems={messageWelData.mediaItems}
          updateProductData={updateProductData}
          parentData={messageWelData}
          showFileTypesModal={showFileTypesModal} // Prop para mostrar/ocultar
          setShowFileTypesModal={setShowFileTypesModal} // Prop para cambiar el estado
        />

        {/* Pregunta de entrada */}
        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('entryQuestion') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Pregunta de entrada<span className="text-red-500">*</span>
          </label>
          <textarea
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
              !isFieldValid('entryQuestion')
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-200 focus:border-sky-500'
            }`}
            rows="3"
            placeholder="Gracias por interesarte en nuestro producto. Cuéntanos, ¿desde qué ciudad nos escribes?"
            value={messageWelData.formData?.entryQuestion || ''}
            onChange={(e) => handleInputChange('entryQuestion', e.target.value)}
            onBlur={() => handleBlur('entryQuestion')}
          />
          {!isFieldValid('entryQuestion') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
          <div className="text-xs text-slate-400 mt-2 leading-relaxed flex items-start gap-1.5">
            <span>¿Sabías que? Los enlaces de audio se convierten automáticamente en notas de voz</span>
          </div>
        </div>
      </div>
    </div>
  );
};