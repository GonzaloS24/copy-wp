import axios from "axios";
import { getAuthToken } from "../../utils/authCookies";
import { BACK_BASE_URL } from "../../utils/backendUrl";

export const dropiCreateIntegrations = async (formData) => {
  const auth = getAuthToken();
  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.post(
    `${BACK_BASE_URL}/api/integrations/dropi`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};

export const dropiGetCredentials = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.get(`${BACK_BASE_URL}/api/integrations/dropi`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data;
};

export const dropiDeleteIntegration = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.delete(
    `${BACK_BASE_URL}/api/integrations/dropi`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};

export const dropiGetWebhook = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.get(
    `${BACK_BASE_URL}/api/integrations/dropi/webhook`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data[0].url;
};
