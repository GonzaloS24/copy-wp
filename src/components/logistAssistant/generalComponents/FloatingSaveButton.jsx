import { useState } from "react";

export const FloatingSaveButton = ({
  onClick,
  emoji = "💾",
  label = "Guardar",
  isLoading = false,
  disabled = false,
  formData = null,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const validateStoreData = () => {
    if (!formData?.storeData) return { isValid: true, errors: [] };

    const errors = [];
    const storeData = formData.storeData;

    if (!storeData.storeCountry || storeData.storeCountry.trim() === "") {
      errors.push("Debe seleccionar el país donde trabaja su tienda");
    }

    if (!storeData.storeName || storeData.storeName.trim() === "") {
      errors.push("Debe ingresar el nombre de la tienda");
    }

    if (!storeData.storeLink || storeData.storeLink.trim() === "") {
      errors.push("Debe ingresar el enlace de la tienda");
    }

    if (!storeData.storeLocation || storeData.storeLocation.trim() === "") {
      errors.push("Debe ingresar la ubicación de la tienda");
    }

    if (!storeData.dataSource || storeData.dataSource.trim() === "") {
      errors.push("Debe seleccionar el origen de los datos del pedido");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleClick = () => {
    if (disabled || isLoading) return;

    const validation = validateStoreData();
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setShowValidationError(true);
      
      setTimeout(() => {
        setShowValidationError(false);
      }, 5000);
      
      return;
    }

    
    if (onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <>
      {/* Modal de error de validación */}
      {showValidationError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Campos Obligatorios
            </h3>
            
            <p className="text-gray-600 text-center mb-4">
              Por favor, complete los siguientes campos obligatorios:
            </p>
            
            <ul className="space-y-2 mb-6">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-600 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                  {error}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => setShowValidationError(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Botón guardar */}
      <button
        className={`
          fixed md:bottom-[4rem] md:left-[4rem]
          bg-gradient-to-br from-sky-500 to-sky-600
          text-white border-none rounded-xl
          md:px-6 md:py-4
          md:text-lg font-semibold cursor-pointer
          transition-all duration-300 ease-out
          font-inherit
          flex items-center justify-center gap-2
          z-[999] min-w-[120px]
          shadow-lg shadow-sky-500/30
          hover:shadow-xl hover:shadow-sky-500/40
          active:shadow-lg active:shadow-sky-500/30
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isPressed ? "transform translate-y-0" : "hover:-translate-y-0.5"}
          ${disabled || isLoading ? "pointer-events-none" : ""}
        `}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Guardando...
          </>
        ) : (
          `${emoji} ${label}`
        )}
      </button>
    </>
  );
};  