import { useState } from 'react'
import { X, Send, AlertTriangle, Printer, Wrench } from 'lucide-react'
import type {
  ClientEquipment,
  ClientTicket,
  TicketCategory,
  TicketPriority,
} from '../../types/clientPortal'

interface ClientNewTicketModalProps {
  isOpen: boolean
  onClose: () => void
  equipments: ClientEquipment[]
  preselectedEquipmentId?: string
  onSubmit: (ticket: ClientTicket) => void
}

export function ClientNewTicketModal({
  isOpen,
  onClose,
  equipments,
  preselectedEquipmentId,
  onSubmit,
}: ClientNewTicketModalProps) {
  const [equipmentId, setEquipmentId] = useState(
    preselectedEquipmentId || (equipments[0]?.id ?? '')
  )
  const [category, setCategory] = useState<TicketCategory>('qualidade')
  const [priority, setPriority] = useState<TicketPriority>('normal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requesterName, setRequesterName] = useState('')
  const [requesterPhone, setRequesterPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!equipmentId) {
      setError('Selecione o equipamento que necessita de suporte.')
      return
    }

    if (!title.trim()) {
      setError('Informe um resumo do problema.')
      return
    }

    if (!description.trim()) {
      setError('Descreva detalhadamente o que está ocorrendo.')
      return
    }

    if (!requesterName.trim() || !requesterPhone.trim()) {
      setError('Informe o nome e o telefone do responsável no local.')
      return
    }

    const selectedEq = equipments.find((eq) => eq.id === equipmentId)
    const eqName = selectedEq ? selectedEq.model : 'Equipamento Geral'
    const assetTag = selectedEq ? selectedEq.assetTag : 'N/A'
    const department = selectedEq ? selectedEq.department : 'Geral'

    const randomProtocolNum = Math.floor(1000 + Math.random() * 9000)
    const newProtocol = `CH-2026-${randomProtocolNum}`
    const nowFormatted = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const newTicket: ClientTicket = {
      id: `tkt-${Date.now()}`,
      protocol: newProtocol,
      createdAt: `${nowFormatted}`,
      equipmentId,
      equipmentName: eqName,
      assetTag,
      department,
      category,
      priority,
      status: 'aberto',
      title: title.trim(),
      description: description.trim(),
      requesterName: requesterName.trim(),
      requesterPhone: requesterPhone.trim(),
      assignedTech: 'Aguardando atribuição (SLA até 4h úteis)',
      updates: [
        {
          id: `up-${Date.now()}`,
          date: nowFormatted,
          author: requesterName.trim(),
          role: 'cliente',
          text: `Chamado registrado com prioridade ${priority.toUpperCase()}. Problema: ${title.trim()}`,
        },
      ],
    }

    onSubmit(newTicket)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-2.5 text-rotta-blue">
              <Wrench size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Abrir Novo Chamado Técnico</h3>
              <p className="text-xs text-slate-500">
                Nossa equipe técnica atenderá conforme o SLA do seu contrato
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Equipamento */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Equipamento Afetado *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Printer size={16} />
              </div>
              <select
                value={equipmentId}
                onChange={(e) => setEquipmentId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
              >
                {equipments.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.model} • {eq.assetTag} ({eq.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categoria e Prioridade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tipo de Defeito / Categoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
              >
                <option value="qualidade">Qualidade de Impressão (manchas, falhas)</option>
                <option value="atolamento">Atolamento constante de papel</option>
                <option value="rede">Rede / Não conecta / Offline / Driver</option>
                <option value="barulho">Barulho mecânico / Ruído estranho</option>
                <option value="defeito">Não liga / Travada / Erro no visor</option>
                <option value="suprimento">Problema com reconhecimento de toner</option>
                <option value="outro">Outro / Dúvida técnica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nível de Urgência / Prioridade *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
              >
                <option value="baixa">Baixa (Dúvida ou agendamento)</option>
                <option value="normal">Normal (Equipamento ainda opera parcialmente)</option>
                <option value="alta">Alta (Impacta operação da equipe)</option>
                <option value="critica">Crítica (Equipamento parado 100% em setor chave)</option>
              </select>
            </div>
          </div>

          {/* Título do Problema */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Assunto Resumido *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Impressão saindo com manchas pretas no lado direito"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
          </div>

          {/* Descrição Detalhada */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Descrição do Ocorrido *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva detalhes como código de erro no painel, se já tentou reiniciar ou trocar o papel, etc."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
          </div>

          {/* Contato do Solicitante */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nome do Solicitante no Local *
              </label>
              <input
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                placeholder="Ex: Carlos Mendes"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                WhatsApp / Telefone para Contato *
              </label>
              <input
                type="tel"
                value={requesterPhone}
                onChange={(e) => setRequesterPhone(e.target.value)}
                placeholder="Ex: (47) 99876-5432"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-rotta-blue px-6 py-2.5 text-xs font-bold text-white hover:bg-rotta-blue-dark transition-colors shadow-sm"
            >
              <Send size={15} />
              <span>Confirmar Abertura de Chamado</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
