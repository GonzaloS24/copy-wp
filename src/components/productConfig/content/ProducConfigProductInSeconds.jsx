import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useConfig } from '../../../context/ConfigContext';
import { predefinedStructureText, predefinedPromptText } from './tools/predefinedTexts';


const STRUCTURE_MAX_LENGTH = 4000;
const PROMPT_MAX_LENGTH = 12000;

export const ProductConfigProductInSeconds = () => {
  const { dropiConfig, updateDropiConfig } = useConfig();
  const [structureHistory, setStructureHistory] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const isInitialMount = useRef(true);
  
   const validateAndTruncateText = useCallback((text, maxLength) => {
    if (typeof text !== 'string') return '';
    
    const sanitizedText = text.slice(0, maxLength);

    if (sanitizedText.length > maxLength) {
      console.warn('Intento de exceder límite de caracteres detectado');
      return sanitizedText.slice(0, maxLength);
    }
    
    return sanitizedText;
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      if (!dropiConfig.productStructureRules && predefinedStructureText) {
        updateDropiConfig({ productStructureRules: predefinedStructureText });
      }
      
      if (!dropiConfig.productPromptRules && predefinedPromptText) {
        updateDropiConfig({ productPromptRules: predefinedPromptText });
      }
    }
  }, [dropiConfig, updateDropiConfig]);

  const loadPredefinedStructure = () => {
    const currentValue = dropiConfig.productStructureRules || '';
    if (currentValue && currentValue !== predefinedStructureText) {
      setStructureHistory(prev => [...prev, currentValue]);
    }
    updateDropiConfig({ productStructureRules: predefinedStructureText });
  };

  const loadPredefinedPrompt = () => {
    const currentValue = dropiConfig.productPromptRules || '';
    if (currentValue && currentValue !== predefinedPromptText) {
      setPromptHistory(prev => [...prev, currentValue]);
    }
    updateDropiConfig({ productPromptRules: predefinedPromptText });
  };

  const handleStructureChange = (e) => {
    const newValue = e.target.value;
    const currentValue = dropiConfig.productStructureRules || '';
    
    if (currentValue && currentValue !== newValue) {
      setStructureHistory(prev => [...prev, currentValue]);
    }
    
    updateDropiConfig({ productStructureRules: newValue });
  };

  const handlePromptChange = (e) => {
    const newValue = e.target.value;
    const currentValue = dropiConfig.productPromptRules || '';
    
    if (currentValue && currentValue !== newValue) {
      setPromptHistory(prev => [...prev, currentValue]);
    }
    
    updateDropiConfig({ productPromptRules: newValue });
  };

  const clearStructureText = () => {
    const currentValue = dropiConfig.productStructureRules || '';
    if (currentValue && currentValue.trim() !== '') {
      setStructureHistory(prev => [...prev, currentValue]);
    }
    updateDropiConfig({ productStructureRules: '' });
  };

  const clearPromptText = () => {
    const currentValue = dropiConfig.productPromptRules || '';
    if (currentValue && currentValue.trim() !== '') {
      setPromptHistory(prev => [...prev, currentValue]);
    }
    updateDropiConfig({ productPromptRules: '' });
  };

  const undoStructureChange = () => {
    if (structureHistory.length > 0) {
      const lastValue = structureHistory[structureHistory.length - 1];
      setStructureHistory(prev => prev.slice(0, -1));
      updateDropiConfig({ productStructureRules: lastValue });
    }
  };

  const undoPromptChange = () => {
    if (promptHistory.length > 0) {
      const lastValue = promptHistory[promptHistory.length - 1];
      setPromptHistory(prev => prev.slice(0, -1));
      updateDropiConfig({ productPromptRules: lastValue });
    }
  };
  
  const structureCharCount = validateAndTruncateText(dropiConfig.productStructureRules || '', STRUCTURE_MAX_LENGTH).length;
  const promptCharCount = validateAndTruncateText(dropiConfig.productPromptRules || '', PROMPT_MAX_LENGTH).length;


  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'maxlength') {
   
          const textareas = document.querySelectorAll('textarea');
          textareas.forEach((textarea, index) => {
            const expectedMaxLength = index === 0 ? STRUCTURE_MAX_LENGTH : PROMPT_MAX_LENGTH;
            if (textarea.getAttribute('maxlength') !== String(expectedMaxLength)) {
              textarea.setAttribute('maxlength', expectedMaxLength);
            }
          });
        }
      });
    });

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      observer.observe(textarea, { attributes: true, attributeFilter: ['maxlength'] });
    });

    return () => observer.disconnect();
  }, []);

return (
    <div className="block">
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 w-full relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Personaliza tu prompt para producto en segundos
        </h1>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Describe las reglas para la estructura de tu producto
            </label>
            <div className="flex gap-2">
              <span className={`text-sm font-medium ${structureCharCount > STRUCTURE_MAX_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                {structureCharCount} / {STRUCTURE_MAX_LENGTH}
              </span>
              <button
                onClick={loadPredefinedStructure}
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                title="Cargar texto predefinido"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button
                onClick={undoStructureChange}
                disabled={structureHistory.length === 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Deshacer último cambio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button
                onClick={clearStructureText}
                disabled={!dropiConfig.productStructureRules || dropiConfig.productStructureRules.trim() === ''}
                className="p-2 text-red-500 hover:text-red-700 disabled:text-red-300 disabled:cursor-not-allowed transition-colors"
                title="Borrar todo el texto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors bg-white resize-vertical min-h-32"
            placeholder="Ingresa las reglas para la estructura del producto..."
            value={validateAndTruncateText(dropiConfig.productStructureRules || '', STRUCTURE_MAX_LENGTH)}
            onChange={handleStructureChange}
            rows={4}
            maxLength={STRUCTURE_MAX_LENGTH}
            onKeyDown={(e) => {
              const currentText = e.target.value;
              if (currentText.length >= STRUCTURE_MAX_LENGTH && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Describe las reglas del prompt de tu producto
            </label>
            <div className="flex gap-2">
              <span className={`text-sm font-medium ${promptCharCount > PROMPT_MAX_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                {promptCharCount} / {PROMPT_MAX_LENGTH}
              </span>
              <button
                onClick={loadPredefinedPrompt}
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                title="Cargar texto predefinido"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button
                onClick={undoPromptChange}
                disabled={promptHistory.length === 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Deshacer último cambio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button
                onClick={clearPromptText}
                disabled={!dropiConfig.productPromptRules || dropiConfig.productPromptRules.trim() === ''}
                className="p-2 text-red-500 hover:text-red-700 disabled:text-red-300 disabled:cursor-not-allowed transition-colors"
                title="Borrar todo el texto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors bg-white resize-vertical min-h-32"
            placeholder="Ingresa las reglas del prompt para el producto..."
            value={validateAndTruncateText(dropiConfig.productPromptRules || '', PROMPT_MAX_LENGTH)}
            onChange={handlePromptChange}
            rows={4}
            maxLength={PROMPT_MAX_LENGTH}
            onKeyDown={(e) => {
              const currentText = e.target.value;
              if (currentText.length >= PROMPT_MAX_LENGTH && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};