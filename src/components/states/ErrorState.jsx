import React from 'react';

export const ErrorState = ({ error, onRetry }) => (
  <div className="w-full p-8 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
      <h3 className="text-lg font-semibold text-red-500 mb-2">Error al cargar productos</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Reintentar
      </button>
    </div>
  </div>
);