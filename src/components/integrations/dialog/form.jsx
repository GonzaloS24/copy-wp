import { CopyTextDialog } from "./CopyTextDialog";

export const DialogForm = ({
  fields,
  formData,
  handleClose,
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  const handleOpenLink = (href) => {
    window.open(href);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            ) : field.type === "select" ? (
              <select
                className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData[field.name] || ""}
                required={field.required}
                disabled={isLoading}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            ) : field.type === "copyText" ? (
              <CopyTextDialog field={field} getText={field.getTextFunction} />
            ) : field.type === "tutorialLink" ? (
              <div className="border-t border-slate-200 text-center">
                <span
                  onClick={() => handleOpenLink(field.href)}
                  className="text-sky-500 text-sm font-medium transition-colors duration-200 hover:text-sky-600 inline-flex items-center gap-2 cursor-pointer bg-none border-none"
                >
                  {field.text}
                </span>
              </div>
            ) : field.type === "tutorialVideo" ? (
              <div className="border-t border-slate-200 text-center">
                <span
                  onClick={() => handleOpenLink(field.href)}
                  className="text-sky-500 text-sm font-medium transition-colors duration-200 hover:text-sky-600 inline-flex items-center gap-2 cursor-pointer bg-none border-none"
                >
                  Ver video tutorial de integración
                </span>
              </div>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleClose}
          className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Conectando...
            </>
          ) : (
            "Conectar"
          )}
        </button>
      </div>
    </form>
  );
};
