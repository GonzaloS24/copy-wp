const Step1SalesChannel = ({
  selectedValue,
  onSelect,
  onNext,
  onSkip,
  canProceed,
}) => {
  const options = [
    {
      value: "whatsapp",
      title: "WhatsApp",
      description: "Recibo pedidos directamente por WhatsApp.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
        </svg>
      ),
    },
    {
      value: "online",
      title: "Landing o tienda online",
      description: "Mis clientes me compran desde una página web.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      value: "no-vendiendo",
      title: "Aún no estoy vendiendo",
      description: "Todavía no he empezado a vender en internet.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="text-center max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        ¿Por dónde estás vendiendo actualmente?
      </h2>
      <p className="text-lg text-slate-600 mb-10">
        Esta información nos ayudará a adaptar los asistentes a tu canal
        principal de ventas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`bg-white rounded-2xl p-0 cursor-pointer transition-all duration-300 text-left shadow-sm hover:shadow-lg min-h-[320px] group overflow-hidden relative ${
                isSelected
                  ? "transform -translate-y-1 shadow-lg shadow-sky-200"
                  : "hover:border-sky-300 hover:-translate-y-1"
              }`}
            >
              {/* Border animado para selección */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 p-[3px]"
                    : "bg-slate-200 p-[2px] group-hover:bg-sky-300 group-hover:p-[3px]"
                }`}
              >
                <div className="bg-white rounded-[calc(1rem-3px)] h-full w-full">
                  {/* Contenedor del icono */}
                  <div
                    className={`rounded-t-[calc(1rem-3px)] flex items-center justify-center min-h-[160px] transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                        : "bg-gradient-to-br from-sky-500 to-sky-600 group-hover:from-sky-600 group-hover:to-sky-700"
                    }`}
                  >
                    <div
                      className={`text-white transition-transform duration-300 ${
                        isSelected ? "scale-110" : "group-hover:scale-105"
                      }`}
                    >
                      {option.icon}
                    </div>
                  </div>

                  {/* Contenido del texto */}
                  <div className="p-6 flex flex-col gap-3 justify-center flex-1 min-h-[160px]">
                    <span
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        isSelected ? "text-emerald-700" : "text-slate-800"
                      }`}
                    >
                      {option.title}
                    </span>
                    <span className="text-sm text-slate-600 leading-relaxed">
                      {option.description}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-8">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-lg font-medium transition-all duration-200
            ${
              canProceed
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step1SalesChannel;
