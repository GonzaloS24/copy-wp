import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { ToggleSwitch } from "../../../generalComponents/ToggleSwitch";
import { Card } from "../../../generalComponents/Card";
import { directionAnalisisInitialValues } from "../../../../../utils/logistAssistant/initialValues/confirmations";

export const DirectionAnalisis = ({ formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      directionAnalisis: {
        ...prev.directionAnalisis,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        📍 Análisis de dirección
      </h2>

      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Análisis de dirección
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Evaluar dirección con IA
            </label>
            <TooltipIcon
              tooltipId="evaluateAddress"
              content="Activar validación automática de direcciones"
            />
          </div>
          <ToggleSwitch
            checked={formData?.directionAnalisis?.evaluateAddress}
            onChange={(value) => handleInputChange("evaluateAddress", value)}
            label="Sí"
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Prompt de análisis de dirección
            </label>
            <TooltipIcon
              tooltipId="addressPrompt"
              content="Instrucciones para que la IA analice direcciones"
            />
          </div>
          <textarea
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="12"
            placeholder={`Ej.\n${directionAnalisisInitialValues.addressPrompt}`}
            value={formData?.directionAnalisis?.addressPrompt}
            onChange={(e) => handleInputChange("addressPrompt", e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
};
