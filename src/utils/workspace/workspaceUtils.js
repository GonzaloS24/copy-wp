/**
 * Busca y extrae el ID del workspace desde la URL del navegador
 */
export const getWorkspaceIdFromUrl = () => {
  try {
    const url = new URL(window.location.href);

    // Diferentes formas de encontrar el workspace en la URL
    const patterns = [
      /workspaceId[=:](\d+)/, // workspaceId=123 o workspaceId:123
      /workspace[=:](\d+)/, // workspace=123 o workspace:123
      /\/workspace\/(\d+)/, // /workspace/123
      /\/(\d+)$/, // termina con /123
    ];

    const fullUrl = url.pathname + url.search;

    for (const pattern of patterns) {
      const match = fullUrl.match(pattern);
      if (match && match[1]) {
        console.log(`[Workspace] WorkspaceId encontrado: ${match[1]}`);
        return match[1];
      }
    }

    console.warn("[Workspace] No se encontró workspaceId en la URL:", url.href);
    return null;
  } catch (error) {
    console.error("[Workspace] Error al extraer workspaceId:", error);
    return null;
  }
};

/**
 * Limpia un token quitando "Bearer " del inicio si lo tiene
 * Algunos tokens vienen como "Bearer abc123" y necesitamos solo "abc123"
 */
export const cleanToken = (token) => {
  if (!token || typeof token !== "string") return null;

  const cleaned = token.replace(/^bearer\s+/i, "").trim();

  return cleaned;
};

/**
 * Verifica si un token tiene el formato correcto
 * Debe tener al menos 32 caracteres y solo letras/números
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== "string") return false;

  const cleaned = cleanToken(token);
  return cleaned && cleaned.length >= 32 && /^[A-Za-z0-9]+$/.test(cleaned);
};

/**
 * Valida el formato de un token
 */
export const validateTokenFormat = (token) => {
  const cleaned = cleanToken(token);
  return isValidTokenFormat(cleaned);
};

/**
 * Obtiene un token limpio (sin "Bearer ")
 */
export const getCleanToken = (token) => {
  return cleanToken(token);
};
