export interface ClientCompany {
  id: string
  name: string
  tradeName: string
  cnpj: string
  contractNumber: string
  plan: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  accountManager: string
  managerPhone: string
  slaHours: number
}

export interface ClientEquipment {
  id: string
  model: string
  brand: string
  type: 'impressora' | 'multifuncional' | 'etiquetadora' | 'computador'
  serialNumber: string
  assetTag: string // Patrimônio (PAT)
  department: string // Setor/Localização
  installationDate: string
  status: 'operacional' | 'alerta' | 'manutencao'
  currentCounterMono: number
  currentCounterColor?: number
  tonerBlack: number // 0 a 100%
  tonerCyan?: number
  tonerMagenta?: number
  tonerYellow?: number
  drumLife: number // 0 a 100%
  image?: string
}

export type TicketCategory =
  | 'defeito'
  | 'qualidade'
  | 'atolamento'
  | 'rede'
  | 'barulho'
  | 'suprimento'
  | 'outro'

export type TicketPriority = 'baixa' | 'normal' | 'alta' | 'critica'

export type TicketStatus = 'aberto' | 'em_atendimento' | 'aguardando_peca' | 'concluido'

export interface TicketUpdate {
  id: string
  date: string
  author: string
  role: 'tecnico' | 'sistema' | 'cliente'
  text: string
}

export interface ClientTicket {
  id: string
  protocol: string
  createdAt: string
  equipmentId: string
  equipmentName: string
  assetTag: string
  department: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  title: string
  description: string
  requesterName: string
  requesterPhone: string
  assignedTech?: string
  estimatedResolution?: string
  updates: TicketUpdate[]
}

export interface SupplyItem {
  id: string
  name: string
  code: string
  color?: 'black' | 'cyan' | 'magenta' | 'yellow'
  compatibleModels: string[]
  yieldPages: string
}

export type SupplyOrderStatus = 'solicitado' | 'separacao' | 'em_transito' | 'entregue'

export interface SupplyOrder {
  id: string
  code: string
  createdAt: string
  equipmentId: string
  equipmentName: string
  assetTag: string
  items: {
    itemName: string
    quantity: number
  }[]
  deliveryAddress: string
  status: SupplyOrderStatus
  trackingCode?: string
  estimatedDelivery: string
}

export interface CounterReading {
  id: string
  equipmentId: string
  equipmentName: string
  assetTag: string
  period: string // ex: "10/2026"
  monoReading: number
  colorReading?: number
  previousMonoReading: number
  previousColorReading?: number
  recordedAt: string
  recordedBy: string
}

export interface ClientInvoice {
  id: string
  invoiceNumber: string
  period: string // ex: "Outubro / 2026"
  dueDate: string
  value: number
  status: 'aberto' | 'pago' | 'vencido'
  pixCode: string
  barCode: string
  paidAt?: string
}
