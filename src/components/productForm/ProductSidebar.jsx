import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductSidebar = ({ 
  activeSection, 
  onSectionChange
}) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'info-producto', emoji: '📦', label: 'Información del producto' },
    { id: 'embudo-ventas', emoji: '🔄', label: 'Mensajes de bienvenida' },
    { id: 'prompt-producto', emoji: '💬', label: 'Prompt del producto' },
    { id: 'voz-ia', emoji: '🎙️', label: 'Voz con IA' },
    { id: 'recordatorios', emoji: '⏰', label: 'Recordatorios' },
    { id: 'remarketing', emoji: '🔁', label: 'Remarketing' },
    { id: 'activador-flujo', emoji: '⚡', label: 'Activador de flujo' },
    { id: 'pixel-audiencias', emoji: '📱', label: 'Pixel y Audiencias' },
    { id: 'prueba-flujo', emoji: '🧪', label: 'Prueba tu asistente' }
  ];

  const selectSection = (sectionId) => {
    onSectionChange(sectionId);
  };

  const handleGoToProducts = () => {
    const navigationCallback = () => {
      navigate('/productos-config');
    };
    
    // Verificar si hay función de navegación programática disponible
    if (window.__handleProgrammaticNavigation) {
      const hasChanges = window.__handleProgrammaticNavigation(navigationCallback);
      
      if (!hasChanges) {
        // Si no hay cambios, navegar inmediatamente
        navigationCallback();
      }
    } else {
      // Fallback si no está disponible la verificación
      navigationCallback();
    }
  };

  return (
    <aside className="flex flex-col bg-white border-r border-slate-200 w-64 fixed left-0 top-16 bottom-0 z-10">
   
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto p-8 pb-4">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out font-semibold text-base text-slate-700 hover:bg-slate-100 hover:text-blue-500 ${
              activeSection === item.id 
                ? 'bg-cyan-50 text-blue-600' 
                : ''
            }`}
            onClick={() => selectSection(item.id)}
          >
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div 
        className="flex items-center justify-center gap-2 p-4 px-8 text-base font-semibold text-slate-700 cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-500 border-t border-slate-200 bg-white flex-shrink-0"
        onClick={handleGoToProducts}
      >
        <span className="text-base">←</span>
        <span>Volver a productos</span>
      </div>
    </aside>
  );
};