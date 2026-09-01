import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import rottaLogo from '../assets/rotta-logo.svg'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V7.3c0-.9.3-1.5 1.6-1.5h1.7V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V13h2.5v8h3.4Z" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M6.9 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5.3 10.1h3.2v9.4H5.3v-9.4Zm5.5 0h3.1v1.3h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1v5.7h-3.2v-5.3c0-1.3 0-2.9-1.8-2.9-1.8 0-2.1 1.4-2.1 2.8v5.4H10.8v-9.4Z" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={rottaLogo} alt="Rotta Tecnologia" className="h-10 w-auto opacity-95" />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Especialistas em automação comercial, outsourcing de impressão e infraestrutura de TI para empresas que buscam eficiência.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <LinkedInIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Navegação</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li><a href="#top" className="transition hover:text-white">Home</a></li>
              <li><a href="#sobre" className="transition hover:text-white">Institucional</a></li>
              <li><a href="#solucoes" className="transition hover:text-white">Serviços</a></li>
              <li><a href="#cases" className="transition hover:text-white">Produtos</a></li>
              <li><a href="#contato" className="transition hover:text-white">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Contato</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3"><Phone size={16} className="text-cyan-400" /> <a href="tel:554688037656" className="hover:text-white">(46) 98803-7656</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-cyan-400" /> <span>contato@rottatecnologia.com.br</span></li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-cyan-400" /> <span>Av. Brasil, 1250 - Centro, Pato Branco - PR, 85501-000</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Converse com a gente</h3>
            <a
              href="https://api.whatsapp.com/send?phone=554688037656"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Solicitar orçamento
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          © 2026 Rotta Tecnologia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
