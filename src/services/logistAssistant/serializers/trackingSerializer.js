import { trackingSchema } from "../../../schemas/logistAssistant/tracking";

export const trackingSerializer = (FormData) => {
  const trackingData = trackingSchema.parse(FormData);

  const parsedData = {
    mensajes_de_seguimiento: {
      tiempo_recordatorio_oficina: `
        ${trackingData.trackMessages.officeReminderTime} ${trackingData.trackMessages.officeReminderUnit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
    },

    tiempos_envio: {
      desde_guia_generada: trackingData.shippingTimes.deliveryTimesGuide,
      desde_en_reparto: trackingData.shippingTimes.deliveryTimesDistribution,
    },

    ganchos_de_venta: {
      guia_generada: trackingData.salesHooks.generatedGuideHook,
      en_reparto: trackingData.salesHooks.deliveryHook,
      en_oficina: trackingData.salesHooks.officeHook,
      entregado: trackingData.salesHooks.deliveredHook,
    },
  };

  return JSON.stringify(parsedData);
};
