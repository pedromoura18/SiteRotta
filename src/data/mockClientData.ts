import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  CounterReading,
  ClientInvoice,
  PortalSession,
} from '../types/clientPortal'

export const ALL_CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: 'cli-001',
    name: 'Alpha Logística & Transportes Ltda',
    tradeName: 'Alpha Express Logística',
    cnpj: '28.914.832/0001-45',
    contractNumber: 'ROT-2024-0891',
    plan: 'Outsourcing Corporativo Total + Manutenção & Suprimentos',
    contactPerson: 'Carlos Eduardo Mendes',
    email: 'ti@alphalogistica.com.br',
    phone: '(47) 3451-8200',
    address: 'Rua das Indústrias, 1420 - Bloco B',
    city: 'Joinville',
    state: 'SC',
    accountManager: 'Douglas Rotta',
    managerPhone: '(46) 98803-7656',
    slaHours: 4,
    totalPrinters: 4,
    monthlyContractValue: 2380.0,
  },
  {
    id: 'cli-002',
    name: 'Beta Agroindustrial & Grãos S/A',
    tradeName: 'Beta Alimentos',
    cnpj: '08.412.983/0001-12',
    contractNumber: 'ROT-2023-0412',
    plan: 'Locação Industrial + Etiquetas Zebra & Coletores',
    contactPerson: 'Marcos Vinícius Bertolini',
    email: 'compras@betaagro.com.br',
    phone: '(46) 3524-1190',
    address: 'Rodovia PR-483, Km 04 - Distrito Industrial',
    city: 'Francisco Beltrão',
    state: 'PR',
    accountManager: 'Douglas Rotta',
    managerPhone: '(46) 98803-7656',
    slaHours: 3,
    totalPrinters: 5,
    monthlyContractValue: 3850.0,
  },
  {
    id: 'cli-003',
    name: 'Hospital & Centro Médico São Lucas',
    tradeName: 'Hospital São Lucas',
    cnpj: '14.281.049/0001-77',
    contractNumber: 'ROT-2024-1102',
    plan: 'Outsourcing Hospitalar de Alta Disponibilidade (SLA Crítico)',
    contactPerson: 'Dra. Fernanda Albuquerque',
    email: 'ti@hospitalsaolucas.med.br',
    phone: '(46) 3220-4500',
    address: 'Rua Tamoios, 850 - Centro',
    city: 'Pato Branco',
    state: 'PR',
    accountManager: 'Douglas Rotta',
    managerPhone: '(46) 98803-7656',
    slaHours: 2,
    totalPrinters: 6,
    monthlyContractValue: 4400.0,
  },
]

export const DEFAULT_CLIENT_COMPANY: ClientCompany = ALL_CLIENT_COMPANIES[0]

export function getEquipmentImage(modelOrIdOrName?: string): string {
  if (!modelOrIdOrName) return '/products/brother-mfc-l6902dw.jpg'
  const lower = modelOrIdOrName.toLowerCase()
  if (lower.includes('kyocera') || lower.includes('3655')) return '/products/kyocera-m3655idn.png'
  if (lower.includes('hp') || lower.includes('404')) return '/products/hp-m404n.png'
  if (lower.includes('8900') || lower.includes('color')) return '/products/brother-mfc-l8900cdw.png'
  if (
    lower.includes('zebra') ||
    lower.includes('zd220') ||
    lower.includes('termica') ||
    lower.includes('térmica') ||
    lower.includes('etiquetadora')
  ) {
    return '/products/zebra-zd220.jpg'
  }
  if (lower.includes('6902')) return '/products/brother-mfc-l6902dw.jpg'
  if (lower.includes('5652')) return '/products/brother-dcp-l5652dn.jpg'

  const found = DEFAULT_EQUIPMENTS.find(
    (e) =>
      e.id === modelOrIdOrName ||
      e.model.toLowerCase() === lower ||
      e.assetTag.toLowerCase() === lower
  )
  return found?.image || '/products/brother-mfc-l6902dw.jpg'
}

export const DEFAULT_EQUIPMENTS: ClientEquipment[] = [
  // Alpha Logística
  {
    id: 'eq-1',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    model: 'Kyocera ECOSYS M3655idn',
    brand: 'Kyocera',
    type: 'multifuncional',
    serialNumber: 'KCY-982341-BR',
    assetTag: 'PAT-0842',
    department: 'Recepção / Faturamento',
    installationDate: '10/02/2024',
    status: 'operacional',
    currentCounterMono: 48920,
    tonerBlack: 74,
    drumLife: 82,
    ipAddress: '192.168.1.150',
    snmpStatus: 'online',
    image: '/products/kyocera-m3655idn.png',
  },
  {
    id: 'eq-2',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    model: 'HP LaserJet Enterprise M404n',
    brand: 'HP',
    type: 'impressora',
    serialNumber: 'HPB-772109-SC',
    assetTag: 'PAT-0843',
    department: 'Departamento Financeiro',
    installationDate: '10/02/2024',
    status: 'alerta',
    currentCounterMono: 31240,
    tonerBlack: 14,
    drumLife: 90,
    ipAddress: '192.168.1.151',
    snmpStatus: 'warning',
    image: '/products/hp-m404n.png',
  },
  {
    id: 'eq-3',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    model: 'Brother MFC-L8900CDW Color',
    brand: 'Brother',
    type: 'multifuncional',
    serialNumber: 'BRO-443210-SP',
    assetTag: 'PAT-0844',
    department: 'Diretoria & Recursos Humanos',
    installationDate: '15/05/2024',
    status: 'operacional',
    currentCounterMono: 15400,
    currentCounterColor: 11200,
    tonerBlack: 62,
    tonerCyan: 55,
    tonerMagenta: 48,
    tonerYellow: 60,
    drumLife: 75,
    ipAddress: '192.168.1.152',
    snmpStatus: 'online',
    image: '/products/brother-mfc-l8900cdw.png',
  },
  {
    id: 'eq-4',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    model: 'Zebra ZD220 Térmica',
    brand: 'Zebra',
    type: 'etiquetadora',
    serialNumber: 'ZBR-118932-BR',
    assetTag: 'PAT-0845',
    department: 'Expedição & Logística',
    installationDate: '20/06/2024',
    status: 'operacional',
    currentCounterMono: 84200,
    tonerBlack: 88,
    drumLife: 95,
    ipAddress: '192.168.1.155',
    snmpStatus: 'online',
    image: '/products/zebra-zd220.jpg',
  },

  // Beta Agroindustrial
  {
    id: 'eq-5',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    model: 'Brother MFC-L6902DW Laser',
    brand: 'Brother',
    type: 'multifuncional',
    serialNumber: 'BRO-981240-PR',
    assetTag: 'PAT-0910',
    department: 'Balança & Recebimento de Grãos',
    installationDate: '12/03/2023',
    status: 'operacional',
    currentCounterMono: 92450,
    tonerBlack: 68,
    drumLife: 70,
    ipAddress: '10.0.0.88',
    snmpStatus: 'online',
    image: '/products/brother-mfc-l6902dw.jpg',
  },
  {
    id: 'eq-6',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    model: 'Zebra ZD220 Térmica',
    brand: 'Zebra',
    type: 'etiquetadora',
    serialNumber: 'ZBR-778812-PR',
    assetTag: 'PAT-0911',
    department: 'Classificação de Sementes',
    installationDate: '15/03/2023',
    status: 'operacional',
    currentCounterMono: 145000,
    tonerBlack: 92,
    drumLife: 88,
    ipAddress: '10.0.0.89',
    snmpStatus: 'online',
    image: '/products/zebra-zd220.jpg',
  },

  // Hospital São Lucas
  {
    id: 'eq-7',
    companyId: 'cli-003',
    companyName: 'Hospital São Lucas',
    model: 'Brother DCP-L5652DN',
    brand: 'Brother',
    type: 'multifuncional',
    serialNumber: 'BRO-332910-PR',
    assetTag: 'PAT-1050',
    department: 'Pronto Socorro / Triagem',
    installationDate: '05/01/2024',
    status: 'operacional',
    currentCounterMono: 64120,
    tonerBlack: 81,
    drumLife: 85,
    ipAddress: '172.16.0.40',
    snmpStatus: 'online',
    image: '/products/brother-dcp-l5652dn.jpg',
  },
]

export const DEFAULT_TICKETS: ClientTicket[] = [
  {
    id: 'tkt-1',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    protocol: 'CH-2026-1042',
    createdAt: '12/10/2026 às 14:30',
    equipmentId: 'eq-2',
    equipmentName: 'HP LaserJet Enterprise M404n',
    assetTag: 'PAT-0843',
    department: 'Departamento Financeiro',
    category: 'qualidade',
    priority: 'alta',
    status: 'em_atendimento',
    title: 'Impressão saindo com listras verticais pretas',
    description:
      'Desde ontem as notas fiscais e relatórios impressos no financeiro apresentam uma faixa preta no canto esquerdo da folha.',
    requesterName: 'Juliana Costa',
    requesterPhone: '(47) 99876-1122',
    assignedTech: 'Douglas Rotta (Técnico Responsável)',
    estimatedResolution: '13/10/2026 até as 17:00',
    updates: [
      {
        id: 'up-1',
        date: '12/10/2026 às 14:30',
        author: 'Juliana Costa',
        role: 'cliente',
        text: 'Chamado aberto via Portal do Cliente com descrição do problema.',
      },
      {
        id: 'up-2',
        date: '12/10/2026 às 14:45',
        author: 'Sistema Rotta',
        role: 'sistema',
        text: 'Chamado triado pela equipe de suporte nível 1. SLA definido para até 4h.',
      },
      {
        id: 'up-3',
        date: '12/10/2026 às 15:10',
        author: 'Douglas Rotta',
        role: 'tecnico',
        text: 'Peça de reposição (rolo de transferência) separada no laboratório. Visita técnica agendada para atendimento presencial.',
      },
    ],
  },
  {
    id: 'tkt-2',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    protocol: 'CH-2026-0988',
    createdAt: '02/10/2026 às 09:15',
    equipmentId: 'eq-1',
    equipmentName: 'Kyocera ECOSYS M3655idn',
    assetTag: 'PAT-0842',
    department: 'Recepção / Faturamento',
    category: 'rede',
    priority: 'normal',
    status: 'concluido',
    title: 'Configuração de Digitalização para pasta em rede (SMB)',
    description:
      'Necessário reconfigurar a pasta de scan da recepção após migração do servidor interno de arquivos.',
    requesterName: 'Carlos Mendes',
    requesterPhone: '(47) 3451-8200',
    assignedTech: 'Douglas Rotta',
    estimatedResolution: '02/10/2026 às 11:30',
    updates: [
      {
        id: 'up-201',
        date: '02/10/2026 às 09:15',
        author: 'Carlos Mendes',
        role: 'cliente',
        text: 'Chamado aberto solicitando reconfiguração de caminho de rede.',
      },
      {
        id: 'up-202',
        date: '02/10/2026 às 10:20',
        author: 'Douglas Rotta',
        role: 'tecnico',
        text: 'Acesso remoto realizado. Caminho SMB atualizado no catálogo de endereços da multifuncional Kyocera com sucesso.',
      },
    ],
  },
  {
    id: 'tkt-3',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    protocol: 'CH-2026-1050',
    createdAt: '13/10/2026 às 08:40',
    equipmentId: 'eq-6',
    equipmentName: 'Zebra ZD220 Térmica',
    assetTag: 'PAT-0911',
    department: 'Classificação de Sementes',
    category: 'defeito',
    priority: 'urgente' as any,
    status: 'aberto',
    title: 'Luz vermelha piscando na Zebra após troca de rolo de etiqueta',
    description:
      'Ao trocar o rolo de etiquetas térmicas pela manhã, a impressora travou e não avança as etiquetas.',
    requesterName: 'Marcos Vinícius Bertolini',
    requesterPhone: '(46) 3524-1190',
    assignedTech: 'Aguardando atribuição (SLA até 3h úteis)',
    updates: [
      {
        id: 'up-301',
        date: '13/10/2026 às 08:40',
        author: 'Marcos Vinícius',
        role: 'cliente',
        text: 'Chamado aberto. Necessitamos de suporte ágil pois a classificação de lotes está parada.',
      },
    ],
  },
]

export const DEFAULT_SUPPLY_ORDERS: SupplyOrder[] = [
  {
    id: 'sup-1',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    code: 'PED-SUP-8821',
    createdAt: '11/10/2026 às 16:20',
    equipmentId: 'eq-2',
    equipmentName: 'HP LaserJet Enterprise M404n (PAT-0843)',
    assetTag: 'PAT-0843',
    items: [
      {
        itemName: 'Cartucho de Toner HP CF258X Preto (Rendimento 10.000 pág)',
        quantity: 2,
      },
    ],
    deliveryAddress: 'Rua das Indústrias, 1420 - Bloco B (A/C Depto TI) - Joinville/SC',
    status: 'em_transito',
    trackingCode: 'ROT-EXP-7741',
    estimatedDelivery: '14/10/2026',
  },
  {
    id: 'sup-2',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    code: 'PED-SUP-8710',
    createdAt: '22/09/2026 às 11:00',
    equipmentId: 'eq-3',
    equipmentName: 'Brother MFC-L8900CDW Color (PAT-0844)',
    assetTag: 'PAT-0844',
    items: [
      {
        itemName: 'Kit Toner Brother TN419 (Ciano, Magenta e Amarelo)',
        quantity: 1,
      },
      {
        itemName: 'Caixa de Papel A4 Chamex 75g (10 resmas)',
        quantity: 2,
      },
    ],
    deliveryAddress: 'Rua das Indústrias, 1420 - Bloco B - Joinville/SC',
    status: 'entregue',
    trackingCode: 'ROT-ENT-3329',
    estimatedDelivery: '24/09/2026',
  },
  {
    id: 'sup-3',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    code: 'PED-SUP-8835',
    createdAt: '13/10/2026 às 10:15',
    equipmentId: 'eq-5',
    equipmentName: 'Brother MFC-L6902DW Laser (PAT-0910)',
    assetTag: 'PAT-0910',
    items: [
      {
        itemName: 'Toner Brother TN3472 Alta Capacidade (12.000 pág)',
        quantity: 3,
      },
    ],
    deliveryAddress: 'Rodovia PR-483, Km 04 - Francisco Beltrão/PR',
    status: 'solicitado',
    estimatedDelivery: '15/10/2026',
  },
]

export const DEFAULT_COUNTER_READINGS: CounterReading[] = [
  {
    id: 'cnt-1',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    equipmentId: 'eq-1',
    equipmentName: 'Kyocera ECOSYS M3655idn',
    assetTag: 'PAT-0842',
    period: '09/2026',
    monoReading: 45200,
    previousMonoReading: 39100,
    recordedAt: '30/09/2026',
    recordedBy: 'Carlos Mendes',
  },
  {
    id: 'cnt-2',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    equipmentId: 'eq-2',
    equipmentName: 'HP LaserJet Enterprise M404n',
    assetTag: 'PAT-0843',
    period: '09/2026',
    monoReading: 28900,
    previousMonoReading: 24350,
    recordedAt: '30/09/2026',
    recordedBy: 'Carlos Mendes',
  },
  {
    id: 'cnt-3',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    equipmentId: 'eq-3',
    equipmentName: 'Brother MFC-L8900CDW Color',
    assetTag: 'PAT-0844',
    period: '09/2026',
    monoReading: 13950,
    previousMonoReading: 11800,
    colorReading: 10100,
    previousColorReading: 8900,
    recordedAt: '30/09/2026',
    recordedBy: 'Carlos Mendes',
  },
  {
    id: 'cnt-4',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    equipmentId: 'eq-5',
    equipmentName: 'Brother MFC-L6902DW Laser',
    assetTag: 'PAT-0910',
    period: '09/2026',
    monoReading: 89300,
    previousMonoReading: 81200,
    recordedAt: '30/09/2026',
    recordedBy: 'Marcos Vinícius',
  },
]

export const DEFAULT_INVOICES: ClientInvoice[] = [
  {
    id: 'inv-1',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    invoiceNumber: 'FAT-2026-1049',
    period: 'Outubro / 2026',
    dueDate: '20/10/2026',
    value: 2380.0,
    status: 'aberto',
    pixCode:
      '00020126580014br.gov.bcb.pix0136rotta-pix-28914832-10495204000053039865802BR5925ROTTA TECNOLOGIA EIRELI6009JOINVILLE62070503***6304D1B9',
    barCode: '34191.79001 01043.289148 32001.049008 4 98760000238000',
  },
  {
    id: 'inv-2',
    companyId: 'cli-001',
    companyName: 'Alpha Logística',
    invoiceNumber: 'FAT-2026-0922',
    period: 'Setembro / 2026',
    dueDate: '20/09/2026',
    value: 2380.0,
    status: 'pago',
    pixCode: '00020126580014br.gov.bcb.pix0136rotta-pix-28914832-0922520400005303986',
    barCode: '34191.79001 01043.289148 32001.092201 1 98450000238000',
    paidAt: '18/09/2026',
  },
  {
    id: 'inv-3',
    companyId: 'cli-002',
    companyName: 'Beta Agroindustrial',
    invoiceNumber: 'FAT-2026-1055',
    period: 'Outubro / 2026',
    dueDate: '25/10/2026',
    value: 3850.0,
    status: 'aberto',
    pixCode: '00020126580014br.gov.bcb.pix0136rotta-pix-08412983-1055',
    barCode: '34191.79001 01043.084129 83001.105508 2 98800000385000',
  },
]

// Storage Keys
const STORAGE_KEYS = {
  SESSION: 'rotta_portal_session_v2',
  TICKETS: 'rotta_client_tickets_v2',
  EQUIPMENTS: 'rotta_client_equipments_v2',
  SUPPLIES: 'rotta_client_supplies_v2',
  COUNTERS: 'rotta_client_counters_v2',
  INVOICES: 'rotta_client_invoices_v2',
}

export function getPortalSession(): PortalSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Compatibilidade caso tenha formato legado (apenas ClientCompany)
      if (parsed && !parsed.role && parsed.name) {
        if (parsed.accountManager?.includes('Rodrigo')) {
          parsed.accountManager = 'Douglas Rotta'
        }
        return { role: 'client', company: parsed, adminName: 'Douglas Rotta' }
      }
      if (parsed?.company?.accountManager?.includes('Rodrigo')) {
        parsed.company.accountManager = 'Douglas Rotta'
      }
      if (parsed?.role === 'admin' && !parsed?.adminName) {
        parsed.adminName = 'Douglas Rotta'
      }
      return parsed
    }
  } catch (e) {
    console.warn('Erro ao ler sessão do portal:', e)
  }
  return null
}

export function savePortalSession(session: PortalSession | null) {
  try {
    if (session) {
      if (session.company?.accountManager?.includes('Rodrigo')) {
        session.company.accountManager = 'Douglas Rotta'
      }
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION)
    }
  } catch (e) {
    console.warn('Erro ao salvar sessão do portal:', e)
  }
}

// Funções de compatibilidade para código que acessa a sessão da empresa diretamente
export function getClientSession(): ClientCompany | null {
  const session = getPortalSession()
  return session?.company || null
}

export function saveClientSession(company: ClientCompany | null) {
  if (!company) {
    savePortalSession(null)
  } else {
    if (company.accountManager?.includes('Rodrigo')) {
      company.accountManager = 'Douglas Rotta'
    }
    savePortalSession({ role: 'client', company, adminName: 'Douglas Rotta' })
  }
}

export function getClientTickets(): ClientTicket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TICKETS)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler chamados:', e)
  }
  return DEFAULT_TICKETS
}

export function saveClientTickets(tickets: ClientTicket[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets))
  } catch (e) {
    console.warn('Erro ao salvar chamados:', e)
  }
}

export function getClientEquipments(): ClientEquipment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EQUIPMENTS)
    if (raw) {
      const items: ClientEquipment[] = JSON.parse(raw)
      return items.map((eq) => ({
        ...eq,
        image: getEquipmentImage(eq.model || eq.id),
      }))
    }
  } catch (e) {
    console.warn('Erro ao ler equipamentos:', e)
  }
  return DEFAULT_EQUIPMENTS
}

export function saveClientEquipments(equipments: ClientEquipment[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENTS, JSON.stringify(equipments))
  } catch (e) {
    console.warn('Erro ao salvar equipamentos:', e)
  }
}

export function getClientSupplies(): SupplyOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUPPLIES)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler pedidos de suprimentos:', e)
  }
  return DEFAULT_SUPPLY_ORDERS
}

export function saveClientSupplies(orders: SupplyOrder[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUPPLIES, JSON.stringify(orders))
  } catch (e) {
    console.warn('Erro ao salvar pedidos de suprimentos:', e)
  }
}

export function getClientCounters(): CounterReading[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COUNTERS)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler contadores:', e)
  }
  return DEFAULT_COUNTER_READINGS
}

export function saveClientCounters(counters: CounterReading[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters))
  } catch (e) {
    console.warn('Erro ao salvar contadores:', e)
  }
}

export function getClientInvoices(): ClientInvoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler faturas:', e)
  }
  return DEFAULT_INVOICES
}
