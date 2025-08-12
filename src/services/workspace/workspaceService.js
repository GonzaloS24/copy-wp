import apiClient from "../../config/api";
import { cleanToken, isValidTokenFormat } from "../../utils/workspace";

const WORKSPACE_ENDPOINTS = {
  TOKEN: (workspaceId) => `/api/workspace/token/${workspaceId}`,
  PREPARE: (workspaceId) => `/api/workspace/prepare/${workspaceId}`,
};

// preparacion del espacio de trabajo
export const workspacePrepare = async (workspaceId) => {
  try {
    if (!workspaceId) {
      console.error("[WorkspaceService] WorkspaceId es requerido");
      return null;
    }

    const response = await apiClient.post(
      WORKSPACE_ENDPOINTS.PREPARE(workspaceId)
    );

    console.log(
      `[WorkspaceService] Workspace preparado exitosamente: ${workspaceId}`
    );
    console.log(`[WorkspaceService] Flow NS: ${response.data.flow_ns}`);

    return response.data;
  } catch (error) {
    console.error(
      "[WorkspaceService] Error preparando workspace:",
      error.message
    );
    return null;
  }
};

/**
 * Verificar si un workspace tiene token configurado
 */
export const checkWorkspaceToken = async (workspaceId) => {
  try {
    if (!workspaceId) {
      throw new Error("WorkspaceId es requerido");
    }

    console.log(
      `[WorkspaceService] Consultando token para workspace: ${workspaceId}`
    );

    const response = await apiClient.get(
      WORKSPACE_ENDPOINTS.TOKEN(workspaceId)
    );

    console.log(`[WorkspaceService] Respuesta: ${response.status}`);

    if (response.status === 200) {
      let token = response.data;

      // Si es un objeto, extraer el token
      if (typeof token === "object") {
        token = token.token || token.data?.token || token;
      }

      // Si es string, usar directamente
      if (typeof token === "string") {
        token = token.trim();
      }

      // Limpiar token (remover Bearer si existe)
      const cleanedToken = cleanToken(token);

      if (isValidTokenFormat(cleanedToken)) {
        console.log(`[WorkspaceService] Token válido encontrado`);
        return {
          success: true,
          hasToken: true,
          token: cleanedToken,
          workspaceId,
        };
      } else {
        console.warn(`[WorkspaceService] Token con formato inválido`);
        return {
          success: false,
          hasToken: false,
          error: "Token con formato inválido",
        };
      }
    } else if (response.status === 404) {
      console.log(`[WorkspaceService] Workspace sin configurar (404)`);
      return {
        success: true,
        hasToken: false,
        error: "Workspace no configurado",
        workspaceId,
      };
    }
  } catch (error) {
    console.error("[WorkspaceService] Error en checkWorkspaceToken:", error);

    if (error.response?.status === 404) {
      return {
        success: true,
        hasToken: false,
        error: "Workspace no configurado",
      };
    }

    return {
      success: false,
      hasToken: false,
      error: error.message,
    };
  }
};

/**
 * Guardar token para un workspace
 */
export const saveWorkspaceToken = async (workspaceId, token) => {
  try {
    if (!workspaceId) {
      throw new Error("WorkspaceId es requerido");
    }

    if (!token) {
      throw new Error("Token es requerido");
    }

    // Limpiar y validar token
    const cleanedToken = cleanToken(token);
    if (!isValidTokenFormat(cleanedToken)) {
      throw new Error(
        "Token con formato inválido. Debe tener al menos 32 caracteres alfanuméricos"
      );
    }

    console.log(
      `[WorkspaceService] Guardando token para workspace: ${workspaceId}`
    );

    const response = await apiClient.post(
      WORKSPACE_ENDPOINTS.TOKEN(workspaceId),
      {},
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      }
    );

    console.log(`[WorkspaceService] Respuesta al guardar: ${response.status}`);

    if (response.status === 201) {
      console.log(`[WorkspaceService] Token guardado exitosamente`);
      return {
        success: true,
        message: "Token guardado exitosamente",
        workspaceId,
        token: cleanedToken,
      };
    } else {
      return {
        success: false,
        error: `Error ${response.status}`,
        details: response.data,
      };
    }
  } catch (error) {
    console.error("[WorkspaceService] Error en saveWorkspaceToken:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const fetchFlowSummary = async (range = "yesterday") => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockResponse = {
    data: [
      {
        flow_ns: "f174417",
        summary_date: "2025-07-11",
        total_bot_users: 6,
        day_active_bot_users: 0,
        day_new_bot_users: 0,
        day_total_messages: 0,
        day_in_messages: 0,
        day_out_messages: 0,
        day_agent_messages: 0,
        day_note_messages: 0,
        day_assigned: 0,
        day_done: 0,
        day_email_sent: 0,
        day_email_open: 0,
        avg_agent_response_time: 0,
        avg_resolve_time: 0,
      },
    ],
    status: "ok",
  };

  return mockResponse.data[0]?.flow_ns || null;
};

export const fetchTeamInfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockResponse = {
    data: {
      id: 184769,
      name: "Asistente logístico Chile",
      image:
        "https://ui-avatars.com/api?name=Asistente+log%C3%ADstico+Chile&color=ffffff&background=3357e3",
      owner_id: 97259,
      owner_email: "integraciones@chateapro.app",
    },
    status: "ok",
  };

  return mockResponse.data?.id || null;
};
