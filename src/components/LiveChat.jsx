import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Bot, Phone, Mail } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Bem-vindo ao atendimento Mix Fibra! Como posso ajudar você hoje?",
      sender: 'support',
      timestamp: new Date(),
      agent: 'Suporte Mix Fibra'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Quero contratar internet",
    "Problemas com conexão",
    "Consultar fatura",
    "Suporte técnico",
    "Alterar plano"
  ];

  const handleStartChat = (e) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email) {
      setShowForm(false);
      const welcomeMsg = {
        id: Date.now(),
        text: `Olá ${userInfo.name}! Obrigado por entrar em contato. Nossa equipe está pronta para ajudar. Em que posso auxiliar?`,
        sender: 'support',
        timestamp: new Date(),
        agent: 'Atendente Mix Fibra'
      };
      setMessages(prev => [...prev, welcomeMsg]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "Entendi sua solicitação. Vou verificar isso para você agora mesmo!",
        "Perfeito! Vou encaminhar você para o setor responsável.",
        "Obrigado pela informação. Nossa equipe técnica vai analisar seu caso.",
        "Vou consultar nosso sistema e já retorno com uma solução.",
        "Entendido! Vou conectar você com um especialista."
      ];
      
      const supportMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'support',
        timestamp: new Date(),
        agent: 'Atendente Mix Fibra'
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);

      // Follow up message
      setTimeout(() => {
        const followUp = {
          id: Date.now() + 2,
          text: "Para um atendimento mais rápido, você pode nos chamar diretamente no WhatsApp: (83) 99641-1187",
          sender: 'support',
          timestamp: new Date(),
          agent: 'Atendente Mix Fibra'
        };
        setMessages(prev => [...prev, followUp]);
      }, 2000);
    }, 1500);
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-gentle"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">Chat ao Vivo</div>
              <div className="text-xs text-white/80 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                Online agora
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {showForm ? (
          /* Contact Form */
          <div className="p-6">
            <h3 className="text-white font-bold mb-4">Vamos começar!</h3>
            <form onSubmit={handleStartChat} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome *"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="email"
                placeholder="Seu e-mail *"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="tel"
                placeholder="Seu telefone (opcional)"
                value={userInfo.phone}
                onChange={(e) => setUserInfo(prev => ({...prev, phone: e.target.value}))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Iniciar Chat
              </button>
            </form>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
                <a href="tel:+5583996411187" className="flex items-center gap-1 hover:text-white">
                  <Phone className="w-4 h-4" />
                  (83) 99641-1187
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    {message.sender === 'support' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot size={12} className="text-green-400" />
                        <span className="text-xs text-white/70">{message.agent}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Bot size={12} className="text-green-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full border border-white/20 transition-all duration-200 hover:scale-105"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveChat;