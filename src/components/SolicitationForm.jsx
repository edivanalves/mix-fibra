// Caminho: src/components/SolicitationForm.jsx

import React, { useState } from 'react';
import { User, MapPin, DollarSign, Calendar, Clock, MessageSquareText, Mail, Phone, Compass } from 'lucide-react';

const SolicitationForm = React.forwardRef(({ initialDesiredPlan = '' }, ref) => {
    const workingCities = ["Sumé", "Congo", "Camalaú", "Caraúbas", "Outra Cidade"];
    const paymentDays = ["10", "20", "30"];
    const installationPeriods = ["Manhã", "Tarde"];

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
        desiredPlan: initialDesiredPlan,
        installationDate: '',
        installationPeriod: '',
        bestPaymentDay: '',
        message: '',
        // Removido latitude e longitude do estado, pois o endereço será preenchido diretamente
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [geolocationStatus, setGeolocationStatus] = useState(''); // Feedback ao utilizador sobre a geolocalização

    React.useEffect(() => {
        if (initialDesiredPlan) {
            setFormData(prev => ({ ...prev, desiredPlan: initialDesiredPlan }));
        }
    }, [initialDesiredPlan]);


    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 2) {
                value = `(${value.substring(0, 2)})${value.substring(2, 7)}${value.length > 7 ? '-' + value.substring(7, 11) : ''}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
        }
        if (name === 'zipCode') {
            value = value.replace(/\D/g, '');
            if (value.length > 5) {
                value = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGetLocationAndFillAddress = () => {
        setGeolocationStatus('A obter localização...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setGeolocationStatus('Localização obtida. A procurar endereço...');

                    // URL da API Nominatim para geocodificação inversa
                    const NOMINATIM_URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

                    try {
                        const response = await fetch(NOMINATIM_URL, {
                            headers: {
                                'User-Agent': 'MixFibra/1.0 (mixfrasume@gmail.com)' // Seu email real foi adicionado aqui
                            }
                        });
                        const data = await response.json();

                        if (data && data.address) {
                            const address = data.address;
                            setFormData(prev => ({
                                ...prev,
                                // Tenta preencher os campos do formulário com dados da API Nominatim
                                zipCode: address.postcode || prev.zipCode,
                                street: address.road || prev.street,
                                number: address.house_number || '', // Pode não vir sempre, ou vir em 'road'
                                neighborhood: address.suburb || address.town || prev.neighborhood,
                                city: address.city || address.town || address.village || prev.city,
                                state: address.state_code || address.state || prev.state,
                                // Nota: Complemento é difícil de obter via geocodificação inversa.
                                // Para informações mais precisas como número, o usuário talvez precise ajustar.
                            }));
                            setGeolocationStatus('Endereço preenchido com sucesso!');
                        } else {
                            setGeolocationStatus('Não foi possível encontrar um endereço detalhado para esta localização.');
                        }
                    } catch (apiError) {
                        console.error("Erro ao obter endereço da API Nominatim: ", apiError);
                        setGeolocationStatus('Erro ao preencher endereço. Por favor, preencha manualmente.');
                    } finally {
                        setTimeout(() => setGeolocationStatus(''), 7000); // Limpa status após 7s
                    }
                },
                (error) => {
                    console.error("Erro ao obter localização GPS: ", error);
                    let errorMessage = '';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Permissão de geolocalização negada. Por favor, permita o acesso à sua localização no navegador.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Localização indisponível. Não foi possível determinar a sua posição.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Tempo limite excedido ao tentar obter a localização.';
                            break;
                        default:
                            errorMessage = 'Ocorreu um erro desconhecido ao obter a localização.';
                            break;
                    }
                    setGeolocationStatus(`Erro: ${errorMessage}`);
                    setTimeout(() => setGeolocationStatus(''), 7000);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setGeolocationStatus('Erro: Geolocalização não é suportada pelo seu navegador.');
            setTimeout(() => setGeolocationStatus(''), 7000);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        const requiredFields = ['fullName', 'cpfCnpj', 'phone', 'zipCode', 'street', 'number', 'neighborhood', 'city', 'state'];
        const missingFields = requiredFields.filter(field => !formData[field].trim());

        if (missingFields.length > 0) {
            alert(`Por favor, preencha todos os campos obrigatórios: ${missingFields.map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}.`);
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus('idle'), 3000);
            return;
        }

        const confirmAndOpenWhatsApp = () => {
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
${(formData.street || formData.city) ? `(Endereço obtido via GPS/Preenchimento: ${formData.street}, ${formData.number}, ${formData.neighborhood}, ${formData.city} - ${formData.state})` : ''}

*Detalhes da Solicitação:*
Plano Desejado: ${formData.desiredPlan || 'Não especificado'}
Data Preferencial para Instalação: ${formData.installationDate || 'Não informada'}
Período Preferencial de Instalação: ${formData.installationPeriod || 'Não informado'}
Melhor Dia de Pagamento: ${formData.bestPaymentDay || 'Não informado'}
${formData.message ? `Mensagem Adicional: ${formData.message}` : ''}

Por favor, entrem em contacto para dar andamento à solicitação.
`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5583996411187?text=${encodedMessage}`;

            try {
                window.open(whatsappUrl, '_blank');
                setSubmissionStatus('success');
                setFormData({
                    fullName: '', cpfCnpj: '', phone: '', email: '',
                    zipCode: '', street: '', number: '', neighborhood: '', complement: '',
                    city: '', state: '', desiredPlan: initialDesiredPlan, installationDate: '', installationPeriod: '', bestPaymentDay: '', message: '',
                });
            } catch (error) {
                console.error('Erro ao abrir o WhatsApp:', error);
                setSubmissionStatus('error');
            } finally {
                setTimeout(() => setSubmissionStatus('idle'), 3000);
            }
        };
        confirmAndOpenWhatsApp();
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <section
            id="solicitation-form"
            ref={ref}
            className="w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12"
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                Solicite a Sua <span className="text-orange-400">Internet</span>
            </h2>
            <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Preencha o formulário abaixo e a nossa equipa entrará em contacto para finalizar o seu registo e agendar a instalação!
            </p>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-blue-800/80 glass rounded-2xl p-8 shadow-xl text-left text-blue-200">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-700 pb-2 flex items-center gap-2">
                    <User size={24} className="text-orange-400" />
                    Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField label="Nome Completo" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    <InputField label="CPF / CNPJ" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} required />
                    <InputField label="Telefone com DDD" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
                    <InputField label="E-mail (Opcional)" name="email" value={formData.email} onChange={handleChange} type="email" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-700 pb-2 flex items-center gap-2">
                    <MapPin size={24} className="text-cyan-300" />
                    Endereço de Instalação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField label="CEP" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    <InputField label="Rua / Avenida" name="street" value={formData.street} onChange={handleChange} required />
                    <InputField label="Número" name="number" value={formData.number} onChange={handleChange} required />
                    <InputField label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                    <InputField label="Complemento (apto, bloco, etc.)" name="complement" value={formData.complement} onChange={handleChange} />

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

                    {/* Botão de Obter Endereço via Geolocalização */}
                    <div className="md:col-span-2">
                        <button
                            type="button"
                            onClick={handleGetLocationAndFillAddress}
                            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4"
                            disabled={geolocationStatus.includes('A obter localização') || geolocationStatus.includes('A procurar endereço')}
                        >
                            {(geolocationStatus.includes('A obter localização') || geolocationStatus.includes('A procurar endereço')) ? (
                                <>
                                    <div className="loader animate-spin border-t-4 border-white border-solid rounded-full h-5 w-5"></div>
                                    A obter localização...
                                </>
                            ) : (
                                <>
                                    <Compass size={20} />
                                    Obter Endereço Pelo GPS
                                </>
                            )}
                        </button>
                        {geolocationStatus && (
                            <p className={`mt-2 text-sm text-center ${geolocationStatus.includes('Erro') ? 'text-red-400' : 'text-green-400'}`}>
                                {geolocationStatus}
                            </p>
                        )}
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-blue-700 pb-2 flex items-center gap-2">
                    <DollarSign size={24} className="text-green-400" />
                    Detalhes da Solicitação
                </h3>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label htmlFor="installationDate" className="block text-blue-200 text-sm font-bold mb-2">Data Preferencial para Instalação</label>
                        <input
                            type="date"
                            id="installationDate"
                            name="installationDate"
                            value={formData.installationDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            min={today}
                        />
                    </div>

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

                <div className="mb-8">
                    <label htmlFor="message" className="block text-blue-200 text-sm font-bold mb-2">Mensagem Adicional (opcional)</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                        placeholder="Ex: 'Entrar em contacto após as 14h', 'Dúvidas sobre a instalação', etc."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submissionStatus === 'loading'}
                >
                    {submissionStatus === 'loading' ? 'Preparando WhatsApp...' : 'Solicitar Agora'}
                </button>

                {submissionStatus === 'success' && (
                    <p className="mt-4 text-green-400 text-center text-lg font-semibold">
                        Redirecionando para o WhatsApp! A sua solicitação será enviada por lá.
                    </p>
                )}
                {submissionStatus === 'error' && (
                    <p className="mt-4 text-red-400 text-center text-lg font-semibold">
                        Ocorreu um erro ao abrir o WhatsApp. Por favor, verifique a aplicação ou tente novamente.
                    </p>
                )}
            </form>
        </section>
    );
});

// Sub-componente para campos de input comuns
const InputField = ({ label, name, value, onChange, type = 'text', required = false, readOnly = false }) => (
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
            readOnly={readOnly}
        />
    </div>
);

export default SolicitationForm;
