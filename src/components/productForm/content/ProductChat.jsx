import { ApiChatProvider } from "../../apichat/ApiChatContext";
import ApiChat from "../../apichat/ApiChat";

export const ProductChat = () => {
  return (
    <ApiChatProvider>
      <ApiChat />
    </ApiChatProvider>
  );
};
