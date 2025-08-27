import camelize from "camelize";

import { generalConfigBotFieldSchema } from "../../../schemas/logistAssistant/botFieldData/generalConfig";

export const generalConfigDeserializer = (botFieldValue) => {
  try {
    const fieldData = generalConfigBotFieldSchema.parse(
      camelize(JSON.parse(botFieldValue))
    );

    const parsedData = {
      storeData: {
        storeCountry: fieldData.datosDeLaTienda.pais,
        storeName: fieldData.datosDeLaTienda.nombre,
        storeLink: fieldData.datosDeLaTienda.enlace,
        storeLocation: fieldData.datosDeLaTienda.ubicacion,
        warrantyPolicies: fieldData.datosDeLaTienda.politicasDeGarantia,
        dataSource: fieldData.datosDeLaTienda.origenDeDatos,
      },

      AIBehaviour: {
        sendingType: fieldData.comportamientoDeLaIa.tipoDeEnvio,
        languageAdaptation:
          fieldData.comportamientoDeLaIa.adaptacionDelLenguaje,
        advisorGreeting: fieldData.comportamientoDeLaIa.saludoDelAsesor,
        cancellationPrevention:
          fieldData.comportamientoDeLaIa.metodoAnticancelacion,
        generalRestrictions: fieldData.comportamientoDeLaIa.restricciones,
      },

      AIAudio: {
        useAudioAI: fieldData.vozConIa.usarAudio === "si",
        token: fieldData.vozConIa.token,
        voiceId: Number(fieldData.vozConIa.idDeLaVoz),
        stability: Number(fieldData.vozConIa.estabilidad),
        similarity: Number(fieldData.vozConIa.similaridad),
        style: Number(fieldData.vozConIa.estilo),
        useSpeakerBoost:
          fieldData.vozConIa.speakerBoost === "true" ? "si" : "no",
        respondAudioWithAudio:
          fieldData.vozConIa.reglas.responderAudioConAudio === "si",
        maxAudioCount: Number(fieldData.vozConIa.reglas.cantidadMaximaDeAudio),
      },
    };

    return parsedData;
  } catch (error) {
    return {};
  }
};
