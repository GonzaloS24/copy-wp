import camelize from "camelize";
import { trackingBotFieldSchema } from "../../../schemas/logistAssistant/botFieldData/tracking";

export const trackingDeserializer = (botFieldValue) => {
  try {
    const fieldData = trackingBotFieldSchema.parse(
      camelize(JSON.parse(botFieldValue))
    );

    const parsedData = {
      trackMessages: {
        officeReminderTime: Number(
          fieldData.mensajesDeSeguimiento.tiempoRecordatorioOficina.split(
            " "
          )[0]
        ),
        officeReminderUnit:
          fieldData.mensajesDeSeguimiento.tiempoRecordatorioOficina.split(
            " "
          )[1],
      },

      shippingTimes: {
        deliveryTimesGuide: fieldData.tiemposEnvio.desdeGuiaGenerada,
        deliveryTimesDistribution: fieldData.tiemposEnvio.desdeEnReparto,
      },

      salesHooks: {
        generatedGuideHook: fieldData.ganchosDeVenta.guiaGenerada,
        deliveryHook: fieldData.ganchosDeVenta.enReparto,
        officeHook: fieldData.ganchosDeVenta.enOficina,
        deliveredHook: fieldData.ganchosDeVenta.entregado,
      },
    };

    return parsedData;
  } catch (error) {
    return {};
  }
};
