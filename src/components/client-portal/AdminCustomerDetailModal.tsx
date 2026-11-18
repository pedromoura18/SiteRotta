import { useState } from 'react'
import {
  X,
  FileText,
  Printer,
  Wrench,
  Package,
  DollarSign,
  Gauge,
  Building,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Eye,
  Check,
  Edit2,
  Save,
} from 'lucide-react'
import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  CounterReading,
  ClientInvoice,
  TicketStatus,
  SupplyOrderStatus,
} from '../../types/clientPortal'
import { getEquipmentImage } from '../../data/mockClientData'

interface AdminCustomerDetailModalProps {
  company: ClientCompany
  equipments: ClientEquipment[]
  tickets: ClientTicket[]
  supplies: SupplyOrder[]
  counters: CounterReading[]
  invoices: ClientInvoice[]
  onClose: () => void
  onImpersonate: (company: ClientCompany) => void
  onUpdateEquipments: (equipments: ClientEquipment[]) => void
  onUpdateCompany: (company: ClientCompany) => void
  onUpdateInvoices: (invoices: ClientInvoice[]) => void
  onUpdateTicketStatus: (ticketId: string, newStatus: TicketStatus, techNote?: string) => void
  onUpdateSupplyStatus: (orderId: string, newStatus: SupplyOrderStatus, trackingCode?: string) => void
  onView2aVia: (invoice: ClientInvoice) => void
  onShowToast: (msg: string) => void
}

type DetailTab = 'contrato' | 'equipamentos' | 'leituras' | 'chamados' | 'suprimentos' | 'financeiro'

export function AdminCustomerDetailModal({
  company,
  equipments,
  tickets,
  supplies,
  counters,
  invoices,
  onClose,
  onImpersonate,
  onUpdateEquipments,
  onUpdateCompany,
  onUpdateInvoices,
  onUpdateTicketStatus,
  onUpdateSupplyStatus,
  onView2aVia,
  onShowToast,
}: AdminCustomerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('contrato')

  // Filtragem dos dados desta empresa
  const compEquipments = equipments.filter((e) => e.companyId === company.id)
  const compTickets = tickets.filter((t) => t.companyId === company.id)
  const compSupplies = supplies.filter((s) => s.companyId === company.id)
  const compCounters = counters.filter((c) => c.companyId === company.id)
  const compInvoices = invoices.filter((i) => i.companyId === company.id)

  // Estado para Edição dos Termos do Contrato
  const [isEditingContract, setIsEditingContract] = useState(false)
  const [editMonthlyValue, setEditMonthlyValue] = useState(company.monthlyContractValue)
  const [editSlaHours, setEditSlaHours] = useState(company.slaHours)
  const [editPlan, setEditPlan] = useState(company.plan)

  // Estado para Vincular Novo Equipamento
  const [isLinkEquipmentOpen, setIsLinkEquipmentOpen] = useState(false)
  const [eqModel, setEqModel] = useState('Brother MFC-L6902DW')
  const [eqBrand, setEqBrand] = useState('Brother')
  const [eqAssetTag, setEqAssetTag] = useState(`PAT-${Math.floor(1000 + Math.random() * 9000)}`)
  const [eqSerial, setEqSerial] = useState(`BRO-${Math.floor(100000 + Math.random() * 900000)}-PR`)
  const [eqDepartment, setEqDepartment] = useState('Setor Administrativo / Central')
  const [eqIpAddress, setEqIpAddress] = useState('192.168.1.185')
  const [eqCounterMono, setEqCounterMono] = useState(0)

  // Estado para Emitir Nova Fatura
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false)
  const [invPeriod, setInvPeriod] = useState('Novembro / 2026')
  const [invDueDate, setInvDueDate] = useState('20/11/2026')
  const [invValue, setInvValue] = useState(company.monthlyContractValue || 690)

  // Estado para Notas Técnicas de Chamados
  const [ticketTechNotes, setTicketTechNotes] = useState<{ [ticketId: string]: string }>({})

  // Estado para Código de Rastreio de Suprimento
  const [supplyTrackings, setSupplyTrackings] = useState<{ [orderId: string]: string }>({})

  // Handler: Salvar Edição do Contrato
  const handleSaveContract = () => {
    const updatedCompany: ClientCompany = {
      ...company,
      monthlyContractValue: Number(editMonthlyValue),
      slaHours: Number(editSlaHours),
      plan: editPlan.trim(),
    }
    onUpdateCompany(updatedCompany)
    setIsEditingContract(false)
    onShowToast(`Contrato de ${company.name} atualizado com sucesso!`)
  }

  // Handler: Vincular Novo Equipamento à Empresa
  const handleLinkEquipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isColor = eqModel.toLowerCase().includes('color') || eqModel.toLowerCase().includes('8900')
    const isLabel = eqModel.toLowerCase().includes('zebra') || eqModel.toLowerCase().includes('elgin')

    const newEquipment: ClientEquipment = {
      id: `eq-${Date.now()}`,
      companyId: company.id,
      companyName: company.name,
      model: eqModel,
      brand: eqBrand,
      type: isLabel ? 'etiquetadora' : 'multifuncional',
      serialNumber: eqSerial.trim() || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      assetTag: eqAssetTag.trim() || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      department: eqDepartment.trim() || 'Central',
      installationDate: new Date().toLocaleDateString('pt-BR'),
      status: 'operacional',
      currentCounterMono: Number(eqCounterMono) || 0,
      currentCounterColor: isColor ? 0 : undefined,
      tonerBlack: 100,
      tonerCyan: isColor ? 100 : undefined,
      tonerMagenta: isColor ? 100 : undefined,
      tonerYellow: isColor ? 100 : undefined,
      drumLife: 100,
      ipAddress: eqIpAddress.trim() || '192.168.1.185',
      snmpStatus: 'online',
      image: getEquipmentImage(eqModel),
    }

    const updatedEquipments = [newEquipment, ...equipments]
    onUpdateEquipments(updatedEquipments)

    // Atualiza a contagem de impressoras da empresa e o plano caso estivesse aguardando
    const updatedCompany: ClientCompany = {
      ...company,
      totalPrinters: company.totalPrinters + 1,
      plan:
        company.plan === 'Aguardando Alocação de Equipamento pelo Gestor'
          ? `Locação Ativa: ${eqModel} (${newEquipment.assetTag})`
          : company.plan,
    }
    onUpdateCompany(updatedCompany)

    setIsLinkEquipmentOpen(false)
    onShowToast(`Equipamento ${newEquipment.model} (${newEquipment.assetTag}) vinculado à empresa ${company.name}!`)
  }

  // Handler: Emitir Nova Fatura
  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const year = new Date().getFullYear()

    const newInv: ClientInvoice = {
      id: `inv-${Date.now()}`,
      companyId: company.id,
      companyName: company.name,
      invoiceNumber: `FAT-${year}-${Math.floor(1000 + Math.random() * 9000)}`,
      period: invPeriod.trim(),
      dueDate: invDueDate.trim(),
      value: Number(invValue) || company.monthlyContractValue || 690,
      status: 'aberto',
      pixCode: `00020126580014br.gov.bcb.pix0136rotta-pix-${company.id}`,
      barCode: '34191.79001 01043.289148 32001.092201 1 98450000069000',
    }

    const updated = [newInv, ...invoices]
    onUpdateInvoices(updated)
    setIsNewInvoiceOpen(false)
    onShowToast(`Fatura ${newInv.invoiceNumber} emitida para ${company.name}!`)
  }

  // Handler: Alternar Status da Fatura (Pago / Aberto)
  const handleToggleInvoice = (invId: string) => {
    const updated = invoices.map((inv) => {
      if (inv.id === invId) {
        const nextStatus = inv.status === 'pago' ? ('aberto' as const) : ('pago' as const)
        return {
          ...inv,
          status: nextStatus,
          paidAt: nextStatus === 'pago' ? new Date().toLocaleDateString('pt-BR') : undefined,
        }
      }
      return inv
    })
    onUpdateInvoices(updated)
    onShowToast('Status da fatura atualizado com sucesso!')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* ── Topo do Modal ── */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rotta-blue to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {company.name}
                </h2>
                <span className="font-mono text-[10px] font-bold bg-white/10 text-cyan-300 px-2.5 py-0.5 rounded-full border border-white/10">
                  {company.contractNumber}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {company.totalPrinters > 0 ? 'Contrato Ativo' : 'Aguardando Ativação'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                CNPJ: <span className="font-mono">{company.cnpj}</span> • Responsável: {company.contactPerson} •{' '}
                {company.city} - {company.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => onImpersonate(company)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-blue hover:bg-blue-600 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Acessar o portal com a visão exata do cliente"
            >
              <Eye size={14} />
              <span>Visualizar como Cliente</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── Barra de Navegação Interna do Raio-X ── */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto shrink-0">
          {[
            { id: 'contrato', label: 'Contrato & Franquia', icon: FileText },
            { id: 'equipamentos', label: `Equipamentos (${compEquipments.length})`, icon: Printer },
            { id: 'leituras', label: `Leituras (${compCounters.length})`, icon: Gauge },
            { id: 'chamados', label: `Chamados (${compTickets.length})`, icon: Wrench },
            { id: 'suprimentos', label: `Suprimentos (${compSupplies.length})`, icon: Package },
            { id: 'financeiro', label: `Financeiro & 2ª Via (${compInvoices.length})`, icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DetailTab)}
                className={`inline-flex items-center gap-2 py-3 px-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-rotta-blue text-rotta-blue font-extrabold bg-white/60'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Conteúdo Rastreável por Aba ── */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-800 text-xs">
          {/* =========================================================================
              ABA 1: CONTRATO & DADOS CADASTRAIS
             ========================================================================= */}
          {activeTab === 'contrato' && (
            <div className="space-y-6">
              {/* Card de Resumo do Contrato */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-rotta-blue" />
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Termos Contratuais & Franquia de Impressão
                    </h3>
                  </div>

                  {!isEditingContract ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMonthlyValue(company.monthlyContractValue)
                        setEditSlaHours(company.slaHours)
                        setEditPlan(company.plan)
                        setIsEditingContract(true)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>Editar Termos</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingContract(false)}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveContract}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Save size={13} />
                        <span>Salvar</span>
                      </button>
                    </div>
                  )}
                </div>

                {isEditingContract ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200/60">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Valor Mensal da Locação (R$):
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editMonthlyValue}
                        onChange={(e) => setEditMonthlyValue(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 font-bold text-sm text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        SLA de Atendimento (Horas úteis):
                      </label>
                      <input
                        type="number"
                        value={editSlaHours}
                        onChange={(e) => setEditSlaHours(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 font-bold text-sm text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Descrição do Plano / Franquia:
                      </label>
                      <input
                        type="text"
                        value={editPlan}
                        onChange={(e) => setEditPlan(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Mensalidade:</span>
                      <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">
                        R$ {company.monthlyContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">SLA Técnico:</span>
                      <span className="text-base font-extrabold text-emerald-700 mt-0.5 block">
                        Até {company.slaHours}h úteis
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Parque Alocado:</span>
                      <span className="text-base font-extrabold text-rotta-blue mt-0.5 block">
                        {compEquipments.length} impressoras
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Gestor da Conta:</span>
                      <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                        {company.accountManager || 'Douglas Rotta'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <span className="font-bold text-slate-700 block">Escopo do Contrato de Outsourcing:</span>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>{company.plan}</strong> — Inclui locação dos equipamentos corporativos, reposição preventiva de toners e consumíveis originais, peças de desgaste mecânico (fusor, roletes, cilindros) e manutenção corretiva presencial em Francisco Beltrão e região.
                  </p>
                </div>
              </div>

              {/* Dados Cadastrais & Contato */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Building size={16} className="text-rotta-blue" />
                  <span>Dados Cadastrais & Endereço de Instalação</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2 text-slate-700">
                      <strong className="text-slate-500 w-24">Razão Social:</strong>
                      <span className="font-semibold">{company.name}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <strong className="text-slate-500 w-24">Nome Fantasia:</strong>
                      <span className="font-semibold">{company.tradeName || company.name}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <strong className="text-slate-500 w-24">CNPJ:</strong>
                      <span className="font-mono font-bold text-slate-900">{company.cnpj}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <strong className="text-slate-500 w-24">Responsável:</strong>
                      <span>{company.contactPerson}</span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2 text-slate-700">
                      <Phone size={14} className="text-slate-400" />
                      <strong className="text-slate-500 w-20">Telefone:</strong>
                      <span className="font-mono">{company.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <Mail size={14} className="text-slate-400" />
                      <strong className="text-slate-500 w-20">E-mail:</strong>
                      <span>{company.email}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <MapPin size={14} className="text-slate-400" />
                      <strong className="text-slate-500 w-20">Endereço:</strong>
                      <span>
                        {company.address} • {company.city} - {company.state}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA 2: PARQUE DE EQUIPAMENTOS LOCADOS
             ========================================================================= */}
          {activeTab === 'equipamentos' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Equipamentos Ativos na Empresa ({compEquipments.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Gerencie o hardware alocado, números de série, contadores e níveis de suprimentos.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLinkEquipmentOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-blue hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>+ Vincular Novo Equipamento</span>
                </button>
              </div>

              {/* Se a empresa não tiver equipamentos alocados */}
              {compEquipments.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 p-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                    <Printer size={28} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Nenhum equipamento alocado para esta empresa ainda
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Esta empresa foi cadastrada recentemente. Clique no botão abaixo para selecionar e vincular a impressora solicitada pelo cliente.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLinkEquipmentOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-navy hover:bg-slate-900 text-white px-4 py-2 text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Vincular Primeira Máquina Agora</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compEquipments.map((eq) => {
                    const isLowToner = eq.tonerBlack < 20
                    const hasColor = eq.tonerCyan !== undefined

                    return (
                      <div
                        key={eq.id}
                        className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-xl bg-slate-50 p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={eq.image || getEquipmentImage(eq.model || eq.id)}
                                alt={eq.model}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                <span className="font-mono text-[10px] font-bold bg-blue-50 text-rotta-blue px-2 py-0.5 rounded border border-blue-100">
                                  {eq.assetTag}
                                </span>
                                <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {eq.brand}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  SNMP Online
                                </span>
                              </div>
                              <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{eq.model}</h4>
                              <p className="text-[11px] text-slate-400 font-mono">S/N: {eq.serialNumber}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">Setor: {eq.department}</p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-500">IP na Rede:</span>
                              <span className="font-mono font-bold text-rotta-blue">{eq.ipAddress || '192.168.1.185'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Contador Mono:</span>
                              <span className="font-mono font-bold text-slate-900">
                                {eq.currentCounterMono.toLocaleString('pt-BR')} págs
                              </span>
                            </div>
                            {hasColor && (
                              <div className="flex justify-between">
                                <span className="text-cyan-700">Contador Color:</span>
                                <span className="font-mono font-bold text-cyan-800">
                                  {(eq.currentCounterColor || 0).toLocaleString('pt-BR')} págs
                                </span>
                              </div>
                            )}

                            {/* Níveis de Toner */}
                            <div className="pt-1.5 border-t border-slate-200 space-y-1">
                              <div className="flex justify-between font-bold">
                                <span>Toner Preto:</span>
                                <span className={isLowToner ? 'text-rose-600' : 'text-slate-900'}>
                                  {eq.tonerBlack}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isLowToner ? 'bg-rose-500' : 'bg-slate-900'}`}
                                  style={{ width: `${eq.tonerBlack}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 3: LEITURAS & BILHETAGEM
             ========================================================================= */}
          {activeTab === 'leituras' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Histórico de Leituras & Bilhetagem Mensal
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Registros de telemetria acumulada para cálculo de excedente de franquia.
                  </p>
                </div>
              </div>

              {compCounters.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                  <Gauge size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="font-bold">Nenhuma leitura gravada para esta empresa no momento.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    As leituras são coletadas automaticamente pelo Máquina Pro via SNMP.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Equipamento</th>
                        <th className="py-2.5 px-3">Competência</th>
                        <th className="py-2.5 px-3 text-right">Contador Mono</th>
                        <th className="py-2.5 px-3 text-right">Páginas Rodadas</th>
                        <th className="py-2.5 px-3 text-right">Data de Coleta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {compCounters.map((cnt) => {
                        const diff = cnt.monoReading - cnt.previousMonoReading
                        return (
                          <tr key={cnt.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3">
                              <span className="font-bold text-slate-900">{cnt.equipmentName}</span>
                              <span className="block font-mono text-[10px] text-slate-400">{cnt.assetTag}</span>
                            </td>
                            <td className="py-2.5 px-3 font-semibold">{cnt.period}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                              {cnt.monoReading.toLocaleString('pt-BR')}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-rotta-blue">
                              +{diff > 0 ? diff.toLocaleString('pt-BR') : 0}
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-500 font-mono text-[11px]">
                              {cnt.recordedAt}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 4: CHAMADOS TÉCNICOS & SLA
             ========================================================================= */}
          {activeTab === 'chamados' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Histórico de Chamados Técnicos ({compTickets.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Acompanhe solicitações de manutenção, atribua técnicos e informe notas de conclusão.
                  </p>
                </div>
              </div>

              {compTickets.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                  <CheckCircle2 size={24} className="mx-auto mb-2 text-emerald-500" />
                  <p className="font-bold">Nenhum chamado registrado para esta empresa.</p>
                  <p className="text-[11px] text-slate-400 mt-1">Todas as impressoras operando normalmente.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {compTickets.map((t) => {
                    const currentNote = ticketTechNotes[t.id] || ''

                    return (
                      <div
                        key={t.id}
                        className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-rotta-blue bg-blue-50 px-2 py-0.5 rounded">
                                {t.protocol}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                {t.createdAt} • Aberto por: <strong>{t.requesterName}</strong> ({t.requesterPhone})
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 mt-1">{t.title}</h4>
                            <p className="text-[11px] text-slate-600">{t.description}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={t.status}
                              onChange={(e) => {
                                onUpdateTicketStatus(t.id, e.target.value as TicketStatus, currentNote)
                                setTicketTechNotes({ ...ticketTechNotes, [t.id]: '' })
                                onShowToast('Status do chamado atualizado!')
                              }}
                              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option value="aberto">Aberto</option>
                              <option value="em_atendimento">Em Atendimento</option>
                              <option value="aguardando_peca">Aguardando Peça</option>
                              <option value="concluido">Concluído</option>
                            </select>
                          </div>
                        </div>

                        {/* Campo de Nota Técnica do Douglas */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={currentNote}
                            onChange={(e) =>
                              setTicketTechNotes({ ...ticketTechNotes, [t.id]: e.target.value })
                            }
                            placeholder="Adicionar nota técnica para o cliente (ex: Técnico a caminho ou peça trocada)..."
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!currentNote.trim()) return
                              onUpdateTicketStatus(t.id, t.status, currentNote)
                              setTicketTechNotes({ ...ticketTechNotes, [t.id]: '' })
                              onShowToast('Nota técnica registrada com sucesso!')
                            }}
                            className="rounded-xl bg-slate-900 hover:bg-rotta-blue text-white px-3 py-1.5 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                          >
                            Gravar Nota
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 5: SUPRIMENTOS & PEDIDOS
             ========================================================================= */}
          {activeTab === 'suprimentos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Histórico de Pedidos de Suprimentos ({compSupplies.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Acompanhe envios de toner, informe códigos de rastreamento e finalize entregas.
                  </p>
                </div>
              </div>

              {compSupplies.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                  <Package size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="font-bold">Nenhum pedido de suprimento pendente para esta empresa.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {compSupplies.map((s) => {
                    const currentTracking = supplyTrackings[s.id] ?? s.trackingCode ?? ''

                    return (
                      <div
                        key={s.id}
                        className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                                {s.code}
                              </span>
                              <span className="text-xs text-slate-500">{s.createdAt}</span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 mt-1">{s.equipmentName}</h4>
                            <p className="text-xs text-slate-600">
                              Itens:{' '}
                              <strong>
                                {s.items.map((i) => `${i.quantity}x ${i.itemName}`).join(', ')}
                              </strong>
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Destino: {s.deliveryAddress}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={s.status}
                              onChange={(e) => {
                                onUpdateSupplyStatus(
                                  s.id,
                                  e.target.value as SupplyOrderStatus,
                                  currentTracking
                                )
                                onShowToast('Status do pedido atualizado!')
                              }}
                              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option value="solicitado">Solicitado</option>
                              <option value="separacao">Em Separação</option>
                              <option value="em_transito">Em Trânsito (Despachado)</option>
                              <option value="entregue">Entregue</option>
                            </select>
                          </div>
                        </div>

                        {/* Campo de Rastreamento */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={currentTracking}
                            onChange={(e) =>
                              setSupplyTrackings({ ...supplyTrackings, [s.id]: e.target.value })
                            }
                            placeholder="Código de Rastreamento / Expedição (ex: ROT-EXP-8891)..."
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateSupplyStatus(s.id, s.status, currentTracking)
                              onShowToast('Código de rastreamento salvo!')
                            }}
                            className="rounded-xl bg-slate-900 hover:bg-rotta-blue text-white px-3 py-1.5 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                          >
                            Salvar Rastreio
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 6: FINANCEIRO & 2ª VIA DE FATURAS
             ========================================================================= */}
          {activeTab === 'financeiro' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Faturas & 2ª Via da Empresa ({compInvoices.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Consulte faturas emitidas, emita 2ª via com boleto/Pix ou gere uma nova cobrança mensal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewInvoiceOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>+ Emitir Nova Fatura</span>
                </button>
              </div>

              {compInvoices.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                  <DollarSign size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="font-bold">Nenhuma fatura emitida para esta empresa ainda.</p>
                  <button
                    type="button"
                    onClick={() => setIsNewInvoiceOpen(true)}
                    className="mt-3 inline-flex items-center gap-1 rounded-xl bg-rotta-blue text-white px-3.5 py-1.5 text-xs font-bold"
                  >
                    Emitir Primeira Fatura
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3.5">Fatura Nº</th>
                        <th className="py-2.5 px-3.5">Competência</th>
                        <th className="py-2.5 px-3.5">Vencimento</th>
                        <th className="py-2.5 px-3.5 text-right">Valor</th>
                        <th className="py-2.5 px-3.5 text-center">Status</th>
                        <th className="py-2.5 px-3.5 text-right">Ações Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {compInvoices.map((inv) => {
                        const isPaid = inv.status === 'pago'

                        return (
                          <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                              {inv.invoiceNumber}
                            </td>
                            <td className="py-3 px-3.5 font-semibold text-slate-700">{inv.period}</td>
                            <td className="py-3 px-3.5 font-mono text-slate-600">{inv.dueDate}</td>
                            <td className="py-3 px-3.5 text-right font-mono font-black text-slate-900">
                              R$ {inv.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-3.5 text-center">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isPaid
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {isPaid ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                                <span>{isPaid ? 'Pago' : 'Aberto'}</span>
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-right space-x-1.5">
                              {/* Botão Ver 2ª Via */}
                              <button
                                type="button"
                                onClick={() => onView2aVia(inv)}
                                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-rotta-blue px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Visualizar e Imprimir 2ª Via"
                              >
                                <FileText size={12} />
                                <span>2ª Via</span>
                              </button>

                              {/* Alternar Status (Pago / Aberto) */}
                              <button
                                type="button"
                                onClick={() => handleToggleInvoice(inv.id)}
                                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                                  isPaid
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                <Check size={12} />
                                <span>{isPaid ? 'Reabrir' : 'Dar Baixa'}</span>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL INTERNO: VINCULAR NOVO EQUIPAMENTO ── */}
      {isLinkEquipmentOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Printer size={18} className="text-rotta-blue" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Vincular Equipamento a {company.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkEquipmentOpen(false)}
                className="rounded-xl p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleLinkEquipmentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Modelo da Impressora / Multifuncional *</label>
                <select
                  value={eqModel}
                  onChange={(e) => {
                    const m = e.target.value
                    setEqModel(m)
                    if (m.includes('Brother')) setEqBrand('Brother')
                    else if (m.includes('Kyocera')) setEqBrand('Kyocera')
                    else if (m.includes('HP')) setEqBrand('HP')
                    else if (m.includes('Zebra')) setEqBrand('Zebra')
                    else if (m.includes('Elgin')) setEqBrand('Elgin')
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none"
                >
                  <option value="Brother MFC-L6902DW">Brother MFC-L6902DW (Laser Monocromática 52 ppm)</option>
                  <option value="Kyocera ECOSYS M3655idn">Kyocera ECOSYS M3655idn (Pesada Industrial 55 ppm)</option>
                  <option value="Brother DCP-L5652DN">Brother DCP-L5652DN (Laser Monocromática 42 ppm)</option>
                  <option value="Brother MFC-L8900CDW Color">Brother MFC-L8900CDW (Laser Colorida 33 ppm)</option>
                  <option value="HP LaserJet Pro M404n">HP LaserJet Pro M404n (Monocromática 40 ppm)</option>
                  <option value="Zebra ZD220 Térmica">Zebra ZD220 (Térmica de Etiquetas / Logística)</option>
                  <option value="Elgin i9 Full">Elgin i9 Full (Térmica de Cupom Não Fiscal)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patrimônio (Tag) *</label>
                  <input
                    type="text"
                    required
                    value={eqAssetTag}
                    onChange={(e) => setEqAssetTag(e.target.value)}
                    placeholder="PAT-1080"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Número de Série (S/N) *</label>
                  <input
                    type="text"
                    required
                    value={eqSerial}
                    onChange={(e) => setEqSerial(e.target.value)}
                    placeholder="BRO-99120-PR"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setor / Departamento de Instalação</label>
                  <input
                    type="text"
                    value={eqDepartment}
                    onChange={(e) => setEqDepartment(e.target.value)}
                    placeholder="Recepção, Faturamento, etc."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Endereço IP na Rede do Cliente</label>
                  <input
                    type="text"
                    value={eqIpAddress}
                    onChange={(e) => setEqIpAddress(e.target.value)}
                    placeholder="192.168.1.185"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contador Inicial de Instalação</label>
                <input
                  type="number"
                  value={eqCounterMono}
                  onChange={(e) => setEqCounterMono(Number(e.target.value))}
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLinkEquipmentOpen(false)}
                  className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rotta-blue hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
                >
                  Confirmar Vínculo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL INTERNO: EMITIR NOVA FATURA ── */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">Emitir Nova Fatura de Locação</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewInvoiceOpen(false)}
                className="rounded-xl p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mês de Competência *</label>
                <input
                  type="text"
                  required
                  value={invPeriod}
                  onChange={(e) => setInvPeriod(e.target.value)}
                  placeholder="Novembro / 2026"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Data de Vencimento *</label>
                  <input
                    type="text"
                    required
                    value={invDueDate}
                    onChange={(e) => setInvDueDate(e.target.value)}
                    placeholder="20/11/2026"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor da Mensalidade (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={invValue}
                    onChange={(e) => setInvValue(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono font-bold text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewInvoiceOpen(false)}
                  className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
                >
                  Emitir Cobrança
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
