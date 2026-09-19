import { defineType, defineField } from 'sanity'

export const rentalInclusionType = defineType({
  name: 'rentalInclusion',
  title: 'Vantagens do Outsourcing / Locação',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título da Vantagem', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Explicação Detalhada', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Ícone',
      type: 'string',
      options: {
        list: [
          { title: 'Localização (map-pin)', value: 'map-pin' },
          { title: 'Máquina Reserva (refresh-cw)', value: 'refresh-cw' },
          { title: 'Suprimentos Inclusos (package)', value: 'package' },
          { title: 'Revisões Preventivas (calendar-check)', value: 'calendar-check' },
          { title: 'Instalação Rápida (zap)', value: 'zap' },
          { title: 'Contratos Transparentes (shield-check)', value: 'shield-check' },
        ],
      },
      initialValue: 'shield-check',
    }),
    defineField({ name: 'order', title: 'Ordem de Exibição', type: 'number', initialValue: 0 }),
  ],
})
