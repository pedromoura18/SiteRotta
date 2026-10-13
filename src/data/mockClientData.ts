import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  CounterReading,
  ClientInvoice,
} from '../types/clientPortal'

export const DEFAULT_CLIENT_COMPANY: ClientCompany = {
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
  accountManager: 'Rodrigo Rotta',
  managerPhone: '(47) 99123-4567',
  slaHours: 4,
}

export const DEFAULT_EQUIPMENTS: ClientEquipment[] = [
  {
    id: 'eq-1',
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
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'eq-2',
    model: 'HP LaserJet Enterprise M404n',
    brand: 'HP',
    type: 'impressora',
    serialNumber: 'HPB-772109-SC',
    assetTag: 'PAT-0843',
    department: 'Departamento Financeiro',
    installationDate: '10/02/2024',
    status: 'alerta',
    currentCounterMono: 31240,
    tonerBlack: 14, // Alerta de toner baixo!
    drumLife: 90,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'eq-3',
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
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'eq-4',
    model: 'Zebra ZD220 Térmica',
    brand: 'Zebra',
    type: 'etiquetadora',
    serialNumber: 'ZBR-118932-BR',
    assetTag: 'PAT-0845',
    department: 'Expedição & Logística',
    installationDate: '20/06/2024',
    status: 'operacional',
    currentCounterMono: 84200, // Etiquetas impressas
    tonerBlack: 88, // Ribbon
    drumLife: 95,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  },
]

export const DEFAULT_TICKETS: ClientTicket[] = [
  {
    id: 'tkt-1',
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
      'Desde ontem as notas fiscais e relatórios impressos no financeiro apresentam uma faixa preta no canto esquerdo da folha. Já tentamos trocar a gaveta de papel.',
    requesterName: 'Juliana Costa',
    requesterPhone: '(47) 99876-1122',
    assignedTech: 'Marcos Silveira (Técnico Rotta)',
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
        author: 'Marcos Silveira',
        role: 'tecnico',
        text: 'Técnico Marcos atribuído ao atendimento. Peça de reposição (cilindro/rolo de transferência) separada no estoque. Visita técnica agendada para 13/10 pela manhã.',
      },
    ],
  },
  {
    id: 'tkt-2',
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
    assignedTech: 'André Luiz (Suporte TI Rotta)',
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
        author: 'André Luiz',
        role: 'tecnico',
        text: 'Acesso remoto realizado via AnyDesk. Caminho SMB atualizado no catálogo de endereços da multifuncional Kyocera. Teste de digitalização realizado com sucesso.',
      },
      {
        id: 'up-203',
        date: '02/10/2026 às 10:40',
        author: 'Carlos Mendes',
        role: 'cliente',
        text: 'Confirmado funcionamento. Chamado concluído.',
      },
    ],
  },
]

export const DEFAULT_SUPPLY_ORDERS: SupplyOrder[] = [
  {
    id: 'sup-1',
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
]

export const DEFAULT_COUNTER_READINGS: CounterReading[] = [
  {
    id: 'cnt-1',
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
]

export const DEFAULT_INVOICES: ClientInvoice[] = [
  {
    id: 'inv-1',
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
    invoiceNumber: 'FAT-2026-0815',
    period: 'Agosto / 2026',
    dueDate: '20/08/2026',
    value: 2380.0,
    status: 'pago',
    pixCode: '00020126580014br.gov.bcb.pix0136rotta-pix-28914832-0815520400005303986',
    barCode: '34191.79001 01043.289148 32001.081503 8 98140000238000',
    paidAt: '19/08/2026',
  },
]

// Storage Keys
const STORAGE_KEYS = {
  SESSION: 'rotta_client_session',
  TICKETS: 'rotta_client_tickets',
  EQUIPMENTS: 'rotta_client_equipments',
  SUPPLIES: 'rotta_client_supplies',
  COUNTERS: 'rotta_client_counters',
  INVOICES: 'rotta_client_invoices',
}

export function getClientSession(): ClientCompany | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler sessão do cliente:', e)
  }
  return null
}

export function saveClientSession(company: ClientCompany | null) {
  try {
    if (company) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(company))
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION)
    }
  } catch (e) {
    console.warn('Erro ao salvar sessão do cliente:', e)
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
    if (raw) return JSON.parse(raw)
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
