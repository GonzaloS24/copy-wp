import React, { useEffect, useCallback, useState } from 'react';
import { useProduct } from '../../../context/ProductContext';
import { ProductGuidePrompt } from './ProductGuidePrompt';
import { ProductService } from '../../../services/productService'; 

// CONSTANTES INMUTABLES fuera del componente
const MAX_CHARACTERS = 10000;

export const ProductFreePrompt = ({ productName }) => {
  const {
    productData,
    updateProductData,
    validationState,
    updateValidationState
  } = useProduct();

  const [localText, setLocalText] = useState('');

  const freePromptData = productData.freePrompt || {
    promptType: 'libre',
    promptContent: { text: '', metadata: {} },
    showTooltip: { libre: false, guiado: false },
    guidePromptData: {
      contextualizacion: '',
      fichaTecnica: '',
      guionConversacional: '',
      posiblesSituaciones: '',
      reglasIA: ''
    }
  };

  // Función de validación robusta
  const validateAndTruncateText = useCallback((text) => {
    if (typeof text !== 'string') return '';
    
    // Validación adicional por si el usuario manipula el DOM
    const sanitizedText = text.slice(0, MAX_CHARACTERS);
    
    // Doble verificación de longitud
    if (sanitizedText.length > MAX_CHARACTERS) {
      console.warn('Intento de exceder límite de caracteres detectado');
      return sanitizedText.slice(0, MAX_CHARACTERS);
    }
    
    return sanitizedText;
  }, []);

  useEffect(() => {
    if (!productData.freePrompt || !productData.freePrompt.promptType) {
      updateProductData('freePrompt', {
        ...freePromptData,
        promptType: 'libre',
        promptContent: { text: '', metadata: {} },
        showTooltip: { libre: false, guiado: false },
        guidePromptData: {
          contextualizacion: '',
          fichaTecnica: '',
          guionConversacional: '',
          posiblesSituaciones: '',
          reglasIA: ''
        }
      });
    }
  }, [productData.freePrompt, updateProductData]);

  const getPromptText = useCallback(() => {
    const promptData = productData.freePrompt?.promptText || productData.freePrompt?.promptContent;
    
    if (!promptData) return '';
    
    if (typeof promptData === 'string') return validateAndTruncateText(promptData);
    
    if (typeof promptData === 'object') {
      let text = '';
      if (promptData.text) text = promptData.text;
      else if (promptData.prompt) text = promptData.prompt;
      else if (promptData.content) text = promptData.content;
      else if (promptData.value) text = promptData.value;
      else {
        const keys = Object.keys(promptData);
        if (keys.length === 1) {
          const value = promptData[keys[0]];
          if (typeof value === 'string') text = value;
        }
      }
      return validateAndTruncateText(text);
    }
    
    return '';
  }, [productData.freePrompt, validateAndTruncateText]);

  const currentText = getPromptText();
  const isExceeded = currentText.length > MAX_CHARACTERS;

  // Sincronizar el texto local con el texto validado
  useEffect(() => {
    setLocalText(currentText);
  }, [currentText]);

  const isFieldValid = (field) => {
    if (field === 'promptText') {
      if (!validationState.freePrompt.touchedFields?.[field]) return true;
      return !!currentText && currentText.length <= MAX_CHARACTERS;
    }
    return true;
  };

  const handlePromptTypeToggle = () => {
    const newType = freePromptData.promptType === 'libre' ? 'guiado' : 'libre';
    updateProductData('freePrompt', {
      ...freePromptData,
      promptType: newType
    });
  };

  const handleTooltipToggle = (type, show) => {
    updateProductData('freePrompt', {
      ...freePromptData,
      showTooltip: {
        ...freePromptData.showTooltip,
        [type]: show
      }
    });
  };

  const handlePromptTextChange = (e) => {
    const newText = e.target.value;
    const validatedText = validateAndTruncateText(newText);
    
    // Actualizar estado local para respuesta inmediata
    setLocalText(validatedText);
    
    if (!validationState.freePrompt.touchedFields?.promptText) {
      updateValidationState('freePrompt', {
        touchedFields: {
          ...validationState.freePrompt.touchedFields,
          promptText: true
        }
      });
    }
    
    // Actualizar estado global con texto validado
    updateProductData('freePrompt', {
      ...freePromptData,
      promptContent: {
        ...freePromptData.promptContent,
        text: validatedText
      },
      promptText: validatedText
    });
  };

  const handleBlur = (field) => {
    if (!validationState.freePrompt.touchedFields?.[field]) {
      updateValidationState('freePrompt', {
        touchedFields: {
          ...validationState.freePrompt.touchedFields,
          [field]: true
        }
      });
    }
  };

  // Protección contra manipulación del DOM
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'maxlength') {
          const textarea = document.querySelector('textarea[data-free-prompt]');
          if (textarea && textarea.getAttribute('maxlength') !== String(MAX_CHARACTERS)) {
            textarea.setAttribute('maxlength', MAX_CHARACTERS);
          }
        }
      });
    });

    const textarea = document.querySelector('textarea[data-free-prompt]');
    if (textarea) {
      observer.observe(textarea, { attributes: true, attributeFilter: ['maxlength'] });
    }

    return () => observer.disconnect();
  }, []);

  const handleCreadorPrompts = () => console.log('Abrir creador de prompts');
  const handleClasesPrompts = () => console.log('Abrir clases para crear prompts');
  const handleCreadorEnlaces = () => console.log('Abrir creador de enlaces multimedia');

  return (
    <div className="block">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Prompt del producto
        </h1>
        
        <div className="mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-center gap-8 max-w-2xl mx-auto">

            <div className="flex items-center gap-2 relative">
              <span className="text-2xl">✏️</span>
              <span className={`text-lg font-semibold transition-colors duration-300 ${
                freePromptData.promptType === 'libre' ? 'text-sky-500' : 'text-slate-500'
              }`}>
                Prompt libre
              </span>
              <div className="relative">
                <div
                  className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 ml-2 hover:bg-sky-500 hover:text-white hover:scale-110"
                  onMouseEnter={() => handleTooltipToggle('libre', true)}
                  onMouseLeave={() => handleTooltipToggle('libre', false)}
                >
                  ⓘ
                </div>
                {freePromptData.showTooltip?.libre && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-72 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed shadow-lg transition-all duration-300 opacity-100 translate-y-1 z-50">
                    Personaliza completamente el prompt según tus necesidades específicas. Tienes control total sobre el contenido y estructura.
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div
              className={`w-20 h-10 rounded-full relative cursor-pointer transition-colors duration-300 ${
                freePromptData.promptType === 'libre' ? 'bg-slate-200' : 'bg-sky-500'
              }`}
              onClick={handlePromptTypeToggle}
            >
              <div
                className={`w-8 h-8 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-md ${
                  freePromptData.promptType === 'libre' ? 'left-1' : 'left-1 translate-x-10'
                }`}
              />
            </div>
            
            <div className="flex items-center gap-2 relative">
              <span className="text-2xl">🎯</span>
              <span className={`text-lg font-semibold transition-colors duration-300 ${
                freePromptData.promptType === 'guiado' ? 'text-sky-500' : 'text-slate-500'
              }`}>
                Prompt guiado
              </span>
              <div className="relative">
                <div
                  className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 ml-2 hover:bg-sky-500 hover:text-white hover:scale-110"
                  onMouseEnter={() => handleTooltipToggle('guiado', true)}
                  onMouseLeave={() => handleTooltipToggle('guiado', false)}
                >
                  ⓘ
                </div>
                {freePromptData.showTooltip?.guiado && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-72 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed shadow-lg transition-all duration-300 opacity-100 translate-y-1 z-50">
                    Estructura paso a paso validada por expertos de Chatea PRO. Solo completa los campos y nosotros creamos el prompt perfecto.
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
         {freePromptData.promptType === 'libre' && (
          <div>
            <div className="mb-6 flex flex-col">
              <label className={`text-base font-semibold mb-2 ${
                !isFieldValid('promptText') ? 'text-red-500' : 'text-slate-700'
              }`}>
                Prompt personalizado<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  data-free-prompt
                  className={`w-full p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
                    !isFieldValid('promptText') 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 focus:border-sky-500'
                  }`}
                  rows="12"
                  placeholder="Aquí puedes crear tu prompt personalizado..."
                  value={localText}
                  onChange={handlePromptTextChange}
                  onBlur={() => handleBlur('promptText')}
                  maxLength={MAX_CHARACTERS}
                  onKeyDown={(e) => {
                    if (currentText.length >= MAX_CHARACTERS && e.key !== 'Backspace' && e.key !== 'Delete') {
                      e.preventDefault();
                    }
                  }}
                />
                <div className={`absolute bottom-3 right-4 text-xs px-2 py-1 rounded transition-colors duration-300 pointer-events-none select-none ${
                  isExceeded 
                    ? 'text-red-500 bg-red-50/90' 
                    : !isFieldValid('promptText') 
                      ? 'text-red-500 bg-red-50/90'
                      : 'text-slate-400 bg-slate-50/90'
                }`}>
                  {currentText.length}/{MAX_CHARACTERS}
                </div>
              </div>
              {!isFieldValid('promptText') && (
                <span className="text-red-500 text-sm mt-1">
                  {!currentText 
                    ? 'Este campo es obligatorio' 
                    : currentText.length > MAX_CHARACTERS 
                      ? `El texto excede el límite de ${MAX_CHARACTERS} caracteres` 
                      : 'Este campo es obligatorio'}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-8">
              <button
                className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-2xl p-8 cursor-pointer transition-all duration-300 text-center flex flex-col items-center gap-4 shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/40 font-inherit"
                onClick={handleCreadorPrompts}
              >
                <div className="text-4xl bg-white/15 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:scale-105">
                  💬
                </div>
                <div className="text-base font-semibold leading-relaxed text-white">
                  Creador de prompts
                </div>
              </button>
              
              <button
                className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-2xl p-8 cursor-pointer transition-all duration-300 text-center flex flex-col items-center gap-4 shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/40 font-inherit"
                onClick={handleClasesPrompts}
              >
                <div className="text-4xl bg-white/15 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:scale-105">
                  ▶️
                </div>
                <div className="text-base font-semibold leading-relaxed text-white">
                  Clases para crear prompts
                </div>
              </button>
              
              <button
                className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-2xl p-8 cursor-pointer transition-all duration-300 text-center flex flex-col items-center gap-4 shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/40 font-inherit"
                onClick={handleCreadorEnlaces}
              >
                <div className="text-4xl bg-white/15 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:scale-105">
                  🔗
                </div>
                <div className="text-base font-semibold leading-relaxed text-white">
                  Creador de enlaces multimedia
                </div>
              </button>
            </div>
          </div>
        )}
        
        {freePromptData.promptType === 'guiado' && (
          <div className="text-center py-12">
            <ProductGuidePrompt 
              guideData={freePromptData.guidePromptData || {}} 
              onGuideDataChange={(data) => updateProductData('freePrompt', {
                ...freePromptData,
                guidePromptData: data
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};