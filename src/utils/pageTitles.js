// Mapeo de template_ns a nombres de asistentes
export const ASSISTANT_NAMES = {
  zkyasze0q8tquwio0fnirvbdgcp0luva: "Logístico",
  mjvisba1ugmhdttuqnbpvjtocbllluea: "Carritos Abandonados",
  "6oaa4zwoupsuuhmsdregbas919fhocgh": "Ventas WhatsApp",
  ugmasxccs5mpnzqj4rb1ex9rdvld4diu: "Comentarios",
  byu2drpxtxhmcbgvyuktxrjyofbmemha: "Remarketing",
  hy2mzxzi0sm0ijnrpeiqxprrluimt83v: "Llamadas IA",
};

// Función para generar títulos basados en la ruta
export const getPageTitle = (pathname, params = {}) => {
  // Extraer información de la ruta
  const segments = pathname.split("/").filter(Boolean);

  // Rutas principales
  if (pathname === "/" || pathname === "") {
    return "Dashboard";
  }

  // Configuración de asistentes
  if (pathname.startsWith("/configurar/") && params.template_ns) {
    const assistantName = ASSISTANT_NAMES[params.template_ns] || "Desconocido";
    return `Instalación del Asistente ${assistantName}`;
  }

  // Configuración de productos
  if (pathname === "/productos-config") {
    return "Configuración del Asistente Ventas WhatsApp";
  }

  // Agregar producto
  if (pathname === "/agregando") {
    return "Agregar Nuevo Producto";
  }

  // Editar producto
  if (pathname.startsWith("/producto/")) {
    const productId = segments[1];
    return `Configuración del Producto ${productId}`;
  }

  // Asistente de carritos
  if (pathname === "/asistente-carritos") {
    return "Configuración del Asistente Carritos Abandonados";
  }

  // Asistente logístico
  if (pathname === "/asistente-logistico") {
    return "Configuración del Asistente Logístico";
  }

  // Integraciones
  if (pathname === "/integraciones") {
    return "Integraciones";
  }

  // Fallback para rutas no reconocidas
  const routeTitles = {
    "productos-config": "Configuración de Productos",
    "asistente-carritos": "Asistente de Carritos",
    "asistente-logistico": "Asistente Logístico",
    integraciones: "Integraciones",
  };

  const mainRoute = segments[0];
  return routeTitles[mainRoute] || "Dashboard";
};

// Hook personalizado para obtener el título de la página
export const usePageTitle = () => {
  const pathname = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  // Extraer template_ns de la URL si existe
  const urlParams = {};
  const pathSegments = pathname.split("/");
  if (pathSegments[1] === "configurar" && pathSegments[2]) {
    urlParams.template_ns = pathSegments[2];
  }

  return getPageTitle(pathname, urlParams);
};
