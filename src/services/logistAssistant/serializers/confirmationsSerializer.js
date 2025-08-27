import snakify from "snakify";

import { confirmationsSchema } from "../../../schemas/logistAssistant/confirmations";

export const confirmationsSerializer = (formData) => {
  const confirmationsData = confirmationsSchema.parse(formData);

  const parsedData = {
    mensajesDeConfirmacion: {
      posicionImagen: String(confirmationsData.confirmMessages.imagePosition),
      tiempoR1: `${confirmationsData.confirmMessages.reminder1Time} ${confirmationsData.confirmMessages.reminder1Unit}`,
      tiempoR2: `${confirmationsData.confirmMessages.reminder2Time} ${confirmationsData.confirmMessages.reminder2Unit}`,
      mensajeAgradecimiento: confirmationsData.confirmMessages.thanksMessage,
    },

    tiemposEnvio: {
      tiempos: confirmationsData.shippingTimes.deliveryTimes,
    },

    analisisDireccion: {
      evaluarDireccion: confirmationsData.directionAnalisis.evaluateAddress
        ? "si"
        : "no", // Posibles respuestas: "si" o "no"
      promptAnalisis: confirmationsData.directionAnalisis.addressPrompt,
    },

    validacionesOrden: {
      confirmacionAutomatica: confirmationsData.orderValidations.autoConfirm
        ? "si"
        : "no", // Posibles respuestas: "si" o "no"
      validarEntregas: {
        estaActivo: confirmationsData.orderValidations.validateDeliveries
          ? "si"
          : "no", // Posibles respuestas: "si" o "no"
        porcentajeMinimo: `${confirmationsData.orderValidations.minSuccessPercentage}%`, // Ejemplo: "60%"
        minimoDeOrdenes: String(
          confirmationsData.orderValidations.minOrdersValidation
        ),
      },

      validarFlete: {
        estaActivo: confirmationsData.orderValidations.validateShipping
          ? "si"
          : "no", // Posibles respuestas: "si" o "no"
        fleteMinimo: String(
          confirmationsData.orderValidations.minShippingValue
        ), // Será un número, ejemplo: 20000
      },
    },
  };

  return JSON.stringify(snakify(parsedData));
};
