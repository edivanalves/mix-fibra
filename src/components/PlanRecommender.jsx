import React, { useState, useEffect, useRef } from 'react';

const PlanRecommender = () => {
  const [usageInput, setUsageInput] = useState('');
  const [recommendationOutput, setRecommendationOutput] = useState('');
  const [llmLoading, setLlmLoading] = useState(false);
  const debounceRef = useRef();

  const plansData = [/* ...mantido como está... */];

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
        if (lowerInput.includes(keyword)) matchCount++;
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
        <a href="https://wa.me/5583996411187?text=Tenho%20interesse%20no%20plano%20de%20${recommendedPlan.megas}MB" 
           target="_blank" rel="noopener noreferrer"
           class="inline-block mt-4 w-full sm:w-auto text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 shadow-md">
          Assinar via WhatsApp
        </a>
        <p class="text-blue-200 mt-4 text-sm">Essa é uma sugestão baseada na sua descrição. Para mais detalhes, fale com nosso atendimento clicando acima.</p>
      `;
    } else {
      return `
        <p class="text-blue-100">Não conseguimos recomendar um plano com base nessa descrição.</p>
        <p class="text-blue-100 mt-2">Tente ser mais específico (ex: "assistimos filmes em 4K e jogamos online") ou <a href="https://wa.me/5583996411187" target="_blank" class="text-orange-400 hover:underline">fale com um atendente</a>.</p>
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
    <div className="bg-gradient-to-br from-blue-800 to-blue-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl mt-10 max-w-3xl mx-auto border border-blue-700">
      <h3 className="text-3xl font-extrabold text-white mb-6 text-center">Qual o plano ideal para você?</h3>
      
      <textarea
        className="w-full p-4 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4 h-32 resize-y transition-all"
        placeholder="Ex: Somos 4 pessoas, assistimos filmes em 4K e jogamos online todos os dias."
        value={usageInput}
        onChange={(e) => setUsageInput(e.target.value)}
      ></textarea>

      {llmLoading && (
        <div className="flex items-center justify-center mt-6 gap-3">
          <div className="animate-spin border-4 border-orange-500 border-t-transparent rounded-full h-6 w-6"></div>
          <p className="text-lg text-blue-200">Analisando suas necessidades...</p>
        </div>
      )}

      <div
        className={`mt-6 p-4 sm:p-6 bg-blue-950/60 rounded-lg text-left text-blue-100 transition-all duration-500 ease-in-out ${
          recommendationOutput && !llmLoading ? '' : 'hidden'
        }`}
        dangerouslySetInnerHTML={{ __html: recommendationOutput }}
      ></div>
    </div>
  );
};

export default PlanRecommender;
