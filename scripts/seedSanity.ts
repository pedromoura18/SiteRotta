import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import {
  companyInfo,
  aboutData,
  metrics,
  services,
  rentalInclusions,
  productsData,
  faqs,
} from '../src/data/site'

// Função auxiliar para carregar .env caso exista
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...rest] = trimmed.split('=')
        const val = rest.join('=').trim()
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val
        }
      }
    }
  }
}

loadEnv()

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN

async function runSeed() {
  console.log('🚀 Iniciando script de migração de conteúdo para o Sanity.io...')

  if (!projectId || projectId === 'seu_project_id_aqui') {
    console.error('❌ ERRO: Project ID do Sanity não configurado!')
    console.log('👉 Adicione VITE_SANITY_PROJECT_ID no seu arquivo .env ou execute:')
    console.log('   SANITY_PROJECT_ID=seu_id SANITY_AUTH_TOKEN=seu_token npm run cms:seed')
    process.exit(1)
  }

  if (!token) {
    console.error('❌ ERRO: Token de autenticação (Write Token) não informado!')
    console.log('👉 Para gerar um token com permissão de escrita:')
    console.log(`   1. Acesse: https://www.sanity.io/manage/project/${projectId}/api#tokens`)
    console.log('   2. Clique em "Add API token" -> Selecione a permissão "Editor"')
    console.log('   3. Copie o token e rode:')
    console.log('      SANITY_AUTH_TOKEN=seu_token npm run cms:seed')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-03-01',
    token,
    useCdn: false,
  })

  console.log(`📡 Conectado ao Sanity: Project ID "${projectId}", Dataset "${dataset}"`)

  try {
    // 1. Company Info
    console.log('📦 Enviando dados da empresa (companyInfo)...')
    await client.createOrReplace({
      _id: 'companyInfo-default',
      _type: 'companyInfo',
      ...companyInfo,
    })

    // 2. About Data
    console.log('📦 Enviando dados institucionais (aboutData)...')
    await client.createOrReplace({
      _id: 'aboutData-default',
      _type: 'aboutData',
      ...aboutData,
    })

    // 3. Metrics
    console.log('📦 Enviando métricas...')
    for (let i = 0; i < metrics.length; i++) {
      const metric = metrics[i]
      await client.createOrReplace({
        _id: `metric-${i}`,
        _type: 'metric',
        value: metric.value,
        label: metric.label,
        order: i,
      })
    }

    // 4. Services
    console.log('📦 Enviando serviços...')
    for (let i = 0; i < services.length; i++) {
      const service = services[i]
      await client.createOrReplace({
        _id: `service-${service.id}`,
        _type: 'service',
        title: service.title,
        slug: { _type: 'slug', current: service.id },
        subtitle: service.subtitle,
        description: service.description,
        details: service.details,
        iconName: service.iconName,
        highlight: service.highlight,
        order: i,
      })
    }

    // 5. Rental Inclusions
    console.log('📦 Enviando vantagens de locação...')
    for (let i = 0; i < rentalInclusions.length; i++) {
      const inc = rentalInclusions[i]
      await client.createOrReplace({
        _id: `inclusion-${i}`,
        _type: 'rentalInclusion',
        title: inc.title,
        description: inc.description,
        icon: inc.icon,
        order: i,
      })
    }

    // 6. FAQs
    console.log('📦 Enviando perguntas frequentes...')
    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i]
      await client.createOrReplace({
        _id: `faq-${i}`,
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        order: i,
      })
    }

    // 7. Products
    console.log(`📦 Enviando catálogo (${productsData.length} produtos)...`)
    for (let i = 0; i < productsData.length; i++) {
      const p = productsData[i]
      console.log(`  -> Cadastrando: ${p.name} (${p.id})`)

      await client.createOrReplace({
        _id: `product-${p.id}`,
        _type: 'product',
        title: p.name,
        slug: { _type: 'slug', current: p.id },
        category: p.category,
        categoryLabel: p.categoryLabel,
        brand: p.brand,
        modelType: p.modelType,
        badge: p.badge,
        description: p.description,
        longDescription: p.longDescription,
        features: p.features,
        specs: p.specs.map((s, specIndex) => ({
          _key: `spec-${specIndex}`,
          label: s.label,
          value: s.value,
        })),
        order: i + 1,
      })
    }

    console.log('\n🎉 SUCESSO! Todos os dados foram importados com sucesso para o seu Sanity!')
    console.log('👉 Agora você pode acessar o Sanity Studio para ver e editar o conteúdo.')
  } catch (error) {
    console.error('❌ Erro durante a importação para o Sanity:', error)
  }
}

runSeed()
