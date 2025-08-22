import { useState } from "react";
import { workspacePrepare } from "../../../services/workspace";
import { initializeWorkspace } from "../../../utils/workspace/workspaceUtils";
import chatea from "../../../assets/surveyIcons/chatea-con-fondo.png";

const Step0Welcome = ({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const prepare = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let workspaceId = await initializeWorkspace();
      await workspacePrepare(workspaceId);
      onNext();
    } catch (error) {
      console.error("Error en workspacePrepare:", error);
      setError(
        "Hubo un problema al preparar tu espacio de trabajo. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto px-4 sm:px-8 py-4 sm:py-0">
      <div className="mb-6 sm:mb-8">
        <div className="w-32 h-32 sm:w-44 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center">
          <img src={chatea} alt="" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold text-sky-500 mb-4 sm:mb-6 tracking-tight leading-tight">
        ¡Bienvenido a Chatea PRO!
      </h1>

      <p className="text-base sm:text-xl text-slate-600 mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
        Queremos conocerte mejor para personalizar tu experiencia y mostrarte
        las herramientas más relevantes para tu negocio.
      </p>

      {/* Mensaje de error si existe */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={prepare}
        disabled={isLoading}
        className={`bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl w-full sm:w-auto ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Preparando...
          </span>
        ) : (
          "Personalizar mi experiencia"
        )}
      </button>
    </div>
  );
};

export default Step0Welcome;
