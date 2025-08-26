import { useEffect, useState } from "react";
import {
  getInstalledAssistants,
  updateAssistantsWithInstallationStatus,
} from "../services/asistentService";
import { baseAsistentes } from "../utils/asistentUtils";
import { ASSISTANT_CONFIG_ROUTES } from "../utils/constants/assistants.jsx";
import { useNavigate } from "react-router-dom";

export const Asistent = () => {
  const navigate = useNavigate();
  const [asistentes, setAsistentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAsistentes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("[Asistent] Iniciando carga de asistentes...");

        // Obtener estado de instalación
        const installedData = await getInstalledAssistants();
        console.log(
          "[Asistent] Datos de instalación obtenidos:",
          installedData
        );

        // Actualizar asistentes base con estado real de instalación
        const updatedAsistentes = updateAssistantsWithInstallationStatus(
          baseAsistentes,
          installedData
        );

        setAsistentes(updatedAsistentes);
      } catch (err) {
        console.error("[Asistent] Error al cargar asistentes:", err);
        setError(err.message);
        setAsistentes(baseAsistentes);
      } finally {
        setIsLoading(false);
      }
    };

    loadAsistentes();
  }, []);

  const handleButtonClick = (action, asistente) => {
    console.log(`[Asistent] Acción ${action} para asistente:`, asistente.title);

    // Bloquear acceso al asistente de llamadas IA
    if (action === "coming-soon" || asistente.status === "proximamente") {
      console.log(`[Asistent] Asistente ${asistente.title} no disponible aún`);
      return; // No hacer nada para asistentes que están "próximamente"
    }

    if (action === "configure") {
      // Si está instalado, ir directamente a la configuración
      const route = ASSISTANT_CONFIG_ROUTES[asistente.template_ns];
      if (route) {
        console.log(`[Asistent] Redirigiendo a configuración: ${route}`);
        navigate(route);
      } else {
        console.warn(
          `[Asistent] Ruta no encontrada para template: ${asistente.template_ns}`
        );
        // Fallback a la ruta de configuración genérica
        navigate(`/configurar/${asistente.template_ns}`);
      }
    } else if (action === "install") {
      // Si no está instalado, ir al instalador
      console.log(
        `[Asistent] Redirigiendo a instalador: /configurar/${asistente.template_ns}`
      );
      navigate(`/configurar/${asistente.template_ns}`);
    }
  };

  // Función para recargar el estado de los asistentes
  const reloadAssistants = async () => {
    console.log("[Asistent] Recargando estado de asistentes...");
    try {
      const installedData = await getInstalledAssistants();
      const updatedAsistentes = updateAssistantsWithInstallationStatus(
        baseAsistentes,
        installedData
      );
      setAsistentes(updatedAsistentes);
    } catch (err) {
      console.error("[Asistent] Error al recargar asistentes:", err);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "no-instalado":
        return "bg-gray-100 text-gray-700";
      case "instalado":
        return "bg-green-100 text-green-600";
      case "proximamente":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDotClasses = (status) => {
    switch (status) {
      case "no-instalado":
        return "bg-gray-500";
      case "instalado":
        return "bg-green-500";
      case "proximamente":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCardClasses = (status) => {
    const baseClasses =
      "bg-white rounded-3xl h-96 shadow-lg border transition-all duration-300 ease-in-out cursor-pointer relative flex flex-col overflow-hidden";

    switch (status) {
      case "instalado":
        return `${baseClasses} border-2 border-sky-500 shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-1.5 hover:border-sky-600`;
      case "proximamente":
        return `${baseClasses} bg-slate-50 border-slate-300 shadow-slate-200 hover:shadow-slate-300 hover:-translate-y-1 hover:border-slate-400`;
      default:
        return `${baseClasses} border-slate-200 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-100 hover:border-sky-500`;
    }
  };

  const getHeaderClasses = (status) => {
    const baseClasses =
      "h-2/5 border-b border-slate-200 relative flex items-center justify-center p-4";
    return status === "proximamente"
      ? `${baseClasses} bg-slate-50`
      : `${baseClasses} bg-gradient-to-br from-slate-50 to-slate-100`;
  };

  const getBodyClasses = (status) => {
    const baseClasses = "h-3/5 p-6 flex flex-col justify-between";
    switch (status) {
      case "instalado":
        return `${baseClasses} bg-gradient-to-br from-sky-500 to-sky-600`;
      case "proximamente":
        return `${baseClasses} bg-slate-50`;
      default:
        return `${baseClasses} bg-white`;
    }
  };

  const getIconClasses = (status) => {
    const baseClasses =
      "w-24 h-24 rounded-2xl flex items-center justify-center border transition-all duration-300 ease-in-out text-2xl";

    switch (status) {
      case "proximamente":
        return `${baseClasses} bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 border-slate-300`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-50 to-blue-100 text-sky-500 border-blue-200`;
    }
  };

  const getTitleClasses = (status) => {
    const baseClasses = "text-xl font-bold mb-3 leading-tight text-center";
    switch (status) {
      case "instalado":
        return `${baseClasses} text-white`;
      case "proximamente":
        return `${baseClasses} text-gray-700`;
      default:
        return `${baseClasses} text-slate-700`;
    }
  };

  const getDescriptionClasses = (status) => {
    const baseClasses = "text-sm leading-relaxed mb-4 text-center flex-1";
    switch (status) {
      case "instalado":
        return `${baseClasses} text-white/90`;
      case "proximamente":
        return `${baseClasses} text-gray-600`;
      default:
        return `${baseClasses} text-slate-600`;
    }
  };

  const getButtonClasses = (status, action) => {
    const baseClasses =
      "border-none rounded-xl px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-lg self-center";

    switch (status) {
      case "instalado":
        return `${baseClasses} bg-white text-sky-500 border-2 border-sky-500 shadow-sky-400`;
      case "proximamente":
        return `${baseClasses} bg-gray-200 text-gray-700 px-8 py-3 rounded-full border border-gray-300 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sky-200`;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "no-instalado":
        return "No Instalado";
      case "instalado":
        return "Instalado";
      case "proximamente":
        return "Próximamente";
      default:
        return "No Instalado";
    }
  };

  if (isLoading) {
    return (
      <section className="w-full py-16 px-8 bg-slate-50 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-sky-500 tracking-tight mb-12">
            Asistentes de Chatea PRO
          </h2>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mb-4"></div>
            <p className="text-gray-600">Cargando tus asistentes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 px-8 bg-slate-50 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-sky-500 tracking-tight mb-12">
            Asistentes de Chatea PRO
          </h2>

          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto mb-6">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline ml-1">{error}</span>
            </div>
            <p className="mt-2 text-sm text-red-600">
              No pudimos verificar qué asistentes tienes instalados.
              {error.includes("token") &&
                " Por favor, verifica que hayas iniciado sesión correctamente."}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-8 bg-slate-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-sky-500 tracking-tight mb-12">
          Asistentes de Chatea PRO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {asistentes.map((asistente) => (
            <div
              key={asistente.id}
              className={getCardClasses(asistente.status)}
            >
              <div className={getHeaderClasses(asistente.status)}>
                <div
                  className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 z-10 ${getStatusClasses(
                    asistente.status
                  )}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getStatusDotClasses(
                      asistente.status
                    )}`}
                  ></span>
                  {getStatusText(asistente.status)}
                </div>

                <div className="flex items-center justify-center">
                  <div className={getIconClasses(asistente.status)}>
                    {asistente.icon}
                  </div>
                </div>
              </div>

              <div className={getBodyClasses(asistente.status)}>
                <h3 className={getTitleClasses(asistente.status)}>
                  {asistente.title}
                </h3>
                <p className={getDescriptionClasses(asistente.status)}>
                  {asistente.description}
                </p>
                <button
                  className={getButtonClasses(
                    asistente.status,
                    asistente.buttonAction
                  )}
                  onClick={() =>
                    handleButtonClick(asistente.buttonAction, asistente)
                  }
                  disabled={asistente.status === "proximamente"}
                >
                  {asistente.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
