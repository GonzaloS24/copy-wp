import { useState, useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";

export const ProductVoice = () => {
  const { productData, updateProductData } = useProduct();

  const voiceData = productData.voice || {
    voiceId: "",
    apiKey: "",
    stability: 0.3,
    similarity: 0.7,
    style: 0.5,
    useSpeakerBoost: true,
    useVoiceAI: false,
  };

  const [testText, setTestText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const needsInitialization =
        voiceData.useVoiceAI === undefined || voiceData.useVoiceAI === null;

      if (needsInitialization) {
        console.log(
          "[ProductVoice] Inicializando useVoiceAI con valor por defecto"
        );
        updateProductData("voice", {
          ...voiceData,
          useVoiceAI: false,
        });
      }
      setIsInitialized(true);
    }
  }, [isInitialized, voiceData, updateProductData]);

  const increaseValue = (param) => {
    const step = 0.1;
    const max = 1.0;
    const newValue = Math.min((voiceData[param] || 0) + step, max);

    updateProductData("voice", {
      [param]: newValue,
    });
  };

  const decreaseValue = (param) => {
    const step = 0.1;
    const min = 0.0;
    const newValue = Math.max((voiceData[param] || 0) - step, min);

    updateProductData("voice", {
      [param]: newValue,
    });
  };

  const reproduceVoice = () => {
    if (testText.trim()) {
      console.log("Reproduciendo voz con:", {
        ...voiceData,
        testText,
      });
    } else {
      alert("Por favor ingresa un texto para probar");
    }
  };

  const formatValue = (value) => {
    return (value || 0).toFixed(1).replace(".", ",");
  };

  const handleInputChange = (field, value) => {
    updateProductData("voice", {
      [field]: value,
    });
  };

  const handleSpeakerBoostChange = (value) => {
    updateProductData("voice", {
      useSpeakerBoost: value,
    });
  };

  const handleUseVoiceAIChange = (value) => {
    console.log(
      "[ProductVoice] Cambiando useVoiceAI de",
      voiceData.useVoiceAI,
      "a",
      value
    );
    updateProductData("voice", {
      useVoiceAI: value,
    });
  };

  const isDisabled = !voiceData.useVoiceAI;

  // ToggleSwitch
  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
            disabled
              ? "bg-slate-300 cursor-not-allowed"
              : checked
              ? "bg-sky-500"
              : "bg-slate-300"
          }`}
          onClick={() => !disabled && onChange(!checked)}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
              checked ? "transform translate-x-6" : ""
            }`}
          />
        </div>
      </div>
      <span className="text-sm text-slate-700 font-medium">
        {checked ? "Sí" : "No"}
      </span>
    </div>
  );

  return (
    <div className="p-6 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
          🎤 Conecta tu voz
        </h1>
        <p className="text-base text-slate-500 mb-8 leading-relaxed">
          Conecta tu voz
        </p>

        {/* Toggle principal */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-slate-700 text-sm">
                ¿Usar voz con IA?
              </label>
            </div>
            <ToggleSwitch
              checked={voiceData.useVoiceAI}
              onChange={handleUseVoiceAIChange}
            />
          </div>
        </div>

        {/* Contenido principal con efecto de deshabilitación */}
        <div
          className={`${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-center text-slate-700">
                Configuración de Voz
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ID de voz
                  </label>
                  <input
                    type="text"
                    value={voiceData.voiceId || ""}
                    onChange={(e) =>
                      handleInputChange("voiceId", e.target.value)
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDisabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
                        : "bg-white text-slate-700"
                    }`}
                    placeholder="Ingresa el ID de voz"
                    disabled={isDisabled}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    API Key de cuenta
                  </label>
                  <input
                    type="text"
                    value={voiceData.apiKey || ""}
                    onChange={(e) =>
                      handleInputChange("apiKey", e.target.value)
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDisabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
                        : "bg-white text-slate-700"
                    }`}
                    placeholder="Ingresa tu API Key"
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-center text-slate-700">
                Parámetros de Voz
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estabilidad
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseValue("stability")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={formatValue(voiceData.stability)}
                      readOnly
                      className={`flex-1 text-center px-2 py-2 border border-gray-300 rounded-md font-semibold ${
                        isDisabled
                          ? "bg-slate-100 text-slate-400 border-slate-300"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    />
                    <button
                      onClick={() => increaseValue("stability")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Similaridad
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseValue("similarity")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={formatValue(voiceData.similarity)}
                      readOnly
                      className={`flex-1 text-center px-2 py-2 border border-gray-300 rounded-md font-semibold ${
                        isDisabled
                          ? "bg-slate-100 text-slate-400 border-slate-300"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    />
                    <button
                      onClick={() => increaseValue("similarity")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estilo
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseValue("style")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={formatValue(voiceData.style)}
                      readOnly
                      className={`flex-1 text-center px-2 py-2 border border-gray-300 rounded-md font-semibold ${
                        isDisabled
                          ? "bg-slate-100 text-slate-400 border-slate-300"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    />
                    <button
                      onClick={() => increaseValue("style")}
                      disabled={isDisabled}
                      className={`w-10 h-10 border border-gray-300 bg-white rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        isDisabled
                          ? "cursor-not-allowed text-slate-400 border-slate-300 bg-slate-100"
                          : "cursor-pointer text-slate-600 hover:border-sky-500 hover:text-sky-500"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ¿Usar speaker boost?
                  </label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() =>
                          !isDisabled && handleSpeakerBoostChange(true)
                        }
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                          isDisabled
                            ? "cursor-not-allowed border-slate-300 bg-slate-100"
                            : "cursor-pointer"
                        } ${
                          voiceData.useSpeakerBoost && !isDisabled
                            ? "border-sky-500 bg-sky-500"
                            : isDisabled
                            ? "border-slate-300 bg-slate-100"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {voiceData.useSpeakerBoost && !isDisabled && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isDisabled ? "text-slate-400" : "text-slate-700"
                        }`}
                      >
                        Sí
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() =>
                          !isDisabled && handleSpeakerBoostChange(false)
                        }
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                          isDisabled
                            ? "cursor-not-allowed border-slate-300 bg-slate-100"
                            : "cursor-pointer"
                        } ${
                          !voiceData.useSpeakerBoost && !isDisabled
                            ? "border-sky-500 bg-sky-500"
                            : isDisabled
                            ? "border-slate-300 bg-slate-100"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {!voiceData.useSpeakerBoost && !isDisabled && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isDisabled ? "text-slate-400" : "text-slate-700"
                        }`}
                      >
                        No
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-500 mb-6">
                Texto de prueba
              </h3>

              <div className="mb-5">
                <textarea
                  className={`w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 font-inherit leading-relaxed resize-y min-h-[100px] focus:outline-none placeholder:text-slate-400 placeholder:text-sm ${
                    isDisabled
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
                      : "bg-white text-slate-700 focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                  }`}
                  rows="4"
                  placeholder="Escribe aquí el texto que quieres probar con la voz configurada..."
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={reproduceVoice}
                  disabled={isDisabled}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isDisabled
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
                  }`}
                >
                  🔊 Reproducir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
