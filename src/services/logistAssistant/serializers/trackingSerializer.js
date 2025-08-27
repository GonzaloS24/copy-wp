import snakify from "snakify";

import { trackingSchema } from "../../../schemas/logistAssistant/tracking";

export const trackingSerializer = (FormData) => {
  const trackingData = trackingSchema.parse(FormData);

  const parsedData = {
    mensajesDeSeguimiento: {
      tiempoRecordatorioOficina: `
        ${trackingData.trackMessages.officeReminderTime} ${trackingData.trackMessages.officeReminderUnit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
    },

    tiemposEnvio: {
      desdeGuiaGenerada: trackingData.shippingTimes.deliveryTimesGuide,
      desdeEnReparto: trackingData.shippingTimes.deliveryTimesDistribution,
    },

    ganchosDeVenta: {
      guiaGenerada: trackingData.salesHooks.generatedGuideHook,
      enReparto: trackingData.salesHooks.deliveryHook,
      enOficina: trackingData.salesHooks.officeHook,
      entregado: trackingData.salesHooks.deliveredHook,
    },
  };

  return JSON.stringify(snakify(parsedData));
};
