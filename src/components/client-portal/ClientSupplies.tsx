import {
  Package,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  MapPin,
  Calendar,
} from 'lucide-react'
import type { SupplyOrder, SupplyOrderStatus } from '../../types/clientPortal'

interface ClientSuppliesProps {
  supplies: SupplyOrder[]
  onOpenNewSupply: () => void
}

export function ClientSupplies({ supplies, onOpenNewSupply }: ClientSuppliesProps) {
  const getStatusBadge = (status: SupplyOrderStatus) => {
    switch (status) {
      case 'solicitado':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          label: 'Solicitação Registrada',
          icon: Clock,
        }
      case 'separacao':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          label: 'Em Separação no Almoxarifado',
          icon: Package,
        }
      case 'em_transito':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          label: 'Em Rota de Entrega',
          icon: Truck,
        }
      case 'entregue':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'Entregue no Local',
          icon: CheckCircle2,
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Solicitação & Rastreio de Suprimentos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Toners originais, peças e papel com entrega rápida inclusos na franquia.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewSupply}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
        >
          <Plus size={16} />
          <span>Solicitar Novo Suprimento</span>
        </button>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {supplies.map((order) => {
          const badge = getStatusBadge(order.status)
          const BadgeIcon = badge.icon

          return (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4"
            >
              {/* Topo do Pedido */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                    {order.code}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                  >
                    <BadgeIcon size={12} />
                    <span>{badge.label}</span>
                  </span>
                  {order.trackingCode && (
                    <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold">
                      Rastreio: {order.trackingCode}
                    </span>
                  )}
                </div>

                <span className="text-xs text-slate-400">Data: {order.createdAt}</span>
              </div>

              {/* Informações dos Itens e Equipamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Itens Solicitados:
                  </h4>
                  <div className="space-y-1.5">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                      >
                        <span className="font-semibold text-slate-800">{item.itemName}</span>
                        <span className="font-bold text-rotta-blue bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          Qtd: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Destino & Previsão:
                  </h4>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-start gap-2 text-slate-700">
                      <Printer size={14} className="text-rotta-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900">{order.equipmentName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin size={14} className="text-rotta-blue shrink-0 mt-0.5" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-slate-200/60">
                      <Calendar size={13} className="text-emerald-600 shrink-0" />
                      <span>
                        Previsão de Entrega:{' '}
                        <strong className="text-slate-900">{order.estimatedDelivery}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
