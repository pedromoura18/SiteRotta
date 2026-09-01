import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  GraduationCap,
  HeartPulse,
  MonitorSmartphone,
  Printer,
  Sparkles,
  Star,
  Store,
  Truck,
  UtensilsCrossed,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { BrandMark } from './components/BrandMark'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { cases, differentiators, metrics, partnerBrands, process, segments, services, testimonials } from './data/site'

const heroSlides = [
  {
    image:
      "linear-gradient(125deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.7) 35%, rgba(15,23,42,0.44) 100%), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')",
  },
  {
    image:
      "linear-gradient(125deg, rgba(15,23,42,0.76) 0%, rgba(15,23,42,0.68) 35%, rgba(15,23,42,0.42) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
  },
  {
    image:
      "linear-gradient(125deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.72) 35%, rgba(15,23,42,0.5) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')",
  },
]

function App() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="hero-banner relative overflow-hidden">
          <div className="hero-carousel-shell">
            {heroSlides.map((slide, index) => (
              <div
                key={`${slide.image}-${index}`}
                className="hero-slide"
                style={{
                  backgroundImage: slide.image,
                  opacity: index === activeSlide ? 1 : 0,
                  transform: index === activeSlide ? 'scale(1.02)' : 'scale(1.08)',
                }}
              />
            ))}
          </div>

          <div className="hero-overlay" />
          <div className="container-shell relative z-10 pt-4 pb-6 lg:pt-5 lg:pb-7">
            <div className="flex min-h-[250px] items-center lg:min-h-[280px]">
              <div className="max-w-3xl animate-fade-in-up text-white">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-100 backdrop-blur-sm">
                  <Sparkles size={14} />
                  Automação Comercial | Outsourcing | Manutenção Técnica
                </div>

                <h1 className="max-w-2xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl xl:text-[4.7rem]">
                  Tudo o que sua empresa precisa em um só lugar.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                  Impressoras, PDVs, leitores de código de barras, servidores, computadores, redes e muito mais. Soluções com marcas líderes, garantia, assistência local e suporte especializado.
                </p>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  Há mais de 19 anos no mercado, entregamos automação comercial, outsourcing de impressão, manutenção técnica, infraestrutura de TI, cloud e consultoria estratégica para empresas que querem crescimento com eficiência e segurança.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#cases"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-[0_20px_50px_rgba(14,165,233,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(14,165,233,0.45)]"
                  >
                    Nossos Produtos
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="#solucoes"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:bg-white/10"
                  >
                    Nossas Soluções
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-black text-white">{metric.value}</p>
                      <p className="mt-1 text-sm text-slate-300">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-20">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-soft animate-fade-in-up">
              <div className="flex items-center gap-3 text-blue-700">
                <Cpu size={28} />
                <p className="text-sm font-bold uppercase tracking-[0.2em]">Transformação digital</p>
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Leve a transformação digital para dentro da sua empresa!
              </h2>
            </div>

            <div className="space-y-6 animate-fade-in-up">
              <p className="text-lg text-slate-600">
                Controle e automatize seus processos empresariais e conquiste a autonomia tecnológica para o agora e para o futuro. Nossa proposta vai além do suporte: é parceria estratégica para o crescimento do seu negócio.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-600" size={20} />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solucoes" className="bg-slate-900 py-20 text-white">
          <div className="container-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Nossos serviços</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Conheça nossas soluções.
              </h2>
              <p className="mt-4 text-slate-300">Novos tempos precisam de uma gestão moderna, dinâmica e integrada.</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map((service, index) => {
                const icon = [Printer, Store, MonitorSmartphone, Building2, Database, Cpu][index]
                const Icon = icon

                return (
                  <div key={service.title} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-200 transition group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-slate-300">{service.text}</p>
                    <a href="https://api.whatsapp.com/send?phone=554688037656" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      Fale com o vendedor <ArrowRight size={16} />
                    </a>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <a href="#contato" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Veja todas as soluções <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="processo" className="py-20">
          <div className="container-shell">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Processo</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Um caminho claro, técnico e focado em resultados.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {process.map((step, index) => (
                <div key={step} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-lg font-black text-blue-700">
                    {index + 1}
                  </div>
                  <p className="text-base font-medium leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="bg-cyan-50 py-20">
          <div className="container-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Produtos</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Soluções para cada etapa da operação.
                </h2>
              </div>
              <a href="#contato" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Falar com a equipe <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {cases.map((item) => {
                const productIcons = {
                  store: Store,
                  printer: Printer,
                  server: Database,
                } as const

                const Icon = productIcons[item.icon as keyof typeof productIcons] ?? Cpu

                return (
                  <article key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-56 overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-cyan-700 shadow-md backdrop-blur-sm">
                        <Icon size={22} />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">{item.label}</p>
                      <h3 className="mt-3 text-2xl font-black text-slate-900">{item.title}</h3>
                      <p className="mt-4 text-lg font-semibold text-emerald-600">{item.value}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Segmentos atendidos</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Soluções para cada segmento.
                </h2>
                <p className="mt-4 text-lg text-slate-600">Do varejo à indústria, entregamos tecnologia sob medida para o seu setor.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {segments.map((segment) => {
                  const iconMap = {
                    store: Store,
                    restaurant: UtensilsCrossed,
                    factory: Factory,
                    truck: Truck,
                    health: HeartPulse,
                    school: GraduationCap,
                  } as const

                  const Icon = iconMap[segment.icon as keyof typeof iconMap] ?? BriefcaseBusiness

                  return (
                    <div key={segment.title} className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700 transition group-hover:scale-105">
                        <Icon size={22} />
                      </div>
                      <p className="text-lg font-black text-slate-800">{segment.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{segment.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-8">
          <div className="container-shell">
            <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8">
              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Parceiros</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Marcas que confiam na Rotta</h2>
                </div>

                <div className="flex items-center gap-3 self-start rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 md:self-auto">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 p-1.5 shadow-sm">
                    <BrandMark className="h-full w-full" />
                  </div>
                </div>
              </div>

              <div className="brand-marquee">
                <div className="brand-track">
                  {[...partnerBrands, ...partnerBrands].map((brand, index) => (
                    <div key={`${brand.name}-${index}`} className={`brand-item ${brand.ring}`}>
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="brand-logo" />
                      ) : (
                        <span className={`brand-icon bg-gradient-to-br ${brand.accent} ${brand.text}`}>
                          {brand.mark}
                        </span>
                      )}
                      <span className="brand-name">{brand.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="container-shell">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Depoimentos</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Confiança que se traduz em resultado.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${item.name}-${index}`} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg leading-relaxed text-slate-700">“{item.quote}”</p>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="pb-20 pt-12">
          <div className="container-shell">
            <div className="rounded-[2rem] bg-slate-900 px-6 py-12 text-white shadow-soft sm:px-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Vamos conversar</p>
                  <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                    Sua empresa precisa de tecnologia mais eficiente e segura.
                  </h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://api.whatsapp.com/send?phone=554688037656"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    Solicitar orçamento
                  </a>
                  <a
                    href="tel:554688037656"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    (46) 98803-7656
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
