
export const fetchFlowSummary = async (range = 'yesterday') => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockResponse = {
    data: [{
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
      avg_resolve_time: 0
    }],
    status: "ok"
  };

  return mockResponse.data[0]?.flow_ns || null;
};

export const fetchTeamInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockResponse = {
    data: {
      id: 184769,
      name: "Asistente logístico Chile",
      image: "https://ui-avatars.com/api?name=Asistente+log%C3%ADstico+Chile&color=ffffff&background=3357e3",
      owner_id: 97259,
      owner_email: "integraciones@chateapro.app"
    },
    status: "ok"
  };

  return mockResponse.data?.id || null;
};

const WORKSPACE_CONFIG_API = {
  BASE_URL: "https://workspace-wizard-config-service-26551171030.us-east1.run.app/api/workspace/token",
  
  // Obtener token del workspace
  getToken: (workspaceId) => `${WORKSPACE_CONFIG_API.BASE_URL}/${workspaceId}`,
  
  // Guardar token del workspace
  saveToken: (workspaceId) => `${WORKSPACE_CONFIG_API.BASE_URL}/${workspaceId}`
};

/**
 * Limpiar token removiendo "Bearer " si existe
 */
const cleanToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  
  // Remover "Bearer " del inicio (case insensitive)
  const cleaned = token.replace(/^bearer\s+/i, '').trim();
  
  console.log(`[WorkspaceService] Token limpiado: ${token.substring(0, 10)}... → ${cleaned.substring(0, 10)}...`);
  
  return cleaned;
};

/**
 * Validar si un token tiene formato válido
 */
const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  const cleaned = cleanToken(token);
  return cleaned && cleaned.length >= 32 && /^[A-Za-z0-9]+$/.test(cleaned);
};

/**
 * Verificar si un workspace tiene token configurado
 */
export const checkWorkspaceToken = async (workspaceId) => {
  try {
    if (!workspaceId) {
      throw new Error('WorkspaceId es requerido');
    }

    console.log(`[WorkspaceService] Consultando token para workspace: ${workspaceId}`);
    
    const response = await fetch(WORKSPACE_CONFIG_API.getToken(workspaceId), {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    });

    console.log(`[WorkspaceService] Respuesta: ${response.status}`);

    if (response.status === 200) {
      const responseText = await response.text();
      console.log(`[WorkspaceService] Token recibido (raw):`, responseText.substring(0, 20) + '...');
      
      let token = responseText.trim();
      
      // Si parece ser JSON, parsearlo
      if (token.startsWith('{') || token.startsWith('[')) {
        try {
          const data = JSON.parse(token);
          token = data.token || data.data?.token || data;
        } catch (jsonError) {
          // Es texto plano, usar directamente
        }
      }
      
      // Limpiar token (remover Bearer si existe)
      const cleanedToken = cleanToken(token);
      
      if (isValidTokenFormat(cleanedToken)) {
        console.log(`[WorkspaceService] Token válido encontrado`);
        return {
          success: true,
          hasToken: true,
          token: cleanedToken,
          workspaceId
        };
      } else {
        console.warn(`[WorkspaceService] Token con formato inválido`);
        return {
          success: false,
          hasToken: false,
          error: "Token con formato inválido"
        };
      }
      
    } else if (response.status === 404) {
      console.log(`[WorkspaceService] Workspace sin configurar (404)`);
      return {
        success: true,
        hasToken: false,
        error: "Workspace no configurado",
        workspaceId
      };
      
    } else {
      const errorText = await response.text().catch(() => 'Error desconocido');
      console.error(`[WorkspaceService] Error ${response.status}:`, errorText);
      
      return {
        success: false,
        hasToken: false,
        error: `Error ${response.status}: ${errorText}`
      };
    }
    
  } catch (error) {
    console.error('[WorkspaceService] Error en checkWorkspaceToken:', error);
    return {
      success: false,
      hasToken: false,
      error: error.message
    };
  }
};

/**
 * Guardar token para un workspace
 */
export const saveWorkspaceToken = async (workspaceId, token) => {
  try {
    if (!workspaceId) {
      throw new Error('WorkspaceId es requerido');
    }
    
    if (!token) {
      throw new Error('Token es requerido');
    }

    // Limpiar y validar token
    const cleanedToken = cleanToken(token);
    if (!isValidTokenFormat(cleanedToken)) {
      throw new Error('Token con formato inválido. Debe tener al menos 32 caracteres alfanuméricos');
    }

    console.log(`[WorkspaceService] Guardando token para workspace: ${workspaceId}`);
    
    const response = await fetch(WORKSPACE_CONFIG_API.saveToken(workspaceId), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanedToken}`
      },
      body: JSON.stringify({
      })
    });

    console.log(`[WorkspaceService] Respuesta al guardar: ${response.status}`);

    if (response.status === 201) {
      console.log(`[WorkspaceService] Token guardado exitosamente`);
      return {
        success: true,
        message: "Token guardado exitosamente",
        workspaceId,
        token: cleanedToken
      };
      
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Error desconocido' };
      }
      
      console.error(`[WorkspaceService] Error al guardar:`, errorData);
      
      return {
        success: false,
        error: errorData.message || `Error ${response.status}`,
        details: errorData
      };
    }
    
  } catch (error) {
    console.error('[WorkspaceService] Error en saveWorkspaceToken:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Validar token localmente (formato)
 */
export const validateTokenFormat = (token) => {
  const cleaned = cleanToken(token);
  return isValidTokenFormat(cleaned);
};

/**
 * Obtener token limpio
 */
export const getCleanToken = (token) => {
  return cleanToken(token);
};

/* 
// VERSIONES REALES (comentadas por problemas CORS)
import { getAuthToken } from '../utils/authCookies';

export const fetchFlowSummary = async (range = 'yesterday') => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const response = await fetch(`https://chateapro.app/api/flow-summary?range=${range}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data[0]?.flow_ns || null;
  } catch (error) {
    console.error('Error en fetchFlowSummary:', error);
    throw error;
  }
};

export const fetchTeamInfo = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const response = await fetch('https://chateapro.app/api/team-info', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data?.id || null;
  } catch (error) {
    console.error('Error en fetchTeamInfo:', error);
    throw error;
  }
};
*/