import { useState } from "react";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { ToggleSwitch } from "../../../generalComponents/ToggleSwitch";
import { Card } from "../../../generalComponents/Card";

export const DirectionAnalisis = () => {
  const [formData, setFormData] = useState({
    evaluateAddress: false,
    addressPrompt: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
            checked={formData.evaluateAddress}
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
            placeholder={
              "Ej.\n#ROL: Asume el papel de un experto en direcciones colombianas. Tu tarea es analizar y evaluar una dirección colombiana proporcionada para determinar si parece estar bien estructurada, es suficientemente específica y contiene las referencias necesarias. Las direcciones en Colombia pueden adoptar diferentes formas, incluyendo calle, carrera, avenida, diagonal, transversal, corregimiento, entre otros términos relevantes según la nomenclatura local. Debes considerar si la dirección tiene suficientes detalles y referencias adicionales como el número de casa, el barrio o un punto de referencia.\n\n#CRITERIOS PARA EVALUAR LA DIRECCIÓN:\nA) Suficientemente específica: La dirección incluye un tipo de vía (calle, carrera, avenida, etc.), el número correspondiente, y referencia claras como un número de puerta o apartamento. También hay casos especiales, como nombre del sector, manzana, y número de casa, lo que permite identificar la ubicación precisa."
            }
            value={formData.addressPrompt}
            onChange={(e) => handleInputChange("addressPrompt", e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
};
