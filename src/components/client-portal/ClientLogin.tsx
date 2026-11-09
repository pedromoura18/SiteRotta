import { useState, useEffect } from 'react'
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
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
} from 'lucide-react'
import { ALL_CLIENT_COMPANIES, DEFAULT_CLIENT_COMPANY } from '../../data/mockClientData'
import type { ClientCompany } from '../../types/clientPortal'
import { BrandMark } from '../BrandMark'
import {
  authenticateWithSecurity,
  evaluatePasswordStrength,
  checkBruteForceLockout,
} from '../../utils/cryptoAuth'

interface ClientLoginProps {
  onLoginClient?: (company: ClientCompany, token?: string) => void
  onLogin?: (company: ClientCompany, token?: string) => void
  onBackToSite: () => void
  onNavigateDirector?: () => void
}

export function ClientLogin({
  onLoginClient,
  onLogin,
  onBackToSite,
  onNavigateDirector,
}: ClientLoginProps) {
  // Campos do formulário exclusivo do cliente
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Estados de segurança e carregamento
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)

  // Modal de recuperação de senha
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)

  // Avaliação de força de senha
  const passwordStrength = evaluatePasswordStrength(password)

  // Verifica bloqueio anti-brute force a cada 1 segundo se estiver bloqueado
  useEffect(() => {
    const check = checkBruteForceLockout()
    if (check.isLocked) {
      setLockoutRemaining(check.remainingSeconds)
    }

    const timer = setInterval(() => {
      const status = checkBruteForceLockout()
      if (status.isLocked) {
        setLockoutRemaining(status.remainingSeconds)
      } else {
        setLockoutRemaining(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClientLogin = onLoginClient || onLogin || (() => {})

  // Submissão com Validação Criptográfica Real
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (lockoutRemaining > 0) {
      setError(`Acesso temporariamente bloqueado. Aguarde ${lockoutRemaining} segundos para tentar novamente.`)
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

    setIsLoading(true)

    try {
      // Autenticação com Sal Criptográfico e Hash SHA-256 (Perfil Cliente)
      const authResult = await authenticateWithSecurity(
        identifier,
        password,
        undefined,
        'client'
      )

      if (!authResult.success) {
        setError(authResult.error || 'Credenciais inválidas.')
        const status = checkBruteForceLockout()
        if (status.isLocked) {
          setLockoutRemaining(status.remainingSeconds)
        }
        setIsLoading(false)
        return
      }

      // Sucesso na autenticação corporativa
      const foundCompany =
        ALL_CLIENT_COMPANIES.find((c) => c.id === authResult.user?.companyId) ||
        DEFAULT_CLIENT_COMPANY
      handleClientLogin(foundCompany, authResult.token)
    } catch (err) {
      console.error('Erro de autenticação:', err)
      setError('Ocorreu um erro no servidor de autenticação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Preenchimento rápido para demonstração de clientes
  const handleQuickClientFill = (companyId: string) => {
    setError(null)
    if (companyId === 'cli-001') {
      setIdentifier('ti@alphalogistica.com.br')
      setPassword('alpha123')
    } else if (companyId === 'cli-002') {
      setIdentifier('compras@betaagro.com.br')
      setPassword('beta123')
    } else if (companyId === 'cli-003') {
      setIdentifier('ti@hospitalsaolucas.med.br')
      setPassword('saolucas123')
    }
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
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between selection:bg-rotta-blue selection:text-white relative">
      {/* ── Barra Superior com Botão de Voltar e Indicador de Segurança ── */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 text-xs font-semibold transition-all shadow-xs"
        >
          <ArrowLeft size={15} />
          <span>Voltar ao Site</span>
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-emerald-700 font-semibold text-[11px] shadow-xs">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Ambiente Seguro • SHA-256</span>
        </div>
      </header>

      {/* ── Conteúdo Centralizado no Meio da Página ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10 w-full">
        <div className="w-full max-w-md mx-auto">
          {/* Logo e Nome Oficial da Empresa no Topo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-3.5 mb-2">
              <BrandMark className="h-11 sm:h-12 w-auto" variant="symbol" theme="dark" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                  <span>ROTTA</span>
                  <span className="text-rotta-blue font-bold text-sm sm:text-base">TECNOLOGIA</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mt-1">
                  Outsourcing & Gestão Inteligente de TI
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3 py-0.5 text-xs font-semibold text-rotta-blue mt-1 shadow-2xs">
              <Building size={12} className="text-rotta-blue" />
              <span>Portal Corporativo do Cliente</span>
            </div>
          </div>

          {/* Card de Login Exclusivo para o Cliente */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rotta-blue via-cyan-500 to-rotta-navy" />

            <div className="mb-5 space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                Acesse sua Conta Corporativa
              </h2>
              <p className="text-xs text-slate-500">
                Acompanhe chamados, níveis de insumos, contadores e relatórios de faturamento.
              </p>
            </div>

            {/* Alerta de Erro ou Bloqueio */}
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-start gap-2 animate-fadeIn">
                <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{error}</p>
                  {lockoutRemaining > 0 && (
                    <p className="font-mono text-rose-800 font-bold mt-1">
                      Tempo restante de espera: {lockoutRemaining}s
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Formulário do Cliente */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CNPJ ou E-mail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  CNPJ ou E-mail da Empresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="ti@empresa.com.br ou CNPJ"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:outline-none focus:ring-4 focus:ring-rotta-blue/10 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Senha de Acesso
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-medium text-rotta-blue hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:outline-none focus:ring-4 focus:ring-rotta-blue/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Medidor visual de força da senha ao digitar */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-medium">Segurança da Senha:</span>
                      <span className="font-bold text-slate-700">{passwordStrength.label}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 1 ? 'bg-amber-500 w-1/4' : 'w-0'
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 2 ? 'bg-yellow-400 w-1/4' : 'w-0'
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 3 ? 'bg-blue-400 w-1/4' : 'w-0'
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 4 ? 'bg-emerald-500 w-1/4' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Lembrar sessão */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-rotta-blue focus:ring-rotta-blue/20"
                  />
                  <span>Lembrar de mim neste dispositivo</span>
                </label>
              </div>

              {/* Botão de Entrar */}
              <button
                type="submit"
                disabled={isLoading || lockoutRemaining > 0}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rotta-blue hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Entrar no Portal do Cliente</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Teste Rápido para Demonstração de Clientes */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
                <Sparkles size={12} className="text-rotta-blue" />
                Demonstração rápida (1 clique):
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickClientFill('cli-001')}
                  className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate"
                  title="Alpha Logística"
                >
                  Alpha Logística
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickClientFill('cli-002')}
                  className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate"
                  title="Beta Agro"
                >
                  Beta Agro
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickClientFill('cli-003')}
                  className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate"
                  title="Clínica São Lucas"
                >
                  São Lucas
                </button>
              </div>
            </div>

            {/* Rodapé Interno do Card */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <HelpCircle size={13} className="text-slate-400" />
                <span>Dúvidas?</span>
                <a
                  href="https://api.whatsapp.com/send?phone=5546988037656&text=Ol%C3%A1%20Douglas!%20Preciso%20de%20ajuda%20para%20acessar%20o%20Portal%20do%20Cliente%20da%20Rotta."
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-rotta-blue hover:underline"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <a
                href="https://atendimento.rottatecnologia.com.br/authentication/login"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600"
              >
                <span>Desk Legado</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Link Discreto para Área da Diretoria */}
          {onNavigateDirector && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={onNavigateDirector}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100"
                title="Acesso Exclusivo da Diretoria Rotta"
              >
                <Lock size={12} />
                <span>Acesso Restrito à Diretoria</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Modal de Esqueci Minha Senha ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Recuperar Acesso</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Informe o e-mail cadastrado na sua empresa para receber as instruções de redefinição de senha.
            </p>

            {forgotSuccess ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-1.5">
                <CheckCircle2 size={28} className="text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-emerald-800">E-mail de recuperação enviado!</p>
                <p className="text-xs text-slate-500">Verifique sua caixa de entrada e spam.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="exemplo@suaempresa.com.br"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-rotta-blue focus:outline-none"
                />

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-rotta-blue px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Rodapé Simples e Limpo ── */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        © 2016-{new Date().getFullYear()} Rotta Tecnologia • Francisco Beltrão - PR
      </footer>
    </div>
  )
}
