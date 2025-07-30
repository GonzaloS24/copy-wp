import { useState } from "react";
// import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { Card } from "../../../generalComponents/Card";

export const ShippingTimes = () => {
  const [formData, setFormData] = useState({
    deliveryTimesGuide: "",
    deliveryTimesDistribution: "",
  });

  const handleInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        🕐 Tiempos de envío
      </h2>

      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Tiempos de envío
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Tiempos de envío desde guía generada
            </label>
            {/* <TooltipIcon
              tooltipId="deliveryTimes"
              content="Mensaje que indica los tiempos que normalmente demoran tus pedidos en llegar a tus clientes"
            /> */}
          </div>
          <textarea
            id="deliveryTimesGuide"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            placeholder="Ej. De 3 a 5 días en ciudades principales y de 5 a 7 días en ciudades no principales"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Tiempos de envío desde en reparto
            </label>
            {/* <TooltipIcon
              tooltipId="deliveryTimes"
              content="Mensaje que indica los tiempos que normalmente demoran tus pedidos en llegar a tus clientes"
            /> */}
          </div>
          <textarea
            id="deliveryTimesDistribution"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            placeholder="Ej. De 3 a 5 días en ciudades principales y de 5 a 7 días en ciudades no principales"
            onChange={handleInputChange}
          />
        </div>
      </Card>
    </div>
  );
};
