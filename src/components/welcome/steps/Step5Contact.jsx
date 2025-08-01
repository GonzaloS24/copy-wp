import { useState, useEffect } from "react";
import NavigationButtons from "../components/NavigationButtons";
import {
  COUNTRIES,
  PHONE_LENGTHS,
  PHONE_PLACEHOLDERS,
} from "../data/wizardOptions";

const Step5Contact = ({
  fullName,
  whatsappNumber,
  countryCode = "+57",
  onNameChange,
  onPhoneChange,
  onCountryCodeChange,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const [errors, setErrors] = useState({});
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);

  // Sincronizar estado local con prop cuando cambie
  useEffect(() => {
    setSelectedCountryCode(countryCode);
  }, [countryCode]);

  // Funciones auxiliares movidas a archivo de datos
  const getPhoneLengthByCountry = (code) => {
    return PHONE_LENGTHS[code] || 10;
  };

  const getCountryName = (code) => {
    const country = COUNTRIES.find((c) => c.code === code);
    return country ? country.name : "el país seleccionado";
  };

  const getPhonePlaceholder = (countryCode) => {
    return PHONE_PLACEHOLDERS[countryCode] || "Número de teléfono";
  };

  const validateName = (name) => {
    if (!name || !name.trim()) return "El nombre es requerido";
    if (name.trim().length < 2)
      return "El nombre debe tener al menos 2 caracteres";
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) return "Ingresa tu nombre y apellido completos";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name.trim()))
      return "El nombre solo puede contener letras";
    return "";
  };

  const validatePhone = (phone, currentCountryCode) => {
    if (!phone || !phone.trim()) return "El número de WhatsApp es requerido";
    const cleanPhone = phone.replace(/\s/g, "");

    if (!/^\d+$/.test(cleanPhone))
      return "El número solo puede contener dígitos";

    const phoneLength = getPhoneLengthByCountry(currentCountryCode);
    if (cleanPhone.length !== phoneLength)
      return `El número debe tener ${phoneLength} dígitos para ${getCountryName(
        currentCountryCode
      )}`;

    return "";
  };

  // Efecto para revalidar cuando cambian los valores
  useEffect(() => {
    if (fullName) {
      const nameError = validateName(fullName);
      setErrors((prev) => ({ ...prev, fullName: nameError }));
    }

    if (whatsappNumber) {
      const phoneError = validatePhone(whatsappNumber, selectedCountryCode);
      setErrors((prev) => ({ ...prev, whatsappNumber: phoneError }));
    }
  }, [fullName, whatsappNumber, selectedCountryCode]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    onNameChange(value);

    const error = validateName(value);
    setErrors((prev) => ({ ...prev, fullName: error }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      onPhoneChange("");
      setErrors((prev) => ({
        ...prev,
        whatsappNumber: "El número de WhatsApp es requerido",
      }));
      return;
    }

    value = value.replace(/[^\d\s]/g, "");

    const maxLength = getPhoneLengthByCountry(selectedCountryCode) + 3;
    if (value.length > maxLength) {
      return;
    }

    onPhoneChange(value);

    const error = validatePhone(value, selectedCountryCode);
    setErrors((prev) => ({ ...prev, whatsappNumber: error }));
  };

  const handleCountryCodeChange = (e) => {
    const newCountryCode = e.target.value;
    console.log("CAMBIANDO PAÍS A:", newCountryCode);

    setSelectedCountryCode(newCountryCode);
    onCountryCodeChange(newCountryCode);

    onPhoneChange("");
    setErrors((prev) => ({
      ...prev,
      whatsappNumber: "El número de WhatsApp es requerido",
    }));
  };

  // Verificar si realmente puede proceder (sin errores)
  const actualCanProceed =
    canProceed &&
    !errors.fullName &&
    !errors.whatsappNumber &&
    fullName &&
    fullName.trim() &&
    whatsappNumber &&
    whatsappNumber.trim();

  return (
    <div className="max-w-[600px] w-full text-center mx-auto px-8">
      <h2 className="text-3xl font-bold text-slate-700 mb-4 tracking-tight">
        ¡Casi terminamos!
      </h2>
      <p className="text-base text-slate-600 mb-10 leading-relaxed">
        Necesitamos estos datos para brindarte asesoría personalizada cuando
        nuestra IA detecte que necesites ayuda.
      </p>

      <div className="space-y-6 mb-12 text-left">
        <div>
          <label className="block text-base font-semibold text-slate-700 mb-2">
            Nombre y apellido completos
          </label>
          <input
            type="text"
            value={fullName || ""}
            onChange={handleNameChange}
            className={`w-full px-4 py-4 border-2 rounded-xl text-base transition-all duration-200 ${
              errors.fullName
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-sky-500"
            } focus:outline-none focus:ring-4 focus:ring-sky-500/10`}
            placeholder="Ej: Juan Pablo Restrepo"
            autoComplete="name"
            maxLength={50}
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
            className={`flex border-2 rounded-xl transition-all duration-200 overflow-hidden ${
              errors.whatsappNumber
                ? "border-red-300 focus-within:border-red-500"
                : "border-slate-200 focus-within:border-sky-500"
            } focus-within:ring-4 focus-within:ring-sky-500/10`}
          >
            {/* Selector de país */}
            <div className="relative flex items-center px-4 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-r border-slate-200 min-w-[140px] cursor-pointer hover:from-slate-100 hover:to-slate-150 transition-all duration-200 group">
              <span className="text-base font-bold text-slate-800 tracking-wide group-hover:text-slate-900 transition-colors duration-200">
                <span className="text-lg mr-2">
                  {COUNTRIES.find((c) => c.code === selectedCountryCode)?.flag}
                </span>
                <span className="font-mono">{selectedCountryCode}</span>
              </span>
              <select
                value={selectedCountryCode}
                onChange={handleCountryCodeChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer text-base"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                {COUNTRIES.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                    className="py-2 px-3 text-base bg-white hover:bg-blue-50"
                  >
                    {country.flag} {country.code} - {country.name}
                  </option>
                ))}
              </select>
              <div className="ml-3 transform group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-4 h-4 text-slate-500 group-hover:text-slate-700 transition-colors duration-200 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <input
              type="tel"
              value={whatsappNumber || ""}
              onChange={handlePhoneChange}
              className="flex-1 px-4 py-4 border-none text-base focus:outline-none bg-white"
              placeholder={getPhonePlaceholder(selectedCountryCode)}
              autoComplete="tel"
            />
          </div>
          {errors.whatsappNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
          )}
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Solo lo usaremos para asesorías personalizadas cuando necesites
            ayuda. Debe ser un número válido de WhatsApp.
          </p>
        </div>
      </div>

      <NavigationButtons
        currentStep={5}
        canProceed={actualCanProceed}
        onNext={onNext}
        onPrevious={onPrevious}
        isLastStep={true}
      />
    </div>
  );
};

export default Step5Contact;
