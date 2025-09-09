import { useState } from "react";
import { useCarritos } from "../../../../context/CarritosContext";
import { EditTemplateCard } from "../../../logistAssistant/generalComponents/EditTemplateCard";
import { MapTemplateCard } from "../../../logistAssistant/generalComponents/MapTemplates";
import { TemplateReinstallation } from "../../../logistAssistant/generalComponents/TemplateReinstallation";
import { MESSAGES_REINSTALL_TEMPLATE_NS } from "../../../../utils/constants/assistants";

const RecoveryMessagesSection = () => {
  const { carritoData, updateCarritoData } = useCarritos();
  const [flowsState, setFlowsState] = useState({});

  const timeUnits = [
    { value: "segundos", label: "segundos" },
    { value: "minutos", label: "minutos" },
    { value: "horas", label: "horas" },
    { value: "dias", label: "días" },
  ];

  const handleInputChange = (field, value) => {
    updateCarritoData("mensajes_recuperacion", {
      [field]: value,
    });
  };

  const handleTimeChange = (reminderNum, timeValue, unit) => {
    const timeString = `${timeValue} ${unit}`;
    const field = `tiempo_recordatorio_${reminderNum}`;
    handleInputChange(field, timeString);
  };

  const parseTimeString = (timeString) => {
    if (!timeString) return { time: "", unit: "minutos" };
    const match = timeString.match(/^(\d+)\s*(\w+)$/);
    if (match) {
      return { time: match[1], unit: match[2] };
    }
    return { time: "", unit: "minutos" };
  };

  const reminder1Data = parseTimeString(
    carritoData.mensajes_recuperacion?.tiempo_recordatorio_1 || "5 minutos"
  );
  const reminder2Data = parseTimeString(
    carritoData.mensajes_recuperacion?.tiempo_recordatorio_2 || "10 minutos"
  );
  const reminder3Data = parseTimeString(
    carritoData.mensajes_recuperacion?.tiempo_recordatorio_3 || "15 minutos"
  );

  const Tooltip = ({ content }) => (
    <div className="relative inline-block group">
      <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 hover:bg-sky-600 hover:scale-110 shadow-sm hover:shadow-md">
        i
      </span>
      <div className="invisible group-hover:visible group-hover:opacity-100 group-hover:-translate-y-1 opacity-0 absolute z-50 bottom-full left-0 mb-3 mr-35 w-80 max-w-xs sm:max-w-sm md:w-80 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed shadow-xl border border-slate-600 transition-all duration-300">
        {content}
        <div className="absolute top-full right-35 -mt-2 border-8 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 w-full relative z-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-sky-500 font-bold tracking-tight">
          Mensajes de recuperación
        </h1>

        {/* 1. Mensajes de recuperación */}
        <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-6 md:p-8 border border-slate-200 rounded-2xl bg-white shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-sky-500 mb-6 sm:mb-8 tracking-tight">
            1. Mensajes de recuperación
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            {/* Paso 1: Posición de la imagen */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-sky-500 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-4 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-lg">
              <div className="w-8 h-8 bg-transparent text-slate-500 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex items-center gap-3 flex-col text-center">
                <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
                  Indica la posición de la imagen
                </label>
                <Tooltip content="Selecciona la posición de la imagen de tu producto en Shopify que deseas usar. Si la primera imagen es un GIF, el sistema no la tomará. Asegúrate de elegir una imagen en formato válido (JPG o PNG)." />
              </div>
              <input
                type="number"
                className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                min="1"
                max="10"
                placeholder="1"
                value={carritoData.mensajes_recuperacion?.posicion_imagen || ""}
                onChange={(e) =>
                  handleInputChange(
                    "posicion_imagen",
                    parseInt(e.target.value) || 1
                  )
                }
              />
            </div>

            {/* Paso 2: Editar plantillas */}
            <EditTemplateCard
              number={2}
              flowsState={flowsState}
              setFlowsState={setFlowsState}
            />

            {/* Paso 3: Mapear plantillas */}
            <MapTemplateCard
              number={3}
              subflowName={"Carritos: Mensajes de recuperacion"}
              flowsState={flowsState}
              setFlowsState={setFlowsState}
            />
          </div>
        </div>

        {/* 2. Recordatorios */}
        <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-6 md:p-8 border border-slate-200 rounded-2xl bg-white shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-sky-500 mb-6 sm:mb-8 tracking-tight">
            2. Recordatorios
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
                  Tiempo del recordatorio 1
                </label>
                <Tooltip content="Tiempo de espera antes de enviar el primer recordatorio. Puedes definirlo en segundos, minutos, horas o días." />
              </div>
              <div className="flex gap-0">
                <input
                  type="number"
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-sm sm:text-base text-center bg-white text-slate-700 min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  min="1"
                  placeholder="5"
                  value={reminder1Data.time}
                  onChange={(e) =>
                    handleTimeChange(
                      1,
                      parseInt(e.target.value) || 1,
                      reminder1Data.unit
                    )
                  }
                />
                <select
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 rounded-r-xl text-sm sm:text-base bg-white text-slate-700 cursor-pointer min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  value={reminder1Data.unit}
                  onChange={(e) =>
                    handleTimeChange(1, reminder1Data.time, e.target.value)
                  }
                >
                  {timeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
                  Tiempo del recordatorio 2
                </label>
                <Tooltip content="Tiempo de espera antes de enviar el segundo recordatorio. Ajusta según el flujo ideal para tu tienda." />
              </div>
              <div className="flex gap-0">
                <input
                  type="number"
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-sm sm:text-base text-center bg-white text-slate-700 min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  min="1"
                  placeholder="10"
                  value={reminder2Data.time}
                  onChange={(e) =>
                    handleTimeChange(
                      2,
                      parseInt(e.target.value) || 1,
                      reminder2Data.unit
                    )
                  }
                />
                <select
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 rounded-r-xl text-sm sm:text-base bg-white text-slate-700 cursor-pointer min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  value={reminder2Data.unit}
                  onChange={(e) =>
                    handleTimeChange(2, reminder2Data.time, e.target.value)
                  }
                >
                  {timeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
                  Tiempo del recordatorio 3
                </label>
                <Tooltip content="Tiempo de espera antes de enviar el segundo recordatorio. Ajusta según el flujo ideal para tu tienda." />
              </div>
              <div className="flex gap-0">
                <input
                  type="number"
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-sm sm:text-base text-center bg-white text-slate-700 min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  min="1"
                  placeholder="15"
                  value={reminder3Data.time}
                  onChange={(e) =>
                    handleTimeChange(
                      3,
                      parseInt(e.target.value) || 1,
                      reminder3Data.unit
                    )
                  }
                />
                <select
                  className="flex-1 p-3 sm:p-4 border-2 border-slate-200 rounded-r-xl text-sm sm:text-base bg-white text-slate-700 cursor-pointer min-w-0 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                  value={reminder3Data.unit}
                  onChange={(e) =>
                    handleTimeChange(3, reminder3Data.time, e.target.value)
                  }
                >
                  {timeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mensaje de agradecimiento */}
        <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-6 md:p-8 border border-slate-200 rounded-2xl bg-white shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-sky-500 mb-6 sm:mb-8 tracking-tight">
            3. Mensaje de agradecimiento
          </h3>
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-3">
              <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
                Mensaje de agradecimiento
              </label>
              <Tooltip content="Mensaje con el que quieres agradecer al cliente por haber recuperado su carrito y recordarle detalles importantes como tiempos de entrega o próximos pasos." />
            </div>
            <textarea
              className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit resize-vertical min-h-24 sm:min-h-32 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
              rows="4"
              placeholder="Gracias por recuperar tu carrito. Próximamente te enviaremos el número de guía de tu pedido."
              value={
                carritoData.mensajes_recuperacion?.mensaje_agradecimiento || ""
              }
              onChange={(e) =>
                handleInputChange("mensaje_agradecimiento", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Contenedor separado para reinstalación de plantillas */}
      <TemplateReinstallation
        templateNs={MESSAGES_REINSTALL_TEMPLATE_NS.CARTS.UPDATES}
      />
    </>
  );
};

export default RecoveryMessagesSection;
