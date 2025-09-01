import { ASSISTANT_TEMPLATE_NS } from "./constants/assistants";

export const installAssistantErrorsData = {
  [ASSISTANT_TEMPLATE_NS.LOGISTIC]: {
    412: {
      tittle: "WhatsApp no está enlazado",
      message:
        "Debes tener enlazada una cuenta de WhatsApp para poder instalar el asistente logístico.",
      tutorial: {
        message: "Mira cómo enlazar tu cuenta de WhatsApp",
        href: "/#",
      },
    },
  },
};
