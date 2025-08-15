import axios from "axios";
import { getAuthToken } from "../../utils/authCookies";
import { BACK_BASE_URL } from "../../utils/backendUrl";

export const metaConversionsApiCreateIntegrations = async (formData) => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.post(
    `${BACK_BASE_URL}/api/integrations/metaConversionsApi`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};

export const metaConversionsApiGetCredentials = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.get(
    `${BACK_BASE_URL}/api/integrations/metaConversionsApi`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};

export const metaConversionsApiDeleteIntegration = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.delete(
    `${BACK_BASE_URL}/api/integrations/metaConversionsApi`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};
