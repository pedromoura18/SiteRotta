import { useState } from 'react'
import { ArrowRight, Check, Layers, MessageSquare, Monitor, Network, Printer, Server, ShoppingBag, Store } from 'lucide-react'
import { companyInfo, productsData } from '../data/site'
import type { ProductCategory, ProductItem } from '../data/site'

const categories: { id: ProductCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Todos os Equipamentos', icon: Layers },
  { id: 'outsourcing', label: 'Outsourcing de Impressão', icon: Printer },
  { id: 'automacao', label: 'Automação & PDVs', icon: Store },
  { id: 'hardware', label: 'Computadores & Notebooks', icon: Monitor },
  { id: 'infra', label: 'Servidores & TI', icon: Server },
  { id: 'redes', label: 'Redes & Infraestrutura', icon: Network },
]

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')

  const filteredProducts =
    selectedCategory === 'all'
      ? productsData
      : productsData.filter((item) => item.category === selectedCategory)

  const getProductWhatsappUrl = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Olá Douglas! Tenho interesse no equipamento "${product.name}" (${product.brand}) que vi no site da Rotta Tecnologia. Gostaria de solicitar um orçamento e especificações técnicas.`
    )
    return `https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${text}`
  }

  return (
    <section id="produtos" className="relative py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#3568fd_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="container-shell relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
              <ShoppingBag size={14} />
              <span>Catálogo de Hardwares & Soluções</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Equipamentos de <span className="text-gradient-cyan">Alta Performance</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Fornecemos e instalamos as melhores marcas do mercado mundial com garantia integral e assistência técnica regional.
            </p>
          </div>

          <a
            href={companyInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-rotta-cyan hover:text-white transition-colors"
          >
            <span>Consultar outro equipamento específico</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Abas / Filtros de Categoria */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = selectedCategory === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-rotta-cyan to-rotta-blue text-rotta-darkest shadow-glow scale-[1.02]'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Grid de Produtos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-rotta-cyan/40 hover:bg-white/[0.06] hover:shadow-card-hover"
            >
              {/* Imagem do Produto com Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950/60">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                {product.badge && (
                  <div className="absolute top-3 left-3 rounded-md bg-rotta-cyan px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-rotta-darkest shadow-md">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="rounded bg-black/50 px-2 py-0.5 backdrop-blur-sm font-semibold">
                    {product.brand}
                  </span>
                  <span className="text-[11px] text-rotta-cyan font-bold">{product.categoryLabel}</span>
                </div>
              </div>

              {/* Informações e Recursos */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rotta-cyan transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check size={14} className="text-rotta-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botão de Cotação Rápida */}
                <div className="mt-6 pt-3 border-t border-white/10">
                  <a
                    href={getProductWhatsappUrl(product)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-rotta-cyan hover:to-rotta-blue hover:text-rotta-darkest hover:shadow-glow"
                  >
                    <MessageSquare size={15} />
                    <span>Cotar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Consulta de Equipamentos */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-rotta-navy via-rotta-navy-light to-rotta-blue/40 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Precisa de um modelo específico de impressora, servidor ou leitor?
              </h4>
              <p className="mt-1 text-sm text-slate-300">
                Temos acesso direto aos maiores distribuidores de tecnologia do Brasil com preços corporativos.
              </p>
            </div>
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-rotta-cyan px-6 py-3 text-sm font-bold text-rotta-darkest shadow-glow hover:bg-rotta-cyan-light transition-all"
            >
              <span>Falar com Douglas Rotta</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
