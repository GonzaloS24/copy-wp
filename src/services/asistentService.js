import apiClient from "../config/api";

// Mapeo de template_ns a las claves del endpoint
const TEMPLATE_TO_KEY_MAP = {
  zkyasze0q8tquwio0fnirvbdgcp0luva: "logistico",
  mjvisba1ugmhdttuqnbpvjtocbllluea: "carritos",
  "6oaa4zwoupsuuhmsdregbas919fhocgh": "whatsapp",
  ugmasxccs5mpnzqj4rb1ex9rdvld4diu: "comentarios",
  byu2drpxtxhmcbgvyuktxrjyofbmemha: "marketing",
};

// obtener asistentes instalados
export const getInstalledAssistants = async () => {
  try {
    console.log("[AsistentService] Consultando asistentes instalados...");

    const response = await apiClient.get(`/api/assistants`);
    console.log("[AsistentService] Respuesta del endpoint:", response.data);

    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn(
      "[AsistentService] Respuesta sin datos, usando estructura vacía"
    );
    return {
      logistico: false,
      marketing: false,
      carritos: false,
      comentarios: false,
      whatsapp: false,
    };
  } catch (error) {
    console.error("[AsistentService] Error al consultar asistentes:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al cargar los asistentes instalados"
    );
  }
};

// Función para verificar si un asistente específico está instalado
export const isAssistantInstalled = (templateNs, installedData) => {
  const key = TEMPLATE_TO_KEY_MAP[templateNs];
  if (!key) {
    console.warn(
      `[AsistentService] Template ${templateNs} no encontrado en el mapeo`
    );
    return false;
  }

  return installedData[key] === true;
};

// Función para mapear los datos de instalación a los asistentes base
export const updateAssistantsWithInstallationStatus = (
  baseAsistentes,
  installedData
) => {
  return baseAsistentes.map((asistente) => {
    // Mantener estado especial para asistentes que siempre deben estar disponibles
    if (asistente.status === "proximamente") {
      return asistente;
    }

    const isInstalled = isAssistantInstalled(
      asistente.template_ns,
      installedData
    );

    return {
      ...asistente,
      status: isInstalled ? "instalado" : "no-instalado",
      buttonText: isInstalled ? "Configurar" : "Instalar",
      buttonAction: isInstalled ? "configure" : "install",
    };
  });
};

export const installTemplate = async (workspaceId, payload) => {
  try {
    const { template_ns } = payload;

    console.log(
      `[AsistentService] Instalando template ${template_ns} en workspace ${workspaceId}`
    );

    const response = await apiClient.post(
      `/api/assistants/${workspaceId}/install-assistant`,
      {
        template_ns: template_ns,
      }
    );

    if (response.data.status === "ok") {
      console.log(
        `[AsistentService] Template ${template_ns} instalado exitosamente`
      );
      return {
        workspace_id: workspaceId,
        template_ns: template_ns,
        status: "installed",
        installed_at: new Date().toISOString(),
      };
    } else {
      throw new Error("Error en la instalación del asistente");
    }
  } catch (error) {
    console.error("Error en installTemplate:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error al instalar el asistente"
    );
  }
};

// Función legacy mantenida para compatibilidad
export const fetchInstalledAgents = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockResponse = {
    data: [
      {
        id: 41979,
        template_ns: "zkyasze0q8tquwio0fnirvbdgcp0luva",
        name: "Asistente logístico de Chile 🚚",
      },
      {
        id: 41980,
        template_ns: "6oaa4zwoupsuuhmsdregbas919fhocgh",
        name: "Asistente de Ventas WhatsApp",
      },
    ],
    status: "ok",
  };

  return mockResponse.data.map((t) => t.template_ns);
};
