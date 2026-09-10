import { useState } from 'react'
import { ArrowRight, Calculator, CheckCircle2, Sparkles, TrendingDown } from 'lucide-react'
import { companyInfo } from '../data/site'

export function RoiCalculator() {
  const [printersCount, setPrintersCount] = useState<number>(3)
  const [pageVolume, setPageVolume] = useState<number>(3500)

  // Estimativas de mercado
  const traditionalCostPerPage = 0.165
  const rottaCostPerPage = 0.095

  const totalPages = printersCount * pageVolume
  const traditionalMonthlyCost = Math.round(totalPages * traditionalCostPerPage)
  const rottaMonthlyCost = Math.round(totalPages * rottaCostPerPage)
  const monthlySavings = Math.max(0, traditionalMonthlyCost - rottaMonthlyCost)
  const annualSavings = monthlySavings * 12
  const savingsPercent = Math.round((monthlySavings / traditionalMonthlyCost) * 100)

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

  const whatsappMessage = encodeURIComponent(
    `Olá Douglas! Fiz uma simulação na calculadora do site da Rotta Tecnologia:\n\n• Quantidade de Impressoras: ${printersCount}\n• Volume Médio/mês: ${pageVolume.toLocaleString('pt-BR')} págs/equipamento\n• Economia Estimada: ${formatCurrency(monthlySavings)}/mês (${formatCurrency(annualSavings)}/ano)\n\nGostaria de receber uma proposta personalizada para minha empresa!`
  )

  const customWhatsappUrl = `https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${whatsappMessage}`

  return (
    <div id="calculadora" className="container-shell">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
          <Calculator size={14} />
          <span>Simulador de Economia Interativo</span>
        </div>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Quanto sua empresa pode economizar com <span className="text-gradient-brand">Outsourcing</span>?
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Ajuste os parâmetros abaixo e veja na hora o impacto financeiro da terceirização de impressão para sua operação.
        </p>
      </div>

      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Controles / Sliders */}
          <div className="space-y-8 lg:col-span-7">
            {/* Slider 1: Quantidade de Impressoras */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-bold text-slate-900">
                  Quantidade de Impressoras / Multifuncionais
                </label>
                <span className="rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-1 text-base font-black text-rotta-blue">
                  {printersCount} {printersCount === 1 ? 'equipamento' : 'equipamentos'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={printersCount}
                onChange={(e) => setPrintersCount(Number(e.target.value))}
                className="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-rotta-blue"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>1 unidade</span>
                <span>10 unidades</span>
                <span>25+ unidades</span>
              </div>
            </div>

            {/* Slider 2: Volume de Páginas */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-bold text-slate-900">
                  Volume Médio Mensal por Equipamento
                </label>
                <span className="rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-1 text-base font-black text-rotta-blue">
                  {pageVolume.toLocaleString('pt-BR')} págs/mês
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={pageVolume}
                onChange={(e) => setPageVolume(Number(e.target.value))}
                className="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-rotta-blue"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>500 págs</span>
                <span>7.500 págs</span>
                <span>15.000+ págs</span>
              </div>
            </div>

            {/* Vantagens incluídas */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '100% dos Toners e Peças Inclusos',
                'Equipamento Reserva (Swap) imediato',
                'Manutenção Preventiva Periódica',
                'Zero Custo com Compra de Máquinas',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-rotta-blue shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card de Resultado da Economia */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 p-6 sm:p-8 text-center shadow-sm">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <TrendingDown size={14} />
                <span>Economia média de até {savingsPercent}%</span>
              </div>

              <div className="mt-6">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
                  Economia Estimada por Mês
                </p>
                <p className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                  {formatCurrency(monthlySavings)}
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-white p-4 border border-slate-200 shadow-2xs">
                <p className="text-xs text-slate-500 font-semibold">Economia Anual Projetada</p>
                <p className="mt-1 text-2xl font-black text-rotta-blue">{formatCurrency(annualSavings)}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Volume total: {totalPages.toLocaleString('pt-BR')} páginas/mês
                </p>
              </div>

              <a
                href={customWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-rotta-blue py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-rotta-blue-dark hover:shadow-lg"
              >
                <Sparkles size={18} />
                <span>Solicitar Proposta no WhatsApp</span>
                <ArrowRight size={16} />
              </a>

              <p className="mt-3 text-[11px] text-slate-400">
                Valores estimativos baseados na média de custos com suprimentos avulsos e depreciação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
