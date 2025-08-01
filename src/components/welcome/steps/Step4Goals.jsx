import OptionButton from "../shared/OptionButton";
import NavigationButtons from "../shared/NavigationButtons";

const Step4Goals = ({
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const options = [
    {
      value: "aumentar-ventas",
      title: "Aumentar ventas",
      description: "Quiero vender más o recuperar carritos.",
      icon: "💰",
    },
    {
      value: "atencion-cliente",
      title: "Mejorar atención al cliente",
      description: "Quiero responder más rápido y mejor.",
      icon: "🎯",
    },
    {
      value: "automatizar",
      title: "Automatizar procesos",
      description: "Quiero ahorrar tiempo automatizando tareas.",
      icon: "🤖",
    },
    {
      value: "todo",
      title: "Todo lo anterior",
      description: "Quiero aprovechar todo el potencial de la plataforma.",
      icon: "🧩",
    },
  ];

  return (
    <div className="max-w-[600px] w-full text-center mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-700 mb-4 tracking-tight">
        ¿Qué esperas lograr con Chatea PRO?
      </h2>
      <p className="text-base text-slate-600 mb-10 leading-relaxed">
        Selecciona lo que más se ajusta a tus metas actuales.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-12">
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
        currentStep={4}
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
};

export default Step4Goals;
