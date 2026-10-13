import {
  Wrench,
  Package,
  Printer,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  FileText,
  Clock,
  Phone,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Building,
} from 'lucide-react'
import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  ClientInvoice,
} from '../../types/clientPortal'

interface ClientDashboardProps {
  company: ClientCompany
  equipments: ClientEquipment[]
  tickets: ClientTicket[]
  supplies: SupplyOrder[]
  invoices: ClientInvoice[]
  onOpenNewTicket: () => void
  onOpenNewSupply: () => void
  onNavigateTab: (tab: 'chamados' | 'equipamentos' | 'suprimentos' | 'contadores' | 'financeiro') => void
  onSelectTicket: (ticket: ClientTicket) => void
}

export function ClientDashboard({
  company,
  equipments,
  tickets,
  supplies,
  invoices,
  onOpenNewTicket,
  onOpenNewSupply,
  onNavigateTab,
  onSelectTicket,
}: ClientDashboardProps) {
  // Cálculos rápidos
  const openTickets = tickets.filter((t) => t.status !== 'concluido')
  const inTransitSupplies = supplies.filter((s) => s.status !== 'entregue')
  const lowTonerEquipments = equipments.filter((eq) => eq.tonerBlack < 20)
  const pendingInvoice = invoices.find((inv) => inv.status === 'aberto')

  return (
    <div className="space-y-6">
      {/* Banner de Boas-Vindas */}
      <div className="rounded-3xl bg-gradient-to-r from-rotta-navy via-rotta-blue-dark to-rotta-blue p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-blue-200 border border-white/10">
              <Building size={13} />
              <span>Contrato Ativo: {company.contractNumber}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Olá, {company.contactPerson.split(' ')[0]}!
            </h2>
            <p className="text-sm text-blue-100/90 max-w-xl">
              Painel de controle de TI da <strong className="text-white">{company.name}</strong>.
              Acompanhe seu parque de locação, chamados e solicite consumíveis em segundos.
            </p>
          </div>

          {/* SLA e Gestor */}
          <div className="shrink-0 rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/15 text-xs space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-200">SLA de Atendimento:</span>
              <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Até {company.slaHours}h úteis
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-200">Gestor da Conta:</span>
              <span className="font-bold text-white">{company.accountManager}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta Inteligente de Toner Baixo (se houver) */}
      {lowTonerEquipments.length > 0 && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700 shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">
                Alerta de Consumível em Nível Baixo
              </h4>
              <p className="text-amber-800 mt-0.5">
                O equipamento <strong className="font-semibold">{lowTonerEquipments[0].model}</strong> (
                {lowTonerEquipments[0].assetTag} - {lowTonerEquipments[0].department}) está com{' '}
                <strong className="text-rose-700">{lowTonerEquipments[0].tonerBlack}%</strong> de toner
                restante.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenNewSupply}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 font-bold transition-colors shadow-2xs"
          >
            <Package size={14} />
            <span>Pedir Reposição Imediata</span>
          </button>
        </div>
      )}

      {/* Grid de Métricas Principais (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Chamados Abertos */}
        <div
          onClick={() => onNavigateTab('chamados')}
          className="cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rotta-blue transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chamados Ativos
            </span>
            <div className="rounded-xl bg-blue-50 p-2 text-rotta-blue group-hover:bg-rotta-blue group-hover:text-white transition-colors">
              <Wrench size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{openTickets.length}</span>
            <span className="text-xs text-slate-500">em andamento</span>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-semibold flex items-center gap-1">
            <span>Ver central de suporte</span>
            <ArrowRight size={12} />
          </p>
        </div>

        {/* Parque de Equipamentos */}
        <div
          onClick={() => onNavigateTab('equipamentos')}
          className="cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rotta-blue transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Parque de Máquinas
            </span>
            <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <Printer size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{equipments.length}</span>
            <span className="text-xs text-slate-500">equipamentos ativos</span>
          </div>
          <p className="text-xs text-cyan-700 mt-2 font-semibold flex items-center gap-1">
            <span>Consultar patrimônios</span>
            <ArrowRight size={12} />
          </p>
        </div>

        {/* Suprimentos a Caminho */}
        <div
          onClick={() => onNavigateTab('suprimentos')}
          className="cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rotta-blue transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Suprimentos
            </span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Package size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{inTransitSupplies.length}</span>
            <span className="text-xs text-slate-500">pedidos em entrega</span>
          </div>
          <p className="text-xs text-indigo-600 mt-2 font-semibold flex items-center gap-1">
            <span>Rastrear pedidos</span>
            <ArrowRight size={12} />
          </p>
        </div>

        {/* Fatura do Mês */}
        <div
          onClick={() => onNavigateTab('financeiro')}
          className="cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rotta-blue transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Fatura Atual
            </span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {pendingInvoice
                ? `R$ ${pendingInvoice.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : 'Em dia'}
            </span>
          </div>
          <p className="text-xs text-emerald-700 mt-2 font-semibold flex items-center gap-1">
            <span>Ver boleto / Pix</span>
            <ArrowRight size={12} />
          </p>
        </div>
      </div>

      {/* Ações Rápidas em Destaque */}
      <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={onOpenNewTicket}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-rotta-blue transition-all group"
          >
            <div className="rounded-xl bg-blue-100/70 text-rotta-blue p-2.5 mb-2 group-hover:scale-110 transition-transform">
              <Wrench size={20} />
            </div>
            <span className="text-xs font-bold text-slate-800">Abrir Chamado</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Suporte técnico</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewSupply}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 hover:border-indigo-500 transition-all group"
          >
            <div className="rounded-xl bg-indigo-100/70 text-indigo-600 p-2.5 mb-2 group-hover:scale-110 transition-transform">
              <Package size={20} />
            </div>
            <span className="text-xs font-bold text-slate-800">Pedir Toner</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Consumíveis rápidos</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('contadores')}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-500 transition-all group"
          >
            <div className="rounded-xl bg-amber-100/70 text-amber-600 p-2.5 mb-2 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-bold text-slate-800">Lançar Contador</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Bilhetagem mensal</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('financeiro')}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-500 transition-all group"
          >
            <div className="rounded-xl bg-emerald-100/70 text-emerald-600 p-2.5 mb-2 group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
            <span className="text-xs font-bold text-slate-800">2ª Via de Fatura</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Boleto e Pix</span>
          </button>
        </div>
      </div>

      {/* Grid com Últimos Chamados e Últimos Pedidos de Toner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Últimos Chamados (7 colunas) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Chamados Recentes</h3>
              <p className="text-xs text-slate-500">Histórico de suporte técnico da sua empresa</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('chamados')}
              className="text-xs font-bold text-rotta-blue hover:underline inline-flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {tickets.slice(0, 3).map((ticket) => {
              const isClosed = ticket.status === 'concluido'
              return (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className="cursor-pointer p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/60 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {ticket.protocol}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                          isClosed
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {isClosed ? 'Concluído' : 'Em Atendimento'}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">{ticket.title}</p>
                    <p className="text-slate-500 text-[11px]">
                      {ticket.equipmentName} • {ticket.department}
                    </p>
                  </div>

                  <span className="text-[11px] text-slate-400 shrink-0">{ticket.createdAt}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Suporte Dedicado & Contato do Gestor (5 colunas) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-rotta-blue flex items-center justify-center font-bold text-lg">
                RR
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{company.accountManager}</h4>
                <p className="text-xs text-slate-500">Gestor de Atendimento Corporativo</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Garantia de atendimento prioritário em contrato</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-rotta-blue shrink-0" />
                <span>Horário: Seg a Sex das 8h às 18h</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-rotta-blue shrink-0" />
                <span>Telefone Direto: {company.managerPhone}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <a
              href="https://wa.me/554734518200"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-xs font-bold transition-colors shadow-2xs"
            >
              <MessageCircle size={16} />
              <span>Chamar Gestor no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
