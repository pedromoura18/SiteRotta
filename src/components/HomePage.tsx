import { useState } from 'react'
import {
  ArrowRight,
  Award,
  CalendarCheck,
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
  Store,
  Tag,
  Wrench,
  Zap,
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

  return (
    <div className="animate-fadeIn">
      {/* =========================================
          1. HERO SECTION CLARA, MODERNA & ELEGANTE
         ========================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-white py-14 sm:py-20 lg:py-24 border-b border-slate-200/80">
        {/* Elementos sutis de fundo */}
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />

        <div className="container-shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Coluna Texto Principal */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Slogan Oficial */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rotta-blue">
                <span className="flex h-2 w-2 rounded-full bg-rotta-blue animate-pulse" />
                <span>Solução • Inovação • Compromisso</span>
              </div>

              {/* Título Principal de Alto Impacto */}
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Tecnologia Inteligente e <span className="text-gradient-brand">Infraestrutura Completa</span> para sua Empresa.
              </h1>

              {/* Subtítulo */}
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
                Fundada em 2016 em Francisco Beltrão - PR, entregamos soluções corporativas em <strong>Outsourcing de Impressão</strong>, <strong>Automação Comercial</strong> e <strong>Assistência Técnica</strong> com reposição imediata de peças, toners e máquina reserva inclusos.
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-rotta-blue to-rotta-blue-dark px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  <span>Solicitar Orçamento Grátis</span>
                  <ArrowRight size={17} />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('produtos')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-rotta-blue hover:text-rotta-blue hover:-translate-y-0.5"
                >
                  <Layers size={17} />
                  <span>Ver Catálogo de Produtos</span>
                </button>
              </div>

              {/* Selos de Confiança */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-rotta-blue" />
                  <span>Equipamentos Homologados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headset size={18} className="text-rotta-blue" />
                  <span>Suporte On-Site e Ágil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-rotta-blue" />
                  <span>Máquina Reserva (Swap)</span>
                </div>
              </div>
            </div>

            {/* Coluna Visual: Card de Demonstração & Destaques */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
                  {/* Topo do Card */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-rotta-blue">
                        <Zap size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400">Rotta Tecnologia</p>
                        <p className="text-sm font-extrabold text-slate-900">Soluções Corporativas B2B</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      Atendimento Ativo
                    </span>
                  </div>

                  {/* Lista de Recursos Rápidos */}
                  <div className="space-y-3">
                    <div
                      onClick={() => onNavigate('servicos')}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Printer size={18} className="text-rotta-blue shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Outsourcing de Impressão</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Até -40% custos</span>
                    </div>

                    <div
                      onClick={() => onNavigate('servicos')}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Store size={18} className="text-rotta-blue shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Automação Comercial & PDV</span>
                      </div>
                      <span className="text-xs font-bold text-slate-500">SAT / NFC-e</span>
                    </div>

                    <div
                      onClick={() => onNavigate('servicos')}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Wrench size={18} className="text-rotta-blue shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Assistência Especializada</span>
                      </div>
                      <span className="text-xs font-bold text-slate-500">Laboratório próprio</span>
                    </div>

                    <div
                      onClick={() => onNavigate('servicos')}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Headset size={18} className="text-rotta-blue shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Suporte Técnico de TI</span>
                      </div>
                      <span className="text-xs font-bold text-slate-500">Presencial e Remoto</span>
                    </div>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-rotta-blue" />
                      <span>Francisco Beltrão e Região</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('servicos')}
                      className="font-bold text-rotta-blue hover:underline flex items-center gap-1"
                    >
                      <span>Ver detalhes</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
