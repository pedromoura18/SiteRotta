// GROQ Queries para carregar conteúdo do Sanity

export const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc, _createdAt desc) {
  "id": coalesce(slug.current, _id),
  "name": title,
  category,
  categoryLabel,
  brand,
  modelType,
  "images": coalesce(images[].asset->url, []),
  description,
  longDescription,
  features,
  specs[] {
    label,
    value
  },
  badge
}`

export const COMPANY_INFO_QUERY = `*[_type == "companyInfo"][0] {
  name,
  tagline,
  shortDescription,
  contactPerson,
  phone,
  whatsappRaw,
  whatsappUrl,
  email,
  emailGeneral,
  emailDouglas,
  clientPortalUrl,
  website,
  address,
  city,
  state,
  cep,
  fullAddress,
  businessHours,
  instagram,
  facebook,
  linkedin,
  mapsEmbedUrl,
  mapsUrl
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc, _createdAt asc) {
  "id": coalesce(slug.current, _id),
  title,
  subtitle,
  description,
  details,
  iconName,
  highlight
}`

export const RENTAL_INCLUSIONS_QUERY = `*[_type == "rentalInclusion"] | order(order asc, _createdAt asc) {
  icon,
  title,
  description
}`

export const METRICS_QUERY = `*[_type == "metric"] | order(order asc, _createdAt asc) {
  value,
  label
}`

export const ABOUT_QUERY = `*[_type == "aboutData"][0] {
  foundedYear,
  headline,
  description,
  mission,
  vision,
  values
}`

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc, _createdAt asc) {
  question,
  answer
}`

export const PARTNER_BRANDS_QUERY = `*[_type == "partnerBrand"] | order(order asc, _createdAt asc) {
  name,
  "logo": coalesce(logo.asset->url, logoUrl, ""),
  mark
}`
