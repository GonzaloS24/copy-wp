import { useState } from "react";
import { useProduct } from "../../../context/ProductContext";
import { EditTemplateCard } from "../../logistAssistant/generalComponents/EditTemplateCard";
import { MapTemplateCard } from "../../logistAssistant/generalComponents/MapTemplates";
import { TooltipIcon } from "../../logistAssistant/generalComponents/TooltipIcon";

export const ProductRemarketing = () => {
  const { productData, updateProductData } = useProduct();

  const [flowsState, setFlowsState] = useState({});

  const handleInputChange = ({ target }) => {
    const fieldId = target.id.split("-")[0];
    const fieldPart = target.id.split("-")[1];

    updateProductData("remarketing", {
      [fieldId]: {
        ...(productData?.remarketing?.[fieldId] ?? {}),
        [fieldPart]: target.value,
      },
    });
  };

  const handleIntInputChange = ({ target }) => {
    const fieldId = target.id.split("-")[0];
    const fieldPart = target.id.split("-")[1];

    if (parseInt(Number(target.value)) < 0) return;

    updateProductData("remarketing", {
      [fieldId]: {
        ...(productData?.remarketing?.[fieldId] ?? {}),
        [fieldPart]: parseInt(Number(target.value)) || "",
      },
    });
  };

  const handleSwitchInputChange = ({ target }) => {
    const fieldId = target.id.split("-")[0];
    const fieldPart = target.id.split("-")[1];

    updateProductData("remarketing", {
      [fieldId]: {
        ...(productData?.remarketing?.[fieldId] ?? {}),
        [fieldPart]: parseInt(Number(target.checked)) || "",
      },
    });
  };

  return (
    <div className="p-6 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center text-slate-700">
          Remarketing
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Tiempo Remarketing 1
              </label>
              {/* <TooltipIcon
                tooltipId="remarketing1"
                content="Tiempo de espera antes del primer recordatorio"
              /> */}
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="remarketing1-time"
                type="number"
                value={productData?.remarketing?.remarketing1?.time ?? ""}
                placeholder={1}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleIntInputChange}
              />
              <select
                id="remarketing1-unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={productData?.remarketing?.remarketing1.unit ?? "dias"}
                onChange={handleInputChange}
              >
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                Tiempo Remarketing 2
              </label>
              {/* <TooltipIcon
                tooltipId="remarketing2"
                content="Tiempo de espera antes del segundo recordatorio"
              /> */}
            </div>
            <div className="flex gap-0 w-full">
              <input
                id="remarketing2-time"
                type="number"
                placeholder={1}
                value={productData?.remarketing?.remarketing2.time ?? ""}
                className="w-30 p-3.5 border border-gray-300 rounded-l-lg border-r-0 text-center text-sm bg-white focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                onChange={handleIntInputChange}
              />
              <select
                id="remarketing2-unit"
                className="flex-1 p-3.5 border border-gray-300 rounded-r-lg text-sm bg-white cursor-pointer min-w-36 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                value={productData?.remarketing?.remarketing2.unit ?? "dias"}
                onChange={handleInputChange}
              >
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200">
          <EditTemplateCard
            number={1}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />

          <MapTemplateCard
            number={2}
            subflowName={"⚙️ Personalización de Remarketing"}
            flowsState={flowsState}
            setFlowsState={setFlowsState}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200">
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="timeRange-enabled"
                  type="checkbox"
                  checked={
                    productData?.remarketing?.timeRange?.enabled || false
                  }
                  onChange={handleSwitchInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-slate-700 font-medium">
                ¿Deseas definir un rango de horas para enviar los recordatorios?
              </span>
            </div>

            {productData?.remarketing?.timeRange?.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hora mínima
                  </label>
                  <div className="relative">
                    <input
                      id="timeRange-minTime"
                      type="time"
                      value={productData?.remarketing?.timeRange?.minTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-slate-200 rounded-lg text-base bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hora máxima
                  </label>
                  <div className="relative">
                    <input
                      id="timeRange-maxTime"
                      type="time"
                      value={productData?.remarketing?.timeRange?.maxTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-slate-200 rounded-lg text-base bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
