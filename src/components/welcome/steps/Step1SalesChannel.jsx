import { WIZARD_OPTIONS } from "../data/wizardOptions";
import NavigationButtons from "../components/NavigationButtons";

const Step1SalesChannel = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const options = WIZARD_OPTIONS.salesChannel;

  return (
    <div className="text-center max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        ¿Por dónde estás vendiendo actualmente?
      </h2>
      <p className="text-lg text-slate-600 mb-10">
        Esta información nos ayudará a adaptar los asistentes a tu canal
        principal de ventas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 p-[3px]"
                    : "bg-slate-200 p-[2px] group-hover:bg-sky-300 group-hover:p-[3px]"
                }`}
              >
                <div className="bg-white rounded-[calc(1rem-3px)] h-full w-full">
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

      <NavigationButtons
        currentStep={1}
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
        showPrevious={false}
      />
    </div>
  );
};

export default Step1SalesChannel;
