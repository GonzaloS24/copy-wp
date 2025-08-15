/**
 * Busca y extrae el ID del workspace desde la URL del navegador
 */
export const getWorkspaceIdFromUrl = () => {
  try {
    let targetUrl;
    let isEmbedded = false;

    // Intentar obtener la URL de la ventana padre primero
    try {
      if (window.parent && window.parent !== window) {
        targetUrl = window.parent.location.href;
        isEmbedded = true;
        console.log(
          "[Workspace] Aplicación embebida detectada, usando URL padre"
        );
      } else {
        targetUrl = window.location.href;
      }
    } catch (corsError) {
      // Error de CORS - aplicación embebida en diferente dominio
      console.warn(
        "[Workspace] No se puede acceder a URL padre (CORS), usando URL actual"
      );
      targetUrl = window.location.href;
      isEmbedded = true;
    }

    const url = new URL(targetUrl);

    // Combinar pathname, search y hash para buscar en toda la URL
    const fullUrl = url.pathname + url.search + url.hash;

    // Diferentes patrones para encontrar el workspace ID
    const patterns = [
      // Parámetros de query
      /[?&]workspaceId[=:](\d+)/i, // ?workspaceId=123 o &workspaceId=123
      /[?&]workspace[=:](\d+)/i, // ?workspace=123 o &workspace=123

      // En el path
      /\/accounts\/(\d+)#?/,
      /\/accounts\/(\d+)/,
      /\/workspace\/(\d+)#?/,
      /\/workspaces\/(\d+)#?/,

      // Hash al inicio
      /#(\d+)/,

      // Número al final del path
      /\/(\d+)#?(?:\/|$)/,
    ];

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const match = fullUrl.match(pattern);

      if (match && match[1]) {
        console.log(
          `[Workspace] WorkspaceId encontrado con patrón ${i + 1}: ${
            match[1]
          } ${isEmbedded ? "(desde ventana padre)" : "(desde ventana actual)"}`
        );
        return match[1];
      }
    }

    // Si no encuentra nada con los patrones, intenta extraer cualquier número de la URL
    const allNumbers = fullUrl.match(/\d+/g);
    if (allNumbers && allNumbers.length > 0) {
      const lastNumber = allNumbers[allNumbers.length - 1];
      console.log(
        `[Workspace] WorkspaceId encontrado como último recurso: ${lastNumber} ${
          isEmbedded ? "(desde ventana padre)" : "(desde ventana actual)"
        }`
      );
      return lastNumber;
    }

    console.warn(
      `[Workspace] No se encontró workspaceId en la URL: ${url.href} ${
        isEmbedded ? "(ventana padre)" : "(ventana actual)"
      }`
    );
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
