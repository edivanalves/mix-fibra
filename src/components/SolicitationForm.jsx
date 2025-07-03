import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { User, MapPin, DollarSign, Compass, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGeolocationAddress } from '../hooks/useGeolocationAddress';
import { maskDocument, isValidDocument } from '../utils/validators';

const FORM_STORAGE_KEY = 'solicitationFormData';

const workingCities = ['Sumé', 'Congo', 'Camalaú', 'Caraúbas', 'Outra Cidade'];
const paymentDays = ['10', '20', '30'];
const installationPeriods = ['Manhã', 'Tarde'];
const brazilianStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

const whatsappNumbers = {
  'Caraúbas': '5583988539424',
  'Sumé': '5583996411187',
  'Camalaú': '5583996784194',
  'Congo': '5583999298366',
  'Outra Cidade': '5583996411187'
};

const SolicitationForm = React.forwardRef(({ initialDesiredPlan = '' }, ref) => {
  const { address, isLoading: isGeolocating, getUserLocation } = useGeolocationAddress();
  const [errors, setErrors] = useState({});

  const initialFormData = useMemo(() => ({
    fullName: '', cpfCnpj: '', phone: '', email: '',
    zipCode: '', street: '', number: '', neighborhood: '', complement: '',
    city: '', otherCity: '', state: 'PB',
    desiredPlan: initialDesiredPlan, installationDate: '', installationPeriod: '',
    bestPaymentDay: '', message: ''
  }), [initialDesiredPlan]);

  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (address) {
      setFormData(prev => ({
        ...prev,
        zipCode: address.postcode || prev.zipCode,
        street: address.road || prev.street,
        neighborhood: address.suburb || prev.neighborhood,
        city: workingCities.includes(address.city) ? address.city : 'Outra Cidade',
        otherCity: workingCities.includes(address.city) ? '' : address.city,
        state: 'PB', // Força sempre PB já que estamos na Paraíba
      }));
      setErrors(prev => ({ ...prev, zipCode: null, street: null, neighborhood: null, city: null, state: null }));
    }
  }, [address]);

  const handleChange = useCallback((e) => {
    let { name, value } = e.target;

    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 11);
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}${value.length > 7 ? '-' + value.substring(7, 11) : ''}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
    }

    if (name === 'zipCode') {
      value = value.replace(/\D/g, '').slice(0, 8);
      if (value.length > 5) {
        value = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
      }
    }

    if (name === 'cpfCnpj') {
      value = maskDocument(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const requiredFields = ['fullName', 'cpfCnpj', 'phone', 'zipCode', 'street', 'number', 'neighborhood', 'city', 'state'];

    requiredFields.forEach(field => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'Campo obrigatório';
      }
    });

    if (formData.city === 'Outra Cidade' && !formData.otherCity.trim()) {
      newErrors.otherCity = 'Informe o nome da sua cidade';
    }

    if (formData.cpfCnpj && !isValidDocument(formData.cpfCnpj)) {
      newErrors.cpfCnpj = 'CPF ou CNPJ inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Por favor, corrija os campos em destaque.');
      const firstError = document.querySelector('.ring-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const city = formData.city === 'Outra Cidade' ? formData.otherCity : formData.city;
    const whatsappNumber = whatsappNumbers[formData.city] || whatsappNumbers['Outra Cidade'];

    const message = `
Olá! Gostaria de solicitar a internet da Mix Fibra:

*Dados Pessoais:*
- Nome: ${formData.fullName}
- CPF/CNPJ: ${formData.cpfCnpj}
- Telefone: ${formData.phone}
${formData.email ? `- E-mail: ${formData.email}` : ''}

*Endereço de Instalação:*
- CEP: ${formData.zipCode}
- Endereço: ${formData.street}, Nº ${formData.number}
- Bairro: ${formData.neighborhood}
- Complemento: ${formData.complement || 'N/A'}
- Cidade/UF: ${city} - ${formData.state}

*Detalhes da Solicitação:*
- Plano Desejado: ${formData.desiredPlan || 'Não especificado'}
- Data de Instalação: ${formData.installationDate || 'A combinar'}
- Período: ${formData.installationPeriod || 'A combinar'}
- Dia de Pagamento: ${formData.bestPaymentDay || 'A combinar'}
${formData.message ? `\n*Mensagem Adicional:*\n${formData.message}` : ''}
    `;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.trim())}`;

    await toast.promise(
      new Promise(resolve => {
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          resolve();
        }, 500);
      }),
      {
        loading: 'Preparando sua solicitação...',
        success: () => {
          setFormData(initialFormData);
          localStorage.removeItem(FORM_STORAGE_KEY);
          return 'Redirecionando para o WhatsApp!';
        },
        error: 'Erro ao abrir o WhatsApp.'
      }
    );
  }, [formData, validateForm, initialFormData]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <section ref={ref} id="solicitation-form" className="relative w-full max-w-7xl mx-auto px-4 py-20 mt-12">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-3xl" />
      <div className="absolute inset-0 opacity-20 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Send className="w-4 h-4 text-emerald-400" />
            Solicitação Rápida
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Solicite Sua Internet Mix Fibra
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Preencha seus dados e receba atendimento personalizado via WhatsApp. Instalação gratuita em 24-48h!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl text-white max-w-4xl mx-auto">

        {/* Dados Pessoais */}
        <SectionTitle icon={<User className="text-orange-400" />} title="Dados Pessoais" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField label="Nome Completo" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
          <InputField label="CPF / CNPJ" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} error={errors.cpfCnpj} required />
          <InputField label="Telefone com DDD" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required />
          <InputField label="E-mail (Opcional)" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Endereço */}
        <SectionTitle icon={<MapPin className="text-cyan-300" />} title="Endereço de Instalação" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField label="CEP" name="zipCode" value={formData.zipCode} onChange={handleChange} error={errors.zipCode} required />
          <InputField label="Rua / Avenida" name="street" value={formData.street} onChange={handleChange} error={errors.street} required />
          <InputField label="Número" name="number" value={formData.number} onChange={handleChange} error={errors.number} required />
          <InputField label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} error={errors.neighborhood} required />
          <InputField label="Complemento (Opcional)" name="complement" value={formData.complement} onChange={handleChange} />
          <SelectField label="Cidade" name="city" value={formData.city} onChange={handleChange} error={errors.city} required>
            <option value="">Selecione...</option>
            {workingCities.map(city => <option key={city} value={city}>{city}</option>)}
          </SelectField>
          {formData.city === 'Outra Cidade' && (
            <InputField label="Qual cidade?" name="otherCity" value={formData.otherCity} onChange={handleChange} error={errors.otherCity} required />
          )}
          <SelectField label="Estado" name="state" value={formData.state} onChange={handleChange} error={errors.state} required>
            {brazilianStates.map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </SelectField>
        </div>

        <button type="button" onClick={getUserLocation} disabled={isGeolocating} className="w-full mb-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
          {isGeolocating ? <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" /> : <Compass size={20} />}
          {isGeolocating ? 'Buscando Endereço...' : 'Preencher com meu GPS'}
        </button>

        {/* Detalhes */}
        <SectionTitle icon={<DollarSign className="text-green-400" />} title="Detalhes da Solicitação" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SelectField label="Plano Desejado" name="desiredPlan" value={formData.desiredPlan} onChange={handleChange}>
            <option value="">Selecione um plano</option>
            <option value="50MB - R$ 39,99">50MB - R$ 39,99</option>
            <option value="100MB - R$ 49,99 (Popular)">100MB - R$ 49,99 (Popular)</option>
            <option value="200MB - R$ 59,99">200MB - R$ 59,99</option>
            <option value="300MB - R$ 69,99 (Recomendado)">300MB - R$ 69,99 (Recomendado)</option>
            <option value="500MB - R$ 89,99">500MB - R$ 89,99</option>
          </SelectField>
          <SelectField label="Melhor Dia de Pagamento" name="bestPaymentDay" value={formData.bestPaymentDay} onChange={handleChange}>
            <option value="">Selecione o dia</option>
            {paymentDays.map(day => <option key={day} value={day}>{day}</option>)}
          </SelectField>
          <InputField label="Data para Instalação (Opcional)" name="installationDate" type="date" min={today} value={formData.installationDate} onChange={handleChange} />
          <SelectField label="Período Preferencial" name="installationPeriod" value={formData.installationPeriod} onChange={handleChange}>
            <option value="">Selecione o período</option>
            {installationPeriods.map(period => <option key={period} value={period}>{period}</option>)}
          </SelectField>
        </div>

        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-bold mb-2 text-white">Observações Adicionais (opcional)</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Ex: Melhor horário para contato, referências do endereço, etc..."
          />
        </div>

        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-lg" />
          <button type="submit" className="relative w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl text-lg flex justify-center items-center gap-3 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <Send size={20} /> 
              Enviar Solicitação via WhatsApp
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
        </form>
      </div>
    </section>
  );
});

const SectionTitle = ({ icon, title }) => (
  <h3 className="text-xl font-bold text-white mb-4 border-b border-blue-700 pb-2 flex items-center gap-2">{icon}{title}</h3>
);

const InputField = memo(({ label, name, value, onChange, type = 'text', required = false, error, ...props }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm font-bold mb-2">{label} {required && <span className="text-red-500" aria-label="obrigatório">*</span>}</label>
    <div className="relative">
      <input
        type={type} id={name} name={name} value={value} onChange={onChange}
        className={`w-full p-3 pr-10 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 transition-all duration-200 ${error ? 'ring-2 ring-red-500' : 'focus:ring-orange-500'}`} 
        required={required} 
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {value && !error && (
        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
      )}
    </div>
    {error && <p id={`${name}-error`} className="text-red-400 text-xs mt-1" role="alert">{error}</p>}
  </div>
));

const SelectField = memo(({ label, name, value, onChange, required = false, error, children, ...props }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm font-bold mb-2">{label} {required && <span className="text-red-500" aria-label="obrigatório">*</span>}</label>
    <div className="relative">
      <select
        id={name} name={name} value={value} onChange={onChange}
        className={`w-full p-3 pr-10 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 transition-all duration-200 ${error ? 'ring-2 ring-red-500' : 'focus:ring-orange-500'}`} 
        required={required} 
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {value && !error && (
        <CheckCircle className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 pointer-events-none" />
      )}
    </div>
    {error && <p id={`${name}-error`} className="text-red-400 text-xs mt-1" role="alert">{error}</p>}
  </div>
));

export default SolicitationForm;
