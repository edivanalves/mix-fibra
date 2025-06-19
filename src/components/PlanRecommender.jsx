// Caminho: src/components/PlanRecommender.jsx

import React, { useState, useEffect, useRef } from 'react';

const PlanRecommender = () => {
    const [usageInput, setUsageInput] = useState('');
    const [recommendationOutput, setRecommendationOutput] = useState('');
    const [llmLoading, setLlmLoading] = useState(false);
    const debounceRef = useRef();

    const plansData = [
        {
            megas: 50,
            price: '39,99',
            description: 'Ideal para uso básico, redes sociais e navegação leve.',
            highlight: false,
            keywords: [
                'básico', 'pouco uso', 'um', '1', 'email', 'e-mail', 'zap-zap',
                'whatsapp', 'facebook', 'instagram', 'ler e-mails', 'mensagens',
                'notícias', 'ver feed', 'curtir posts', 'consultar saldo', 'usar app bancário'
            ]
        },
        {
            megas: 100,
            price: '49,99',
            description: 'Perfeito para streaming de filmes e vídeos em HD e uso em casal.',
            highlight: true,
            keywords: [
                'streaming', 'filmes', 'séries', 'hd', 'smart tv', 'netflix', 'youtube',
                'prime video', 'globoplay', 'disney+', 'assistir', 'spotify', 'podcasts',
                'vídeochamada casual', 'maratonar série', '2 pessoas', 'casal', 'moderado'
            ]
        },
        {
            megas: 200,
            price: '59,99',
            description: 'Para home office, aulas online e jogos casuais.',
            highlight: false,
            keywords: [
                'home office', 'trabalho remoto', 'aulas online', 'google meet', 'zoom', 'teams',
                'jogar online', 'ping', 'lag', 'game casual', 'baixar arquivos', 'downloads pequenos',
                '3 pessoas', 'produtividade', 'vídeo chamada', 'estudos', 'estudando em casa'
            ]
        },
        {
            megas: 300,
            price: '69,99',
            description: 'Ideal para casas conectadas, múltiplas telas e 4K.',
            highlight: true,
            keywords: [
                '4k', 'filmes 4k', 'streaming 4k', 'tv 4k', 'resolução 4k', 'multistream',
                'vários dispositivos', 'familia', 'muitas pessoas', 'casa grande', 'downloads grandes',
                'upload pesado', 'uso intenso', 'quatro pessoas', 'tv e celular ao mesmo tempo'
            ]
        },
        {
            megas: 500,
            price: '99,99',
            description: 'Ultra velocidade para empresas e gamers profissionais.',
            highlight: false,
            keywords: [
                'empresa', 'negócio', 'escritório', 'servidor', 'vpn', 'gamer profissional',
                'streamer', 'twitch', 'youtube live', 'esports', 'baixar jogos', 'upload grande',
                'latência baixa', 'ping baixo', 'jogar competitivo', 'produtividade máxima', 'lan party'
            ]
        }
    ];

    const getPlanRecommendation = (input) => {
        const lowerInput = input.toLowerCase();
        let recommendedPlan = null;
        let highestMatchCount = 0;

        if (lowerInput.length < 5) {
            return `<p class="text-blue-100">Descreva melhor como usa a internet para receber uma recomendação personalizada.</p>`;
        }

        for (const plan of plansData) {
            let matchCount = 0;
            for (const keyword of plan.keywords) {
                if (lowerInput.includes(keyword)) {
                    matchCount++;
                }
            }
            if (matchCount > highestMatchCount) {
                highestMatchCount = matchCount;
                recommendedPlan = plan;
            }
        }

        if (recommendedPlan && highestMatchCount > 0) {
            return `
                <div class="text-xl font-bold text-orange-400 mb-2">Plano recomendado: ${recommendedPlan.megas}MB</div>
                <p class="text-blue-100 mb-2">${recommendedPlan.description}</p>
                <p class="text-white text-lg font-semibold">Por apenas R$${recommendedPlan.price}/mês</p>
                <a href="https://wa.me/5583996411187?text=Tenho%20interesse%20no%20plano%20de%20${recommendedPlan.megas}MB" target="_blank" rel="noopener noreferrer" class="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200">
                    Assinar via WhatsApp
                </a>
                <p class="text-blue-200 mt-4 text-sm">Essa é uma sugestão baseada na sua descrição. Para mais detalhes, fale com nosso atendimento clicando acima.</p>
            `;
        } else {
            return `
                <p class="text-blue-100">Não conseguimos recomendar um plano com base nessa descrição.</p>
                <p class="text-blue-100">Tente ser mais específico (ex: "assistimos filmes em 4K e jogamos online") ou <a href="https://wa.me/5583996411187" target="_blank" class="text-orange-400 hover:underline">fale com um atendente</a>.</p>
            `;
        }
    };

    useEffect(() => {
        const fetchRecommendation = () => {
            setLlmLoading(true);
            const recommendation = getPlanRecommendation(usageInput);
            setRecommendationOutput(recommendation);
            setLlmLoading(false);
        };

        if (!usageInput.trim()) {
            setRecommendationOutput('');
            setLlmLoading(false);
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);

        setLlmLoading(true);
        debounceRef.current = setTimeout(fetchRecommendation, 800);

        return () => clearTimeout(debounceRef.current);
    }, [usageInput]);

    return (
        <div className="bg-gradient-to-br from-blue-800 to-blue-900/80 rounded-2xl p-8 shadow-2xl mt-10 max-w-2xl mx-auto border border-blue-600">
            <h3 className="text-3xl font-extrabold text-white mb-4">Qual o plano ideal para você?</h3>
            <textarea
                className="w-full p-4 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4 h-32 resize-y"
                placeholder="Ex: Somos 4 pessoas, assistimos filmes em 4K e jogamos online todos os dias."
                value={usageInput}
                onChange={(e) => setUsageInput(e.target.value)}
            ></textarea>

            {llmLoading && (
                <div className="flex items-center justify-center mt-6">
                    <div className="loader animate-spin border-t-4 border-orange-500 border-solid rounded-full h-8 w-8"></div>
                    <p className="ml-4 text-lg text-blue-200">Analisando suas necessidades...</p>
                </div>
            )}

            <div
              className={`mt-6 p-4 bg-blue-900 rounded-lg text-left text-blue-100 transition-all duration-500 ease-in-out ${recommendationOutput && !llmLoading ? '' : 'hidden'}`}
              dangerouslySetInnerHTML={{ __html: recommendationOutput }}
            ></div>
        </div>
    );
};

export default PlanRecommender;
