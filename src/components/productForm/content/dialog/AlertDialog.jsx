import { useRef, useEffect } from "react";

export const AlertDialog = ({
  title,
  content,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCancel = true,
}) => {
  const modalRef = useRef(null);

  // useEffect para manejar el cierre automático
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md font-sans relative mx-4"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-slate-700 pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-3xl cursor-pointer text-slate-500 hover:text-slate-700 w-8 h-8 flex items-center justify-center flex-shrink-0"
          >
            ×
          </button>
        </div>

        <div className="mb-8">
          <div className="text-slate-600 text-base leading-relaxed">
            {content}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-slate-200 bg-white text-slate-700 rounded-xl font-semibold text-base cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none rounded-xl font-semibold text-base cursor-pointer transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
