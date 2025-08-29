import camelize from "camelize";

import { confirmationsBotFieldSchema } from "../../../schemas/logistAssistant/botFieldData/confirmations";

export const confirmationsDeserializer = (botFieldValue) => {
  try {
    const fieldData = confirmationsBotFieldSchema.parse(
      camelize(JSON.parse(botFieldValue))
    );

    const parsedData = {
      confirmMessages: {
        imagePosition: fieldData.mensajesDeConfirmacion.posicionImagen,
        reminder1Time: fieldData.mensajesDeConfirmacion.tiempoR1.split(" ")[0],
        reminder1Unit: fieldData.mensajesDeConfirmacion.tiempoR1.split(" ")[1],
        reminder2Time: fieldData.mensajesDeConfirmacion.tiempoR2.split(" ")[0],
        reminder2Unit: fieldData.mensajesDeConfirmacion.tiempoR2.split(" ")[1],
        thanksMessage: fieldData.mensajesDeConfirmacion.mensajeAgradecimiento,
      },

      shippingTimes: {
        deliveryTimes: fieldData.tiemposEnvio.tiempos,
      },

      directionAnalisis: {
        evaluateAddress: fieldData.analisisDireccion.evaluarDireccion === "si",
        addressPrompt: fieldData.analisisDireccion.promptAnalisis,
      },

      orderValidations: {
        autoConfirm:
          fieldData.validacionesOrden.confirmacionAutomatica === "si",
        validateDeliveries:
          fieldData.validacionesOrden.validarEntregas.estaActivo === "si",
        minSuccessPercentage: Number(
          fieldData.validacionesOrden.validarEntregas.porcentajeMinimo.replace(
            "%",
            ""
          )
        ),
        minOrdersValidation:
          fieldData.validacionesOrden.validarEntregas.minimoDeOrdenes,
        validateShipping:
          fieldData.validacionesOrden.validarFlete.estaActivo === "si",
        minShippingValue: fieldData.validacionesOrden.validarFlete.fleteMinimo,
      },
    };

    return parsedData;
  } catch (error) {
    return {};
  }
};
