import { AIAudioMaxSizes } from "../../../../../utils/logistAssistant/maxSizes/generalConfig";
import { Card } from "../../../generalComponents/Card";
import { HiddenTextField } from "../../../generalComponents/HiddenTextField";
import { ToggleSwitch } from "../../../generalComponents/ToggleSwitch";
import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { NumberInput } from "../../../generalComponents/inputs/NumberInput";
import { RadioGroup } from "../../../generalComponents/inputs/RadioGroup";
import { SliderInput } from "../../../generalComponents/inputs/SliderInput";

export const AIAudio = ({ formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    if (!!AIAudioMaxSizes[field] && value.length >= AIAudioMaxSizes[field])
      return;

    setFormData((prev) => ({
      ...prev,
      AIAudio: {
        ...prev.AIAudio,
        [field]: value,
      },
    }));
  };

  const handlePlayAudioTest = () => {
    if (formData?.AIAudio?.testText.trim()) {
      alert("Esta funcionalidad aún se encuentra en desarrollo.");
    } else {
      alert("Por favor ingresa un texto para probar");
    }
  };

  const isDisabled = !formData?.AIAudio?.useAudioAI;

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        🎤 Audios con IA
      </h2>
      <p className="text-base text-slate-500 mb-8 leading-relaxed">
        Conecta tu voz
      </p>

      {/* Toggle principal */}
      <Card mb="8 shadow-sm">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              ¿Usar audio con IA en proceso logístico?
            </label>
            <TooltipIcon
              tooltipId="useAudioAI"
              content="Activa esta opción para que la IA pueda generar y enviar mensajes de voz automatizados durante el proceso logístico de tus pedidos"
            />
          </div>
          <ToggleSwitch
            checked={formData?.AIAudio?.useAudioAI ?? false}
            onChange={(value) => handleInputChange("useAudioAI", value)}
            label={formData?.AIAudio?.useAudioAI ? "Sí" : "No"}
          />
        </div>
      </Card>

      {/* Contenido de configuración de audio */}
      <div className={`${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
        {/* Grid de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            {/* Configuración de Voz */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-500 mb-6">
                Configuración de Voz
              </h3>

              <div className="mb-5">
                <label className="font-medium text-slate-700 text-sm block mb-2">
                  Token
                </label>
                <HiddenTextField
                  placeholder="Ingresa el token"
                  value={formData?.AIAudio?.token ?? ""}
                  onChange={(e) => handleInputChange("token", e.target.value)}
                  isDisabled={isDisabled}
                />

                <label className="font-medium text-slate-700 text-sm block mb-2">
                  ID de voz
                </label>
                <input
                  type="text"
                  className={`w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 font-inherit leading-relaxed focus:outline-none placeholder:text-slate-400 placeholder:text-sm ${
                    isDisabled
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
                      : "bg-white text-slate-700 focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
                  }`}
                  placeholder="Ingresa el ID de voz"
                  value={formData?.AIAudio?.voiceId ?? ""}
                  onChange={(e) => handleInputChange("voiceId", e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>

            {/* Reglas de envío de audio */}
            <Card shadow="sm">
              <h3 className="text-lg font-semibold text-sky-500 mb-6">
                Reglas de envío de audio
              </h3>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-medium text-slate-700 text-sm">
                    ¿Responder audio con audio?
                  </label>
                  <TooltipIcon
                    tooltipId="respondAudio"
                    content="Cuando un cliente envíe un mensaje de voz, la IA responderá también con audio en lugar de texto"
                  />
                </div>
                <ToggleSwitch
                  checked={formData?.AIAudio?.respondAudioWithAudio ?? false}
                  onChange={(value) =>
                    handleInputChange("respondAudioWithAudio", value)
                  }
                  label={formData?.AIAudio?.respondAudioWithAudio ? "Sí" : "No"}
                />
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-medium text-slate-700 text-sm">
                    Cantidad máxima de audio
                  </label>
                  <TooltipIcon
                    tooltipId="maxAudio"
                    content="Número máximo de mensajes de audio que la IA puede enviar por conversación"
                  />
                </div>
                <NumberInput
                  value={formData?.AIAudio?.maxAudioCount ?? ""}
                  onChange={(value) =>
                    handleInputChange("maxAudioCount", value)
                  }
                  min={1}
                  max={10}
                  disabled={isDisabled}
                />
              </div>
            </Card>
          </div>

          {/* Columna derecha - Parámetros de Voz */}
          <Card shadow="sm flex flex-col">
            <h3 className="text-lg font-semibold text-sky-500 mb-6">
              Parámetros de Voz
            </h3>

            <div className="mb-5">
              <label className="font-medium text-slate-700 text-sm block mb-2">
                Estabilidad
              </label>
              <SliderInput
                value={formData?.AIAudio?.stability ?? 0 ?? ""}
                onChange={(value) => handleInputChange("stability", value)}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-5">
              <label className="font-medium text-slate-700 text-sm block mb-2">
                Similaridad
              </label>
              <SliderInput
                value={formData?.AIAudio?.similarity ?? 0 ?? ""}
                onChange={(value) => handleInputChange("similarity", value)}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-5">
              <label className="font-medium text-slate-700 text-sm block mb-2">
                Estilo
              </label>
              <SliderInput
                value={formData?.AIAudio?.style ?? 0 ?? ""}
                onChange={(value) => handleInputChange("style", value)}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-5 mt-auto">
              <label className="font-medium text-slate-700 text-sm block mb-2">
                ¿Usar speaker boost?
              </label>
              <RadioGroup
                name="speakerBoost"
                value={formData?.AIAudio?.useSpeakerBoost ?? ""}
                onChange={(value) =>
                  handleInputChange("useSpeakerBoost", value)
                }
                options={[
                  { value: "si", label: "Sí" },
                  { value: "no", label: "No" },
                ]}
                disabled={isDisabled}
              />
            </div>
          </Card>
        </div>

        {/* Texto de prueba (ancho completo) */}
        <Card shadow="sm">
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
              value={formData?.AIAudio?.testText ?? ""}
              onChange={(e) => handleInputChange("testText", e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="flex justify-end">
            <button
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isDisabled
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
              }`}
              onClick={handlePlayAudioTest}
              disabled={isDisabled}
            >
              🔊 Reproducir
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
