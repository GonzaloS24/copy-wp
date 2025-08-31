import { Card } from "../../../generalComponents/Card";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { salesHooksInitialValues } from "../../../../../utils/logistAssistant/initialValues/tracking";

export const SalesHooks = ({ formData, setFormData }) => {
  const handleInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      salesHooks: {
        ...prev.salesHooks,
        [target.id]: target.value,
      },
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        🎯 Ganchos de venta
      </h2>
      <p className="text-base text-slate-500 mb-8 leading-relaxed">
        Los ganchos de venta son el primer párrafo de cada mensaje de
        seguimiento. Este mensaje es persuasivo y dinámico, y se nutre con base
        en la información del producto. Esto permite que cada uno de tus
        mensajes sea único, cargado de un valor persuasivo y emocional.
      </p>

      {/* Gancho de venta en Guía Generada */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          📦 Gancho de venta en Guía Generada
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Gancho de venta en Guía Generada
            </label>
            <TooltipIcon
              tooltipId="generatedGuideHook"
              content='Ingresa el gancho de venta que se enviará al cliente dentro del mensaje de "Guía generada".'
            />
          </div>
          <textarea
            id="generatedGuideHook"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="8"
            value={formData?.salesHooks?.generatedGuideHook ?? ""}
            placeholder={salesHooksInitialValues.generatedGuideHook}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Gancho de venta en Reparto */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          🚚 Gancho de venta en Reparto
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Gancho de venta en Reparto
            </label>
            <TooltipIcon
              tooltipId="deliveryHook"
              content='Ingresa el gancho de venta que se enviará al cliente dentro del mensaje de "En reparto".'
            />
          </div>
          <textarea
            id="deliveryHook"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="8"
            value={formData?.salesHooks?.deliveryHook ?? ""}
            placeholder={salesHooksInitialValues.deliveryHook}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Gancho de venta para Pedido en Oficina */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          🏢 Gancho de venta para Pedido en Oficina
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Gancho de venta para Pedido en Oficina
            </label>
            <TooltipIcon
              tooltipId="officeHook"
              content="Ingresa el gancho de venta que se mostrará cuando el pedido esté listo para ser reclamado en la oficina."
            />
          </div>
          <textarea
            id="officeHook"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="12"
            value={formData?.salesHooks?.officeHook ?? ""}
            placeholder={salesHooksInitialValues.officeHook}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Gancho de venta para Pedidos Entregados */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          🎁 Gancho de venta para Pedidos Entregados
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Gancho de venta en Pedidos Entregados
            </label>
            <TooltipIcon
              tooltipId="deliveredHook"
              content="Ingresa el gancho de venta que se mostrará cuando el pedido ya fue entregado."
            />
          </div>
          <textarea
            id="deliveredHook"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="10"
            value={formData?.salesHooks?.deliveredHook ?? ""}
            placeholder={salesHooksInitialValues.deliveredHook}
            onChange={handleInputChange}
          />
        </div>
      </Card>
    </div>
  );
};
