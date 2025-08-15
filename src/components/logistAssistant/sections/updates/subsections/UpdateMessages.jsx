import { Card } from "../../../generalComponents/Card";
import { TemplateReinstallation } from "../../../generalComponents/TemplateReinstallation";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { updateMessagesInitialValues } from "../../../../../utils/logistAssistant/initialValues/updates";
import { EditTemplateCard } from "../../../generalComponents/EditTemplateCard";
import { MapTemplateCard } from "../../../generalComponents/MapTemplates";

export const UpdateMessages = ({
  formData,
  setFormData,
  flowsState,
  setFlowsState,
}) => {
  const handleInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      updateMessages: {
        ...prev.updateMessages,
        [target.id]: target.value,
      },
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        ⚠️ Mensajes de novedad
      </h2>

      {/* Plantillas de mensaje de novedad */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Plantillas de mensaje de novedad
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
            subflowName={"Logistica: Mensajes de novedad"}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />
        </div>
      </Card>

      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Recordatorio de novedad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Tiempo del recordatorio de novedad
              </label>
              {/* <TooltipIcon
                tooltipId="reminder1"
                content="Tiempo de espera antes del primer recordatorio"
              /> */}
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="reminder1TimeUpdate"
                type="number"
                value={formData.updateMessages.reminder1TimeUpdate}
                placeholder={updateMessagesInitialValues.reminder1TimeUpdate}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleInputChange}
              />
              <select
                id="reminder1Unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData.updateMessages.reminder1Unit}
                onChange={handleInputChange}
              >
                <option value="minutos">minutos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Tiempo clasificar como novedad no solucionada
              </label>
              {/* <TooltipIcon
                tooltipId="reminder2"
                content="Tiempo de espera antes del segundo recordatorio"
              /> */}
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="reminder2TimeUpdate"
                type="number"
                value={formData.updateMessages.reminder2TimeUpdate}
                placeholder={updateMessagesInitialValues.reminder2TimeUpdate}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleInputChange}
              />
              <select
                id="reminder2Unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData.updateMessages.reminder2Unit}
                onChange={handleInputChange}
              >
                <option value="minutos">minutos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <TemplateReinstallation templateNs={"w4fsogyyeyu3n15ur1kkb7ixgpe32gl6"} />
    </div>
  );
};
