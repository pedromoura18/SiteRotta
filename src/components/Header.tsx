import { useEffect, useRef, useState } from 'react'
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Home,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Package,
  PhoneCall,
  Printer,
  ScanLine,
  Scissors,
  ShoppingBag,
  Tag,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { useSiteData } from '../context/SiteContext'

export type NavPage = 'home' | 'sobre' | 'servicos' | 'produtos' | 'contato'

interface HeaderProps {
  currentPage: NavPage
  onNavigate: (page: NavPage) => void
}

const navItems: { id: NavPage; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'sobre', label: 'Sobre Nós', icon: Building2 },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'produtos', label: 'Produtos', icon: Layers },
  { id: 'contato', label: 'Contato', icon: PhoneCall },
]

interface ProductCategory {
  id: string
  label: string
  icon: React.ElementType
  description: string
  color: string
}

const productCategories: ProductCategory[] = [
  {
    id: 'impressoras',
    label: 'Impressoras & Multifuncionais',
    icon: Printer,
    description: 'Brother, HP, Epson para alto volume',
    color: 'text-blue-600',
  },
  {
    id: 'scanners',
    label: 'Scanners Corporativos',
    icon: ScanLine,
    description: 'Digitalização ágil e precisa',
    color: 'text-indigo-600',
  },
  {
    id: 'etiquetas',
    label: 'Impressoras de Etiquetas',
    icon: Tag,
    description: 'Térmicas Zebra, Brother e Elgin',
    color: 'text-emerald-600',
  },
  {
    id: 'rotuladores',
    label: 'Rotuladores Eletrônicos',
    icon: Package,
    description: 'P-touch e rotulagem profissional',
    color: 'text-orange-600',
  },
  {
    id: 'scanncut',
    label: 'ScanNCut (Máquinas de Corte)',
    icon: Scissors,
    description: 'Corte e personalização criativa',
    color: 'text-pink-600',
  },
  {
    id: 'perifericos',
    label: 'Periféricos & Acessórios',
    icon: Monitor,
    description: 'Teclados, mouses, headsets e mais',
    color: 'text-violet-600',
  },
  {
    id: 'automacao',
    label: 'Automação Comercial',
    icon: ShoppingBag,
    description: 'PDV, leitores e terminais',
    color: 'text-amber-600',
  },
]

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { companyInfo } = useSiteData()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [produtosOpen, setProdutosOpen] = useState(false)
  const [mobileProdutosOpen, setMobileProdutosOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const produtosButtonRef = useRef<HTMLButtonElement>(null)

  const handleNavClick = (page: NavPage) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    setProdutosOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to products page with the category pre-selected
    onNavigate('produtos')
    setProdutosOpen(false)
    setMobileMenuOpen(false)
    setMobileProdutosOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Dispatch a custom event so ProductCatalog can pick up the filter
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('setProductCategory', { detail: { category: categoryId } })
      )
    }, 100)
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        produtosButtonRef.current &&
        !produtosButtonRef.current.contains(e.target as Node)
      ) {
        setProdutosOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProdutosOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* ─── Topbar Institucional com Contato e Área do Cliente ─── */}
      <div className="hidden border-b border-slate-200/80 bg-slate-50 px-4 py-2 text-xs text-slate-600 md:block">
        <div className="container-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${companyInfo.whatsappRaw || '5546988037656'}`}
              className="inline-flex items-center gap-2 font-semibold text-slate-700 transition-colors hover:text-rotta-blue"
            >
              <PhoneCall size={14} className="text-rotta-blue" />
              <span>{companyInfo.phone}</span>
            </a>

            <a
              href={`mailto:${companyInfo.email}`}
              className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-rotta-blue"
            >
              <Mail size={14} className="text-rotta-blue" />
              <span>{companyInfo.email}</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-slate-500">
              <MapPin size={14} className="text-rotta-blue" />
              <span>{companyInfo.city} - {companyInfo.state}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Seg - Sex: 8h às 18h
            </span>
            <div className="h-3 w-px bg-slate-200 hidden lg:block" />
            <a
              href={companyInfo.clientPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1 font-bold text-slate-700 shadow-2xs transition-all hover:border-rotta-blue hover:text-rotta-blue"
            >
              <User size={13} className="text-rotta-blue" />
              <span>Área do Cliente</span>
              <ExternalLink size={11} className="text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Header Principal ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs transition-all duration-300">
        <div className="container-shell flex h-20 items-center justify-between">
          {/* Logotipo Rotta */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02] text-left focus:outline-none"
            aria-label="Voltar para a página inicial"
          >
            <BrandMark className="h-11 sm:h-12 w-auto" variant="horizontal" theme="dark" />
          </button>

          {/* Menu Desktop */}
          <nav className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              const isProdutos = item.id === 'produtos'

              if (isProdutos) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      ref={produtosButtonRef}
                      type="button"
                      onClick={() => handleNavClick('produtos')}
                      onMouseEnter={() => setProdutosOpen(true)}
                      className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm sm:text-[15px] font-bold transition-all duration-200 ${
                        isActive || produtosOpen
                          ? 'bg-blue-50 text-rotta-blue shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-rotta-navy'
                      }`}
                      aria-expanded={produtosOpen}
                      aria-haspopup="true"
                    >
                      <Layers
                        size={20}
                        className={`transition-colors ${
                          isActive || produtosOpen ? 'text-rotta-blue' : 'text-slate-500'
                        }`}
                      />
                      <span>Produtos</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          produtosOpen ? 'rotate-180 text-rotta-blue' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  </div>
                )
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm sm:text-[15px] font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-rotta-blue shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-rotta-navy'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors ${
                      isActive ? 'text-rotta-blue' : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Botões de Ação Direta */}
          <div className="flex items-center gap-3">
            <a
              href={companyInfo.clientPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-rotta-blue"
            >
              <User size={16} className="text-rotta-blue" />
              <span>Portal do Cliente</span>
            </a>

            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rotta-blue to-rotta-blue-dark px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 active:scale-95"
            >
              <MessageCircle size={17} className="text-white" />
              <span className="hidden sm:inline">Solicitar Orçamento</span>
              <span className="sm:hidden">Orçamento</span>
            </a>

            {/* Botão Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-rotta-blue lg:hidden"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ─── Mega-Menu Produtos (Desktop) ─── */}
        {produtosOpen && (
          <div
            ref={dropdownRef}
            onMouseLeave={() => setProdutosOpen(false)}
            className="absolute left-0 right-0 top-full z-50 border-t border-slate-200/80 bg-white shadow-2xl animate-slideDown"
            style={{
              animation: 'slideDown 0.22s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <style>{`
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div className="container-shell py-6">
              {/* Header do mega-menu */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-rotta-blue">
                    Catálogo de Produtos
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Selecione uma categoria para filtrar
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('produtos')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rotta-blue hover:underline"
                >
                  Ver todos os produtos
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Grid de categorias */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
                {productCategories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className="group flex flex-col items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-left transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-xs transition-transform duration-200 group-hover:scale-110 ${cat.color}`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold leading-tight text-slate-800 group-hover:text-rotta-blue">
                          {cat.label}
                        </p>
                        <p className="mt-1 text-[11px] leading-tight text-slate-500">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Footer do mega-menu */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex-1 text-xs text-slate-400">
                  💡 Precisa de ajuda para escolher o equipamento ideal?
                </div>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-700"
                  onClick={() => setProdutosOpen(false)}
                >
                  <MessageCircle size={14} />
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ─── Drawer Mobile Responsivo ─── */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-6 py-6 shadow-xl lg:hidden animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                const isProdutos = item.id === 'produtos'

                if (isProdutos) {
                  return (
                    <div key={item.id}>
                      <div
                        className={`flex w-full items-center justify-between rounded-xl transition-colors ${
                          isActive || mobileProdutosOpen
                            ? 'bg-blue-50'
                            : 'hover:bg-slate-100'
                        }`}
                      >
                        {/* Clicar no label navega direto para produtos */}
                        <button
                          type="button"
                          onClick={() => handleNavClick('produtos')}
                          className={`flex flex-1 items-center gap-3 px-4 py-3 text-base font-bold transition-colors text-left ${
                            isActive || mobileProdutosOpen
                              ? 'text-rotta-blue'
                              : 'text-slate-800'
                          }`}
                        >
                          <Layers size={22} className={isActive ? 'text-rotta-blue' : 'text-slate-500'} />
                          <span>Produtos</span>
                        </button>
                        {/* Chevron abre/fecha o submenu de categorias */}
                        <button
                          type="button"
                          onClick={() => setMobileProdutosOpen((v) => !v)}
                          className={`flex items-center justify-center rounded-xl p-3 transition-colors ${
                            mobileProdutosOpen ? 'text-rotta-blue' : 'text-slate-400'
                          }`}
                          aria-label="Expandir categorias de produtos"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              mobileProdutosOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Submenu mobile categorias */}
                      {mobileProdutosOpen && (
                        <div className="mt-2 ml-4 space-y-1 border-l-2 border-blue-100 pl-4">
                          {productCategories.map((cat) => {
                            const CatIcon = cat.icon
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryClick(cat.id)}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                              >
                                <CatIcon size={15} className={cat.color} />
                                <span>{cat.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors text-left ${
                      isActive
                        ? 'bg-blue-50 text-rotta-blue'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={22} className={isActive ? 'text-rotta-blue' : 'text-slate-500'} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                )
              })}

              <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
                <a
                  href={companyInfo.clientPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-bold text-slate-700"
                >
                  <User size={18} className="text-rotta-blue" />
                  <span>Acessar Área do Cliente</span>
                </a>

                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
                >
                  <MessageCircle size={18} />
                  <span>Falar no WhatsApp Oficial</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
