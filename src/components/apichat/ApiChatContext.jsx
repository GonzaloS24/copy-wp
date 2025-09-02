import { createContext, useState, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { getAuthToken } from "../../utils/authCookies";
import { getCurrentWorkspace } from "../../utils/workspace";

const ApiChatContext = createContext();

export const ApiChatProvider = ({ children, productId = null, ASSISTANT_TEMPLATE_NS }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [botCode, setBotCode] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(productId);

  const socketRef = useRef(null);
  const API_CHAT_URL = "https://api-chat-service-26551171030.us-east1.run.app";

  // Actualizar productId cuando cambie desde props
  useEffect(() => {
    setCurrentProductId(productId);
  }, [productId]);

  const addMessage = (type, content, time = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      time: time || getCurrentTime(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const initializeChat = (chatUsername) => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setError(null);
    setUsername(chatUsername);

    const workspaceId = getCurrentWorkspace();
    const token = getAuthToken();

    if (!workspaceId) {
      setError("No se encontró ID del workspace");
      setIsConnecting(false);
      return;
    }

    if (!token) {
      setError("No se encontró token de autenticación");
      setIsConnecting(false);
      return;
    }

    if (!ASSISTANT_TEMPLATE_NS) {
      setError("No se encontró el template del asistente");
      setIsConnecting(false);
      return;
    }

    // Limpiar socket anterior si existe
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    console.log("🔌 Conectando con:", {
      username: chatUsername,
      workspaceId: Number(workspaceId),
      hasToken: !!token,
      productId: currentProductId,
    });

    // Crear conexión socket con la configuración correcta
    socketRef.current = io(API_CHAT_URL, {
      auth: {
        token: `Bearer ${token}`,
        name: chatUsername,
        workspaceId: Number(workspaceId),
      },
    });

    // Event listeners
    socketRef.current.on("connect", () => {
      console.log("🔌 Conectado al servidor WebSocket");

      // Enviar evento de inicialización
      socketRef.current.emit("initialize_chat", {
        username: chatUsername,
        workspaceId: Number(workspaceId),
      });
    });

    socketRef.current.on("initialization_success", (data) => {
      console.log("✅ Chat inicializado correctamente", data);
      setBotCode(data.botCode);
      setIsConnected(true);
      setIsConnecting(false);
      addMessage("system", `Chat inicializado como ${chatUsername}`);
    });

    socketRef.current.on("initialization_error", () => {
      console.error("❌ Error al inicializar chat");
      setError("Error al inicializar el chat");
      setIsConnecting(false);
      disconnectChat();
    });

    socketRef.current.on("new_message", (data) => {
      console.log("📨 Nuevo mensaje recibido:", data);
      const messageContent = data.message || data;
      const sender = data.username || "AI";
      addMessage("ai", messageContent);
    });

    socketRef.current.on("disconnect", () => {
      console.log("🔌 Desconectado del servidor WebSocket");
      setIsConnected(false);
      setIsConnecting(false);
      setBotCode("");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("❌ Error de conexión WebSocket:", error);
      setError("Error de conexión con el servidor");
      setIsConnecting(false);
    });

    socketRef.current.on("error", (error) => {
      console.error("❌ Error del socket:", error);
      setError(error.message || "Error del servidor");
    });
  };

  const sendMessage = (message) => {
    if (!isConnected || !botCode || !socketRef.current) {
      setError("Chat no está conectado");
      return;
    }

    if (!message.trim()) return;

    console.log("📤 Enviando mensaje:", {
      message: message,
      botCode: botCode,
      productId: currentProductId,
      templateNs: ASSISTANT_TEMPLATE_NS,
    });

    // Agregar mensaje del usuario
    addMessage("user", message);

    // Enviar mensaje al servidor
    socketRef.current.emit("send_message", {
      message: message,
      botCode: botCode,
      productId: currentProductId,
      templateNs: ASSISTANT_TEMPLATE_NS,
    });
  };

  const disconnectChat = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
    setBotCode("");
    setUsername("");
    setError(null);
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
    if (isConnected) {
      addMessage("system", `Chat reiniciado como ${username}`);
    }
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <ApiChatContext.Provider
      value={{
        messages,
        isConnected,
        isConnecting,
        username,
        error,
        initializeChat,
        sendMessage,
        disconnectChat,
        resetChat,
        productId: currentProductId,
        setProductId: setCurrentProductId,
      }}
    >
      {children}
    </ApiChatContext.Provider>
  );
};

export const useApiChat = () => {
  const context = useContext(ApiChatContext);
  if (!context) {
    throw new Error("useApiChat debe usarse dentro de ApiChatProvider");
  }
  return context;
};
