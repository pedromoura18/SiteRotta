import { defineType, defineField } from 'sanity'

export const metricType = defineType({
  name: 'metric',
  title: 'Métrica / Prova Social',
  type: 'document',
  fields: [
    defineField({ name: 'value', title: 'Valor / Número (Ex: 216+, +2M, +11)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'label', title: 'Rótulo / Descrição (Ex: Clientes Atendidos, Cidades Atendidas)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Ordem de Exibição', type: 'number', initialValue: 0 }),
  ],
})
