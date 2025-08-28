import z from "zod/v4";

const ganchosDeVentaSchema = z.object({
  guiaGenerada: z.string(),
  enReparto: z.string(),
  enOficina: z.string(),
  entregado: z.string(),
});

const tiemposEnvioSchema = z.object({
  desdeGuiaGenerada: z.string(),
  desdeEnReparto: z.string(),
});

const mensajesDeSeguimientoSchema = z.object({
  tiempoRecordatorioOficina: z.string(),
});

export const trackingBotFieldSchema = z.object({
  ganchosDeVenta: ganchosDeVentaSchema,
  tiemposEnvio: tiemposEnvioSchema,
  mensajesDeSeguimiento: mensajesDeSeguimientoSchema,
});
