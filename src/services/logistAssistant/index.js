import axios from "axios";
import * as serializers from "./serializers";
import * as deserializers from "./deserializers";
import { getAuthToken } from "../../utils/authCookies";

const BACK_BASE_URL =
  "https://workspace-wizard-config-service-26551171030.us-east1.run.app";

export const setBotFieldData = async (id, name, formData) => {
  const serializedData = serializers[`${id}Serializer`](formData);

  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.put(
    `${BACK_BASE_URL}/api/assistants/set-info`,
    {
      name,
      value: serializedData,
    },
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};

export const getBotFieldData = async (id, name) => {
  if (!deserializers[`${id}Deserializer`]) return {};

  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const response = await axios.get(
    `${BACK_BASE_URL}/api/assistants/get-info/${encodeURIComponent(name)}`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return deserializers[`${id}Deserializer`](response.data[0].value);
};
