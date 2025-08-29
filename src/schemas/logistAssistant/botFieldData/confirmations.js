import z from "zod/v4";

export const mensajesDeConfirmacionSchema = z.object({
  posicionImagen: z.string(),
  tiempoR1: z.string(),
  tiempoR2: z.string(),
  mensajeAgradecimiento: z.string(),
});

export const tiemposEnvioSchema = z.object({
  tiempos: z.string(),
});

export const analisisDireccionSchema = z.object({
  evaluarDireccion: z.string(),
  promptAnalisis: z.string(),
});

export const validacionesOrdenSchema = z.object({
  confirmacionAutomatica: z.string(),

  validarEntregas: z.object({
    estaActivo: z.string(),
    porcentajeMinimo: z.string(),
    minimoDeOrdenes: z.string(),
  }),

  validarFlete: z.object({
    estaActivo: z.string(),
    fleteMinimo: z.string(),
  }),
});

export const confirmationsBotFieldSchema = z.object({
  mensajesDeConfirmacion: mensajesDeConfirmacionSchema,
  tiemposEnvio: tiemposEnvioSchema,
  analisisDireccion: analisisDireccionSchema,
  validacionesOrden: validacionesOrdenSchema,
});
