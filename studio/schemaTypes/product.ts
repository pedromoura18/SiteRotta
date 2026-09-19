import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produto / Equipamento',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Equipamento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador Único (Slug / URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Impressoras & Multifuncionais', value: 'impressoras' },
          { title: 'Scanners Corporativos', value: 'scanners' },
          { title: 'Impressoras de Etiquetas', value: 'etiquetas' },
          { title: 'Rotuladores Eletrônicos', value: 'rotuladores' },
          { title: 'ScanNCut (Máquinas de Corte)', value: 'scanncut' },
          { title: 'Periféricos & Acessórios', value: 'perifericos' },
          { title: 'Automação Comercial', value: 'automacao' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Rótulo da Categoria (Ex: Scanners Corporativos)',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: 'Marca (Brother, Epson, Dell, Zebra, etc.)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelType',
      title: 'Modalidade',
      type: 'string',
      options: {
        list: [
          { title: 'Locação & Venda', value: 'Locação & Venda' },
          { title: 'Locação (Outsourcing)', value: 'Locação' },
          { title: 'Venda Direta', value: 'Venda' },
          { title: 'Venda & Locação', value: 'Venda & Locação' },
        ],
      },
      initialValue: 'Locação & Venda',
    }),
    defineField({
      name: 'badge',
      title: 'Selo de Destaque (Opcional - Ex: Mais Solicitado, Lançamento)',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Fotos do Equipamento',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta (Exibida nos Cards)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição Completa e Detalhada',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'features',
      title: 'Destaques e Principais Recursos (Checklist)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Especificações Técnicas (Tabela)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Característica (Ex: Velocidade)', type: 'string' },
            { name: 'value', title: 'Valor (Ex: Até 52 ppm)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      media: 'images.0',
    },
  },
})
