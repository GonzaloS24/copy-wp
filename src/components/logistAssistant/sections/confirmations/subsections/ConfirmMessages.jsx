import { Card } from "../../../generalComponents/Card";
import { TemplateReinstallation } from "../../../generalComponents/TemplateReinstallation";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { confirmMessagesInitialValues } from "../../../../../utils/logistAssistant/initialValues/confirmations";
import { EditTemplateCard } from "../../../generalComponents/EditTemplateCard";
import { MapTemplateCard } from "../../../generalComponents/MapTemplates";
import { MESSAGES_REINSTALL_TEMPLATE_NS } from "../../../../../utils/constants/assistants";

export const ConfirmMessages = ({
  formData,
  setFormData,
  flowsState,
  setFlowsState,
}) => {
  const handleInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      confirmMessages: {
        ...prev.confirmMessages,
        [target.id]: target.value,
      },
    }));
  };

  const handleIntInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      confirmMessages: {
        ...prev.confirmMessages,
        [target.id]: parseInt(target.value) || 1,
      },
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        ✅ Mensajes de confirmación
      </h2>

      <Card mb={8} shadow={"sm"}>
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          1. Mensajes de recuperación
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-200 hover:bg-white hover:border-sky-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10">
            <div className="w-8 h-8 bg-transparent text-slate-500 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-bold mb-4">
              1
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-center gap-2 mb-2">
                <label className="font-medium text-slate-700 text-sm">
                  Indica la posición de la imagen
                </label>
                {/* <TooltipIcon
                  tooltipId="imagePosition"
                  content="Selecciona la posición de la imagen de tu producto"
                /> */}
              </div>
              <input
                id="imagePosition"
                type="number"
                className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 text-center mt-2 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData.confirmMessages.imagePosition}
                placeholder={confirmMessagesInitialValues.imagePosition}
                min="1"
                onChange={handleIntInputChange}
              />
            </div>
          </div>

          <EditTemplateCard
            number={2}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />

          <MapTemplateCard
            number={3}
            subflowName={"Logistica: Mensajes de confirmacion"}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />
        </div>
      </Card>

      <Card mb={8} shadow={"sm"}>
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          2. Recordatorios
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Tiempo del recordatorio 1
              </label>
              <TooltipIcon
                tooltipId="reminder1"
                content="Tiempo de espera antes del primer recordatorio"
              />
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="reminder1Time"
                type="number"
                value={formData.confirmMessages.reminder1Time}
                placeholder={confirmMessagesInitialValues.reminder1Time}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleIntInputChange}
              />
              <select
                id="reminder1Unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData.confirmMessages.reminder1Unit}
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
                Tiempo del recordatorio 2
              </label>
              <TooltipIcon
                tooltipId="reminder2"
                content="Tiempo de espera antes del segundo recordatorio"
              />
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="reminder2Time"
                type="number"
                placeholder={confirmMessagesInitialValues.reminder2Time}
                value={formData.confirmMessages.reminder2Time}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleIntInputChange}
              />
              <select
                id="reminder2Unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={formData.confirmMessages.reminder2Unit}
                onChange={handleInputChange}
              >
                <option value="minutos">minutos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
            <div className="text-sm text-slate-500 mt-2 italic">
              Se recomienda configurar este recordatorio para al menos 24 horas
              después del primero para evitar envío masivo de mensajes
            </div>
          </div>
        </div>
      </Card>

      <Card mb={8} shadow={"sm"}>
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          3. Mensaje de agradecimiento
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Mensaje de agradecimiento
            </label>
            <TooltipIcon
              tooltipId="thanksMessage"
              content="Mensaje de agradecimiento personalizado"
            />
          </div>
          <textarea
            id="thanksMessage"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            value={formData.confirmMessages.thanksMessage}
            placeholder={`Ej. ${confirmMessagesInitialValues.thanksMessage}...`}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      <TemplateReinstallation
        templateNs={MESSAGES_REINSTALL_TEMPLATE_NS.LOGISTIC.CONFIRMATIONS}
      />
    </div>
  );
};
