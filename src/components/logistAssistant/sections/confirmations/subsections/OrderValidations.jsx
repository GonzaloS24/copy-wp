import { useState } from "react";
import { ToggleSwitch } from "../../../generalComponents/ToggleSwitch";
import { PercentageInput } from "../../../generalComponents/PercentageInput";
import { Card } from "../../../generalComponents/Card";
// import { TooltipIcon } from "../../../generalComponents/TooltipIcon";

export const OrderValidations = () => {
  const [formData, setFormData] = useState({
    autoConfirm: false,
    validateDeliveries: false,
    minSuccessPercentage: undefined,
    minOrdersValidation: undefined,
    validateShipping: false,
    maxShippingValue: 15000,
  });

  const [showTooltip, setShowTooltip] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        ✔️ Validaciones de la orden
      </h2>

      {/* Confirmación automática */}
      <Card mb={"8"} shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          📦 Confirmación automática
        </h3>

        <div className="mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="font-medium text-slate-700 text-sm">
                ¿Deseas confirmar automáticamente?
              </label>
              {/* <TooltipIcon
                tooltipId="autoConfirm"
                content="Activa la confirmación automática de órdenes"
              /> */}
            </div>
            <ToggleSwitch
              checked={formData.autoConfirm}
              onChange={(value) => handleInputChange("autoConfirm", value)}
              label={formData.autoConfirm ? "Sí" : "No"}
            />
          </div>
        </div>
      </Card>

      {/* Validación de entregas */}
      <Card mb={"8"} shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          📋 Validación de entregas
        </h3>

        <div className="mb-5">
          <label className="font-medium text-slate-700 text-sm block mb-2">
            ¿Deseas validar el historial de entregas?
          </label>
          <ToggleSwitch
            checked={formData.validateDeliveries}
            onChange={(value) => handleInputChange("validateDeliveries", value)}
            label={formData.validateDeliveries ? "Sí" : "No"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <label className="font-medium text-slate-700 text-sm block mb-2">
              Porcentaje mínimo de entregas exitosas
            </label>
            <PercentageInput
              placeholder="Ej. 70"
              onChange={(value) =>
                handleInputChange("minSuccessPercentage", value)
              }
            />
          </div>

          <div className="mb-5">
            <label className="font-medium text-slate-700 text-sm block mb-2">
              Mínimo de órdenes para validación
            </label>
            <input
              type="number"
              className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              placeholder="Ej. 3"
              min="1"
              onChange={(e) =>
                handleInputChange(
                  "minOrdersValidation",
                  parseInt(e.target.value) || 1
                )
              }
            />
          </div>
        </div>
      </Card>

      {/* Validación de flete */}
      <Card mb={"8"} shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          🚛 Validación de flete
        </h3>

        <div className="mb-5">
          <label className="font-medium text-slate-700 text-sm block mb-2">
            ¿Deseas Validar el valor del flete?
          </label>
          <ToggleSwitch
            checked={formData.validateShipping}
            onChange={(value) => handleInputChange("validateShipping", value)}
            label={formData.validateShipping ? "Sí" : "No"}
          />
        </div>

        <div className="mb-5">
          <label className="font-medium text-slate-700 text-sm block mb-2">
            Valor de flete máximo
          </label>
          <input
            type="number"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            placeholder="15000"
            onChange={(e) =>
              handleInputChange(
                "maxShippingValue",
                parseInt(e.target.value) || 0
              )
            }
          />
        </div>
      </Card>
    </div>
  );
};
