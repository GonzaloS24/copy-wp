import axios from "axios";
import camelize from "camelize";

import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getAuthToken } from "../../utils/authCookies";

import { dropiGetCredentials } from "./dropi";
import { metaConversionsApiGetCredentials } from "./metaConversionsApi";
import { openaiGetCredentials } from "./openai";
import { shopifyGetCredentials } from "./shopify";

export {
  dropiGetCredentials,
  shopifyGetCredentials,
  metaConversionsApiGetCredentials,
  openaiGetCredentials,
};

export const getInstalledIntegrations = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.get(`${BACK_BASE_URL}/api/integrations`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return camelize(response.data);
};
