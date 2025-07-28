import { useState } from "react";

const IdentitySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    languageStyle: "",
    persuasionStyle: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const Tooltip = ({ children, content }) => (
    <div className="relative inline-block group">
      <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 hover:bg-sky-600 hover:scale-110 shadow-sm hover:shadow-md">
        i
      </span>
      <div className="invisible group-hover:visible group-hover:opacity-100 group-hover:-translate-y-1 opacity-0 absolute z-50 bottom-full right-0 mb-3 mr-35 w-70 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed shadow-xl border border-slate-600 transition-all duration-300">
        {content}
        <div className="absolute top-full right-35 -mt-2 border-8 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );

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
