import { useState } from 'react'
import {
  Lock,
  Building,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Crown,
  UserCheck,
} from 'lucide-react'
import { ALL_CLIENT_COMPANIES, DEFAULT_CLIENT_COMPANY } from '../../data/mockClientData'
import type { ClientCompany } from '../../types/clientPortal'
import { BrandMark } from '../BrandMark'

interface ClientLoginProps {
  onLoginClient?: (company: ClientCompany) => void
  onLoginAdmin?: () => void
  onLogin?: (company: ClientCompany) => void
  onBackToSite: () => void
}

export function ClientLogin({
  onLoginClient,
  onLoginAdmin,
  onLogin,
  onBackToSite,
}: ClientLoginProps) {
  const [activeProfile, setActiveProfile] = useState<'cliente' | 'admin'>('cliente')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleClientLogin = onLoginClient || onLogin || (() => {})
  const handleAdminLogin = onLoginAdmin || (() => {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (activeProfile === 'admin') {
      handleAdminLogin()
      return
    }

    if (!identifier.trim()) {
      setError('Por favor, informe seu CNPJ ou E-mail cadastrado.')
      return
    }

    if (!password.trim()) {
      setError('Por favor, digite sua senha de acesso.')
      return
    }

    const cleanInput = identifier.replace(/\D/g, '')
    const foundCompany = ALL_CLIENT_COMPANIES.find(
      (c) =>
        (cleanInput.length >= 8 && c.cnpj.replace(/\D/g, '').includes(cleanInput)) ||
        c.email.toLowerCase() === identifier.toLowerCase().trim() ||
        c.name.toLowerCase().includes(identifier.toLowerCase().trim())
    )
    handleClientLogin(foundCompany || DEFAULT_CLIENT_COMPANY)
  }

  const handleQuickClientDemo = (companyId: string) => {
    const company =
      ALL_CLIENT_COMPANIES.find((c) => c.id === companyId) || DEFAULT_CLIENT_COMPANY
    handleClientLogin(company)
  }

  const handleQuickAdminLogin = () => {
    handleAdminLogin()
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return
    setForgotSuccess(true)
    setTimeout(() => {
      setForgotSuccess(false)
      setShowForgotModal(false)
      setForgotEmail('')
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Botão Superior para Voltar ao Site */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-rotta-blue transition-colors rounded-xl px-3.5 py-2 hover:bg-white shadow-2xs border border-transparent hover:border-slate-200"
        >
          <ArrowLeft size={18} />
          <span>Voltar ao Site da Rotta</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          Acesso Seguro Corporativo
        </span>
      </div>

      {/* Card Principal de Login Grande e Focado */}
      <div className="max-w-xl mx-auto w-full my-auto py-4">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-2xl shadow-slate-200/80">
          {/* Logo e Título */}
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="inline-flex justify-center mb-3">
              <BrandMark className="h-12 w-auto" variant="symbol" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Portal do Cliente
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Rotta Tecnologia • Outsourcing e Gestão de TI
            </p>
          </div>

          {/* Seletor de Perfil: Cliente vs Douglas Rotta (Gestor) */}
          <div className="mt-6 p-1.5 rounded-2xl bg-slate-100 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveProfile('cliente')
                setError(null)
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeProfile === 'cliente'
                  ? 'bg-white text-rotta-navy shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building size={16} className={activeProfile === 'cliente' ? 'text-rotta-blue' : ''} />
              <span>Área do Cliente</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveProfile('admin')
                setError(null)
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeProfile === 'admin'
                  ? 'bg-rotta-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown size={16} className={activeProfile === 'admin' ? 'text-amber-400' : ''} />
              <span>Gestão Douglas Rotta</span>
            </button>
          </div>

          {/* Conteúdo para PERFIL CLIENTE */}
          {activeProfile === 'cliente' && (
            <div className="mt-6 space-y-6">
              {/* Caixa de Acesso Rápido de Demonstração */}
              <div className="rounded-2xl bg-blue-50/80 border border-blue-200/90 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rotta-blue flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Acesso Rápido Demonstrativo
                  </span>
                  <span className="text-[11px] text-slate-500">Teste sem digitar</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickClientDemo('cli-001')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-blue-200 text-left hover:border-rotta-blue hover:shadow-2xs transition-all text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">Alpha Logística</p>
                      <p className="text-[10px] text-slate-400">4 impressoras • SC</p>
                    </div>
                    <ArrowRight size={14} className="text-rotta-blue shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickClientDemo('cli-002')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-blue-200 text-left hover:border-rotta-blue hover:shadow-2xs transition-all text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">Beta Agroindustrial</p>
                      <p className="text-[10px] text-slate-400">5 impressoras • PR</p>
                    </div>
                    <ArrowRight size={14} className="text-rotta-blue shrink-0" />
                  </button>
                </div>
              </div>

              {/* Formulário de Login Tradicional */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    CNPJ ou E-mail da Empresa
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building size={18} />
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Ex: 28.914.832/0001-45 ou contato@empresa.com.br"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Senha de Acesso
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-bold text-rotta-blue hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <KeyRound size={18} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rotta-navy via-rotta-blue to-rotta-blue-dark py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-[0.99] mt-2"
                >
                  <Lock size={18} />
                  <span>Entrar na Área do Cliente</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}

          {/* Conteúdo para PERFIL GESTOR (DOUGLAS ROTTA) */}
          {activeProfile === 'admin' && (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-rotta-navy p-5 text-white space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Crown size={16} />
                  <span>Painel Master da Rotta Tecnologia</span>
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Olá, Douglas Rotta!
                </h3>
                <p className="text-xs text-slate-300">
                  Acesse para gerenciar todos os clientes corporativos, chamados técnicos, pedidos de toner, bilhetagens e faturas em tempo real.
                </p>
              </div>

              {/* Botão de 1 clique para o Douglas */}
              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-rotta-navy py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:bg-slate-900 hover:shadow-xl active:scale-[0.99]"
              >
                <UserCheck size={18} className="text-amber-400" />
                <span>Acessar como Douglas Rotta (Diretor)</span>
                <ArrowRight size={18} />
              </button>

              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Visão Completa de Todos os Clientes:
                </p>
                <p className="text-[11px] text-slate-500">
                  No painel administrativo você pode atualizar status de chamados técnicos, despachar pedidos de consumíveis, conferir contadores e alternar para a visão de qualquer cliente.
                </p>
              </div>
            </div>
          )}

          {/* Rodapé do Card com Suporte & Link Legado */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>Dúvidas de acesso? Fale com suporte.</span>
            <a
              href="https://atendimento.rottatecnologia.com.br/authentication/login"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-rotta-blue transition-colors"
            >
              <span>Acessar Desk Legado</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal Esqueci a Senha */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Recuperar Senha</h3>
            <p className="text-xs text-slate-500 mb-4">
              Informe o e-mail cadastrado da sua empresa para receber as instruções.
            </p>

            {forgotSuccess ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-800">E-mail enviado com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="exemplo@suaempresa.com.br"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:outline-none"
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-rotta-blue px-4 py-2 text-xs font-bold text-white hover:bg-rotta-blue-dark"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rodapé inferior */}
      <div className="max-w-2xl mx-auto w-full text-center text-xs text-slate-400 mt-4">
        Rotta Tecnologia • Francisco Beltrão - PR
      </div>
    </div>
  )
}
