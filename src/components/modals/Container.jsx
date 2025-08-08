export const ModalContainer = ({ children, onClose }) => {
  const handleOutClick = ({ target }) => {
    if (target?.id === "modalContainer") {
      onClose();
    }
  };

  return (
    <div
      id="modalContainer"
      className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOutClick}
    >
      <div
        className="
          w-[90vw] max-w-2xl h-auto max-h-[80vh]
          bg-white rounded-2xl shadow-2xl
          flex flex-col"
      >
        <div className="flex justify-end">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={onClose}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-6 pb-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
