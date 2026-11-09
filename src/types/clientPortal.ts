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
  totalPrinters: number
  monthlyContractValue: number
}

export interface ClientEquipment {
  id: string
  companyId: string
  companyName?: string
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
  ipAddress?: string // IP da rede local para telemetria SNMP
  snmpStatus?: 'online' | 'offline' | 'warning'
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
  companyId: string
  companyName?: string
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
  companyId: string
  companyName?: string
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
  companyId: string
  companyName?: string
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
  companyId: string
  companyName?: string
  invoiceNumber: string
  period: string // ex: "Outubro / 2026"
  dueDate: string
  value: number
  status: 'aberto' | 'pago' | 'vencido'
  pixCode: string
  barCode: string
  paidAt?: string
}

export type PortalSessionRole = 'client' | 'admin'

export interface PortalSession {
  role: PortalSessionRole
  company: ClientCompany // Empresa selecionada para visualização
  adminName?: string // "Douglas Rotta"
  token?: string // Token seguro JWT com assinatura criptográfica
  expiresAt?: number // Timestamp de expiração
  loginTimestamp?: string
}
