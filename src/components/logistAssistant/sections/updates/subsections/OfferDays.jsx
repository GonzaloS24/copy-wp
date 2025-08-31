import { ExampleBox } from "../../../generalComponents/ExampleBox";
import { ExplanationBox } from "../../../generalComponents/ExplanationBox";
import { InfoBox } from "../../../generalComponents/InfoBox";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";

export const OfferDays = ({ formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      offerDays: {
        ...prev.offerDays,
        [field]: value,
      },
    }));
  };

  const dayOptions = [
    { key: "1", value: "1 día hábil" },
    { key: "2", value: "2 días hábiles" },
    { key: "3", value: "3 días hábiles" },
    { key: "4", value: "4 días hábiles" },
    { key: "5", value: "5 días hábiles" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        📅 Días de ofrecimiento
      </h2>

      {/* Explicación introductoria */}
      <InfoBox>
        En esta sección, definirás el rango de días en los que la IA le indicará
        al cliente que puede recibir su producto. La IA sabe qué día se presenta
        la novedad y a partir de ahí, hará un análisis para contar en qué días
        se presentarán los próximos ofrecimientos teniendo en cuenta lo que se
        defina como día mínimo y día máximo.
      </InfoBox>

      {/* Texto de ejemplo */}
      <ExampleBox>
        <strong>Texto de ejemplo:</strong> Entendemos el inconveniente. La
        transportadora realizará un nuevo intento de entrega entre el 10 de
        julio y el 13 de julio
      </ExampleBox>

      {/* Día mínimo de ofrecimiento */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Día mínimo de ofrecimiento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Día mínimo
              </label>
              <TooltipIcon
                tooltipId="minDay"
                content="Indica el día mínimo en el que quieres que la IA le vuelva a ofrecer el pedido al cliente"
              />
            </div>
            <select
              className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              value={formData?.offerDays?.minDay ?? ""}
              onChange={(e) => handleInputChange("minDay", e.target.value)}
            >
              {dayOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="font-medium text-slate-700 text-sm block mb-2">
              Explicación
            </label>
            <ExplanationBox
              selectedValue={formData?.offerDays?.minDay ?? ""}
              type="min"
            />
          </div>
        </div>
      </div>

      {/* Día máximo de ofrecimiento */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Día máximo de ofrecimiento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Día máximo
              </label>
              <TooltipIcon
                tooltipId="maxDay"
                content="Indica el día máximo hasta el cual la IA puede ofrecer la entrega del pedido al cliente"
              />
            </div>
            <select
              className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              value={formData?.offerDays?.maxDay ?? ""}
              onChange={(e) => handleInputChange("maxDay", e.target.value)}
            >
              {dayOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="font-medium text-slate-700 text-sm block mb-2">
              Explicación
            </label>
            <ExplanationBox
              selectedValue={formData?.offerDays?.maxDay ?? ""}
              type="max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
