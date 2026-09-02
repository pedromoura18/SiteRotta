import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { companyInfo } from '../data/site'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V7.3c0-.9.3-1.5 1.6-1.5h1.7V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V13h2.5v8h3.4Z" />
    </svg>
  )
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-rotta-darkest text-slate-300">
      {/* Decorative top pattern */}
      <div className="h-1 w-full bg-gradient-to-r from-rotta-cyan via-rotta-blue to-rotta-navy" />

      <div className="container-shell py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#inicio" aria-label="Rotta Tecnologia">
              <BrandMark className="h-11 w-auto" variant="horizontal" theme="gradient" />
            </a>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {companyInfo.shortDescription}
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-rotta-cyan font-semibold">
              <span className="text-slate-400">Posicionamento da Marca:</span>
              <p className="mt-0.5 text-white font-bold tracking-wider uppercase">
                {companyInfo.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={companyInfo.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-rotta-cyan hover:bg-rotta-cyan/20 hover:text-rotta-cyan"
              >
                <InstagramIcon />
              </a>
              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-rotta-cyan hover:bg-rotta-cyan/20 hover:text-rotta-cyan"
              >
                <FacebookIcon />
              </a>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-400"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Navegação Rápida */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Navegação</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#inicio" className="hover:text-rotta-cyan transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-rotta-cyan transition-colors">
                  Os 3 Pilares
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-rotta-cyan transition-colors">
                  Nossas Soluções
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-rotta-cyan transition-colors">
                  Hardwares & PDV
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-rotta-cyan transition-colors">
                  Simulador de ROI
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-rotta-cyan transition-colors">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-rotta-cyan transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Soluções / Especialidades */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Especialidades</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Outsourcing de Impressão</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Automação Comercial e PDV</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Desktops e Servidores Corporativos</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Cabeamento Estruturado e Wi-Fi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Segurança Eletrônica & CFTV IP</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rotta-cyan" />
                <span>Manutenção Técnica Especializada</span>
              </li>
            </ul>
          </div>

          {/* Contato & Localização Oficial */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contato Oficial</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-rotta-cyan shrink-0 mt-0.5" />
                <div>
                  <a href="tel:5546988037656" className="font-bold hover:text-rotta-cyan transition-colors">
                    {companyInfo.phone}
                  </a>
                  <p className="text-xs text-slate-400">Douglas Rotta</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={16} className="text-rotta-cyan shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="text-xs break-all hover:text-rotta-cyan transition-colors">
                  {companyInfo.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-rotta-cyan shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold">{companyInfo.address}</p>
                  <p>{companyInfo.city} - {companyInfo.state}</p>
                  <p className="text-slate-400">CEP: {companyInfo.cep}</p>
                </div>
              </li>

              <li className="flex items-center gap-3 text-xs text-slate-400">
                <Clock size={16} className="text-rotta-cyan shrink-0" />
                <span>Segunda a Sexta: 8h às 18h</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan to-rotta-blue px-4 py-2.5 text-xs font-bold text-rotta-darkest shadow-glow hover:brightness-110 transition-all"
              >
                <span>Falar no WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Rotta Tecnologia. Todos os direitos reservados. Francisco Beltrão - PR.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">Solução • Inovação • Compromisso</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-rotta-cyan hover:text-white transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

