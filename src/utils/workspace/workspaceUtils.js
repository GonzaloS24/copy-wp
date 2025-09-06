import { getCurrentWorkspace, setCurrentWorkspace } from "./workspaceStorage";

/**
 * Rutas que NO deben ser consideradas para extraer workspace ID
 */
const EXCLUDED_ROUTES = [
  "/producto/",
  "/productos-config",
  "/agregando",
  "/asistente-carritos",
  "/asistente-logistico",
  "/integraciones",
  "/configurar/",
];

/**
 * Verifica si una URL corresponde a una ruta excluida
 */
const isExcludedRoute = (url) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    return EXCLUDED_ROUTES.some((route) => pathname.startsWith(route));
  } catch (error) {
    console.error("[Workspace] Error verificando ruta excluida:", error);
    return false;
  }
};

const extractWorkspaceIdFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const fullUrl = urlObj.pathname + urlObj.search + urlObj.hash;

    // Si es una ruta excluida, no extraer workspace ID
    if (isExcludedRoute(url)) {
      console.log(`[Workspace] Ruta excluida detectada: ${urlObj.pathname}`);
      return null;
    }

    const patterns = [
      // Patrones específicos para workspace
      /\/accounts\/(\d+)#?/,
      /[?&]workspaceId[=:](\d+)/i,
      /[?&]workspace[=:](\d+)/i,
      /\/workspace\/(\d+)#?/,
      /\/workspaces\/(\d+)#?/,
      // Solo buscar en hash si no hay pathname específico
      /#(\d+)$/,
      // Solo buscar números al final si la URL es muy simple (sin rutas específicas)
      /^\/(\d+)(?:[#?]|$)/,
    ];

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const match = fullUrl.match(pattern);

      if (match && match[1]) {
        // Validación adicional: el workspace ID debe ser de cierta longitud
        const workspaceId = match[1];

        if (workspaceId.length < 3) {
          console.log(`[Workspace] ID muy corto ignorado: ${workspaceId}`);
          continue;
        }

        console.log(
          `[Workspace] WorkspaceId encontrado con patrón ${
            i + 1
          }: ${workspaceId}`
        );
        return workspaceId;
      }
    }

    return null;
  } catch (error) {
    console.error("[Workspace] Error al extraer workspaceId:", error);
    return null;
  }
};

/**
 * Busca el workspace ID desde la URL actual
 */
export const getWorkspaceIdFromUrl = () => {
  try {
    // Intentar obtener de la URL actual primero
    const currentUrl = window.location.href;
    const workspaceId = extractWorkspaceIdFromUrl(currentUrl);

    if (workspaceId) {
      console.log(
        "[Workspace] WorkspaceId encontrado en URL actual:",
        workspaceId
      );
      return workspaceId;
    }

    // Si no está embebida o no se encuentra, intentar acceso directo al padre
    if (window.parent && window.parent !== window) {
      try {
        const parentUrl = window.parent.location.href;
        const parentWorkspaceId = extractWorkspaceIdFromUrl(parentUrl);
        if (parentWorkspaceId) {
          console.log(
            "[Workspace] WorkspaceId encontrado de ventana padre:",
            parentWorkspaceId
          );
          return parentWorkspaceId;
        }
      } catch (corsError) {
        console.log("[Workspace] CORS detectado al acceder a parent.location");
      }
    }

    return null;
  } catch (error) {
    console.error("[Workspace] Error general:", error);
    return null;
  }
};

/**
 * Inicializa el workspace usando postMessage como respaldo
 */
export const initializeWorkspaceFromParent = () => {
  return new Promise((resolve) => {
    // Primero intentar método síncrono
    const syncResult = getWorkspaceIdFromUrl();

    // Si encontramos el workspace o no estamos embebidos, resolver inmediatamente
    if (syncResult || !window.parent || window.parent === window) {
      resolve(syncResult);
      return;
    }

    // Solo usar postMessage si estamos embebidos y no encontramos el workspace
    let resolved = false;
    let timeoutId;

    const handleMessage = (event) => {
      if (resolved) return;

      // Verificar que viene de un dominio confiable
      if (
        !event.origin.includes("chateapro.app") &&
        !event.origin.includes("vercel.app")
      ) {
        return;
      }

      if (event.data && event.data.type === "WORKSPACE_ID_RESPONSE") {
        resolved = true;
        clearTimeout(timeoutId);
        window.removeEventListener("message", handleMessage);

        const receivedId = event.data.workspaceId;
        console.log(
          "[Workspace] WorkspaceId recibido via postMessage:",
          receivedId
        );

        if (receivedId) {
          // Guardar inmediatamente en localStorage
          setCurrentWorkspace(receivedId);
        }

        resolve(receivedId);
      }
    };

    window.addEventListener("message", handleMessage);

    // Solicitar workspaceId al padre
    try {
      window.parent.postMessage({ type: "REQUEST_WORKSPACE_ID" }, "*");
      console.log("[Workspace] Solicitud de workspaceId enviada al padre");
    } catch (error) {
      console.error("[Workspace] Error enviando postMessage:", error);
    }

    timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        window.removeEventListener("message", handleMessage);
        console.warn("[Workspace] Timeout al solicitar workspaceId");

        // Usar localStorage como último recurso
        const fallbackId = getCurrentWorkspace();
        resolve(fallbackId);
      }
    }, 2000);
  });
};

/**
 * Función principal para inicializar el workspace
 */
export const initializeWorkspace = async () => {
  try {
    console.log("[Workspace] Inicializando workspace...");

    // Si estamos en una ruta excluida, usar localStorage directamente
    if (isExcludedRoute(window.location.href)) {
      console.log(
        "[Workspace] Ruta de aplicación detectada, usando localStorage"
      );
      const existingWorkspaceId = getCurrentWorkspace();
      if (existingWorkspaceId) {
        console.log(
          `[Workspace] Usando workspace existente: ${existingWorkspaceId}`
        );
        return existingWorkspaceId;
      }
    }

    const workspaceId = await initializeWorkspaceFromParent();

    if (workspaceId) {
      // Verificar si es diferente al actual
      const currentWorkspace = getCurrentWorkspace();

      if (currentWorkspace !== workspaceId) {
        console.log(
          `[Workspace] Actualizando workspace: ${currentWorkspace} → ${workspaceId}`
        );

        // Si cambia el workspace, limpiar token anterior
        if (currentWorkspace && currentWorkspace !== workspaceId) {
          console.log("[Workspace] Limpiando token del workspace anterior");
          localStorage.removeItem("auth_token");
        }

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
 */
export const cleanToken = (token) => {
  if (!token || typeof token !== "string") return null;
  return token.replace(/^bearer\s+/i, "").trim();
};

/**
 * Verifica si un token tiene el formato correcto
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
