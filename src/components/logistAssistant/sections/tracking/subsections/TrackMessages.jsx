import { MESSAGES_REINSTALL_TEMPLATE_NS } from "../../../../../utils/constants/assistants";
import { Card } from "../../../generalComponents/Card";
import { EditTemplateCard } from "../../../generalComponents/EditTemplateCard";
import { MapTemplateCard } from "../../../generalComponents/MapTemplates";
import { TemplateReinstallation } from "../../../generalComponents/TemplateReinstallation";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";

export const TrackMessages = ({
  formData,
  setFormData,
  flowsState,
  setFlowsState,
}) => {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      trackMessages: {
        ...prev.trackMessages,
        [field]: value,
      },
    }));
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
          <EditTemplateCard
            number={1}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />

          {/* Tarjeta 2 - Mapear plantillas */}
          <MapTemplateCard
            number={2}
            subflowName={"Logistica: Mensajes de seguimiento"}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />
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
              value={formData?.trackMessages?.officeReminderTime}
              onChange={(e) =>
                handleInputChange(
                  "officeReminderTime",
                  parseInt(e.target.value) || 1
                )
              }
            />
            <select
              className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
              value={formData?.trackMessages?.officeReminderUnit}
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

      <TemplateReinstallation
        templateNs={MESSAGES_REINSTALL_TEMPLATE_NS.LOGISTIC.TRACKING}
      />
    </div>
  );
};
