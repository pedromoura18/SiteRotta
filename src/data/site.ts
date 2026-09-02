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
      'Locação de impressoras e multifuncionais laser e térmicas de alta capacidade com reposição automática de suprimentos (toners/peças) e suporte técnico proativo sem imobilizar capital.',
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
      'Equipamentos homologados das marcas líderes para modernizar seu ponto de venda e escritório: computadores, leitores de código de barras 2D, impressoras fiscais e nobreaks.',
    benefits: [
      'Terminais PDV Touch e Leitores 1D/2D/QR Code',
      'Computadores e servidores corporativos sob medida',
      'Conformidade fiscal total (SAT, NFC-e, PAF)',
      'Garantia expressa e suporte presencial',
    ],
    highlight: 'Marcas Homologadas',
  },
  {
    id: 'ti',
    title: 'T.I. & Infraestrutura Corporativa',
    tagline: 'Segurança, Estabilidade e Continuidade',
    description:
      'Projetos completos de redes estruturadas, Wi-Fi corporativo de alta densidade, servidores locais e em nuvem, backup automatizado e sistemas de segurança CFTV com IA.',
    benefits: [
      'Cabeamento estruturado e redes Wi-Fi empresariais',
      'Servidores dedicados e rotinas de backup seguro',
      'Câmeras CFTV IP com monitoramento inteligente',
      'Atendimento técnico consultivo e preventivo',
    ],
    highlight: 'Segurança & Estabilidade',
  },
]

export const services = [
  {
    id: 'outsourcing',
    title: 'Outsourcing de Impressão',
    category: 'Gestão & Locação',
    text: 'Modernize seu parque de impressão sem custos com compra de impressoras. Inclui toners, peças, manutenção e bilhetagem precisa por página.',
    iconName: 'printer',
  },
  {
    id: 'automacao',
    title: 'Automação Comercial & PDV',
    category: 'Varejo & Operações',
    text: 'Sistemas e hardwares robustos para frente de caixa, leitores ópticos, balanças, impressoras de cupom fiscal e controle de estoque.',
    iconName: 'store',
  },
  {
    id: 'manutencao',
    title: 'Manutenção Técnica Especializada',
    category: 'Assistência Ágil',
    text: 'Laboratório técnico próprio e atendimento presencial em Francisco Beltrão e região para computadores, servidores, impressoras e periféricos.',
    iconName: 'cpu',
  },
  {
    id: 'redes',
    title: 'Redes Estruturadas & Wi-Fi',
    category: 'Infraestrutura',
    text: 'Planejamento e instalação de cabeamento de rede CAT6/Fibra, switches gerenciáveis e pontos de acesso Wi-Fi de alta performance.',
    iconName: 'network',
  },
  {
    id: 'cloud',
    title: 'Servidores & Backup Seguro',
    category: 'Segurança de Dados',
    text: 'Instalação e gerenciamento de servidores Windows/Linux, rotinas de backup criptografado em nuvem e proteção contra perda de dados.',
    iconName: 'database',
  },
  {
    id: 'cftv',
    title: 'Segurança Eletrônica & CFTV',
    category: 'Monitoramento',
    text: 'Instalação de câmeras de segurança IP com inteligência artificial para reconhecimento facial, leitura de placas e monitoramento remoto.',
    iconName: 'shield',
  },
]

export type ProductCategory = 'all' | 'outsourcing' | 'automacao' | 'hardware' | 'redes'

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
    name: 'Multifuncional Corporativa Laser Monocromática',
    category: 'outsourcing',
    categoryLabel: 'Outsourcing de Impressão',
    brand: 'HP / Brother / Kyocera',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    description: 'Equipamento robusto para alto volume mensal com velocidade de até 50 ppm, duplex automático e conectividade em rede.',
    features: ['Até 50 páginas por minuto', 'Suprimentos e peças 100% inclusos', 'Troca expressa em caso de falha', 'Controle de bilhetagem por usuário'],
    badge: 'Mais Solicitado',
  },
  {
    id: 'prod-2',
    name: 'Multifuncional Colorida Profissional',
    category: 'outsourcing',
    categoryLabel: 'Outsourcing de Impressão',
    brand: 'HP / Xerox / Kyocera',
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80',
    description: 'Qualidade gráfica impecável para relatórios, projetos e documentos corporativos coloridos de alto impacto.',
    features: ['Cores vivas e alta fidelidade', 'Digitalização em rede e nuvem', 'Economia de até 40% vs compra de cartuchos', 'Suporte técnico prioritário'],
    badge: 'Alta Resolução',
  },
  {
    id: 'prod-3',
    name: 'Leitor de Código de Barras 1D/2D e QR Code',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Honeywell / Zebra / Bematech',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    description: 'Leitura ultrarrápida e precisa em qualquer superfície, incluindo telas de smartphones, boletos bancários e etiquetas danificadas.',
    features: ['Leitura 1D, 2D, QR Code e PDF417', 'Conexão USB Plug & Play rápida', 'Alta resistência a quedas e poeira', 'Ideal para caixas e recebimento'],
    badge: 'Essencial PDV',
  },
  {
    id: 'prod-4',
    name: 'Impressora Térmica Não Fiscal de Cupons e Comandas',
    category: 'automacao',
    categoryLabel: 'Automação Comercial',
    brand: 'Elgin / Bematech',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    description: 'Agilidade comprovada na emissão de NFC-e, SAT, comandas para cozinha e recibos com guilhotina automática.',
    features: ['Velocidade de até 300 mm/s', 'Guilhotina para corte automático', 'Interface USB / Ethernet / Serial', 'Compatível com todos os softwares'],
  },
  {
    id: 'prod-5',
    name: 'Desktop & Workstation Corporativa',
    category: 'hardware',
    categoryLabel: 'Hardware & Computadores',
    brand: 'Dell / Lenovo',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    description: 'Computadores de alta durabilidade com processadores Intel/AMD modernos, SSDs NVMe e suporte corporativo para máxima produtividade.',
    features: ['Processadores Intel Core i5/i7/i9', 'SSD NVMe ultrarrápido', 'Windows 11 Pro licenciado', 'Garantia e assistência técnica local'],
    badge: 'Linha Corporativa',
  },
  {
    id: 'prod-6',
    name: 'Servidor Dedicado e Armazenamento NAS',
    category: 'hardware',
    categoryLabel: 'Hardware & Servidores',
    brand: 'Dell EMC / Lenovo',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Centralização segura de bancos de dados ERP, arquivos corporativos e controle de acessos da sua empresa com tolerância a falhas.',
    features: ['Discos configurados em RAID redundante', 'Fontes de alimentação redundantes', 'Suporte a virtualização e ERPs', 'Backup automatizado diário'],
  },
  {
    id: 'prod-7',
    name: 'Roteadores e Switches Gerenciáveis de Alta Performance',
    category: 'redes',
    categoryLabel: 'Redes & Infraestrutura',
    brand: 'Intelbras / MikroTik / Ubiquiti',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Elimine quedas de internet e lentidão interna com equipamentos profissionais com separação de rede para visitantes e setor financeiro.',
    features: ['Portas Gigabit / 10G', 'Wi-Fi 6 de alta densidade', 'QoS e priorização de tráfego crítico', 'Isolamento de redes e firewall integrado'],
  },
  {
    id: 'prod-8',
    name: 'Sistema de Câmeras CFTV IP com Inteligência Artificial',
    category: 'redes',
    categoryLabel: 'Segurança & CFTV',
    brand: 'Intelbras',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    description: 'Proteção 24h para seu patrimônio com gravação em alta definição, visão noturna colorida e detecção inteligente de intrusão.',
    features: ['Resolução Full HD e 4K', 'Detecção humana e de veículos', 'Acesso remoto em tempo real via celular', 'Armazenamento seguro em NVR'],
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

