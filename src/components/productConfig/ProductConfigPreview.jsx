import React, { useState } from 'react';
import { ProducConfigSidebar } from './ProducConfigSidebar';
import { ProductConfig } from './content/ProductConfig';
import { ProductConfigActions } from './content/ProductConfigActions';

export const ProductConfigPreview = ({ onGoToProducts }) => {
  const [activeSection, setActiveSection] = useState('conexion-dropi');

  const renderContent = () => {
    switch (activeSection) {
      case 'conexion-dropi':
        return <ProductConfig />;
      case 'acciones-especiales':
        return <ProductConfigActions />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sección no encontrada
          </div>
        );
    }
  };

  return (
    <div className="flex h-[70vh] bg-gray-50 -mx-6 -my-6">
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <ProducConfigSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

      </div>
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
