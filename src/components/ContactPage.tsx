import { useState } from 'react'
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  User,
} from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons'
import { companyInfo } from '../data/site'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Enviar mensagem via WhatsApp com os dados preenchidos
    const text = encodeURIComponent(
      `*Contato via Site Rotta Tecnologia*\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Telefone:* ${formData.phone}\n` +
      `*Assunto:* ${formData.subject}\n` +
      `*Mensagem:* ${formData.message}`
    )
    window.open(`https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${text}`, '_blank')

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16 animate-fadeIn">
      <div className="container-shell">
        {/* ─── Cabeçalho de Contato ─── */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rotta-blue">
            <PhoneCall size={14} />
            Canais de Atendimento
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Fale com a <span className="text-gradient-brand">Rotta Tecnologia</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Estamos prontos para atender sua empresa com rapidez e eficiência. Fale pelo WhatsApp, envie uma mensagem ou visite nossa sede em Francisco Beltrão - PR.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* ── Coluna Esquerda: Informações e Cartões ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card Telefones e WhatsApp */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Atendimento Direto
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Telefone & WhatsApp</h2>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
                >
                  <span>(46) 9 8803-7656</span>
                  <span className="text-xs uppercase bg-emerald-200 px-2 py-0.5 rounded font-black">
                    WhatsApp
                  </span>
                </a>

                <a
                  href="tel:5546988037656"
                  className="flex items-center gap-2 px-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  <PhoneCall size={14} className="text-slate-400" />
                  <span>Ligação telefônica direta para consultoria</span>
                </a>
              </div>
            </div>

            {/* Card E-mails */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-rotta-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Comunicação Formal
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">E-mails Oficiais</h2>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-sm">
                <a
                  href="mailto:atendimento@rottatecnologia.com.br"
                  className="block font-semibold text-slate-700 hover:text-rotta-blue"
                >
                  atendimento@rottatecnologia.com.br
                </a>
                <a
                  href="mailto:douglas@rottatecnologia.com.br"
                  className="block font-semibold text-slate-700 hover:text-rotta-blue"
                >
                  douglas@rottatecnologia.com.br
                </a>
              </div>
            </div>

            {/* Card Endereço e Horários */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sede Própria
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Localização & Horário</h2>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                <div>
                  <strong className="block text-slate-800 text-sm">Rotta Tecnologia</strong>
                  <span>{companyInfo.fullAddress}</span>
                </div>

                <div className="flex items-center gap-2 pt-2 text-slate-700">
                  <Clock size={16} className="text-rotta-blue shrink-0" />
                  <span>{companyInfo.businessHours}</span>
                </div>
              </div>
            </div>

            {/* Card Área do Cliente e Redes Sociais */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Acesso & Redes
                </span>
                <span className="text-xs font-bold text-rotta-blue">Siga-nos</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={companyInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  aria-label="Instagram da Rotta"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>

                <a
                  href={companyInfo.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  aria-label="Facebook da Rotta"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>

                <a
                  href={companyInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                  aria-label="LinkedIn da Rotta"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>

                <div className="h-6 w-px bg-slate-200 ml-auto" />

                <a
                  href={companyInfo.clientPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-rotta-blue transition-colors"
                >
                  <User size={14} className="text-rotta-blue" />
                  <span>Área do Cliente</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Coluna Direita: Formulário de Mensagem & Mapa ── */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rotta-blue">
                  Formulário de Contato
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  Envie sua Mensagem
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Preencha os campos abaixo para receber um contato rápido da nossa equipe técnica.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">Mensagem Encaminhada!</h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Seus dados foram enviados diretamente para o WhatsApp do nosso atendimento. Retornaremos o mais breve possível!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white border border-emerald-300 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="carlos@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Celular / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(46) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Assunto
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Cotação de Outsourcing"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Escreva sua Mensagem *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Descreva a demanda da sua empresa ou os equipamentos que precisa..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-rotta-blue px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-rotta-blue-dark transition-all"
                  >
                    <Send size={16} />
                    <span>Enviar Mensagem Agora</span>
                  </button>
                </form>
              )}
            </div>

            {/* ── Mapa Interativo da Sede ── */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-rotta-blue" />
                  <span className="text-xs font-bold text-slate-800">
                    Francisco Beltrão - PR
                  </span>
                </div>
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-rotta-blue hover:underline"
                >
                  Abrir no Google Maps
                </a>
              </div>
              <iframe
                title="Localização Rotta Tecnologia"
                src={companyInfo.mapsEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
