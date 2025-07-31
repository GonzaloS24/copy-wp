import OptionButton from "../shared/OptionButton";
import NavigationButtons from "../shared/NavigationButtons";

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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
        </svg>
      ),
      iconType: "svg",
    },
    {
      value: "online",
      title: "Landing o tienda online",
      description: "Mis clientes me compran desde una página web.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          <path d="M21 8V7l-3 2-3-2v1l3 2 3-2z" />
          <path d="M3 17h18v2H3z" />
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M12 1v6m0 10v6m11-7h-6m-10 0H1"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ),
      iconType: "svg",
    },
    {
      value: "no-vendiendo",
      title: "Aún no estoy vendiendo",
      description: "Todavía no he empezado a vender en internet.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
      iconType: "svg",
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
        {options.map((option) => (
          <OptionButton
            key={option.value}
            value={option.value}
            selectedValue={selectedValue}
            onClick={onSelect}
            icon={option.icon}
            title={option.title}
            description={option.description}
            iconType={option.iconType}
          />
        ))}
      </div>

      <NavigationButtons
        currentStep={1}
        canProceed={canProceed}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
  );
};

export default Step1SalesChannel;
