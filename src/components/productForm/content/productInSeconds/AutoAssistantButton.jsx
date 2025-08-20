import React, { useState } from 'react';
import ProductInfoSelector from '../dialog/ProductInfoSelector';

export const AutoAssistantButton = ({
  isLoading = false,
  onClick,
  loadingText = 'Generando...',
  defaultText = 'Crea tu asistente en segundos',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className={`text-white border-none rounded-xl px-6 py-3 text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out flex items-center gap-3 shadow-lg min-w-[220px] justify-center ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/35 active:translate-y-0'
        } ${className}`}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
      >
        <span className="text-base">
          {isLoading ? '⏳' : '✨'}
        </span>
        <span>
          {isLoading ? loadingText : defaultText}
        </span>
      </button>

      <ProductInfoSelector 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};