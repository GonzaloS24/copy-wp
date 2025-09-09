import { createContext, useState, useContext } from "react";
import { CarritoService } from "../services/carritos";

const CarritosContext = createContext();

export const CarritosProvider = ({ children }) => {
  const defaultData = {
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
      tiempo_recordatorio_3: "15 minutos",
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
      imagenes_producto: "",
      origen_datos: "",
    },
  };

  const [carritoData, setCarritoData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  const updateCarritoData = (section, data) => {
    setCarritoData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const loadCarritoData = async () => {
    try {
      setIsLoading(true);
      console.log("🔍 Cargando datos del carrito...");

      const result = await CarritoService.getConfiguration();

      if (result.success && result.data) {
        // Mergear datos cargados con valores por defecto para campos faltantes
        const mergedData = {
          identidad_asistente: {
            ...defaultData.identidad_asistente,
            ...result.data.identidad_asistente,
          },
          datos_tienda: {
            ...defaultData.datos_tienda,
            ...result.data.datos_tienda,
          },
          datos_logisticos: {
            ...defaultData.datos_logisticos,
            ...result.data.datos_logisticos,
            metodo_pago: {
              ...defaultData.datos_logisticos.metodo_pago,
              ...result.data.datos_logisticos?.metodo_pago,
            },
          },
          mensajes_recuperacion: {
            ...defaultData.mensajes_recuperacion,
            ...result.data.mensajes_recuperacion,
          },
          envio_correos: {
            ...defaultData.envio_correos,
            ...result.data.envio_correos,
          },
          acciones_especiales: {
            ...defaultData.acciones_especiales,
            ...result.data.acciones_especiales,
          },
        };

        setCarritoData(mergedData);
        console.log("✅ Datos del carrito cargados y aplicados");
      } else {
        console.log(
          "⚠️ No hay configuración previa, usando valores por defecto"
        );
        // Ya tiene los valores por defecto, no necesita hacer nada
      }
    } catch (error) {
      console.error("❌ Error cargando datos del carrito:", error);
      // En caso de error, mantener valores por defecto
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    setCarritoData(defaultData);
  };

  return (
    <CarritosContext.Provider
      value={{
        carritoData,
        updateCarritoData,
        setCarritoData,
        loadCarritoData,
        resetToDefaults,
        isLoading,
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
