import { getAuthToken } from "../utils/authCookies";

export class CarritoService {
  static async saveConfiguration(configData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No se encontró token de autenticación");

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

      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Configuración guardada exitosamente");

      return {
        success: true,
        message: "Configuración guardada correctamente",
      };

      /* 
      const response = await fetch('https://chateapro.app/api/flow/set-bot-fields-by-name', {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
      */
    } catch (error) {
      console.error("Error en CarritoService.saveConfiguration:", error);
      throw error;
    }
  }
}
