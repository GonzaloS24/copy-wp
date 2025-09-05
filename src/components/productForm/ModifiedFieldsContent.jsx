import React from 'react';

export const ModifiedFieldsContent = ({ modifiedFields, isUnloadAction, saveError }) => {
  if (modifiedFields.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          {isUnloadAction ? '¿Cerrar sin guardar?' : '¿Salir sin guardar?'}
        </p>
        <p className="text-sm text-gray-600">
          Tienes *{modifiedFields.length} campo{modifiedFields.length > 1 ? 's' : ''} con cambios sin guardar:
        </p>
        
        {saveError && (
          <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {saveError}
          </div>
        )}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-40 overflow-y-auto">
        <ul className="text-sm space-y-2">
          {modifiedFields.map((field, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">{field}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};