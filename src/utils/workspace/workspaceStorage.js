const WORKSPACE_ID_KEY = "current_workspace_id";
const WORKSPACE_TOKEN_KEY = "auth_token";

/**
 * Guarda el ID del workspace en localStorage
 */
export const setCurrentWorkspace = (workspaceId) => {
  if (!workspaceId) return false;

  try {
    localStorage.setItem(WORKSPACE_ID_KEY, workspaceId);
    console.log(
      `[Workspace] WorkspaceId guardado en localStorage: ${workspaceId}`
    );
    return true;
  } catch (error) {
    console.error("[Workspace] Error guardando workspaceId:", error);
    return false;
  }
};

/**
 * Obtiene el ID del workspace actual desde localStorage
 */
export const getCurrentWorkspace = () => {
  try {
    const workspaceId = localStorage.getItem(WORKSPACE_ID_KEY);
    console.log(`[Workspace] WorkspaceId actual: ${workspaceId || "ninguno"}`);
    return workspaceId;
  } catch (error) {
    console.error("[Workspace] Error leyendo workspaceId:", error);
    return null;
  }
};

/**
 * Guarda el token de autenticación en localStorage
 */
export const setWorkspaceToken = (token) => {
  if (!token) return false;

  try {
    localStorage.setItem(WORKSPACE_TOKEN_KEY, token);
    console.log(`[Workspace] Token guardado en localStorage`);
    return true;
  } catch (error) {
    console.error("[Workspace] Error guardando token:", error);
    return false;
  }
};

/**
 * Obtiene el token de autenticación desde localStorage
 */
export const getWorkspaceToken = () => {
  try {
    const token = localStorage.getItem(WORKSPACE_TOKEN_KEY);
    console.log(
      `[Workspace] Token actual: ${token ? "encontrado" : "no encontrado"}`
    );
    return token;
  } catch (error) {
    console.error("[Workspace] Error leyendo token:", error);
    return null;
  }
};

/**
 * Verifica si hay un token válido guardado
 */
export const hasWorkspaceToken = () => {
  const token = getWorkspaceToken();
  return !!(token && token.length >= 32);
};

/**
 * Elimina toda la información del workspace
 */
export const clearWorkspace = () => {
  try {
    localStorage.removeItem(WORKSPACE_ID_KEY);
    localStorage.removeItem(WORKSPACE_TOKEN_KEY);
    console.log(`[Workspace] Workspace y token eliminados de localStorage`);
  } catch (error) {
    console.error("[Workspace] Error limpiando workspace:", error);
  }
};
