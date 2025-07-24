import React, { useState, useRef } from 'react';

export const ProductChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola, ¿en qué puedo ayudarte?",
      sender: "bot",
      timestamp: "10:30"
    },
    {
      id: 2,
      text: "Quisiera saber más detalles",
      sender: "user",
      timestamp: "10:31"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const currentTime = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: currentTime
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Gracias por tu mensaje. Un agente se comunicará contigo pronto.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[45rem] max-h-[45rem] ">
 
      <div className="bg-white rounded-t-2xl shadow-lg border-b border-slate-200 p-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Chat en Vivo</h3>
              <div className="flex items-center text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                En línea
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white shadow-lg overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`
                    px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' 
                      : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-200'
                    }
                  `}
                >
                  {message.text}
                </div>
                <div className={`text-xs text-slate-500 mt-1 px-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs">
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-200 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1 px-2">
                  Escribiendo...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="bg-white rounded-b-2xl shadow-lg border-t border-slate-200 p-6 flex-shrink-0">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              rows="1"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 bg-slate-50 text-sm resize-none outline-none transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white min-h-[50px] max-h-32"
              style={{ 
                minHeight: '50px',
                height: 'auto',
                overflowY: newMessage.length > 100 ? 'scroll' : 'hidden'
              }}
            />

          </div>
          <button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`
              rounded-2xl p-3 cursor-pointer transition-all duration-200 ease-in-out shadow-lg min-w-[50px] h-[50px] flex items-center justify-center
              ${newMessage.trim() === '' 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95'
              }
            `}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};