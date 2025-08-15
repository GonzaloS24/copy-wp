import { ASSISTANT_NAMES } from "../utils/constants/assistants";

// Función para generar títulos basados en la ruta
export const getPageTitle = (pathname, params = {}) => {
  const segments = pathname.split("/").filter(Boolean);

  // Rutas principales
  if (pathname === "/" || pathname === "") {
    return "Dashboard";
  }

  // Configuración de asistentes
  if (pathname.startsWith("/configurar/") && params.template_ns) {
    const assistantName = ASSISTANT_NAMES[params.template_ns] || "Desconocido";
    return `Instalación Asistente ${assistantName}`;
  }

  // Configuración de productos
  if (pathname === "/productos-config") {
    return "Configuración Asistente Ventas WhatsApp";
  }

  // Agregar producto
  if (pathname === "/agregando") {
    return "Agregar Nuevo Producto";
  }

  // Editar producto
  if (pathname.startsWith("/producto/")) {
    const productId = segments[1];
    return `Configuración Producto ${productId}`;
  }

  // Asistente de carritos
  if (pathname === "/asistente-carritos") {
    return "Configuración Asistente Carritos";
  }

  // Asistente logístico
  if (pathname === "/asistente-logistico") {
    return "Configuración Asistente Logístico";
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
