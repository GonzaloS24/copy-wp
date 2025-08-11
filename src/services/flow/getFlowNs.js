import axios from "axios";
import { getAuthToken } from "../../utils/authCookies";
import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getWorkspaceIdFromUrl } from "../../utils/workspace/workspaceUtils";

export const getFlowNs = async () => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "setBotFieldAuth",
    });
  }

  const workspaceId = getWorkspaceIdFromUrl();

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
      cause: "setBotFieldAuth",
    });
  }

  const workspaceId = getWorkspaceIdFromUrl();

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
