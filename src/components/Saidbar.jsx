import { FiHome, FiMessageSquare, FiSettings, FiX, FiUsers, FiZap, FiBookOpen, FiHelpCircle } from 'react-icons/fi';

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: FiUsers,
      title: "Asistentes",
      description: "Activa asistentes que venden, responden y automatizan por ti",
      href: "/"
    },
    {
      icon: FiZap,
      title: "Integraciones",
      description: "Conecta Chatea PRO con Shopify, Open IA, Google Sheets y más",
      href: "#"
    },
    {
      icon: FiBookOpen,
      title: "Academia",
      description: "Aprende a instalar y usarlos a nivel profesional",
      href: "#"
    },
    {
      icon: FiHelpCircle,
      title: "Asesorías",
      description: "Accede a sesiones grupales y privadas con nuestros expertos",
      href: "#"
    },

  ];

  return (
    <div className={`fixed inset-0 bg-black/50 z-[2000] transition-opacity duration-300 ease-in-out ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white w-96 h-full shadow-xl transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 pb-6 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-slate-700 leading-tight">
                Nombre Usuario
              </span>
              <span className="text-xs text-sky-500 font-medium mt-0.5">
                Plan Pro
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a 
                  key={index}
                  href={item.href} 
                  className="group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 text-slate-700 border border-transparent hover:bg-gradient-to-br hover:from-slate-50 hover:to-slate-100 hover:border-slate-200 hover:translate-x-1 hover:shadow-sm"
                >
                  <div className="text-xl w-6 h-6 flex items-center justify-center text-slate-500 transition-colors duration-200 group-hover:text-sky-500">
                    <IconComponent />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold mb-1 text-slate-700 group-hover:text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500 leading-snug group-hover:text-slate-600">
                      {item.description}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <button 
            onClick={onClose}
            className="bg-none border-none text-slate-500 p-4 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 rounded-lg w-full hover:text-sky-500 hover:bg-sky-500/5 active:translate-y-0.5"
          >
            <FiX className="text-sm opacity-80" />
            Cerrar menú
          </button>
        </div>
      </div>
    </div>
  );
};