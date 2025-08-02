import { useState } from "react";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { Card } from "../../../generalComponents/Card";

export const AIBehaviour = () => {
  const [formData, setFormData] = useState({
    sendingType: "1 solo mensaje",
    languageAdaptation:
      "Hablar de forma cercana pero profesional, usar un lenguaje claro y directo, evitar tecnicismos",
    advisorGreeting:
      "Entiendo tu consulta, voy a conectarte con uno de nuestros asesores especializados para brindarte la mejor atención",
    cancellationPrevention:
      "Mostrar empatía, identificar la razón específica de cancelación, ofrecer alternativas como cambio de producto o fecha de entrega, destacar beneficios únicos",
    generalRestrictions:
      "Nunca proporcionar información personal de otros clientes, no hacer promesas que no pueda cumplir, mantener siempre un tono respetuoso, no insistir más de 3 veces en la misma propuesta",
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
        🤖 Comportamiento de la IA
      </h2>
      <p className="text-base text-slate-500 mb-8 leading-relaxed">
        Define el comportamiento general que tendrá la IA en todas las
        interacciones con los clientes
      </p>

      {/* Envío de la información */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Envío de la información
        </h3>

        <div className="mb-5">
          <p className="text-base text-slate-500 mb-4 leading-relaxed text-sm">
            Decide si deseas que la IA envíe los mensajes en un solo mensaje
            completo o en mensajes separados
          </p>

          <label className="font-medium text-slate-700 text-sm block mb-2">
            Tipo de envío
          </label>

          <select
            id="sendingType"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
            value={formData.sendingType}
            onChange={handleInputChange}
          >
            <option value="1 solo mensaje">1 solo mensaje</option>
            <option value="Varios mensajes">Varios mensajes</option>
          </select>
        </div>
      </Card>

      {/* Adaptación del lenguaje */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Adaptación del lenguaje
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Adaptación del lenguaje
            </label>
            <TooltipIcon content="Define el estilo de comunicación, nivel de formalidad y tipo de vocabulario que debe usar la IA en todas sus interacciones" />
          </div>
          <textarea
            id="languageAdaptation"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            value={formData.languageAdaptation}
            placeholder={`Ej. ${formData.languageAdaptation}...`}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Situaciones que requieren de un asesor */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Situaciones que requieren de un asesor
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Mensaje de saludo del asesor
            </label>
            <TooltipIcon content="Mensaje inicial que usará la IA cuando el cliente haga una pregunta o un comentario que requiera de atención humana. Con esto, la IA le hará entender al cliente que transferirá su solicitud a un asesor especializado" />
          </div>
          <textarea
            id="advisorGreeting"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="3"
            value={formData.advisorGreeting}
            placeholder={`Ej. ${formData.advisorGreeting}...`}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Método para evitar la cancelación del pedido
            </label>
            <TooltipIcon content="Estrategia general que debe aplicar la IA cuando detecte que un cliente quiere cancelar su pedido" />
          </div>
          <textarea
            id="cancellationPrevention"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="5"
            value={formData.cancellationPrevention}
            placeholder={`Ej. ${formData.cancellationPrevention}...`}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Limitaciones generales */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Limitaciones generales
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Restricciones
            </label>
            <TooltipIcon content="Reglas y limitaciones que la IA debe respetar en todas sus interacciones, sin importar el contexto o tipo de consulta" />
          </div>
          <textarea
            id="generalRestrictions"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="6"
            value={formData.generalRestrictions}
            placeholder={`Ej. ${formData.generalRestrictions}...`}
            onChange={handleInputChange}
          />
        </div>
      </Card>
    </div>
  );
};
