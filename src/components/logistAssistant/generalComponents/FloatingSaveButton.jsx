import { useState } from "react";

export const FloatingSaveButton = ({
  onClick,
  emoji = "💾",
  label = "Guardar",
  isLoading = false,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
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
  );
};
