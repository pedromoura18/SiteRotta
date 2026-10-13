import { useState } from 'react'
import { X, Package, Check, AlertTriangle, Truck, MapPin } from 'lucide-react'
import type {
  ClientCompany,
  ClientEquipment,
  SupplyOrder,
} from '../../types/clientPortal'

interface ClientNewSupplyModalProps {
  isOpen: boolean
  onClose: () => void
  company: ClientCompany
  equipments: ClientEquipment[]
  preselectedEquipmentId?: string
  onSubmit: (order: SupplyOrder) => void
}

export function ClientNewSupplyModal({
  isOpen,
  onClose,
  company,
  equipments,
  preselectedEquipmentId,
  onSubmit,
}: ClientNewSupplyModalProps) {
  const [equipmentId, setEquipmentId] = useState(
    preselectedEquipmentId || (equipments[0]?.id ?? '')
  )
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({
    'toner-black': 1,
  })
  const [deliveryAddress, setDeliveryAddress] = useState(
    `${company.address} - ${company.city}/${company.state}`
  )
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const selectedEq = equipments.find((eq) => eq.id === equipmentId)
  const isColor = (selectedEq?.tonerCyan !== undefined) || (selectedEq?.type === 'multifuncional' && selectedEq?.model.toLowerCase().includes('color'))

  const availableSupplies = [
    {
      id: 'toner-black',
      name: `Toner Preto Alta Capacidade (${selectedEq?.brand || 'Original'})`,
      desc: 'Rendimento estimado conforme especificação do modelo',
    },
    ...(isColor
      ? [
          {
            id: 'toner-cyan',
            name: `Toner Ciano (Azul) - ${selectedEq?.brand || 'Original'}`,
            desc: 'Consumível color para impressões gráficas',
          },
          {
            id: 'toner-magenta',
            name: `Toner Magenta - ${selectedEq?.brand || 'Original'}`,
            desc: 'Consumível color para impressões gráficas',
          },
          {
            id: 'toner-yellow',
            name: `Toner Amarelo - ${selectedEq?.brand || 'Original'}`,
            desc: 'Consumível color para impressões gráficas',
          },
        ]
      : []),
    {
      id: 'cilindro',
      name: 'Unidade de Imagem / Cilindro (Drum Unit)',
      desc: 'Peça de desgaste para qualidade de cópia',
    },
    {
      id: 'caixa-residuo',
      name: 'Caixa Coletora de Resíduo de Toner',
      desc: 'Substituição preventiva do compartimento',
    },
    {
      id: 'papel-a4',
      name: 'Caixa de Papel Sulfite A4 75g (10 resmas)',
      desc: 'Suprimento opcional do contrato corporativo',
    },
  ]

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev }
      if (next[itemId]) {
        delete next[itemId]
      } else {
        next[itemId] = 1
      }
      return next
    })
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 1
      const nextVal = Math.max(1, current + delta)
      return { ...prev, [itemId]: nextVal }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const itemsToSubmit = Object.entries(selectedItems).map(([id, qty]) => {
      const sup = availableSupplies.find((s) => s.id === id)
      return {
        itemName: sup ? sup.name : id,
        quantity: qty,
      }
    })

    if (itemsToSubmit.length === 0) {
      setError('Selecione ao menos um item de suprimento para solicitar.')
      return
    }

    if (!deliveryAddress.trim()) {
      setError('Confirme o endereço de entrega para envio dos suprimentos.')
      return
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const code = `PED-SUP-${randomNum}`
    const nowFormatted = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // Previsão de entrega: 2 dias úteis
    const estDate = new Date()
    estDate.setDate(estDate.getDate() + 2)
    const estDeliveryFormatted = estDate.toLocaleDateString('pt-BR')

    const newOrder: SupplyOrder = {
      id: `sup-${Date.now()}`,
      code,
      createdAt: nowFormatted,
      equipmentId,
      equipmentName: selectedEq
        ? `${selectedEq.model} (${selectedEq.assetTag})`
        : 'Equipamento Geral',
      assetTag: selectedEq ? selectedEq.assetTag : 'N/A',
      items: itemsToSubmit,
      deliveryAddress: deliveryAddress.trim(),
      status: 'solicitado',
      estimatedDelivery: estDeliveryFormatted,
    }

    onSubmit(newOrder)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600">
              <Package size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Solicitar Suprimentos & Toners</h3>
              <p className="text-xs text-slate-500">
                Reposição de consumíveis inclusos no seu contrato de locação
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Equipamento */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Equipamento que Necessita do Suprimento *
            </label>
            <select
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            >
              {equipments.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.model} • {eq.assetTag} ({eq.department})
                </option>
              ))}
            </select>
          </div>

          {/* Lista de Itens */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Selecione os Suprimentos e Quantidades *
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {availableSupplies.map((item) => {
                const isSelected = !!selectedItems[item.id]
                const qty = selectedItems[item.id] || 1

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-rotta-blue bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => toggleItem(item.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-rotta-blue border-rotta-blue text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{item.name}</p>
                        <p className="text-[11px] text-slate-400">{item.desc}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-rotta-blue" />
              <span>Endereço de Entrega *</span>
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
          </div>

          {/* Observações */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Observações ou Instruções para o Entregador
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Entregar na recepção no bloco B aos cuidados do depto de TI."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 focus:border-rotta-blue focus:bg-white focus:outline-none"
            />
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
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Truck size={15} />
              <span>Confirmar Pedido de Suprimentos</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
