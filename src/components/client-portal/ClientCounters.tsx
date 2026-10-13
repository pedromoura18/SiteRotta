import { useState } from 'react'
import {
  Gauge,
  Save,
  CheckCircle2,
  Calendar,
  History,
} from 'lucide-react'
import type { ClientEquipment, CounterReading } from '../../types/clientPortal'

interface ClientCountersProps {
  equipments: ClientEquipment[]
  counters: CounterReading[]
  onSubmitCounters: (readings: CounterReading[]) => void
}

export function ClientCounters({
  equipments,
  counters,
  onSubmitCounters,
}: ClientCountersProps) {
  const currentPeriod = '10/2026' // Outubro de 2026
  const [readingsState, setReadingsState] = useState<{
    [eqId: string]: { mono: string; color: string }
  }>(() => {
    const initial: { [eqId: string]: { mono: string; color: string } } = {}
    equipments.forEach((eq) => {
      // Valor sugerido levemente maior que o anterior para facilitar teste
      initial[eq.id] = {
        mono: (eq.currentCounterMono + 1250).toString(),
        color: eq.currentCounterColor
          ? (eq.currentCounterColor + 450).toString()
          : '',
      }
    })
    return initial
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    eqId: string,
    field: 'mono' | 'color',
    val: string
  ) => {
    setReadingsState((prev) => ({
      ...prev,
      [eqId]: {
        ...prev[eqId],
        [field]: val,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReadings: CounterReading[] = equipments.map((eq) => {
      const inputs = readingsState[eq.id] || { mono: '0', color: '0' }
      const monoVal = parseInt(inputs.mono, 10) || eq.currentCounterMono
      const colorVal = eq.currentCounterColor
        ? parseInt(inputs.color, 10) || eq.currentCounterColor
        : undefined

      return {
        id: `cnt-${Date.now()}-${eq.id}`,
        equipmentId: eq.id,
        equipmentName: eq.model,
        assetTag: eq.assetTag,
        period: currentPeriod,
        monoReading: monoVal,
        previousMonoReading: eq.currentCounterMono,
        colorReading: colorVal,
        previousColorReading: eq.currentCounterColor,
        recordedAt: new Date().toLocaleDateString('pt-BR'),
        recordedBy: 'Portal do Cliente',
      }
    })

    onSubmitCounters(newReadings)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Lançamento Mensal de Contadores
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Informe as leituras dos painéis das impressoras para o fechamento de bilhetagem do contrato.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 text-xs font-bold text-amber-800 self-start sm:self-auto">
          <Calendar size={14} />
          <span>Mês de Referência: {currentPeriod}</span>
        </div>
      </div>

      {submitted && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-xs font-bold text-emerald-800">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>
            Leituras do período {currentPeriod} gravadas e transmitidas com sucesso para o faturamento da Rotta!
          </span>
        </div>
      )}

      {/* Formulário de Leitura Atual */}
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Gauge size={20} className="text-rotta-blue" />
            <h3 className="text-base font-bold text-slate-900">
              Registrar Leitura do Painel das Máquinas
            </h3>
          </div>
          <span className="text-xs text-slate-400">Prazo sugerido: até dia 30</span>
        </div>

        <div className="space-y-4">
          {equipments.map((eq) => {
            const hasColor = eq.currentCounterColor !== undefined
            const currentMonoVal = parseInt(readingsState[eq.id]?.mono || '0', 10)
            const diffMono = currentMonoVal - eq.currentCounterMono

            const currentColorVal = hasColor
              ? parseInt(readingsState[eq.id]?.color || '0', 10)
              : 0
            const diffColor = hasColor ? currentColorVal - (eq.currentCounterColor || 0) : 0

            return (
              <div
                key={eq.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white text-rotta-blue px-2.5 py-0.5 rounded-md border border-slate-200">
                      {eq.assetTag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{eq.model}</h4>
                    <span className="text-xs text-slate-500">({eq.department})</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Última leitura registrada: {eq.currentCounterMono.toLocaleString('pt-BR')} págs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Mono */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Leitura Atual Mono (Preto e Branco) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        required
                        value={readingsState[eq.id]?.mono || ''}
                        onChange={(e) =>
                          handleInputChange(eq.id, 'mono', e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-mono text-slate-900 focus:border-rotta-blue focus:outline-none"
                      />
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-2 rounded-xl shrink-0 border border-emerald-200">
                        {diffMono >= 0 ? `+${diffMono.toLocaleString('pt-BR')}` : 'Inválido'} págs
                      </span>
                    </div>
                  </div>

                  {/* Color (se houver) */}
                  {hasColor && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Leitura Atual Color (Páginas Coloridas) *
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          required
                          value={readingsState[eq.id]?.color || ''}
                          onChange={(e) =>
                            handleInputChange(eq.id, 'color', e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-mono text-slate-900 focus:border-rotta-blue focus:outline-none"
                        />
                        <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-2 rounded-xl shrink-0 border border-cyan-200">
                          {diffColor >= 0
                            ? `+${diffColor.toLocaleString('pt-BR')}`
                            : 'Inválido'}{' '}
                          color
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-rotta-blue px-6 py-2.5 text-xs font-bold text-white hover:bg-rotta-blue-dark transition-colors shadow-sm"
          >
            <Save size={16} />
            <span>Transmitir Contadores do Período ({currentPeriod})</span>
          </button>
        </div>
      </form>

      {/* Histórico de Leituras Passadas */}
      <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <History size={18} className="text-slate-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Histórico das Últimas Bilhetagens
          </h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {counters.map((cnt) => (
            <div key={cnt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{cnt.equipmentName}</span>
                  <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                    {cnt.assetTag}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Registrado em {cnt.recordedAt} por {cnt.recordedBy}
                </p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-slate-400 block text-[10px]">Período</span>
                  <span className="font-bold text-slate-700">{cnt.period}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Contador Mono</span>
                  <span className="font-mono font-bold text-slate-900">
                    {cnt.monoReading.toLocaleString('pt-BR')}
                  </span>
                </div>
                {cnt.colorReading && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contador Color</span>
                    <span className="font-mono font-bold text-cyan-700">
                      {cnt.colorReading.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
