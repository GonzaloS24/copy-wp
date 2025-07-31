import { useState } from "react";
import Tooltip from "./Tooltip";

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

  const CustomCheckbox = ({ id, checked, onChange, label }) => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className={`w-5 h-5 border-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-200 ${
            checked
              ? "bg-sky-500 border-sky-500"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </label>
      </div>
      <label
        htmlFor={id}
        className="text-sm sm:text-base text-slate-700 cursor-pointer font-medium"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-sky-500 font-bold tracking-tight">
        Datos logísticos
      </h1>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Tiempos de envío
          </label>
          <Tooltip content="Tiempo estimado en días hábiles que tarda en llegar un pedido desde que se despacha, para que el asistente lo informe al cliente de forma clara." />
        </div>
        <input
          type="text"
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="de 2 a 5 días hábiles para ciudades principales y de 5 a 7 días para ciudades no principales"
          onChange={(e) => handleInputChange("shippingTime", e.target.value)}
        />
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Método de pago
          </label>
          <Tooltip content="Opciones de pago que ofrece tu tienda. Selecciona una o ambas. El asistente usará esta información para explicar cómo se paga el pedido según lo que el cliente prefiera." />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10">
            <CustomCheckbox
              id="pago-contraentrega"
              checked={formData.cashOnDelivery}
              onChange={(e) =>
                handleInputChange("cashOnDelivery", e.target.checked)
              }
              label="Pago contraentrega"
            />
            <CustomCheckbox
              id="pago-anticipado"
              checked={formData.advancePayment}
              onChange={(e) =>
                handleInputChange("advancePayment", e.target.checked)
              }
              label="Pago anticipado"
            />
          </div>

          {/* Textarea que aparece cuando se marca pago anticipado */}
          {formData.advancePayment && (
            <div className="mt-2 p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <label className="block font-semibold text-slate-700 text-base tracking-tight">
                  Datos del pago anticipado
                </label>
                <Tooltip content="Indica el medio de pago que el bot le debe sugerir al cliente para que realice el pago anticipado" />
              </div>
              <textarea
                className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit resize-vertical min-h-20 sm:min-h-24 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
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

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Transportadoras disponibles
          </label>
          <Tooltip content="Empresas de envío con las que trabajas. El asistente puede mencionarlas si el cliente quiere saber por qué transportadora llegará su pedido" />
        </div>
        <input
          type="text"
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="envia, servientrega, interrapidísimo, etc"
          onChange={(e) => handleInputChange("carriers", e.target.value)}
        />
      </div>
    </div>
  );
};

export default LogisticsSection;
