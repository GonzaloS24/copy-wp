import { useState } from "react";

export const StoreData = () => {
  const [dropiConnection, setDropiConnection] = useState("si");
  const [integrationId, setIntegrationId] = useState("");
  const [integrationToken, setIntegrationToken] = useState("");
  const [country, setCountry] = useState("");
  const [showIdTooltip, setShowIdTooltip] = useState(false);
  const [showTokenTooltip, setShowTokenTooltip] = useState(false);

  const handleRadioChange = (value) => {
    setDropiConnection(value);
  };

  const countries = [
    { value: "colombia", label: "Colombia" },
    { value: "chile", label: "Chile" },
    { value: "mexico", label: "México" },
    { value: "ecuador", label: "Ecuador" },
    { value: "peru", label: "Perú" },
    { value: "paraguay", label: "Paraguay" },
    { value: "panama", label: "Panamá" },
  ];

  return (
    <div className="block">
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 w-full relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Conexión con Dropi
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            ¿Deseas conectar el asistente a dropi?
          </label>
          <div className="flex flex-col gap-4 mt-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleRadioChange("si")}
            >
              <div className="w-5 h-5 border-2 border-slate-300 rounded-full relative transition-all duration-200 bg-white flex-shrink-0">
                {dropiConnection === "si" && (
                  <>
                    <div className="border-2 border-sky-500 rounded-full w-full h-full absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
              </div>
              <span className="text-gray-700">Sí</span>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleRadioChange("no")}
            >
              <div className="w-5 h-5 border-2 border-slate-300 rounded-full relative transition-all duration-200 bg-white flex-shrink-0">
                {dropiConnection === "no" && (
                  <>
                    <div className="border-2 border-sky-500 rounded-full w-full h-full absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
              </div>
              <span className="text-gray-700">No</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              ID de integración
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-medium cursor-help transition-all duration-200 hover:bg-slate-500 hover:scale-110"
                onMouseEnter={() => setShowIdTooltip(true)}
                onMouseLeave={() => setShowIdTooltip(false)}
                onClick={() => setShowIdTooltip(!showIdTooltip)}
                aria-label="Información sobre ID de integración"
              >
                ?
              </button>

              {showIdTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
                  <div className="w-80 bg-slate-800 text-white text-sm rounded-lg p-4 shadow-xl">
                    <div className="font-medium mb-2">
                      ¿Cómo obtener el ID de integración?
                    </div>
                    <div className="text-slate-300 leading-relaxed">
                      Ve a tu panel de Dropi → Configuración → Integraciones →
                      Copia el ID que aparece en tu integración activa.
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
            placeholder="Ingresa el ID de integración"
            value={integrationId}
            onChange={(e) => setIntegrationId(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Token de Integración
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-medium cursor-help transition-all duration-200 hover:bg-slate-500 hover:scale-110"
                onMouseEnter={() => setShowTokenTooltip(true)}
                onMouseLeave={() => setShowTokenTooltip(false)}
                onClick={() => setShowTokenTooltip(!showTokenTooltip)}
                aria-label="Información sobre Token de integración"
              >
                ?
              </button>

              {showTokenTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
                  <div className="w-80 bg-slate-800 text-white text-sm rounded-lg p-4 shadow-xl">
                    <div className="font-medium mb-2">
                      ¿Cómo obtener el Token de integración?
                    </div>
                    <div className="text-slate-300 leading-relaxed">
                      En tu panel de Dropi → Configuración → API → Generar nuevo
                      token → Copia el token generado y pégalo aquí.
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
            placeholder="Ingresa el token de integración"
            value={integrationToken}
            onChange={(e) => setIntegrationToken(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors bg-white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
