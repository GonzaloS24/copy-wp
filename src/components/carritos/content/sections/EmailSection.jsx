import React, { useState } from "react";
import Tooltip from "./Tooltip";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    emailEnabled: false,
    subject: "Recupera tu carrito",
    content:
      "Hola Prueba, Notamos que dejaste algunos productos en tu carrito. ¡Aún estás a tiempo de completar tu compra antes de que se agoten! Haz clic abajo para retomarla fácilmente:",
  });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const variables = [
    { key: "{{customer.name}}", label: "Nombre completo" },
    { key: "{{customer.first_name}}", label: "Solo nombre" },
    { key: "{{customer.last_name}}", label: "Solo apellido" },
    {
      key: "{{customer.default_address.province}}",
      label: "Provincia/departamento",
    },
    { key: "{{customer.default_address.city}}", label: "Ciudad" },
    {
      key: "{{customer.default_address.address1}}",
      label: "Dirección principal",
    },
    { key: "{{name}}", label: "Id del pedido preliminar" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleVariables = (fieldId) => {
    if (!formData.emailEnabled) return;
    setActiveDropdown(activeDropdown === fieldId ? null : fieldId);
  };

  const insertVariable = (fieldId, variable) => {
    if (!formData.emailEnabled) return;

    const field = document.getElementById(fieldId);
    const cursorPos = field.selectionStart;
    const textBefore = field.value.substring(0, cursorPos);
    const textAfter = field.value.substring(cursorPos);

    const newValue = textBefore + variable + textAfter;
    handleInputChange(
      fieldId === "asunto-correo" ? "subject" : "content",
      newValue
    );

    setActiveDropdown(null);

    setTimeout(() => {
      const newCursorPos = cursorPos + variable.length;
      field.setSelectionRange(newCursorPos, newCursorPos);
      field.focus();
    }, 0);
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <div className="mt-2">
      <label className="inline-block w-14 h-8 rounded-full relative cursor-pointer transition-all duration-300">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            checked ? "bg-sky-500" : "bg-slate-300"
          }`}
        ></div>
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm z-10 ${
            checked ? "transform translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );

  const VariablesSelector = ({ fieldId }) => (
    <div className="relative">
      <div
        className={`w-12 h-full bg-slate-50 border-2 border-slate-200 border-l-0 rounded-r-xl flex items-center justify-center cursor-pointer transition-all duration-200 relative ${
          formData.emailEnabled
            ? "hover:bg-blue-50 hover:border-sky-500 opacity-100"
            : "opacity-60 cursor-not-allowed"
        }`}
        onClick={() => toggleVariables(fieldId)}
      >
        <svg
          className={`w-5 h-5 transition-all duration-200 ${
            formData.emailEnabled
              ? "text-slate-500 hover:text-sky-500"
              : "text-slate-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {activeDropdown === fieldId && formData.emailEnabled && (
        <div className="absolute top-full right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 mt-1 w-64 sm:w-72 overflow-hidden">
          <div className="py-2 max-h-64 overflow-y-auto">
            {variables.map((variable) => (
              <div
                key={variable.key}
                className="py-3 px-4 cursor-pointer transition-all duration-200 text-slate-700 text-sm font-medium border-l-4 border-transparent hover:bg-blue-50 hover:text-sky-500 hover:border-sky-500 active:bg-blue-100"
                onClick={() => insertVariable(fieldId, variable.key)}
              >
                <div className="font-semibold">{variable.label}</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  {variable.key}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Cerrar dropdown al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-sky-500 font-bold tracking-tight">
        Envío de correos
      </h1>

      {/* Toggle para activar/desactivar correos */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
            ¿Deseas enviar correos de recuperación?
          </label>
          <Tooltip content="Si habilitas este campo, shopify le enviará un correo a tu cliente para que retome la compra, indicándole el asunto, el contenido, el enlace de la página y las fotos de los productos que abandonó en tu carrito. Independiente de que habilites o no esta opción, el mensaje por whatsapp se seguirá mandando normalmente" />
        </div>
        <ToggleSwitch
          checked={formData.emailEnabled}
          onChange={(e) => handleInputChange("emailEnabled", e.target.checked)}
        />
      </div>

      {/* Campos de correo */}
      <div
        className={`transition-all duration-300 ${
          !formData.emailEnabled
            ? "opacity-50 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
              Asunto del correo
            </label>
            <Tooltip content="Agrega el asunto que se enviará en el correo, procura que sea un título llamativo que despierte el interés del cliente" />
          </div>
          <div className="flex items-stretch relative">
            <input
              type="text"
              className={`flex-1 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-sm sm:text-base transition-all duration-200 bg-white font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400 ${
                !formData.emailEnabled
                  ? "text-slate-400 bg-slate-100 border-slate-300 cursor-not-allowed"
                  : "text-slate-700"
              }`}
              id="asunto-correo"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              disabled={!formData.emailEnabled}
            />
            <VariablesSelector fieldId="asunto-correo" />
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <label className="block font-semibold text-slate-700 text-sm sm:text-base tracking-tight">
              Contenido del correo
            </label>
            <Tooltip content="Agrega el contenido de tu correo. Shopify le enviará dicho texto con las variables que encuentres" />
          </div>
          <div className="flex items-stretch relative">
            <textarea
              className={`flex-1 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-sm sm:text-base transition-all duration-200 bg-white font-inherit resize-vertical min-h-24 sm:min-h-32 leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400 ${
                !formData.emailEnabled
                  ? "text-slate-400 bg-slate-100 border-slate-300 cursor-not-allowed"
                  : "text-slate-700"
              }`}
              id="contenido-correo"
              rows="6"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              disabled={!formData.emailEnabled}
            />
            <VariablesSelector fieldId="contenido-correo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
