import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Obtém as variáveis de ambiente Vite (ou strings vazias como padrão)
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || ''
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01'
export const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

// Verifica se as credenciais do Sanity foram informadas
export const isSanityConfigured = Boolean(
  projectId &&
  projectId.trim() !== '' &&
  projectId !== 'seu_project_id_aqui'
)

// Cria a instância do cliente Sanity
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null

// Construtor de URLs de imagens armazenadas no Sanity
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlForImage(source: unknown): string {
  if (!source) return ''
  if (typeof source === 'string') return source
  if (builder) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return builder.image(source as any).auto('format').fit('max').url()
    } catch {
      return ''
    }
  }
  return ''
}
