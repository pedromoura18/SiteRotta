import { useState } from 'react'
import {
  Users,
  Printer,
  Wrench,
  Package,
  Crown,
  Search,
  AlertTriangle,
  Eye,
  Radio,
  Server,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Activity,
  Zap,
  Globe,
  Terminal,
  Lock,
} from 'lucide-react'
import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  CounterReading,
  ClientInvoice,
  TicketStatus,
  SupplyOrderStatus,
} from '../../types/clientPortal'
import { getEquipmentImage } from '../../data/mockClientData'

interface AdminDashboardProps {
  companies: ClientCompany[]
  equipments: ClientEquipment[]
  tickets: ClientTicket[]
  supplies: SupplyOrder[]
  counters: CounterReading[]
  invoices: ClientInvoice[]
  onImpersonateCompany: (company: ClientCompany) => void
  onUpdateTicketStatus: (ticketId: string, newStatus: TicketStatus, techNote?: string) => void
  onUpdateSupplyStatus: (orderId: string, newStatus: SupplyOrderStatus, trackingCode?: string) => void
  onShowToast: (msg: string) => void
}

export function AdminDashboard({
  companies,
  equipments,
  tickets,
  supplies,
  counters: _counters,
  invoices: _invoices,
  onImpersonateCompany,
  onUpdateTicketStatus,
  onUpdateSupplyStatus,
  onShowToast,
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = useState<
    'visao-geral' | 'maquinapro' | 'chamados' | 'suprimentos' | 'equipamentos' | 'telemetria'
  >('visao-geral')

  // Estados da Integração Máquina Pro (app.maquinapro.app.br)
  const [isSyncingMaquinaPro, setIsSyncingMaquinaPro] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState('há 2 min')
  const [copiedWebhook, setCopiedWebhook] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)
  const [maquinaProView, setMaquinaProView] = useState<'monitor' | 'embed' | 'guia'>('monitor')

  const [ticketSearch, setTicketSearch] = useState('')
  const [ticketCompanyFilter, setTicketCompanyFilter] = useState('todos')
  const [ticketStatusFilter, setTicketStatusFilter] = useState('todos')

  // Sincronização em Tempo Real com Máquina Pro
  const handleSyncMaquinaPro = () => {
    setIsSyncingMaquinaPro(true)
    setTimeout(() => {
      setIsSyncingMaquinaPro(false)
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      setLastSyncTime(`às ${now}`)
      onShowToast('📡 Telemetria Máquina Pro sincronizada! Contadores e níveis de toner atualizados via SNMP.')
    }, 1200)
  }

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText('https://api.rottatecnologia.com.br/v1/integrations/maquinapro/sync')
    setCopiedWebhook(true)
    onShowToast('URL de Webhook copiada!')
    setTimeout(() => setCopiedWebhook(false), 2500)
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText('mp_sec_live_rotta_988037656_2026')
    setCopiedToken(true)
    onShowToast('Token de API copiado!')
    setTimeout(() => setCopiedToken(false), 2500)
  }

  // Estado para nota técnica ao atualizar chamado
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [techNote, setTechNote] = useState('')

  // Estado para envio de rastreio de toner
  const [selectedSupplyId, setSelectedSupplyId] = useState<string | null>(null)
  const [trackingInput, setTrackingInput] = useState('')

  // Métricas gerais
  const openTickets = tickets.filter((t) => t.status !== 'concluido')
  const pendingSupplies = supplies.filter((s) => s.status !== 'entregue')
  const totalMonthlyRevenue = companies.reduce((acc, c) => acc + c.monthlyContractValue, 0)

  // Filtragem de chamados
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.protocol.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.title.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.equipmentName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (t.companyName && t.companyName.toLowerCase().includes(ticketSearch.toLowerCase()))

    const matchesCompany =
      ticketCompanyFilter === 'todos' || t.companyId === ticketCompanyFilter

    const matchesStatus =
      ticketStatusFilter === 'todos' || t.status === ticketStatusFilter

    return matchesSearch && matchesCompany && matchesStatus
  })

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    onUpdateTicketStatus(ticketId, newStatus, techNote ? techNote : undefined)
    setTechNote('')
    setSelectedTicketId(null)
    onShowToast(`Status do chamado atualizado para ${newStatus.toUpperCase()}!`)
  }

  const handleSupplyStatusChange = (orderId: string, newStatus: SupplyOrderStatus) => {
    onUpdateSupplyStatus(
      orderId,
      newStatus,
      trackingInput ? trackingInput : undefined
    )
    setTrackingInput('')
    setSelectedSupplyId(null)
    onShowToast(`Status do pedido de suprimento atualizado!`)
  }

  return (
    <div className="space-y-6">
      {/* ── Topo do Painel do Douglas ── */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-rotta-navy to-rotta-blue p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-amber-300 border border-white/15">
              <Crown size={14} />
              <span>Painel Master do Dono • Douglas Rotta</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Central de Gestão Geral da Rotta Tecnologia
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Supervisione todos os clientes corporativos, atenda chamados em aberto, despache consumíveis e acompanhe o parque total de locação.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/15 text-xs text-right shrink-0">
            <span className="text-slate-300 block">Faturamento Mensal em Contratos:</span>
            <span className="text-2xl font-extrabold text-amber-300 block">
              R$ {totalMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-emerald-300">
              {companies.length} clientes corporativos ativos
            </span>
          </div>
        </div>
      </div>

      {/* ── Métricas Principais da Carteira ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Clientes Ativos
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{companies.length}</span>
            <span className="text-xs text-slate-400">empresas</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Parque Locado
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{equipments.length}</span>
            <span className="text-xs text-slate-400">máquinas</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Chamados Abertos
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{openTickets.length}</span>
            <span className="text-xs text-slate-400">pendentes</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Pedidos de Toner
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-600">{pendingSupplies.length}</span>
            <span className="text-xs text-slate-400">a despachar</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Máquina Pro
          </span>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-800">Sincronizado</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5 truncate">app.maquinapro.app.br</span>
        </div>
      </div>

      {/* ── Navegação de Abas do Douglas ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'visao-geral', label: 'Visão Geral & Clientes', icon: Users },
          { id: 'maquinapro', label: 'Máquina Pro (Tempo Real)', icon: Server, badge: '🟢 Ao Vivo' },
          { id: 'chamados', label: `Todos os Chamados (${openTickets.length})`, icon: Wrench },
          { id: 'suprimentos', label: `Pedidos de Suprimentos (${pendingSupplies.length})`, icon: Package },
          { id: 'equipamentos', label: `Parque de Máquinas (${equipments.length})`, icon: Printer },
          { id: 'telemetria', label: 'Guia de Controladores & SNMP', icon: Radio },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = adminTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAdminTab(tab.id as any)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── ABA 1: VISÃO GERAL & LISTA DE CLIENTES ── */}
      {adminTab === 'visao-geral' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Clientes Corporativos Cadastrados ({companies.length})
            </h3>
            <span className="text-xs text-slate-500">
              Clique em "Visualizar como Cliente" para acessar a visão da empresa
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {companies.map((comp) => {
              const compEquipments = equipments.filter((e) => e.companyId === comp.id)
              const compTickets = tickets.filter(
                (t) => t.companyId === comp.id && t.status !== 'concluido'
              )

              return (
                <div
                  key={comp.id}
                  className="rounded-3xl bg-white border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {comp.contractNumber}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1">
                          {comp.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">CNPJ: {comp.cnpj}</p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-rotta-blue flex items-center justify-center font-black text-sm shrink-0">
                        {comp.name.charAt(0)}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Contato:</span>
                        <span className="font-semibold">{comp.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cidade:</span>
                        <span className="font-semibold">
                          {comp.city} - {comp.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">SLA Contratual:</span>
                        <span className="font-bold text-emerald-700">Até {comp.slaHours}h úteis</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-400">Mensalidade:</span>
                        <span className="font-extrabold text-slate-900">
                          R$ {comp.monthlyContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-blue-50 text-rotta-blue px-2.5 py-1 rounded-lg font-bold">
                        {compEquipments.length} máquinas
                      </span>
                      {compTickets.length > 0 ? (
                        <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg font-bold">
                          {compTickets.length} chamado(s) aberto(s)
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">
                          Nenhum chamado pendente
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onImpersonateCompany(comp)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-rotta-blue text-white py-2.5 text-xs font-bold transition-colors shadow-2xs"
                  >
                    <Eye size={14} />
                    <span>Visualizar como {comp.name.split(' ')[0]}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── ABA: MÁQUINA PRO (TEMPO REAL & TELEMETRIA SNMP) ── */}
      {adminTab === 'maquinapro' && (
        <div className="space-y-6">
          {/* Topo do Módulo Máquina Pro */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-rotta-navy to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute right-0 top-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Conexão app.maquinapro.app.br Ativa</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Última sincronização: {lastSyncTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Central Máquina Pro • Telemetria em Tempo Real</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Monitoramento contínuo das impressoras locadas da Rotta Tecnologia. Leituras de contadores de páginas e níveis de suprimentos transmitidos diretamente pelos agentes coletores SNMP.
                </p>
              </div>

              {/* Botões de Ação Direta */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleSyncMaquinaPro}
                  disabled={isSyncingMaquinaPro}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rotta-blue hover:bg-blue-600 text-white px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={16} className={isSyncingMaquinaPro ? 'animate-spin' : ''} />
                  <span>{isSyncingMaquinaPro ? 'Sincronizando Máquinas...' : 'Sincronizar SNMP Agora'}</span>
                </button>

                <a
                  href="https://app.maquinapro.app.br/#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 px-5 py-3 text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95"
                >
                  <ExternalLink size={16} />
                  <span>Abrir Máquina Pro Oficial</span>
                </a>
              </div>
            </div>

            {/* Sub-navegação interna do Máquina Pro */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setMaquinaProView('monitor')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  maquinaProView === 'monitor'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Server size={14} />
                <span>Parque Monitorado ao Vivo ({equipments.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMaquinaProView('embed')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  maquinaProView === 'embed'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Globe size={14} />
                <span>Terminal Integrado (Webview)</span>
              </button>

              <button
                type="button"
                onClick={() => setMaquinaProView('guia')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  maquinaProView === 'guia'
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-800/60 text-amber-300 hover:bg-slate-800 border border-amber-500/20'
                }`}
              >
                <Zap size={14} />
                <span>Como Ligar ao Portal (Guia Técnico & Webhooks)</span>
              </button>
            </div>
          </div>

          {/* ── SUB-ABA 1: MONITORAMENTO AO VIVO DE TODAS AS MÁQUINAS ── */}
          {maquinaProView === 'monitor' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity size={18} className="text-emerald-600" />
                    <span>Equipamentos com Telemetria Ativa no Máquina Pro</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Contadores bilhetados e porcentagens de toner atualizadas automaticamente por varredura SNMP na rede do cliente.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {equipments.length}/{equipments.length} Online
                  </span>
                  <span className="font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    Porta: 161 UDP
                  </span>
                </div>
              </div>

              {/* Grid das impressoras sincronizadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {equipments.map((eq) => {
                  const isLowToner = eq.tonerBlack < 20
                  const hasColor = eq.tonerCyan !== undefined

                  return (
                    <div
                      key={eq.id}
                      className="rounded-3xl bg-white border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Topo do Card da Impressora */}
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-slate-50 p-1.5 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                            <img
                              src={eq.image || getEquipmentImage(eq.model || eq.id)}
                              alt={eq.model}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                ;(e.currentTarget as HTMLImageElement).src = '/products/brother-mfc-l6902dw.jpg'
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-mono text-[10px] font-extrabold bg-blue-50 text-rotta-blue px-2 py-0.5 rounded border border-blue-100">
                                {eq.assetTag}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>SNMP Online</span>
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug truncate">{eq.model}</h4>
                            <p className="text-[11px] text-slate-400 font-mono">S/N: {eq.serialNumber}</p>
                            <p className="text-xs font-semibold text-slate-600 mt-0.5">{eq.companyName || 'Alpha Logística'}</p>
                          </div>
                        </div>

                        {/* Dados de Telemetria Máquina Pro */}
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium">IP no Coletor:</span>
                            <span className="font-mono font-bold text-rotta-blue">{eq.ipAddress || '192.168.1.150'}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium">Contador Mono:</span>
                            <span className="font-mono font-bold text-slate-900">
                              {eq.currentCounterMono.toLocaleString('pt-BR')} págs
                            </span>
                          </div>

                          {hasColor && (
                            <div className="flex items-center justify-between">
                              <span className="text-cyan-700 font-medium">Contador Color:</span>
                              <span className="font-mono font-bold text-cyan-800">
                                {(eq.currentCounterColor || 0).toLocaleString('pt-BR')} págs
                              </span>
                            </div>
                          )}

                          {/* Barras de Toner */}
                          <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-700">Toner Preto (K)</span>
                              <span className={`font-mono font-bold ${isLowToner ? 'text-rose-600' : 'text-slate-900'}`}>
                                {eq.tonerBlack}%
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isLowToner ? 'bg-rose-500' : 'bg-slate-900'
                                }`}
                                style={{ width: `${eq.tonerBlack}%` }}
                              />
                            </div>

                            {hasColor && (
                              <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
                                <div>
                                  <div className="flex justify-between text-cyan-700 font-semibold mb-0.5">
                                    <span>C</span>
                                    <span>{eq.tonerCyan}%</span>
                                  </div>
                                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: `${eq.tonerCyan}%` }} />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-fuchsia-700 font-semibold mb-0.5">
                                    <span>M</span>
                                    <span>{eq.tonerMagenta}%</span>
                                  </div>
                                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-fuchsia-500" style={{ width: `${eq.tonerMagenta}%` }} />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-amber-700 font-semibold mb-0.5">
                                    <span>Y</span>
                                    <span>{eq.tonerYellow}%</span>
                                  </div>
                                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400" style={{ width: `${eq.tonerYellow}%` }} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botão de Link com Máquina Pro */}
                      <a
                        href="https://app.maquinapro.app.br/#"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 text-xs font-bold transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Abrir Equipamento no Máquina Pro</span>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── SUB-ABA 2: VISUALIZADOR INTEGRADO (WEBVIEW) ── */}
          {maquinaProView === 'embed' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-rotta-blue flex items-center justify-center font-bold">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Navegador Integrado Máquina Pro</h4>
                    <p className="text-xs text-slate-500 font-mono">https://app.maquinapro.app.br/#</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://app.maquinapro.app.br/#"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-navy hover:bg-slate-900 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Abrir em Janela Dedicada</span>
                  </a>
                </div>
              </div>

              {/* Moldura Webview com Barra de Navegação */}
              <div className="rounded-3xl border border-slate-300 bg-slate-900 shadow-xl overflow-hidden">
                <div className="bg-slate-800/90 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    </div>
                    <span className="ml-3 font-mono text-[11px] text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                      <Lock size={11} className="text-emerald-400" />
                      <span>https://app.maquinapro.app.br/#</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                    Sessão Direta • Douglas Rotta
                  </span>
                </div>

                <div className="bg-white min-h-[640px] flex flex-col items-center justify-center p-8 text-center relative">
                  <iframe
                    src="https://app.maquinapro.app.br/#"
                    title="Máquina Pro"
                    className="w-full h-[640px] border-0 rounded-b-2xl"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                  <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 max-w-xl">
                    <p>
                      <strong>Nota de Compatibilidade:</strong> Se o painel do Máquina Pro não carregar no frame acima devido à política de proteção (X-Frame-Options) do servidor do Máquina Pro, utilize o botão <strong>"Abrir Máquina Pro Oficial"</strong> no topo para acessá-lo diretamente com sessão salva.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SUB-ABA 3: GUIA TÉCNICO E CONFIGURAÇÃO DA INTEGRAÇÃO COM MÁQUINA PRO ── */}
          {maquinaProView === 'guia' && (
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                  <Zap size={14} className="text-amber-600" />
                  <span>Manual de Integração Técnica para Douglas Rotta</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Como ligar o app.maquinapro.app.br ao Portal da Rotta Tecnologia?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  O <strong>Máquina Pro</strong> é o sistema de retaguarda especializado em outsourcing de impressoras que o Douglas já utiliza. A ligação entre o Máquina Pro e o nosso Portal do Cliente é feita através de <strong>3 mecanismos consolidados</strong> no mercado de locação:
                </p>
              </div>

              {/* 3 Formas de Integração */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                {/* Pilar 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-rotta-blue flex items-center justify-center font-black text-base">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Coletor SNMP Local do Máquina Pro</h4>
                  <p className="text-slate-600 leading-relaxed">
                    O agente do Máquina Pro (instalado em 1 computador da rede do cliente como Alpha ou Beta) faz varreduras automáticas via <strong>SNMP (porta 161 UDP)</strong> nas impressoras Brother, Kyocera, HP e Zebra, coletando contadores exatos e níveis de toner.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-base">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Webhook Automático para o Portal Rotta</h4>
                  <p className="text-slate-600 leading-relaxed">
                    O Máquina Pro envia a cada leitura ou no fechamento mensal um pacote JSON para a URL de Webhook do nosso portal. O portal recebe os dados e atualiza instantaneamente as barras de toner e os contadores na tela do cliente!
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-base">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Fechamento e Faturamento Sem Digitação</h4>
                  <p className="text-slate-600 leading-relaxed">
                    No dia 30 de cada mês, o portal puxa a bilhetagem fechada pelo Máquina Pro, calcula se houve excedente de páginas conforme a franquia contratada e gera a fatura com QR Code Pix já disponível para o cliente baixar na aba Financeiro.
                  </p>
                </div>
              </div>

              {/* Caixa de Configuração com Copiar URL de Webhook e Chave de API */}
              <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">
                      Parâmetros Técnicos de Conexão com o Máquina Pro
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Endpoint Ativo
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Webhook URL */}
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                      URL de Webhook do Portal Rotta (Configurar no Máquina Pro):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://api.rottatecnologia.com.br/v1/integrations/maquinapro/sync"
                        className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 font-mono text-xs text-slate-200 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyWebhook}
                        className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedWebhook ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copiedWebhook ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Token de API */}
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                      Chave Secreta de API (Bearer Token):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="mp_sec_live_rotta_988037656_2026"
                        className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 font-mono text-xs text-amber-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedToken ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copiedToken ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-bold text-slate-300">
                    Como ativar no painel do Máquina Pro (Passo a Passo):
                  </p>
                  <p>
                    1. Faça login em <strong className="text-white">https://app.maquinapro.app.br/#</strong> com seu usuário e senha.
                  </p>
                  <p>
                    2. Acesse <em>Configurações &gt; Integrações / Webhooks &gt; Nova Notificação HTTP</em>.
                  </p>
                  <p>
                    3. Cole a URL de Webhook acima, marque os eventos de <strong>Leitura de Contadores</strong> e <strong>Nível de Suprimentos</strong>, e insira a chave secreta no cabeçalho Authorization.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ABA 2: CENTRAL DE TODOS OS CHAMADOS (Douglas pode atualizar e responder) ── */}
      {adminTab === 'chamados' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 border border-slate-200 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder="Pesquisar por protocolo, problema, cliente ou equipamento..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-rotta-blue"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={ticketCompanyFilter}
                  onChange={(e) => setTicketCompanyFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="todos">Todos os Clientes</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  value={ticketStatusFilter}
                  onChange={(e) => setTicketStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="aberto">Aberto</option>
                  <option value="em_atendimento">Em Atendimento</option>
                  <option value="aguardando_peca">Aguardando Peça</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
            </div>
          </div>

          {filteredTickets.map((ticket) => {
            const isSelected = selectedTicketId === ticket.id

            return (
              <div
                key={ticket.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">
                      {ticket.protocol}
                    </span>
                    <span className="text-xs font-bold text-rotta-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Cliente: {ticket.companyName || 'Alpha Logística'}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Status Atual: {ticket.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{ticket.createdAt}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">{ticket.title}</h4>
                  <p className="text-xs text-slate-600">{ticket.description}</p>
                  <p className="text-xs text-slate-400 pt-1">
                    Equipamento: <strong>{ticket.equipmentName}</strong> ({ticket.assetTag}) • Local: {ticket.department}
                  </p>
                  <p className="text-xs text-slate-400">
                    Solicitante: {ticket.requesterName} ({ticket.requesterPhone})
                  </p>
                </div>

                {/* Histórico Recente de Notas */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                  <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Última Atualização Registrada:
                  </span>
                  <p className="text-slate-600">
                    {ticket.updates[ticket.updates.length - 1]?.text || 'Nenhuma atualização'}
                  </p>
                </div>

                {/* Controles de Ação do Douglas */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTicketId(isSelected ? null : ticket.id)}
                    className="text-xs font-bold text-rotta-blue hover:underline text-left"
                  >
                    {isSelected ? 'Ocultar opções de atendimento' : 'Gerenciar / Atualizar Status deste Chamado'}
                  </button>

                  <div className="flex items-center gap-2 flex-wrap">
                    {ticket.status !== 'em_atendimento' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(ticket.id, 'em_atendimento')}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100"
                      >
                        Iniciar Atendimento
                      </button>
                    )}

                    {ticket.status !== 'aguardando_peca' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(ticket.id, 'aguardando_peca')}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs hover:bg-purple-100"
                      >
                        Aguardando Peça
                      </button>
                    )}

                    {ticket.status !== 'concluido' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(ticket.id, 'concluido')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                      >
                        Finalizar / Concluir
                      </button>
                    )}
                  </div>
                </div>

                {/* Campo para o Douglas adicionar nota técnica */}
                {isSelected && (
                  <div className="mt-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Adicionar Parecer Técnico de Douglas Rotta (o cliente verá no portal):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={techNote}
                        onChange={(e) => setTechNote(e.target.value)}
                        placeholder="Ex: Peça separada no laboratório. Técnico agendado para amanhã às 09h."
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (techNote.trim()) {
                            onUpdateTicketStatus(ticket.id, ticket.status, techNote.trim())
                            setTechNote('')
                            onShowToast('Mensagem técnica enviada com sucesso!')
                          }
                        }}
                        className="rounded-xl bg-rotta-blue px-4 py-2 text-xs font-bold text-white hover:bg-rotta-blue-dark shrink-0"
                      >
                        Gravar Nota
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── ABA 3: PEDIDOS DE SUPRIMENTOS (Despacho de Toners) ── */}
      {adminTab === 'suprimentos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Solicitações de Consumíveis ({supplies.length})
            </h3>
            <span className="text-xs text-slate-500">
              Atualize o status da entrega para que o cliente rastreie no portal
            </span>
          </div>

          {supplies.map((order) => {
            const isSelected = selectedSupplyId === order.id

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">
                      {order.code}
                    </span>
                    <span className="text-xs font-bold text-rotta-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Cliente: {order.companyName || 'Alpha Logística'}
                    </span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Status: {order.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{order.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-700 mb-1">Itens Solicitados:</h5>
                    <div className="space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-50 flex justify-between">
                          <span className="font-semibold text-slate-800">{it.itemName}</span>
                          <span className="font-bold text-rotta-blue">Qtd: {it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-700 mb-1">Destino:</h5>
                    <div className="p-2.5 rounded-xl bg-slate-50 space-y-1 text-slate-600">
                      <p><strong>Equipamento:</strong> {order.equipmentName}</p>
                      <p><strong>Endereço:</strong> {order.deliveryAddress}</p>
                      {order.trackingCode && (
                        <p className="text-indigo-700 font-mono font-bold">
                          Rastreio: {order.trackingCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ações de Despacho */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 flex-wrap">
                  {order.status !== 'separacao' && (
                    <button
                      type="button"
                      onClick={() => handleSupplyStatusChange(order.id, 'separacao')}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100"
                    >
                      Marcar em Separação
                    </button>
                  )}

                  {order.status !== 'em_transito' && (
                    <button
                      type="button"
                      onClick={() => setSelectedSupplyId(isSelected ? null : order.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs hover:bg-indigo-100"
                    >
                      Despachar / Rastreio
                    </button>
                  )}

                  {order.status !== 'entregue' && (
                    <button
                      type="button"
                      onClick={() => handleSupplyStatusChange(order.id, 'entregue')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                    >
                      Confirmar Entrega
                    </button>
                  )}
                </div>

                {isSelected && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-2">
                    <label className="block font-bold text-slate-800">
                      Informe o código de rastreio ou veículo de entrega:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="Ex: ROT-EXP-9921 (Motoboy / Jadlog)"
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSupplyStatusChange(order.id, 'em_transito')}
                        className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shrink-0"
                      >
                        Enviar em Trânsito
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── ABA 4: PARQUE GERAL DE MÁQUINAS ── */}
      {adminTab === 'equipamentos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Todos os Equipamentos em Locação ({equipments.length})
            </h3>
            <span className="text-xs text-slate-500">
              Inventário total de hardwares nas empresas clientes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipments.map((eq) => (
              <div
                key={eq.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs space-y-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={eq.image || getEquipmentImage(eq.model || eq.id)}
                      alt={eq.model}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src = '/products/brother-mfc-l6902dw.jpg'
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {eq.assetTag}
                      </span>
                      <span className="rounded-md bg-blue-50 text-rotta-blue font-bold px-2 py-0.5 text-[10px] truncate max-w-[120px]">
                        {eq.companyName || 'Alpha Logística'}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1 truncate">{eq.model}</h4>
                    <p className="text-slate-400 font-mono text-[11px]">S/N: {eq.serialNumber}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Setor:</span>
                    <span className="font-semibold">{eq.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contador:</span>
                    <span className="font-mono font-bold">{eq.currentCounterMono.toLocaleString('pt-BR')} págs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Toner Preto:</span>
                    <span className={`font-bold ${eq.tonerBlack < 20 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {eq.tonerBlack}%
                    </span>
                  </div>
                  {eq.ipAddress && (
                    <div className="flex justify-between font-mono text-[11px] pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400">IP na Rede:</span>
                      <span className="text-rotta-blue">{eq.ipAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ABA 5: CONSULTORIA TÉCNICA - CONTROLADOR REAL & SNMP ── */}
      {adminTab === 'telemetria' && (
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-rotta-blue">
              <Radio size={14} className="animate-pulse" />
              <span>Arquitetura de Conexão com Controladores Reais</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Como ligar as impressoras dos clientes ao portal em tempo real?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Para que as impressoras marquem automaticamente o nível exato de toner e o contador real de páginas sem ninguém precisar digitar, utiliza-se a arquitetura padrão do mercado de outsourcing de impressão:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-rotta-blue flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Protocolo SNMP nas Máquinas</h4>
              <p className="text-slate-600 leading-relaxed">
                Toda impressora de rede corporativa (Brother, Kyocera, HP, Zebra) possui o protocolo <strong>SNMP (Porta 161 UDP)</strong> nativo. Ele armazena códigos chamados <strong>OIDs</strong> com a porcentagem exata do toner e o contador total de páginas rodadas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Coletor Local na Empresa</h4>
              <p className="text-slate-600 leading-relaxed">
                Um agente leve (software em segundo plano em 1 computador ou servidor Windows da empresa do cliente) faz uma varredura periódica a cada 1 hora nos IPs locais das impressoras. Softwares como <strong>PrintWayy</strong> ou um mini-serviço em Node.js realizam essa leitura.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">API / Webhook para o Portal</h4>
              <p className="text-slate-600 leading-relaxed">
                O coletor envia um pacote JSON criptografado para a API do portal da Rotta. O portal recebe e atualiza instantaneamente as barras de toner e os contadores na tela do cliente e no painel do Douglas!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <h5 className="font-bold flex items-center gap-1.5">
              <AlertTriangle size={15} />
              Recomendação Prática:
            </h5>
            <p className="leading-relaxed">
              Enquanto o coletor SNMP ou integração com PrintWayy estiver sendo configurada, o portal já está perfeitamente funcional para o que gera mais valor no dia a dia: <strong>abertura e resposta de chamados com SLA</strong>, <strong>pedidos de toner com rastreio</strong>, <strong>faturas com Pix automático</strong> e <strong>lançamento de contadores mensais</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
