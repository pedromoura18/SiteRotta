import { useState, useEffect } from 'react'

export function useParallax(speed = 0.2) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    let animationFrameId: number

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * speed)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed])

  return offsetY
}

export function useScrollReveal() {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px',
    })

    const observeNewElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)')
      elements.forEach((el) => {
        // Se já estiver visível na janela, aplica is-visible imediatamente
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible')
        } else {
          observer.observe(el)
        }
      })
    }

    observeNewElements()

    // Observa mudanças dinâmicas no DOM (ex: troca de abas de produtos)
    const mutationObserver = new MutationObserver(() => {
      observeNewElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    // Timeout de segurança para garantir visibilidade
    const timer = setTimeout(observeNewElements, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
