import { useState } from "react";
import { getWorkspaceIdFromUrl } from "../../../utils/workspace";
import { workspacePrepare } from "../../../services/workspace";

const Step0Welcome = ({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const prepare = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let workspaceId = getWorkspaceIdFromUrl();
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
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center shadow-xl">
          <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            fill="none"
            className="sm:w-20 sm:h-20"
          >
            <path
              d="M25 50C25 38.95 33.95 30 45 30C48.5 30 51.8 31 54.6 32.7C58.4 25.8 65.8 21 74 21C85.05 21 94 29.95 94 41C94 42.1 93.9 43.2 93.7 44.2C96.6 46.8 98.5 50.7 98.5 55C98.5 62.5 92.5 68.5 85 68.5H30C21.7 68.5 15 61.8 15 53.5C15 46.2 20.3 40.1 27.2 39.2C25.8 42.5 25 46 25 50Z"
              fill="white"
            />
            <circle cx="40" cy="45" r="4" fill="#0ea5e9" />
            <circle cx="60" cy="45" r="4" fill="#0ea5e9" />
            <path
              d="M38 55C42 60 46 62 50 62C54 62 58 60 62 55"
              stroke="#0ea5e9"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
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
