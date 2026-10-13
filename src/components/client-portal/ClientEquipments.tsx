import {
  Printer,
  Package,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Gauge,
} from 'lucide-react'
import type { ClientEquipment } from '../../types/clientPortal'

interface ClientEquipmentsProps {
  equipments: ClientEquipment[]
  onRequestSupplyForEquipment: (equipmentId: string) => void
  onOpenTicketForEquipment: (equipmentId: string) => void
}

export function ClientEquipments({
  equipments,
  onRequestSupplyForEquipment,
  onOpenTicketForEquipment,
}: ClientEquipmentsProps) {
  return (
    <div className="space-y-6">
      {/* Header da Aba */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Parque de Equipamentos Locados
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Visualize o inventário completo instalado na sua empresa, níveis de suprimentos e contadores.
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 text-xs font-bold text-rotta-blue self-start sm:self-auto">
          Total: {equipments.length} máquinas ativas
        </div>
      </div>

      {/* Grid de Equipamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipments.map((eq) => {
          const isLowToner = eq.tonerBlack < 20
          const hasColor = eq.tonerCyan !== undefined

          return (
            <div
              key={eq.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow space-y-5"
            >
              <div>
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold bg-blue-50 text-rotta-blue px-2.5 py-0.5 rounded-lg border border-blue-100">
                        {eq.assetTag}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          eq.status === 'operacional'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {eq.status === 'operacional' ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Operacional</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={12} />
                            <span>Alerta de Toner</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-1">{eq.model}</h3>
                    <p className="text-xs text-slate-400 font-mono">S/N: {eq.serialNumber}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 text-slate-600 border border-slate-200/60">
                    <Printer size={24} className="text-rotta-blue" />
                  </div>
                </div>

                {/* Localização e Instalação */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> Setor / Local:
                    </span>
                    <p className="font-semibold text-slate-800">{eq.department}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Gauge size={12} /> Contador Atual:
                    </span>
                    <p className="font-semibold text-slate-800 font-mono">
                      {eq.currentCounterMono.toLocaleString('pt-BR')} págs
                    </p>
                  </div>
                </div>

                {/* Níveis de Toner & Consumíveis */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Níveis Estimados de Consumíveis
                    </span>
                    {isLowToner && (
                      <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                        <AlertTriangle size={12} /> Repor Toner Preto
                      </span>
                    )}
                  </div>

                  {/* Toner Preto */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-600 text-[11px]">
                      <span>Toner Preto (Black)</span>
                      <span className={isLowToner ? 'text-rose-600 font-bold' : ''}>
                        {eq.tonerBlack}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isLowToner ? 'bg-rose-500' : 'bg-slate-800'
                        }`}
                        style={{ width: `${eq.tonerBlack}%` }}
                      />
                    </div>
                  </div>

                  {/* Toners Coloridos (se tiver) */}
                  {hasColor && (
                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-cyan-700 font-semibold">
                          <span>Cyan</span>
                          <span>{eq.tonerCyan}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${eq.tonerCyan}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-fuchsia-700 font-semibold">
                          <span>Mag.</span>
                          <span>{eq.tonerMagenta}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-fuchsia-500 rounded-full"
                            style={{ width: `${eq.tonerMagenta}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-amber-700 font-semibold">
                          <span>Yel.</span>
                          <span>{eq.tonerYellow}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${eq.tonerYellow}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vida Útil do Cilindro */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Vida útil da unidade de imagem (Cilindro):</span>
                    <span className="font-semibold text-slate-700">{eq.drumLife}%</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação Direta no Equipamento */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onRequestSupplyForEquipment(eq.id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <Package size={14} />
                  <span>Pedir Toner</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenTicketForEquipment(eq.id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-rotta-blue transition-colors"
                >
                  <Wrench size={14} />
                  <span>Abrir Chamado</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
