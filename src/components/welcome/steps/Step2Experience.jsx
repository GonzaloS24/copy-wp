import OptionButton from "../components/OptionButton";
import NavigationButtons from "../components/NavigationButtons";
import { WIZARD_OPTIONS } from "../data/wizardOptions";

const Step2Experience = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const options = WIZARD_OPTIONS.experience;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
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
