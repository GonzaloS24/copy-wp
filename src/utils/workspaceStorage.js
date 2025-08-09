import Cookies from 'js-cookie';

const WORKSPACE_ID_KEY = 'current_workspace_id';
const WORKSPACE_TOKEN_KEY = 'workspace_token';

/**
 * Guardar workspaceId en cookies
 */
export const setCurrentWorkspace = (workspaceId) => {
  if (!workspaceId) return false;
  
  Cookies.set(WORKSPACE_ID_KEY, workspaceId, { 
    expires: 365, 
    secure: true, 
    sameSite: 'strict' 
  });
  
  console.log(`[Workspace] WorkspaceId guardado: ${workspaceId}`);
  return true;
};

/**
 * Obtener workspaceId actual desde cookies
 */
export const getCurrentWorkspace = () => {
  const workspaceId = Cookies.get(WORKSPACE_ID_KEY);
  console.log(`[Workspace] WorkspaceId actual: ${workspaceId || 'ninguno'}`);
  return workspaceId;
};

/**
 * Guardar token del workspace en cookies
 */
export const setWorkspaceToken = (token) => {
  if (!token) return false;
  
  Cookies.set(WORKSPACE_TOKEN_KEY, token, { 
    expires: 365, 
    secure: true, 
    sameSite: 'strict' 
  });
  
  console.log(`[Workspace] Token guardado`);
  return true;
};

/**
 * Obtener token del workspace desde cookies
 */
export const getWorkspaceToken = () => {
  const token = Cookies.get(WORKSPACE_TOKEN_KEY);
  console.log(`[Workspace] Token actual: ${token ? 'encontrado' : 'no encontrado'}`);
  return token;
};

/**
 * Verificar si hay token válido
 */
export const hasWorkspaceToken = () => {
  const token = getWorkspaceToken();
  return !!(token && token.length >= 32);
};

/**
 * Limpiar workspace y token
 */
export const clearWorkspace = () => {
  Cookies.remove(WORKSPACE_ID_KEY);
  Cookies.remove(WORKSPACE_TOKEN_KEY);
  console.log(`[Workspace] Workspace y token eliminados`);
};