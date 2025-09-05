import { maxIntSize, maxTextAreaSize, maxTextSize } from "./generalSizes";

export const AIAudioMaxSizes = {
  token: maxTextSize,
  voiceId: maxTextSize,
  maxAudioCount: maxIntSize,
  stability: maxIntSize,
  similarity: maxIntSize,
  style: maxIntSize,
  testText: maxTextAreaSize,
};

export const AIBehaviourMaxSizes = {
  sendingType: maxTextSize,
  languageAdaptation: maxTextAreaSize,
  advisorGreeting: maxTextAreaSize,
  cancellationPrevention: maxTextAreaSize,
  generalRestrictions: maxTextAreaSize,
};

export const storeDataMaxSizes = {
  storeName: maxTextSize,
  storeLink: maxTextSize,
  storeLocation: maxTextAreaSize,
  warrantyPolicies: maxTextAreaSize,
  dataSource: maxTextSize,
};

export const generalConfigMaxSizes = {
  AIAudio: AIAudioMaxSizes,
  AIBehaviour: AIBehaviourMaxSizes,
  storeData: storeDataMaxSizes,
};
