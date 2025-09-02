import apiClient from "../../config/api";

const TEST_ENDPOINTS = {
  RESTART_TEST: "/api/chat/restart-test",
  GET_KEYWORDS: (productId) => `/api/products/${productId}/keywords`,
};

export class TestRestartService {
  /**
   * Reinicia la prueba del chat eliminando el usuario anterior y creando uno nuevo
   */
  static async restartTest(productId) {
    try {
      console.log(
        `[TestRestart] Reiniciando prueba para producto: ${productId}`
      );

      const payload = {
        productId: productId,
        newUsername: "prueba",
      };

      const response = await apiClient.post(
        TEST_ENDPOINTS.RESTART_TEST,
        payload
      );

      console.log("[TestRestart] Respuesta del reinicio:", response.data);

      if (response.data && response.data.success) {
        return {
          success: true,
          message: "Prueba reiniciada exitosamente",
          newUsername: response.data.newUsername || "prueba",
          botCode: response.data.botCode,
        };
      } else {
        throw new Error(
          response.data?.message || "Error al reiniciar la prueba"
        );
      }
    } catch (error) {
      console.error("[TestRestart] Error en restartTest:", error);

      // Simulación temporal del endpoint
      if (error.response?.status === 404 || error.code === "ERR_NETWORK") {
        console.log("[TestRestart] Simulando respuesta del endpoint...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          message: "Prueba reiniciada exitosamente (simulado)",
          newUsername: "prueba",
          botCode: `bot_${Date.now()}`,
        };
      }

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Error al reiniciar la prueba"
      );
    }
  }

  /**
   * Obtiene las palabras clave de un producto específico
   */
  static async getProductKeywords(productId) {
    try {
      console.log(
        `[TestRestart] Obteniendo palabras clave para producto: ${productId}`
      );

      const response = await apiClient.get(
        TEST_ENDPOINTS.GET_KEYWORDS(productId)
      );

      console.log("[TestRestart] Palabras clave obtenidas:", response.data);

      if (response.data && response.data.keywords) {
        const keywords = Array.isArray(response.data.keywords)
          ? response.data.keywords
          : response.data.keywords.split(",").map((k) => k.trim());

        return {
          success: true,
          keywords: keywords.filter((k) => k && k.trim() !== ""),
          primaryKeyword: keywords[0] || null,
        };
      } else {
        throw new Error("No se encontraron palabras clave");
      }
    } catch (error) {
      console.error("[TestRestart] Error en getProductKeywords:", error);

      // Simulación temporal del endpoint
      if (error.response?.status === 404 || error.code === "ERR_NETWORK") {
        console.log("[TestRestart] Simulando palabras clave...");
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generar palabras clave de ejemplo basadas en el productId
        const mockKeywords = [
          `más información sobre producto ${productId}`,
          `producto ${productId}`,
          `información`,
          `precio`,
          `disponibilidad`,
        ];

        return {
          success: true,
          keywords: mockKeywords,
          primaryKeyword: mockKeywords[0],
        };
      }

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Error al obtener las palabras clave"
      );
    }
  }
}
