import axios from "axios";
import { getAuthToken } from "../../utils/authCookies";
import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getCurrentWorkspace } from "../../utils/workspace/workspaceStorage";

export const getFlowNs = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const workspaceId = getCurrentWorkspace();

  if (!workspaceId) {
    throw new Error("No se encontró el id del espacio de trabajo", {
      cause: "setBotFieldWorkspace",
    });
  }

  const response = await axios.get(`${BACK_BASE_URL}/api/flow/${workspaceId}`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data;
};

export const getSublowNs = async (subflowName) => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "getBotFieldAuth",
    });
  }

  const workspaceId = getCurrentWorkspace();

  if (!workspaceId) {
    throw new Error("No se encontró el id del espacio de trabajo", {
      cause: "getBotFieldWorkspace",
    });
  }

  const response = await axios.get(
    `${BACK_BASE_URL}/api/flow/${workspaceId}/subflow/${subflowName}`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};
