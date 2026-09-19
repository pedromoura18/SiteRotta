import {
  ArrowUp,
  Clock,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  User,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons'
import { useSiteData } from '../context/SiteContext'
import type { NavPage } from './Header'

interface FooterProps {
  onNavigate: (page: NavPage) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const { companyInfo } = useSiteData()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-slate-200 bg-white text-slate-600">
      {/* Faixa decorativa no topo */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rotta-navy via-rotta-blue to-cyan-400" />

      <div className="container-shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Coluna 1: Marca & Descrição */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => {
                onNavigate('home')
                scrollToTop()
              }}
              className="text-left focus:outline-none"
              aria-label="Voltar para a página inicial"
            >
              <BrandMark className="h-11 w-auto" variant="horizontal" theme="dark" />
            </button>

            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              Fundada em 2016 em Francisco Beltrão - PR, somos especialistas em Outsourcing de Impressão, Automação Comercial e Assistência Técnica para empresas.
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
              <span className="text-slate-400 font-medium">Slogan Oficial:</span>
              <p className="mt-0.5 font-bold text-rotta-navy uppercase tracking-wider">
                {companyInfo.tagline}
              </p>
            </div>

            {/* Redes Sociais com links oficiais do site */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={companyInfo.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>

              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>

              <a
                href={companyInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>

              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Oficial da Rotta Tecnologia"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Institucional */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Páginas
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('home')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('sobre')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('servicos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('produtos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Produtos & Loja
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contato')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Serviços Principais */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Soluções Oferecidas
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('servicos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Suporte Técnico Especializado
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('servicos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Outsourcing de Impressão
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('servicos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Automação Comercial & PDV
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('servicos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left"
                >
                  Assistência Técnica & Manutenção
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('produtos')
                    scrollToTop()
                  }}
                  className="hover:text-rotta-blue transition-colors text-left font-semibold text-rotta-blue"
                >
                  Catálogo Brother, Epson, Dell & Zebra
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato & Matriz */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Fale Conosco
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <a
                href="tel:5546988037656"
                className="flex items-center gap-2 font-bold text-slate-800 hover:text-rotta-blue"
              >
                <PhoneCall size={14} className="text-rotta-blue shrink-0" />
                <span>(46) 9 8803-7656</span>
              </a>

              <a
                href="mailto:atendimento@rottatecnologia.com.br"
                className="flex items-center gap-2 text-slate-600 hover:text-rotta-blue"
              >
                <Mail size={14} className="text-rotta-blue shrink-0" />
                <span className="truncate">atendimento@rottatecnologia.com.br</span>
              </a>

              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={14} className="text-rotta-blue shrink-0 mt-0.5" />
                <span>{companyInfo.address}, Francisco Beltrão - PR</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={14} className="text-rotta-blue shrink-0" />
                <span>Seg - Sex: 8h às 12h e 13h30 às 18h</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={companyInfo.clientPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-rotta-blue transition-colors"
              >
                <User size={13} className="text-rotta-blue" />
                <span>Acessar Área do Cliente</span>
                <ExternalLink size={11} className="text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── Linha de Copyright ─── */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Rotta Tecnologia © 2016 - {new Date().getFullYear()} Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Desenvolvido com <Heart size={13} className="text-red-500 fill-red-500" /> para sua empresa
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rotta-blue"
              aria-label="Voltar ao topo"
            >
              <span>Topo</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
