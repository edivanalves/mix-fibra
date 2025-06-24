import React from 'react';

const TermosDeUso = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-blue-900">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        Termos de Uso
      </h1>

      <p className="mb-4 text-justify">
        Bem-vindo à Mix Fibra! Valorizamos a transparência, a ética e o respeito aos nossos clientes. Por isso, criamos este documento com linguagem clara para explicar como funcionam nossos serviços.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">
        1. Sem contrato de fidelidade
      </h2>
      <p className="mb-4 text-justify">
        Acreditamos na liberdade do cliente. Por isso, não exigimos contrato de fidelidade. Você pode cancelar nossos serviços a qualquer momento, sem multas ou taxas de rescisão.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">
        2. Sem cobrança de juros
      </h2>
      <p className="mb-4 text-justify">
        Não aplicamos juros sobre faturas em atraso. Caso haja um atraso no pagamento, o serviço pode ser temporariamente suspenso até a regularização, mas não haverá acréscimos de valores indevidos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">
        3. Qualidade e responsabilidade
      </h2>
      <p className="mb-4 text-justify">
        Buscamos oferecer um serviço de internet estável e de qualidade. No entanto, eventuais instabilidades podem ocorrer por causas externas (como intempéries ou manutenção da rede). Nestes casos, nossa equipe técnica atuará o mais rápido possível.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">
        4. Privacidade
      </h2>
      <p className="mb-4 text-justify">
        Respeitamos a privacidade de nossos clientes. Os dados fornecidos são utilizados exclusivamente para fins administrativos e nunca são compartilhados com terceiros sem consentimento.
      </p>

      <p className="mt-8 text-sm text-blue-600 text-center italic">
        Última atualização: Junho de 2025
      </p>
    </div>
  );
};

export default TermosDeUso;
