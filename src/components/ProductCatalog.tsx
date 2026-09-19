import { useState, useMemo } from 'react'
import {
  ArrowRight,
  Check,
  Cpu,
  Eye,
  Layers,
  MessageSquare,
  Package,
  Printer,
  Scissors,
  Search,
  SlidersHorizontal,
  Store,
  Tag,
  X,
} from 'lucide-react'
import { useSiteData } from '../context/SiteContext'
import type { ProductCategory, ProductItem } from '../data/site'

interface ProductCatalogProps {
  onSelectProduct: (productId: string) => void
  initialCategory?: ProductCategory
}

const categoriesList: { id: ProductCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Todos os Equipamentos', icon: Layers },
  { id: 'impressoras', label: 'Impressoras & Multifuncionais', icon: Printer },
  { id: 'scanners', label: 'Scanners Corporativos', icon: Package },
  { id: 'etiquetas', label: 'Impressoras de Etiquetas', icon: Tag },
  { id: 'rotuladores', label: 'Rotuladores Eletrônicos', icon: SlidersHorizontal },
  { id: 'scanncut', label: 'ScanNCut (Corte)', icon: Scissors },
  { id: 'perifericos', label: 'Periféricos & Acessórios', icon: Cpu },
  { id: 'automacao', label: 'Automação Comercial', icon: Store },
]

export function ProductCatalog({ onSelectProduct, initialCategory = 'all' }: ProductCatalogProps) {
  const { companyInfo, productsData } = useSiteData()
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const getProductWhatsappUrl = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Olá Douglas! Tenho interesse no equipamento "${product.name}" (${product.brand}) que vi no site da Rotta Tecnologia. Gostaria de solicitar um orçamento.`
    )
    return `https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${text}`
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12 lg:py-16 text-slate-900 animate-fadeIn">
      <div className="container-shell">
        {/* ── Cabeçalho do Catálogo ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
              <Package size={14} />
              Catálogo Oficial Rotta Tecnologia
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Produtos & <span className="text-gradient-brand">Soluções Corporativas</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Hardwares das marcas líderes mundiais Brother, Epson, Dell, Zebra, Honeywell e Elgin. Disponíveis para <strong>Locação (Outsourcing com tudo incluso)</strong> ou <strong>Venda direta</strong>.
            </p>
          </div>

          <a
            href={companyInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-2xs hover:border-rotta-blue hover:text-rotta-blue hover:shadow-xs transition-all"
          >
            <span>Consultar outro modelo</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* ── Barra de Busca e Filtros ── */}
        <div className="mt-8 space-y-4">
          {/* Campo de Busca em Tempo Real */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por impressora, scanner, rotulador, teclado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-2xs focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Abas de Categorias */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categoriesList.map((cat) => {
              const Icon = cat.icon
              const isActive = selectedCategory === cat.id

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-rotta-blue text-white shadow-sm scale-102'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contador de Resultados */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>
            Exibindo <strong>{filteredProducts.length}</strong> equipamentos encontrados
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="font-semibold text-rotta-blue hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* ── Grid de Produtos ── */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-2xs">
            <Package size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Nenhum equipamento encontrado</h3>
            <p className="mt-1 text-sm text-slate-500">
              Tente buscar com outros termos ou selecione outra categoria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rotta-blue px-4 py-2 text-xs font-bold text-white shadow-xs"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-rotta-blue/60 hover:shadow-md"
              >
                {/* Imagem do Produto Clicável */}
                <div
                  onClick={() => onSelectProduct(product.id)}
                  className="relative aspect-4/3 w-full cursor-pointer overflow-hidden bg-slate-50 flex items-center justify-center p-3"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 pointer-events-none">
                    {product.badge && (
                      <span className="rounded-md bg-rotta-blue px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-2xs">
                        {product.badge}
                      </span>
                    )}
                    <span className="rounded-md bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white">
                      {product.modelType}
                    </span>
                  </div>

                  {/* Selo Marca & Categoria */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs pointer-events-none">
                    <span className="rounded bg-white/90 px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-2xs border border-slate-200/60">
                      {product.brand}
                    </span>
                    <span className="text-[11px] font-bold text-rotta-blue bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-slate-200/60">
                      {product.images.length} fotos
                    </span>
                  </div>
                </div>

                {/* Conteúdo e Ações */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h2
                      onClick={() => onSelectProduct(product.id)}
                      className="cursor-pointer text-base font-bold text-slate-900 transition-colors group-hover:text-rotta-blue line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Destaques rápidos */}
                    <div className="mt-3 space-y-1 border-t border-slate-100 pt-2.5">
                      {product.features.slice(0, 2).map((feat) => (
                        <div key={feat} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <Check size={14} className="text-rotta-blue shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botões: Ver Detalhes e Cotar */}
                  <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product.id)}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-rotta-blue transition-colors hover:bg-rotta-blue hover:text-white"
                    >
                      <Eye size={15} />
                      <span>Ver Fotos & Especificações</span>
                    </button>

                    <a
                      href={getProductWhatsappUrl(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                    >
                      <MessageSquare size={14} className="text-emerald-600" />
                      <span>Solicitar Orçamento</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
