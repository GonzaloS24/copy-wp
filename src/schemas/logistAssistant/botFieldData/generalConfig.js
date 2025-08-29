import z from "zod/v4";

export const datosDeLaTiendaSchema = z.object({
  pais: z.string(),
  nombre: z.string(),
  enlace: z.url(),
  ubicacion: z.string(),
  politicasDeGarantia: z.string(),
  origenDeDatos: z.string(),
});

export const comportamientoDeLaIaSchema = z.object({
  tipoDeEnvio: z.string(),
  adaptacionDelLenguaje: z.string(),
  saludoDelAsesor: z.string(),
  metodoAnticancelacion: z.string(),
  restricciones: z.string(),
});

export const vozConIaSchema = z.object({
  usarAudio: z.string(),
  token: z.string(),
  idDeLaVoz: z.string(),
  estabilidad: z.string(),
  similaridad: z.string(),
  estilo: z.string(),
  speakerBoost: z.string(),

  reglas: z.object({
    responderAudioConAudio: z.string(),
    cantidadMaximaDeAudio: z.string(),
  }),
});

export const generalConfigBotFieldSchema = z.object({
  datosDeLaTienda: datosDeLaTiendaSchema,
  comportamientoDeLaIa: comportamientoDeLaIaSchema,
  vozConIa: vozConIaSchema,
});
