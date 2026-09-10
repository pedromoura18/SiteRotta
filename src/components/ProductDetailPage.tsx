import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headset,
  MessageCircle,
  Package,
  PhoneCall,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { companyInfo, productsData } from '../data/site'

interface ProductDetailPageProps {
  productId: string
  onBack: () => void
  onSelectProduct: (productId: string) => void
}

export function ProductDetailPage({
  productId,
  onBack,
  onSelectProduct,
}: ProductDetailPageProps) {
  const product = productsData.find((p) => p.id === productId) || productsData[0]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.png']

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Pre-filled WhatsApp message
  const whatsappUrl = (() => {
    const text = encodeURIComponent(
      `Olá Douglas! Vi o equipamento "${product.name}" (${product.brand}) no site da Rotta Tecnologia e gostaria de solicitar um orçamento para minha empresa.`
    )
    return `https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${text}`
  })()

  // Related products
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12 animate-fadeIn">
      <div className="container-shell">
        {/* ─── Breadcrumb e Voltar ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:border-rotta-blue hover:text-rotta-blue hover:-translate-x-0.5 active:scale-95"
          >
            <ArrowLeft size={18} />
            <span>Voltar ao Catálogo</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Share2 size={14} />
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
            <span className="hidden sm:inline text-xs text-slate-400">
              Rotta Tecnologia • Francisco Beltrão - PR
            </span>
          </div>
        </div>

        {/* ─── Layout Principal do Produto ─── */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* ── Coluna Esquerda: Galeria de Fotos Passando (Slider / Carrossel) ── */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm aspect-4/3 flex items-center justify-center group">
              {/* Imagem Principal em Alta Definição */}
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} - Foto ${currentImageIndex + 1}`}
                className="h-full w-full object-cover sm:object-contain p-2 sm:p-4 transition-all duration-300"
              />

              {/* Badges Flutuantes */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                {product.badge && (
                  <span className="rounded-lg bg-rotta-blue px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="rounded-lg bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
                  {product.modelType}
                </span>
              </div>

              {/* Contador de Fotos */}
              <div className="absolute bottom-4 right-4 rounded-full bg-slate-900/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                Foto {currentImageIndex + 1} de {images.length}
              </div>

              {/* Botões de Navegação do Carrossel (Anterior / Próximo) */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-all hover:bg-white hover:scale-110 hover:text-rotta-blue active:scale-95"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-all hover:bg-white hover:scale-110 hover:text-rotta-blue active:scale-95"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas Clicáveis para Troca Imediata */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all ${
                      currentImageIndex === idx
                        ? 'border-rotta-blue ring-2 ring-blue-100 scale-102'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Selos de Garantia Rotta */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <ShieldCheck size={20} className="mx-auto text-rotta-blue mb-1" />
                <span className="block text-[11px] font-bold text-slate-800">Garantia Formal</span>
                <span className="block text-[10px] text-slate-500">Equipamento homologado</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <RefreshCw size={20} className="mx-auto text-rotta-blue mb-1" />
                <span className="block text-[11px] font-bold text-slate-800">Swap Imediato</span>
                <span className="block text-[10px] text-slate-500">Máquina reserva inclusa</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <Headset size={20} className="mx-auto text-rotta-blue mb-1" />
                <span className="block text-[11px] font-bold text-slate-800">Suporte no Local</span>
                <span className="block text-[10px] text-slate-500">Atendimento presencial</span>
              </div>
            </div>
          </div>

          {/* ── Coluna Direita: Informações, Especificações e Botão de Orçamento ── */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-blue-100/80 px-2.5 py-1 text-xs font-bold text-rotta-blue">
                  {product.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Fabricante: <strong className="text-slate-800">{product.brand}</strong>
                </span>
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>

            {/* ── BOX PRINCIPAL DE COTAÇÃO & SOLICITAÇÃO DE ORÇAMENTO ── */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/50 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Disponível para Locação & Venda
                  </span>
                  <p className="text-lg font-black text-slate-900">
                    Condições Especiais para Empresas
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Pronta Entrega
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Solicite uma proposta personalizada sem compromisso com o especialista <strong>Douglas Rotta</strong>. Atendimento direto pelo WhatsApp com simulação sob medida.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-4 text-base font-black text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle size={20} />
                  <span>Solicitar Orçamento no WhatsApp</span>
                </a>

                <a
                  href="tel:5546988037656"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <PhoneCall size={17} className="text-rotta-blue" />
                  <span>Ligar Agora</span>
                </a>
              </div>
            </div>

            {/* ── Descrição Completa e Diferenciais ── */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-rotta-blue" />
                <span>Sobre o Equipamento</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">
                {product.longDescription}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Principais Vantagens & Recursos:</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 size={16} className="text-rotta-blue shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Ficha Técnica Detalhada (Especificações) ── */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Package size={18} className="text-rotta-blue" />
                <span>Especificações Técnicas</span>
              </h2>

              <div className="overflow-hidden rounded-xl border border-slate-200 divide-y divide-slate-100">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 text-xs sm:text-sm ${
                      i % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="font-semibold text-slate-500">{spec.label}</span>
                    <span className="font-bold text-slate-900 text-right mt-1 sm:mt-0">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Produtos Relacionados da Mesma Categoria ─── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rotta-blue">
                  Outras Opções
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Produtos Relacionados
                </h2>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-rotta-blue hover:underline"
              >
                Ver Catálogo Completo
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel.id)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:-translate-y-1 hover:border-rotta-blue hover:shadow-md"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[11px] font-bold text-white">
                      {rel.brand}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-rotta-blue transition-colors">
                    {rel.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {rel.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-rotta-blue">
                    <span>Ver Detalhes</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
