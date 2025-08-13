import { useState } from "react";
import { installTemplate } from "../services/asistentService";
import { getCurrentWorkspace } from "../utils/workspace";
import { showSuccessToast, showErrorToast } from "../utils/toastNotifications";

const AssistantInstaller = ({
  template_ns,
  title,
  benefits,
  videoDescription,
  onInstall,
}) => {
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);

    try {
      // Obtener el workspaceId
      const workspaceId = getCurrentWorkspace();

      if (!workspaceId) {
        throw new Error("No se pudo obtener el ID del workspace");
      }

      console.log(
        `[AssistantInstaller] Instalando asistente ${template_ns} en workspace ${workspaceId}`
      );

      const result = await installTemplate(workspaceId, {
        template_ns: template_ns,
      });

      console.log(`[AssistantInstaller] Instalación exitosa:`, result);

      // Mostrar toast de éxito
      showSuccessToast("¡Asistente instalado exitosamente!");

      // Ejecutar callback de instalación completada
      onInstall();
    } catch (error) {
      console.error(`[AssistantInstaller] Error en instalación:`, error);

      // Mostrar toast de error
      showErrorToast(`Error al instalar: ${error.message}`);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-6xl w-full border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Sección del Video */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h2 className="text-3xl lg:text-2xl font-bold text-sky-500 leading-tight tracking-tight mb-2 text-left">
              {title}
            </h2>

            <div className="relative w-full h-80 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
              <div className="text-white text-lg font-semibold text-center p-8">
                🎥 Video explicativo del asistente
                <br />
                <small className="opacity-80">{videoDescription}</small>
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
                    ✓
                  </div>
                  <div className="text-sm font-medium text-slate-700 leading-tight">
                    {benefit}
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

export default AssistantInstaller;
