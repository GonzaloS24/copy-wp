/**
 * Utilidad para extraer workspaceId de la URL
 */
export const getWorkspaceIdFromUrl = () => {
  try {
    const url = new URL(window.location.href);
    
    // Buscar workspaceId en la URL
    const patterns = [
      /workspaceId[=:](\d+)/,
      /workspace[=:](\d+)/,
      /\/workspace\/(\d+)/,
      /\/(\d+)$/
    ];
    
    // Buscar en pathname y search
    const fullUrl = url.pathname + url.search;
    
    for (const pattern of patterns) {
      const match = fullUrl.match(pattern);
      if (match && match[1]) {
        console.log(`[Workspace] WorkspaceId encontrado: ${match[1]}`);
        return match[1];
      }
    }
    
    console.warn('[Workspace] No se encontró workspaceId en la URL:', url.href);
    return null;
    
  } catch (error) {
    console.error('[Workspace] Error al extraer workspaceId:', error);
    return null;
  }
};