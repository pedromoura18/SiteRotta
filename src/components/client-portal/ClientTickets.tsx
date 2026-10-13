import { useState } from 'react'
import {
  Wrench,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Printer,
} from 'lucide-react'
import type { ClientTicket, TicketStatus } from '../../types/clientPortal'

interface ClientTicketsProps {
  tickets: ClientTicket[]
  onOpenNewTicket: () => void
  onSelectTicket: (ticket: ClientTicket) => void
}

export function ClientTickets({
  tickets,
  onOpenNewTicket,
  onSelectTicket,
}: ClientTicketsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'todos' | TicketStatus>('todos')

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'todos' ? true : t.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'aberto':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          label: 'Aberto (Em Triagem)',
          icon: Clock,
        }
      case 'em_atendimento':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          label: 'Em Atendimento Técnico',
          icon: Wrench,
        }
      case 'aguardando_peca':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          label: 'Aguardando Peça',
          icon: AlertCircle,
        }
      case 'concluido':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'Resolvido / Concluído',
          icon: CheckCircle2,
        }
    }
  }

  const getPriorityBadge = (priority: ClientTicket['priority']) => {
    switch (priority) {
      case 'critica':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      case 'alta':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'normal':
        return 'bg-slate-100 text-slate-700 border-slate-200'
      case 'baixa':
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header da Aba */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Central de Chamados Técnicos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Abra ordens de serviço e acompanhe o deslocamento da equipe técnica Rotta.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewTicket}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rotta-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-rotta-blue-dark transition-colors shadow-sm shrink-0"
        >
          <Plus size={16} />
          <span>Abrir Novo Chamado</span>
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por protocolo (CH-...), impressora, patrimônio ou problema..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
          </div>

          {/* Filtros de Status */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'aberto', label: 'Abertos' },
              { id: 'em_atendimento', label: 'Em Atendimento' },
              { id: 'aguardando_peca', label: 'Aguardando Peça' },
              { id: 'concluido', label: 'Concluídos' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-rotta-blue text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Chamados */}
      {filteredTickets.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center border border-slate-200 shadow-2xs space-y-3">
          <Wrench size={36} className="text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">Nenhum chamado encontrado</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não há chamados com os critérios pesquisados. Se você precisa de assistência técnica,
            clique no botão acima para abrir um novo chamado.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => {
            const badge = getStatusBadge(ticket.status)
            const BadgeIcon = badge.icon
            const prioBadge = getPriorityBadge(ticket.priority)

            return (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rotta-blue transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                      {ticket.protocol}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                    >
                      <BadgeIcon size={12} />
                      <span>{badge.label}</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${prioBadge}`}
                    >
                      Prioridade {ticket.priority}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">{ticket.createdAt}</span>
                </div>

                <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rotta-blue transition-colors">
                      {ticket.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                      <span className="inline-flex items-center gap-1">
                        <Printer size={13} className="text-rotta-blue" />
                        <strong>{ticket.equipmentName}</strong> ({ticket.assetTag})
                      </span>
                      <span>•</span>
                      <span>{ticket.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="text-right hidden sm:block">
                      <p className="text-[11px] text-slate-400">Atendente:</p>
                      <p className="text-xs font-semibold text-slate-700">
                        {ticket.assignedTech || 'Em triagem'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 group-hover:bg-blue-50 p-2 text-slate-400 group-hover:text-rotta-blue transition-colors">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
