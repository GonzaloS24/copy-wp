import snakify from "snakify";

import { generalConfigSchema } from "../../../schemas/logistAssistant/generalConfig";

export const generalConfigSerializer = (formData) => {
  const generalConfigData = generalConfigSchema.parse(formData);

  const parsedData = {
    datosDeLaTienda: {
      pais: generalConfigData.storeData.storeCountry,
      nombre: generalConfigData.storeData.storeName,
      enlace: generalConfigData.storeData.storeLink,
      ubicacion: generalConfigData.storeData.storeLocation,
      politicasDeGarantia: generalConfigData.storeData.warrantyPolicies,
      origenDeDatos: generalConfigData.storeData.dataSource, // Solo 2 opciones: "Shopify" o "ecommerce". Por defecto: "Shopify"
    },

    comportamientoDeLaIa: {
      tipoDeEnvio: generalConfigData.AIBehaviour.sendingType, // Opciones: "1 solo mensaje" o "Varios mensajes"
      adaptacionDelLenguaje: generalConfigData.AIBehaviour.languageAdaptation,
      saludoDelAsesor: generalConfigData.AIBehaviour.advisorGreeting,
      metodoAnticancelacion:
        generalConfigData.AIBehaviour.cancellationPrevention,
      restricciones: generalConfigData.AIBehaviour.generalRestrictions,
    },

    vozConIa: {
      usarAudio: generalConfigData.AIAudio.useAudioAI ? "si" : "no", // Posibles valores: "si" o "no"
      token: generalConfigData.AIAudio.token,
      idDeLaVoz: String(generalConfigData.AIAudio.voiceId),
      estabilidad: String(generalConfigData.AIAudio.stability),
      similaridad: String(generalConfigData.AIAudio.similarity),
      estilo: String(generalConfigData.AIAudio.style),
      speakerBoost: String(generalConfigData.AIAudio.useSpeakerBoost === "si"), // Si marca "si", debe ser "true"; si "no", debe ser "false"

      reglas: {
        responderAudioConAudio: generalConfigData.AIAudio.respondAudioWithAudio
          ? "si"
          : "no", // Posibles valores: "si" o "no"
        cantidadMaximaDeAudio: String(generalConfigData.AIAudio.maxAudioCount),
      },
    },
  };

  return JSON.stringify(snakify(parsedData));
};
