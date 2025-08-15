import { createContext, useState, useContext } from "react";

const CarritosContext = createContext();

export const CarritosProvider = ({ children }) => {
  const [carritoData, setCarritoData] = useState({
    identidad_asistente: {
      nombre_asesor: "",
      adaptacion_lenguaje: "",
      metodo_anticancelacion: "",
    },
    datos_tienda: {
      nombre_tienda: "",
      ubicacion_tienda:
        "somos una tienda virtual de la más alta calidad con cobertura nacional",
      pais: "",
      ofrecer_descuento: "si",
      descuento_maximo: 10,
      mensaje_descuento:
        "Espera... nuestro gerente nos acaba de recordar que podrías ser nuestro cliente número 1000 😍.",
    },
    datos_logisticos: {
      tiempos_envio:
        "de 2 a 5 días hábiles para ciudades principales y de 5 a 7 días para ciudades no principales",
      metodo_pago: {
        contraentrega: "no",
        anticipado: "no",
        datos_pago_anticipado: "",
      },
      transportadoras_disponibles: "envia, servientrega, interrapidísimo, etc",
    },
    mensajes_recuperacion: {
      posicion_imagen: 1,
      tiempo_recordatorio_1: "5 minutos",
      tiempo_recordatorio_2: "10 minutos",
      mensaje_agradecimiento:
        "Gracias por recuperar tu carrito. Próximamente te enviaremos el número de guía de tu pedido.",
    },
    envio_correos: {
      activar_envio: "no",
      asunto: "Recupera tu carrito",
      contenido:
        "Hola Prueba, Notamos que dejaste algunos productos en tu carrito. ¡Aún estás a tiempo de completar tu compra antes de que se agoten! Haz clic abajo para retomarla fácilmente:",
    },
    acciones_especiales: {
      subida_automatica: "",
      origen_datos: "",
    },
  });

  const updateCarritoData = (section, data) => {
    setCarritoData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <CarritosContext.Provider
      value={{
        carritoData,
        updateCarritoData,
        setCarritoData,
      }}
    >
      {children}
    </CarritosContext.Provider>
  );
};

export const useCarritos = () => {
  const context = useContext(CarritosContext);
  if (!context) {
    throw new Error("useCarritos debe usarse dentro de CarritosProvider");
  }
  return context;
};
