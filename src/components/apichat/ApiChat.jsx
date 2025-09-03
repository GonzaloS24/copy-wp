import { useState, useRef, useEffect } from "react";
import { useApiChat } from "./ApiChatContext";
import { TestRestartService } from "../../services/apichat/testRestartService";

const ApiChat = ({ title = "Chat en vivo", productId = null }) => {
  const [inputValue, setInputValue] = useState("");
  const [isStartingTest, setIsStartingTest] = useState(false);
  const messagesEndRef = useRef(null);

  const {
    messages,
    isConnected,
    isConnecting,
    username,
    error,
    hasMessagesSent,
    initializeChat,
    sendMessage,
    restartTest,
    isRestartingTest,
    productId: contextProductId,
  } = useApiChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Log del productId para debug
  useEffect(() => {
    if (productId || contextProductId) {
      console.log(
        "🆔 ProductId disponible en ApiChat:",
        productId || contextProductId
      );
    }
  }, [productId, contextProductId]);

  // Nueva función para iniciar la prueba
  const handleStartTest = async () => {
    if (isStartingTest || isConnected) return;

    setIsStartingTest(true);

    try {
      console.log("🚀 Iniciando prueba...");

      // 1. Obtener la palabra clave del producto
      const keywordResult = await TestRestartService.getProductKeywords(
        productId || contextProductId
      );

      if (keywordResult.success && keywordResult.primaryKeyword) {
        console.log("🔑 Palabra clave obtenida:", keywordResult.primaryKeyword);

        // 2. Rellenar el input con la palabra clave
        setInputValue(keywordResult.primaryKeyword);

        // 3. Inicializar el chat con usuario "prueba"
        initializeChat("prueba");

        console.log("✅ Prueba iniciada exitosamente");
      } else {
        throw new Error("No se pudo obtener la palabra clave del producto");
      }
    } catch (error) {
      console.error("❌ Error al iniciar prueba:", error);
      // En caso de error, al menos inicializar el chat
      initializeChat("prueba");
    } finally {
      setIsStartingTest(false);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleRestartTest = async () => {
    try {
      // Ejecutar reinicio
      await restartTest();

      // Pre-cargar la palabra clave en el input después del reinicio
      try {
        const keywordResult = await TestRestartService.getProductKeywords(
          productId || contextProductId
        );
        if (keywordResult.success && keywordResult.primaryKeyword) {
          setInputValue(keywordResult.primaryKeyword);
        }
      } catch (keywordError) {
        console.error(
          "Error obteniendo palabra clave post-reinicio:",
          keywordError
        );
      }
    } catch (error) {
      console.error("Error en handleRestartTest:", error);
    }
  };

  const getMessageStyle = (messageType) => {
    switch (messageType) {
      case "user":
        return "bg-green-100 text-slate-700 rounded-br-sm ml-auto";
      case "ai":
        return "bg-white text-slate-700 rounded-bl-sm mr-auto";
      case "system":
        return "bg-blue-100 text-blue-700 rounded-lg mx-auto text-center text-sm";
      default:
        return "bg-gray-100 text-gray-700 rounded-lg mx-auto";
    }
  };

  // Determinar si el botón de reiniciar debe estar habilitado
  const isRestartEnabled = isConnected && hasMessagesSent && !isRestartingTest;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl text-sky-500 font-bold tracking-tight">
            {title}
          </h1>
        </div>
        <div className="flex gap-3">
          {!isConnected ? (
            // Botón "Iniciar Prueba" cuando no está conectado
            <button
              className={`border-none rounded-lg py-3 px-6 text-sm font-medium cursor-pointer transition-all duration-200 font-inherit shadow-sm hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 ${
                isStartingTest
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-200"
              }`}
              onClick={handleStartTest}
              disabled={isStartingTest || isConnecting}
            >
              {isStartingTest ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Iniciando...
                </>
              ) : (
                <>🚀 Iniciar prueba</>
              )}
            </button>
          ) : (
            // Botón "Reiniciar Prueba" cuando está conectado
            <button
              className={`border-none rounded-lg py-3 px-6 text-sm font-medium cursor-pointer transition-all duration-200 font-inherit shadow-sm flex items-center gap-2 ${
                isRestartEnabled
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-200 hover:-translate-y-1 hover:shadow-lg"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              onClick={handleRestartTest}
              disabled={!isRestartEnabled}
              title={
                !hasMessagesSent
                  ? "Envía al menos un mensaje antes de reiniciar"
                  : isRestartingTest
                  ? "Reiniciando..."
                  : "Reiniciar prueba"
              }
            >
              {isRestartingTest ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Reiniciando...
                </>
              ) : (
                <>Reiniciar prueba</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Status/Error Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isConnected && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          <strong>Conectado como:</strong> {username}
          {(productId || contextProductId) && (
            <span className="ml-2 text-green-600">
              (Producto: {productId || contextProductId})
            </span>
          )}
        </div>
      )}

      {isStartingTest && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <strong>Iniciando prueba...</strong>
          </div>
          <p className="mt-2 text-xs text-blue-600">
            Obteniendo palabra clave del producto y preparando chat de prueba...
          </p>
        </div>
      )}

      {isRestartingTest && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <strong>Reiniciando prueba...</strong>
          </div>
          <p className="mt-2 text-xs text-red-600">
            Eliminando conversación anterior y preparando nueva prueba...
          </p>
        </div>
      )}

      {/* Chat Container */}
      <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">
        <div className="h-125 flex flex-col">
          {/* Messages Area */}
          <div
            className="flex-1 bg-slate-900 p-6 overflow-y-auto flex flex-col gap-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' opacity='0.05'><defs><pattern id='whatsapp-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='%23ffffff'/></pattern></defs><rect width='100' height='100' fill='url(%23whatsapp-pattern)'/></svg>")`,
            }}
          >
            {messages.length === 0 &&
              !isConnected &&
              !isConnecting &&
              !isStartingTest &&
              !isRestartingTest && (
                <div className="flex p-10 items-center justify-center h-full text-white/70 text-center">
                  <div>
                    <p className="text-lg mb-2">
                      ¿Listo para probar tu asistente?
                    </p>
                    <p className="text-sm opacity-75">
                      Presiona "Iniciar prueba" para comenzar
                    </p>
                  </div>
                </div>
              )}

            {messages.length === 0 && isConnected && !isRestartingTest && (
              <div className="flex items-center justify-center h-full text-white/70 text-center">
                <div>
                  <div className="text-2xl mb-2">💬</div>
                  <p>
                    El chat está listo. La palabra clave está pre-cargada en el
                    input.
                  </p>
                  <p className="text-sm mt-2 opacity-75">
                    Presiona Enter o el botón de envío para comenzar
                  </p>
                </div>
              </div>
            )}

            {(isConnecting || isStartingTest || isRestartingTest) && (
              <div className="flex items-center justify-center h-full text-white/70 text-center">
                <div>
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/70 mx-auto mb-4"></div>
                  <p>
                    {isStartingTest
                      ? "Preparando prueba..."
                      : isRestartingTest
                      ? "Reiniciando prueba..."
                      : "Conectando con el servidor..."}
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${
                  message.type === "user"
                    ? "justify-end"
                    : message.type === "system"
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3/5 rounded-2xl py-4 px-5 relative shadow-sm ${getMessageStyle(
                    message.type
                  )} ${message.type === "system" ? "max-w-4/5 py-2 px-4" : ""}`}
                >
                  <div
                    className={`leading-snug mb-2 ${
                      message.type === "system" ? "mb-0" : ""
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.type !== "system" && (
                    <div className="text-xs text-slate-500 text-right opacity-80">
                      {message.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-slate-100 border-t border-slate-200 py-5 px-5 flex gap-4 items-center">
            <input
              type="text"
              className="flex-1 py-4 px-5 border-2 border-slate-200 rounded-3xl text-base bg-white transition-all duration-200 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={
                isConnected
                  ? "Escribe un mensaje o usa la palabra clave pre-cargada"
                  : "Inicia la prueba para cargar la palabra clave automáticamente"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected || isRestartingTest || isStartingTest}
            />
            <button
              className={`w-12 h-12 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 ${
                isConnected &&
                inputValue.trim() &&
                !isRestartingTest &&
                !isStartingTest
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSendMessage}
              disabled={
                !isConnected ||
                !inputValue.trim() ||
                isRestartingTest ||
                isStartingTest
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiChat;
