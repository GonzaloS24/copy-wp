import Cookies from "js-cookie";

const WORKSPACE_ID_KEY = "current_workspace_id";
const WORKSPACE_TOKEN_KEY = "workspace_token";

/**
 * Guarda el ID del workspace en las cookies del navegador
 */
export const setCurrentWorkspace = (workspaceId) => {
  if (!workspaceId) return false;

  Cookies.set(WORKSPACE_ID_KEY, workspaceId, {
    expires: 365,
    secure: true,
    sameSite: "strict",
  });

  console.log(`[Workspace] WorkspaceId guardado: ${workspaceId}`);
  return true;
};

/**
 * Obtiene el ID del workspace actual desde las cookies
 */
export const getCurrentWorkspace = () => {
  const workspaceId = Cookies.get(WORKSPACE_ID_KEY);
  console.log(`[Workspace] WorkspaceId actual: ${workspaceId || "ninguno"}`);
  return workspaceId;
};

/**
 * Guarda el token de autenticación en las cookies del navegador
 */
export const setWorkspaceToken = (token) => {
  if (!token) return false;

  Cookies.set(WORKSPACE_TOKEN_KEY, token, {
    expires: 365,
    secure: true,
    sameSite: "strict",
  });

  console.log(`[Workspace] Token guardado`);
  return true;
};

/**
 * Obtiene el token de autenticación desde las cookies
 */
export const getWorkspaceToken = () => {
  const token = Cookies.get(WORKSPACE_TOKEN_KEY);
  console.log(
    `[Workspace] Token actual: ${token ? "encontrado" : "no encontrado"}`
  );
  return token;
};

/**
 * Verifica si hay un token válido guardado
 * Chequea que existe y que tiene al menos 32 caracteres
 */
export const hasWorkspaceToken = () => {
  const token = getWorkspaceToken();
  return !!(token && token.length >= 32);
};

/**
 * Elimina toda la información del workspace (ID y token)
 * Se usa cuando el usuario cierra sesión o cambia de workspace
 */
export const clearWorkspace = () => {
  Cookies.remove(WORKSPACE_ID_KEY);
  Cookies.remove(WORKSPACE_TOKEN_KEY);
  console.log(`[Workspace] Workspace y token eliminados`);
};
