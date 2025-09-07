import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({
    info: {
      productType: "SIMPLE",
      isActive: false,
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
      promptText: "", // Para prompt libre
      promptContent: { text: "", metadata: {} },
      showTooltip: { libre: false, guiado: false },
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
  });

  const [validationState, setValidationState] = useState({
    info: {
      touchedFields: {
        name: false,
        price: false,
        image: false,
        dta_prompt: false
      },
    },
    messageWel: {
      touchedFields: {
        initialMessage: false,
        entryQuestion: false,
      },
    },
    freePrompt: {
      touchedFields: {
        promptText: false,
        contextualizacion: false,
        fichaTecnica: false,
        guionConversacional: false,
        posiblesSituaciones: false,
        reglasIA: false,
      },
    },
    reminder: {
      touchedFields: {
        reminder1Time: false,
        reminder1Text: false,
        reminder2Time: false,
        reminder2Text: false,
      },
    },
  });

  const updateProductData = (section, data) => {
    if (section === "") {
      setProductData((prev) => ({
        ...prev,
        ...data,
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...data,
        },
      }));
    }
  };

  const updateValidationState = (section, data) => {
    setValidationState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const resetProductData = (newData) => {
    setProductData(newData);
    setValidationState({
      info: { 
        touchedFields: { 
          name: false, 
          price: false, 
          image: false 
        } 
      },
      messageWel: { 
        touchedFields: { 
          initialMessage: false, 
          entryQuestion: false 
        } 
      },
      freePrompt: { 
        touchedFields: { 
          promptText: false, 
          contextualizacion: false, 
          fichaTecnica: false, 
          guionConversacional: false, 
          posiblesSituaciones: false, 
          reglasIA: false 
        }
      },
      reminder: { 
        touchedFields: { 
          reminder1Time: false, 
          reminder1Text: false, 
          reminder2Time: false, 
          reminder2Text: false 
        }
      }
    });
  };

  const getPromptDataForAPI = () => {
    const freePromptData = productData.freePrompt;
    const tipoPrompt = freePromptData.promptType || "libre";

    const promptData = {
      tipo_de_prompt: tipoPrompt,
      prompt_libre: "",
      prompt_guiado_contextualizacion: "",
      prompt_guiado_ficha_tecnica: "",
      prompt_guiado_guion_conversacional: "",
      prompt_guiado_posibles_situaciones: "",
      prompt_guiado_reglas: "",
    };

    if (tipoPrompt === "libre") {
      promptData.prompt_libre =
        freePromptData.promptText || freePromptData.promptContent?.text || "";
    } else if (tipoPrompt === "guiado") {
      const guideData = freePromptData.guidePromptData || {};
      promptData.prompt_guiado_contextualizacion =
        guideData.contextualizacion || "";
      promptData.prompt_guiado_ficha_tecnica = guideData.fichaTecnica || "";
      promptData.prompt_guiado_guion_conversacional =
        guideData.guionConversacional || "";
      promptData.prompt_guiado_posibles_situaciones =
        guideData.posiblesSituaciones || "";
      promptData.prompt_guiado_reglas = guideData.reglasIA || "";
    }

    console.log("Datos del prompt para API:", promptData);
    console.log("Datos del contexto completo:", freePromptData);

    return promptData;
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        updateProductData,
        validationState,
        updateValidationState,
        getPromptDataForAPI,
        resetProductData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);