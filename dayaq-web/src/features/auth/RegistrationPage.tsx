import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { HeroSection } from '@components/HeroSection'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import '@features/marketing/LandingPage.css'
import './RegistrationPage.css'

function RegistrationPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.login
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleBackHome = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigate(routes.home)
      return
    }

    setIsExiting(true)
    setIsVisible(false)
    window.setTimeout(() => navigate(routes.home), 200)
  }

  return (
    <div
      className={`page registration-page ${isVisible ? 'registration-page--visible' : ''} ${
        isExiting ? 'registration-page--exit' : ''
      }`}
    >
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{commonCopy.brand}</div>
          <div className="header-actions">
            <button className="btn ghost" type="button" onClick={handleBackHome}>
              {copy.backHome}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
      </main>
    </div>
  )
}

export default RegistrationPage
