import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2, Maximize2, Mic, VolumeX } from 'lucide-react';

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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Inicializar Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Inicializar Speech Synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const knowledgeBase = {
    planos: {
      keywords: ['plano', 'velocidade', 'preço', 'valor', 'mb', 'internet', 'pacote', 'oferta', 'promoção'],
      response: "🚀 Nossos planos de fibra óptica:\n\n• 50MB - R$39,99/mês\n• 100MB - R$49,99/mês\n• 200MB - R$59,99/mês\n• 300MB - R$69,99/mês\n• 500MB - R$89,99/mês\n\n✅ Todos SEM taxa de instalação\n✅ SEM fidelidade\n✅ Instalação em 24-48h\n\nQual velocidade atende suas necessidades?"
    },
    suporte: {
      keywords: ['suporte', 'problema', 'ajuda', 'técnico', 'lento', 'wifi', 'conexão', 'internet', 'caiu', 'não funciona'],
      response: "🛠️ Suporte técnico 24/7 disponível!\n\n📞 Emergências: (83) 99641-1187\n💬 WhatsApp: Atendimento rápido\n🔧 Monitoramento: Rede 24h\n\n⚡ Dica rápida: Internet lenta? Reinicie o roteador por 30 segundos. Persistindo? Nossa equipe resolve!"
    },
    instalacao: {
      keywords: ['instalar', 'instalação', 'prazo', 'quando', 'técnico', 'agendar', 'visita'],
      response: "🏠 Instalação GRATUITA e rápida!\n\n⏰ Prazo: 24 a 48 horas\n👨‍🔧 Técnico especializado\n📅 Agendamento flexível\n🎯 Sem taxa de instalação\n\nApós a contratação, nossa equipe entra em contato para agendar no melhor horário para você!"
    },
    cobertura: {
      keywords: ['cidade', 'atende', 'disponível', 'cobertura', 'sumé', 'congo', 'camalaú', 'caraúbas', 'onde', 'local'],
      response: "🌍 Cidades atendidas pela Mix Fibra:\n\n📍 Sumé - PB\n📍 Congo - PB\n📍 Camalaú - PB\n📍 Caraúbas - PB\n\n🔍 Sua cidade não está na lista? Entre em contato! Estamos sempre expandindo nossa cobertura."
    },
    contrato: {
      keywords: ['contratar', 'assinar', 'whatsapp', 'contato', 'quero', 'como faço'],
      response: "📝 Contratar é super fácil!\n\n💬 WhatsApp: (83) 99641-1187\n🌐 Site: Formulário online\n📞 Telefone: Atendimento direto\n\n✨ Processo 100% digital, sem burocracia! Qual plano você escolheu?"
    },
    fidelidade: {
      keywords: ['fidelidade', 'cancelar', 'multa', 'contrato', 'permanência'],
      response: "🆓 ZERO fidelidade na Mix Fibra!\n\n❌ Sem multa por cancelamento\n❌ Sem permanência obrigatória\n✅ Liberdade total\n✅ Transparência completa\n\nVocê fica porque quer, não porque precisa! 😊"
    },
    velocidade: {
      keywords: ['velocidade', 'rápido', 'lento', 'mb', 'mega', 'fibra'],
      response: "⚡ Fibra óptica 100% pura!\n\n🚀 Até 500MB de velocidade\n📶 Baixa latência\n🎮 Ideal para games\n📺 Streaming 4K\n💻 Home office\n\nNossa fibra óptica garante velocidade real, não apenas 'até'!"
    },
    pagamento: {
      keywords: ['pagamento', 'boleto', 'cartão', 'pix', 'fatura', '2ª via'],
      response: "💳 Formas de pagamento flexíveis:\n\n🏦 Boleto bancário\n💳 Cartão de crédito\n⚡ PIX (desconto especial)\n🌐 Débito automático\n\n📄 2ª via: Central do Assinante ou WhatsApp"
    },
    promocao: {
      keywords: ['promoção', 'desconto', 'oferta', 'barato', 'preço especial', 'black friday', 'natal'],
      response: "🎉 Promoções ativas Mix Fibra:\n\n🆓 Instalação GRATUITA\n❌ ZERO taxa de adesão\n🎁 Primeiro mês com desconto\n⚡ Upgrade grátis por 3 meses\n\n📞 Entre em contato: (83) 99641-1187\n🌐 Ou pelo site para garantir sua oferta!"
    },
    tecnico: {
      keywords: ['técnico', 'roteador', 'modem', 'equipamento', 'configurar', 'senha wifi', 'resetar'],
      response: "🔧 Suporte técnico especializado:\n\n👨‍💻 Técnicos certificados\n🏠 Atendimento domiciliar\n📱 Suporte remoto\n⚙️ Configuração completa\n\n📞 Emergência 24h: (83) 99641-1187\nTodos os equipamentos são configurados pela nossa equipe!"
    },
    horario: {
      keywords: ['horário', 'atendimento', 'funciona', 'aberto', 'fechado', 'domingo'],
      response: "🕐 Horário de atendimento Mix Fibra:\n\n📞 Segunda a Sábado: 8h às 12h | 14h às 18h\n💬 WhatsApp: 24h (resposta rápida)\n🚨 Emergências técnicas: 24h\n❌ Domingo: Apenas emergências\n\nSempre prontos para te atender!"
    }
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Validação de entrada
    if (!message || message.length < 2) {
      return "🤔 Não entendi sua mensagem. Pode reformular sua pergunta?";
    }
    
    let bestMatch = null;
    let maxMatches = 0;
    let contextScore = 0;
    
    // Sistema de pontuação inteligente
    for (const [category, data] of Object.entries(knowledgeBase)) {
      let matches = 0;
      let exactMatches = 0;
      
      // Contagem de palavras-chave com peso
      data.keywords.forEach(keyword => {
        if (message.includes(keyword)) {
          matches++;
          // Peso extra para correspondências exatas
          if (message.split(' ').includes(keyword)) {
            exactMatches++;
          }
        }
      });
      
      const score = matches + (exactMatches * 2);
      
      if (score > maxMatches) {
        maxMatches = score;
        bestMatch = data.response;
        contextScore = score;
      }
    }
    
    // Só responde se tiver confiança mínima
    if (bestMatch && contextScore >= 1) {
      return bestMatch;
    }

    // Respostas contextuais com validação
    const greetingWords = ['oi', 'olá', 'ola', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'e ai'];
    if (greetingWords.some(word => message.includes(word))) {
      const greetings = [
        "Oi! Que bom falar com você! 😊 Sou a Ingrid da Mix Fibra. Como posso te ajudar hoje?",
        "Olá! 👋 Bem-vindo à Mix Fibra! Estou aqui para esclarecer suas dúvidas sobre nossos planos de internet!",
        "Oi! 🌟 Sou sua assistente virtual da Mix Fibra. Posso ajudar com planos, suporte, instalação e muito mais!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    const thankWords = ['obrigad', 'valeu', 'muito bom', 'perfeito', 'ótimo', 'excelente'];
    if (thankWords.some(word => message.includes(word))) {
      const thanks = [
        "Por nada! Fico feliz em ajudar! 💙 Se precisar de mais alguma coisa, estarei aqui!",
        "Que bom que pude ajudar! 😊 Estou sempre disponível para você!",
        "Foi um prazer! 🌟 A Mix Fibra está sempre aqui para você!"
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    const byeWords = ['tchau', 'até logo', 'bye', 'falou', 'até mais'];
    if (byeWords.some(word => message.includes(word))) {
      return "Até logo! 👋 Foi ótimo conversar com você! Lembre-se: Mix Fibra, conectando você ao futuro! 🚀";
    }

    // Detecção de perguntas específicas não cobertas
    if (message.includes('?') || message.includes('como') || message.includes('quando') || message.includes('onde') || message.includes('qual') || message.includes('quanto')) {
      return "🤔 Sua pergunta é muito específica! Para te dar a resposta mais precisa, recomendo falar diretamente com nossa equipe:\n\n📞 WhatsApp: (83) 99641-1187\n🌐 Site: mixfibra.com.br\n\nOu posso ajudar com informações gerais sobre planos, suporte, instalação ou cobertura!";
    }

    // Resposta inteligente padrão com sugestões específicas
    const suggestions = [
      "📋 Planos e preços",
      "🛠️ Suporte técnico", 
      "🏠 Instalação",
      "📍 Cobertura",
      "📞 Contratação"
    ];
    
    return `💭 Não consegui entender exatamente o que você precisa. Posso ajudar com:\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n💬 Ou fale direto no WhatsApp: (83) 99641-1187`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    const messageToProcess = inputText;
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular digitação da IA
    setTimeout(() => {
      const responseText = getResponse(messageToProcess);
      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Falar a resposta automaticamente
      speakMessage(responseText);
    }, 1500);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakMessage = (text) => {
    if (synthRef.current && !isSpeaking) {
      // Limpar texto de emojis e símbolos para melhor síntese
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[•✅❌🎯📋🛠️🏠📍📞⚡💬]/g, '')
        .replace(/\n/g, '. ')
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Tentar usar voz feminina em português
      const voices = synthRef.current.getVoices();
      const ptBrVoice = voices.find(voice => 
        voice.lang.includes('pt-BR') || voice.lang.includes('pt')
      ) || voices.find(voice => voice.name.includes('Google português'));
      
      if (ptBrVoice) {
        utterance.voice = ptBrVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
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
                  placeholder="Digite ou fale sua pergunta..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                
                {/* Botão de Microfone */}
                <button
                  onClick={startListening}
                  disabled={isListening || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
                  className={`p-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed text-white`}
                  title={isListening ? 'Ouvindo...' : 'Clique para falar'}
                >
                  <Mic size={20} className={isListening ? 'animate-pulse' : ''} />
                </button>
                
                {/* Botão de Parar Fala */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all duration-300 hover:scale-105"
                    title="Parar fala"
                  >
                    <VolumeX size={20} />
                  </button>
                )}
                
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