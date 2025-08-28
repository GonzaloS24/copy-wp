import z from "zod/v4";

const AIAudioSchema = z.object({
  useAudioAI: z.boolean(),
  token: z.string(),
  voiceId: z.string(),
  respondAudioWithAudio: z.boolean(),
  maxAudioCount: z.coerce.number().int().positive(),
  stability: z.coerce.number().positive(),
  similarity: z.coerce.number().positive(),
  style: z.coerce.number().positive(),
  useSpeakerBoost: z.string(),
});

const AIBehaviourSchema = z.object({
  sendingType: z.string(),
  languageAdaptation: z.string(),
  advisorGreeting: z.string(),
  cancellationPrevention: z.string(),
  generalRestrictions: z.string(),
});

const storeDataSchema = z.object({
  storeCountry: z.string().min(1),
  storeName: z.string().min(1),
  storeLink: z.string().min(1),
  storeLocation: z.string(),
  warrantyPolicies: z.string(),
  dataSource: z.string(),
});

export const generalConfigSchema = z.object({
  AIAudio: AIAudioSchema,
  AIBehaviour: AIBehaviourSchema,
  storeData: storeDataSchema,
});
