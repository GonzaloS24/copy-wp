import NavigationButtons from "../components/NavigationButtons";
import OptionButton from "../components/OptionButton";
import { WIZARD_OPTIONS } from "../data/wizardOptions";

const Step3Volume = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const options = WIZARD_OPTIONS.volume;

  return (
    <div className="max-w-[600px] w-full text-center mx-auto px-8">
      <h2 className="text-2xl font-bold text-slate-700 mb-4 tracking-tight">
        ¿Cuántos pedidos diarios manejas actualmente?
      </h2>
      <p className="text-base text-slate-600 mb-10 leading-relaxed">
        Esto nos ayudará a adaptar las herramientas a tu nivel de operación.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-5">
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
        currentStep={3}
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
};

export default Step3Volume;
