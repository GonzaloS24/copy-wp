import camelize from "camelize";
import { updatesBotFieldSchema } from "../../../schemas/logistAssistant/botFieldData/updates";

export const updatesDeserializer = (botFieldValue) => {
  try {
    const fieldData = updatesBotFieldSchema.parse(
      camelize(JSON.parse(botFieldValue))
    );

    const parsedData = {
      updateMessages: {
        reminder1TimeUpdate: Number(
          fieldData.mensajesDeNovedad.tiempoRecordatorio1.split(" ")[0]
        ),
        reminder1Unit:
          fieldData.mensajesDeNovedad.tiempoRecordatorio1.split(" ")[1],
        reminder2TimeUpdate: Number(
          fieldData.mensajesDeNovedad.tiempoNoSolucionado.split(" ")[0]
        ),
        reminder2Unit:
          fieldData.mensajesDeNovedad.tiempoNoSolucionado.split(" ")[1],
      },

      offerDays: {
        minDay: fieldData.diasDeOfrecimiento.diaMinimo,
        maxDay: fieldData.diasDeOfrecimiento.diaMaximo,
      },

      specialActions: {
        autoUpdate: fieldData.accionesEspeciales.subirADropi === "si",
      },
    };

    return parsedData;
  } catch (error) {
    return {};
  }
};
