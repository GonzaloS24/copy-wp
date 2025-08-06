import { updatesSchema } from "../../../schemas/logistAssistant/updates";

export const updatesSerializer = (formData) => {
  const updateData = updatesSchema.parse(formData);

  const parsedData = {
    mensajes_de_novedad: {
      tiempo_recordatorio_1: `${updateData.updateMessages.reminder1TimeUpdate} ${updateData.updateMessages.reminder1Unit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
      tiempo_no_solucionado: `${updateData.updateMessages.reminder2TimeUpdate} ${updateData.updateMessages.reminder2Unit}`,
      // Formato en texto: "5 minutos", "3 dias", "8 horas"
    },

    dias_de_ofrecimiento: {
      dia_minimo: updateData.offerDays.minDay,
      dia_maximo: updateData.offerDays.maxDay, // Formato en texto: "2 días hábiles"
    },

    acciones_especiales: {
      subir_a_dropi: updateData.specialActions.autoUpdate ? "si" : "no", // Valor: "si" o "no"
    },
  };

  return JSON.stringify(parsedData);
};
