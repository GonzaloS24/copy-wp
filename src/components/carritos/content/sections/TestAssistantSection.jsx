import { ApiChatProvider } from "../../../apichat/ApiChatContext";
import ApiChat from "../../../apichat/ApiChat";
import { ASSISTANT_TEMPLATE_NS } from "../../../../utils/constants/assistants";

const TestAssistantSection = () => {
  const CARTS = ASSISTANT_TEMPLATE_NS.CARTS;

  return (
    <ApiChatProvider ASSISTANT_TEMPLATE_NS={CARTS}>
      <ApiChat />
    </ApiChatProvider>
  );
};

export default TestAssistantSection;
