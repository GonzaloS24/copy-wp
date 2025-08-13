import axios from "axios";

import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getAuthToken } from "../../utils/authCookies";
import { getCurrentWorkspace } from "../../utils/workspace/workspaceStorage";

export const installTemplate = async (templateNs) => {
  const auth = getAuthToken();

  if (!auth) {
    throw new Error("No se encontró el token de autorización", {
      cause: "installTemplateAuth",
    });
  }

  const workspaceId = getCurrentWorkspace();

  if (!workspaceId) {
    throw new Error("No se encontró el id del espacio de trabajo", {
      cause: "installTemplateWorkspace",
    });
  }

  const response = await axios.post(
    `${BACK_BASE_URL}/api/assistants/${workspaceId}/install-assistant`,
    {
      template_ns: templateNs,
    },
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  return response.data;
};
