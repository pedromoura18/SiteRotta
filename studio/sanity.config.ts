import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

// Use suas variáveis ou valores padrão para o estúdio
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'zaro3df8'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Rotta Tecnologia CMS',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
