import { confirmationsSchema } from "../../../schemas/logistAssistant/confirmations";

export const confirmationsSerializer = (formData) => {
  const confirmationsData = confirmationsSchema.parse(formData);

  const parsedData = {
    mensajes_de_confirmacion: {
      posicion_imagen: String(confirmationsData.confirmMessages.imagePosition),
      tiempo_r1: `${confirmationsData.confirmMessages.reminder1Time} ${confirmationsData.confirmMessages.reminder1Unit}`,
      tiempo_r2: `${confirmationsData.confirmMessages.reminder2Time} ${confirmationsData.confirmMessages.reminder2Unit}`,
      mensaje_agradecimiento: confirmationsData.confirmMessages.thanksMessage,
    },

    tiempos_envio: {
      tiempos: confirmationsData.shippingTimes.deliveryTimes,
    },

    analisis_direccion: {
      evaluar_direccion: confirmationsData.directionAnalisis.evaluateAddress
        ? "si"
        : "no", // Posibles respuestas: "si" o "no"
      prompt_analisis: confirmationsData.directionAnalisis.addressPrompt,
    },

    validaciones_orden: {
      confirmacion_automatica: confirmationsData.orderValidations.autoConfirm
        ? "si"
        : "no", // Posibles respuestas: "si" o "no"
      validar_entregas: {
        esta_activo: confirmationsData.orderValidations.validateDeliveries
          ? "si"
          : "no", // Posibles respuestas: "si" o "no"
        porcentaje_minimo: String(
          confirmationsData.orderValidations.minSuccessPercentage
        ), // Ejemplo: "60%"
        minimo_de_ordenes: String(
          confirmationsData.orderValidations.minOrdersValidation
        ),
      },

      validar_flete: {
        esta_activo: confirmationsData.orderValidations.validateShipping
          ? "si"
          : "no", // Posibles respuestas: "si" o "no"
        flete_minimo: String(
          confirmationsData.orderValidations.minShippingValue
        ), // Será un número, ejemplo: 20000
      },
    },
  };

  return JSON.stringify(parsedData);
};
