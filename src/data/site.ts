export const companyInfo = {
  name: 'Rotta Tecnologia',
  tagline: 'Solução. Inovação. Compromisso.',
  shortDescription:
    'Especialistas em Automação Comercial, Outsourcing de Impressão e Infraestrutura de TI para empresas que buscam alta performance, segurança e redução comprovada de custos.',
  contactPerson: 'Douglas Rotta',
  phone: '(46) 98803-7656',
  whatsappRaw: '5546988037656',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=5546988037656&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Rotta%20Tecnologia%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.',
  email: 'douglas@rottatecnologia.com.br',
  emailGeneral: 'contato@rottatecnologia.com.br',
  website: 'www.rottatecnologia.com.br',
  address: 'Rua Brasília nº 515, Bairro Presidente Kennedy',
  city: 'Francisco Beltrão',
  state: 'PR',
  cep: '85601-570',
  fullAddress: 'Rua Brasília nº 515, Bairro Presidente Kennedy, Francisco Beltrão - PR',
  businessHours: 'Segunda a Sexta: 08h às 12h e 13h30 às 18h',
  instagram: 'https://instagram.com/rottatecnologia',
  facebook: 'https://facebook.com/rottatecnologia',
  mapsUrl: 'https://maps.google.com/?q=Rua+Brasília+515+Presidente+Kennedy+Francisco+Beltrão+PR',
}

export const metrics = [
  { value: '19+', label: 'Anos de experiência no mercado' },
  { value: '500+', label: 'Empresas atendidas com sucesso' },
  { value: '-40%', label: 'Economia média em custos de impressão' },
  { value: '24/7', label: 'Suporte técnico ágil e especializado' },
]

export const pillars = [
  {
    id: 'outsourcing',
    title: 'Outsourcing de Impressão',
    tagline: 'Gestão Inteligente & Zero Preocupação',
    description:
      'Locação de impressoras e multifuncionais laser HP e térmicas Zebra com reposição automática de suprimentos (toners/peças) e suporte técnico proativo sem imobilizar capital da sua empresa.',
    benefits: [
      'Redução de até 40% nos custos operacionais',
      'Manutenção preventiva e corretiva inclusa',
      'Suprimentos originais entregues antes de acabar',
      'Equipamento reserva (Swap) imediato',
    ],
    highlight: 'Economize até 40%',
  },
  {
    id: 'hardware',
    title: 'Hardware & Automação Comercial',
    tagline: 'Agilidade e Controle no seu PDV',
    description:
      'Equipamentos homologados das marcas líderes Bematech, Elgin, Honeywell e Zebra para modernizar sua frente de caixa: leitores de código de barras 2D, impressoras de cupom SAT/NFC-e e PDVs.',
    benefits: [
      'Terminais PDV e Leitores 1D/2D/QR Code',
      'Impressoras de cupom fiscal e não fiscal',
      'Conformidade fiscal total (SAT, NFC-e, PAF)',
      'Garantia expressa e assistência autorizada',
    ],
    highlight: 'Marcas Homologadas',
  },
  {
    id: 'ti',
    title: 'T.I. & Infraestrutura Corporativa',
    tagline: 'Desempenho, Estabilidade e Continuidade',
    description:
      'Desktops, notebooks e servidores corporativos Dell e Lenovo, além de licenciamento oficial Microsoft, rotinas de backup seguro e consultoria técnica especializada.',
    benefits: [
      'Desktops e notebooks corporativos Dell e Lenovo',
      'Servidores dedicados e rotinas de backup seguro',
      'Licenciamento Microsoft Windows Pro e Office 365',
      'Atendimento técnico consultivo e preventivo',
    ],
    highlight: 'Alta Performance',
  },
]

export const services = [
  {
    id: 'outsourcing',
    title: 'Outsourcing de Impressão',
    category: 'Gestão & Locação',
    text: 'Modernize seu parque de impressão HP e Zebra sem custos com compra. Inclui toners, peças, manutenção preventiva e bilhetagem precisa por página.',
    iconName: 'printer',
  },
  {
    id: 'automacao',
    title: 'Automação Comercial & PDV',
    category: 'Varejo & Operações',
    text: 'Hardwares robustos Bematech, Elgin e Honeywell para frente de caixa: leitores ópticos, impressoras de cupom fiscal e controle de estoque.',
    iconName: 'store',
  },
  {
    id: 'computadores',
    title: 'Hardware & Computadores Corporativos',
    category: 'Produtividade',
    text: 'Desktops, workstations e notebooks corporativos Dell e Lenovo projetados para operação contínua com máxima durabilidade.',
    iconName: 'cpu',
  },
  {
    id: 'manutencao',
    title: 'Manutenção Técnica Especializada',
    category: 'Assistência Ágil',
    text: 'Laboratório técnico próprio e atendimento presencial em Francisco Beltrão e região para computadores, servidores, impressoras e periféricos.',
    iconName: 'cpu',
  },
  {
    id: 'servidores',
    title: 'Servidores & Backup de Dados',
    category: 'Infraestrutura',
    text: 'Servidores dedicados Dell PowerEdge e Lenovo ThinkSystem para bancos de dados ERP, arquivos corporativos e rotinas de backup seguro.',
    iconName: 'database',
  },
  {
    id: 'microsoft',
    title: 'Licenciamento Microsoft & Cloud',
    category: 'Softwares Originais',
    text: 'Licenciamento corporativo oficial de Windows 11 Pro, Microsoft 365, Exchange em nuvem e soluções em nuvem seguras.',
    iconName: 'network',
  },
]

export type ProductCategory = 'all' | 'outsourcing' | 'automacao' | 'hardware' | 'redes' | 'infra'

export interface ProductItem {
  id: string
  name: string
  category: ProductCategory
  categoryLabel: string
  brand: string
  image: string
  description: string
  features: string[]
  badge?: string
}

export const productsData: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Multifuncional Laser Corporativa HP LaserJet',
    category: 'outsourcing',
    categoryLabel: 'Outsourcing de Impressão',
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    description: 'Equipamento corporativo robusto para alto volume mensal com velocidade de até 45 ppm, duplex automático e conectividade em rede.',
    features: ['Velocidade de até 45 páginas por minuto', 'Toners e suprimentos originais 100% inclusos', 'Troca expressa (Swap) em caso de falha', 'Controle de bilhetagem e cotas por usuário'],
    badge: 'Mais Solicitado',
  },
  {
    id: 'prod-2',
    name: 'Impressora Térmica de Etiquetas Zebra',
    category: 'outsourcing',
    categoryLabel: 'Outsourcing de Impressão',
    brand: 'Zebra Technologies',
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&w=800&q=80',
    description: 'Solução padrão de mercado para etiquetagem de gôndolas, rastreabilidade, expedição logística, caixas e identificação de produtos.',
    features: ['Impressão térmica direta e termotransferência', 'Resolução de 203 a 300 DPI', 'Ribbons e cabeças de impressão inclusos', 'Compatível com linguagens ZPL e EPL'],
    badge: 'Logística & Varejo',
  },
  {
    id: 'prod-3',
    name: 'Leitor de Código de Barras e QR Code 2D Honeywell',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Honeywell',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    description: 'Leitura ultrarrápida e precisa de códigos 1D, 2D, QR Codes e boletos bancários em telas de smartphones ou embalagens curvas.',
    features: ['Leitura de QR Code, 1D e 2D', 'Conexão USB Plug & Play veloz', 'Carcaça com alta resistência a impactos', 'Homologado para caixas e recebimento'],
    badge: 'Alta Precisão',
  },
  {
    id: 'prod-4',
    name: 'Leitor de Código de Barras e Imager 2D Zebra',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Zebra Technologies',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    description: 'Tecnologia de captura avançada Zebra que lê códigos danificados ou com baixa impressão no primeiro disparo.',
    features: ['Sensor de alta resolução para códigos densos', 'Modo mãos livres com suporte pedestal', 'Gatilho ergonômico reforçado', 'Compatível com todos os sistemas comerciais'],
    badge: 'PDV & Estoque',
  },
  {
    id: 'prod-5',
    name: 'Impressora Térmica Não Fiscal de Cupons Elgin',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Elgin',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80',
    description: 'Agilidade comprovada no caixa para emissão de NFC-e, SAT, recibos e comandas para restaurantes com guilhotina de corte rápido.',
    features: ['Velocidade de até 300 mm/s', 'Guilhotina automática de alta durabilidade', 'Conexão USB e Ethernet para rede', 'Compatível com todos os ERPs do mercado'],
    badge: 'Essencial PDV',
  },
  {
    id: 'prod-6',
    name: 'Terminal de Automação Comercial & PDV Bematech',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Bematech',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80',
    description: 'Estrutura compacta e dedicada para frente de caixa, integrando gaveta de dinheiro, terminal de pagamento e comunicação veloz.',
    features: ['Design robusto para operação diária contínua', 'Múltiplas portas seriais, USB e rede', 'Integração direta com balanças e pin pads', 'Assistência técnica autorizada'],
    badge: 'Frente de Caixa',
  },
  {
    id: 'prod-7',
    name: 'Desktop Corporativo Dell OptiPlex',
    category: 'hardware',
    categoryLabel: 'Computadores & Notebooks',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    description: 'Computadores empresariais Dell projetados para trabalhar 24/7 com máxima estabilidade, SSD NVMe veloz e garantia local.',
    features: ['Processadores Intel Core i5 / i7', 'Armazenamento SSD NVMe PCIe ultrarrápido', 'Licença Microsoft Windows 11 Pro original', 'Suporte técnico presencial local'],
    badge: 'Linha Corporativa',
  },
  {
    id: 'prod-8',
    name: 'Desktop Corporativo Lenovo ThinkCentre',
    category: 'hardware',
    categoryLabel: 'Computadores & Notebooks',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    description: 'Desktops silenciosos e eficientes com segurança de dados de nível empresarial para setores administrativos e comerciais.',
    features: ['Form factor compacto e durável', 'Memória expansível de alta velocidade', 'Módulo de segurança TPM 2.0 integrado', 'Baixo consumo de energia'],
    badge: 'Alta Eficiência',
  },
  {
    id: 'prod-9',
    name: 'Notebook Corporativo Dell Latitude',
    category: 'hardware',
    categoryLabel: 'Computadores & Notebooks',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    description: 'Portabilidade e autonomia para gestores, diretores e equipes em trânsito com segurança biométrica e chassi reforçado.',
    features: ['Bateria com carga rápida ExpressCharge', 'Chassi durável e leve para transporte', 'Criptografia e leitor biométrico', 'Tela Full HD antirreflexo'],
    badge: 'Mobilidade',
  },
  {
    id: 'prod-10',
    name: 'Notebook Corporativo Lenovo ThinkPad',
    category: 'hardware',
    categoryLabel: 'Computadores & Notebooks',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    description: 'O padrão internacional de excelência corporativa: durabilidade testada com especificações militares e teclado ergonômico.',
    features: ['Certificação militar MIL-STD-810H', 'Teclado ergonômico resistente a respingos', 'Alto desempenho multitarefa', 'Conexões Wi-Fi 6 e portas USB-C'],
    badge: 'Resistência Militar',
  },
  {
    id: 'prod-11',
    name: 'Servidor Corporativo Dell PowerEdge',
    category: 'infra',
    categoryLabel: 'Servidores & TI',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Servidores dedicados torre ou rack para centralização de bancos de dados ERP, arquivos e controle de acessos da empresa.',
    features: ['Processadores Intel Xeon / AMD EPYC', 'Discos configurados em RAID redundante', 'Fontes de energia redundantes', 'Gerenciamento remoto iDRAC'],
    badge: 'Servidor ERP',
  },
  {
    id: 'prod-12',
    name: 'Servidor Corporativo Lenovo ThinkSystem',
    category: 'infra',
    categoryLabel: 'Servidores & TI',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Servidor empresarial de alta disponibilidade para hospedagem de aplicações críticas, ERPs e rotinas de backup seguro.',
    features: ['Alta disponibilidade e tolerância a falhas', 'Capacidade de expansão de discos e RAM', 'Eficiência térmica e baixo ruído', 'Suporte especializado Rotta Tecnologia'],
    badge: 'Alta Disponibilidade',
  },
]

export const differentiators = [
  {
    title: 'Diagnóstico Técnico Sem Custo',
    description: 'Avaliamos a estrutura atual da sua empresa para identificar gargalos, riscos de segurança e potenciais de economia.',
  },
  {
    title: 'Swap Imediato de Equipamentos',
    description: 'Se uma impressora ou computador apresentar defeito, substituímos imediatamente por equipamento reserva.',
  },
  {
    title: 'Atendimento Presencial e Remoto Ágil',
    description: 'Base técnica local em Francisco Beltrão garantindo resposta imediata para empresas de toda a região.',
  },
  {
    title: 'Marcas Líderes e Homologadas',
    description: 'Trabalhamos exclusivamente com fabricantes consagrados como HP, Dell, Lenovo, Zebra, Elgin e Bematech.',
  },
  {
    title: 'Contratos Transparentes e Flexíveis',
    description: 'Planos ajustáveis que acompanham o crescimento da sua empresa, sem multas abusivas ou taxas ocultas.',
  },
  {
    title: 'Economia Real e Comprovada',
    description: 'Nossos clientes reduzem em média 40% dos custos com impressão e suprimentos no primeiro trimestre.',
  },
]

export const segments = [
  {
    title: 'Varejo & Supermercados',
    description: 'Frentes de caixa velozes, leitores de código de barras, impressoras de cupom fiscal e redes sem lentidão.',
    icon: 'store',
  },
  {
    title: 'Food Service & Restaurantes',
    description: 'Comandas em tempo real na cozinha, terminais de atendimento rápido e automação de pagamentos.',
    icon: 'restaurant',
  },
  {
    title: 'Indústria & Agro',
    description: 'Impressão de etiquetas térmicas e de rastreabilidade Zebra, computadores industriais e redes de longo alcance.',
    icon: 'factory',
  },
  {
    title: 'Clínicas & Saúde',
    description: 'Impressão de laudos de alta nitidez, computadores silenciosos e proteção rigorosa para dados de prontuários.',
    icon: 'health',
  },
  {
    title: 'Logística & Distribuição',
    description: 'Leitores coletores de dados, etiquetagem ágil de frete e servidores de alta disponibilidade.',
    icon: 'truck',
  },
  {
    title: 'Escritórios & Educação',
    description: 'Outsourcing de impressão por cotas, Wi-Fi corporativo de alta densidade e suporte técnico contínuo.',
    icon: 'school',
  },
]

export const partnerBrands = [
  { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/ffffff', mark: 'HP' },
  { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/ffffff', mark: 'DELL' },
  { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/ffffff', mark: 'LENOVO' },
  { name: 'Zebra', logo: '/zebra-logo.svg', mark: 'ZEBRA' },
  { name: 'Elgin', logo: '/elgin-logo.svg', mark: 'ELGIN' },
  { name: 'Bematech', logo: '/bematech-logo.svg', mark: 'BEMATECH' },
  { name: 'Honeywell', logo: '/honeywell-logo.svg', mark: 'HONEYWELL' },
  { name: 'Microsoft', logo: '/microsoft-logo.svg', mark: 'MS' },
]

export const testimonials = [
  {
    quote:
      'A terceirização de impressoras com a Rotta reduziu nossos gastos mensais em 42%. A reposição de toners é automática e quando precisamos de suporte o atendimento é no mesmo dia!',
    name: 'Carla Menezes',
    role: 'Gerente Administrativa • Supermercado Regional',
    city: 'Francisco Beltrão - PR',
  },
  {
    quote:
      'Implantamos toda a infraestrutura de rede, servidores e PDVs da nossa nova filial com a Rotta Tecnologia. O compromisso e a pontualidade da equipe do Douglas foram impecáveis.',
    name: 'Ricardo Almeida',
    role: 'Diretor de Operações • Indústria Metalmecânica',
    city: 'Pato Branco - PR',
  },
  {
    quote:
      'Atendemos centenas de clientes por dia e não podemos ter filas no caixa. Os leitores e impressoras térmicas fornecidos pela Rotta são extremamente rápidos e confiáveis.',
    name: 'Juliana Torres',
    role: 'Gestora Geral • Rede Gastronômica',
    city: 'Dois Vizinhos - PR',
  },
]

export const faqs = [
  {
    question: 'Como funciona o Outsourcing de Impressão da Rotta Tecnologia?',
    answer:
      'Nós fornecemos os equipamentos modernos (impressoras laser e multifuncionais) adequados à demanda da sua empresa sem que você precise investir na compra. Todas as manutenções, peças de desgaste, visitas técnicas e toners originais já estão 100% inclusos na mensalidade.',
  },
  {
    question: 'Quais cidades e regiões a Rotta Tecnologia atende?',
    answer:
      'Nossa sede é em Francisco Beltrão - PR, e atendemos com rapidez presencial e remota toda a região Sudoeste do Paraná (Pato Branco, Dois Vizinhos, Marmeleiro, Ampére, Capanema, Realeza, etc.) e Oeste de Santa Catarina.',
  },
  {
    question: 'Qual o tempo de resposta se uma impressora ou computador parar?',
    answer:
      'Nosso compromisso de suporte é prioritário. Realizamos primeiro diagnóstico remoto imediato e, caso necessário, nossa equipe técnica se desloca até sua empresa com equipamento de backup (swap) para restabelecer a operação em tempo recorde.',
  },
  {
    question: 'Posso comprar equipamentos ou apenas alugar?',
    answer:
      'Trabalhamos com os dois modelos! Oferecemos tanto a locação/outsourcing (com suporte e suprimentos inclusos) quanto a venda direta de computadores corporativos, servidores, impressoras, leitores de código de barras e suprimentos com nota fiscal e garantia oficial.',
  },
  {
    question: 'Como é feito o cálculo do valor da locação ou automação?',
    answer:
      'O valor é personalizado conforme o volume de páginas impresso por mês e a quantidade de estações de trabalho ou PDVs necessários. Você pode usar nossa calculadora interativa no site ou solicitar uma visita técnica sem compromisso.',
  },
]

