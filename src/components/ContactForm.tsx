import { useState } from 'react'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Send, Sparkles } from 'lucide-react'
import { useSiteData } from '../context/SiteContext'

export function ContactForm() {
  const { companyInfo } = useSiteData()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    city: 'Francisco Beltrão',
    service: 'Outsourcing de Impressão',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const text = encodeURIComponent(
      `*Solicitação de Orçamento - Site Rotta Tecnologia*\n\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `🏢 *Empresa:* ${formData.company || 'Não informada'}\n` +
      `📱 *Telefone/WhatsApp:* ${formData.phone}\n` +
      `📍 *Cidade:* ${formData.city}\n` +
      `💼 *Interesse:* ${formData.service}\n` +
      `📝 *Detalhes:* ${formData.message || 'Gostaria de uma consultoria/orçamento.'}`
    )

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${companyInfo.whatsappRaw}&text=${text}`
    window.open(whatsappUrl, '_blank')
    setIsSubmitted(true)
  }

  return (
    <section id="contato" className="relative py-24 bg-rotta-navy overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rotta-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rotta-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Coluna Esquerda: Informações Institucionais de Contato */}
          <div className="space-y-8 lg:col-span-5 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
                <Sparkles size={14} />
                <span>Atendimento Consultivo</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Vamos transformar a <span className="text-gradient-cyan">tecnologia</span> da sua empresa?
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                Fale com o <strong>Douglas Rotta</strong> e nossa equipe técnica especializada. Elaboramos diagnósticos e orçamentos sob medida para sua necessidade.
              </p>
            </div>

            {/* Cards de Contato Rápido */}
            <div className="space-y-4">
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-rotta-cyan/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">WhatsApp Oficial</p>
                  <p className="text-base font-bold text-white group-hover:text-rotta-cyan transition-colors">
                    {companyInfo.phone}
                  </p>
                  <p className="text-xs text-emerald-400">Resposta rápida em horário comercial</p>
                </div>
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-rotta-cyan/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rotta-blue/20 text-rotta-cyan group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">E-mail Corporativo</p>
                  <p className="text-base font-bold text-white group-hover:text-rotta-cyan transition-colors">
                    {companyInfo.email}
                  </p>
                  <p className="text-xs text-slate-400">{companyInfo.emailGeneral}</p>
                </div>
              </a>

              <a
                href={companyInfo.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-rotta-cyan/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 group-hover:scale-110 transition-transform">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Endereço Físico</p>
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-rotta-cyan transition-colors">
                    {companyInfo.address}
                  </p>
                  <p className="text-xs text-slate-400">{companyInfo.city} - {companyInfo.state}, CEP: {companyInfo.cep}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Horário de Atendimento</p>
                  <p className="text-sm font-bold text-white">{companyInfo.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Orçamento Rápido */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-rotta-darkest/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-white">Solicite uma Cotação ou Visita Técnica</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Preencha o formulário abaixo e entraremos em contato com uma proposta comercial detalhada.
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center animate-fade-in-up">
                  <CheckCircle2 size={48} className="mx-auto text-emerald-400" />
                  <h4 className="mt-4 text-xl font-bold text-white">Mensagem Enviada!</h4>
                  <p className="mt-2 text-sm text-slate-300">
                    Sua solicitação foi redirecionada para o WhatsApp do Douglas Rotta. Responderemos o mais breve possível!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rotta-cyan focus:bg-white/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Comercial ABC Ltda"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rotta-cyan focus:bg-white/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        WhatsApp / Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: (46) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rotta-cyan focus:bg-white/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Cidade / Região
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Francisco Beltrão - PR"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rotta-cyan focus:bg-white/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Qual solução sua empresa precisa?
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-rotta-cyan transition-colors"
                    >
                      <option value="Outsourcing de Impressão">Outsourcing de Impressão (Locação e Gestão)</option>
                      <option value="Automação Comercial & PDV">Automação Comercial & PDVs (Leitores, Cupom, SAT)</option>
                      <option value="Hardware & Computadores">Hardware & Computadores Corporativos / Servidores</option>
                      <option value="Redes Estruturadas & Wi-Fi">Redes Estruturadas, Cabeamento e Wi-Fi</option>
                      <option value="Segurança Eletrônica & CFTV">Segurança Eletrônica & Câmeras CFTV IP</option>
                      <option value="Manutenção Técnica">Manutenção Técnica e Suporte Especializado</option>
                      <option value="Outro assunto">Outro assunto / Consultoria Geral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Detalhes da necessidade (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Precisamos de 3 multifuncionais para o setor administrativo e 2 leitores de código de barras para o caixa..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rotta-cyan focus:bg-white/10 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan via-rotta-blue-light to-rotta-blue py-4 text-base font-bold text-rotta-darkest shadow-glow hover:brightness-110 hover:shadow-glow-lg transition-all"
                  >
                    <Send size={18} />
                    <span>Enviar Solicitação pelo WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-center text-xs text-slate-400 pt-2">
                    🔒 Seus dados serão utilizados unicamente para elaboração da sua proposta comercial.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
