import apiClient from "../../config/api";

const CARRITO_ENDPOINTS = {
  SAVE_CONFIGURATION: "/api/flow/set-bot-fields-by-name",
};

export class CarritoService {
  static async saveConfiguration(configData) {
    try {
      if (!configData || typeof configData !== "object") {
        throw new Error("Los datos de configuración son requeridos");
      }

      const payload = {
        data: [
          {
            name: "[Carritos] Configuracion",
            value: JSON.stringify(configData),
          },
        ],
      };

      console.log("📦 Guardando configuración de carritos:", payload);

      // Usar apiClient en lugar de fetch
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
