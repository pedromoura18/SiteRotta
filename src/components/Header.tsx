import { useState } from 'react'
import {
  Building2,
  ChevronRight,
  ExternalLink,
  Home,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { companyInfo } from '../data/site'

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

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (page: NavPage) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ─── Topbar Institucional com Contato e Área do Cliente ─── */}
      <div className="hidden border-b border-slate-200/80 bg-slate-50 px-4 py-2 text-xs text-slate-600 md:block">
        <div className="container-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:5546988037656"
              className="inline-flex items-center gap-2 font-semibold text-slate-700 transition-colors hover:text-rotta-blue"
            >
              <PhoneCall size={14} className="text-rotta-blue" />
              <span>(46) 9 8803-7656</span>
            </a>

            <a
              href="mailto:atendimento@rottatecnologia.com.br"
              className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-rotta-blue"
            >
              <Mail size={14} className="text-rotta-blue" />
              <span>atendimento@rottatecnologia.com.br</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-slate-500">
              <MapPin size={14} className="text-rotta-blue" />
              <span>Francisco Beltrão - PR</span>
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

      {/* ─── Header Principal (Ampliado, Claro e com Ícones Maiores) ─── */}
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

          {/* Menu Desktop com Ícones Grandes e Claros */}
          <nav className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

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

        {/* ─── Drawer Mobile Responsivo ─── */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-6 py-6 shadow-xl lg:hidden animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

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
