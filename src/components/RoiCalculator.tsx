import { useState } from 'react'
import { ArrowRight, Calculator, CheckCircle2, Sparkles, TrendingDown } from 'lucide-react'
import { companyInfo } from '../data/site'

export function RoiCalculator() {
  const [printersCount, setPrintersCount] = useState<number>(3)
  const [pageVolume, setPageVolume] = useState<number>(3500)

  // Estimativas de mercado
  // Custo tradicional médio por página (compra + toner avulso + manutenção avulsa + depreciação): ~R$ 0,16
  // Custo Outsourcing Rotta médio (locação + toners inclusos + suporte + swap): ~R$ 0,09
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
    <section id="calculadora" className="relative py-20 bg-rotta-darkest overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-rotta-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rotta-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
            <Calculator size={14} />
            <span>Simulador de Economia Interativo</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Quanto sua empresa pode economizar com <span className="text-gradient-cyan">Outsourcing</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Ajuste os parâmetros abaixo e veja na hora o impacto financeiro da terceirização de impressão para sua operação.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-rotta-navy/70 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Controles / Sliders */}
            <div className="space-y-8 lg:col-span-7">
              {/* Slider 1: Quantidade de Impressoras */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm sm:text-base font-bold text-white">
                    Quantidade de Impressoras / Multifuncionais
                  </label>
                  <span className="rounded-xl border border-rotta-cyan/40 bg-rotta-cyan/15 px-3.5 py-1 text-base sm:text-lg font-black text-rotta-cyan">
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
                  className="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-rotta-cyan"
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
                  <label className="text-sm sm:text-base font-bold text-white">
                    Volume Médio Mensal por Equipamento
                  </label>
                  <span className="rounded-xl border border-rotta-blue-light/40 bg-rotta-blue/20 px-3.5 py-1 text-base sm:text-lg font-black text-white">
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
                  className="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-rotta-blue-light"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>500 págs</span>
                  <span>7.500 págs</span>
                  <span>15.000+ págs</span>
                </div>
              </div>

              {/* Vantagens incluídas */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  '100% dos Toners e Peças Inclusos',
                  'Equipamento Reserva (Swap) em caso de falha',
                  'Manutenção Preventiva Periódica',
                  'Zero Custo com Compra de Máquinas',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-rotta-cyan shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card de Resultado da Economia */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-rotta-cyan/40 bg-gradient-to-b from-rotta-navy-light to-rotta-navy p-6 sm:p-8 text-center shadow-glow">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  <TrendingDown size={14} />
                  <span>Economia de até {savingsPercent}%</span>
                </div>

                <div className="mt-6">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Economia Estimada por Mês
                  </p>
                  <p className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-white">
                    {formatCurrency(monthlySavings)}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-white/5 p-3.5 border border-white/10">
                  <p className="text-xs text-slate-300">Economia Anual Projetada</p>
                  <p className="mt-1 text-2xl font-black text-rotta-cyan">{formatCurrency(annualSavings)}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Volume total estimado: {totalPages.toLocaleString('pt-BR')} páginas/mês
                  </p>
                </div>

                <a
                  href={customWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan via-rotta-blue-light to-rotta-blue py-3.5 text-sm sm:text-base font-bold text-rotta-darkest shadow-glow transition-all hover:brightness-110 hover:shadow-glow-lg"
                >
                  <Sparkles size={18} />
                  <span>Solicitar Esta Proposta</span>
                  <ArrowRight size={16} />
                </a>

                <p className="mt-3 text-[11px] text-slate-400">
                  Valores estimativos baseados na média de custos com cartuchos avulsos e depreciação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
