import {
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  GraduationCap,
  Headset,
  HeartPulse,
  Network,
  Printer,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'
import { BrandPattern } from './components/BrandPattern'
import { ContactForm } from './components/ContactForm'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { partnerBrandList } from './components/PartnerLogos'
import { ProductCatalog } from './components/ProductCatalog'
import { RoiCalculator } from './components/RoiCalculator'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import {
  companyInfo,
  differentiators,
  metrics,
  pillars,
  segments,
  services,
  testimonials,
} from './data/site'

function App() {
  return (
    <div id="inicio" className="min-h-screen bg-rotta-navy text-slate-100 selection:bg-rotta-cyan selection:text-rotta-darkest">
      {/* Header Fixo com Glassmorphism */}
      <Header />

      <main>
        {/* =========================================
            1. HERO SECTION DE ALTO IMPACTO
           ========================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rotta-dark via-rotta-navy to-rotta-darkest py-16 sm:py-24 lg:py-28">
          {/* Fundo Geométrico Rotta Brand Pattern */}
          <BrandPattern className="absolute inset-0 w-full h-full object-cover" opacity={0.08} />

          {/* Glows de Fundo */}
          <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-rotta-cyan/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-rotta-blue/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="container-shell relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Coluna Texto Principal */}
              <div className="lg:col-span-7 space-y-6">
                {/* Badge Slogan */}
                <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rotta-cyan backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-rotta-cyan animate-ping" />
                  <span>Solução • Inovação • Compromisso</span>
                </div>

                {/* Título Principal */}
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                  Tecnologia Inteligente e <span className="text-gradient-cyan">Infraestrutura Completa</span> para sua Empresa.
                </h1>

                {/* Subtítulo */}
                <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
                  Há mais de 19 anos entregando <strong>Outsourcing de Impressão</strong>, <strong>Automação Comercial</strong> e <strong>Infraestrutura de TI</strong> de alta performance. Reduza custos, aumente a produtividade e conte com suporte presencial ágil em Francisco Beltrão e em todo o Sudoeste do PR.
                </p>

                {/* Botões de Ação */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <Sparkles size={18} />
                    <span>Solicitar Orçamento Grátis</span>
                    <ArrowRight size={18} />
                  </a>

                  <a
                    href="#calculadora"
                    className="btn-secondary"
                  >
                    <span>Simular Economia de Impressão</span>
                  </a>
                </div>

                {/* Selos de Confiança */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-rotta-cyan" />
                    <span>Equipamentos Homologados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headset size={18} className="text-rotta-cyan" />
                    <span>Suporte Técnico Local e Ágil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-rotta-cyan" />
                    <span>Garantia e Backup Swap</span>
                  </div>
                </div>
              </div>

              {/* Coluna Visual: Card de Demonstração & Destaque dos Pilares */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Moldura Glow */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rotta-cyan via-rotta-blue to-purple-600 opacity-30 blur-xl animate-pulse-slow" />

                  <div className="relative rounded-3xl border border-white/20 bg-rotta-darkest/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
                    {/* Header do Card */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rotta-cyan/20 text-rotta-cyan">
                          <Zap size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400">Rotta Tecnologia</p>
                          <p className="text-sm font-bold text-white">Central de Soluções B2B</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                        Atendimento Ativo
                      </span>
                    </div>

                    {/* Destaques Rápidos */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10 hover:border-rotta-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <Printer size={18} className="text-rotta-cyan shrink-0" />
                          <span className="text-xs font-semibold text-white">Outsourcing de Impressão</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">Até -40% custos</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10 hover:border-rotta-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <Store size={18} className="text-rotta-blue-light shrink-0" />
                          <span className="text-xs font-semibold text-white">Automação Comercial & PDV</span>
                        </div>
                        <span className="text-xs font-bold text-rotta-cyan">SAT / NFC-e / 2D</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10 hover:border-rotta-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <Network size={18} className="text-purple-300 shrink-0" />
                          <span className="text-xs font-semibold text-white">Redes, Servidores & CFTV</span>
                        </div>
                        <span className="text-xs font-bold text-purple-300">Alta Disponibilidade</span>
                      </div>
                    </div>

                    {/* Card de Chamada Direta com Douglas Rotta */}
                    <div className="rounded-2xl bg-gradient-to-r from-rotta-navy to-rotta-blue/40 p-4 border border-rotta-cyan/30">
                      <p className="text-xs text-slate-300">Precisa de suporte ou orçamento agora?</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">Douglas Rotta</p>
                          <p className="text-xs text-rotta-cyan font-semibold">(46) 98803-7656</p>
                        </div>
                        <a
                          href={companyInfo.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-rotta-cyan px-3.5 py-2 text-xs font-bold text-rotta-darkest hover:bg-rotta-cyan-light transition-all shadow-glow"
                        >
                          Chamar no WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Faixa de Métricas e Números */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-white/10">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md text-center hover:border-rotta-cyan/40 hover:bg-white/[0.06] transition-all"
                >
                  <p className="text-3xl sm:text-4xl font-black text-white text-gradient-cyan">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-300">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            2. OS 3 GRANDES PILARES DA ROTTA
           ========================================= */}
        <section id="pilares" className="relative py-24 bg-rotta-navy overflow-hidden">
          <div className="container-shell relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
                <Cpu size={14} />
                <span>Nossa Estratégia de Atuação</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Os 3 Pilares da <span className="text-gradient-cyan">Rotta Tecnologia</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                Uma estrutura completa desenhada para suprir todas as necessidades tecnológicas da sua empresa em um único parceiro de confiança.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pillars.map((pillar, idx) => {
                const icons = [Printer, Store, Network]
                const Icon = icons[idx]

                return (
                  <div
                    key={pillar.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-rotta-cyan/50 hover:bg-white/[0.08] hover:shadow-card-hover"
                  >
                    {/* Badge de Destaque */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rotta-cyan/20 to-rotta-blue/30 text-rotta-cyan group-hover:scale-110 transition-transform shadow-inner">
                        <Icon size={28} />
                      </div>
                      <span className="rounded-full bg-rotta-cyan/15 px-3 py-1 text-xs font-bold text-rotta-cyan border border-rotta-cyan/30">
                        {pillar.highlight}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-rotta-cyan transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {pillar.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {pillar.description}
                      </p>

                      <div className="mt-6 space-y-2.5 border-t border-white/10 pt-4">
                        {pillar.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 size={16} className="text-rotta-cyan shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/10">
                      <a
                        href={companyInfo.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan/20 to-rotta-blue/20 border border-rotta-cyan/40 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:from-rotta-cyan hover:to-rotta-blue hover:text-rotta-darkest hover:border-transparent hover:shadow-glow active:scale-[0.99]"
                      >
                        <span>Solicitar Proposta</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            3. CALCULADORA DE ROI & OUTSOURCING
           ========================================= */}
        <RoiCalculator />

        {/* =========================================
            4. CATÁLOGO DE HARDWARES & PRODUTOS
           ========================================= */}
        <ProductCatalog />

        {/* =========================================
            5. SERVIÇOS & SOLUÇÕES INTEGRADAS
           ========================================= */}
        <section id="solucoes" className="relative py-24 bg-rotta-navy overflow-hidden">
          <div className="container-shell relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
                <Sparkles size={14} />
                <span>Portfólio Completo</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Soluções para Todas as Etapas da sua <span className="text-gradient-cyan">Operação</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                Conte com especialistas certificados para planejar, instalar, configurar e manter toda a sua tecnologia funcionando sem paradas.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const iconMap: Record<string, React.ElementType> = {
                  printer: Printer,
                  store: Store,
                  cpu: Cpu,
                  network: Network,
                  database: Database,
                  shield: Shield,
                }
                const Icon = iconMap[service.iconName] || Cpu

                return (
                  <div
                    key={service.id}
                    className="group rounded-2xl border border-white/15 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-rotta-cyan/40 hover:bg-white/[0.06] hover:shadow-card-hover"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rotta-cyan/20 text-rotta-cyan group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>

                    <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-rotta-cyan">
                      {service.category}
                    </span>

                    <h3 className="mt-1 text-xl font-bold text-white group-hover:text-rotta-cyan transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {service.text}
                    </p>

                    <a
                      href={companyInfo.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rotta-cyan hover:text-white transition-colors"
                    >
                      <span>Falar com especialista</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            6. POR QUE A ROTTA? (DIFERENCIAIS)
           ========================================= */}
        <section id="diferenciais" className="relative py-24 bg-slate-900 overflow-hidden">
          <div className="container-shell relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Coluna Esquerda */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
                  <Award size={14} />
                  <span>Nossos Diferenciais</span>
                </div>

                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                  Por que centenas de empresas confiam na <span className="text-gradient-cyan">Rotta</span>?
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                  Não entregamos apenas equipamentos: assumimos a responsabilidade técnica contínua para que você foque 100% no crescimento do seu negócio.
                </p>

                <div className="pt-2">
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <span>Agendar Diagnóstico Gratuito</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              {/* Coluna Direita: Grid de Diferenciais */}
              <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                {differentiators.map((diff) => (
                  <div
                    key={diff.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all hover:border-rotta-cyan/40 hover:bg-white/[0.07]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rotta-cyan/20 text-rotta-cyan mb-3">
                      <CheckCircle2 size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">{diff.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                      {diff.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            7. CARROSSEL DE MARCAS PARCEIRAS HOMOLOGADAS
           ========================================= */}
        <section className="py-16 bg-rotta-darkest border-y border-white/10">
          <div className="container-shell">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rotta-cyan">
                Marcas Líderes Homologadas
              </p>
              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Tecnologia com o respaldo dos maiores fabricantes mundiais
              </h3>
            </div>

            <div className="brand-marquee">
              <div className="brand-track">
                {[...partnerBrandList, ...partnerBrandList].map((brand, idx) => {
                  const LogoComponent = brand.Component
                  return (
                    <div
                      key={`${brand.id}-${idx}`}
                      className="brand-item group flex items-center justify-center px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-rotta-cyan/50 hover:bg-white/[0.08]"
                    >
                      <div className="text-slate-300 transition-colors duration-300 group-hover:text-rotta-cyan">
                        <LogoComponent className="h-7 sm:h-8 max-w-[130px] w-auto" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            8. SEGMENTOS ATENDIDOS
           ========================================= */}
        <section className="py-24 bg-rotta-navy">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rotta-cyan">
                Setores Atendidos
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Soluções Sob Medida para o seu Setor
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Entendemos as particularidades fiscais, operacionais e de demanda de cada segmento de negócio.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {segments.map((seg) => {
                const iconMap: Record<string, React.ElementType> = {
                  store: Store,
                  restaurant: UtensilsCrossed,
                  factory: Factory,
                  health: HeartPulse,
                  truck: Truck,
                  school: GraduationCap,
                }
                const Icon = iconMap[seg.icon] || Store

                return (
                  <div
                    key={seg.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-rotta-cyan/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rotta-cyan/20 to-rotta-blue/20 text-rotta-cyan mb-4 group-hover:scale-105 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{seg.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                      {seg.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            9. DEPOIMENTOS & PROVA SOCIAL
           ========================================= */}
        <section className="py-24 bg-rotta-darkest relative overflow-hidden">
          <div className="container-shell relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rotta-cyan">
                Prova Social
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Quem Confia na Rotta Tecnologia
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.03] p-8 backdrop-blur-md shadow-lg"
                >
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-slate-200 italic">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-rotta-cyan font-semibold">{item.role}</p>
                    <p className="text-[11px] text-slate-400">{item.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            10. FAQ SECTION INTERATIVO
           ========================================= */}
        <FaqSection />

        {/* =========================================
            11. FORMULÁRIO DE CONTATO & ORÇAMENTO
           ========================================= */}
        <ContactForm />
      </main>

      {/* Footer Completo */}
      <Footer />

      {/* Botão Flutuante de WhatsApp */}
      <WhatsAppFloat />
    </div>
  )
}

export default App
