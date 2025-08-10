export const DialogGuide = ({ steps, video, handleClose }) => {
  const openLink = (href) => {
    window.open(href);
  };

  return (
    <div className="flex flex-col gap-6">
      {steps.map((step, index) => (
        <div
          key={index + 1}
          className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            {index + 1}
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-slate-700 mb-3 leading-tight">
              {step.title}
            </h4>
            {step.description && (
              <p className="text-sm text-slate-500 mb-2 leading-relaxed">
                {step.description}
              </p>
            )}
            {step.button && (
              <button
                onClick={() => openLink(step.button.href)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none rounded-lg py-2.5 px-5 text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-green-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/35 mt-2"
              >
                {step.button.text}
              </button>
            )}
          </div>
        </div>
      ))}

      {video && (
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <a
            href={video.href}
            className="text-sky-500 text-sm font-medium transition-colors duration-200 hover:text-sky-600 inline-flex items-center gap-2 cursor-pointer bg-none border-none"
          >
            📹 Ver videotutorial de integración
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleClose}
          className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
