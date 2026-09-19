import {
  CheckCircle2,
  Headset,
  Layers,
  MessageCircle,
  PhoneCall,
  Printer,
  Store,
  Wrench,
} from 'lucide-react'
import { useSiteData } from '../context/SiteContext'

interface ServicesPageProps {
  onNavigateToProducts: () => void
}

export function ServicesPage({ onNavigateToProducts }: ServicesPageProps) {
  const { companyInfo, rentalInclusions, services } = useSiteData()
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'headset':
        return <Headset size={28} />
      case 'store':
        return <Store size={28} />
      case 'printer':
        return <Printer size={28} />
      case 'wrench':
      default:
        return <Wrench size={28} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16 animate-fadeIn">
      <div className="container-shell">
        {/* ─── Cabeçalho da Página ─── */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
            <Wrench size={14} />
            Nossos Serviços Oficiais
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Soluções Completas de <span className="text-gradient-brand">Tecnologia & Gestão</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Contamos com as melhores soluções do mercado para transformar sua empresa: suporte técnico contínuo, automação de frentes de caixa, outsourcing de impressão e assistência técnica especializada.
          </p>
        </div>

        {/* ─── Os 4 Pilares de Serviços (Completos e Detalhados) ─── */}
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all hover:border-rotta-blue/50 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-rotta-blue">
                      {getServiceIcon(srv.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {srv.subtitle}
                      </span>
                      <h2 className="text-2xl font-black text-slate-900">
                        {srv.title}
                      </h2>
                    </div>
                  </div>
                  <span className="hidden sm:inline rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-rotta-blue border border-blue-100">
                    {srv.highlight}
                  </span>
                </div>

                <p className="mt-6 text-base leading-relaxed text-slate-700">
                  {srv.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    O que está incluído:
                  </h3>
                  <ul className="space-y-2.5">
                    {srv.details.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 size={18} className="text-rotta-blue shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20o%20servi%C3%A7o%20de%20*${encodeURIComponent(srv.title)}*.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Cotar {srv.title}</span>
                </a>

                <a
                  href="tel:5546988037656"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rotta-blue"
                >
                  <PhoneCall size={14} />
                  <span>(46) 9 8803-7656</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ─── O Que Está Incluso na Locação ─── */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rotta-blue">
              Benefícios do Outsourcing
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              O que está incluso na Locação de Produtos?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Tenha equipamentos modernos e suporte contínuo sem imobilizar capital da sua empresa.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentalInclusions.map((inc) => (
              <div
                key={inc.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 space-y-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-rotta-blue">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{inc.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{inc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Diferenciais da Rotta Tecnologia ─── */}
        <div className="mt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              // Nossos Diferenciais
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Atendimento com agilidade comprovada para empresas que não podem tolerar paradas operacionais.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Interatividade full time (suporte 24h)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Instalação no mesmo dia</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Assistência on-site (atendimento no local)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Últimos lançamentos do mercado</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Soluções customizadas para seu negócio</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Contratos facilitados e sem burocracia</span>
            </div>
          </div>
        </div>

        {/* ─── Botão de Navegação para Produtos ─── */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={onNavigateToProducts}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-rotta-navy px-8 py-4 text-base font-bold text-white shadow-md hover:bg-rotta-blue transition-colors"
          >
            <Layers size={20} />
            <span>Conferir Equipamentos Disponíveis no Catálogo</span>
          </button>
        </div>
      </div>
    </div>
  )
}
