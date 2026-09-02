import { useState } from 'react'
import { ArrowRight, Clock, MapPin, Menu, PhoneCall, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { companyInfo } from '../data/site'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Simulador ROI', href: '#calculadora' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Topbar Institucional */}
      <div className="hidden border-b border-white/10 bg-rotta-darkest/90 px-4 py-2 text-xs text-slate-300 backdrop-blur-md md:block">
        <div className="container-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:5546988037656"
              className="inline-flex items-center gap-2 font-medium text-slate-200 transition-colors hover:text-rotta-cyan"
            >
              <PhoneCall size={14} className="text-rotta-cyan" />
              <span>(46) 98803-7656</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-slate-400">
              <MapPin size={13} className="text-rotta-cyan" />
              <span>Francisco Beltrão - PR</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-slate-400">
              <Clock size={13} className="text-rotta-cyan" />
              <span>Seg - Sex: 8h às 18h</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-rotta-cyan">
              Solução • Inovação • Compromisso
            </span>
          </div>
        </div>
      </div>

      {/* Header Sticky Glassmorphic */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-rotta-navy/85 backdrop-blur-xl shadow-lg transition-all duration-300">
        <div className="container-shell flex items-center justify-between py-3.5 sm:py-4">
          {/* Logotipo Rotta */}
          <a
            href="#inicio"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Rotta Tecnologia"
          >
            <BrandMark className="h-10 sm:h-12 w-auto" variant="horizontal" theme="gradient" />
          </a>

          {/* Menu Desktop */}
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-200 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 text-slate-300 transition-colors duration-200 hover:text-rotta-cyan after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-rotta-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan via-rotta-blue-light to-rotta-blue px-5 py-2.5 text-xs sm:text-sm font-bold text-rotta-darkest shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110 hover:-translate-y-0.5"
            >
              <span>Orçamento Rápido</span>
              <ArrowRight size={15} />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-slate-200 transition-colors hover:border-rotta-cyan/40 hover:bg-white/10 lg:hidden"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-white/10 bg-rotta-darkest/95 px-6 py-6 backdrop-blur-2xl lg:hidden animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-rotta-cyan"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan to-rotta-blue py-3 text-center text-sm font-bold text-rotta-darkest shadow-glow"
                >
                  <span>Falar no WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
                <div className="mt-4 text-center text-xs text-slate-400">
                  <p>Atendimento direto com Douglas Rotta</p>
                  <p className="mt-1 font-semibold text-rotta-cyan">(46) 98803-7656</p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

