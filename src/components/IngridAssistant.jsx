import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const IngridAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Eu sou a Ingrid, sua assistente virtual da Mix Fibra! 👋 Como posso ajudar você hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    planos: {
      keywords: ['plano', 'velocidade', 'preço', 'valor', 'mb', 'internet'],
      response: "Temos planos de 50MB (R$39,99), 100MB (R$49,99), 200MB (R$59,99), 300MB (R$69,99) e 500MB (R$99,99). Todos sem taxa de instalação e sem fidelidade! Qual velocidade você precisa?"
    },
    suporte: {
      keywords: ['suporte', 'problema', 'ajuda', 'técnico', 'lento', 'wifi'],
      response: "Nosso suporte técnico funciona 24/7! Para problemas urgentes: (83) 99641-1187. Para internet lenta, tente reiniciar o roteador. Posso ajudar com mais alguma coisa?"
    },
    instalacao: {
      keywords: ['instalar', 'instalação', 'prazo', 'quando', 'técnico'],
      response: "A instalação é GRATUITA e leva de 24 a 48 horas após a contratação! Nossa equipe técnica agenda o melhor horário com você. Quer contratar?"
    },
    cobertura: {
      keywords: ['cidade', 'atende', 'disponível', 'cobertura', 'sumé', 'congo', 'camalaú'],
      response: "Atendemos Sumé, Congo, Camalaú e Caraúbas! Se você está em outra cidade, entre em contato que verificamos a viabilidade. Onde você mora?"
    },
    contrato: {
      keywords: ['contratar', 'assinar', 'whatsapp', 'contato'],
      response: "Para contratar é super fácil! Entre em contato pelo WhatsApp (83) 99641-1187 ou preencha nosso formulário no site. Qual plano te interessa?"
    },
    fidelidade: {
      keywords: ['fidelidade', 'cancelar', 'multa', 'contrato'],
      response: "Nossos planos são SEM FIDELIDADE! Você pode cancelar quando quiser, sem multa. Transparência total é nosso compromisso!"
    }
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return data.response;
      }
    }

    // Respostas para cumprimentos
    if (message.includes('oi') || message.includes('olá') || message.includes('ola')) {
      return "Oi! Que bom falar com você! 😊 Sou a Ingrid da Mix Fibra. Como posso te ajudar hoje?";
    }

    if (message.includes('obrigad') || message.includes('valeu')) {
      return "Por nada! Fico feliz em ajudar! 💙 Se precisar de mais alguma coisa, estarei aqui!";
    }

    // Resposta padrão
    return "Hmm, não tenho certeza sobre isso. Mas posso te ajudar com: planos de internet, suporte técnico, instalação, cobertura ou contratação. Ou fale direto com nossa equipe: (83) 99641-1187! 📞";
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

    // Simular digitação da IA
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👩‍💼</span>
            </div>
            <div className="hidden lg:block text-left">
              <div className="font-bold text-sm">Ingrid - Assistente IA</div>
              <div className="text-xs opacity-90">Como posso ajudar?</div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">👩‍💼</span>
            </div>
            <div>
              <div className="font-bold text-white">Ingrid</div>
              <div className="text-xs text-white/80">Assistente Mix Fibra</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 size={16} className="text-white" /> : <Minimize2 size={16} className="text-white" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Bot size={16} className="text-purple-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-2xl transition-all duration-300 hover:scale-105"
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

export default IngridAssistant;