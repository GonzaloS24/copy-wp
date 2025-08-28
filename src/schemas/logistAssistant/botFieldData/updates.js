import z from "zod/v4";

export const diasDeOfrecimientoSchema = z.object({
  diaMinimo: z.string(),
  diaMaximo: z.string(),
});

export const accionesEspecialesSchema = z.object({
  subirADropi: z.string(),
});

export const mensajesDeNovedadSchema = z.object({
  tiempoRecordatorio1: z.string(),
  tiempoNoSolucionado: z.string(),
});

export const updatesBotFieldSchema = z.object({
  diasDeOfrecimiento: diasDeOfrecimientoSchema,
  accionesEspeciales: accionesEspecialesSchema,
  mensajesDeNovedad: mensajesDeNovedadSchema,
});
