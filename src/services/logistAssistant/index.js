import axios from "axios";
import * as serializers from "./serializers";
import { getAuthToken } from "../../utils/authCookies";

const BACK_BASE_URL =
  "https://workspace-wizard-config-service-26551171030.us-east1.run.app";

export const setBotFieldData = async (id, name, formData) => {
  console.log(formData);
  const serializedData = serializers[`${id}Serializer`](formData);

  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const body = {
    value: serializedData,
    name,
  };

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
