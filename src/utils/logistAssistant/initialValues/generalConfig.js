export const AIAudioInitialValues = {
  useAudioAI: false,
  token: "",
  voiceId: "",
  respondAudioWithAudio: false,
  maxAudioCount: 3,
  stability: 0.5,
  similarity: 0.7,
  style: 0.5,
  useSpeakerBoost: "si",
  testText: "",
};

export const AIBehaviourInitialValues = {
  sendingType: "1 solo mensaje",
  languageAdaptation:
    "Hablar de forma cercana pero profesional, usar un lenguaje claro y directo, evitar tecnicismos",
  advisorGreeting:
    "Entiendo tu consulta, voy a conectarte con uno de nuestros asesores especializados para brindarte la mejor atención",
  cancellationPrevention:
    "Mostrar empatía, identificar la razón específica de cancelación, ofrecer alternativas como cambio de producto o fecha de entrega, destacar beneficios únicos",
  generalRestrictions:
    "Nunca proporcionar información personal de otros clientes, no hacer promesas que no pueda cumplir, mantener siempre un tono respetuoso, no insistir más de 3 veces en la misma propuesta",
};

export const storeDataInitialValues = {
  storeCountry: "",
  storeName: "",
  storeLink: "",
  storeLocation:
    "Somos una tienda virtual de la más alta calidad con 5 años de experiencia y más de 3000 clientes satisfechos",
  warrantyPolicies:
    "Aceptamos devoluciones dentro de los primeros 10 días hábiles",
  dataSource: "shopify",
};

export const generalConfigInitialValues = {
  AIAudio: AIAudioInitialValues,
  AIBehaviour: AIBehaviourInitialValues,
  storeData: storeDataInitialValues,
};
