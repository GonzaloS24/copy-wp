import axios from "axios";
import * as serializers from "./serializers";

const BACK_BASE_URL =
  "https://workspace-wizard-config-service-26551171030.us-east1.run.app";

export const setBotFieldData = async (id, name, formData, Authorization) => {
  console.log(object);
  console.log(formData);
  const serializedData = serializers[`${id}Serializer`](formData);

  const body = {
    value: serializedData,
    name,
  };

  console.log(body);

  // const response = await axios.put(
  //   `${BACK_BASE_URL}/assistants/set-info`,
  //   {
  //     name,
  //     value: serializedData,
  //   },
  //   {
  //     headers: {
  //       Authorization,
  //     },
  //   }
  // );
};
