import { useState } from "react";
import Tooltip from "./Tooltip";

const IdentitySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    languageStyle: "",
    persuasionStyle: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-4xl mb-12 text-sky-500 font-bold tracking-tight">
        Identidad del asistente
      </h1>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Nombre del asesor
          </label>
          <Tooltip content="Nombre con el que la IA debe identificarse a sí misma ante el cliente para humanizar la conversación" />
        </div>
        <input
          type="text"
          className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="Ingresa el nombre del asesor"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Adaptación del lenguaje
          </label>
          <Tooltip content="Estilo del lenguaje, nivel de formalidad, vocabulario y expresiones que debe usar el asistente conversacional para que su comunicación sea coherente con el público objetivo" />
        </div>
        <textarea
          className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit resize-vertical min-h-32 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          rows="4"
          placeholder="Describe el estilo de lenguaje que debe usar el asistente"
          value={formData.languageStyle}
          onChange={(e) => handleInputChange("languageStyle", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Estilo de persuasión ante la cancelación del pedido
          </label>
          <Tooltip content="Enfoque comunicativo que utilizará el asistente para recuperar una venta que está en riesgo, buscando entender las razones del cliente y ofrecer soluciones o argumentos que lo motiven a mantener su compra" />
        </div>
        <textarea
          className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit resize-vertical min-h-32 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          rows="4"
          placeholder="Describe el estilo de persuasión para recuperar ventas"
          value={formData.persuasionStyle}
          onChange={(e) => handleInputChange("persuasionStyle", e.target.value)}
        />
      </div>
    </div>
  );
};

export default IdentitySection;
