// ProductSidebar.js
import { useNavigate, useParams } from "react-router-dom";
import { navigationEvents } from "../../utils/ventasWp/navigationEvents";

export const ProductSidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const { productName } = useParams();

  const isCreatingProduct = !productName;

  const sidebarItems = [
    { id: "info-producto", emoji: "📦", label: "Información del producto" },
    { id: "embudo-ventas", emoji: "🔄", label: "Mensajes de bienvenida" },
    { id: "prompt-producto", emoji: "💬", label: "Prompt del producto" },
    { id: "voz-ia", emoji: "🎙️", label: "Voz con IA" },
    { id: "recordatorios", emoji: "⏰", label: "Recordatorios" },
    { id: "remarketing", emoji: "🔁", label: "Remarketing" },
    { id: "activador-flujo", emoji: "⚡", label: "Activador de flujo" },
    { id: "pixel-audiencias", emoji: "📱", label: "Pixel y Audiencias" },
    {
      id: "prueba-flujo",
      emoji: "🧪",
      label: "Prueba tu asistente",
      disabled: false,
      isLimited: isCreatingProduct,
    },
  ];

  const selectSection = (sectionId) => {
    onSectionChange(sectionId);
  };

  const handleGoToProducts = () => {
    const navigationCallback = () => {
      navigate("/productos-config");
    };

    const isBlocked = navigationEvents.triggerNavigationBlock(navigationCallback);
    
    if (!isBlocked) {
      navigationCallback();
    }
  };

  return (
    <aside className="flex flex-col bg-white border-r border-slate-200 w-64 fixed left-0 top-16 bottom-0 z-10">
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto p-8 pb-4">
        {sidebarItems.map((item) => {
          const isLimited = item.isLimited;

          return (
            <div
              key={item.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out font-semibold text-base relative
                ${
                  activeSection === item.id
                    ? "bg-cyan-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-500"
                }
                ${isLimited ? "opacity-75" : ""}
              `}
              onClick={() => selectSection(item.id)}
              title={
                isLimited
                  ? "Funcionalidad limitada: guarda el producto para habilitar completamente"
                  : ""
              }
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="flex-1">{item.label}</span>
              {isLimited && (
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
            </div>
          );
        })}
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