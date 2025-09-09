import apiClient from "../../config/api";

const CARRITO_ENDPOINTS = {
  SAVE_CONFIGURATION: "/api/assistants/set-info",
  GET_CONFIGURATION:
    "/api/assistants/get-info/[Carritos]%20Configuracion",
};

export class CarritoService {
  static async saveConfiguration(configData) {
    try {
      if (!configData || typeof configData !== "object") {
        throw new Error("Los datos de configuración son requeridos");
      }

      const payload = {
        name: "[Carritos] Configuracion",
        value: JSON.stringify(configData),
      };

      console.log("🔍 JSON generado:", payload);

      const response = await apiClient.put(
        CARRITO_ENDPOINTS.SAVE_CONFIGURATION,
        payload
      );

      console.log("✅ Configuración guardada exitosamente");

      return {
        success: true,
        message: "Configuración guardada correctamente",
        data: response.data,
      };
    } catch (error) {
      console.error("Error en CarritoService.saveConfiguration:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  static async getConfiguration() {
    try {
      console.log("🔍 Obteniendo configuración de carritos...");

      const response = await apiClient.get(CARRITO_ENDPOINTS.GET_CONFIGURATION);

      // Verificar si hay datos y si el array no está vacío
      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        console.log(
          "⚠️ No hay configuración guardada, usando valores por defecto"
        );
        return {
          success: true,
          message: "No hay configuración guardada",
          data: null,
        };
      }

      // Obtener el primer elemento del array
      const configItem = response.data[0];

      // Verificar si hay un value para parsear
      if (!configItem.value || configItem.value.trim() === "") {
        console.log(
          "⚠️ Configuración existe pero está vacía, usando valores por defecto"
        );
        return {
          success: true,
          message: "Configuración vacía",
          data: null,
        };
      }

      // Parsear el JSON del value
      const parsedData = JSON.parse(configItem.value);

      console.log("✅ Configuración cargada exitosamente:", parsedData);

      return {
        success: true,
        message: "Configuración cargada correctamente",
        data: parsedData,
      };
    } catch (error) {
      console.error("Error en CarritoService.getConfiguration:", error);

      // Si es error de parsing JSON, devolver null para usar defaults
      if (error instanceof SyntaxError) {
        console.log("⚠️ Error parseando JSON, usando valores por defecto");
        return {
          success: true,
          message: "Error en formato de configuración",
          data: null,
        };
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
