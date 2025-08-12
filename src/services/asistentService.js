import apiClient from "../config/api";
import tokenPadre from "../secret/tokenPadre";

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

export const installTemplate = async (workspaceId, payload) => {
  try {
    const { template_ns } = payload;

    const response = await apiClient.post(
      `/api/assistants/${workspaceId}/install-assistant`,
      {
        template_ns: template_ns,
      }
    );

    if (response.data.status === "ok") {
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

// Versión real de los métodos
/*
export const fetchInstalledAgents = async () => {
  try {
    if (!tokenPadre) throw new Error('No se encontró tokenPadre');

    const response = await fetch('https://chateapro.app/api/templates', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenPadre}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data?.map(t => t.template_ns) || [];
  } catch (error) {
    console.error('Error en fetchInstalledAgents:', error);
    throw error;
  }
};

export const installTemplate = async (workspaceId, { flow_ns, template_ns }) => {
  try {
    if (!tokenPadre) throw new Error('No se encontró tokenPadre');

    const response = await fetch(
      `https://www.uchat.com.au/api/partner/workspace/${workspaceId}/install-template`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${tokenPadre}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flow_ns, template_ns })
      }
    );

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data;
  } catch (error) {
    console.error('Error en installTemplate:', error);
    throw error;
  }
};
*/
