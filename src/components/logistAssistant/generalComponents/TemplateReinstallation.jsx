import { useState } from "react";
import { installTemplate } from "../../../services/template/installTemplate";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../utils/toastNotifications";

export const TemplateReinstallation = ({ templateNs }) => {
  const [showReinstallModal, setShowReinstallModal] = useState(false);

  const handleReinstallTemplates = () => {
    installTemplate(templateNs)
      .then((response) => {
        if (response.status === "ok")
          return showSuccessToast("Reinstalación de plantillas exitosa.");
        showErrorToast(
          "Ocurrió un error al intentar reinstalar las plantillas."
        );
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(
          "Ocurrió un error al intentar reinstalar las plantillas."
        );
      });

    setShowReinstallModal(false);
  };

  const closeReinstallModal = () => {
    setShowReinstallModal(false);
  };

  const openReinstallModal = () => {
    setShowReinstallModal(true);
  };

  return (
    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="bg-slate-100 border border-gray-300 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-500 mb-2">
          Reinstalación de plantillas
        </h3>
        <p className="text-sm font-normal text-slate-400 italic mb-4">
          (solo en casos especiales)
        </p>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          Usa esta opción si las plantillas de mensaje no se registraron durante
          la instalación o si cambiaste tu número de WhatsApp. En condiciones
          normales, no debes tocar este botón.
        </p>
        <button
          className="bg-slate-500 text-white border-none rounded-lg px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 shadow-md shadow-slate-500/20 hover:bg-slate-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-500/30"
          onClick={openReinstallModal}
        >
          Reinstalar plantillas
        </button>
      </div>

      {/* Modal de advertencia para reinstalación */}
      {showReinstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md sm:max-w-lg md:max-w-2xl w-full shadow-2xl transform transition-transform duration-300 scale-100">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4 text-center">
              Advertencia
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-left">
              Esta opción solo debe utilizarse si el número que tienes enlazado
              a tu bot, no tiene instaladas las plantillas. Si ya las tiene y
              procedes, se generarán errores en tu espacio de trabajo. Solo
              debes utilizar esta opción si las plantillas no se te registraron
              o si tuviste que cambiar de numero y tu nuevo numero no tiene las
              plantillas de mensaje
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                className="py-3 sm:py-4 px-4 sm:px-6 border-none rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-200 font-inherit bg-sky-500 text-white shadow-lg hover:bg-sky-600 hover:-translate-y-1 hover:shadow-xl"
                onClick={closeReinstallModal}
              >
                No es lo que necesito
              </button>
              <button
                className="py-3 sm:py-4 px-4 sm:px-6 border-none rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-200 font-inherit bg-red-600 text-white shadow-lg hover:bg-red-700 hover:-translate-y-1 hover:shadow-xl"
                onClick={handleReinstallTemplates}
              >
                Reinstalar plantilla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
