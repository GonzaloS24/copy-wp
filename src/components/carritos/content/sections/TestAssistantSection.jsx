import { useState, useRef, useEffect } from "react";

const TestAssistantSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hola, ¿en qué puedo ayudarte?",
      time: "10:30",
    },
    {
      id: 2,
      type: "user",
      content: "Quisiera saber más detalles",
      time: "10:31",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "¡Perfecto! Te puedo ayudar con eso. ¿Podrías darme más detalles?",
      "Entiendo tu consulta. Nuestros productos tienen excelente calidad.",
      "¡Genial! Tenemos ofertas especiales disponibles para ti.",
      "Te comprendo. ¿Te gustaría conocer más sobre nuestros descuentos?",
      "¡Excelente pregunta! Permíteme explicarte los beneficios.",
      "Por supuesto, estaré encantado de ayudarte con tu pedido.",
      "Perfecto, veo que estás interesado. ¿Desde qué ciudad nos escribes?",
    ];

    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("precio") ||
      lowerMessage.includes("costo") ||
      lowerMessage.includes("valor")
    ) {
      return "¡Excelente pregunta sobre precios! Tenemos ofertas especiales. ¿Te gustaría conocer nuestros descuentos disponibles?";
    }

    if (lowerMessage.includes("envío") || lowerMessage.includes("entrega")) {
      return "Sobre envíos, manejamos tiempos de 2 a 5 días hábiles para ciudades principales. ¿Desde qué ciudad nos escribes?";
    }

    if (lowerMessage.includes("descuento") || lowerMessage.includes("oferta")) {
      return "¡Tengo buenas noticias! Tenemos descuentos especiales disponibles. ¿Te interesa conocer los detalles?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, userMessage]);
      const userText = inputValue;
      setInputValue("");

      // Simular respuesta de IA después de 1.5 segundos
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content: generateAIResponse(userText),
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: "ai",
        content: "Hola, ¿en qué puedo ayudarte?",
        time: getCurrentTime(),
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-sky-500 font-bold tracking-tight">
          Prueba tu asistente
        </h1>
        <button
          className="bg-slate-500 text-white border-none rounded-lg py-3 px-6 text-sm font-medium cursor-pointer transition-all duration-200 font-inherit shadow-sm hover:bg-slate-600 hover:-translate-y-1 hover:shadow-lg"
          onClick={resetChat}
        >
          Reiniciar prueba
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">
        <div className="h-125 flex flex-col">
          <div
            className="flex-1 bg-slate-900 p-6 overflow-y-auto flex flex-col gap-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' opacity='0.05'><defs><pattern id='whatsapp-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='%23ffffff'/></pattern></defs><rect width='100' height='100' fill='url(%23whatsapp-pattern)'/></svg>")`,
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3/5 rounded-2xl py-4 px-5 relative shadow-sm ${
                    message.type === "ai"
                      ? "bg-white text-slate-700 rounded-bl-sm"
                      : "bg-green-100 text-slate-700 rounded-br-sm"
                  }`}
                >
                  <div className="text-base leading-snug mb-2">
                    {message.content}
                  </div>
                  <div className="text-xs text-slate-500 text-right opacity-80">
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-slate-100 border-t border-slate-200 py-5 px-5 flex gap-4 items-center">
            <input
              type="text"
              className="flex-1 py-4 px-5 border-2 border-slate-200 rounded-3xl text-base bg-white transition-all duration-200 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
              placeholder="Escribe un mensaje"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 text-white border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={sendMessage}
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

export default TestAssistantSection;
