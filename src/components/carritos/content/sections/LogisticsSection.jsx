import { useState } from "react";

const LogisticsSection = () => {
  const [formData, setFormData] = useState({
    shippingTime:
      "de 2 a 5 días hábiles para ciudades principales y de 5 a 7 días para ciudades no principales",
    cashOnDelivery: false,
    advancePayment: false,
    advancePaymentDetails: "",
    carriers: "envia, servientrega, interrapidísimo, etc",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const Tooltip = ({ content }) => (
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
        Datos logísticos
      </h1>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Tiempos de envío
          </label>
          <Tooltip content="Tiempo estimado en días hábiles que tarda en llegar un pedido desde que se despacha, para que el asistente lo informe al cliente de forma clara." />
        </div>
        <input
          type="text"
          className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="de 2 a 5 días hábiles para ciudades principales y de 5 a 7 días para ciudades no principales"
          value={formData.shippingTime}
          onChange={(e) => handleInputChange("shippingTime", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Método de pago
          </label>
          <Tooltip content="Opciones de pago que ofrece tu tienda. Selecciona una o ambas. El asistente usará esta información para explicar cómo se paga el pedido según lo que el cliente prefiera." />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="pago-contraentrega"
                className="w-5 h-5 border-2 border-slate-300 rounded-md cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:bg-sky-500 checked:border-sky-500"
                checked={formData.cashOnDelivery}
                onChange={(e) =>
                  handleInputChange("cashOnDelivery", e.target.checked)
                }
              />
              <label
                htmlFor="pago-contraentrega"
                className="text-base text-slate-700 cursor-pointer font-medium"
              >
                Pago contraentrega
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="pago-anticipado"
                className="w-5 h-5 border-2 border-slate-300 rounded-md cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:bg-sky-500 checked:border-sky-500"
                checked={formData.advancePayment}
                onChange={(e) =>
                  handleInputChange("advancePayment", e.target.checked)
                }
              />
              <label
                htmlFor="pago-anticipado"
                className="text-base text-slate-700 cursor-pointer font-medium"
              >
                Pago anticipado
              </label>
            </div>
          </div>

          {/* Textarea que aparece cuando se marca pago anticipado */}
          {formData.advancePayment && (
            <div className="mt-2 p-6 bg-slate-50 border border-slate-200 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <label className="block font-semibold text-slate-700 text-base tracking-tight">
                  Datos del pago anticipado
                </label>
                <Tooltip content="Indica el medio de pago que el bot le debe sugerir al cliente para que realice el pago anticipado" />
              </div>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit resize-vertical min-h-24 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
                rows="3"
                placeholder="Banco, número de cuenta, etc"
                value={formData.advancePaymentDetails}
                onChange={(e) =>
                  handleInputChange("advancePaymentDetails", e.target.value)
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Transportadoras disponibles
          </label>
          <Tooltip content="Empresas de envío con las que trabajas. El asistente puede mencionarlas si el cliente quiere saber por qué transportadora llegará su pedido" />
        </div>
        <input
          type="text"
          className="w-full p-4 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="envia, servientrega, interrapidísimo, etc"
          value={formData.carriers}
          onChange={(e) => handleInputChange("carriers", e.target.value)}
        />
      </div>
    </div>
  );
};

export default LogisticsSection;
