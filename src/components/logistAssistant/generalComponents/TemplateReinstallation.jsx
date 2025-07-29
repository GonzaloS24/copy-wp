export const TemplateReinstallation = () => {
  const handleReinstallTemplates = () => {
    alert("Función de reinstalación de plantillas");
  };

  return (
    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="bg-slate-100 border border-gray-300 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-500 mb-2">
          Reinstalación de plantillas
        </h3>
        <p className="text-sm font-normal text-slate-400 italic mb-4">
          (solo en casos especiales)
        </p>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          Usa esta opción si las plantillas de mensaje no se registraron durante
          la instalación o si cambiaste tu número de WhatsApp. En condiciones
          normales, no debes tocar este botón.
        </p>
        <button
          className="bg-slate-500 text-white border-none rounded-lg px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 shadow-md shadow-slate-500/20 hover:bg-slate-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-500/30"
          onClick={handleReinstallTemplates}
        >
          Reinstalar plantillas
        </button>
      </div>
    </div>
  );
};
