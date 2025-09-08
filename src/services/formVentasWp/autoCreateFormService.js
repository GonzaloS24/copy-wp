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
      const detailedError = parseBackendError(error);
      console.error("Error detallado fetching product from Dropi:", detailedError);
      throw new Error(`Error al obtener producto: ${detailedError}`);
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
      const detailedError = parseBackendError(error);
      console.error("Error detallado fetching product from Dropi:", detailedError);
      throw new Error(`Error al obtener producto: ${detailedError}`);
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
      const detailedError = parseBackendError(error);
      console.error("Error detallado generating prompt with OpenAI:", {
        error: detailedError,
        requestData: {
          nombre: promptData.nombre,
          precio: promptData.precio,
          producto_json_type: typeof promptData.producto_json
        }
      });
      throw new Error(`Error al generar prompt: ${detailedError}`);
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
    }catch (error) {
      const detailedError = parseBackendError(error);
      console.error("Error detallado fetching product from openai URL:", detailedError);
      throw new Error(`Error al obtener producto: ${detailedError}`);
  
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
      const detailedError = parseBackendError(error);
      console.error("Error detallado generating prompt with OpenAI:", {
        error: detailedError,
        requestData: {
          nombre: productId.nombre,
          precio: productId.precio,
          producto_json_type: typeof productId.producto_json
        }
      });
      throw new Error(`Error al generar prompt: ${detailedError}`);
    }
  },
};

export default autoCreateFormService;
const parseBackendError = (error) => {
  if (error.response?.data) {
    if (typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
      const errorMatch = error.response.data.match(/<pre>Error: ([^<]+)</);
      if (errorMatch && errorMatch[1]) {
        return errorMatch[1].replace(/<br\s*\/?>/g, '\n');
      }
    }
    
    if (typeof error.response.data === 'object' && error.response.data.message) {
      return error.response.data.message;
    }
    
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
  }
  
  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return 'Solicitud incorrecta. Verifica los datos enviados.';
      case 401:
        return 'No autorizado. Token de acceso inválido o expirado.';
      case 403:
        return 'Acceso prohibido. No tienes permisos para esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 500:
        return 'Error interno del servidor. Por favor, intenta nuevamente.';
      case 502:
        return 'Error de conexión con el servidor.';
      case 503:
        return 'Servicio no disponible temporalmente.';
      default:
        return `Error del servidor (${error.response.status}).`;
    }
  }
  
  if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
    return 'Error de conexión. Verifica tu internet e intenta nuevamente.';
  }
  
  return error.message || 'Error desconocido al procesar la solicitud.';
};
