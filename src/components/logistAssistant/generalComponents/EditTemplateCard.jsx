import camelize from "camelize";
import { getFlowNs } from "../../../services/flow/getFlowNs";
import { showErrorToast } from "../../../utils/toastNotifications";

export const EditTemplateCard = ({ number, flowsState, setFlowsState }) => {
  const handleEditTemplates = async () => {
    if (!flowsState.flowNs) {
      const flowsData = await getFlowNs()
        .then(({ data }) => camelize(data))
        .catch((error) => {
          console.log(error);
          showErrorToast(
            "Ocurrió un error al intentar encontrar el id de los flujos."
          );
        });

      if (!flowsData) return;

      if (!flowsData.flowNs)
        return showErrorToast(
          "Ocurrió un error al intentar encontrar el id de los flujos."
        );

      flowsState = flowsData;
      setFlowsState((prev) => ({ ...prev, ...flowsState }));
    }

    window.open(
      `https://chateapro.app/flow/${flowsState.flowNs}#/content/whatsapp_template`
    );
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-200 hover:bg-white hover:border-sky-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10">
      <div className="w-8 h-8 bg-transparent text-slate-500 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-bold mb-4">
        {number}
      </div>
      <div className="flex-1 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="font-medium text-slate-700 text-sm">
            Edita las plantillas de mensaje
          </label>
          {/* <TooltipIcon
                  tooltipId="editTemplates"
                  content="Edita las plantillas de mensaje del asistente"
                /> */}
        </div>
        <button
          className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-200 shadow-md shadow-sky-500/20 mt-2 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
          onClick={handleEditTemplates}
        >
          Editar plantillas
        </button>
      </div>
    </div>
  );
};
