import { generalConfigSchema } from "../../../schemas/logistAssistant/generalConfig";

export const generalConfigSerializer = (formData) => {
  const generalConfigData = generalConfigSchema.parse(formData);

  const parsedData = {
    datos_de_la_tienda: {
      pais: generalConfigData.storeData.storeCountry,
      nombre: generalConfigData.storeData.storeName,
      enlace: generalConfigData.storeData.storeLink,
      ubicacion: generalConfigData.storeData.storeLocation,
      politicas_de_garantia: generalConfigData.storeData.warrantyPolicies,
      origen_de_datos: generalConfigData.storeData.dataSource, // Solo 2 opciones: "Shopify" o "ecommerce". Por defecto: "Shopify"
    },

    comportamiento_de_la_ia: {
      tipo_de_envio: generalConfigData.AIBehaviour.sendingType, // Opciones: "1 solo mensaje" o "Varios mensajes"
      adaptacion_del_lenguaje: generalConfigData.AIBehaviour.languageAdaptation,
      saludo_del_asesor: generalConfigData.AIBehaviour.advisorGreeting,
      metodo_anticancelacion:
        generalConfigData.AIBehaviour.cancellationPrevention,
      restricciones: generalConfigData.AIBehaviour.generalRestrictions,
    },

    voz_con_ia: {
      usar_audio: generalConfigData.AIAudio.useAudioAI ? "si" : "no", // Posibles valores: "si" o "no"
      id_de_la_voz: generalConfigData.AIAudio.voiceId,
      estabilidad: String(generalConfigData.AIAudio.stability),
      similaridad: String(generalConfigData.AIAudio.similarity),
      estilo: String(generalConfigData.AIAudio.style),
      speaker_boost: String(generalConfigData.AIAudio.useSpeakerBoost === "si"), // Si marca "si", debe ser "true"; si "no", debe ser "false"

      reglas: {
        responder_audio_con_audio: generalConfigData.AIAudio
          .respondAudioWithAudio
          ? "si"
          : "no", // Posibles valores: "si" o "no"
        cantidad_maxima_de_audio: String(
          generalConfigData.AIAudio.maxAudioCount
        ),
      },
    },
  };

  return JSON.stringify(parsedData);
};
