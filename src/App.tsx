import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'
import { ServicesPage } from './components/ServicesPage'
import { ProductCatalog } from './components/ProductCatalog'
import { ProductDetailPage } from './components/ProductDetailPage'
import { ContactPage } from './components/ContactPage'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { SiteProvider } from './context/SiteContext'
import type { NavPage } from './components/Header'

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  // Sincronização com o Hash da URL
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash

      if (hash.startsWith('#/produto/')) {
        const prodId = hash.replace('#/produto/', '').trim()
        if (prodId) {
          setSelectedProductId(prodId)
          setCurrentPage('produtos')
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }

      setSelectedProductId(null)

      if (hash === '#/sobre') {
        setCurrentPage('sobre')
      } else if (hash === '#/servicos') {
        setCurrentPage('servicos')
      } else if (hash === '#/produtos') {
        setCurrentPage('produtos')
      } else if (hash === '#/contato') {
        setCurrentPage('contato')
      } else {
        setCurrentPage('home')
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    parseHash()
    window.addEventListener('hashchange', parseHash)
    return () => window.removeEventListener('hashchange', parseHash)
  }, [])

  const handleNavigate = (page: NavPage) => {
    setSelectedProductId(null)
    setCurrentPage(page)
    const newHash = page === 'home' ? '#/' : `#/${page}`
    if (window.location.hash !== newHash) {
      window.location.hash = newHash
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId)
    window.location.hash = `#/produto/${productId}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToCatalog = () => {
    setSelectedProductId(null)
    window.location.hash = '#/produtos'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SiteProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-rotta-navy">
        {/* Header Fixo com Ícones Maiores e Organizados */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Conteúdo Dinâmico por Página */}
        <main className="flex-1">
          {selectedProductId ? (
            <ProductDetailPage
              productId={selectedProductId}
              onBack={handleBackToCatalog}
              onSelectProduct={handleSelectProduct}
            />
          ) : currentPage === 'home' ? (
            <HomePage
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          ) : currentPage === 'sobre' ? (
            <AboutPage />
          ) : currentPage === 'servicos' ? (
            <ServicesPage
              onNavigateToProducts={() => handleNavigate('produtos')}
            />
          ) : currentPage === 'produtos' ? (
            <ProductCatalog
              onSelectProduct={handleSelectProduct}
            />
          ) : currentPage === 'contato' ? (
            <ContactPage />
          ) : null}
        </main>

        {/* Rodapé Moderno com Links e Redes Sociais */}
        <Footer onNavigate={handleNavigate} />

        {/* Botão Flutuante de WhatsApp Oficial */}
        <WhatsAppFloat />
      </div>
    </SiteProvider>
  )
}
