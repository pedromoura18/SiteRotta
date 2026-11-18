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
  UserPlus,
  LogIn,
  User,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
} from 'lucide-react'
import {
  getAllClientCompanies,
  DEFAULT_CLIENT_COMPANY,
  registerNewCompanyAndSetup,
} from '../../data/mockClientData'
import type { ClientCompany } from '../../types/clientPortal'
import { BrandMark } from '../BrandMark'
import {
  authenticateWithSecurity,
  evaluatePasswordStrength,
  checkBruteForceLockout,
  saveNewRegisteredUser,
  generateSessionToken,
  requestPasswordReset,
  verifyPasswordResetCode,
  completePasswordReset,
} from '../../utils/cryptoAuth'

interface ClientLoginProps {
  onLoginClient?: (company: ClientCompany, token?: string) => void
  onLogin?: (company: ClientCompany, token?: string) => void
  onLoginAdmin?: (token?: string) => void
  onBackToSite: () => void
}

export function ClientLogin({
  onLoginClient,
  onLogin,
  onLoginAdmin,
  onBackToSite,
}: ClientLoginProps) {
  // Alternância entre Login e Registro
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  // Campos de Login
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Campos de Registro de Empresa
  const [regCompanyName, setRegCompanyName] = useState('')
  const [regTradeName, setRegTradeName] = useState('')
  const [regCnpjCpf, setRegCnpjCpf] = useState('')
  const [regContactPerson, setRegContactPerson] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regCity, setRegCity] = useState('Francisco Beltrão')
  const [regState, setRegState] = useState('PR')
  const [regAddress, setRegAddress] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [regShowPassword, setRegShowPassword] = useState(false)

  // Estados de segurança e carregamento
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)

  // Modal de Recuperação de Senha Segura (Multi-Etapas)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [resetStep, setResetStep] = useState<1 | 2 | 3 | 4>(1)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMaskedEmail, setResetMaskedEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [resetSimulatedCode, setResetSimulatedCode] = useState('')
  const [resetCodeInput, setResetCodeInput] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')
  const [resetConfirmPassword, setResetConfirmPassword] = useState('')
  const [resetShowPassword, setResetShowPassword] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetIsLoading, setResetIsLoading] = useState(false)

  // Avaliação de força de senha
  const currentPasswordForStrength = authMode === 'login' ? password : regPassword
  const passwordStrength = evaluatePasswordStrength(currentPasswordForStrength)

  // Formatação automática de CNPJ / CPF
  const handleCnpjCpfChange = (val: string) => {
    const raw = val.replace(/\D/g, '')
    if (raw.length <= 11) {
      // CPF: 000.000.000-00
      const formatted = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      setRegCnpjCpf(formatted)
    } else {
      // CNPJ: 00.000.000/0000-00
      const formatted = raw
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      setRegCnpjCpf(formatted)
    }
  }

  // Formatação automática de telefone com DDD
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11)
    if (raw.length <= 10) {
      setRegPhone(raw.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, ''))
    } else {
      setRegPhone(raw.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, ''))
    }
  }

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

  // Submissão de Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

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
      const authResult = await authenticateWithSecurity(
        identifier,
        password,
        undefined,
        'auto'
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

      // Se for Administrador Master (Douglas Rotta)
      if (authResult.role === 'admin' || authResult.user?.role === 'admin') {
        setSuccessMessage('Acesso Master de Administrador reconhecido! Abrindo Painel Gerencial...')
        setTimeout(() => {
          if (onLoginAdmin) {
            onLoginAdmin(authResult.token)
          }
        }, 500)
        return
      }

      const allCompanies = getAllClientCompanies()
      const foundCompany =
        allCompanies.find((c) => c.id === authResult.user?.companyId) ||
        DEFAULT_CLIENT_COMPANY
      handleClientLogin(foundCompany, authResult.token)
    } catch (err) {
      console.error('Erro de autenticação:', err)
      setError('Ocorreu um erro no servidor de autenticação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Submissão de Registro de Nova Empresa
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!regCompanyName.trim()) {
      setError('Por favor, informe a Razão Social ou Nome da sua empresa.')
      return
    }

    if (!regCnpjCpf.trim()) {
      setError('Por favor, informe o CNPJ ou CPF da sua empresa.')
      return
    }

    if (!regContactPerson.trim()) {
      setError('Por favor, informe o nome do responsável pelo contato.')
      return
    }

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setError('Por favor, informe um e-mail corporativo válido.')
      return
    }

    if (!regPhone.trim()) {
      setError('Por favor, informe o telefone ou WhatsApp com DDD.')
      return
    }

    if (!regPassword || regPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (regPassword !== regConfirmPassword) {
      setError('As senhas digitadas não coincidem.')
      return
    }

    setIsLoading(true)

    try {
      // 1. Cria a nova empresa e configura o hardware inicial no mock de dados
      const setupResult = registerNewCompanyAndSetup({
        name: regCompanyName.trim(),
        tradeName: regTradeName.trim() || regCompanyName.trim(),
        cnpj: regCnpjCpf.trim(),
        contactPerson: regContactPerson.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim(),
        city: regCity.trim(),
        state: regState.trim(),
        address: regAddress.trim(),
      })

      // 2. Salva o usuário no banco de credenciais com Salt e SHA-256
      await saveNewRegisteredUser({
        identifier: regEmail.trim().toLowerCase(),
        name: regContactPerson.trim(),
        companyId: setupResult.company.id,
        rawPassword: regPassword,
      })

      // 3. Gera token de sessão seguro
      const token = await generateSessionToken({
        userId: `user-${setupResult.company.id}`,
        role: 'client',
        companyId: setupResult.company.id,
      })

      setSuccessMessage('Empresa cadastrada com sucesso! Inicializando portal...')

      // 4. Loga o cliente automaticamente e abre o portal
      setTimeout(() => {
        handleClientLogin(setupResult.company, token)
      }, 700)
    } catch (err) {
      console.error('Erro no cadastro:', err)
      setError('Não foi possível concluir o cadastro da empresa. Tente novamente.')
      setIsLoading(false)
    }
  }

  // Preenchimento rápido para demonstração de clientes
  const handleQuickClientFill = (companyId: string) => {
    setAuthMode('login')
    setError(null)
    setSuccessMessage(null)
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

  const resetPasswordStrength = evaluatePasswordStrength(resetNewPassword)

  // Handlers do Modal de Recuperação de Senha
  const handleOpenForgotModal = () => {
    setResetStep(1)
    setResetEmail(identifier.includes('@') ? identifier : '')
    setResetError(null)
    setResetCodeInput('')
    setResetNewPassword('')
    setResetConfirmPassword('')
    setShowForgotModal(true)
  }

  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)
    setResetIsLoading(true)

    setTimeout(() => {
      const res = requestPasswordReset(resetEmail)
      setResetIsLoading(false)
      if (!res.success) {
        setResetError(res.error || 'Erro ao localizar conta.')
        return
      }

      setResetToken(res.token || '')
      setResetMaskedEmail(res.maskedEmail || resetEmail)
      setResetSimulatedCode(res.code || '')
      setResetStep(2)
    }, 400)
  }

  const handleVerifyResetCode = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)

    if (resetCodeInput.trim().length !== 6) {
      setResetError('O código de segurança deve ter exatamente 6 dígitos.')
      return
    }

    setResetIsLoading(true)
    setTimeout(() => {
      const res = verifyPasswordResetCode(resetToken, resetCodeInput)
      setResetIsLoading(false)
      if (!res.success) {
        setResetError(res.error || 'Código incorreto.')
        return
      }

      setResetStep(3)
    }, 350)
  }

  const handleCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)

    if (resetNewPassword.length < 6) {
      setResetError('A nova senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError('As senhas digitadas não coincidem.')
      return
    }

    setResetIsLoading(true)
    const res = await completePasswordReset(resetToken, resetNewPassword)
    setResetIsLoading(false)

    if (!res.success) {
      setResetError(res.error || 'Falha ao redefinir a senha.')
      return
    }

    setResetStep(4)
    setIdentifier(resetEmail)
    setPassword(resetNewPassword)
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
        <div className={`w-full ${authMode === 'register' ? 'max-w-xl' : 'max-w-md'} mx-auto transition-all duration-300`}>
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

          {/* Card Principal */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rotta-blue via-cyan-500 to-rotta-navy" />

            {/* Alternador de Modo: Já sou Cliente vs Cadastrar Empresa */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/80 rounded-2xl mb-6 border border-slate-200/50">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login')
                  setError(null)
                  setSuccessMessage(null)
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-rotta-blue shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn size={14} />
                <span>Já sou Cliente</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('register')
                  setError(null)
                  setSuccessMessage(null)
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-rotta-blue shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus size={14} />
                <span>Cadastrar Empresa</span>
              </button>
            </div>

            <div className="mb-5 space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                {authMode === 'login' ? 'Acesse sua Conta Corporativa' : 'Cadastre sua Empresa no Portal'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {authMode === 'login'
                  ? 'Acompanhe chamados, níveis de insumos, contadores e relatórios de faturamento.'
                  : 'Preencha os dados da sua empresa para ter acesso imediato ao painel de outsourcing e suporte.'}
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

            {/* Mensagem de Sucesso */}
            {successMessage && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* =========================================
                MODO 1: LOGIN (JÁ SOU CLIENTE)
               ========================================= */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                      onClick={handleOpenForgotModal}
                      className="text-xs font-medium text-rotta-blue hover:underline cursor-pointer"
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
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
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
            ) : (
              /* =========================================
                  MODO 2: CADASTRO DE NOVA EMPRESA
                 ========================================= */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Razão Social */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Razão Social / Nome da Empresa <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building size={15} />
                      </div>
                      <input
                        type="text"
                        required
                        value={regCompanyName}
                        onChange={(e) => setRegCompanyName(e.target.value)}
                        placeholder="Ex: Comercial Beltrão de Alimentos Ltda"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>

                  {/* Nome Fantasia */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nome Fantasia (Opcional)
                    </label>
                    <input
                      type="text"
                      value={regTradeName}
                      onChange={(e) => setRegTradeName(e.target.value)}
                      placeholder="Ex: Beltrão Alimentos"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                    />
                  </div>

                  {/* CNPJ ou CPF */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CNPJ ou CPF <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regCnpjCpf}
                      onChange={(e) => handleCnpjCpfChange(e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                    />
                  </div>

                  {/* Responsável */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nome do Responsável / Contato <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={15} />
                      </div>
                      <input
                        type="text"
                        required
                        value={regContactPerson}
                        onChange={(e) => setRegContactPerson(e.target.value)}
                        placeholder="Ex: Carlos Eduardo"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>

                  {/* E-mail Corporativo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail Corporativo (Login) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail size={15} />
                      </div>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="contato@empresa.com.br"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>

                  {/* Telefone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone size={15} />
                      </div>
                      <input
                        type="text"
                        required
                        value={regPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(46) 99999-9999"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>

                  {/* Cidade e Estado */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cidade & Estado
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin size={15} />
                      </div>
                      <input
                        type="text"
                        value={`${regCity} - ${regState}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('-')
                          setRegCity(parts[0]?.trim() || '')
                          if (parts[1]) setRegState(parts[1].trim())
                        }}
                        placeholder="Francisco Beltrão - PR"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Endereço da Empresa
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="Rua, número, bairro ou sala comercial"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                    />
                  </div>


                  {/* Senha */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Senha de Acesso <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound size={15} />
                      </div>
                      <input
                        type={regShowPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Mínimo 6 dígitos"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                      <button
                        type="button"
                        onClick={() => setRegShowPassword(!regShowPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {regShowPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar Senha */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirmar Senha <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound size={15} />
                      </div>
                      <input
                        type={regShowPassword ? 'text' : 'password'}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Repita a senha"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Medidor visual de força da senha ao digitar no registro */}
                {regPassword.length > 0 && (
                  <div className="space-y-1 pt-1">
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

                {/* Botão de Concluir Cadastro */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-rotta-blue hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Criando conta da empresa...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Concluir Cadastro & Acessar Portal</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Teste Rápido para Demonstração de Clientes (Apenas no Modo Login) */}
            {authMode === 'login' && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Sparkles size={12} className="text-rotta-blue" />
                  Demonstração rápida (1 clique):
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickClientFill('cli-001')}
                    className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate cursor-pointer"
                    title="Alpha Logística"
                  >
                    Alpha Logística
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickClientFill('cli-002')}
                    className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate cursor-pointer"
                    title="Beta Agro"
                  >
                    Beta Agro
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickClientFill('cli-003')}
                    className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors text-center truncate cursor-pointer"
                    title="Clínica São Lucas"
                  >
                    São Lucas
                  </button>
                </div>
              </div>
            )}

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

        </div>
      </main>

      {/* ── Modal Seguro de Redefinição de Senha (Multi-Etapas) ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rotta-blue via-cyan-500 to-indigo-600" />

            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-rotta-blue flex items-center justify-center border border-blue-100">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    Recuperação Segura de Senha
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Etapa {resetStep} de 3 • Autenticação com Criptografia SHA-256
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Barra de Progresso das Etapas */}
            <div className="grid grid-cols-3 gap-1.5 my-4">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  resetStep >= 1 ? 'bg-rotta-blue' : 'bg-slate-100'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all ${
                  resetStep >= 2 ? 'bg-rotta-blue' : 'bg-slate-100'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all ${
                  resetStep >= 3 ? 'bg-rotta-blue' : 'bg-slate-100'
                }`}
              />
            </div>

            {/* Alerta de Erro */}
            {resetError && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-start gap-2 animate-fadeIn">
                <AlertTriangle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span>{resetError}</span>
              </div>
            )}

            {/* ETAPA 1: SOLICITAR CÓDIGO VIA E-MAIL */}
            {resetStep === 1 && (
              <form onSubmit={handleRequestResetCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    E-mail Corporativo Cadastrado <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-2.5 leading-relaxed">
                    Informe o e-mail da sua empresa. O sistema verificará se o e-mail está registrado na base da Rotta e gerará um código seguro de 6 dígitos.
                  </p>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="ex: ti@alphalogistica.com.br"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={resetIsLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-rotta-blue hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resetIsLoading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Verificando base...</span>
                      </>
                    ) : (
                      <>
                        <span>Gerar Código de Segurança</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ETAPA 2: VALIDAR CÓDIGO (6 DÍGITOS) */}
            {resetStep === 2 && (
              <form onSubmit={handleVerifyResetCode} className="space-y-4">
                <div>
                  <div className="rounded-2xl bg-blue-50/80 border border-blue-200/80 p-3.5 mb-3 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-rotta-navy">
                      <ShieldCheck size={15} className="text-rotta-blue" />
                      <span>Código de 6 Dígitos Enviado</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Enviamos o código para: <strong>{resetMaskedEmail}</strong> (validade de 10 minutos).
                    </p>

                    {/* Simulação segura de entrega para testes */}
                    <div className="pt-1.5 border-t border-blue-200/60 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-blue-900 font-semibold font-mono">
                        Simulação de Caixa de Entrada: [{resetSimulatedCode}]
                      </span>
                      <button
                        type="button"
                        onClick={() => setResetCodeInput(resetSimulatedCode)}
                        className="text-[11px] font-bold text-rotta-blue hover:underline cursor-pointer"
                      >
                        Preencher Código
                      </button>
                    </div>
                  </div>

                  <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
                    Digite o Código de Verificação
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={resetCodeInput}
                    onChange={(e) => setResetCodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-center text-xl sm:text-2xl font-mono tracking-widest font-black text-rotta-navy focus:border-rotta-blue focus:outline-none focus:ring-4 focus:ring-rotta-blue/10"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetStep(1)
                      setResetError(null)
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ← Alterar E-mail
                  </button>

                  <button
                    type="submit"
                    disabled={resetIsLoading || resetCodeInput.length !== 6}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rotta-blue hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resetIsLoading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Validando...</span>
                      </>
                    ) : (
                      <>
                        <span>Validar Código</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ETAPA 3: DEFINIR NOVA SENHA */}
            {resetStep === 3 && (
              <form onSubmit={handleCompleteReset} className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 mb-3">
                    Código validado com sucesso! Crie uma nova senha para o acesso corporativo da sua empresa.
                  </p>

                  <div className="space-y-3">
                    {/* Nova Senha */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nova Senha <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <KeyRound size={15} />
                        </div>
                        <input
                          type={resetShowPassword ? 'text' : 'password'}
                          required
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                        />
                        <button
                          type="button"
                          onClick={() => setResetShowPassword(!resetShowPassword)}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {resetShowPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>

                      {/* Medidor de Força */}
                      {resetNewPassword.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                            <span>Segurança:</span>
                            <span className="font-bold">{resetPasswordStrength.label}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                            <div
                              className={`h-full transition-all duration-300 ${
                                resetPasswordStrength.score >= 1 ? 'bg-amber-500 w-1/4' : 'w-0'
                              }`}
                            />
                            <div
                              className={`h-full transition-all duration-300 ${
                                resetPasswordStrength.score >= 2 ? 'bg-yellow-400 w-1/4' : 'w-0'
                              }`}
                            />
                            <div
                              className={`h-full transition-all duration-300 ${
                                resetPasswordStrength.score >= 3 ? 'bg-blue-400 w-1/4' : 'w-0'
                              }`}
                            />
                            <div
                              className={`h-full transition-all duration-300 ${
                                resetPasswordStrength.score >= 4 ? 'bg-emerald-500 w-1/4' : 'w-0'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirmar Nova Senha */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirmar Nova Senha <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type={resetShowPassword ? 'text' : 'password'}
                        required
                        value={resetConfirmPassword}
                        onChange={(e) => setResetConfirmPassword(e.target.value)}
                        placeholder="Repita a nova senha"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-rotta-blue focus:outline-none focus:ring-2 focus:ring-rotta-blue/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={resetIsLoading}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resetIsLoading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Criptografando...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Salvar Nova Senha</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ETAPA 4: SUCESSO TOTAL & ACESSO */}
            {resetStep === 4 && (
              <div className="text-center py-3 space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 size={30} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-slate-900">
                    Senha Redefinida com Sucesso!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Sua nova credencial foi gravada e protegida com SHA-256 e Salt. Os campos de login já foram atualizados.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false)
                      setSuccessMessage('Senha atualizada! Clique em "Entrar no Portal do Cliente" para acessar.')
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-rotta-blue hover:bg-blue-700 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Prosseguir para o Login</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
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
