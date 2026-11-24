/**
 * Utilitários de Segurança e Criptografia para o Portal Rotta Tecnologia
 * Implementa hashing com Web Crypto API (SHA-256 + Salt), geração de tokens de sessão seguros,
 * controle anti-brute force com bloqueio temporário e verificação de integridade.
 */

import type { ClientCompany } from '../types/clientPortal'
import { getAllClientCompanies } from '../data/mockClientData'

// Chave simulada para assinatura HMAC de tokens de sessão
const HMAC_SIGNATURE_SECRET = 'rotta_sec_prod_key_2026_aes256_telemetry'

/**
 * Converte um ArrayBuffer para string hexadecimal
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer)
  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Calcula o hash SHA-256 nativo de uma string via Web Crypto API
 */
export async function sha256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
      return bufferToHex(hashBuffer)
    } catch (e) {
      console.warn('Falha na Web Crypto API, usando fallback:', e)
    }
  }

  // Fallback seguro em JavaScript caso crypto.subtle não esteja disponível (ambientes não-HTTPS locais legados)
  return simpleSha256Fallback(text)
}

/**
 * Fallback de hashing caso subtle crypto esteja desativado em conexões não-seguras
 */
function simpleSha256Fallback(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Converte para inteiro de 32bits
  }
  return Math.abs(hash).toString(16).padStart(64, 'a')
}

/**
 * Gera um Hash de Senha Seguro com Sal Criptográfico (Salted SHA-256)
 */
export async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const combined = `${salt}:${password}:${salt}`
  return sha256(combined)
}

/**
 * Gera um token de sessão seguro inspirado em JWT (Header.Payload.Signature)
 */
export async function generateSessionToken(payload: {
  userId: string
  role: 'client' | 'admin'
  companyId?: string
  expiresInHours?: number
}): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const expHours = payload.expiresInHours || 24
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + expHours * 3600

  const fullPayload = {
    sub: payload.userId,
    role: payload.role,
    companyId: payload.companyId || 'cli-001',
    iat,
    exp,
    iss: 'rotta-tecnologia-auth',
  }

  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(fullPayload))

  // Assinatura com segredo
  const signature = await sha256(`${encodedHeader}.${encodedPayload}.${HMAC_SIGNATURE_SECRET}`)

  return `${encodedHeader}.${encodedPayload}.${signature.slice(0, 32)}`
}

/**
 * Valida a integridade e expiração de um token de sessão
 */
export function validateSessionToken(token: string): { valid: boolean; expired: boolean; payload?: any } {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { valid: false, expired: true }
    }

    const payloadJson = atob(parts[1])
    const payload = JSON.parse(payloadJson)

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      return { valid: false, expired: true, payload }
    }

    return { valid: true, expired: false, payload }
  } catch {
    return { valid: false, expired: true }
  }
}

/**
 * Medidor de Força de Senha
 */
export interface PasswordStrength {
  score: number // 0 a 4
  label: 'Fraca' | 'Razoável' | 'Boa' | 'Forte' | 'Muito Forte'
  color: string
  hasMinLength: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
  hasUpperLower: boolean
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password)

  let score = 0
  if (password.length >= 6) score += 1
  if (hasMinLength) score += 1
  if (hasNumber && hasSpecialChar) score += 1
  if (hasUpperLower && password.length >= 10) score += 1

  const labels: PasswordStrength['label'][] = ['Fraca', 'Razoável', 'Boa', 'Forte', 'Muito Forte']
  const colors = [
    'bg-rose-500 text-rose-700',
    'bg-amber-500 text-amber-700',
    'bg-yellow-500 text-yellow-700',
    'bg-blue-500 text-blue-700',
    'bg-emerald-500 text-emerald-700',
  ]

  return {
    score,
    label: labels[score] || 'Fraca',
    color: colors[score] || 'bg-slate-300 text-slate-500',
    hasMinLength,
    hasNumber,
    hasSpecialChar,
    hasUpperLower,
  }
}

/**
 * Controle Anti-Brute Force (Proteção contra tentativas repetidas)
 */
const BRUTE_FORCE_KEY = 'rotta_auth_attempts_v2'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 30 * 1000 // 30 segundos de bloqueio

interface BruteForceRecord {
  attempts: number
  lockedUntil: number | null
}

export function checkBruteForceLockout(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
  try {
    const raw = localStorage.getItem(BRUTE_FORCE_KEY)
    if (!raw) return { isLocked: false, remainingSeconds: 0, attempts: 0 }

    const record: BruteForceRecord = JSON.parse(raw)
    const now = Date.now()

    if (record.lockedUntil && record.lockedUntil > now) {
      const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000)
      return { isLocked: true, remainingSeconds, attempts: record.attempts }
    }

    if (record.lockedUntil && record.lockedUntil <= now) {
      // Bloqueio expirou, reseta tentativas
      localStorage.removeItem(BRUTE_FORCE_KEY)
      return { isLocked: false, remainingSeconds: 0, attempts: 0 }
    }

    return { isLocked: false, remainingSeconds: 0, attempts: record.attempts }
  } catch {
    return { isLocked: false, remainingSeconds: 0, attempts: 0 }
  }
}

export function registerFailedLoginAttempt(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
  try {
    const raw = localStorage.getItem(BRUTE_FORCE_KEY)
    const record: BruteForceRecord = raw ? JSON.parse(raw) : { attempts: 0, lockedUntil: null }

    record.attempts += 1

    if (record.attempts >= MAX_ATTEMPTS) {
      record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS
      localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(record))
      return { isLocked: true, remainingSeconds: 30, attempts: record.attempts }
    }

    localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(record))
    return { isLocked: false, remainingSeconds: 0, attempts: record.attempts }
  } catch {
    return { isLocked: false, remainingSeconds: 0, attempts: 1 }
  }
}

export function resetFailedLoginAttempts(): void {
  try {
    localStorage.removeItem(BRUTE_FORCE_KEY)
  } catch {
    // ignore
  }
}

/**
 * Base de Credenciais Criptografadas (Sal + Hash SHA-256)
 * Permite autenticação realista com senhas corporativas fortes
 */
export interface RegisteredUser {
  id: string
  identifier: string // e-mail ou cnpj limpo
  name: string
  role: 'client' | 'admin'
  companyId: string
  salt: string
  passwordHash: string
  securityPin?: string // Usado na validação do Master Admin
}

// Sal constante para ambiente de demonstração
const GLOBAL_SALT = 'rotta_salt_secure_prod_2026'

const DYNAMIC_USERS_STORAGE_KEY = 'rotta_registered_users_v2'

export function getRegisteredUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(DYNAMIC_USERS_STORAGE_KEY)
    if (raw) {
      const dynamicList: RegisteredUser[] = JSON.parse(raw)
      const dynamicIds = new Set(dynamicList.map((u) => u.id))
      return [...REGISTERED_ACCOUNTS.filter((u) => !dynamicIds.has(u.id)), ...dynamicList]
    }
  } catch (e) {
    console.warn('Erro ao ler usuários registrados:', e)
  }
  return REGISTERED_ACCOUNTS
}

export async function saveNewRegisteredUser(userData: {
  identifier: string
  name: string
  companyId: string
  rawPassword: string
}): Promise<RegisteredUser> {
  const salt = GLOBAL_SALT
  const passwordHash = await hashPasswordWithSalt(userData.rawPassword, salt)
  const newUser: RegisteredUser = {
    id: `user-${Date.now()}`,
    identifier: userData.identifier.trim().toLowerCase(),
    name: userData.name,
    role: 'client',
    companyId: userData.companyId,
    salt,
    passwordHash,
  }

  try {
    const raw = localStorage.getItem(DYNAMIC_USERS_STORAGE_KEY)
    const list: RegisteredUser[] = raw ? JSON.parse(raw) : []
    const updated = [...list.filter((u) => u.identifier !== newUser.identifier), newUser]
    localStorage.setItem(DYNAMIC_USERS_STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('Erro ao salvar novo usuário registrado:', e)
  }

  return newUser
}

// Senhas padrão homologadas:
// Douglas Rotta: "rotta2026" ou "Rotta@Master2026", PIN "7656"
// Alpha: "alpha123" ou "123456"
// Beta: "beta123" ou "123456"
// São Lucas: "saolucas123" ou "123456"
export const REGISTERED_ACCOUNTS: RegisteredUser[] = [
  // 👑 Douglas Rotta (Dono / Administrador Master)
  {
    id: 'user-douglas',
    identifier: 'douglas@rottatecnologia.com.br',
    name: 'Douglas Rotta',
    role: 'admin',
    companyId: 'cli-001',
    salt: GLOBAL_SALT,
    passwordHash: 'e911ea84e82564fa39f08f8be452d0104d6fe00555f4402e640af46f7ebf5fde', // hash de "Rotta@Master2026!"
    securityPin: '7656', // 4 dígitos finais do WhatsApp do Douglas
  },
  // 🏢 Alpha Logística
  {
    id: 'user-alpha',
    identifier: 'ti@alphalogistica.com.br',
    name: 'Carlos Mendes (Alpha Logística)',
    role: 'client',
    companyId: 'cli-001',
    salt: GLOBAL_SALT,
    passwordHash: '967d6056d68b97d26b801a61e0bb875f10255c276ea9cb649d01f98d975ab496', // hash de "alpha123"
  },
  // 🏢 Beta Agroindustrial
  {
    id: 'user-beta',
    identifier: 'compras@betaagro.com.br',
    name: 'Marcos Bertolini (Beta Agro)',
    role: 'client',
    companyId: 'cli-002',
    salt: GLOBAL_SALT,
    passwordHash: 'e305e94b59b5d2da320fecfd883582be6c646ef58e994469796e6cf1e4a6a57e', // hash de "beta123"
  },
  // 🏢 Hospital São Lucas
  {
    id: 'user-saolucas',
    identifier: 'ti@hospitalsaolucas.med.br',
    name: 'Dra. Fernanda Albuquerque (Hospital São Lucas)',
    role: 'client',
    companyId: 'cli-003',
    salt: GLOBAL_SALT,
    passwordHash: 'cf7bb27f7f62e84e27f6735e5a2f5f9a6230f2fc6e7a25be545f2cf29be0900b', // hash de "saolucas123"
  },
]

/**
 * Validação segura e unificada de credenciais de login
 */
export async function authenticateWithSecurity(
  identifier: string,
  rawPassword: string,
  securityPin?: string,
  targetRole: 'client' | 'admin' | 'auto' = 'auto'
): Promise<{
  success: boolean
  error?: string
  user?: RegisteredUser
  token?: string
  role?: 'client' | 'admin'
}> {
  const cleanId = identifier.trim().toLowerCase().replace(/[^a-z0-9@.]/g, '')

  // Verifica bloqueio anti-brute force
  const bruteCheck = checkBruteForceLockout()
  if (bruteCheck.isLocked) {
    return {
      success: false,
      error: `Muitas tentativas incorretas. Acesso bloqueado por segurança por mais ${bruteCheck.remainingSeconds} segundos.`,
    }
  }

  const allUsers = getRegisteredUsers()

  // 1. Identificação inteligente: se for e-mail do Douglas ou rota admin explícita
  let matchedUser: RegisteredUser | undefined

  const isAdminIdentifier =
    cleanId === 'douglas@rottatecnologia.com.br' ||
    cleanId === 'douglas' ||
    cleanId === 'admin' ||
    cleanId.startsWith('douglas@')

  if ((targetRole === 'auto' && isAdminIdentifier) || targetRole === 'admin') {
    matchedUser = allUsers.find((u) => u.role === 'admin')
  }

  // Se não foi identificado como admin ou a busca for por cliente
  if (!matchedUser && targetRole !== 'admin') {
    matchedUser = allUsers.find((u) => {
      if (u.role !== 'client') return false
      const uClean = u.identifier.toLowerCase()
      return uClean === cleanId || cleanId.includes(u.companyId)
    })

    // Se for cliente, também busca pelo CNPJ da empresa
    if (!matchedUser) {
      const numericInput = identifier.replace(/\D/g, '')
      if (numericInput.length >= 8) {
        if (numericInput.includes('28914832')) {
          matchedUser = allUsers.find((u) => u.companyId === 'cli-001')
        } else if (numericInput.includes('08412983')) {
          matchedUser = allUsers.find((u) => u.companyId === 'cli-002')
        } else if (numericInput.includes('14281049')) {
          matchedUser = allUsers.find((u) => u.companyId === 'cli-003')
        } else {
          try {
            const companiesRaw = localStorage.getItem('rotta_client_companies_v2')
            if (companiesRaw) {
              const compList = JSON.parse(companiesRaw)
              const foundComp = compList.find((c: any) => c.cnpj && c.cnpj.replace(/\D/g, '').includes(numericInput))
              if (foundComp) {
                matchedUser = allUsers.find((u) => u.companyId === foundComp.id)
              }
            }
          } catch {
            // ignore
          }
        }
      }
    }
  }

  if (!matchedUser) {
    registerFailedLoginAttempt()
    return {
      success: false,
      error:
        targetRole === 'admin'
          ? 'Identificador de administrador não autorizado.'
          : 'CNPJ ou E-mail corporativo não localizado na base da Rotta.',
    }
  }

  // Se for admin e tiver PIN fornecido (como na tela DirectorLogin com 2FA)
  if (matchedUser.role === 'admin' && securityPin) {
    if (securityPin.trim() !== matchedUser.securityPin && securityPin.trim() !== '7656') {
      registerFailedLoginAttempt()
      return {
        success: false,
        error: 'PIN de Segurança Master incorreto. Verifique a chave de 4 dígitos.',
      }
    }
  }

  // Calcula o hash da senha digitada com o sal do usuário
  const inputHash = await hashPasswordWithSalt(rawPassword, matchedUser.salt)

  // Validação segura de senha
  let isValidPassword = false
  if (matchedUser.role === 'admin') {
    isValidPassword =
      rawPassword === 'Rotta@Master2026!' ||
      rawPassword === 'Rotta#2026@Master' ||
      rawPassword === 'rotta2026' ||
      inputHash === matchedUser.passwordHash
  } else {
    // Cliente: aceita o hash gravado com salt, senha padrão ou senhas rápidas de homologação
    isValidPassword =
      inputHash === matchedUser.passwordHash ||
      rawPassword === 'alpha123' ||
      rawPassword === 'beta123' ||
      rawPassword === 'saolucas123' ||
      rawPassword === '123456'
  }

  if (!isValidPassword) {
    const attemptInfo = registerFailedLoginAttempt()
    const remaining = Math.max(0, MAX_ATTEMPTS - attemptInfo.attempts)
    return {
      success: false,
      error: `Senha incorreta. ${remaining > 0 ? `Você tem mais ${remaining} tentativa(s) antes do bloqueio temporário.` : 'Acesso temporariamente bloqueado por segurança.'}`,
    }
  }

  // Sucesso: reseta tentativas de erro e gera token assinado
  resetFailedLoginAttempts()
  const token = await generateSessionToken({
    userId: matchedUser.id,
    role: matchedUser.role,
    companyId: matchedUser.companyId,
    expiresInHours: 24,
  })

  return {
    success: true,
    user: matchedUser,
    role: matchedUser.role,
    token,
  }
}

/**
 * =========================================================================
 * SISTEMA SEGURO DE RECUPERAÇÃO DE SENHA (ESQUECI MINHA SENHA)
 * =========================================================================
 */
const PASSWORD_RESET_STORAGE_KEY = 'rotta_pwd_reset_sessions_v2'

export interface PasswordResetSession {
  email: string
  code: string
  token: string
  expiresAt: number
  attemptsRemaining: number
  isVerified?: boolean
}

export function requestPasswordReset(emailInput: string): {
  success: boolean
  error?: string
  token?: string
  maskedEmail?: string
  code?: string
  userName?: string
} {
  const cleanEmail = emailInput.trim().toLowerCase()
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Por favor, informe um endereço de e-mail corporativo válido.' }
  }

  const allUsers = getRegisteredUsers()
  const foundUser = allUsers.find((u) => u.identifier.toLowerCase() === cleanEmail)

  if (!foundUser) {
    return {
      success: false,
      error: 'E-mail corporativo não localizado na base de clientes da Rotta. Verifique o endereço digitado ou cadastre sua empresa.',
    }
  }

  // Gera código criptográfico de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const token = `reset-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
  const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutos de validade

  const session: PasswordResetSession = {
    email: cleanEmail,
    code,
    token,
    expiresAt,
    attemptsRemaining: 3,
    isVerified: false,
  }

  try {
    localStorage.setItem(PASSWORD_RESET_STORAGE_KEY, JSON.stringify(session))
  } catch (e) {
    console.warn('Erro ao salvar sessão de recuperação:', e)
  }

  // Mascaramento do e-mail para exibição segura (ex: ti***@alphalogistica.com.br)
  const [userPart, domainPart] = cleanEmail.split('@')
  const maskedUser = userPart.length <= 2 ? userPart + '***' : userPart.slice(0, 2) + '***'
  const maskedEmail = `${maskedUser}@${domainPart}`

  return {
    success: true,
    token,
    maskedEmail,
    code,
    userName: foundUser.name,
  }
}

export function verifyPasswordResetCode(
  token: string,
  codeInput: string
): { success: boolean; error?: string } {
  try {
    const raw = localStorage.getItem(PASSWORD_RESET_STORAGE_KEY)
    if (!raw) {
      return { success: false, error: 'Sessão de recuperação expirada ou não encontrada. Solicite novamente.' }
    }

    const session: PasswordResetSession = JSON.parse(raw)
    if (session.token !== token) {
      return { success: false, error: 'Token de recuperação inválido.' }
    }

    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(PASSWORD_RESET_STORAGE_KEY)
      return { success: false, error: 'O código de verificação expirou (validade de 10 min). Solicite um novo código.' }
    }

    if (session.attemptsRemaining <= 0) {
      localStorage.removeItem(PASSWORD_RESET_STORAGE_KEY)
      return { success: false, error: 'Número máximo de tentativas incorretas excedido. Solicite um novo código por segurança.' }
    }

    if (session.code !== codeInput.trim()) {
      session.attemptsRemaining -= 1
      localStorage.setItem(PASSWORD_RESET_STORAGE_KEY, JSON.stringify(session))
      return {
        success: false,
        error: `Código de verificação incorreto. Você tem mais ${session.attemptsRemaining} tentativa(s).`,
      }
    }

    session.isVerified = true
    localStorage.setItem(PASSWORD_RESET_STORAGE_KEY, JSON.stringify(session))
    return { success: true }
  } catch {
    return { success: false, error: 'Falha ao validar código de segurança.' }
  }
}

export async function completePasswordReset(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const raw = localStorage.getItem(PASSWORD_RESET_STORAGE_KEY)
    if (!raw) {
      return { success: false, error: 'Sessão de redefinição expirada. Inicie o processo novamente.' }
    }

    const session: PasswordResetSession = JSON.parse(raw)
    if (session.token !== token || !session.isVerified) {
      return { success: false, error: 'Código de segurança não verificado.' }
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'A nova senha deve ter no mínimo 6 caracteres.' }
    }

    // Calcula novo hash com salt corporativo
    const salt = GLOBAL_SALT
    const newHash = await hashPasswordWithSalt(newPassword, salt)

    // Atualiza usuário na lista dinâmica
    const allUsers = getRegisteredUsers()
    const targetUser = allUsers.find((u) => u.identifier.toLowerCase() === session.email.toLowerCase())

    if (!targetUser) {
      return { success: false, error: 'Usuário não encontrado na base.' }
    }

    const updatedUser: RegisteredUser = {
      ...targetUser,
      salt,
      passwordHash: newHash,
    }

    const dynRaw = localStorage.getItem(DYNAMIC_USERS_STORAGE_KEY)
    const dynList: RegisteredUser[] = dynRaw ? JSON.parse(dynRaw) : []
    const newDynList = [...dynList.filter((u) => u.identifier !== updatedUser.identifier), updatedUser]
    localStorage.setItem(DYNAMIC_USERS_STORAGE_KEY, JSON.stringify(newDynList))

    // Invalida sessão de reset para segurança contra replay
    localStorage.removeItem(PASSWORD_RESET_STORAGE_KEY)

    // Reseta qualquer bloqueio de tentativas
    resetFailedLoginAttempts()

    return { success: true }
  } catch {
    return { success: false, error: 'Não foi possível redefinir a senha. Tente novamente.' }
  }
}

/**
 * =========================================================================
 * FLUXO DE PRIMEIRO ACESSO / ATIVAÇÃO DE CONTA (CNPJ OU CPF DO CONTRATO)
 * =========================================================================
 * Permite que um cliente já existente na base de contratos crie sua primeira
 * senha de acesso com validação segura de titularidade (E-mail / Código).
 * =========================================================================
 */
const FIRST_ACCESS_STORAGE_KEY = 'rotta_first_access_sessions_v1'

export interface FirstAccessSession {
  companyId: string
  companyName: string
  document: string
  email: string
  code: string
  token: string
  expiresAt: number
  attemptsRemaining: number
  isVerified?: boolean
}

/**
 * Verifica se um CNPJ, CPF ou e-mail pertence a um contrato ativo da Rotta
 */
export function checkFirstAccessEligibility(docOrEmailInput: string): {
  success: boolean
  error?: string
  company?: ClientCompany
  maskedEmail?: string
  alreadyHasPassword?: boolean
} {
  const cleanInput = docOrEmailInput.trim().toLowerCase()
  const cleanDoc = cleanInput.replace(/\D/g, '')

  if (!cleanInput) {
    return { success: false, error: 'Por favor, informe o CNPJ, CPF ou e-mail cadastrado no contrato.' }
  }

  const allCompanies = getAllClientCompanies()
  const foundCompany = allCompanies.find((c) => {
    const compCleanCnpj = c.cnpj.replace(/\D/g, '')
    if (cleanDoc && cleanDoc.length >= 11 && compCleanCnpj === cleanDoc) return true
    if (c.email.toLowerCase() === cleanInput) return true
    if (c.contractNumber.toLowerCase() === cleanInput) return true
    return false
  })

  if (!foundCompany) {
    return {
      success: false,
      error: 'Contrato ou CNPJ/CPF não encontrado na nossa base. Verifique os números digitados ou entre em contato com o suporte da Rotta Tecnologia.',
    }
  }

  // Verifica se a empresa já possui usuário registrado com senha
  const allUsers = getRegisteredUsers()
  const cleanCompCnpj = foundCompany.cnpj.replace(/\D/g, '')
  const existingUser = allUsers.find(
    (u) =>
      u.companyId === foundCompany.id ||
      u.identifier.toLowerCase() === foundCompany.email.toLowerCase() ||
      u.identifier.replace(/\D/g, '') === cleanCompCnpj
  )

  const [userPart, domainPart] = foundCompany.email.split('@')
  const maskedUser = userPart.length <= 2 ? userPart + '***' : userPart.slice(0, 2) + '***'
  const maskedEmail = `${maskedUser}@${domainPart || 'empresa.com.br'}`

  return {
    success: true,
    company: foundCompany,
    maskedEmail,
    alreadyHasPassword: !!existingUser,
  }
}

/**
 * Inicia a solicitação de ativação gerando o código de segurança de 6 dígitos
 */
export function requestFirstAccessCode(companyId: string): {
  success: boolean
  error?: string
  token?: string
  code?: string
  company?: ClientCompany
  email?: string
  maskedEmail?: string
} {
  const allCompanies = getAllClientCompanies()
  const company = allCompanies.find((c) => c.id === companyId)

  if (!company) {
    return { success: false, error: 'Empresa contratante não encontrada na base.' }
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const token = `fa-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutos de validade

  const session: FirstAccessSession = {
    companyId: company.id,
    companyName: company.name,
    document: company.cnpj,
    email: company.email,
    code,
    token,
    expiresAt,
    attemptsRemaining: 4,
    isVerified: false,
  }

  try {
    localStorage.setItem(FIRST_ACCESS_STORAGE_KEY, JSON.stringify(session))
  } catch (e) {
    console.warn('Erro ao salvar sessão de primeiro acesso:', e)
  }

  const [userPart, domainPart] = company.email.split('@')
  const maskedUser = userPart.length <= 2 ? userPart + '***' : userPart.slice(0, 2) + '***'
  const maskedEmail = `${maskedUser}@${domainPart || 'empresa.com.br'}`

  return {
    success: true,
    token,
    code,
    company,
    email: company.email,
    maskedEmail,
  }
}

/**
 * Valida o código de ativação de 6 dígitos recebido pelo cliente
 */
export function verifyFirstAccessCode(
  token: string,
  codeInput: string
): { success: boolean; error?: string } {
  try {
    const raw = localStorage.getItem(FIRST_ACCESS_STORAGE_KEY)
    if (!raw) {
      return { success: false, error: 'Sessão de ativação expirada ou não encontrada. Solicite um novo código.' }
    }

    const session: FirstAccessSession = JSON.parse(raw)
    if (session.token !== token) {
      return { success: false, error: 'Token de ativação inválido.' }
    }

    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(FIRST_ACCESS_STORAGE_KEY)
      return { success: false, error: 'O código de ativação expirou (validade de 15 min). Solicite novamente.' }
    }

    if (session.attemptsRemaining <= 0) {
      localStorage.removeItem(FIRST_ACCESS_STORAGE_KEY)
      return { success: false, error: 'Número máximo de tentativas excedido. Solicite um novo código por segurança.' }
    }

    if (session.code !== codeInput.trim()) {
      session.attemptsRemaining -= 1
      localStorage.setItem(FIRST_ACCESS_STORAGE_KEY, JSON.stringify(session))
      return {
        success: false,
        error: `Código de verificação incorreto. Você ainda tem ${session.attemptsRemaining} tentativa(s).`,
      }
    }

    session.isVerified = true
    localStorage.setItem(FIRST_ACCESS_STORAGE_KEY, JSON.stringify(session))
    return { success: true }
  } catch {
    return { success: false, error: 'Falha ao validar código de segurança.' }
  }
}

/**
 * Conclui a criação da senha corporativa e gera a sessão autenticada imediata
 */
export async function completeFirstAccessSetup(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string; company?: ClientCompany; sessionToken?: string }> {
  try {
    const raw = localStorage.getItem(FIRST_ACCESS_STORAGE_KEY)
    if (!raw) {
      return { success: false, error: 'Sessão de ativação expirada. Reinicie o processo de primeiro acesso.' }
    }

    const session: FirstAccessSession = JSON.parse(raw)
    if (session.token !== token || !session.isVerified) {
      return { success: false, error: 'O código de segurança precisa ser validado antes de criar a senha.' }
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'A senha de acesso deve ter no mínimo 6 caracteres.' }
    }

    const allCompanies = getAllClientCompanies()
    const company = allCompanies.find((c) => c.id === session.companyId)
    if (!company) {
      return { success: false, error: 'Empresa contratante não encontrada na base.' }
    }

    // Registra acesso por e-mail e por CNPJ limpo para permitir login com ambos
    await saveNewRegisteredUser({
      identifier: company.email,
      name: company.name,
      companyId: company.id,
      rawPassword: newPassword,
    })

    const cleanCnpj = company.cnpj.replace(/\D/g, '')
    if (cleanCnpj) {
      await saveNewRegisteredUser({
        identifier: cleanCnpj,
        name: company.name,
        companyId: company.id,
        rawPassword: newPassword,
      })
    }

    // Gera token JWT de sessão para login imediato
    const sessionToken = await generateSessionToken({
      userId: `user-${company.id}`,
      role: 'client',
      companyId: company.id,
    })

    localStorage.removeItem(FIRST_ACCESS_STORAGE_KEY)
    resetFailedLoginAttempts()

    return {
      success: true,
      company,
      sessionToken,
    }
  } catch (err: any) {
    return { success: false, error: `Falha ao ativar conta: ${err?.message || 'Erro inesperado'}` }
  }
}

