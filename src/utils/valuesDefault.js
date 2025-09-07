export const DEFAULT_VALUES = {
  info: {
    formData: {
      name: "",
      price: "",
      currency: "COP",
      productType: "físico",
      id: "",
      image: "",
      dta_prompt: [],
    },
  },
  messageWel: {
    formData: {
      initialMessage: "¡Hola! Soy Laura, bienvenido a nuestra tienda.",
      entryQuestion:
        "Gracias por interesarte en nuestro producto. Cuéntanos, ¿desde qué ciudad nos escribes?",
    },
    mediaItems: [],
  },
  freePrompt: {
    promptType: "libre",
    promptText: "",
    guidePromptData: {
      contextualizacion: "",
      fichaTecnica: "",
      guionConversacional: "",
      posiblesSituaciones: "",
      reglasIA: "",
    },
  },
  voice: {
    voiceId: "",
    apiKey: "",
    stability: 0.3,
    similarity: 0.7,
    style: 0.5,
    useSpeakerBoost: true,
    useVoiceAI: false,
  },
  reminder: {
    reminder1: {
      time: 30,
      unit: "minutos",
      text: "",
    },
    reminder2: {
      time: 2,
      unit: "horas",
      text: "",
    },
    timeRange: {
      enabled: false,
      minTime: "09:00",
      maxTime: "20:00",
    },
    showTooltips: {
      tooltip1: false,
      tooltip2: false,
    },
  },
  remarketing: {
    remarketing1: {
      time: 3,
      unit: "dias",
    },
    remarketing2: {
      time: 5,
      unit: "dias",
    },
    timeRange: {
      enabled: false,
      minTime: "09:00",
      maxTime: "20:00",
    },
  },
  activators: {
    keywords: ["", "", "", "", "", "", ""],
    adIds: ["", "", "", "", "", "", ""],
  },
};