import z from "zod/v4";

const AIAudioSchema = z.object({
  useAudioAI: z.boolean(),
  token: z.string(),
  voiceId: z.string(),
  respondAudioWithAudio: z.boolean(),
  maxAudioCount: z.int().positive(),
  stability: z.number().positive(),
  similarity: z.number().positive(),
  style: z.number().positive(),
  useSpeakerBoost: z.string(),
  testText: z.string(),
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
