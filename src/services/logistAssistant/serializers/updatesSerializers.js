import snakify from "snakify";

import { updatesSchema } from "../../../schemas/logistAssistant/updates";

export const updatesSerializer = (formData) => {
  const updateData = updatesSchema.parse(formData);

  const parsedData = {
    mensajesDeNovedad: {
      tiempoRecordatorio1: `${updateData.updateMessages.reminder1TimeUpdate} ${updateData.updateMessages.reminder1Unit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
      tiempoNoSolucionado: `${updateData.updateMessages.reminder2TimeUpdate} ${updateData.updateMessages.reminder2Unit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
    },

    diasDeOfrecimiento: {
      diaMinimo: updateData.offerDays.minDay,
      diaMaximo: updateData.offerDays.maxDay, // Formato en texto: "2 días hábiles"
    },

    accionesEspeciales: {
      subirADropi: updateData.specialActions.autoUpdate ? "si" : "no", // Valor: "si" o "no"
    },
  };

  return JSON.stringify(snakify(parsedData));
};
