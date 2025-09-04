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
      initialMessage: "¡Hola! Soy Laura, bienvenida a Master Shop.",
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
      template: "",
    },
    remarketing2: {
      time: 5,
      unit: "dias",
      template: "",
    },
    templates: [
      { value: "plantilla1", label: "Plantilla 1" },
      { value: "plantilla2", label: "Plantilla 2" },
      { value: "plantilla3", label: "Plantilla 3" },
    ],
  },
  activators: {
    keywords: ["", "", "", "", "", "", ""],
    adIds: ["", "", "", "", "", "", ""],
  },
};