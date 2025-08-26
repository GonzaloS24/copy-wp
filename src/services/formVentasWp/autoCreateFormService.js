import axios from "axios";
import dropiCredentials from "./Dropi/dropiCredentials";
import openiaCredential from "./Openia/openiaCredential";
import { shopifyGetCredentials } from "../integrations/shopify";
import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getAuthToken } from "../../utils/authCookies";

const autoCreateFormService = {
  async getProductById(productId) {
    try {
      const credentials = await dropiCredentials.getCredentials();
      const authToken = getAuthToken();

      if (!authToken) {
        throw new Error("Authorization token not found in cookies");
      }

      const response = await axios.get(
        `${BACK_BASE_URL}/api/integrations/dropi/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "dropi-integration-key": credentials.api_key,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching product from Dropi:", error);
      throw error;
    }
  },

  async generateJson(productData) {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error("Authorization token not found in cookies");
      }

      const { api_key: openaiApiKey } = await openiaCredential.getCredentials();
      if (!openaiApiKey) {
        throw new Error("OpenAI API key not found");
      }

      const response = await axios.post(
        `${BACK_BASE_URL}/api/integrations/openai/generate-json`,
        {
          PRODUCTO_JSON: productData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "openai-api-key": openaiApiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error generating JSON with OpenAI:", error);
      throw error;
    }
  },

  async generatePrompt(promptData) {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error("Authorization token not found in cookies");
      }

      const { api_key: openaiApiKey } = await openiaCredential.getCredentials();
      if (!openaiApiKey) {
        throw new Error("OpenAI API key not found");
      }

      const response = await axios.post(
        `${BACK_BASE_URL}/api/integrations/openai/prompt`,
        promptData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "openai-api-key": openaiApiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error generating prompt with OpenAI:", error);
      throw error;
    }
  },

  async getProductsByUrl(productUrl) {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error("Authorization token not found in cookies");
      }

      const { api_key: openaiApiKey } = await openiaCredential.getCredentials();
      if (!openaiApiKey) {
        throw new Error("OpenAI API key not found");
      }

      const response = await axios.post(
        `${BACK_BASE_URL}/api/integrations/openai/getProducts`,
        {
          productUrl: productUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "openai-api-key": openaiApiKey,
          },
        }
      );

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Respuesta del servidor inválida");
      }

      if (response.data.success === false) {
        throw new Error(
          response.data.message || "Error al obtener el producto"
        );
      }

      if (response.data.success === true && !response.data.data) {
        throw new Error("El servidor no devolvió datos del producto");
      }

      return response.data;
    } catch (error) {
      console.error("Error getting products by URL with OpenAI:", error);
      throw new Error(`Error al extraer producto de la URL: ${error.message}`);
    }
  },

  async getShopifyProductById(productId) {
    try {
      const shopifyCredentials = await shopifyGetCredentials();
      const authToken = getAuthToken();

      if (!authToken) throw new Error("Authorization token not found");
      if (!shopifyCredentials?.url || !shopifyCredentials?.token) {
        throw new Error("Shopify credentials not configured");
      }

      // ✅ USAR QUERY PARAMS con URL actualizada
      const response = await axios.get(
        `${BACK_BASE_URL}/api/integrations/shopify/products/${productId}?shop=${encodeURIComponent(
          shopifyCredentials.url
        )}&access_token=${encodeURIComponent(shopifyCredentials.token)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching Shopify product:", error);
      throw error;
    }
  },
};

export default autoCreateFormService;
