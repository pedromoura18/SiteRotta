import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { companyInfo } from '../data/site'

export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="relative mb-3 flex items-center gap-2 rounded-2xl border border-white/20 bg-rotta-darkest/95 p-3.5 pr-8 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl animate-fade-in-up">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute right-2 top-2 text-slate-400 hover:text-white"
            aria-label="Fechar aviso"
          >
            <X size={14} />
          </button>
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div>
            <p className="font-bold text-rotta-cyan">Atendimento Direto</p>
            <p className="text-[11px] text-slate-300">Converse com Douglas Rotta no WhatsApp</p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={companyInfo.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-rotta-cyan text-white shadow-glow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Falar no WhatsApp com Rotta Tecnologia"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <MessageSquare size={26} className="relative z-10 fill-current" />
      </a>
    </div>
  )
}
