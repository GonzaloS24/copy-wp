import OptionButton from "../shared/OptionButton";
import NavigationButtons from "../shared/NavigationButtons";

const Step3Volume = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  onSkip,
  canProceed,
}) => {
  const options = [
    {
      value: "0-10",
      title: "De 0 a 10 pedidos",
      description: "Estoy empezando o tengo un volumen bajo.",
      icon: "📦",
    },
    {
      value: "10-50",
      title: "De 10 a 50 pedidos",
      description: "Recibo varios pedidos al día.",
      icon: "📈",
    },
    {
      value: "50-100",
      title: "De 50 a 100 pedidos",
      description: "Tengo buen volumen diario.",
      icon: "🚚",
    },
    {
      value: "100+",
      title: "Más de 100 pedidos",
      description: "Mi operación es alta y constante.",
      icon: "🏭",
    },
  ];

  return (
    <div className="text-center max-w-4xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        ¿Cuántos pedidos diarios manejas actualmente?
      </h2>
      <p className="text-lg text-slate-600 mb-10">
        Esto nos ayudará a adaptar las herramientas a tu nivel de operación.
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
        currentStep={3}
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
        onSkip={onSkip}
      />
    </div>
  );
};

export default Step3Volume;
