import React, { useState } from 'react';

export const ProductDebugPanel = ({ products, isVisible, onToggle }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50"
        title="Mostrar panel de depuración"
      >
        🐛
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Panel de Depuración - Productos</h2>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex h-[70vh]">
          <div className="w-1/3 border-r overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium mb-3">Productos ({products.length})</h3>
              {products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProduct(product)}
                  className={`p-2 mb-2 rounded cursor-pointer text-sm ${
                    selectedProduct === product
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500">ID: {product.id}</div>
                  <div className="text-xs text-gray-500">Estado: {product.status}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-2/3 overflow-y-auto">
            <div className="p-4">
              {selectedProduct ? (
                <div>
                  <h3 className="font-medium mb-4">Detalles del Producto</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-sm text-blue-600 mb-2">Datos Normalizados</h4>
                    <div className="bg-gray-50 p-3 rounded text-xs">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          type: selectedProduct.type,
                          status: selectedProduct.status,
                          image: selectedProduct.image,
                          dropiId: selectedProduct.dropiId
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  {selectedProduct.rawData && (
                    <div className="mb-6">
                      <h4 className="font-medium text-sm text-green-600 mb-2">Datos Originales de la API</h4>
                      <div className="bg-gray-50 p-3 rounded text-xs max-h-40 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(selectedProduct.rawData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.productData && (
                    <div className="mb-6">
                      <h4 className="font-medium text-sm text-purple-600 mb-2">Datos del Producto Parseados</h4>
                      <div className="bg-gray-50 p-3 rounded text-xs max-h-40 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(selectedProduct.productData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-sm text-orange-600 mb-2">Validación de Campos</h4>
                    <div className="space-y-1 text-xs">
                      <ValidationField 
                        label="ID" 
                        value={selectedProduct.id} 
                        isValid={!!selectedProduct.id && selectedProduct.id !== 'unknown'} 
                      />
                      <ValidationField 
                        label="Nombre" 
                        value={selectedProduct.name} 
                        isValid={!!selectedProduct.name && selectedProduct.name !== 'Producto sin nombre'} 
                      />
                      <ValidationField 
                        label="Precio" 
                        value={selectedProduct.price} 
                        isValid={!!selectedProduct.price && selectedProduct.price !== '$0.00'} 
                      />
                      <ValidationField 
                        label="Estado" 
                        value={selectedProduct.status} 
                        isValid={['activo', 'inactivo'].includes(selectedProduct.status)} 
                      />
                      <ValidationField 
                        label="Tipo" 
                        value={selectedProduct.type} 
                        isValid={['Simple', 'Variable'].includes(selectedProduct.type)} 
                      />
                      <ValidationField 
                        label="Imagen" 
                        value={selectedProduct.image || 'Sin imagen'} 
                        isValid={!!selectedProduct.image} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-20">
                  Selecciona un producto para ver sus detalles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValidationField = ({ label, value, isValid }) => (
  <div className="flex items-center justify-between p-2 bg-white rounded border">
    <span className="font-medium">{label}:</span>
    <span className="text-gray-600 max-w-xs truncate" title={value}>
      {value}
    </span>
    <span className={`ml-2 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
      {isValid ? '✓' : '✗'}
    </span>
  </div>
);