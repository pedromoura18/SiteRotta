import { useState } from 'react'
import {
  LayoutDashboard,
  Wrench,
  Package,
  Printer,
  Gauge,
  DollarSign,
  LogOut,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { BrandMark } from '../BrandMark'
import { ClientLogin } from './ClientLogin'
import { ClientDashboard } from './ClientDashboard'
import { ClientTickets } from './ClientTickets'
import { ClientNewTicketModal } from './ClientNewTicketModal'
import { ClientTicketDetailModal } from './ClientTicketDetailModal'
import { ClientEquipments } from './ClientEquipments'
import { ClientSupplies } from './ClientSupplies'
import { ClientNewSupplyModal } from './ClientNewSupplyModal'
import { ClientCounters } from './ClientCounters'
import { ClientInvoices } from './ClientInvoices'

import { AdminDashboard } from './AdminDashboard'
import {
  ALL_CLIENT_COMPANIES,
  getPortalSession,
  savePortalSession,
  getClientTickets,
  saveClientTickets,
  getClientEquipments,
  saveClientEquipments,
  getClientSupplies,
  saveClientSupplies,
  getClientCounters,
  saveClientCounters,
  getClientInvoices,
} from '../../data/mockClientData'

import type {
  ClientCompany,
  ClientEquipment,
  ClientTicket,
  SupplyOrder,
  CounterReading,
  ClientInvoice,
  PortalSession,
  TicketStatus,
  SupplyOrderStatus,
} from '../../types/clientPortal'

export type PortalTab =
  | 'dashboard'
  | 'chamados'
  | 'equipamentos'
  | 'suprimentos'
  | 'contadores'
  | 'financeiro'

interface ClientPortalPageProps {
  onNavigateHome: () => void
}

export function ClientPortalPage({ onNavigateHome }: ClientPortalPageProps) {
  // Estado de Autenticação (Sessão do Portal)
  const [session, setSession] = useState<PortalSession | null>(() => getPortalSession())
  const company = session?.company || null

  // Aba ativa
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard')

  // Dados do Cliente
  const [equipments, setEquipments] = useState<ClientEquipment[]>(() => getClientEquipments())
  const [tickets, setTickets] = useState<ClientTicket[]>(() => getClientTickets())
  const [supplies, setSupplies] = useState<SupplyOrder[]>(() => getClientSupplies())
  const [counters, setCounters] = useState<CounterReading[]>(() => getClientCounters())
  const [invoices] = useState<ClientInvoice[]>(() => getClientInvoices())

  // Modais
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [preselectedEqForTicket, setPreselectedEqForTicket] = useState<string | undefined>()

  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<ClientTicket | null>(null)

  const [isNewSupplyOpen, setIsNewSupplyOpen] = useState(false)
  const [preselectedEqForSupply, setPreselectedEqForSupply] = useState<string | undefined>()

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3500)
  }

  // Handlers de Login / Logout
  const handleLoginClient = (loggedCompany: ClientCompany) => {
    const newSession: PortalSession = {
      role: 'client',
      company: loggedCompany,
      adminName: 'Douglas Rotta',
    }
    setSession(newSession)
    savePortalSession(newSession)
    showToast(`Bem-vindo ao Portal do Cliente, ${loggedCompany.name}!`)
  }

  const handleLoginAdmin = () => {
    const newSession: PortalSession = {
      role: 'admin',
      company: ALL_CLIENT_COMPANIES[0],
      adminName: 'Douglas Rotta',
    }
    setSession(newSession)
    savePortalSession(newSession)
    showToast('Bem-vindo, Douglas Rotta! Painel Master ativado.')
  }

  const handleLogout = () => {
    setSession(null)
    savePortalSession(null)
  }

  // Handler de atualização de chamado pelo Douglas Rotta (Admin)
  const handleUpdateTicketStatus = (ticketId: string, newStatus: TicketStatus, techNote?: string) => {
    const nowFormatted = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        const newUpdates = [...t.updates]
        if (techNote && techNote.trim()) {
          newUpdates.push({
            id: `up-${Date.now()}`,
            date: nowFormatted,
            author: 'Douglas Rotta (Diretor Técnico)',
            role: 'tecnico' as const,
            text: techNote.trim(),
          })
        }
        return {
          ...t,
          status: newStatus,
          updates: newUpdates,
        }
      }
      return t
    })
    setTickets(updated)
    saveClientTickets(updated)
    showToast('Status do chamado atualizado com sucesso!')
  }

  // Handler de atualização de pedido de suprimento pelo Douglas Rotta (Admin)
  const handleUpdateSupplyStatus = (orderId: string, newStatus: SupplyOrderStatus, trackingCode?: string) => {
    const updated = supplies.map((s) => {
      if (s.id === orderId) {
        return {
          ...s,
          status: newStatus,
          trackingCode: trackingCode || s.trackingCode,
        }
      }
      return s
    })
    setSupplies(updated)
    saveClientSupplies(updated)
    showToast('Pedido de suprimento atualizado com sucesso!')
  }

  // Handlers de Chamados
  const handleCreateTicket = (newTicket: ClientTicket) => {
    const updated = [newTicket, ...tickets]
    setTickets(updated)
    saveClientTickets(updated)
    showToast(`Chamado ${newTicket.protocol} registrado com sucesso!`)
  }

  const handleAddTicketMessage = (ticketId: string, message: string) => {
    const nowFormatted = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          updates: [
            ...t.updates,
            {
              id: `up-${Date.now()}`,
              date: nowFormatted,
              author: company ? company.contactPerson : 'Cliente',
              role: 'cliente' as const,
              text: message,
            },
          ],
        }
      }
      return t
    })

    setTickets(updated)
    saveClientTickets(updated)

    // Atualiza modal se estiver aberto
    if (selectedTicketForDetail && selectedTicketForDetail.id === ticketId) {
      setSelectedTicketForDetail(updated.find((t) => t.id === ticketId) || null)
    }

    showToast('Mensagem enviada com sucesso!')
  }

  // Handlers de Suprimentos
  const handleCreateSupplyOrder = (newOrder: SupplyOrder) => {
    const updated = [newOrder, ...supplies]
    setSupplies(updated)
    saveClientSupplies(updated)
    showToast(`Pedido de suprimento ${newOrder.code} gerado com sucesso!`)
  }

  // Handlers de Contadores
  const handleSubmitCounters = (newReadings: CounterReading[]) => {
    const updatedCounters = [...newReadings, ...counters]
    setCounters(updatedCounters)
    saveClientCounters(updatedCounters)

    // Atualiza contador atual nos equipamentos
    const updatedEquipments = equipments.map((eq) => {
      const found = newReadings.find((r) => r.equipmentId === eq.id)
      if (found) {
        return {
          ...eq,
          currentCounterMono: found.monoReading,
          currentCounterColor: found.colorReading ?? eq.currentCounterColor,
        }
      }
      return eq
    })
    setEquipments(updatedEquipments)
    saveClientEquipments(updatedEquipments)

    showToast('Leituras mensais transmitidas e gravadas com sucesso!')
  }

  // Quick action de suprimento vindo da tela de equipamentos
  const handleRequestSupplyFromEquipment = (eqId: string) => {
    setPreselectedEqForSupply(eqId)
    setIsNewSupplyOpen(true)
  }

  // Quick action de chamado vindo da tela de equipamentos
  const handleOpenTicketFromEquipment = (eqId: string) => {
    setPreselectedEqForTicket(eqId)
    setIsNewTicketOpen(true)
  }

  // Se não estiver logado, exibe tela de login
  if (!session || !company) {
    return (
      <ClientLogin
        onLoginClient={handleLoginClient}
        onLoginAdmin={handleLoginAdmin}
        onBackToSite={onNavigateHome}
      />
    )
  }

  // Se o perfil logado for ADMIN (Douglas Rotta), renderiza o Painel Master
  if (session.role === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-rotta-navy pb-16">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="flex items-center gap-2 group text-left"
                  title="Voltar para a página principal da Rotta"
                >
                  <BrandMark className="h-9 w-auto" variant="symbol" />
                  <div className="hidden sm:block">
                    <div className="text-base font-black tracking-tight text-rotta-navy flex items-center gap-1.5">
                      <span>ROTTA</span>
                      <span className="text-rotta-blue font-semibold text-xs">TECNOLOGIA</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Painel Master • Douglas Rotta
                    </span>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:text-rotta-blue hover:border-slate-300 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">Site Principal</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/60 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                  title="Sair da conta"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex-1">
          <AdminDashboard
            companies={ALL_CLIENT_COMPANIES}
            equipments={equipments}
            tickets={tickets}
            supplies={supplies}
            counters={counters}
            invoices={invoices}
            onImpersonateCompany={(comp) => {
              const s: PortalSession = { role: 'client', company: comp, adminName: 'Douglas Rotta' }
              setSession(s)
              savePortalSession(s)
              showToast(`Visualizando portal como: ${comp.name}`)
            }}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onUpdateSupplyStatus={handleUpdateSupplyStatus}
            onShowToast={showToast}
          />
        </main>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
            <div className="rounded-2xl bg-slate-900 text-white px-5 py-3 shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  const openTicketsCount = tickets.filter((t) => t.status !== 'concluido').length

  const tabs: { id: PortalTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'chamados', label: 'Chamados', icon: Wrench, badge: openTicketsCount },
    { id: 'equipamentos', label: 'Equipamentos', icon: Printer },
    { id: 'suprimentos', label: 'Suprimentos', icon: Package },
    { id: 'contadores', label: 'Lançar Contadores', icon: Gauge },
    { id: 'financeiro', label: 'Faturas & 2ª Via', icon: DollarSign },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-rotta-navy pb-16">
      {/* Faixa de Retorno se Douglas Rotta estiver simulando visão do cliente */}
      {session.adminName && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider">
              Visão do Gestor
            </span>
            <span>
              Visualizando portal de: <strong>{company.name}</strong> ({session.adminName})
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const s: PortalSession = { role: 'admin', company, adminName: 'Douglas Rotta' }
              setSession(s)
              savePortalSession(s)
            }}
            className="rounded-lg bg-slate-900 text-white hover:bg-slate-800 px-3 py-1 text-xs font-bold transition-colors cursor-pointer"
          >
            ← Voltar ao Painel Master do Douglas
          </button>
        </div>
      )}

      {/* ─── Topbar do Portal do Cliente ─── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Logo Rotta + Badge Área do Cliente */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="flex items-center gap-2 group text-left"
                title="Voltar para a página principal da Rotta"
              >
                <BrandMark className="h-9 w-auto" variant="symbol" />
                <div className="hidden sm:block">
                  <div className="text-base font-black tracking-tight text-rotta-navy flex items-center gap-1.5">
                    <span>ROTTA</span>
                    <span className="text-rotta-blue font-semibold text-xs">TECNOLOGIA</span>
                  </div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rotta-blue bg-blue-50 px-2 py-0.5 rounded-full">
                    Portal do Cliente
                  </span>
                </div>
              </button>
            </div>

            {/* Informações da Empresa Logada */}
            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-rotta-blue text-white flex items-center justify-center font-bold text-xs shrink-0">
                {company.name.charAt(0)}
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight line-clamp-1">{company.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">CNPJ: {company.cnpj}</p>
              </div>
            </div>

            {/* Ações: Voltar ao site & Logout */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:text-rotta-blue hover:border-slate-300 transition-colors"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Site Principal</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/60 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                title="Sair da conta"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>

          {/* Navegação por Abas Horizontal */}
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 py-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-rotta-blue text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-white text-rotta-blue' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* ─── Conteúdo Principal da Aba ─── */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex-1">
        {activeTab === 'dashboard' && (
          <ClientDashboard
            company={company}
            equipments={equipments}
            tickets={tickets}
            supplies={supplies}
            invoices={invoices}
            onOpenNewTicket={() => {
              setPreselectedEqForTicket(undefined)
              setIsNewTicketOpen(true)
            }}
            onOpenNewSupply={() => {
              setPreselectedEqForSupply(undefined)
              setIsNewSupplyOpen(true)
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectTicket={(ticket) => setSelectedTicketForDetail(ticket)}
          />
        )}

        {activeTab === 'chamados' && (
          <ClientTickets
            tickets={tickets}
            onOpenNewTicket={() => {
              setPreselectedEqForTicket(undefined)
              setIsNewTicketOpen(true)
            }}
            onSelectTicket={(ticket) => setSelectedTicketForDetail(ticket)}
          />
        )}

        {activeTab === 'equipamentos' && (
          <ClientEquipments
            equipments={equipments}
            onRequestSupplyForEquipment={handleRequestSupplyFromEquipment}
            onOpenTicketForEquipment={handleOpenTicketFromEquipment}
          />
        )}

        {activeTab === 'suprimentos' && (
          <ClientSupplies
            supplies={supplies}
            onOpenNewSupply={() => {
              setPreselectedEqForSupply(undefined)
              setIsNewSupplyOpen(true)
            }}
          />
        )}

        {activeTab === 'contadores' && (
          <ClientCounters
            equipments={equipments}
            counters={counters}
            onSubmitCounters={handleSubmitCounters}
          />
        )}

        {activeTab === 'financeiro' && (
          <ClientInvoices invoices={invoices} onShowToast={showToast} />
        )}
      </main>

      {/* ─── Modais do Portal ─── */}
      <ClientNewTicketModal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
        equipments={equipments}
        preselectedEquipmentId={preselectedEqForTicket}
        onSubmit={handleCreateTicket}
      />

      <ClientTicketDetailModal
        ticket={selectedTicketForDetail}
        onClose={() => setSelectedTicketForDetail(null)}
        onAddMessage={handleAddTicketMessage}
      />

      <ClientNewSupplyModal
        isOpen={isNewSupplyOpen}
        onClose={() => setIsNewSupplyOpen(false)}
        company={company}
        equipments={equipments}
        preselectedEquipmentId={preselectedEqForSupply}
        onSubmit={handleCreateSupplyOrder}
      />

      {/* ─── Notificação Toast Flutuante ─── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="rounded-2xl bg-slate-900 text-white px-5 py-3 shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
