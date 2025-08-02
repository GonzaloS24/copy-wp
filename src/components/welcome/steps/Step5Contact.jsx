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

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode);

  return (
    <div className="max-w-[600px] w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-3 sm:mb-4 tracking-tight">
        ¡Casi terminamos!
      </h2>
      <p className="text-sm sm:text-base text-slate-600 mb-8 sm:mb-10 leading-relaxed">
        Necesitamos estos datos para brindarte asesoría personalizada cuando
        nuestra IA detecte que necesites ayuda.
      </p>

      <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12 text-left">
        <div>
          <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2">
            Nombre y apellido completos
          </label>
          <input
            type="text"
            value={fullName || ""}
            onChange={handleNameChange}
            className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl text-sm sm:text-base transition-all duration-200 ${
              errors.fullName
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-sky-500"
            } focus:outline-none focus:ring-4 focus:ring-sky-500/10`}
            placeholder="Ej: Juan Pablo Restrepo"
            autoComplete="name"
            maxLength={50}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2">
            Número de WhatsApp personal
          </label>
          <div
            className={`flex overflow-hidden border-2 rounded-xl transition-all duration-200 ${
              errors.whatsappNumber
                ? "border-red-300 focus-within:border-red-500"
                : "border-slate-200 focus-within:border-sky-500"
            } focus-within:ring-4 focus-within:ring-sky-500/10`}
          >
            {/* Selector de país simple */}
            <div className="relative flex-shrink-0 border-r border-slate-200">
              <select
                value={selectedCountryCode}
                onChange={handleCountryCodeChange}
                className="appearance-none bg-white border-0 px-2 py-3 sm:py-4 pr-6 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                style={{ width: "75px" }}
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              {/* Icono de flecha personalizado */}
              <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                <svg
                  className="w-3 h-3 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <input
              type="tel"
              value={whatsappNumber || ""}
              onChange={handlePhoneChange}
              className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-4 border-0 text-sm sm:text-base focus:outline-none bg-white"
              placeholder={getPhonePlaceholder(selectedCountryCode)}
              autoComplete="tel"
            />
          </div>
          {errors.whatsappNumber && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.whatsappNumber}
            </p>
          )}
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
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
