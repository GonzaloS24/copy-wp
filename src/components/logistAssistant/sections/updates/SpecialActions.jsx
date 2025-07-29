import { useState } from "react";
import { TooltipIcon } from "../../generalComponents/TooltipIcon";
import { ToggleSwitch } from "../../generalComponents/ToggleSwitch";
import { Card } from "../../generalComponents/Card";

export const SpecialActions = () => {
  const [formData, setFormData] = useState({
    evaluateAddress: false,
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
        ⚡ Acciones especiales
      </h2>

      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Automatización
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Solucionar novedad automáticamente
            </label>
            {/* <TooltipIcon
              tooltipId="evaluateAddress"
              content="Activar validación automática de direcciones"
            /> */}
          </div>
          <ToggleSwitch
            checked={formData.evaluateAddress}
            onChange={(value) => handleInputChange("evaluateAddress", value)}
            label="Sí"
          />
        </div>
      </Card>
    </div>
  );
};
