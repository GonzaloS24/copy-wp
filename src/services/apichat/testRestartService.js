import apiClient from "../../config/api";
import apichat from "../../config/apichat";

const ENDPOINTS = {
  GET_KEYWORDS: "/api/assistants/ventas-wp/trigger-field",
  RESTART_CHAT: "/api/chats",
};

export class TestRestartService {
  static async getProductKeywords(productId) {
    try {
      console.log(
        `[TestRestart] Obteniendo palabras clave para producto: ${productId}`
      );

      const response = await apiClient.get(ENDPOINTS.GET_KEYWORDS);

      console.log("[TestRestart] Respuesta completa de la API:", response.data);

      if (!response.data || !response.data.success) {
        throw new Error("La API no devolvió una respuesta exitosa");
      }

      const products = response.data.data?.value;
      if (!Array.isArray(products)) {
        throw new Error("No se encontró el array de productos en la respuesta");
      }

      console.log(`[TestRestart] Productos encontrados: ${products.length}`);

      // Buscar el producto específico por productId
      let targetProduct = null;

      // Opción 1: Buscar por índice (si productId es el índice)
      if (productId && !isNaN(productId)) {
        const index = parseInt(productId) - 1;
        if (index >= 0 && index < products.length) {
          targetProduct = products[index];
        }
      }

      // Opción 2: Buscar por nombre que contenga el productId
      if (!targetProduct) {
        targetProduct = products.find(
          (product) => product.name && product.name.includes(productId)
        );
      }

      // Opción 3: Si no se encuentra, tomar el primer producto
      if (!targetProduct && products.length > 0) {
        console.log(
          "[TestRestart] Producto específico no encontrado, usando el primero disponible"
        );
        targetProduct = products[0];
      }

      if (!targetProduct) {
        throw new Error("No se encontraron productos disponibles");
      }

      console.log("[TestRestart] Producto seleccionado:", targetProduct.name);

      // Extraer las palabras clave del campo keyW
      const keyWString = targetProduct.keyW;
      if (!keyWString) {
        throw new Error("El producto no tiene palabras clave definidas");
      }

      // Procesar las palabras clave separadas por comas
      const keywords = keyWString
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k && k !== "");

      if (keywords.length === 0) {
        throw new Error("No se encontraron palabras clave válidas");
      }

      console.log("[TestRestart] Palabras clave extraídas:", keywords);
      console.log("[TestRestart] Primera palabra clave:", keywords[0]);

      return {
        success: true,
        keywords: keywords,
        primaryKeyword: keywords[0], // Retornar solo la primera palabra clave
        productName: targetProduct.name,
        totalProducts: products.length,
      };
    } catch (error) {
      console.error("[TestRestart] Error en getProductKeywords:", error);

      // Manejo de errores con fallback temporal para testing
      if (error.response?.status === 404 || error.code === "ERR_NETWORK") {
        console.log(
          "[TestRestart] Simulando palabras clave debido a error de conexión..."
        );
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
          productName: `Producto simulado ${productId}`,
          totalProducts: 1,
        };
      }

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Error al obtener las palabras clave"
      );
    }
  }

  // Método para reiniciar prueba
  static async restartTest(productId, templateNs, token) {
    try {
      console.log(
        `[TestRestart] Reiniciando prueba para producto: ${productId}`
      );
      console.log(`[TestRestart] Template NS: ${templateNs}`);

      // Preparar los datos
      const requestData = {
        template_ns: templateNs,
        product_id: Number(productId),
        token: token,
      };

      console.log("[TestRestart] Enviando datos al endpoint:", requestData);

      const response = await apichat.delete(ENDPOINTS.RESTART_CHAT, {
        data: requestData,
      });

      console.log("[TestRestart] Respuesta del endpoint:", response.data);
      console.log("[TestRestart] Status de respuesta:", response.status);

      // Para endpoints que retornan 200 sin cuerpo o con cuerpo mínimo
      if (response.status === 200 || response.status === 204) {
        return {
          success: true,
          message: "Chat reiniciado exitosamente",
          newUsername: "prueba",
          productId: productId,
          data: response.data || { status: "success" },
        };
      }

      // Validar respuesta con contenido
      if (response.data && (response.data.success || response.status === 200)) {
        return {
          success: true,
          message: response.data.message || "Prueba reiniciada exitosamente",
          newUsername: "prueba",
          productId: productId,
          data: response.data,
        };
      }

      // Si llega aquí, es una respuesta inesperada
      throw new Error(
        response.data?.message || `Status inesperado: ${response.status}`
      );
    } catch (error) {
      console.error("[TestRestart] Error al reiniciar prueba:", error);

      // Manejo específico de errores de API
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error ${error.response.status}: ${error.response.statusText}`;
        return {
          success: false,
          message: errorMessage,
          statusCode: error.response.status,
        };
      } else if (error.request) {
        // Error de red/conexión
        return {
          success: false,
          message: "Error de conexión con el servidor",
        };
      } else {
        // Otros errores
        return {
          success: false,
          message: error.message || "Error al reiniciar la prueba",
        };
      }
    }
  }
}
