import React from 'react';

export const ProducConfigSidebar = ({ 
  activeSection, 
  onSectionChange
}) => {
  const sidebarItems = [
    { id: 'conexion-dropi', emoji: '🛒', label: 'Conexión con Dropi' },
    { id: 'acciones-especiales', emoji: '⚡', label: 'Acciones especiales' },
    { id: 'personal-prompt', emoji:'📝', label: 'Producto en Segundos' }
  ];

  const selectSection = (sectionId) => {
    onSectionChange(sectionId);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out font-medium text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-500 ${
              activeSection === item.id 
                ? 'bg-cyan-50 text-blue-600 border border-cyan-200' 
                : ''
            }`}
            onClick={() => selectSection(item.id)}
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};