import { useState } from 'react'
import {
  Lock,
  Building,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import { DEFAULT_CLIENT_COMPANY } from '../../data/mockClientData'
import type { ClientCompany } from '../../types/clientPortal'
import { BrandMark } from '../BrandMark'

interface ClientLoginProps {
  onLogin: (company: ClientCompany) => void
  onBackToSite: () => void
}

export function ClientLogin({ onLogin, onBackToSite }: ClientLoginProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!identifier.trim()) {
      setError('Por favor, informe seu CNPJ ou E-mail cadastrado.')
      return
    }

    if (!password.trim()) {
      setError('Por favor, digite sua senha de acesso.')
      return
    }

    // Login com dados padrão do cliente
    onLogin(DEFAULT_CLIENT_COMPANY)
  }

  const handleQuickDemoLogin = () => {
    onLogin(DEFAULT_CLIENT_COMPANY)
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Botão de retorno superior */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rotta-blue transition-colors rounded-lg px-3 py-1.5 hover:bg-slate-200/60"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Site Institucional</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Coluna da Esquerda: Apresentação e Vantagens */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-bold text-rotta-blue">
            <Sparkles size={14} />
            <span>Novo Portal do Cliente Rotta</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Gestão ágil de <span className="text-rotta-blue">impressão e TI</span> na palma da sua mão.
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Tenha controle total do seu parque de equipamentos, acompanhe chamados técnicos em tempo real, solicite toners e consulte faturas com agilidade e transparência.
            </p>
          </div>

          {/* Destaques do Portal */}
          <div className="space-y-3.5 pt-2">
            {[
              {
                title: 'Chamados em Tempo Real',
                desc: 'Abertura rápida com SLA de atendimento e linha do tempo dos técnicos.',
              },
              {
                title: 'Solicitação Express de Toners',
                desc: 'Reposição de consumíveis com rastreio da entrega até a sua empresa.',
              },
              {
                title: 'Leitura Mensal & 2ª Via de Faturas',
                desc: 'Lançamento simples de contadores e pagamento instantâneo via Pix ou boleto.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-2xs">
                <div className="rounded-xl bg-blue-50 p-2 text-rotta-blue shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Ambiente seguro e criptografado para clientes corporativos Rotta Tecnologia.</span>
          </div>
        </div>

        {/* Coluna da Direita: Card de Login */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60">
            {/* Header do Card */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <BrandMark className="h-10 w-auto" variant="symbol" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Área do Cliente</h2>
                  <p className="text-xs text-slate-500">Entre com as credenciais da sua empresa</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                v2.0
              </span>
            </div>

            {/* Botão de Demonstração em Destaque */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 p-4 border border-blue-100/90">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rotta-blue">
                    Acesso Demonstrativo Rápido
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Explore todas as funcionalidades com a conta de demonstração (Alpha Logística).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-rotta-blue text-white px-3.5 py-2 text-xs font-bold hover:bg-rotta-blue-dark transition-colors shadow-sm"
                >
                  <Sparkles size={14} />
                  <span>Entrar Demo</span>
                </button>
              </div>
            </div>

            {/* Formulário de Login Tradicional */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-medium text-rose-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  CNPJ ou E-mail Cadastrado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building size={16} />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="28.914.832/0001-45 ou ti@empresa.com.br"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
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
                    className="text-xs font-semibold text-rotta-blue hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rotta-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-rotta-blue focus:ring-rotta-blue"
                  />
                  <span>Lembrar meus dados</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rotta-blue to-rotta-blue-dark py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
              >
                <Lock size={16} />
                <span>Acessar Portal do Cliente</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Suporte e Link Legado */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Dificuldades para acessar?</span>
                <a
                  href="https://wa.me/554734518200"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-rotta-blue hover:underline inline-flex items-center gap-1"
                >
                  <Headphones size={13} />
                  <span>Falar com o Suporte</span>
                </a>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Utiliza o atendimento no sistema anterior?
                </span>
                <a
                  href="https://atendimento.rottatecnologia.com.br/authentication/login"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-slate-700 hover:text-rotta-blue inline-flex items-center gap-1"
                >
                  <span>Portal Legado</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Esqueci Minha Senha */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Recuperar Senha de Acesso</h3>
            <p className="text-xs text-slate-500 mb-4">
              Informe o e-mail do responsável pelo contrato para receber as instruções de redefinição de senha.
            </p>

            {forgotSuccess ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-800">E-mail enviado com sucesso!</p>
                <p className="text-xs text-emerald-600">
                  Verifique sua caixa de entrada com o link para criar uma nova senha.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    E-mail Cadastrado
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="exemplo@suaempresa.com.br"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-rotta-blue focus:outline-none"
                  />
                </div>

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
                    Enviar Link de Redefinição
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rodapé simples */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400 mt-8">
        Rotta Tecnologia • Portal Corporativo do Cliente
      </div>
    </div>
  )
}
