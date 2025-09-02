import logisticIcon from "../../assets/assistantIcons/Asistente_Logistico.png";
import cartIcon from "../../assets/assistantIcons/Asistente_Carritos Abandonados.png";
import whatsappSalesIcon from "../../assets/assistantIcons/Asistente_Ventas Wp.png";
import commentsIcon from "../../assets/assistantIcons/Asistente_Comentarios.png";
import remarketingIcon from "../../assets/assistantIcons/Asistente_Remarketing.png";
import aiCallsIcon from "../../assets/assistantIcons/Asistente_Llamadas IA.png";

// Template NS de los asistentes
export const ASSISTANT_TEMPLATE_NS = {
  LOGISTIC: "rlgblvshr3kx37gv6jlaroervpsfheqp",
  CARTS: "9vmvwba67ckqncrkpkae0xjuhpd1ccxc",
  WHATSAPP_SALES: "5slfaku8clibtzei0gdjifkunktfjeei",
  COMMENTS: "ugmasxccs5mpnzqj4rb1ex9rdvld4diu",
  REMARKETING: "byu2drpxtxhmcbgvyuktxrjyofbmemha",
  AI_CALLS: "hy2mzxzi0sm0ijnrpeiqxprrluimt83v",
};

// Template NS de la reinstalación de flujos
export const MESSAGES_REINSTALL_TEMPLATE_NS = {
  LOGISTIC: {
    CONFIRMATIONS: "aqbetdbvdvw2p6zrskerjdyy63vtwpvs",
    TRACKING: "3xngorwijib8edwjk2m5p4b7qyfsiglt",
    UPDATES: "o48njvom2najdvartxaj8jukohiomlpt",
  },
  CARTS: {
    UPDATES: "v1lviytxq8u44vpfbw6z9qgbi0jf77m8",
  },
};

// Nombres legibles de los asistentes
export const ASSISTANT_NAMES = {
  [ASSISTANT_TEMPLATE_NS.LOGISTIC]: "Logístico",
  [ASSISTANT_TEMPLATE_NS.CARTS]: "Carritos Abandonados",
  [ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES]: "Ventas WhatsApp",
  [ASSISTANT_TEMPLATE_NS.COMMENTS]: "Comentarios",
  [ASSISTANT_TEMPLATE_NS.REMARKETING]: "Remarketing",
  [ASSISTANT_TEMPLATE_NS.AI_CALLS]: "Llamadas IA",
};

// Mapeo para el endpoint de estado de instalación
export const TEMPLATE_TO_KEY_MAP = {
  [ASSISTANT_TEMPLATE_NS.LOGISTIC]: "logistico",
  [ASSISTANT_TEMPLATE_NS.CARTS]: "carritos",
  [ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES]: "whatsapp",
  [ASSISTANT_TEMPLATE_NS.COMMENTS]: "comentarios",
  [ASSISTANT_TEMPLATE_NS.REMARKETING]: "marketing",
};

// Rutas de configuración para cada asistente
export const ASSISTANT_CONFIG_ROUTES = {
  [ASSISTANT_TEMPLATE_NS.LOGISTIC]: "/asistente-logistico",
  [ASSISTANT_TEMPLATE_NS.CARTS]: "/asistente-carritos",
  [ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES]: "/productos-config",
  [ASSISTANT_TEMPLATE_NS.COMMENTS]: "/productos-config",
  [ASSISTANT_TEMPLATE_NS.REMARKETING]: "/productos-config",
};

// Configuración completa de cada asistente
export const ASSISTANT_CONFIG = {
  [ASSISTANT_TEMPLATE_NS.LOGISTIC]: {
    id: 1,
    template_ns: ASSISTANT_TEMPLATE_NS.LOGISTIC,
    title: "Asistente logístico",
    description: "Confirmación, seguimiento de guías y solución de novedades",
    icon: (
      <img
        src={logisticIcon}
        alt="Asistente Logístico"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: ASSISTANT_CONFIG_ROUTES[ASSISTANT_TEMPLATE_NS.LOGISTIC],
    installConfig: {
      title:
        "Descubre cómo este asistente puede ayudarte a automatizar el seguimiento logístico",
      videoDescription:
        "Aprende a configurar el seguimiento de guías y solución de novedades.",
      benefits: [
        "Automatiza el seguimiento de envíos",
        "Notifica novedades automáticamente",
        "Integración con principales transportistas",
      ],
      defaultTab: "generalConfig",
    },
  },
  [ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES]: {
    id: 3,
    template_ns: ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES,
    title: "Asistente de Ventas WhatsApp",
    description: "Escala tus ventas por WhatsApp y convierte a más del 10%",
    icon: (
      <img
        src={whatsappSalesIcon}
        alt="Asistente Ventas WhatsApp"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: ASSISTANT_CONFIG_ROUTES[ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES],
    installConfig: {
      title:
        "Descubre cómo este asistente puede ayudarte a escalar tus ventas por WhatsApp automáticamente",
      videoDescription: "Aprende a automatizar tus conversaciones de venta.",
      benefits: [
        "Responde automáticamente a consultas",
        "Segmenta clientes por interés",
        "Envía catálogos automáticamente",
        "Convierte más del 10% de leads",
      ],
      defaultTab: "productos",
    },
  },
  [ASSISTANT_TEMPLATE_NS.CARTS]: {
    id: 2,
    template_ns: ASSISTANT_TEMPLATE_NS.CARTS,
    title: "Asistente de carritos",
    description: "Recupera hasta el 50% de tus carritos abandonados",
    icon: (
      <img
        src={cartIcon}
        alt="Asistente Carritos Abandonados"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: ASSISTANT_CONFIG_ROUTES[ASSISTANT_TEMPLATE_NS.CARTS],
    // configRoute: null, // No disponible aún
    // isComingSoon: true, // Marcador especial para próximamente
    installConfig: {
      title:
        "Descubre cómo este asistente puede ayudarte a recuperar ventas automáticamente",
      videoDescription: "Aprende a recuperar carritos abandonados.",
      benefits: [
        "Recupera hasta un 20% de carritos abandonados",
        "Instalación rápida en segundos",
        "Mensajes automáticos y personalizados",
        "Aumenta tus ventas sin esfuerzo adicional",
      ],
    },
  },
  [ASSISTANT_TEMPLATE_NS.COMMENTS]: {
    id: 4,
    template_ns: ASSISTANT_TEMPLATE_NS.COMMENTS,
    title: "Asistente de comentarios",
    description: "Elimina comentarios negativos y vende desde Messenger",
    icon: (
      <img
        src={commentsIcon}
        alt="Asistente Comentarios"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: null, // No disponible aún
    isComingSoon: true, // Marcador especial para próximamente
    installConfig: {
      title:
        "Descubre cómo este asistente puede ayudarte a gestionar comentarios automáticamente",
      videoDescription: "Aprende a automatizar la gestión de comentarios.",
      benefits: [
        "Elimina comentarios negativos automáticamente",
        "Convierte comentarios en ventas",
        "Respuesta automática en redes sociales",
        "Mejora tu reputación online",
      ],
      defaultTab: "productos",
    },
  },
  [ASSISTANT_TEMPLATE_NS.REMARKETING]: {
    id: 5,
    template_ns: ASSISTANT_TEMPLATE_NS.REMARKETING,
    title: "Asistente de remarketing",
    description:
      "Convierte a los clientes que ya te han comprado en fieles a tu marca",
    icon: (
      <img
        src={remarketingIcon}
        alt="Asistente Remarketing"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: null, // No disponible aún
    isComingSoon: true, // Marcador especial para próximamente
    installConfig: {
      title:
        "Descubre cómo este asistente puede ayudarte con remarketing automático",
      videoDescription: "Aprende a automatizar el remarketing.",
      benefits: [
        "Reactiva clientes inactivos",
        "Campañas automáticas personalizadas",
        "Aumenta el valor de vida del cliente",
        "Fideliza a tus compradores",
      ],
      defaultTab: "productos",
    },
  },
  [ASSISTANT_TEMPLATE_NS.AI_CALLS]: {
    id: 6,
    template_ns: ASSISTANT_TEMPLATE_NS.AI_CALLS,
    title: "Asistente de llamadas IA",
    description:
      "Muy pronto disponible para llamar a tus clientes con inteligencia artificial",
    icon: (
      <img
        src={aiCallsIcon}
        alt="Asistente Llamadas IA"
        className="w-full h-full object-contain"
      />
    ),
    configRoute: null, // No disponible aún
    isComingSoon: true, // Marcador especial para próximamente
    installConfig: {
      title: "Próximamente: Llamadas automáticas con IA",
      videoDescription: "Función en desarrollo.",
      benefits: [
        "Llamadas automáticas con IA",
        "Conversaciones naturales",
        "Disponible las 24 horas",
        "Próximamente disponible",
      ],
    },
  },
};

// Array de asistentes base para compatibilidad
export const getBaseAssistants = () => {
  return Object.values(ASSISTANT_CONFIG).map((config) => {
    // El asistente de llamadas IA siempre debe estar como "próximamente"
    if (config.isComingSoon) {
      return {
        ...config,
        status: "proximamente",
        buttonText: "Próximamente",
        buttonAction: "coming-soon",
      };
    }

    return {
      ...config,
      status: "no-instalado",
      buttonText: "Instalar",
      buttonAction: "install",
    };
  });
};

// Función helper para obtener configuración de un asistente
export const getAssistantConfig = (template_ns) => {
  return ASSISTANT_CONFIG[template_ns] || null;
};

// Función helper para obtener nombre de un asistente
export const getAssistantName = (template_ns) => {
  return ASSISTANT_NAMES[template_ns] || "Desconocido";
};

// Función helper para obtener ruta de configuración
export const getAssistantConfigRoute = (template_ns) => {
  return ASSISTANT_CONFIG_ROUTES[template_ns] || null;
};
