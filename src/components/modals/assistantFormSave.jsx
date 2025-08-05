import { LuCircleX, LuCircleCheckBig } from "react-icons/lu";

export const AssistantFormModal = ({ onClose, type }) => {
  const iconSize = 128;

  return (
    <div className="text-center">
      {/* Ícono de resultado */}
      <div className="mb-4">
        {type === "success" ? (
          <LuCircleCheckBig
            size={iconSize}
            className="text-green-500 mx-auto"
          />
        ) : (
          <LuCircleX size={iconSize} className="text-red-500 mx-auto" />
        )}
      </div>

      {/* Texto principal */}
      <h2 className="text-2xl font-bold mb-4">
        {type === "success" ? (
          <span className="text-green-700">¡Información Guardada!</span>
        ) : (
          <span className="text-red-700">Error al Guardar</span>
        )}
      </h2>

      {/* Mensaje descriptivo */}
      <p className="text-gray-600 mb-10">
        {type === "success"
          ? "Los datos del usuario se han guardado correctamente en el sistema."
          : "Hubo un problema al intentar guardar la información. Por favor, inténtalo de nuevo."}
      </p>

      {/* Botón de acción */}
      <button
        onClick={onClose}
        className={`px-8 py-2 rounded-lg text-lg transition-colors ${
          type === "success"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        Aceptar
      </button>
    </div>
  );
};
