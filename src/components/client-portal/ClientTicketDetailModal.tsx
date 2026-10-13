import { useState } from 'react'
import {
  X,
  Clock,
  User,
  Wrench,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Printer,
} from 'lucide-react'
import type { ClientTicket } from '../../types/clientPortal'

interface ClientTicketDetailModalProps {
  ticket: ClientTicket | null
  onClose: () => void
  onAddMessage: (ticketId: string, message: string) => void
}

export function ClientTicketDetailModal({
  ticket,
  onClose,
  onAddMessage,
}: ClientTicketDetailModalProps) {
  const [newMessage, setNewMessage] = useState('')

  if (!ticket) return null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    onAddMessage(ticket.id, newMessage.trim())
    setNewMessage('')
  }

  const getStatusBadge = (status: ClientTicket['status']) => {
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
          label: 'Aguardando Peça / Estoque',
          icon: AlertCircle,
        }
      case 'concluido':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'Concluído / Resolvido',
          icon: CheckCircle2,
        }
    }
  }

  const badge = getStatusBadge(ticket.status)
  const BadgeIcon = badge.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md">
                {ticket.protocol}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
              >
                <BadgeIcon size={12} />
                <span>{badge.label}</span>
              </span>
              <span className="text-xs text-slate-400">• Abertura: {ticket.createdAt}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{ticket.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Informações do Equipamento e Atendimento */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Printer size={16} className="text-rotta-blue shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">{ticket.equipmentName}</p>
              <p className="text-slate-500">
                {ticket.assetTag} • {ticket.department}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <User size={16} className="text-rotta-blue shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">
                {ticket.assignedTech || 'Equipe de Suporte Rotta'}
              </p>
              <p className="text-slate-500">
                Solicitante: {ticket.requesterName} ({ticket.requesterPhone})
              </p>
            </div>
          </div>
        </div>

        {/* Descrição do Chamado */}
        <div className="mt-4 p-4 rounded-2xl border border-slate-100 bg-white">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Descrição do Problema Relatado
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">{ticket.description}</p>
        </div>

        {/* Linha do Tempo / Histórico de Atualizações */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Clock size={14} className="text-rotta-blue" />
            <span>Linha do Tempo do Atendimento</span>
          </h4>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {ticket.updates.map((up) => {
              const isTech = up.role === 'tecnico'
              const isSystem = up.role === 'sistema'
              return (
                <div
                  key={up.id}
                  className={`p-3.5 rounded-xl border text-xs ${
                    isTech
                      ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                      : isSystem
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1">
                      {isTech ? '🛠️ ' : isSystem ? '⚙️ ' : '👤 '}
                      {up.author}
                    </span>
                    <span className="text-[11px] text-slate-400">{up.date}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{up.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Adicionar Mensagem ao Chamado */}
        <form onSubmit={handleSendMessage} className="mt-5 pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <MessageSquare size={13} className="text-rotta-blue" />
            <span>Adicionar Mensagem ou Informação Adicional</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite uma mensagem para o técnico responsável..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-blue px-4 py-2 text-xs font-bold text-white hover:bg-rotta-blue-dark transition-colors shrink-0"
            >
              <Send size={13} />
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
