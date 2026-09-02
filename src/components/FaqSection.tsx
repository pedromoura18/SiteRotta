import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'
import { companyInfo, faqs } from '../data/site'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-rotta-cyan/30 bg-rotta-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rotta-cyan">
            <HelpCircle size={14} />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Perguntas <span className="text-gradient-cyan">Frequentes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tudo o que você precisa saber sobre nosso modelo de atendimento, outsourcing de impressão e contratos corporativos.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-rotta-cyan/50 bg-white/[0.07] shadow-card-hover'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? 'bg-rotta-cyan text-rotta-darkest rotate-180'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-slate-300 animate-fade-in-up border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Card de Dúvida Adicional */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md">
          <p className="text-sm sm:text-base text-slate-300">
            Ainda tem alguma dúvida específica sobre seu projeto ou infraestrutura?
          </p>
          <a
            href={companyInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rotta-cyan to-rotta-blue px-6 py-3 text-sm font-bold text-rotta-darkest shadow-glow hover:brightness-110 transition-all"
          >
            <MessageSquare size={16} />
            <span>Falar Diretamente com Douglas Rotta</span>
          </a>
        </div>
      </div>
    </section>
  )
}
