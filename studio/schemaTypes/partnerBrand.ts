import { defineType, defineField } from 'sanity'

export const partnerBrandType = defineType({
  name: 'partnerBrand',
  title: 'Marcas Parceiras & Fabricantes',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome da Marca (Brother, Epson, Dell, etc.)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'logo', title: 'Imagem do Logo', type: 'image' }),
    defineField({ name: 'logoUrl', title: 'URL do Logo (Opcional se fez upload)', type: 'string' }),
    defineField({ name: 'mark', title: 'Sigla / Marca D’água', type: 'string' }),
    defineField({ name: 'order', title: 'Ordem de Exibição', type: 'number', initialValue: 0 }),
  ],
})
