import React, { useState, useRef, useEffect } from 'react';
import { Package, ShoppingCart, Globe, MessageCircle, Zap, X, Loader } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useProductService } from '../productInSeconds/service/productInfoService';
import OpenAIWarningModal from './OpenAIWarningModal'; 

const ProductInfoSelector = ({ isOpen, onClose }) => {
  const [selectedSource, setSelectedSource] = useState('dropi');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(1);
  const [error, setError] = useState(null);
 const [showOpenAIWarning, setShowOpenAIWarning] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, isLoading]);

  const sources = {
    dropi: {
      id: 'dropi',
      name: 'Dropi',
      icon: Package,
      label: 'ID de Dropi:',
      placeholder: 'Ingresa el ID del producto en Dropi',
      color: 'border-blue-400 bg-blue-50 text-blue-600',
      hoverColor: 'hover:border-blue-300'
    },
    shopify: {
      id: 'shopify',
      name: 'Shopify',
      icon: ShoppingCart,
      label: 'ID de Shopify:',
      placeholder: 'Ingresa el ID del producto en Shopify',
      color: 'border-green-400 bg-green-50 text-green-600',
      hoverColor: 'hover:border-green-300'
    },
    url: {
      id: 'url',
      name: 'URL',
      icon: Globe,
      label: 'URL del producto:',
      placeholder: 'Ingresa la URL del producto',
      color: 'border-indigo-400 bg-indigo-50 text-indigo-600',
      hoverColor: 'hover:border-indigo-300'
    },
    // chatea: {
    //   id: 'chatea',
    //   name: 'Chatea PRO',
    //   icon: MessageCircle,
    //   label: 'ID de Chatea PRO:',
    //   placeholder: 'Ingresa el ID del producto en Chatea PRO',
    //   color: 'border-purple-400 bg-purple-50 text-purple-600',
    //   hoverColor: 'hover:border-purple-300'
    // }
  };

  const loadingMessages = {
    1: 'Obteniendo producto',
    2: 'Generando secciones del producto',
    3: 'Insertando información del producto'
  };

  const loadingIcons = {
    1: <Loader className="w-5 h-5 text-blue-600 animate-spin" />,
    2: <Loader className="w-5 h-5 text-blue-600 animate-spin" />,
    3: (
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  };

  const currentSource = sources[selectedSource];
  const { processProductInfo } = useProductService();

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setError(null);
    setShowOpenAIWarning(false);
    setIsLoading(true);
    setLoadingState(1);

    try {
      await processProductInfo(selectedSource, inputValue, setLoadingState);
      
      setLoadingState(3);
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      onClose();
    } catch (err) {
      console.error('Error al obtener información del producto:', err);
      
      if (err.message.includes('OpenAI API key not found')) {
        setShowOpenAIWarning(true);
      } else {
        setError('No se pudo obtener la información del producto. Verifica el ID e intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
      setLoadingState(1);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      style={{ zIndex: 99999, position: 'fixed', width: '100vw', height: '100vh' }}
    >
      <div 
        ref={modalRef}
        className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl p-6 relative animate-in slide-in-from-bottom-4 duration-500 border border-gray-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
          disabled={isLoading}
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            ¿Desde dónde quieres obtener la información del producto?
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-3"></div>
        </div>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Selecciona la fuente y nosotros rellenaremos automáticamente todos los campos de tu asistente
        </p>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Fuente de información:
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(sources).map((source) => {
              const IconComponent = source.icon;
              const isSelected = selectedSource === source.id;
              
              return (
                <button
                  key={source.id}
                  onClick={() => {
                    setSelectedSource(source.id);
                    setInputValue('');
                    setError(null);
                  }}
                  disabled={isLoading}
                  className={`
                    group relative p-4 rounded-2xl border-2 transition-all duration-300 ease-out
                    hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                    ${isSelected 
                      ? `${source.color} shadow-md scale-[1.02] ring-2 ring-offset-2 ring-blue-200` 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`
                      p-3 rounded-xl transition-all duration-300 group-hover:scale-110
                      ${isSelected 
                        ? 'bg-white/80 backdrop-blur-sm shadow-sm' 
                        : 'bg-gray-50 text-gray-500 group-hover:bg-white group-hover:shadow-sm'
                      }
                    `}>
                      <IconComponent 
                        size={24} 
                        className={isSelected ? source.color.split(' ')[2] : 'text-gray-500 group-hover:text-gray-700'}
                      />
                    </div>
                    <span className={`
                      text-sm font-medium transition-all duration-300
                      ${isSelected ? 'text-gray-700' : 'text-gray-600 group-hover:text-gray-700'}
                    `}>
                      {source.name}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <div 
            key={selectedSource}
            className="animate-in slide-in-from-left duration-500"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              {React.createElement(currentSource.icon, { size: 16, className: currentSource.color.split(' ')[2] })}
              {currentSource.label}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError(null);
              }}
              placeholder={currentSource.placeholder}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
              className={`
                w-full px-4 py-4 rounded-2xl border-2
                ${error ? 'border-red-300' : 'border-gray-200'}
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-300 ease-out
                placeholder-gray-400 text-gray-700 bg-white
                hover:border-gray-300 hover:shadow-sm
                focus:shadow-md
                ${isLoading ? 'opacity-80' : ''}
              `}
              autoFocus
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-500 animate-in fade-in duration-300">
              {error}
            </div>
          )}
        </div>

        {isLoading && (
          <div className={`mb-6 p-4 rounded-2xl border animate-in slide-in-from-bottom duration-300 ${
            loadingState === 3 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center space-x-3">
              {loadingIcons[loadingState]}
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${
                  loadingState === 3 ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {loadingMessages[loadingState]}
                  {loadingState === 3 && (
                    <span className="ml-2 animate-bounce">✓</span>
                  )}
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        step <= loadingState 
                          ? loadingState === 3 && step === 3
                            ? 'bg-green-500 w-8'
                            : 'bg-blue-500 w-8'
                          : 'bg-gray-200 w-4'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className={`text-xs font-medium ${
                loadingState === 3 ? 'text-green-600' : 'text-blue-600'
              }`}>
                {loadingState}/3
              </div>
            </div>
            
            {loadingState === 3 && (
              <div className="mt-3 pt-3 border-t border-green-200 animate-in fade-in duration-300">
                <div className="flex items-center space-x-2 text-green-700">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">¡Información procesada exitosamente!</span>
                </div>
                <p className="text-xs text-green-600 mt-1 ml-6">
                  Cerrando automáticamente...
                </p>
              </div>
            )}
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative"
        >
          <div className="flex items-center justify-center space-x-2">
            <Zap size={20} />
            <span>Generar automáticamente</span>
          </div>
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Procesamiento automático e inteligente
          </p>
        </div>
      </div>
     <OpenAIWarningModal 
     isOpen={showOpenAIWarning} 
     onClose={() => setShowOpenAIWarning(false)} 
     />
    </div>
    
  );
  
  return createPortal(modalContent, document.body);
};

export default ProductInfoSelector;