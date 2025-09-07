import { useEffect, useState } from "react";
import { LuCircleX } from "react-icons/lu";
import { installAssistantErrorsData } from "../../utils/installAssistantErrorsData";

export const InstallAssistantErrorModal = ({ onClose, data }) => {
  const iconSize = 128;

  const [modalData, setModalData] = useState({
    tittle: "Error al instalar el asistente",
    message:
      "Ocurrió un error inesperado al intentar instalar el asistente, por favor intente de nuevo más tarde" + 
      " Si el problema persiste contacta a soporte.",
  });

  const handleOpenLink = (href) => window.open(href);

  useEffect(() => {
    if (!data.cause) return;

    if (!installAssistantErrorsData[data.templateNs]) return;

    setModalData(
      installAssistantErrorsData[data.templateNs][data.cause] ?? {
        tittle: "Error al instalar el asistente",
        message:
          "Ocurrió un error inesperado al intentar instalar el asistente, por favor intente de nuevo más tarde" + 
          " Si el problema persiste contacta a soporte.",
      }
    );
  }, [data]);

  return (
    <div className="text-center">
      {/* Ícono de resultado */}
      <div className="mb-4">
        <LuCircleX size={iconSize} className="text-red-500 mx-auto" />
      </div>

      {/* Texto principal */}
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-red-700">{modalData.tittle}</span>
      </h2>

      {/* Mensaje descriptivo */}
      <p className="text-gray-600 mb-6">{modalData.message}</p>

      {/* Tutorial para solucionar el error */}
      {modalData.tutorial && (
        <div className="text-center mb-10">
          <span
            onClick={() => handleOpenLink(modalData.tutorial.href)}
            className="text-sky-500 text-sm font-medium transition-colors duration-200 hover:text-sky-600 inline-flex items-center gap-2 cursor-pointer bg-none border-none"
          >
            {modalData.tutorial.message}
          </span>
        </div>
      )}

      {/* Botón de acción */}
      <button
        onClick={onClose}
        className={`px-8 py-2 rounded-lg text-lg transition-colors bg-red-500 hover:bg-red-600 text-white`}
      >
        Aceptar
      </button>
    </div>
  );
};
