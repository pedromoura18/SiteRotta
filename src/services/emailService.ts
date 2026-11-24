/**
 * =========================================================================
 * SERVIÇO PROFISSIONAL DE ENVIO DE E-MAILS (Rotta Tecnologia)
 * =========================================================================
 * Este serviço gerencia o disparo real de e-mails corporativos para:
 * 1. Recuperação de senha com código de verificação seguro (6 dígitos).
 * 2. Notificações do portal corporativo.
 *
 * Suporta:
 * - EmailJS (API REST direta do navegador, gratuita até 200 e-mails/mês)
 * - Webhook próprio (n8n, Make, Cloudflare Workers, Node.js)
 * =========================================================================
 */

export interface SendResetEmailParams {
  toEmail: string
  userName: string
  code: string
  expiresMinutes?: number
}

export interface SendEmailResult {
  success: boolean
  isConfigured: boolean
  message: string
  error?: string
}

/**
 * Verifica se os parâmetros de envio de e-mail estão configurados nas variáveis de ambiente.
 */
export function isEmailServiceConfigured(): boolean {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL

  const isEmailJSConfigured = Boolean(serviceId && templateId && publicKey)
  const isWebhookConfigured = Boolean(webhookUrl)

  return isEmailJSConfigured || isWebhookConfigured
}

/**
 * Dispara o e-mail real com o código de 6 dígitos para o destinatário informado.
 */
export async function sendPasswordResetEmail({
  toEmail,
  userName,
  code,
  expiresMinutes = 10,
}: SendResetEmailParams): Promise<SendEmailResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL

  // 1. Caso haja Webhook customizado configurado
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'password_reset',
          to_email: toEmail,
          to_name: userName,
          verification_code: code,
          expires_minutes: expiresMinutes,
          company: 'Rotta Tecnologia',
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        return {
          success: true,
          isConfigured: true,
          message: 'E-mail de recuperação enviado com sucesso via Webhook!',
        }
      }

      const errText = await response.text()
      return {
        success: false,
        isConfigured: true,
        message: 'Falha ao disparar e-mail via Webhook.',
        error: errText,
      }
    } catch (err: any) {
      console.error('Erro no envio via Webhook:', err)
      return {
        success: false,
        isConfigured: true,
        message: 'Erro de conexão com o servidor de e-mail.',
        error: err?.message,
      }
    }
  }

  // 2. Caso o EmailJS esteja configurado (Recomendado para SPA React)
  if (serviceId && templateId && publicKey) {
    try {
      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: toEmail,
          to_name: userName,
          verification_code: code,
          expires_minutes: expiresMinutes,
          company_name: 'Rotta Tecnologia',
          support_phone: '(46) 98803-7656',
          portal_url: `${window.location.origin}/#/portal`,
        },
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok || response.status === 200) {
        return {
          success: true,
          isConfigured: true,
          message: `Código enviado com sucesso para ${toEmail}!`,
        }
      }

      const errText = await response.text()
      console.warn('Resposta do EmailJS:', response.status, errText)
      return {
        success: false,
        isConfigured: true,
        message: 'O provedor de e-mail recusou o envio. Verifique o template no EmailJS.',
        error: errText,
      }
    } catch (err: any) {
      console.error('Erro ao conectar com API do EmailJS:', err)
      return {
        success: false,
        isConfigured: true,
        message: 'Falha de rede ao conectar com o serviço de envio de e-mails.',
        error: err?.message,
      }
    }
  }

  // 3. Caso não esteja configurado ainda no .env
  return {
    success: false,
    isConfigured: false,
    message: 'Nenhum serviço de envio de e-mail (EmailJS ou Webhook) foi configurado no arquivo .env.',
    error: 'VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY ausentes.',
  }
}

/**
 * Modelo de HTML pronto para colar no template do EmailJS ou no servidor de e-mails.
 */
export const EMAIL_TEMPLATE_PREVIEW_HTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Código de Recuperação - Rotta Tecnologia</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 800;">ROTTA <span style="color: #2563eb;">TECNOLOGIA</span></h1>
      <p style="color: #94a3b8; font-size: 12px; margin: 6px 0 0;">Portal Corporativo do Cliente</p>
    </div>
    <div style="padding: 32px 24px;">
      <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Recuperação de Acesso Corporativo</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Olá, <strong>{{to_name}}</strong>!
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Recebemos uma solicitação para redefinir a senha de acesso da sua empresa ao Portal da Rotta Tecnologia.
      </p>
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 12px; text-transform: uppercase; font-weight: bold; color: #1e40af; letter-spacing: 1px;">Seu Código de Segurança</span>
        <div style="font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #1e3a8a; font-family: monospace; margin: 8px 0;">{{verification_code}}</div>
        <span style="font-size: 11px; color: #64748b;">Válido por {{expires_minutes}} minutos</span>
      </div>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b;">
        Insira este código na tela do portal para cadastrar sua nova senha. Se você não solicitou esta redefinição, desconsidere esta mensagem.
      </p>
      <div style="border-top: 1px solid #f1f5f9; margin-top: 24px; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
        Rotta Tecnologia • Outsourcing de TI & Impressão • WhatsApp: {{support_phone}}
      </div>
    </div>
  </div>
</body>
</html>
`

export interface SendFirstAccessEmailParams {
  toEmail: string
  userName: string
  companyName: string
  code: string
  expiresMinutes?: number
}

/**
 * Envia o código de ativação e primeiro acesso para o cliente corporativo
 */
export async function sendFirstAccessEmail({
  toEmail,
  userName,
  companyName,
  code,
  expiresMinutes = 15,
}: SendFirstAccessEmailParams): Promise<SendEmailResult> {
  return sendPasswordResetEmail({
    toEmail,
    userName: `${userName} (${companyName})`,
    code,
    expiresMinutes,
  })
}
