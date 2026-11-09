import { useState, useEffect } from 'react'
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Crown,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Building,
} from 'lucide-react'
import { BrandMark } from '../BrandMark'
import {
  authenticateWithSecurity,
  checkBruteForceLockout,
} from '../../utils/cryptoAuth'

interface DirectorLoginProps {
  onLoginAdmin: (token?: string) => void
  onBackToClientLogin: () => void
  onBackToSite: () => void
}

export function DirectorLogin({
  onLoginAdmin,
  onBackToClientLogin,
  onBackToSite,
}: DirectorLoginProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [adminPin, setAdminPin] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (lockoutRemaining > 0) {
      setError(`Acesso bloqueado por segurança. Aguarde ${lockoutRemaining} segundos para tentar novamente.`)
      return
    }

    if (!identifier.trim()) {
      setError('Informe o e-mail master do diretor.')
      return
    }

    if (!password.trim()) {
      setError('Digite sua senha de administrador.')
      return
    }

    if (adminPin.trim().length < 4) {
      setError('Digite o PIN de Segurança Master de 4 dígitos.')
      return
    }

    setIsLoading(true)

    try {
      const authResult = await authenticateWithSecurity(
        identifier,
        password,
        adminPin,
        'admin'
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

      onLoginAdmin(authResult.token)
    } catch (err) {
      console.error('Erro na autenticação de diretoria:', err)
      setError('Erro de conexão ao servidor seguro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Preenchimento rápido para demonstração oficial
  const handleQuickMasterFill = () => {
    setError(null)
    setIdentifier('douglas@rottatecnologia.com.br')
    setPassword('rotta2026')
    setAdminPin('7656')
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
      {/* ── Barra Superior ── */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 text-xs font-semibold transition-all shadow-xs"
        >
          <ArrowLeft size={15} />
          <span>Voltar ao Site</span>
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-amber-800 font-semibold text-[11px] shadow-xs">
          <ShieldCheck size={13} className="text-amber-600" />
          <span>Painel Master • Duplo Fator</span>
        </div>
      </header>

      {/* ── Conteúdo Centralizado no Meio da Página ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10 w-full">
        <div className="w-full max-w-md mx-auto">
          {/* Logo e Nome da Empresa no Topo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-3.5 mb-2">
              <BrandMark className="h-11 sm:h-12 w-auto" variant="symbol" theme="dark" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                  <span>ROTTA</span>
                  <span className="text-rotta-blue font-bold text-sm sm:text-base">TECNOLOGIA</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold block mt-1">
                  Diretoria Executiva & Gestão Master
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-0.5 text-xs font-bold text-amber-900 mt-1 shadow-2xs">
              <Crown size={12} className="text-amber-600" />
              <span>Acesso Exclusivo • Douglas Rotta</span>
            </div>
          </div>

          {/* Card de Autenticação da Diretoria */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

            <div className="mb-5 rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-wider text-[11px]">
                <Crown size={14} className="text-amber-600" />
                <span>Ambiente Administrativo Privado</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Gestão central de contratos, chamados, telemetria SNMP e sincronização ao vivo com o <strong>Máquina Pro</strong>.
              </p>
            </div>

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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* E-mail Master */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  E-mail do Proprietário / Diretor
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-600">
                    <Crown size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="douglas@rottatecnologia.com.br"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Senha Master */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Senha Master
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* PIN de Segurança Master (4 dígitos) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    PIN de Segurança Master (4 Dígitos)
                  </label>
                  <span className="text-[11px] text-amber-700 font-mono font-semibold">Dica: 7656</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <ShieldCheck size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              {/* Lembrar sessão */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>Lembrar sessão segura da diretoria</span>
                </label>
              </div>

              {/* Botão de Entrar */}
              <button
                type="submit"
                disabled={isLoading || lockoutRemaining > 0}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-3 text-sm font-black text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin text-slate-950" />
                    <span>Autenticando Diretor...</span>
                  </>
                ) : (
                  <>
                    <Crown size={16} />
                    <span>Acessar Painel Master</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Chip de teste rápido da diretoria */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleQuickMasterFill}
                className="w-full py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles size={12} className="text-amber-600" />
                <span>Preencher credenciais de teste do Douglas</span>
              </button>
            </div>

            {/* Alternância discreta para o Login do Cliente */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={onBackToClientLogin}
                className="inline-flex items-center gap-1.5 font-semibold text-rotta-blue hover:underline"
              >
                <Building size={13} />
                <span>Ir para Login de Clientes</span>
              </button>

              <a
                href="https://app.maquinapro.app.br/#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600"
              >
                <span>Máquina Pro Direto</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ── Rodapé ── */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
        © 2016-{new Date().getFullYear()} Rotta Tecnologia • Gestão Master & Diretoria
      </footer>
    </div>
  )
}

