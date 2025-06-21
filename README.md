# GitHub
Website da Mix Fibra
Bem-vindo ao repositório do website da Mix Fibra, uma plataforma moderna e responsiva dedicada a fornecer informações sobre planos de internet fibra óptica, serviços de suporte e facilitar a interação com os clientes.

Descrição do Projeto
Este website foi desenvolvido para oferecer uma experiência de utilizador fluida e intuitiva, com um design atraente e funcionalidades práticas. O objetivo é apresentar os serviços da Mix Fibra de forma clara, permitir que os utilizadores encontrem o plano ideal e facilitem o contacto e o suporte.

Funcionalidades Principais
Navegação Fluida (Navbar): Barra de navegação fixa com scroll suave para as secções da página, adaptável a desktop e mobile (menu hambúrguer).

Alternância de Tema: Funcionalidade para alternar entre tema claro e escuro, com preferência guardada localmente.

Seções Interativas:

Herói (Hero): Secção inicial com destaque para a proposta de valor.

Planos (Plans): Apresentação dos planos de internet.

Por Que Escolher-nos (WhyChooseUs): Cartões interativos com efeito de "virar" ao clicar, mostrando detalhes sobre os diferenciais da Mix Fibra (Tecnologia, Suporte, Entretenimento).

Secção de Imagem e Vídeo: Conteúdo visual para engajar o utilizador.

Testemunhos (Testimonials): Depoimentos de clientes satisfeitos para construir credibilidade.

Sobre Nós (About): Informações sobre a empresa e cidades atendidas.

Contacto (Contact): Formas de contacto direto via WhatsApp e e-mail.

Suporte (Support): Secção com Perguntas e Respostas (FAQ) para problemas comuns, incluindo pesquisa e feedback sobre a utilidade da solução.

Teste de Velocidade (SpeedTest): Acesso rápido a uma ferramenta externa para verificar a velocidade da internet.

Central do Assinante (CentralAssinante): Link direto para a área do cliente.

Formulário de Solicitação (SolicitationForm): Formulário detalhado para solicitação de planos, com preenchimento automático de endereço via geolocalização (Nominatim API) e envio via WhatsApp.

Fundo de Partículas Dinâmico: Um fundo visualmente apelativo com partículas interativas.

Rodapé Completo: Inclui links sociais, informações de copyright dinâmicas e uma secção discreta "Sobre o Criador".

Tecnologias Utilizadas
React: Biblioteca JavaScript para construção de interfaces de utilizador.

Tailwind CSS: Framework CSS utility-first para estilos rápidos e responsivos.

Lucide React: Biblioteca de ícones leve e personalizável.

@tsparticles/react & @tsparticles/slim: Para o fundo de partículas interativo.

OpenStreetMap Nominatim API: Para geocodificação inversa (conversão de coordenadas GPS em endereços reais), utilizada no formulário de solicitação.

Instalação e Execução
Para configurar e executar o projeto localmente, siga estes passos:

Clone o repositório:

git clone [URL_DO_SEU_REPOSITORIO]
cd mix-fibra

Instale as dependências:
Certifique-se de que tem o Node.js e o npm (ou yarn) instalados.

npm install
# ou
yarn install

Execute o projeto em modo de desenvolvimento:

npm run dev
# ou
yarn dev

O website estará acessível em http://localhost:5173/mix-fibra/ (ou uma porta similar, indicada no terminal).

Estrutura do Projeto
src/: Contém todo o código-fonte da aplicação React.

src/App.jsx: Componente principal que orquestra todas as secções.

src/main.jsx: Ponto de entrada da aplicação React.

src/index.css: Estilos globais e configurações do Tailwind CSS.

src/components/: Pasta que agrupa todos os componentes reutilizáveis (Navbar, Hero, Plans, About, Contact, Support, Faq, etc.).

public/: Contém ativos estáticos (imagens, favicons) que são servidos diretamente pela raiz do servidor web.

public/imagens/: Imagens como logo-mix-fibra.png.

Autor
Este projeto foi criado por:

Edivan Alves

Formação Académica: Graduado em Gestão da Tecnologia da Informação pela UNIASSELVI.

Foco Atual: Em transição para Desenvolvimento de Software e Cloud Computing, com dedicação ao aprendizado contínuo e à obtenção da certificação AWS Cloud Practitioner (CLF-C02).

Perfil no LinkedIn: Edivan Alves

Licença
Este projeto está licenciado sob a Licença MIT. Consulte o ficheiro LICENSE para mais detalhes.

Mix Fibra - Conectividade de alta qualidade ao seu alcance.
