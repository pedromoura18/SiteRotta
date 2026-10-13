import { useState } from 'react'
import {
  Copy,
  Check,
  Download,
  CheckCircle2,
  Clock,
  QrCode,
} from 'lucide-react'
import type { ClientInvoice } from '../../types/clientPortal'

interface ClientInvoicesProps {
  invoices: ClientInvoice[]
  onShowToast: (msg: string) => void
}

export function ClientInvoices({ invoices, onShowToast }: ClientInvoicesProps) {
  const [copiedPixId, setCopiedPixId] = useState<string | null>(null)
  const [copiedBarId, setCopiedBarId] = useState<string | null>(null)

  const handleCopyPix = (inv: ClientInvoice) => {
    navigator.clipboard.writeText(inv.pixCode)
    setCopiedPixId(inv.id)
    onShowToast(`Código Pix Copia e Cola da fatura ${inv.invoiceNumber} copiado!`)
    setTimeout(() => setCopiedPixId(null), 2500)
  }

  const handleCopyBar = (inv: ClientInvoice) => {
    navigator.clipboard.writeText(inv.barCode)
    setCopiedBarId(inv.id)
    onShowToast(`Linha digitável do boleto da fatura ${inv.invoiceNumber} copiada!`)
    setTimeout(() => setCopiedBarId(null), 2500)
  }

  const handleDownloadInvoice = (inv: ClientInvoice) => {
    // Simular download de PDF oficial criando documento simples para download
    const content = `=====================================================
ROTTA TECNOLOGIA - DEMONSTRATIVO DE FATURA
=====================================================
Fatura: ${inv.invoiceNumber}
Mês de Referência: ${inv.period}
Vencimento: ${inv.dueDate}
Valor Total: R$ ${inv.value.toFixed(2)}
Status: ${inv.status.toUpperCase()}

Código Pix Copia e Cola:
${inv.pixCode}

Linha Digitável do Boleto:
${inv.barCode}

Rotta Tecnologia • CNPJ: 24.590.871/0001-90
Telefone: (47) 3451-8200 • Joinville - SC
=====================================================`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Fatura_${inv.invoiceNumber}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    onShowToast(`Download da 2ª via da fatura ${inv.invoiceNumber} iniciado!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Faturas & 2ª Via Financeira
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Consulte o histórico de mensalidades da sua locação, copie chaves Pix e baixe boletos.
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 text-xs font-bold text-emerald-800 self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-600" />
          <span>Faturamento em Dia</span>
        </div>
      </div>

      {/* Lista de Faturas */}
      <div className="space-y-4">
        {invoices.map((inv) => {
          const isOpen = inv.status === 'aberto'
          const isPaid = inv.status === 'pago'

          return (
            <div
              key={inv.id}
              className={`rounded-3xl bg-white p-6 border transition-all ${
                isOpen
                  ? 'border-rotta-blue/40 shadow-md shadow-blue-50/50'
                  : 'border-slate-200/90 shadow-2xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                      {inv.invoiceNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isPaid
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle2 size={12} />
                          <span>Pago ({inv.paidAt})</span>
                        </>
                      ) : (
                        <>
                          <Clock size={12} />
                          <span>Aberto / A Vencer</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Locação de Hardwares & Serviços • {inv.period}
                  </h3>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 block">Valor da Fatura:</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    R$ {inv.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    Vencimento: <strong className="text-slate-800">{inv.dueDate}</strong>
                  </span>
                </div>
              </div>

              {/* Ações Rápidas de Pagamento / Download */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {isOpen && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCopyPix(inv)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 text-xs font-bold hover:bg-emerald-100 transition-colors"
                      >
                        {copiedPixId === inv.id ? (
                          <>
                            <Check size={14} className="text-emerald-600" />
                            <span>Código Pix Copiado!</span>
                          </>
                        ) : (
                          <>
                            <QrCode size={14} className="text-emerald-600" />
                            <span>Pagar com Pix (Copia e Cola)</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyBar(inv)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 text-xs font-bold hover:bg-slate-100 transition-colors"
                      >
                        {copiedBarId === inv.id ? (
                          <>
                            <Check size={14} className="text-rotta-blue" />
                            <span>Código Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="text-slate-500" />
                            <span>Copiar Linha do Boleto</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadInvoice(inv)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-rotta-blue hover:text-rotta-blue transition-colors shadow-2xs self-end sm:self-auto"
                >
                  <Download size={14} />
                  <span>Baixar 2ª Via (PDF)</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
