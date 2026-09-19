import { defineType, defineField } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'Perguntas Frequentes (FAQ)',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pergunta', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Resposta Completa', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Ordem de Exibição', type: 'number', initialValue: 0 }),
  ],
})
