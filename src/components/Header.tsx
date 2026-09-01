import { ArrowRight, Menu, PhoneCall } from 'lucide-react'

import { BrandMark } from './BrandMark'

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Institucional', href: '#sobre' },
  { label: 'Serviços', href: '#solucoes' },
  { label: 'Produtos', href: '#cases' },
  { label: 'Soluções', href: '#processo' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  return (
    <>
      <div className="hidden border-b border-slate-200 bg-slate-950 px-4 py-2 text-xs text-slate-300 md:block">
        <div className="container-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a href="tel:554688037656" className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white">
              <PhoneCall size={14} className="text-cyan-300" />
              (46) 98803-7656
            </a>
            <span>Segunda a Sexta: 8h às 18h</span>
          </div>
          <span className="uppercase tracking-[0.28em] text-cyan-300">Automação Comercial | Outsourcing | Manutenção Técnica</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Rotta Tecnologia homepage">
            <BrandMark className="h-12 w-12 shrink-0" />
            <div className="hidden sm:block">
              <p className="text-[1.7rem] font-black leading-none tracking-[-0.07em] text-slate-900">ROTTA</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500">Tecnologia</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>

            <a
              href="https://api.whatsapp.com/send?phone=554688037656"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
            >
              Fale conosco
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
