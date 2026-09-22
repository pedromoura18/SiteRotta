import { useCallback, useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Headset,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  Printer,
  RefreshCw,
  Scissors,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { PartnerLogos } from './PartnerLogos'
import { RoiCalculator } from './RoiCalculator'
import { useSiteData } from '../context/SiteContext'
import type { NavPage } from './Header'
import type { ProductCategory } from '../data/site'

interface HomePageProps {
  onNavigate: (page: NavPage) => void
  onSelectProduct: (productId: string) => void
}

export function HomePage({ onNavigate, onSelectProduct }: HomePageProps) {
  const { companyInfo, metrics, productsData } = useSiteData()
  // Aba de produtos em destaque na Home
  const [homeProductCategory, setHomeProductCategory] = useState<ProductCategory>('impressoras')

  // Produtos filtrados na home (limitado a 4 em destaque)
  const featuredProducts = productsData
    .filter((p) => {
      if (homeProductCategory === 'impressoras') return p.category === 'impressoras'
      if (homeProductCategory === 'scanners') return p.category === 'scanners'
      if (homeProductCategory === 'etiquetas') return p.category === 'etiquetas' || p.category === 'rotuladores'
      if (homeProductCategory === 'scanncut') return p.category === 'scanncut'
      if (homeProductCategory === 'perifericos') return p.category === 'perifericos' || p.category === 'automacao'
      return true
    })
    .slice(0, 4)

  // ── Hero Slideshow data ──────────────────────────────────────────────────
  const heroSlides = [
    {
      id: 0,
      img: '/hero_impressoras.jpg',
      badge: 'Impressoras Corporativas',
      title: 'Impressão de alto volume com total controle de custos',
      subtitle:
        'Brother, HP e Epson multifuncionais para ambientes corporativos exigentes. Toners, peças e máquina reserva inclusos no contrato.',
      cta: { label: 'Solicitar Orçamento', href: companyInfo.whatsappUrl, external: true },
      cta2: { label: 'Ver Catálogo', page: 'produtos' as NavPage },
    },
    {
      id: 1,
      img: '/hero_outsourcing.jpg',
      badge: 'Outsourcing de Impressão',
      title: 'Terceirize sua impressão e reduza até 40% dos custos',
      subtitle:
        'Contrato completo: equipamento, suporte on-site, manutenção preventiva e reposição imediata. Sua empresa foca no que importa.',
      cta: { label: 'Conhecer o Serviço', href: companyInfo.whatsappUrl, external: true },
      cta2: { label: 'Sobre a Rotta', page: 'sobre' as NavPage },
    },
    {
      id: 2,
      img: '/hero_automacao.jpg',
      badge: 'Automação Comercial',
      title: 'PDV, SAT Fiscal e NFC-e para o seu negócio',
      subtitle:
        'Terminais de ponto de venda, leitores de código de barras e impressoras fiscais integradas. Soluções homologadas e com suporte local.',
      cta: { label: 'Falar com Especialista', href: companyInfo.whatsappUrl, external: true },
      cta2: { label: 'Ver Produtos', page: 'produtos' as NavPage },
    },
    {
      id: 3,
      img: '/hero_assistencia.jpg',
      badge: 'Assistência Técnica Especializada',
      title: 'Laboratório próprio com técnicos certificados',
      subtitle:
        'Manutenção corretiva e preventiva presencial ou remota. Peças originais, agilidade no atendimento e garantia de serviço.',
      cta: { label: 'Agendar Visita Técnica', href: companyInfo.whatsappUrl, external: true },
      cta2: { label: 'Nossos Serviços', page: 'servicos' as NavPage },
    },
    {
      id: 4,
      img: '/hero_etiquetas.jpg',
      badge: 'Etiquetas & Scanners Industriais',
      title: 'Impressoras de etiquetas Zebra, Brother e Elgin',
      subtitle:
        'Soluções completas de rastreamento e identificação: impressoras térmicas, scanners corporativos e rotuladores eletrônicos P-touch.',
      cta: { label: 'Solicitar Orçamento', href: companyInfo.whatsappUrl, external: true },
      cta2: { label: 'Ver Etiquetadoras', page: 'produtos' as NavPage },
    },
  ]

  const [activeSlide, setActiveSlide] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const goToSlide = useCallback((idx: number) => {
    setActiveSlide(idx)
    setAnimKey((k) => k + 1)
  }, [])

  const prevSlide = useCallback(() => {
    goToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [activeSlide, goToSlide, heroSlides.length])

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % heroSlides.length)
  }, [activeSlide, goToSlide, heroSlides.length])

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length)
      setAnimKey((k) => k + 1)
    }, 15000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const slide = heroSlides[activeSlide]

  return (
    <div className="animate-fadeIn">
      {/* =========================================
          1. HERO FULLSCREEN SLIDESHOW
         ========================================= */}
      <section className="relative w-full overflow-hidden" style={{ height: 'min(90vh, 720px)', minHeight: '520px' }}>
        {/* Background images stack – only active one is visible */}
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={s.img}
              alt={s.badge}
              className={`hero-bg-img w-full h-full object-cover object-center ${
                i === activeSlide ? 'hero-slide-active' : ''
              }`}
              key={i === activeSlide ? `img-${animKey}` : `img-${i}`}
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-rotta-darkest/90 via-rotta-navy/70 to-transparent" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-rotta-darkest/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-30 flex h-full items-center">
          <div className="container-shell">
            <div className="max-w-2xl xl:max-w-3xl space-y-5 py-12">
              {/* Badge */}
              <div
                key={`badge-${animKey}`}
                className="hero-text-animate inline-flex items-center gap-2 rounded-full border border-rotta-cyan/40 bg-rotta-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-rotta-cyan animate-pulse" />
                {slide.badge}
              </div>

              {/* Title */}
              <h1
                key={`title-${animKey}`}
                className="hero-text-animate-2 text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                key={`sub-${animKey}`}
                className="hero-text-animate-3 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300 max-w-xl"
              >
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div key={`cta-${animKey}`} className="hero-text-animate-3 flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={slide.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan to-rotta-blue px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-rotta-blue/40"
                >
                  <MessageCircle size={18} />
                  <span>{slide.cta.label}</span>
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate(slide.cta2.page)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
                >
                  <Layers size={17} />
                  {slide.cta2.label}
                </button>
              </div>

              {/* Trust badges */}
              <div key={`trust-${animKey}`} className="hero-text-animate-3 hidden sm:flex flex-wrap items-center gap-5 pt-1">
                {[
                  { icon: ShieldCheck, label: 'Equipamentos Homologados' },
                  { icon: Award,       label: 'Máquina Reserva (Swap)' },
                  { icon: Headset,     label: 'Suporte On-Site Ágil' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Icon size={15} className="text-rotta-cyan" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation arrows ── */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Próximo slide"
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 sm:right-6"
        >
          <ChevronRight size={22} />
        </button>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === activeSlide
                  ? 'w-8 h-2.5 bg-rotta-cyan'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 z-40 h-0.5 w-full bg-white/10">
          <div
            key={`progress-${animKey}`}
            className="h-full bg-rotta-cyan"
            style={{ animation: 'heroProgress 15s linear forwards' }}
          />
        </div>
      </section>

      {/* =========================================
          2. NÚMEROS & MÉTRICAS COMPROVADAS
         ========================================= */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="container-shell">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="text-center p-4 rounded-2xl bg-slate-50/60 border border-slate-100"
              >
                <span className="text-3xl sm:text-4xl font-black text-rotta-blue">
                  {m.value}
                </span>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-slate-700">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. VITRINE DE PRODUTOS NA HOME (CATEGORIZADA)
         ========================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="container-shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
                <Package size={14} />
                Equipamentos em Destaque
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Produtos Homologados para sua Empresa
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Selecione uma categoria abaixo para conferir modelos Brother, Epson, Dell e Zebra disponíveis para locação e venda.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('produtos')}
              className="inline-flex items-center gap-2 rounded-xl bg-rotta-blue px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-rotta-blue-dark transition-colors"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Abas Rápidas da Home */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setHomeProductCategory('impressoras')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                homeProductCategory === 'impressoras'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Printer size={16} />
              <span>Impressoras & Multifuncionais</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeProductCategory('scanners')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                homeProductCategory === 'scanners'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Package size={16} />
              <span>Scanners Corporativos</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeProductCategory('etiquetas')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                homeProductCategory === 'etiquetas'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Tag size={16} />
              <span>Rotuladores & Etiquetas</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeProductCategory('scanncut')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                homeProductCategory === 'scanncut'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Scissors size={16} />
              <span>ScanNCut (Corte)</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeProductCategory('perifericos')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                homeProductCategory === 'perifericos'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Cpu size={16} />
              <span>Periféricos & Automação</span>
            </button>
          </div>

          {/* Cards dos Produtos da Home */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:-translate-y-1 hover:border-rotta-blue hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    loading="lazy"
                    className="h-full w-full object-cover sm:object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-rotta-blue px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-2xs">
                    {prod.brand}
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    {prod.images.length} fotos
                  </span>
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      {prod.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-rotta-blue transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rotta-blue">
                    <span>Ver fotos e detalhes</span>
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          4. O QUE ESTÁ INCLUSO NA LOCAÇÃO ROTTA
         ========================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container-shell">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rotta-blue">
              Tranquilidade Total
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              O que está incluso na Locação de Equipamentos?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Ao contratar o Outsourcing da Rotta Tecnologia, você não se preocupa com toners, peças ou equipamentos parados.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-rotta-blue">
                <MapPin size={26} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Suporte no Local</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Atendimento presencial rápido no endereço da sua empresa em Francisco Beltrão e região.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-rotta-blue">
                <RefreshCw size={26} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Máquina de Back-up (Swap)</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Se for necessário reparo em laboratório, substituímos por outra máquina reserva imediatamente.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-rotta-blue">
                <Package size={26} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Suprimentos e Peças</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Toners originais, peças e manutenção preventiva 100% inclusos na sua mensalidade.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-rotta-blue">
                <CalendarCheck size={26} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Revisões Preventivas</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Limpezas periódicas e inspeções técnicas para manter a qualidade contínua de impressão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. PARCEIROS E FABRICANTES HOMOLOGADOS
         ========================================= */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="container-shell text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Marcas Parceiras & Distribuidores
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Trabalhamos com os Melhores Fabricantes do Mundo
          </h2>
        </div>
        <PartnerLogos />
      </section>

      {/* =========================================
          6. SIMULADOR INTERATIVO DE ECONOMIA (ROI)
         ========================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <RoiCalculator />
      </section>

      {/* =========================================
          7. BANNER CTA FINAL
         ========================================= */}
      <section className="py-16 bg-gradient-to-r from-rotta-navy via-rotta-blue-dark to-rotta-blue text-white">
        <div className="container-shell text-center max-w-3xl space-y-6">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            Atendimento Personalizado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Controle e automatize seus processos empresariais.
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Fale diretamente com nossa equipe técnica e descubra como reduzir custos e modernizar sua infraestrutura de TI.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-rotta-navy shadow-md hover:bg-slate-100 transition-all"
            >
              <MessageCircle size={18} className="text-emerald-600" />
              <span>Falar no WhatsApp com a Rotta</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('contato')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-white/20 transition-all"
            >
              <span>Ver Dados de Contato e Mapa</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
