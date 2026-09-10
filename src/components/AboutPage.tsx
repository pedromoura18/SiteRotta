import {
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
} from 'lucide-react'
import { aboutData, companyInfo, metrics } from '../data/site'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16 animate-fadeIn">
      <div className="container-shell">
        {/* ─── Topo / Header da Página ─── */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
            <Building2 size={14} />
            Institucional
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Sobre a <span className="text-gradient-brand">Rotta Tecnologia</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Desde 2016 apoiando empresas no Sudoeste do Paraná com soluções customizadas em locação de equipamentos, automação e infraestrutura de TI.
          </p>
        </div>

        {/* ─── Bloco Principal: História & Propósito ─── */}
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles size={22} className="text-rotta-blue" />
                <span>Nossa História</span>
              </h2>

              <p className="text-base leading-relaxed text-slate-700">
                A <strong>Rotta Tecnologia</strong> foi fundada em 2016, com foco voltado para o ramo de locação de equipamentos de impressão e TI, onde possuímos uma gama completa de hardwares e serviços alinhados para apoiar o cliente em seus negócios.
              </p>

              <p className="text-base leading-relaxed text-slate-700">
                Cada negócio tem suas particularidades e para isso fazemos uma análise técnica profunda onde mensuramos seu projeto — seja ele de impressão corporativa, cópia, digitalização ou automação do ponto de venda — garantindo equipamentos adequados para a sua necessidade diária de forma simples e única.
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-2xl font-black text-rotta-blue">2016</span>
                  <p className="text-xs font-bold text-slate-600 mt-1">Ano de Fundação</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-2xl font-black text-rotta-blue">Francisco Beltrão</span>
                  <p className="text-xs font-bold text-slate-600 mt-1">Sede Própria no PR</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Card Missão */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-2">
              <div className="flex items-center gap-3 text-rotta-blue">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <Compass size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Missão</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {aboutData.mission}
              </p>
            </div>

            {/* Card Visão */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-2">
              <div className="flex items-center gap-3 text-rotta-blue">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <Eye size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Visão</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {aboutData.vision}
              </p>
            </div>

            {/* Card Valores */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-3 text-rotta-blue">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <HeartHandshake size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Valores</h3>
              </div>
              <ul className="space-y-2 pt-1">
                {aboutData.values.map((val) => (
                  <li key={val} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 size={16} className="text-rotta-blue shrink-0" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Números Oficiais ─── */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rotta-blue">
              Resultados Sólidos
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              Nossa Trajetória em Números
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl sm:text-4xl font-black text-rotta-blue">
                  {m.value}
                </span>
                <p className="mt-2 text-xs sm:text-sm font-bold text-slate-700">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Por que Escolher a Rotta ─── */}
        <div className="mt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Por que Confiar na Rotta Tecnologia?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Pilares que garantem a continuidade e a tranquilidade da sua operação diária.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-rotta-blue flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Presença Regional Próxima</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Técnicos próprios com base em Francisco Beltrão atendendo presencialmente toda a região sem intermediários ou longas esperas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-rotta-blue flex items-center justify-center">
                <Shield size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Máquina Reserva Swap</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Se uma impressora ou computador apresentar falha, realizamos a substituição no mesmo dia para evitar paradas na sua empresa.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-rotta-blue flex items-center justify-center">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Soluções Sob Medida</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Dimensionamos a quantidade exata de equipamentos para sua demanda, gerando economia real e sem desperdícios.
              </p>
            </div>
          </div>
        </div>

        {/* ─── CTA de Contato ─── */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-rotta-navy to-rotta-blue p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-black">
            Vamos conversar sobre a infraestrutura da sua empresa?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            Agende uma conversa técnica sem custo com Douglas Rotta e conheça as melhores opções em locação e tecnologia.
          </p>
          <div className="mt-6">
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-rotta-navy shadow-md hover:bg-slate-100 transition-all"
            >
              <MessageCircle size={18} className="text-emerald-600" />
              <span>Falar no WhatsApp com o Douglas</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
