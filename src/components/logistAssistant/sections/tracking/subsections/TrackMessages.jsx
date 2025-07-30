import { useState } from "react";
import { Card } from "../../../generalComponents/Card";
import { TemplateReinstallation } from "../../../generalComponents/TemplateReinstallation";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";

export const TrackMessages = () => {
  const [formData, setFormData] = useState({
    officeReminderTime: 1,
    officeReminderUnit: "dias",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditTemplates = () => {
    alert("Editar plantillas de seguimiento");
  };

  const handleMapTemplates = () => {
    alert("Mapear plantillas de seguimiento");
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        📦 Mensajes de seguimiento
      </h2>

      {/* Plantillas de mensaje de seguimiento */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Plantillas de mensaje de seguimiento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Tarjeta 1 - Editar plantillas */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 min-h-[180px] flex flex-col items-center text-center transition-all duration-200 hover:bg-white hover:border-sky-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10">
            <div className="w-8 h-8 bg-transparent text-slate-500 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-bold mb-4">
              1
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-center gap-2 mb-2">
                <label className="font-medium text-slate-700 text-sm">
                  Edita las plantillas de mensaje
                </label>
                <TooltipIcon
                  tooltipId="editTrackingTemplates"
                  content="Edita las plantillas de mensaje del asistente de seguimiento"
                />
              </div>
              <button
                className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-200 shadow-md shadow-sky-500/20 mt-2 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
                onClick={handleEditTemplates}
              >
                Editar plantillas
              </button>
            </div>
          </div>

          {/* Tarjeta 2 - Mapear plantillas */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 min-h-[180px] flex flex-col items-center text-center transition-all duration-200 hover:bg-white hover:border-sky-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10">
            <div className="w-8 h-8 bg-transparent text-slate-500 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-bold mb-4">
              2
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-center gap-2 mb-2">
                <label className="font-medium text-slate-700 text-sm">
                  Mapea las plantillas en el flujo
                </label>
                <TooltipIcon
                  tooltipId="mapTrackingTemplates"
                  content="Mapea las plantillas en el flujo de seguimiento"
                />
              </div>
              <button
                className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-200 shadow-md shadow-sky-500/20 mt-2 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
                onClick={handleMapTemplates}
              >
                Mapear plantillas
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recordatorio de envío a oficina */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          2. Recordatorio de envío a oficina
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Recordatorio de envío a oficina
            </label>
            <TooltipIcon
              tooltipId="officeReminder"
              content="Tiempo para recordar al cliente sobre el envío a oficina"
            />
          </div>

          <div className="flex gap-0 w-full max-w-sm">
            <input
              type="number"
              className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              value={formData.officeReminderTime}
              onChange={(e) =>
                handleInputChange(
                  "officeReminderTime",
                  parseInt(e.target.value) || 1
                )
              }
            />
            <select
              className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              value={formData.officeReminderUnit}
              onChange={(e) =>
                handleInputChange("officeReminderUnit", e.target.value)
              }
            >
              <option value="horas">horas</option>
              <option value="dias">días</option>
            </select>
          </div>

          <div className="text-sm text-slate-500 mt-2 italic">
            Se recomienda enviar el recordatorio de oficina al día siguiente o a
            los 2 días
          </div>
        </div>
      </Card>

      <TemplateReinstallation />
    </div>
  );
};
