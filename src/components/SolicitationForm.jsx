// Caminho: src/components/SolicitationForm.jsx

import React, { useState } from 'react';

// IMPORTANTE: Adicionado React.forwardRef para que o componente possa receber a ref do pai
const SolicitationForm = React.forwardRef(({ }, ref) => {
    // Lista das cidades que a empresa trabalha
    const workingCities = ["Sumé", "Congo", "Camalaú", "Caraúbas", "Outra Cidade"]; 
    // Datas disponíveis para pagamento
    const paymentDays = ["10", "20", "30"];
    // Períodos do dia disponíveis para instalação
    const installationPeriods = ["Manhã", "Tarde"]; // <-- NOVO: Períodos do dia

    const [formData, setFormData] = useState({
        fullName: '',
        cpfCnpj: '',
        phone: '',
        email: '',
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: '',
        desiredPlan: '',
        installationDate: '',
        installationPeriod: '', // <-- NOVO CAMPO: Período de instalação
        bestPaymentDay: '',
        message: ''
    });

    const [submissionStatus, setSubmissionStatus] = useState(null); // 'idle', 'loading', 'success', 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        // Formatação dos dados para a mensagem do WhatsApp
        const message = `
        Olá! Gostaria de solicitar a internet da Mix Fibra com os seguintes dados:

        *Dados Pessoais:*
        Nome Completo: ${formData.fullName}
        CPF/CNPJ: ${formData.cpfCnpj}
        Telefone: ${formData.phone}
        ${formData.email ? `E-mail: ${formData.email}` : ''}

        *Endereço de Instalação:*
        CEP: ${formData.zipCode}
        Rua/Avenida: ${formData.street}, Nº ${formData.number}
        Bairro: ${formData.neighborhood}
        Complemento: ${formData.complement || 'Não informado'}
        Cidade: ${formData.city} - ${formData.state}

        *Detalhes da Solicitação:*
        Plano Desejado: ${formData.desiredPlan || 'Não especificado'}
        Data Preferencial para Instalação: ${formData.installationDate || 'Não informada'}
        Período Preferencial de Instalação: ${formData.installationPeriod || 'Não informado'} <-- NOVO CAMPO NA MENSAGEM
        Melhor Dia de Pagamento: ${formData.bestPaymentDay || 'Não informado'}
        ${formData.message ? `Mensagem Adicional: ${formData.message}` : ''}

        Por favor, entrem em contato para dar andamento à solicitação.
        `;

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5583996411187?text=${encodedMessage}`; // Número do WhatsApp aqui

        try {
            // Abre o WhatsApp em uma nova aba
            window.open(whatsappUrl, '_blank');
            setSubmissionStatus('success');
            setFormData({ // Limpa o formulário após o sucesso
                fullName: '', cpfCnpj: '', phone: '', email: '',
                zipCode: '', street: '', number: '', neighborhood: '', complement: '',
                city: '', state: '', desiredPlan: '', installationDate: '', installationPeriod: '', bestPaymentDay: '', message: '' // Limpa o novo campo também
            });
        } catch (error) {
            console.error('Erro ao abrir o WhatsApp ou enviar solicitação:', error);
            setSubmissionStatus('error');
        } finally {
            setSubmissionStatus('idle'); // Volta o status para 'idle'
        }
    };

    return (
        <section 
            id="solicitation-form" 
            ref={ref} // IMPORTANTE: Anexando a ref à seção
            className="w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12"
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                Solicite Sua <span className="text-orange-400">Internet</span>
            </h2>
            <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Preencha o formulário abaixo e nossa equipe entrará em contato para finalizar seu cadastro e agendar a instalação!
            </p>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-blue-800/80 glass rounded-2xl p-8 shadow-xl text-left">
                {/* Campos de Dados Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField label="Nome Completo" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    <InputField label="CPF / CNPJ" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} required />
                    {/* RG REMOVIDO */}
                    <InputField label="Telefone com DDD" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
                    <InputField label="E-mail (Opcional)" name="email" value={formData.email} onChange={handleChange} type="email" /> {/* required REMOVIDO */}
                </div>

                {/* Campos de Endereço */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-700 pb-2">Endereço de Instalação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField label="CEP" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    <InputField label="Rua / Avenida" name="street" value={formData.street} onChange={handleChange} required />
                    <InputField label="Número" name="number" value={formData.number} onChange={handleChange} required />
                    <InputField label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                    <InputField label="Complemento (apto, bloco, etc.)" name="complement" value={formData.complement} onChange={handleChange} />
                    
                    {/* Campo Cidade como Select */}
                    <div>
                        <label htmlFor="city" className="block text-blue-200 text-sm font-bold mb-2">
                            Cidade <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        >
                            <option value="">Selecione a cidade</option>
                            {workingCities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <InputField label="Estado (UF)" name="state" value={formData.state} onChange={handleChange} required />
                </div>

                {/* Campo de Plano Desejado (Opcional - pode ser pré-preenchido do recomendador) */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-700 pb-2">Detalhes da Solicitação</h3>
                <div className="mb-6">
                    <label htmlFor="desiredPlan" className="block text-blue-200 text-sm font-bold mb-2">Plano Desejado</label>
                    <select
                        id="desiredPlan"
                        name="desiredPlan"
                        value={formData.desiredPlan}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">Selecione um plano</option>
                        <option value="50MB">50MB</option>
                        <option value="100MB">100MB (Popular)</option>
                        <option value="200MB">200MB</option>
                        <option value="300MB">300MB (Recomendado)</option>
                        <option value="500MB">500MB</option>
                    </select>
                </div>

                {/* Data de Instalação Preferencial */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> {/* Alterado de mb-6 para mb-8 e adicionado grid */}
                    <div>
                        <label htmlFor="installationDate" className="block text-blue-200 text-sm font-bold mb-2">Data Preferencial para Instalação</label>
                        <input
                            type="date"
                            id="installationDate"
                            name="installationDate"
                            value={formData.installationDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* NOVO CAMPO: Período de Instalação */}
                    <div>
                        <label htmlFor="installationPeriod" className="block text-blue-200 text-sm font-bold mb-2">Período Preferencial</label>
                        <select
                            id="installationPeriod"
                            name="installationPeriod"
                            value={formData.installationPeriod}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Selecione o período</option>
                            {installationPeriods.map((period, index) => (
                                <option key={index} value={period}>{period}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Melhor Dia de Pagamento */}
                <div className="mb-8">
                    <label htmlFor="bestPaymentDay" className="block text-blue-200 text-sm font-bold mb-2">Melhor Dia de Pagamento</label>
                    <select
                        id="bestPaymentDay"
                        name="bestPaymentDay"
                        value={formData.bestPaymentDay}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">Selecione o dia</option>
                        {paymentDays.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                {/* Mensagem Adicional */}
                <div className="mb-8">
                    <label htmlFor="message" className="block text-blue-200 text-sm font-bold mb-2">Mensagem Adicional (opcional)</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                        placeholder="Ex: 'Entrar em contato após às 14h', 'Dúvidas sobre a instalação', etc."
                    ></textarea>
                </div>

                {/* Botão de Envio */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submissionStatus === 'loading'}
                >
                    {submissionStatus === 'loading' ? 'Preparando WhatsApp...' : 'Solicitar Agora'}
                </button>

                {/* Mensagens de Status (apenas para feedback visual, o WhatsApp já abriu) */}
                {submissionStatus === 'success' && (
                    <p className="mt-4 text-green-400 text-center text-lg font-semibold">
                        Redirecionando para o WhatsApp! Sua solicitação será enviada por lá.
                    </p>
                )}
                {submissionStatus === 'error' && (
                    <p className="mt-4 text-red-400 text-center text-lg font-semibold">
                        Ocorreu um erro ao abrir o WhatsApp. Por favor, verifique seu aplicativo ou tente novamente.
                    </p>
                )}
            </form>
        </section>
    );
});

// Sub-componente para campos de input comuns
const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-blue-200 text-sm font-bold mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required={required}
        />
    </div>
);

export default SolicitationForm;