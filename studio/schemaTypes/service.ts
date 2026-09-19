import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Serviços Prestados',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título do Serviço', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Identificador (Slug)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'description', title: 'Descrição do Serviço', type: 'text', rows: 3 }),
    defineField({
      name: 'details',
      title: 'Itens Inclusos / Atividades do Serviço',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'iconName',
      title: 'Ícone',
      type: 'string',
      options: {
        list: [
          { title: 'Suporte (Headset)', value: 'headset' },
          { title: 'Automação (Store)', value: 'store' },
          { title: 'Impressão (Printer)', value: 'printer' },
          { title: 'Assistência (Wrench)', value: 'wrench' },
        ],
      },
      initialValue: 'wrench',
    }),
    defineField({ name: 'highlight', title: 'Destaque / Badge (Ex: Interatividade 24h, Economia até 40%)', type: 'string' }),
    defineField({ name: 'order', title: 'Ordem de Exibição', type: 'number', initialValue: 0 }),
  ],
})
