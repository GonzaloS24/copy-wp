
import { ApiChatProvider } from "../../../apichat/ApiChatContext";
import ApiChat from "../../../apichat/ApiChat";

const TestAssistantSection = () => {
  return (
    <ApiChatProvider>
      <ApiChat />
    </ApiChatProvider>
  );
};

export default TestAssistantSection;