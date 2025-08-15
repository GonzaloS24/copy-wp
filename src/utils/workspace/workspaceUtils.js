import { getCurrentWorkspace, setCurrentWorkspace } from "./workspaceStorage";

const extractWorkspaceIdFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const fullUrl = urlObj.pathname + urlObj.search + urlObj.hash;

    const patterns = [
      /[?&]workspaceId[=:](\d+)/i,
      /[?&]workspace[=:](\d+)/i,
      /\/accounts\/(\d+)#?/,
      /\/workspace\/(\d+)#?/,
      /\/workspaces\/(\d+)#?/,
      /#(\d+)/,
      /\/(\d+)(?:[#?]|$)/,
    ];

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const match = fullUrl.match(pattern);

      if (match && match[1]) {
        console.log(
          `[Workspace] WorkspaceId encontrado con patrón ${i + 1}: ${match[1]}`
        );
        return match[1];
      }
    }

    const allNumbers = fullUrl.match(/\d+/g);
    if (allNumbers && allNumbers.length > 0) {
      const lastNumber = allNumbers[allNumbers.length - 1];
      console.log(
        `[Workspace] WorkspaceId encontrado como último recurso: ${lastNumber}`
      );
      return lastNumber;
    }

    return null;
  } catch (error) {
    console.error("[Workspace] Error al extraer workspaceId:", error);
    return null;
  }
};

/**
 * Busca y extrae el ID del workspace desde la URL del navegador
 */
export const getWorkspaceIdFromUrl = () => {
  try {
    // CASO 1: No está embebida (desarrollo local)
    if (!window.parent || window.parent === window) {
      console.log("[Workspace] App no embebida, usando URL actual");
      return extractWorkspaceIdFromUrl(window.location.href);
    }

    // CASO 2: Está embebida - intentar acceso directo
    try {
      const parentUrl = window.parent.location.href;
      const workspaceId = extractWorkspaceIdFromUrl(parentUrl);
      if (workspaceId) {
        console.log(
          "[Workspace] WorkspaceId encontrado de ventana padre:",
          workspaceId
        );
        return workspaceId;
      }
    } catch (corsError) {
      console.log(
        "[Workspace] CORS detectado, usando URL actual como fallback"
      );
    }

    // CASO 3: Fallback a URL actual
    return extractWorkspaceIdFromUrl(window.location.href);
  } catch (error) {
    console.error("[Workspace] Error general:", error);
    return null;
  }
};

// FUNCIÓN ASÍNCRONA PARA COMUNICACIÓN CON IFRAME
export const initializeWorkspaceFromParent = () => {
  return new Promise((resolve) => {
    let resolved = false;
    let timeoutId;

    // Primero intentar método síncrono
    const syncResult = getWorkspaceIdFromUrl();
    if (syncResult && (!window.parent || window.parent === window)) {
      // Si no está embebida, usar resultado síncrono
      resolve(syncResult);
      return;
    }

    // Si está embebida y hay CORS, intentar postMessage
    if (window.parent && window.parent !== window) {
      const handleMessage = (event) => {
        if (resolved) return;

        if (event.data && event.data.type === "WORKSPACE_ID_RESPONSE") {
          resolved = true;
          clearTimeout(timeoutId);
          window.removeEventListener("message", handleMessage);

          const receivedId = event.data.workspaceId;
          console.log(
            "[Workspace] WorkspaceId recibido via postMessage:",
            receivedId
          );

          // Actualizar cookies si es diferente
          const currentId = getCurrentWorkspace();
          if (currentId !== receivedId) {
            setCurrentWorkspace(receivedId);
            console.log(
              "[Workspace] Cookies actualizadas con nuevo workspaceId"
            );
          }

          resolve(receivedId);
        }
      };

      window.addEventListener("message", handleMessage);

      // Solicitar workspaceId al padre
      window.parent.postMessage(
        {
          type: "REQUEST_WORKSPACE_ID",
        },
        "*"
      );

      // Timeout de 3 segundos
      timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          window.removeEventListener("message", handleMessage);
          console.warn(
            "[Workspace] Timeout al solicitar workspaceId, usando fallback"
          );

          // Usar resultado síncrono como fallback
          const fallbackId = syncResult || getCurrentWorkspace();
          resolve(fallbackId);
        }
      }, 3000);
    } else {
      // No está embebida, usar resultado síncrono
      resolve(syncResult);
    }
  });
};

export const initializeWorkspace = async () => {
  try {
    console.log("[Workspace] Inicializando workspace...");

    const workspaceId = await initializeWorkspaceFromParent();

    if (workspaceId) {
      // Verificar si ya existe en cookies
      const currentWorkspace = getCurrentWorkspace();

      if (currentWorkspace !== workspaceId) {
        console.log(
          `[Workspace] Actualizando workspace: ${currentWorkspace} → ${workspaceId}`
        );
        setCurrentWorkspace(workspaceId);
      } else {
        console.log(`[Workspace] Workspace ya configurado: ${workspaceId}`);
      }

      return workspaceId;
    } else {
      console.warn("[Workspace] No se pudo obtener workspaceId");
      return getCurrentWorkspace();
    }
  } catch (error) {
    console.error("[Workspace] Error al inicializar:", error);
    return getCurrentWorkspace();
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
