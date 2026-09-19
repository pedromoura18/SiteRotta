import { defineType, defineField } from 'sanity'

export const aboutType = defineType({
  name: 'aboutData',
  title: 'Sobre a Empresa (História & Valores)',
  type: 'document',
  fields: [
    defineField({ name: 'foundedYear', title: 'Ano de Fundação (Ex: 2016)', type: 'string', initialValue: '2016' }),
    defineField({ name: 'headline', title: 'Título Principal', type: 'string' }),
    defineField({ name: 'description', title: 'História / Descrição Institucional', type: 'text', rows: 6 }),
    defineField({ name: 'mission', title: 'Missão', type: 'text', rows: 2 }),
    defineField({ name: 'vision', title: 'Visão', type: 'text', rows: 2 }),
    defineField({
      name: 'values',
      title: 'Valores da Empresa',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
