import apiClient from "../../config/api";

const CARRITO_ENDPOINTS = {
  SAVE_CONFIGURATION: "/api/assistants/set-info",
};

export class CarritoService {
  static async saveConfiguration(configData) {
    try {
      if (!configData || typeof configData !== "object") {
        throw new Error("Los datos de configuración son requeridos");
      }

      const payload = {
        name: "[Carritos] Configuracion General",
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
}
