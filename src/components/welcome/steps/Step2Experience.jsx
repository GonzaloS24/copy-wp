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
    <div className="text-center max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        ¿Cuánto tiempo llevas vendiendo?
      </h2>
      <p className="text-lg text-slate-600 mb-10">
        Esto nos ayuda a recomendarte las funciones según tu nivel de
        experiencia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
        onSkip={onSkip}
      />
    </div>
  );
};

export default Step2Experience;
