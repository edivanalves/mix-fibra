import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2, Maximize2, Mic, VolumeX, ExternalLink, ArrowRight } from 'lucide-react';

const IngridAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Oi! Sou a Ingrid, sua assistente IA da Mix Fibra! 👩‍💼✨ Estou aqui para te ajudar! Primeiro, me conta seu nome para eu te atender melhor! 😊",
      sender: 'bot',
      timestamp: new Date(),
      hasLinks: false
    }
  ]);
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [conversationStage, setConversationStage] = useState('greeting'); // greeting, name_collected, city_collected, normal
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatActive, setChatActive] = useState(true);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const conversationContext = useRef([]);
  const userProfile = useRef({ name: '', city: '', preferences: [] });

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('mixfibra-chat-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserName(data.userName || '');
      setUserCity(data.userCity || '');
      setConversationStage(data.conversationStage || 'greeting');
      userProfile.current = data.userProfile || { name: '', city: '', preferences: [] };
      if (data.messages && data.messages.length > 1) {
        setMessages(data.messages);
      }
    }
  }, []);

  // Salvar dados
  useEffect(() => {
    const dataToSave = {
      userName,
      userCity,
      conversationStage,
      userProfile: userProfile.current,
      messages: messages.slice(-10) // Manter apenas últimas 10 mensagens
    };
    localStorage.setItem('mixfibra-chat-data', JSON.stringify(dataToSave));
  }, [userName, userCity, conversationStage, messages]);

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
        setChatActive(false);
      }
    };
  }, []);

  // Parar fala quando chat for fechado
  useEffect(() => {
    if (!isOpen && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setChatActive(false);
    } else if (isOpen) {
      setChatActive(true);
    }
  }, [isOpen]);

  const navigateToSection = (sectionId) => {
    const event = new CustomEvent('showContent', { detail: sectionId });
    window.dispatchEvent(event);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cities = {
    'sumé': { name: 'Sumé', whatsapp: '5583996411187' },
    'congo': { name: 'Congo', whatsapp: '5583999298366' },
    'caraúbas': { name: 'Caraúbas', whatsapp: '5583988539424' },
    'camalaú': { name: 'Camalaú', whatsapp: '5583996784194' }
  };

  const plans = {
    '50mb': { speed: '50MB', price: 'R$39,99', ideal: 'navegação básica e redes sociais' },
    '100mb': { speed: '100MB', price: 'R$49,99', ideal: 'streaming e home office' },
    '200mb': { speed: '200MB', price: 'R$59,99', ideal: 'família conectada' },
    '300mb': { speed: '300MB', price: 'R$69,99', ideal: 'múltiplos dispositivos' },
    '500mb': { speed: '500MB', price: 'R$89,99', ideal: 'máxima performance' }
  };

  const dailyProblems = {
    'internet_lenta': {
      keywords: ['lenta', 'devagar', 'travando', 'carregando'],
      solution: "Vamos resolver isso!\n\n1 - Reinicie o roteador (desliga 30s e liga)\n2 - Verifique quantos dispositivos estao conectados\n3 - Teste a velocidade em diferentes horarios\n\nSe nao melhorar, nossa equipe vai ai te ajudar!"
    },
    'wifi_problema': {
      keywords: ['wifi', 'wi-fi', 'conectar', 'senha', 'rede'],
      solution: "Problemas com Wi-Fi? Vou te ajudar!\n\n1 - Verifique se o roteador esta ligado (luzes acesas)\n2 - Tente esquecer a rede e reconectar\n3 - A senha padrao esta no roteador\n\nPrecisa de ajuda presencial? Chama nossa equipe!"
    },
    'conta_fatura': {
      keywords: ['fatura', 'boleto', '2ª via', 'conta', 'pagamento'],
      solution: "Precisa da sua fatura? Super facil!\n\n1 - Acesse a Central do Assinante\n2 - Ou peca via WhatsApp\n3 - Tambem enviamos por email\n\nVou te direcionar para onde preferir!"
    }
  };

  const knowledgeBase = {
    planos: {
      keywords: ['plano', 'velocidade', 'preço', 'valor', 'mb', 'internet', 'pacote', 'oferta', 'promoção'],
      response: (userName) => `${userName ? userName + ', nossos' : 'Nossos'} planos de fibra optica sao incriveis!\n\n50MB - R$39,99/mes (${plans['50mb'].ideal})\n100MB - R$49,99/mes (${plans['100mb'].ideal})\n200MB - R$59,99/mes (${plans['200mb'].ideal})\n300MB - R$69,99/mes (${plans['300mb'].ideal})\n500MB - R$89,99/mes (${plans['500mb'].ideal})\n\nTODOS com instalacao GRATUITA e sem fidelidade!\n\nQual plano te interessou mais?`,
      hasLinks: true,
      links: [
        { text: "Ver Todos os Planos", action: () => scrollToSection('plans-section') },
        { text: "Plano 50MB - R$39,99", action: () => scrollToSection('plans-section') },
        { text: "Plano 100MB - R$49,99", action: () => scrollToSection('plans-section') },
        { text: "Plano 200MB - R$59,99", action: () => scrollToSection('plans-section') },
        { text: "Plano 300MB - R$69,99", action: () => scrollToSection('plans-section') },
        { text: "Plano 500MB - R$89,99", action: () => scrollToSection('plans-section') }
      ]
    },
    suporte: {
      keywords: ['suporte', 'problema', 'ajuda', 'técnico', 'lento', 'wifi', 'conexão', 'internet', 'caiu', 'não funciona'],
      response: (userName) => `Nossa equipe de suporte e TOP! ${userName ? userName + ', estamos' : 'Estamos'} aqui para voce!\n\nSupporte tecnico especializado\nResposta super rapida!\nAtendimento Seg-Sab: 8h-12h | 14h-18h\n\nDica da Ingrid: Problemas tecnicos? Nossa equipe resolve rapidinho!`,
      hasLinks: true,
      links: [{ text: "Central de Ajuda", action: () => navigateToSection('support-section') }]
    },
    instalacao: {
      keywords: ['instalar', 'instalação', 'prazo', 'quando', 'técnico', 'agendar', 'visita'],
      response: "🏠 Instalação é comigo mesmo! Super rápida e GRATUITA! 🎉\n\n⏰ Em apenas 24-48h você está conectado!\n👨‍🔧 Técnicos super capacitados\n📅 Agendamos no seu melhor horário\n💰 ZERO taxa de instalação!\n\nDepois que você contratar, nossa equipe liga para agendar! Fácil assim! 😄"
    },
    cobertura: {
      keywords: ['cidade', 'atende', 'disponível', 'cobertura', 'sumé', 'congo', 'camalaú', 'caraúbas', 'onde', 'local'],
      response: "🌍 Estamos espalhados por essas cidades lindas da Paraíba! 🏙️\n\n📍 Sumé - PB ✨\n📍 Congo - PB 🌟\n📍 Camalaú - PB 💫\n📍 Caraúbas - PB ⭐\n\n🔍 Sua cidade não tá na lista? Me conta onde você mora! Estamos sempre crescendo e quem sabe sua cidade é a próxima! 🚀"
    },
    contrato: {
      keywords: ['contratar', 'assinar', 'whatsapp', 'contato', 'quero', 'como faço'],
      response: "📝 Contratar é moleza! Vou te ajudar agora mesmo! 🤝\n\n💬 WhatsApp: (83) 99641-1187\n🌐 Aqui no site mesmo\n📞 Ligação direta\n\n✨ Tudo 100% digital, sem papelada chata! Qual plano chamou sua atenção? 😍",
      hasLinks: true,
      links: [
        { text: "Contratar Agora", action: () => scrollToSection('solicitation-form') },
        { text: "Falar no WhatsApp", action: () => window.open('https://wa.me/5583996411187', '_blank') }
      ]
    },
    fidelidade: {
      keywords: ['fidelidade', 'cancelar', 'multa', 'contrato', 'permanência'],
      response: "🆓 LIBERDADE TOTAL aqui na Mix Fibra! 🕊️\n\n❌ ZERO multa por cancelamento\n❌ ZERO permanência obrigatória\n✅ Você fica porque AMA nosso serviço!\n✅ Transparência é nosso lema!\n\nAqui você é livre como um passarinho! Mas tenho certeza que vai querer ficar! 😄💙"
    },
    velocidade: {
      keywords: ['velocidade', 'rápido', 'lento', 'mb', 'mega', 'fibra'],
      response: "⚡ Fibra óptica 100% PURA! Nada de enrolação! 🔥\n\n🚀 Até 500MB de pura velocidade\n📶 Latência baixíssima\n🎮 Perfeito para games\n📺 Streaming 4K sem travadas\n💻 Home office sem stress\n\nNossa fibra é REAL, não é só marketing! Velocidade que você contrata é a que você recebe! 💪"
    },
    pagamento: {
      keywords: ['pagamento', 'boleto', 'cartão', 'pix', 'fatura', '2ª via'],
      response: "💳 Pagamento do jeitinho que você gosta! 😊\n\n🏦 Boleto bancário\n💳 Cartão de crédito\n⚡ PIX (com desconto especial!) 🎉\n🌐 Débito automático\n\n📄 Precisa da 2ª via? Te levo direto para a Central do Assinante!",
      hasLinks: true,
      links: [{ text: "Central do Assinante", action: () => navigateToSection('central-assinante') }]
    },
    promocao: {
      keywords: ['promoção', 'desconto', 'oferta', 'barato', 'preço especial', 'black friday', 'natal'],
      response: "🎉 PROMOÇÕES IMPERDÍVEIS rolando agora! 🔥\n\n🆓 Instalação GRATUITA (sempre!)\n❌ ZERO taxa de adesão\n🎁 Primeiro mês com desconto\n⚡ Upgrade grátis por 3 meses\n\n📞 Corre que é por tempo limitado! Fala comigo no WhatsApp: (83) 99641-1187! 🏃‍♀️💨"
    },
    tecnico: {
      keywords: ['técnico', 'roteador', 'modem', 'equipamento', 'configurar', 'senha wifi', 'resetar'],
      response: "🔧 Nossos técnicos são FERAS! 🦾\n\n👨‍💻 Super capacitados e certificados\n🏠 Vão na sua casa se precisar\n📱 Suporte remoto também\n⚙️ Configuram tudo certinho\n\n📞 Emergência 24h: (83) 99641-1187\nRelaxe que a gente cuida de tudo! 😌"
    },
    horario: {
      keywords: ['horário', 'atendimento', 'funciona', 'aberto', 'fechado', 'domingo'],
      response: "🕐 Nossos horários para te atender! ⏰\n\n📞 Segunda a Sábado: 8h às 12h | 14h às 18h\n💬 WhatsApp: 24h (resposta rapidinha!)\n🚨 Emergências: 24h todos os dias\n❌ Domingo: Só emergências\n\nEstou sempre aqui para você! 🤗"
    }
  };

  const humorousResponses = [
    "Haha, você é engraçado! 😄 Mas vamos focar na sua internet, né?",
    "Adorei sua pergunta! 😊 Deixa eu te ajudar com isso!",
    "Você tem um ótimo senso de humor! 🤣 Agora me conta o que precisa!",
    "Que legal conversar contigo! 😄 Como posso te ajudar hoje?",
    "Você me fez sorrir! 😊 Vamos resolver sua questão juntos!"
  ];

  const extractName = (message) => {
    const namePatterns = [
      /(?:sou|me chamo|meu nome é|eu sou|nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+)/i,
      /^([a-záàâãéèêíìîóòôõúùûç]+)$/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim().split(' ')[0]; // Primeiro nome
      }
    }
    return null;
  };

  const extractCity = (message) => {
    const cityKeys = Object.keys(cities);
    for (const key of cityKeys) {
      if (message.toLowerCase().includes(key)) {
        return key;
      }
    }
    return null;
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Adicionar ao contexto da conversa
    conversationContext.current.push(message);
    if (conversationContext.current.length > 5) {
      conversationContext.current.shift();
    }
    
    if (!message || message.length < 2) {
      const greeting = userName ? `${userName}, ` : '';
      return {
        text: `🤔 ${greeting}não consegui entender. Pode tentar de novo? Estou aqui para ajudar! 😊`,
        hasLinks: false
      };
    }

    // Gerenciar estágios da conversa
    if (conversationStage === 'greeting' && !userName) {
      const extractedName = extractName(message);
      if (extractedName) {
        setUserName(extractedName);
        userProfile.current.name = extractedName;
        setConversationStage('name_collected');
        return {
          text: `Prazer em te conhecer, ${extractedName}! 😊✨\n\nAgora me conta, de qual cidade você é? Atendemos:\n\n📍 Sumé\n📍 Congo\n📍 Caraúbas\n📍 Camalaú\n\nIsso me ajuda a te direcionar melhor! 🌟`,
          hasLinks: false
        };
      } else {
        return {
          text: "Que legal conversar contigo! 😄 Mas não consegui pegar seu nome. Pode me dizer como você se chama? Assim posso te atender de forma mais pessoal! 💫",
          hasLinks: false
        };
      }
    }

    if (conversationStage === 'name_collected' && !userCity) {
      const extractedCity = extractCity(message);
      if (extractedCity) {
        setUserCity(extractedCity);
        userProfile.current.city = extractedCity;
        setConversationStage('city_collected');
        const cityInfo = cities[extractedCity];
        return {
          text: `Perfeito, ${userName}! Você é de ${cityInfo.name}! 🏙️✨\n\nAgora posso te ajudar melhor! Em que posso te auxiliar hoje?\n\n💡 Posso ajudar com:\n• Planos de internet\n• Problemas técnicos\n• Informações sobre instalação\n• Suporte geral\n\nO que você precisa? 😊`,
          hasLinks: true,
          links: [
            { text: `WhatsApp ${cityInfo.name}`, action: () => window.open(`https://wa.me/${cityInfo.whatsapp}`, '_blank') }
          ]
        };
      } else {
        return {
          text: `${userName}, não consegui identificar sua cidade! 🤔\n\nVocê é de qual dessas cidades?\n\n📍 Sumé\n📍 Congo\n📍 Caraúbas\n📍 Camalaú\n\nMe ajuda aí! 😊`,
          hasLinks: false
        };
      }
    }

    // Verificar problemas do dia a dia primeiro
    for (const [problemType, data] of Object.entries(dailyProblems)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        const greeting = userName ? `${userName}, ` : '';
        return {
          text: `${greeting}${data.solution}`,
          hasLinks: true,
          links: userCity ? [
            { text: `Falar com Técnico - ${cities[userCity].name}`, action: () => window.open(`https://wa.me/${cities[userCity].whatsapp}`, '_blank') }
          ] : [
            { text: "Suporte Técnico", action: () => navigateToSection('support-section') }
          ]
        };
      }
    }
    
    let bestMatch = null;
    let maxMatches = 0;
    let contextScore = 0;
    
    // Sistema de pontuação inteligente com contexto
    for (const [category, data] of Object.entries(knowledgeBase)) {
      let matches = 0;
      let exactMatches = 0;
      
      data.keywords.forEach(keyword => {
        if (message.includes(keyword)) {
          matches++;
          if (message.split(' ').includes(keyword)) {
            exactMatches++;
          }
        }
      });
      
      // Bonus por contexto da conversa
      const contextBonus = conversationContext.current.some(prevMsg => 
        data.keywords.some(keyword => prevMsg.includes(keyword))
      ) ? 1 : 0;
      
      const score = matches + (exactMatches * 2) + contextBonus;
      
      if (score > maxMatches) {
        maxMatches = score;
        bestMatch = data;
        contextScore = score;
      }
    }
    
    if (bestMatch && contextScore >= 1) {
      const responseText = typeof bestMatch.response === 'function' 
        ? bestMatch.response(userName) 
        : bestMatch.response;
      
      const links = bestMatch.links || [];
      if (userCity && cities[userCity] && bestMatch.hasLinks) {
        links.push({ 
          text: `WhatsApp ${cities[userCity].name}`, 
          action: () => window.open(`https://wa.me/${cities[userCity].whatsapp}`, '_blank') 
        });
      }
      
      return {
        text: responseText,
        hasLinks: bestMatch.hasLinks || false,
        links: links
      };
    }

    // Respostas contextuais melhoradas
    const greetingWords = ['oi', 'olá', 'ola', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'e ai'];
    if (greetingWords.some(word => message.includes(word))) {
      const greeting = userName ? `Oi ${userName}! ` : 'Oi! ';
      const greetings = [
        `${greeting}Que alegria falar com você! 😊 Como posso iluminar seu dia?`,
        `${greeting}👋 Que bom te ver por aqui! Em que posso ajudar?`,
        `${greeting}🌟 Estou aqui para te ajudar com o maior prazer!`
      ];
      return {
        text: greetings[Math.floor(Math.random() * greetings.length)],
        hasLinks: false
      };
    }

    const thankWords = ['obrigad', 'valeu', 'muito bom', 'perfeito', 'ótimo', 'excelente'];
    if (thankWords.some(word => message.includes(word))) {
      const greeting = userName ? `${userName}, ` : '';
      const thanks = [
        `Aaah, ${greeting}que fofo! 💙 Fico super feliz em ajudar! Se precisar de mais alguma coisa, é só chamar!`,
        `${greeting}que bom que consegui te ajudar! 😊 Estou sempre aqui para você!`,
        `Obrigada, ${greeting}! 🌟 Adoro quando consigo resolver as coisas! Mix Fibra é isso aí!`
      ];
      return {
        text: thanks[Math.floor(Math.random() * thanks.length)],
        hasLinks: false
      };
    }

    const byeWords = ['tchau', 'até logo', 'bye', 'falou', 'até mais'];
    if (byeWords.some(word => message.includes(word))) {
      const greeting = userName ? `${userName}` : 'você';
      return {
        text: `Até logo, ${greeting}! 👋 Foi um prazer conversar contigo! Lembra: Mix Fibra, conectando você ao futuro! 🚀✨`,
        hasLinks: false
      };
    }

    // Detecção de humor/brincadeiras
    const funnyWords = ['haha', 'kkkk', 'rsrs', 'lol', 'engraçado', 'piada'];
    if (funnyWords.some(word => message.includes(word))) {
      return {
        text: humorousResponses[Math.floor(Math.random() * humorousResponses.length)],
        hasLinks: false
      };
    }

    // Resposta inteligente com sugestões
    const greeting = userName ? `${userName}, ` : '';
    const suggestions = [
      "📋 Planos e preços",
      "🛠️ Suporte técnico", 
      "🏠 Instalação",
      "📍 Cobertura",
      "📞 Contratação"
    ];
    
    const links = [];
    if (userCity && cities[userCity]) {
      links.push({ text: `WhatsApp ${cities[userCity].name}`, action: () => window.open(`https://wa.me/${cities[userCity].whatsapp}`, '_blank') });
    }
    links.push({ text: "Ver Todos os Planos", action: () => scrollToSection('plans-section') });
    
    return {
      text: `💭 ${greeting}não tenho certeza do que você precisa, mas posso ajudar com:\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n💬 Ou me conta de outro jeito! Sou toda ouvidos! 👂😊`,
      hasLinks: true,
      links: links
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !chatActive) return;

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

    setTimeout(() => {
      const response = getResponse(messageToProcess);
      const botResponse = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        hasLinks: response.hasLinks,
        links: response.links
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      if (chatActive) {
        speakMessage(response.text);
      }
    }, 1500);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && chatActive) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakMessage = (text) => {
    if (synthRef.current && !isSpeaking && chatActive) {
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[•✅❌🎯📋🛠️🏠📍📞⚡💬]/g, '')
        .replace(/\n/g, '. ')
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      const voices = synthRef.current.getVoices();
      const ptBrVoice = voices.find(voice => 
        voice.lang.includes('pt-BR') || voice.lang.includes('pt')
      );
      
      if (ptBrVoice) {
        utterance.voice = ptBrVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      if (chatActive) {
        synthRef.current.speak(utterance);
      }
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
      <div 
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50"
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onClick={() => {
            setIsOpen(true);
            setChatActive(true);
          }}
          className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse cursor-pointer"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            pointerEvents: 'auto'
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl md:text-2xl">👩‍💼</span>
            </div>
            <div className="hidden lg:block text-left">
              <div className="font-bold text-sm">Ingrid - IA Assistente</div>
              <div className="text-xs opacity-90">Clique para conversar!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-72 md:w-80' : 'w-80 md:w-96'}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">👩‍💼</span>
            </div>
            <div>
              <div className="font-bold text-white">Ingrid IA</div>
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
              onClick={() => {
                setIsOpen(false);
                setChatActive(false);
                stopSpeaking();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 md:h-96 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
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
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        {message.hasLinks && message.links && (
                          <div className="mt-3 space-y-2">
                            {message.links.map((link, index) => (
                              <button
                                key={index}
                                onClick={link.action}
                                className="flex items-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs rounded-xl transition-all duration-300 hover:scale-105"
                              >
                                <ArrowRight size={12} />
                                {link.text}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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
            <div className="p-3 md:p-4 border-t border-white/20">
              <div className="flex gap-1 md:gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite ou fale sua pergunta..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-3 md:px-4 py-2 text-sm md:text-base text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                
                <button
                  onClick={startListening}
                  disabled={isListening || !chatActive || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
                  className={`p-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed text-white`}
                  title={isListening ? 'Ouvindo...' : 'Clique para falar'}
                >
                  <Mic size={16} className={`md:w-5 md:h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </button>
                
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all duration-300 hover:scale-105"
                    title="Parar fala"
                  >
                    <VolumeX size={16} className="md:w-5 md:h-5" />
                  </button>
                )}
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || !chatActive}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <Send size={16} className="md:w-5 md:h-5" />
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