import { useState } from 'react'
import {
  X,
  Printer,
  Copy,
  Check,
  QrCode,
  Barcode,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import type { ClientInvoice, ClientCompany } from '../../types/clientPortal'
import { BrandMark } from '../BrandMark'

interface AdminInvoice2aViaModalProps {
  invoice: ClientInvoice
  company?: ClientCompany
  onClose: () => void
  onShowToast: (msg: string) => void
}

export function AdminInvoice2aViaModal({
  invoice,
  company,
  onClose,
  onShowToast,
}: AdminInvoice2aViaModalProps) {
  const [copiedPix, setCopiedPix] = useState(false)
  const [copiedBarcode, setCopiedBarcode] = useState(false)

  const handleCopyPix = () => {
    navigator.clipboard.writeText(invoice.pixCode)
    setCopiedPix(true)
    onShowToast('Código PIX Copia-e-Cola copiado com sucesso!')
    setTimeout(() => setCopiedPix(false), 2500)
  }

  const handleCopyBarcode = () => {
    navigator.clipboard.writeText(invoice.barCode)
    setCopiedBarcode(true)
    onShowToast('Linha digitável do boleto copiada com sucesso!')
    setTimeout(() => setCopiedBarcode(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  const isPaid = invoice.status === 'pago'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white animate-fadeIn">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-4 print:shadow-none print:border-none print:rounded-none">
        {/* Barra Superior de Ações */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rotta-blue/20 text-rotta-blue flex items-center justify-center border border-rotta-blue/30">
              <Barcode size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">2ª Via de Fatura & Boleto de Cobrança</h3>
              <p className="text-[11px] text-slate-400">Rotta Tecnologia • Documento Auxiliar de Faturamento</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
              title="Imprimir ou Salvar PDF"
            >
              <Printer size={14} />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Conteúdo Imprimível do Documento */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-xs">
          {/* Cabeçalho Comercial */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-auto" variant="symbol" />
              <div>
                <div className="text-lg font-black tracking-tight text-rotta-navy flex items-center gap-1.5">
                  <span>ROTTA</span>
                  <span className="text-rotta-blue font-semibold text-xs">TECNOLOGIA</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Outsourcing de Impressoras, Equipamentos & Suporte em TI
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  CNPJ: 12.345.678/0001-90 • Francisco Beltrão - PR • (46) 98803-7656
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Fatura / Documento Nº:
              </span>
              <span className="text-base font-mono font-black text-slate-900 block">
                {invoice.invoiceNumber}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                  isPaid
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {isPaid ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                <span>{isPaid ? `PAGO EM ${invoice.paidAt || 'CONFIRMADO'}` : 'ABERTO / A VENCER'}</span>
              </span>
            </div>
          </div>

          {/* Dados do Cliente (Sacado) e Dados da Cobrança */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Cliente / Sacado:
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">
                {company?.name || invoice.companyName}
              </h4>
              <p className="text-slate-600 font-mono">CNPJ: {company?.cnpj || 'Consulte contrato'}</p>
              <p className="text-slate-500">
                {company?.address || 'Rua Central, 100'} • {company?.city || 'Francisco Beltrão'} -{' '}
                {company?.state || 'PR'}
              </p>
              <p className="text-slate-500">A/C: {company?.contactPerson || 'Depto Financeiro'}</p>
            </div>

            <div className="space-y-1.5 sm:text-right">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Período de Competência:
                </span>
                <p className="font-bold text-slate-900">{invoice.period}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Data de Vencimento:
                </span>
                <p className="font-extrabold text-sm text-rose-700 font-mono flex items-center sm:justify-end gap-1">
                  <Calendar size={13} />
                  <span>{invoice.dueDate}</span>
                </p>
              </div>

              <div className="pt-1 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Valor Total a Pagar:
                </span>
                <p className="text-xl font-black text-rotta-navy font-mono">
                  R$ {invoice.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Detalhamento dos Serviços Prestados */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 mb-2 uppercase tracking-wider">
              Discriminação dos Serviços de Outsourcing
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100/80 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Descrição dos Serviços</th>
                    <th className="py-2.5 px-3 text-center">Competência</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-slate-900">Locação Mensal de Parque de Impressão</p>
                      <p className="text-[11px] text-slate-500">
                        Equipamentos multifuncionais laser de alta produtividade instalados
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500">{invoice.period}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">
                      R$ {(invoice.value * 0.7).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-slate-900">Manutenção Especializada & Suporte Técnico</p>
                      <p className="text-[11px] text-slate-500">
                        SLA até {company?.slaHours || 4}h úteis com reposição de peças inclusa
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500">{invoice.period}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">
                      R$ {(invoice.value * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-slate-900">Fornecimento de Insumos & Toners</p>
                      <p className="text-[11px] text-slate-500">
                        Monitoramento contínuo de consumíveis e envio preventivo
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500">{invoice.period}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">
                      R$ {(invoice.value * 0.1).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="py-2.5 px-3 text-right">
                      Valor Líquido:
                    </td>
                    <td className="py-2.5 px-3 text-right text-sm font-mono text-rotta-navy font-black">
                      R$ {invoice.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Opções de Pagamento: PIX e Boleto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* PIX */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                  <QrCode size={15} />
                  <span>Pagamento via PIX (Liberação Instantânea)</span>
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
                  24 horas
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Pague pelo aplicativo do seu banco escaneando o QR Code ou copiando o código abaixo:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  readOnly
                  value={invoice.pixCode}
                  className="flex-1 rounded-xl bg-white border border-indigo-200 px-3 py-1.5 font-mono text-[11px] text-slate-700 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedPix ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedPix ? 'Copiado!' : 'Copiar Pix'}</span>
                </button>
              </div>
            </div>

            {/* Boleto Bancário */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Barcode size={15} />
                  <span>Boleto Bancário (Linha Digitável)</span>
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                  Compensação D+1
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Pague em qualquer canal bancário ou internet banking até o vencimento:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  readOnly
                  value={invoice.barCode}
                  className="flex-1 rounded-xl bg-white border border-slate-200 px-3 py-1.5 font-mono text-[11px] text-slate-700 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyBarcode}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-rotta-blue text-white px-3 py-1.5 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedBarcode ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedBarcode ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rodapé Interno do Documento */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>Em caso de dúvidas financeiras, contate Douglas Rotta no WhatsApp: (46) 98803-7656.</p>
            <p className="font-mono">Chave de Autenticação: {invoice.id.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
