import { useState } from "react";

const Step6Token = ({
  token,
  onTokenChange,
  onSave,
  onPrevious,
  canProceed,
  isValidating = false,
  validationError = null,
  saveError = null,
  onRetry = null,
}) => {
  const [localError, setLocalError] = useState("");

  const handleTokenChange = (e) => {
    const value = e.target.value;
    onTokenChange(value);
    setLocalError("");
  };

  const handleTokenBlur = () => {
    if (token && token.length < 32) {
      setLocalError("El token debe tener al menos 32 caracteres");
    } else if (token && !/^[A-Za-z0-9]+$/.test(token)) {
      setLocalError("El token solo puede contener letras y números");
    } else {
      setLocalError("");
    }
  };

  const displayError = localError || validationError || saveError;

  return (
    <div className="max-w-[600px] w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <circle cx="12" cy="16" r="1"></circle>
            <path d="m7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-3 sm:mb-4 tracking-tight">
        Token de autenticación
      </h2>
      <p className="text-sm sm:text-base text-slate-600 mb-8 sm:mb-10 leading-relaxed">
        Para completar la configuración, necesitamos verificar tu token de
        acceso. Al continuar se guardarán todas tus respuestas.
      </p>

      <div className="space-y-6 mb-10 sm:mb-12 text-left">
        <div>
          <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-3">
            Token de acceso
          </label>
          <input
            type="password"
            value={token || ""}
            onChange={handleTokenChange}
            onBlur={handleTokenBlur}
            disabled={isValidating}
            className={`w-full px-4 py-4 border-2 rounded-xl text-sm sm:text-base transition-all duration-200 font-mono ${
              displayError
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-slate-200 focus:border-sky-500 bg-white"
            } focus:outline-none focus:ring-4 focus:ring-sky-500/10 disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Ingresa tu token de acceso aquí"
            autoComplete="current-password"
          />
          {displayError && (
            <p className="text-red-500 text-xs sm:text-sm mt-2 text-left">
              {displayError}
            </p>
          )}
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed text-left">
            Contacta al administrador si no tienes un token válido.
          </p>
        </div>
      </div>

      {/* Estado de validación */}
      {isValidating && (
        <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-sky-500 border-t-transparent"></div>
            <div className="text-center">
              <p className="text-sky-700 font-semibold text-sm">
                Validando token y guardando información...
              </p>
              <p className="text-sky-600 text-xs mt-1">
                Este proceso puede tomar unos segundos
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error de validación */}
      {validationError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-red-700 font-semibold text-sm mb-1">
                {saveError
                  ? "Error al guardar información"
                  : "Error de validación"}
              </p>
              <p className="text-red-600 text-xs mb-3">{displayError}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  disabled={isValidating}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm font-medium transition-colors duration-200 hover:shadow-md"
                >
                  {isValidating ? "Reintentando..." : "Reintentar"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación personalizados */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onPrevious}
          disabled={isValidating}
          className="text-slate-500 hover:text-slate-700 font-medium underline transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>

        <button
          onClick={onSave}
          disabled={!canProceed || isValidating}
          className={`
            px-8 py-3 rounded-lg font-medium transition-all duration-200 min-w-[200px]
            ${
              canProceed && !isValidating
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {isValidating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Guardando...
            </div>
          ) : (
            "Guardar información"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step6Token;
