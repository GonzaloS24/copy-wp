const CarritosSidebar = ({
  activeSection,
  onSectionChange,
  onBackToProducts,
}) => {
  const sidebarItems = [
    {
      id: "identidad-asistente",
      label: "Identidad del asistente",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: "datos-tienda",
      label: "Datos de la tienda",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
          <polyline points="7,15 12,15 12,11"></polyline>
        </svg>
      ),
    },
    {
      id: "datos-logisticos",
      label: "Datos logísticos",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      id: "mensajes-recuperacion",
      label: "Mensajes de recuperación",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: "envio-correos",
      label: "Envío de correos",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
    {
      id: "acciones-especiales",
      label: "Acciones especiales",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
        </svg>
      ),
    },
    {
      id: "prueba-asistente",
      label: "Prueba tu asistente",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1.3 0-2.4-.4-3.2-1.2L12 5 6.2 10.8C5.4 11.6 4.3 12 3 12"></path>
          <path d="M3 12h.01"></path>
          <path d="M21 12h.01"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed top-100 left-0 w-72 h-screen bg-white pt-8 shadow-lg border-r border-slate-200 flex flex-col z-10">
      <div className="flex-1 px-4">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`py-4 px-6 cursor-pointer transition-all duration-200 rounded-xl font-medium flex items-center gap-4 mb-2 relative ${
              activeSection === item.id
                ? "bg-gradient-to-r from-blue-50 to-blue-100 text-sky-500 font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-600"
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="opacity-70 transition-opacity duration-200">
              {item.icon}
            </span>
            <span className="text-sm leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      <div
        className="border-t border-slate-200 mx-4 mt-6 rounded-xl cursor-pointer transition-all duration-200 text-slate-500 hover:bg-slate-50 hover:text-slate-600 py-4 px-6 font-medium flex items-center gap-3"
        onClick={onBackToProducts}
      >
        <span className="text-base">←</span>
        <span>Volver a productos</span>
      </div>
    </aside>
  );
};

export default CarritosSidebar;
