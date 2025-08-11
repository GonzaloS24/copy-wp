export const mapCarritoDataToApiFormat = (carritoData) => {
  const formatTimeString = (time, unit) => {
    if (!time || !unit) return "";
    return `${time} ${unit}`;
  };

  const formatBoolean = (value) => {
    if (typeof value === "boolean") {
      return value ? "si" : "no";
    }
    if (typeof value === "string") {
      return value === "true" || value === "si" ? "si" : "no";
    }
    return "no";
  };

  return {
    identidad_asistente: {
      nombre_asesor: carritoData.identidad_asistente?.nombre_asesor || "",
      adaptacion_lenguaje:
        carritoData.identidad_asistente?.adaptacion_lenguaje || "",
      metodo_anticancelacion:
        carritoData.identidad_asistente?.metodo_anticancelacion || "",
    },
    datos_tienda: {
      nombre_tienda: carritoData.datos_tienda?.nombre_tienda || "",
      ubicacion_tienda: carritoData.datos_tienda?.ubicacion_tienda || "",
      pais: carritoData.datos_tienda?.pais || "",
      ofrecer_descuento: formatBoolean(
        carritoData.datos_tienda?.ofrecer_descuento
      ),
      descuento_maximo: carritoData.datos_tienda?.descuento_maximo || "",
      mensaje_descuento: carritoData.datos_tienda?.mensaje_descuento || "",
    },
    datos_logisticos: {
      tiempos_envio: carritoData.datos_logisticos?.tiempos_envio || "",
      metodo_pago: {
        contraentrega: formatBoolean(
          carritoData.datos_logisticos?.metodo_pago?.contraentrega
        ),
        anticipado: formatBoolean(
          carritoData.datos_logisticos?.metodo_pago?.anticipado
        ),
        datos_pago_anticipado:
          carritoData.datos_logisticos?.metodo_pago?.datos_pago_anticipado ||
          "",
      },
      transportadoras_disponibles:
        carritoData.datos_logisticos?.transportadoras_disponibles || "",
    },
    mensajes_recuperacion: {
      posicion_imagen: carritoData.mensajes_recuperacion?.posicion_imagen || "",
      tiempo_recordatorio_1:
        carritoData.mensajes_recuperacion?.tiempo_recordatorio_1 || "",
      tiempo_recordatorio_2:
        carritoData.mensajes_recuperacion?.tiempo_recordatorio_2 || "",
      mensaje_agradecimiento:
        carritoData.mensajes_recuperacion?.mensaje_agradecimiento || "",
    },
    envio_correos: {
      activar_envio: formatBoolean(carritoData.envio_correos?.activar_envio),
      asunto: carritoData.envio_correos?.asunto || "",
      contenido: carritoData.envio_correos?.contenido || "",
    },
    acciones_especiales: {
      subida_automatica: formatBoolean(
        carritoData.acciones_especiales?.subida_automatica
      ),
      origen_datos: carritoData.acciones_especiales?.origen_datos || "",
    },
  };
};
