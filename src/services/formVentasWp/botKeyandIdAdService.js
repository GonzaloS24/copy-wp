import axios from "axios";
import { BACK_BASE_URL } from "../../utils/backendUrl";
import { getAuthToken } from "../../utils/authCookies";

const botKeyandIdAdService = {

  async getTriggerField() {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error("Authorization token not found in cookies");
      }

      const response = await axios.get(
        `${BACK_BASE_URL}/api/integrations/chateapro/trigger-field`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid server response");
      }

      if (response.data.success === false) {
        throw new Error(
          response.data.message || "Error al obtener el campo del bot"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching bot trigger field:", error);
      throw new Error(`Error al obtener campo del bot: ${error.message}`);
    }
  }
};

export default botKeyandIdAdService;