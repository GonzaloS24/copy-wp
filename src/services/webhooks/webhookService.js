import apiClient from "../../config/api";

const WEBHOOK_ENDPOINTS = {
  GET_WEBHOOKS: "/api/assistants/carts/webhook",
};

export class WebhookService {
  static async getWebhooks() {
    try {
      console.log("🔍 Obteniendo webhook de carritos...");

      const response = await apiClient.get(WEBHOOK_ENDPOINTS.GET_WEBHOOKS);

      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        throw new Error("No se encontró el webhook de carritos");
      }

      // Buscar el webhook específico de carritos
      const carritoWebhook = response.data.find(
        (webhook) => webhook.name === "🛒 Asistente de Carritos 🛒"
      );

      if (!carritoWebhook || !carritoWebhook.url) {
        throw new Error("Webhook de Asistente de Carritos no encontrado");
      }

      console.log("✅ Webhook de carritos encontrado:", carritoWebhook.url);

      return {
        success: true,
        message: "Webhook obtenido correctamente",
        data: carritoWebhook.url, // Solo retornamos la URL
      };
    } catch (error) {
      console.error("Error en WebhookService.getWebhooks:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
