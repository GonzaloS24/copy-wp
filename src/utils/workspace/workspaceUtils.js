/**
 * Busca y extrae el ID del workspace desde la URL del navegador
 */
export const getWorkspaceIdFromUrl = () => {
  return new Promise((resolve) => {
    let resolved = false;

    const extractWorkspaceId = (url) => {
      try {
        const urlObj = new URL(url);
        const fullUrl = urlObj.pathname + urlObj.search + urlObj.hash;

        const patterns = [
          /\/accounts\/(\d+)#?/,
          /[?&]workspaceId[=:](\d+)/i,
          /[?&]workspace[=:](\d+)/i,
          /\/workspace\/(\d+)#?/,
          /\/workspaces\/(\d+)#?/,
          /#(\d+)/,
          /\/(\d+)#?(?:\/|$)/,
        ];

        for (const pattern of patterns) {
          const match = fullUrl.match(pattern);
          if (match && match[1]) {
            return match[1];
          }
        }

        // Último recurso: cualquier número en la URL
        const allNumbers = fullUrl.match(/\d+/g);
        if (allNumbers && allNumbers.length > 0) {
          return allNumbers[allNumbers.length - 1];
        }

        return null;
      } catch (error) {
        return null;
      }
    };

    try {
      // CASO 1: No está embebida (desarrollo local)
      if (!window.parent || window.parent === window) {
        console.log("[Workspace] App no embebida, usando URL actual");
        const workspaceId = extractWorkspaceId(window.location.href);
        resolve(workspaceId);
        return;
      }

      // CASO 2: Está embebida - intentar acceso directo primero
      try {
        const parentUrl = window.parent.location.href;
        const workspaceId = extractWorkspaceId(parentUrl);
        if (workspaceId) {
          console.log(
            "[Workspace] WorkspaceId encontrado directamente de ventana padre:",
            workspaceId
          );
          resolve(workspaceId);
          return;
        }
      } catch (corsError) {
        console.log("[Workspace] CORS detectado, usando postMessage");
      }

      // CASO 3: Está embebida con CORS - usar postMessage
      const handleMessage = (event) => {
        if (resolved) return;

        if (event.data && event.data.type === "WORKSPACE_ID_RESPONSE") {
          resolved = true;
          window.removeEventListener("message", handleMessage);
          console.log(
            "[Workspace] WorkspaceId recibido via postMessage:",
            event.data.workspaceId
          );
          resolve(event.data.workspaceId);
        }
      };

      window.addEventListener("message", handleMessage);

      // Solicitar workspaceId a la ventana padre
      window.parent.postMessage(
        {
          type: "REQUEST_WORKSPACE_ID",
        },
        "*"
      );

      // Timeout de 3 segundos
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          window.removeEventListener("message", handleMessage);
          console.warn(
            "[Workspace] Timeout al solicitar workspaceId, usando URL actual como fallback"
          );

          // Fallback: usar URL actual
          const fallbackId = extractWorkspaceId(window.location.href);
          resolve(fallbackId);
        }
      }, 3000);
    } catch (error) {
      console.error("[Workspace] Error:", error);
      resolve(null);
    }
  });
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
