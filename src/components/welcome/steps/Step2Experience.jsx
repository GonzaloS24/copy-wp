import OptionButton from "../shared/OptionButton";
import NavigationButtons from "../shared/NavigationButtons";

const Step2Experience = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  onSkip,
  canProceed,
}) => {
  const options = [
    {
      value: "iniciando",
      title: "Estoy iniciando",
      description: "Estoy en mis primeros pasos o todavía no he vendido.",
      icon: "🐣",
    },
    {
      value: "menos-3-meses",
      title: "Menos de 3 meses",
      description: "Llevo poco tiempo, pero ya he tenido mis primeras ventas.",
      icon: "🚶‍♂️",
    },
    {
      value: "3-meses-1-año",
      title: "Entre 3 meses y 1 año",
      description: "Mi negocio ya está en marcha y quiero crecer más.",
      icon: "🏃",
    },
    {
      value: "mas-1-año",
      title: "Más de 1 año",
      description: "Tengo experiencia y busco escalar aún más.",
      icon: "🧗",
    },
  ];

  return (
    <div className="text-center max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
        ¿Cuánto tiempo llevas vendiendo?
      </h2>
      <p className="text-base md:text-lg text-slate-600 mb-6">
        Esto nos ayuda a recomendarte las funciones según tu nivel de
        experiencia.
      </p>

      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {options.map((option) => (
            <OptionButton
              key={option.value}
              value={option.value}
              selectedValue={selectedValue}
              onClick={onSelect}
              icon={option.icon}
              title={option.title}
              description={option.description}
              iconType="emoji"
            />
          ))}
        </div>

        <NavigationButtons
          currentStep={2}
          canProceed={canProceed}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </div>
    </div>
  );
};

export default Step2Experience;
