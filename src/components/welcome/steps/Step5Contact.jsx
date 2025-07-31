import { useState } from "react";
import NavigationButtons from "../shared/NavigationButtons";

const Step5Contact = ({
  fullName,
  whatsappNumber,
  onNameChange,
  onPhoneChange,
  onNext,
  onPrevious,
  onSkip,
  canProceed,
}) => {
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.trim().length < 2)
      return "El nombre debe tener al menos 2 caracteres";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "El número de WhatsApp es requerido";
    const cleanPhone = phone.replace(/\s/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) return "El número debe tener 10 dígitos";
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    onNameChange(value);

    const error = validateName(value);
    setErrors((prev) => ({ ...prev, fullName: error }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Solo permitir números y espacios
    const formattedValue = value.replace(/[^\d\s]/g, "");
    onPhoneChange(formattedValue);

    const error = validatePhone(formattedValue);
    setErrors((prev) => ({ ...prev, whatsappNumber: error }));
  };

  return (
    <div className="text-center max-w-2xl mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        ¡Casi terminamos!
      </h2>
      <p className="text-lg text-slate-600 mb-10">
        Necesitamos estos datos para brindarte asesoría personalizada cuando
        nuestra IA detecte que necesitas ayuda.
      </p>

      <div className="space-y-6 mb-10 text-left">
        <div>
          <label className="block text-base font-semibold text-slate-700 mb-2">
            Nombre y apellido
          </label>
          <input
            type="text"
            value={fullName}
            onChange={handleNameChange}
            className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-200 ${
              errors.fullName
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-sky-500"
            } focus:outline-none focus:ring-4 focus:ring-sky-500/10`}
            placeholder="Ej: Juan Pablo Restrepo"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold text-slate-700 mb-2">
            Número de WhatsApp personal
          </label>
          <div
            className={`flex border-2 rounded-xl transition-all duration-200 ${
              errors.whatsappNumber
                ? "border-red-300 focus-within:border-red-500"
                : "border-slate-200 focus-within:border-sky-500"
            } focus-within:ring-4 focus-within:ring-sky-500/10`}
          >
            <div className="px-4 py-4 border-r border-slate-200 text-slate-600 font-semibold">
              🇨🇴 +57
            </div>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={handlePhoneChange}
              className="flex-1 px-4 py-4 border-none rounded-r-xl text-base focus:outline-none"
              placeholder="300 123 4567"
              autoComplete="tel"
            />
          </div>
          {errors.whatsappNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
          )}
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Solo lo usaremos para asesorías personalizadas cuando necesites
            ayuda.
          </p>
        </div>
      </div>

      <NavigationButtons
        currentStep={5}
        canProceed={canProceed}
        onNext={onNext}
        onPrevious={onPrevious}
        onSkip={onSkip}
        isLastStep={true}
      />
    </div>
  );
};

export default Step5Contact;
