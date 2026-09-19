import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  companyInfo as defaultCompanyInfo,
  aboutData as defaultAboutData,
  metrics as defaultMetrics,
  services as defaultServices,
  rentalInclusions as defaultRentalInclusions,
  productsData as defaultProductsData,
  partnerBrands as defaultPartnerBrands,
  faqs as defaultFaqs,
} from '../data/site'
import type { ProductItem, ProductCategory } from '../data/site'
import { sanityClient, isSanityConfigured } from '../sanity/client'
import {
  PRODUCTS_QUERY,
  COMPANY_INFO_QUERY,
  SERVICES_QUERY,
  RENTAL_INCLUSIONS_QUERY,
  METRICS_QUERY,
  ABOUT_QUERY,
  FAQS_QUERY,
  PARTNER_BRANDS_QUERY,
} from '../sanity/queries'

export type CompanyInfo = typeof defaultCompanyInfo
export type AboutData = typeof defaultAboutData
export type MetricItem = (typeof defaultMetrics)[0]
export type ServiceItem = (typeof defaultServices)[0]
export type RentalInclusionItem = (typeof defaultRentalInclusions)[0]
export type PartnerBrandItem = (typeof defaultPartnerBrands)[0]
export type FaqItem = (typeof defaultFaqs)[0]
export type { ProductItem, ProductCategory }

interface SiteContextValue {
  companyInfo: CompanyInfo
  aboutData: AboutData
  metrics: MetricItem[]
  services: ServiceItem[]
  rentalInclusions: RentalInclusionItem[]
  productsData: ProductItem[]
  partnerBrands: PartnerBrandItem[]
  faqs: FaqItem[]
  isLoading: boolean
  isSanityConnected: boolean
}

const SiteContext = createContext<SiteContextValue>({
  companyInfo: defaultCompanyInfo,
  aboutData: defaultAboutData,
  metrics: defaultMetrics,
  services: defaultServices,
  rentalInclusions: defaultRentalInclusions,
  productsData: defaultProductsData,
  partnerBrands: defaultPartnerBrands,
  faqs: defaultFaqs,
  isLoading: false,
  isSanityConnected: false,
})

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo)
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [metrics, setMetrics] = useState<MetricItem[]>(defaultMetrics)
  const [services, setServices] = useState<ServiceItem[]>(defaultServices)
  const [rentalInclusions, setRentalInclusions] = useState<RentalInclusionItem[]>(defaultRentalInclusions)
  const [productsData, setProductsData] = useState<ProductItem[]>(defaultProductsData)
  const [partnerBrands, setPartnerBrands] = useState<PartnerBrandItem[]>(defaultPartnerBrands)
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs)
  const [isLoading, setIsLoading] = useState<boolean>(isSanityConfigured)
  const [isSanityConnected, setIsSanityConnected] = useState<boolean>(false)

  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) {
      setIsLoading(false)
      return
    }

    const client = sanityClient
    let isMounted = true

    const fetchCmsData = async () => {
      try {
        const [
          sanityProducts,
          sanityCompany,
          sanityServices,
          sanityInclusions,
          sanityMetrics,
          sanityAbout,
          sanityFaqs,
          sanityBrands,
        ] = await Promise.all([
          client.fetch<ProductItem[]>(PRODUCTS_QUERY),
          client.fetch<Partial<CompanyInfo>>(COMPANY_INFO_QUERY),
          client.fetch<ServiceItem[]>(SERVICES_QUERY),
          client.fetch<RentalInclusionItem[]>(RENTAL_INCLUSIONS_QUERY),
          client.fetch<MetricItem[]>(METRICS_QUERY),
          client.fetch<Partial<AboutData>>(ABOUT_QUERY),
          client.fetch<FaqItem[]>(FAQS_QUERY),
          client.fetch<PartnerBrandItem[]>(PARTNER_BRANDS_QUERY),
        ])

        if (!isMounted) return

        if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
          setProductsData(sanityProducts)
        }

        if (sanityCompany && Object.keys(sanityCompany).length > 0) {
          setCompanyInfo((prev) => ({ ...prev, ...sanityCompany }))
        }

        if (Array.isArray(sanityServices) && sanityServices.length > 0) {
          setServices(sanityServices)
        }

        if (Array.isArray(sanityInclusions) && sanityInclusions.length > 0) {
          setRentalInclusions(sanityInclusions)
        }

        if (Array.isArray(sanityMetrics) && sanityMetrics.length > 0) {
          setMetrics(sanityMetrics)
        }

        if (sanityAbout && Object.keys(sanityAbout).length > 0) {
          setAboutData((prev) => ({ ...prev, ...sanityAbout }))
        }

        if (Array.isArray(sanityFaqs) && sanityFaqs.length > 0) {
          setFaqs(sanityFaqs)
        }

        if (Array.isArray(sanityBrands) && sanityBrands.length > 0) {
          setPartnerBrands(sanityBrands)
        }

        setIsSanityConnected(true)
      } catch (err) {
        console.warn('Sanity.io: Não foi possível sincronizar com o CMS, mantendo dados locais de fallback.', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCmsData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <SiteContext.Provider
      value={{
        companyInfo,
        aboutData,
        metrics,
        services,
        rentalInclusions,
        productsData,
        partnerBrands,
        faqs,
        isLoading,
        isSanityConnected,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const useSiteData = () => useContext(SiteContext)
