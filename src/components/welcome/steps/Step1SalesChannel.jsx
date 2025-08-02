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
    <div className="text-center max-w-4xl mt-5 mx-auto px-3 sm:px-6 lg:px-8 pb-20 sm:pb-8">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 sm:mb-4">
        ¿Por dónde estás vendiendo actualmente?
      </h2>
      <p className="text-sm sm:text-lg text-slate-600 mb-4 sm:mb-8 lg:mb-10 px-2 sm:px-0">
        Esta información nos ayudará a adaptar los asistentes a tu canal
        principal de ventas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`bg-white rounded-lg sm:rounded-2xl p-0 cursor-pointer transition-all duration-300 text-left shadow-sm hover:shadow-lg min-h-[200px] sm:min-h-[320px] group overflow-hidden relative ${
                isSelected
                  ? "transform -translate-y-1 shadow-lg shadow-sky-200"
                  : "hover:border-sky-300 hover:-translate-y-1"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-lg sm:rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 p-[3px]"
                    : "bg-slate-200 p-[2px] group-hover:bg-sky-500 group-hover:p-[3px]"
                }`}
              >
                <div className="bg-white rounded-[calc(0.5rem-3px)] sm:rounded-[calc(1rem-3px)] h-full w-full">
                  <div
                    className={`flex items-center justify-center h-[60px] sm:h-[100px] max-w-[60px] sm:max-w-[100px] mx-auto mb-3 sm:mb-5 transition-all duration-300 rounded-b-lg sm:rounded-b-xl ${
                      isSelected
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                        : "bg-gradient-to-br from-sky-500 to-sky-600 group-hover:from-sky-600 group-hover:to-sky-700"
                    }`}
                  >
                    <div
                      className={`text-white transition-transform duration-300 text-xl sm:text-3xl ${
                        isSelected ? "scale-110" : "group-hover:scale-105"
                      }`}
                    >
                      {option.icon}
                    </div>
                  </div>

                  {/* Contenido del texto */}
                  <div className="p-3 sm:p-6 flex flex-col text-center gap-1 sm:gap-3 justify-center flex-1 min-h-[100px] sm:min-h-[160px]">
                    <span
                      className={`font-semibold text-sm sm:text-lg transition-colors duration-300 ${
                        isSelected ? "text-emerald-700" : "text-slate-800"
                      }`}
                    >
                      {option.title}
                    </span>
                    <span className="text-xs sm:text-base lg:text-lg text-slate-600 leading-tight sm:leading-relaxed">
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
