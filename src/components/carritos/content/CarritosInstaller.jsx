import { useState } from "react";

const CarritosInstaller = ({ onInstall }) => {
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);

    // Simular instalación
    setTimeout(() => {
      setIsInstalling(false);
      onInstall();
    }, 2000);
  };

  const benefits = [
    {
      title: "Recupera hasta un 20% de carritos abandonados",
      emoji: "✓",
    },
    {
      title: "Instalación rápida en segundos",
      emoji: "⚡",
    },
    {
      title: "Mensajes automáticos y personalizados",
      emoji: "💬",
    },
    {
      title: "Aumenta tus ventas sin esfuerzo adicional",
      emoji: "📈",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-6xl w-full border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Sección del Video */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h2 className="text-3xl lg:text-2xl font-bold text-sky-500 leading-tight tracking-tight mb-2 text-left">
              Descubre cómo este asistente puede ayudarte a recuperar ventas
              automáticamente
            </h2>

            <div className="relative w-full h-80 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
              <div className="text-white text-lg font-semibold text-center p-8">
                🎥 Video explicativo del asistente
                <br />
                <small className="opacity-80">
                  Próximamente: Video de YouTube embebido
                </small>
              </div>
            </div>
          </div>

          {/* Sección de Beneficios */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-fit">
            <h3 className="text-2xl font-bold text-slate-700 leading-tight mb-2">
              Beneficios del Asistente
            </h3>

            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-sky-500 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {benefit.emoji}
                  </div>
                  <div className="text-sm font-medium text-slate-700 leading-tight">
                    {benefit.title}
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white border-none rounded-2xl py-5 px-8 text-lg font-bold cursor-pointer transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mt-4 font-inherit ${
                isInstalling
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-2xl"
              }`}
              onClick={handleInstall}
              disabled={isInstalling}
            >
              {isInstalling ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                  <span>Instalando asistente...</span>
                </>
              ) : (
                <>
                  <span>👉 Instalar asistente</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritosInstaller;
