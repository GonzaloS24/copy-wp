import React, { useState } from 'react';
import { useProduct } from '../../../context/ProductContext';


export const ProductMessageWel = () => {
  const { productData, updateProductData, validationState, updateValidationState } = useProduct();

  const messageWelData = productData.messageWel || {
    formData: {
      initialMessage: '¡Hola! Soy Laura, bienvenida a Master Shop.',
      entryQuestion: 'Gracias por interesarte en nuestro producto. Cuéntanos, ¿desde qué ciudad nos escribes?'
    },
    mediaItems: [
      { id: 1, type: 'image', icon: '🖼️', filled: true },
      { id: 2, type: 'video', icon: '▶️', filled: true },
      { id: 3, type: 'audio', icon: '🔊', filled: true }
    ]
  };

  const requiredFields = ['initialMessage', 'entryQuestion'];

  const isFieldValid = (field) => {
    if (!requiredFields.includes(field)) return true;
    if (!validationState.messageWel.touchedFields?.[field]) return true;
    
    return !!messageWelData.formData?.[field];
  };

  const getBorderColor = (field) => {
    return isFieldValid(field) ? 'border-slate-200' : 'border-red-500';
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

  const handleMediaClick = (id) => {
    console.log(`Media item ${id} clicked`);
  };

  const addMediaSlot = () => {
    const newId = messageWelData.mediaItems.length > 0 
      ? Math.max(...messageWelData.mediaItems.map(item => item.id)) + 1 
      : 1;
    
    updateProductData('messageWel', {
      mediaItems: [
        ...messageWelData.mediaItems,
        { id: newId, type: 'image', icon: '🖼️', filled: false }
      ]
    });
  };

  const renderMediaSlots = () => {
    const slots = [];
    
    messageWelData.mediaItems?.forEach((item) => {
      slots.push(
        <div
          key={item.id}
          className={`
            aspect-square border-2 rounded-xl flex items-center justify-center cursor-pointer 
            transition-all duration-200 min-h-20 transform hover:-translate-y-0.5
            ${item.filled 
              ? 'bg-slate-50 border-slate-300 hover:bg-blue-50 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/15' 
              : 'bg-white border-slate-200 hover:bg-blue-50 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/15'
            }
          `}
          onClick={() => handleMediaClick(item.id)}
        >
          <div className="text-3xl text-slate-500 transition-colors duration-200 hover:text-sky-500">
            {item.icon}
          </div>
        </div>
      );
    });

    while (slots.length < 7) {
      slots.push(
        <div
          key={`empty-${slots.length}`}
          className="
            aspect-square border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center 
            cursor-pointer transition-all duration-200 min-h-20 bg-slate-50 transform hover:-translate-y-0.5
            hover:bg-blue-50 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/15
          "
          onClick={addMediaSlot}
        >
          <div className="text-4xl text-slate-400 font-light transition-all duration-200 hover:text-sky-500 hover:scale-110">
            +
          </div>
        </div>
      );
    }

    return slots;
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

        <div className="mb-6 flex flex-col">
          <label className="text-base font-semibold text-slate-700 mb-2">
            Contenido multimedia inicial
          </label>
          <div className="grid grid-cols-7 gap-4 mt-3">
            {renderMediaSlots()}
          </div>
        </div>

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
            <span className="text-sm mt-0.5">💡</span>
            <span>¿Sabías que? Los enlaces de audio se convierten automáticamente en notas de voz</span>
          </div>
        </div>
      </div>
    </div>
  );
};